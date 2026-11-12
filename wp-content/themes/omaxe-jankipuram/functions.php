<?php
/**
 * Omaxe Jankipuram Landing – theme functions.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'OMAXE_VERSION', '1.0.0' );

/* -------------------------------------------------------------------------
 * Theme setup
 * ---------------------------------------------------------------------- */
function omaxe_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'omaxe_setup' );

/* Remove the default <title> separator clutter on the landing page */
add_filter( 'document_title_parts', function ( $parts ) {
	if ( is_front_page() || is_page_template( 'template-landing.php' ) ) {
		return array( 'title' => 'Omaxe Jankipuram | Commercial Investment Opportunities' );
	}
	return $parts;
} );

/* -------------------------------------------------------------------------
 * Assets
 * ---------------------------------------------------------------------- */
function omaxe_enqueue_assets() {
	wp_enqueue_style(
		'omaxe-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'omaxe-theme', get_stylesheet_uri(), array(), OMAXE_VERSION );
	wp_enqueue_style( 'omaxe-main', get_template_directory_uri() . '/assets/css/styles.css', array( 'omaxe-theme', 'omaxe-fonts' ), OMAXE_VERSION );

	wp_enqueue_script( 'omaxe-main', get_template_directory_uri() . '/assets/js/script.js', array(), OMAXE_VERSION, true );
	wp_localize_script( 'omaxe-main', 'omaxeData', array(
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
		'nonce'   => wp_create_nonce( 'omaxe_lead_nonce' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'omaxe_enqueue_assets' );

/* Preconnect hints for Google Fonts */
add_filter( 'wp_resource_hints', function ( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' );
	}
	return $urls;
}, 10, 2 );

/* Clean up unneeded head output on a landing page */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/* -------------------------------------------------------------------------
 * Leads: custom post type (visible only in wp-admin)
 * ---------------------------------------------------------------------- */
function omaxe_register_lead_cpt() {
	register_post_type( 'omaxe_lead', array(
		'labels'              => array(
			'name'          => 'Leads',
			'singular_name' => 'Lead',
			'menu_name'     => 'Leads',
			'all_items'     => 'All Leads',
			'edit_item'     => 'View Lead',
			'search_items'  => 'Search Leads',
		),
		'public'              => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_icon'           => 'dashicons-groups',
		'menu_position'       => 25,
		'supports'            => array( 'title' ),
		'capability_type'     => 'post',
		'capabilities'        => array( 'create_posts' => 'do_not_allow' ),
		'map_meta_cap'        => true,
		'exclude_from_search' => true,
		'publicly_queryable'  => false,
		'has_archive'         => false,
		'rewrite'             => false,
	) );
}
add_action( 'init', 'omaxe_register_lead_cpt' );

/* Admin list columns */
add_filter( 'manage_omaxe_lead_posts_columns', function ( $cols ) {
	return array(
		'cb'       => $cols['cb'],
		'title'    => 'Name',
		'phone'    => 'Phone',
		'interest' => 'Interest',
		'budget'   => 'Budget',
		'source'   => 'Source',
		'date'     => 'Submitted',
	);
} );

add_action( 'manage_omaxe_lead_posts_custom_column', function ( $col, $post_id ) {
	if ( in_array( $col, array( 'phone', 'interest', 'budget', 'source' ), true ) ) {
		$val = get_post_meta( $post_id, '_omaxe_' . $col, true );
		if ( 'phone' === $col && $val ) {
			echo '<a href="tel:' . esc_attr( $val ) . '">' . esc_html( $val ) . '</a>';
		} else {
			echo esc_html( $val ? $val : '—' );
		}
	}
}, 10, 2 );

/* Lead details meta box (read-only) */
add_action( 'add_meta_boxes', function () {
	add_meta_box( 'omaxe_lead_details', 'Lead Details', 'omaxe_lead_meta_box', 'omaxe_lead', 'normal', 'high' );
} );

function omaxe_lead_meta_box( $post ) {
	$fields = array(
		'phone'        => 'Phone',
		'interest'     => 'Interest',
		'budget'       => 'Budget',
		'page'         => 'Page URL',
		'source'       => 'utm_source',
		'utm_medium'   => 'utm_medium',
		'utm_campaign' => 'utm_campaign',
		'gclid'        => 'gclid',
		'ip'           => 'IP address',
		'submitted_at' => 'Submitted (UTC)',
	);
	echo '<table class="widefat striped"><tbody>';
	foreach ( $fields as $key => $label ) {
		$val = get_post_meta( $post->ID, '_omaxe_' . $key, true );
		echo '<tr><th style="width:160px">' . esc_html( $label ) . '</th><td>' . esc_html( $val ? $val : '—' ) . '</td></tr>';
	}
	echo '</tbody></table>';
}

/* CSV export of all leads: Leads → Export link (admins only) */
add_action( 'admin_init', function () {
	if ( ! isset( $_GET['omaxe_export'] ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	check_admin_referer( 'omaxe_export' );

	header( 'Content-Type: text/csv; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=omaxe-leads-' . gmdate( 'Y-m-d' ) . '.csv' );
	$out = fopen( 'php://output', 'w' );
	fputcsv( $out, array( 'Name', 'Phone', 'Interest', 'Budget', 'utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'Page', 'Submitted (UTC)' ) );

	$leads = get_posts( array( 'post_type' => 'omaxe_lead', 'posts_per_page' => -1, 'post_status' => 'any' ) );
	foreach ( $leads as $lead ) {
		$m = function ( $k ) use ( $lead ) {
			return get_post_meta( $lead->ID, '_omaxe_' . $k, true );
		};
		fputcsv( $out, array(
			$lead->post_title, $m( 'phone' ), $m( 'interest' ), $m( 'budget' ),
			$m( 'source' ), $m( 'utm_medium' ), $m( 'utm_campaign' ), $m( 'gclid' ),
			$m( 'page' ), $m( 'submitted_at' ),
		) );
	}
	fclose( $out );
	exit;
} );

add_action( 'admin_notices', function () {
	$screen = get_current_screen();
	if ( $screen && 'edit-omaxe_lead' === $screen->id && current_user_can( 'manage_options' ) ) {
		$url = wp_nonce_url( admin_url( 'edit.php?post_type=omaxe_lead&omaxe_export=1' ), 'omaxe_export' );
		echo '<div class="notice notice-info"><p><a class="button button-primary" href="' . esc_url( $url ) . '">Export all leads (CSV)</a></p></div>';
	}
} );

/* -------------------------------------------------------------------------
 * Customizer: notification email
 * ---------------------------------------------------------------------- */
add_action( 'customize_register', function ( $wp_customize ) {
	$wp_customize->add_section( 'omaxe_leads', array(
		'title'    => 'Lead Notifications',
		'priority' => 30,
	) );
	$wp_customize->add_setting( 'omaxe_notify_email', array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_email',
	) );
	$wp_customize->add_control( 'omaxe_notify_email', array(
		'label'       => 'Send new leads to this email',
		'description' => 'Leave blank to use the site admin email.',
		'section'     => 'omaxe_leads',
		'type'        => 'email',
	) );
} );

/* -------------------------------------------------------------------------
 * AJAX: enquiry form
 * ---------------------------------------------------------------------- */
add_action( 'wp_ajax_nopriv_omaxe_submit_lead', 'omaxe_handle_lead' );
add_action( 'wp_ajax_omaxe_submit_lead', 'omaxe_handle_lead' );

function omaxe_handle_lead() {
	// Nonce
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'omaxe_lead_nonce' ) ) {
		wp_send_json_error( array( 'message' => 'Session expired. Please refresh the page and try again.' ), 403 );
	}

	// Honeypot – bots fill this, humans never see it
	if ( ! empty( $_POST['website'] ) ) {
		wp_send_json_success( array( 'message' => 'Thank you.' ) );
	}

	// Basic rate limit: 5 submissions / hour / IP
	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$key = 'omaxe_rl_' . md5( $ip );
	$hit = (int) get_transient( $key );
	if ( $hit >= 5 ) {
		wp_send_json_error( array( 'message' => 'Too many submissions. Please try again later.' ), 429 );
	}

	$allowed_interest = array( 'Retail Shops', 'Studio Apartments', 'Commercial Spaces', 'Floor Plans', 'Price List', 'Brochure', 'Site Visit' );
	$allowed_budget   = array( '', 'Prefer to discuss', 'Below ₹25 lakh', '₹25–50 lakh', '₹50 lakh–₹1 crore', 'Above ₹1 crore' );

	$name     = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$phone    = isset( $_POST['phone'] ) ? preg_replace( '/\D/', '', wp_unslash( $_POST['phone'] ) ) : '';
	$interest = isset( $_POST['interest'] ) ? sanitize_text_field( wp_unslash( $_POST['interest'] ) ) : '';
	$budget   = isset( $_POST['budget'] ) ? sanitize_text_field( wp_unslash( $_POST['budget'] ) ) : '';
	$consent  = ! empty( $_POST['consent'] );

	if ( '' === $name || mb_strlen( $name ) > 100 ) {
		wp_send_json_error( array( 'message' => 'Please enter your name.' ), 422 );
	}
	if ( ! preg_match( '/^[6-9]\d{9}$/', $phone ) ) {
		wp_send_json_error( array( 'message' => 'Please enter a valid 10-digit Indian mobile number.' ), 422 );
	}
	if ( ! in_array( $interest, $allowed_interest, true ) ) {
		wp_send_json_error( array( 'message' => 'Please select what you are interested in.' ), 422 );
	}
	if ( ! in_array( $budget, $allowed_budget, true ) ) {
		$budget = '';
	}
	if ( ! $consent ) {
		wp_send_json_error( array( 'message' => 'Please accept the contact consent to continue.' ), 422 );
	}

	$tracking = array(
		'page'         => isset( $_POST['page'] ) ? esc_url_raw( wp_unslash( $_POST['page'] ) ) : '',
		'source'       => isset( $_POST['utm_source'] ) ? sanitize_text_field( wp_unslash( $_POST['utm_source'] ) ) : 'direct',
		'utm_medium'   => isset( $_POST['utm_medium'] ) ? sanitize_text_field( wp_unslash( $_POST['utm_medium'] ) ) : '',
		'utm_campaign' => isset( $_POST['utm_campaign'] ) ? sanitize_text_field( wp_unslash( $_POST['utm_campaign'] ) ) : '',
		'gclid'        => isset( $_POST['gclid'] ) ? sanitize_text_field( wp_unslash( $_POST['gclid'] ) ) : '',
	);

	$post_id = wp_insert_post( array(
		'post_type'   => 'omaxe_lead',
		'post_status' => 'publish',
		'post_title'  => $name,
	), true );

	if ( is_wp_error( $post_id ) ) {
		wp_send_json_error( array( 'message' => 'Something went wrong. Please try again.' ), 500 );
	}

	$meta = array_merge( $tracking, array(
		'phone'        => '+91' . $phone,
		'interest'     => $interest,
		'budget'       => $budget,
		'ip'           => $ip,
		'submitted_at' => gmdate( 'Y-m-d H:i:s' ),
	) );
	foreach ( $meta as $k => $v ) {
		update_post_meta( $post_id, '_omaxe_' . $k, $v );
	}

	set_transient( $key, $hit + 1, HOUR_IN_SECONDS );

	// Email notification
	$to = get_theme_mod( 'omaxe_notify_email', '' );
	if ( ! is_email( $to ) ) {
		$to = get_option( 'admin_email' );
	}
	$body  = "New enquiry – Omaxe Jankipuram\n\n";
	$body .= "Name: $name\nPhone: +91$phone\nInterest: $interest\nBudget: " . ( $budget ? $budget : '—' ) . "\n\n";
	$body .= "Source: {$tracking['source']}\nMedium: {$tracking['utm_medium']}\nCampaign: {$tracking['utm_campaign']}\nPage: {$tracking['page']}\n";
	$body .= "\nView in dashboard: " . admin_url( 'post.php?post=' . $post_id . '&action=edit' ) . "\n";

	wp_mail( $to, 'New lead: ' . $name . ' (' . $interest . ')', $body );

	/**
	 * Hook for CRM / webhook integrations.
	 * add_action( 'omaxe_lead_created', function( $post_id, $meta ) { ... }, 10, 2 );
	 */
	do_action( 'omaxe_lead_created', $post_id, $meta );

	wp_send_json_success( array(
		'message' => 'Thank you, ' . $name . '. Our team will contact you shortly.',
	) );
}
