<?php
/**
 * Better Insights - Contact Form Backend Handler & Enquiry Management
 *
 * Handles AJAX form submissions, server-side validation, spam protection,
 * database persistence via CPT 'bi_enquiry', and notification emails.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register 'bi_enquiry' Custom Post Type for secure admin persistence.
 */
function bi_register_enquiry_post_type() {
	$labels = array(
		'name'               => _x( 'Enquiries', 'post type general name', 'astra-child' ),
		'singular_name'      => _x( 'Enquiry', 'post type singular name', 'astra-child' ),
		'menu_name'          => _x( 'Enquiries', 'admin menu', 'astra-child' ),
		'name_admin_bar'     => _x( 'Enquiry', 'add new on admin bar', 'astra-child' ),
		'add_new'            => _x( 'Add New', 'enquiry', 'astra-child' ),
		'add_new_item'       => __( 'Add New Enquiry', 'astra-child' ),
		'new_item'           => __( 'New Enquiry', 'astra-child' ),
		'edit_item'          => __( 'View Enquiry', 'astra-child' ),
		'view_item'          => __( 'View Enquiry', 'astra-child' ),
		'all_items'          => __( 'All Enquiries', 'astra-child' ),
		'search_items'       => __( 'Search Enquiries', 'astra-child' ),
		'not_found'          => __( 'No enquiries found.', 'astra-child' ),
		'not_found_in_trash' => __( 'No enquiries found in Trash.', 'astra-child' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => false,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => false,
		'rewrite'            => false,
		'capability_type'    => 'post',
		'capabilities'       => array(
			'create_posts' => 'do_not_allow', // Only created via contact forms or admin
		),
		'map_meta_cap'       => true,
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 26,
		'menu_icon'          => 'dashicons-email-alt',
		'supports'           => array( 'title', 'editor', 'custom-fields' ),
	);

	register_post_type( 'bi_enquiry', $args );
}
add_action( 'init', 'bi_register_enquiry_post_type' );

/**
 * Custom admin columns for 'bi_enquiry'.
 *
 * @param array $columns Existing columns.
 * @return array
 */
function bi_enquiry_custom_columns( $columns ) {
	$new_columns = array(
		'cb'         => $columns['cb'],
		'title'      => __( 'Sender / Subject', 'astra-child' ),
		'tab_type'   => __( 'Category / Tab', 'astra-child' ),
		'email'      => __( 'Email', 'astra-child' ),
		'phone'      => __( 'Phone', 'astra-child' ),
		'company'    => __( 'Organization', 'astra-child' ),
		'date'       => __( 'Received At', 'astra-child' ),
	);
	return $new_columns;
}
add_filter( 'manage_bi_enquiry_posts_columns', 'bi_enquiry_custom_columns' );

/**
 * Populate custom admin columns for 'bi_enquiry'.
 *
 * @param string $column  Column name.
 * @param int    $post_id Post ID.
 */
function bi_enquiry_custom_column_content( $column, $post_id ) {
	switch ( $column ) {
		case 'tab_type':
			$type = get_post_meta( $post_id, '_bi_tab_label', true );
			echo esc_html( $type ? $type : 'General' );
			break;
		case 'email':
			$email = get_post_meta( $post_id, '_bi_email', true );
			if ( $email ) {
				echo '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
			} else {
				echo '&mdash;';
			}
			break;
		case 'phone':
			$phone = get_post_meta( $post_id, '_bi_phone', true );
			echo esc_html( $phone ? $phone : '&mdash;' );
			break;
		case 'company':
			$company = get_post_meta( $post_id, '_bi_company', true );
			echo esc_html( $company ? $company : '&mdash;' );
			break;
	}
}
add_action( 'manage_bi_enquiry_posts_custom_column', 'bi_enquiry_custom_column_content', 10, 2 );

/**
 * Handle AJAX Enquiry Submission.
 */
function bi_handle_enquiry_submission() {
	// 1. Verify Nonce
	if ( ! check_ajax_referer( 'bi_contact_nonce', 'nonce', false ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Security verification failed. Please refresh the page and try again.', 'astra-child' ),
			),
			403
		);
	}

	// 2. Honeypot Anti-Spam Check
	if ( ! empty( $_POST['bi_hp_field'] ) ) {
		// Silently succeed for automated bots
		wp_send_json_success(
			array(
				'message' => __( 'Thank you! Your enquiry has been received.', 'astra-child' ),
			)
		);
	}

	// 3. Rate limiting / Anti-flood check (Max 5 submissions per 10 minutes per IP)
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '0.0.0.0';
	$rate_transient_key = 'bi_rate_' . md5( $ip );
	$submit_count = (int) get_transient( $rate_transient_key );

	if ( $submit_count >= 10 ) {
		wp_send_json_error(
			array(
				'message' => __( 'Too many submissions received from your connection. Please wait a few moments before trying again.', 'astra-child' ),
			),
			429
		);
	}
	set_transient( $rate_transient_key, $submit_count + 1, 10 * MINUTE_IN_SECONDS );

	// 4. Determine Tab Type
	$tab_type = isset( $_POST['tab_type'] ) ? sanitize_key( $_POST['tab_type'] ) : 'general';
	$errors   = array();

	// 5. Sanitize and Validate by Tab
	$data = array();

	switch ( $tab_type ) {
		case 'services':
			$tab_label = 'Services';
			$data['first_name']       = isset( $_POST['first_name'] ) ? sanitize_text_field( wp_unslash( $_POST['first_name'] ) ) : '';
			$data['last_name']        = isset( $_POST['last_name'] ) ? sanitize_text_field( wp_unslash( $_POST['last_name'] ) ) : '';
			$data['email']            = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$data['phone']            = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
			$data['company']          = isset( $_POST['company'] ) ? sanitize_text_field( wp_unslash( $_POST['company'] ) ) : '';
			$data['service_required'] = isset( $_POST['service_required'] ) ? sanitize_text_field( wp_unslash( $_POST['service_required'] ) ) : '';
			$data['project_budget']   = isset( $_POST['project_budget'] ) ? sanitize_text_field( wp_unslash( $_POST['project_budget'] ) ) : '';
			$data['project_details']  = isset( $_POST['project_details'] ) ? sanitize_textarea_field( wp_unslash( $_POST['project_details'] ) ) : '';

			if ( empty( $data['first_name'] ) ) {
				$errors['first_name'] = __( 'First name is required.', 'astra-child' );
			}
			if ( empty( $data['last_name'] ) ) {
				$errors['last_name'] = __( 'Last name is required.', 'astra-child' );
			}
			if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
				$errors['email'] = __( 'Please enter a valid work email address.', 'astra-child' );
			}
			if ( empty( $data['service_required'] ) ) {
				$errors['service_required'] = __( 'Please select the service required.', 'astra-child' );
			}
			if ( empty( $data['project_details'] ) ) {
				$errors['project_details'] = __( 'Please provide details about your project.', 'astra-child' );
			}

			$full_name = trim( $data['first_name'] . ' ' . $data['last_name'] );
			$post_title = sprintf( '[Services] %s (%s)', $full_name, $data['company'] ? $data['company'] : $data['email'] );
			$subject = 'New Services Enquiry: ' . $full_name;
			break;

		case 'employment':
			$tab_label = 'Employment Verification';
			$data['requester_name']       = isset( $_POST['requester_name'] ) ? sanitize_text_field( wp_unslash( $_POST['requester_name'] ) ) : '';
			$data['organization']         = isset( $_POST['organization'] ) ? sanitize_text_field( wp_unslash( $_POST['organization'] ) ) : '';
			$data['email']                = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$data['phone']                = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
			$data['employee_name']        = isset( $_POST['employee_name'] ) ? sanitize_text_field( wp_unslash( $_POST['employee_name'] ) ) : '';
			$data['verification_details'] = isset( $_POST['verification_details'] ) ? sanitize_textarea_field( wp_unslash( $_POST['verification_details'] ) ) : '';

			if ( empty( $data['requester_name'] ) ) {
				$errors['requester_name'] = __( "Requester's name is required.", 'astra-child' );
			}
			if ( empty( $data['organization'] ) ) {
				$errors['organization'] = __( 'Organization name is required.', 'astra-child' );
			}
			if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
				$errors['email'] = __( 'Please enter a valid work email address.', 'astra-child' );
			}
			if ( empty( $data['employee_name'] ) ) {
				$errors['employee_name'] = __( 'Employee / former employee name is required.', 'astra-child' );
			}
			if ( empty( $data['verification_details'] ) ) {
				$errors['verification_details'] = __( 'Please provide verification details.', 'astra-child' );
			}

			$full_name = $data['requester_name'];
			$post_title = sprintf( '[Employment Verification] %s - %s', $full_name, $data['organization'] );
			$subject = 'Employment Verification Request from ' . $data['organization'];
			break;

		case 'press':
			$tab_label = 'Press';
			$data['name']        = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
			$data['media_org']   = isset( $_POST['media_org'] ) ? sanitize_text_field( wp_unslash( $_POST['media_org'] ) ) : '';
			$data['email']       = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$data['phone']       = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
			$data['subject']     = isset( $_POST['subject'] ) ? sanitize_text_field( wp_unslash( $_POST['subject'] ) ) : '';
			$data['message']     = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

			if ( empty( $data['name'] ) ) {
				$errors['name'] = __( 'Name is required.', 'astra-child' );
			}
			if ( empty( $data['media_org'] ) ) {
				$errors['media_org'] = __( 'Media organization is required.', 'astra-child' );
			}
			if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
				$errors['email'] = __( 'Please enter a valid work email address.', 'astra-child' );
			}
			if ( empty( $data['subject'] ) ) {
				$errors['subject'] = __( 'Subject is required.', 'astra-child' );
			}
			if ( empty( $data['message'] ) ) {
				$errors['message'] = __( 'Message is required.', 'astra-child' );
			}

			$full_name = $data['name'];
			$post_title = sprintf( '[Press] %s (%s) - %s', $full_name, $data['media_org'], $data['subject'] );
			$subject = 'Press Enquiry: ' . $data['subject'] . ' (' . $data['media_org'] . ')';
			break;

		case 'general':
		default:
			$tab_type  = 'general';
			$tab_label = 'General Enquiry';
			$data['first_name']       = isset( $_POST['first_name'] ) ? sanitize_text_field( wp_unslash( $_POST['first_name'] ) ) : '';
			$data['last_name']        = isset( $_POST['last_name'] ) ? sanitize_text_field( wp_unslash( $_POST['last_name'] ) ) : '';
			$data['email']            = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$data['phone']            = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
			$data['company']          = isset( $_POST['company'] ) ? sanitize_text_field( wp_unslash( $_POST['company'] ) ) : '';
			$data['service_interest'] = isset( $_POST['service_interest'] ) ? sanitize_text_field( wp_unslash( $_POST['service_interest'] ) ) : '';
			$data['country']          = isset( $_POST['country'] ) ? sanitize_text_field( wp_unslash( $_POST['country'] ) ) : '';
			$data['message']          = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

			if ( empty( $data['first_name'] ) ) {
				$errors['first_name'] = __( 'First name is required.', 'astra-child' );
			}
			if ( empty( $data['last_name'] ) ) {
				$errors['last_name'] = __( 'Last name is required.', 'astra-child' );
			}
			if ( empty( $data['email'] ) || ! is_email( $data['email'] ) ) {
				$errors['email'] = __( 'Please enter a valid work email address.', 'astra-child' );
			}
			if ( empty( $data['message'] ) ) {
				$errors['message'] = __( 'Message is required.', 'astra-child' );
			}

			$full_name = trim( $data['first_name'] . ' ' . $data['last_name'] );
			$post_title = sprintf( '[General] %s (%s)', $full_name, $data['company'] ? $data['company'] : $data['email'] );
			$subject = 'New General Enquiry: ' . $full_name;
			break;
	}

	// 6. Return Errors if validation failed
	if ( ! empty( $errors ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please fill in all required fields accurately.', 'astra-child' ),
				'errors'  => $errors,
			),
			400
		);
	}

	// 7. Format Content for Storage & Email
	$content_lines = array();
	$content_lines[] = "==================================================";
	$content_lines[] = "BETTER INSIGHTS ENQUIRY NOTIFICATION";
	$content_lines[] = "Tab: " . $tab_label;
	$content_lines[] = "Date: " . current_time( 'mysql' );
	$content_lines[] = "IP Address: " . $ip;
	$content_lines[] = "==================================================";
	$content_lines[] = "";

	foreach ( $data as $key => $val ) {
		if ( ! empty( $val ) ) {
			$clean_key = ucwords( str_replace( '_', ' ', $key ) );
			$content_lines[] = "{$clean_key}: {$val}";
		}
	}

	$post_content = implode( "\n", $content_lines );

	// 8. Persist to Database via 'bi_enquiry' CPT
	$post_id = wp_insert_post(
		array(
			'post_type'    => 'bi_enquiry',
			'post_title'   => wp_strip_all_tags( $post_title ),
			'post_content' => $post_content,
			'post_status'  => 'publish',
		)
	);

	if ( is_wp_error( $post_id ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Could not save enquiry. Please try again or reach out directly to contact@betterinsights.in.', 'astra-child' ),
			),
			500
		);
	}

	// Save Post Meta
	update_post_meta( $post_id, '_bi_tab_type', $tab_type );
	update_post_meta( $post_id, '_bi_tab_label', $tab_label );
	update_post_meta( $post_id, '_bi_full_name', $full_name );
	update_post_meta( $post_id, '_bi_email', $data['email'] );
	update_post_meta( $post_id, '_bi_phone', isset( $data['phone'] ) ? $data['phone'] : '' );
	update_post_meta( $post_id, '_bi_company', isset( $data['company'] ) ? $data['company'] : ( isset( $data['organization'] ) ? $data['organization'] : ( isset( $data['media_org'] ) ? $data['media_org'] : '' ) ) );
	update_post_meta( $post_id, '_bi_ip', $ip );
	update_post_meta( $post_id, '_bi_submitted_at', current_time( 'mysql' ) );

	foreach ( $data as $k => $v ) {
		update_post_meta( $post_id, '_bi_field_' . $k, $v );
	}

	// 9. Dispatch Email Notification to contact@betterinsights.in
	$to = 'contact@betterinsights.in';
	$headers = array(
		'Content-Type: text/html; charset=UTF-8',
		'From: Better Insights Website <no-reply@betterinsights.in>',
		'Reply-To: ' . $full_name . ' <' . $data['email'] . '>',
	);

	$html_body  = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D0D3DA; border-radius: 8px;">';
	$html_body .= '<div style="background-color: #000000; color: #FFFFFF; padding: 16px 24px; border-radius: 6px; margin-bottom: 24px;">';
	$html_body .= '<h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">Better Insights &bull; ' . esc_html( $tab_label ) . '</h2>';
	$html_body .= '</div>';
	$html_body .= '<table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">';

	foreach ( $data as $k => $v ) {
		if ( ! empty( $v ) ) {
			$clean_key = ucwords( str_replace( '_', ' ', $k ) );
			$html_body .= '<tr>';
			$html_body .= '<td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; width: 35%; border-bottom: 1px solid #EBECEF; vertical-align: top;">' . esc_html( $clean_key ) . ':</td>';
			$html_body .= '<td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;">' . nl2br( esc_html( $v ) ) . '</td>';
			$html_body .= '</tr>';
		}
	}

	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; border-bottom: 1px solid #EBECEF;">Submitted At:</td><td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;">' . esc_html( current_time( 'F j, Y, g:i a' ) ) . '</td></tr>';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A;">IP Address:</td><td style="padding: 10px 12px; color: #000000;">' . esc_html( $ip ) . '</td></tr>';
	$html_body .= '</table>';
	$html_body .= '<p style="margin-top: 24px; font-size: 12px; color: #6A6A6A; text-align: center;">This message was automatically generated by the Better Insights contact system.</p>';
	$html_body .= '</div>';

	// Attempt to send email (fails gracefully in local dev environments without breaking form success)
	wp_mail( $to, $subject, $html_body, $headers );

	// 10. Send Success Response
	wp_send_json_success(
		array(
			'message' => __( 'Thank you! Your enquiry has been received. Our team will review your message and get back to you within 24 hours.', 'astra-child' ),
			'post_id' => $post_id,
		)
	);
}
add_action( 'wp_ajax_bi_submit_enquiry', 'bi_handle_enquiry_submission' );
add_action( 'wp_ajax_nopriv_bi_submit_enquiry', 'bi_handle_enquiry_submission' );

/**
 * Handle Footer Lead Form AJAX Submissions.
 */
function bi_handle_footer_lead_submission() {
	// 1. Verify Nonce
	if ( ! check_ajax_referer( 'bi_footer_lead_nonce', 'nonce', false ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Security verification failed. Please refresh the page and try again.', 'astra-child' ),
			),
			403
		);
	}

	// 2. Honeypot check if present
	if ( ! empty( $_POST['bi_hp_field'] ) ) {
		wp_send_json_success(
			array(
				'message' => __( 'Thank you! Your enquiry has been received.', 'astra-child' ),
			)
		);
	}

	// 3. Rate limiting / Anti-flood check
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '0.0.0.0';
	$rate_transient_key = 'bi_rate_ftr_' . md5( $ip );
	$submit_count       = (int) get_transient( $rate_transient_key );

	if ( $submit_count >= 10 ) {
		wp_send_json_error(
			array(
				'message' => __( 'Too many submissions received from your connection. Please wait a few moments before trying again.', 'astra-child' ),
			),
			429
		);
	}
	set_transient( $rate_transient_key, $submit_count + 1, 10 * MINUTE_IN_SECONDS );

	// 4. Sanitize inputs
	$name  = isset( $_POST['bi_lead_name'] ) ? sanitize_text_field( wp_unslash( $_POST['bi_lead_name'] ) ) : '';
	$email = isset( $_POST['bi_lead_email'] ) ? sanitize_email( wp_unslash( $_POST['bi_lead_email'] ) ) : '';
	$phone = isset( $_POST['bi_lead_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['bi_lead_phone'] ) ) : '';

	$errors = array();
	if ( empty( $name ) ) {
		$errors['bi_lead_name'] = __( 'Name is required.', 'astra-child' );
	}
	if ( empty( $email ) || ! is_email( $email ) ) {
		$errors['bi_lead_email'] = __( 'A valid email address is required.', 'astra-child' );
	}
	if ( empty( $phone ) ) {
		$errors['bi_lead_phone'] = __( 'Phone number is required.', 'astra-child' );
	}

	if ( ! empty( $errors ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please fill out all required fields with valid details.', 'astra-child' ),
				'errors'  => $errors,
			),
			422
		);
	}

	// 5. Persist to 'bi_enquiry' CPT
	$post_title = sprintf( '[Footer Lead] %s (%s)', $name, $email );
	$post_content = sprintf(
		"Name: %s\nEmail: %s\nPhone: %s\nSource: Global Footer Lead Form\nSubmitted: %s\nIP: %s",
		$name,
		$email,
		$phone,
		current_time( 'mysql' ),
		$ip
	);

	$post_id = wp_insert_post(
		array(
			'post_type'    => 'bi_enquiry',
			'post_status'  => 'publish',
			'post_title'   => $post_title,
			'post_content' => $post_content,
		),
		true
	);

	if ( is_wp_error( $post_id ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'An unexpected error occurred while saving your request. Please email us directly at contact@betterinsights.in.', 'astra-child' ),
			),
			500
		);
	}

	// 6. Save Meta
	update_post_meta( $post_id, '_bi_tab_label', 'Footer Lead' );
	update_post_meta( $post_id, '_bi_name', $name );
	update_post_meta( $post_id, '_bi_email', $email );
	update_post_meta( $post_id, '_bi_phone', $phone );
	update_post_meta( $post_id, '_bi_source', 'Footer Lead Form' );
	update_post_meta( $post_id, '_bi_ip', $ip );

	// 7. Send notification email
	$to      = get_option( 'admin_email', 'contact@betterinsights.in' );
	$subject = 'New Footer Lead: ' . $name;
	$headers = array(
		'Content-Type: text/html; charset=UTF-8',
		'Reply-To: ' . $name . ' <' . $email . '>',
	);

	$html_body  = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D0D3DA; border-radius: 8px;">';
	$html_body .= '<div style="background-color: #000000; color: #FFFFFF; padding: 16px 24px; border-radius: 6px; margin-bottom: 24px;">';
	$html_body .= '<h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">Better Insights &bull; New Footer Lead</h2>';
	$html_body .= '</div>';
	$html_body .= '<table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; width: 35%; border-bottom: 1px solid #EBECEF;">Name:</td><td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;">' . esc_html( $name ) . '</td></tr>';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; border-bottom: 1px solid #EBECEF;">Email:</td><td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;"><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a></td></tr>';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; border-bottom: 1px solid #EBECEF;">Phone:</td><td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;"><a href="tel:' . esc_attr( $phone ) . '">' . esc_html( $phone ) . '</a></td></tr>';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A; border-bottom: 1px solid #EBECEF;">Source:</td><td style="padding: 10px 12px; color: #000000; border-bottom: 1px solid #EBECEF;">Global Footer Lead Form</td></tr>';
	$html_body .= '<tr><td style="padding: 10px 12px; font-weight: 600; color: #6A6A6A;">Submitted At:</td><td style="padding: 10px 12px; color: #000000;">' . esc_html( current_time( 'F j, Y, g:i a' ) ) . '</td></tr>';
	$html_body .= '</table>';
	$html_body .= '</div>';

	wp_mail( $to, $subject, $html_body, $headers );

	// 8. Return JSON Success
	wp_send_json_success(
		array(
			'message' => __( 'Thank you! Your enquiry has been received. Our team will contact you shortly.', 'astra-child' ),
			'post_id' => $post_id,
		)
	);
}
add_action( 'wp_ajax_bi_submit_footer_lead', 'bi_handle_footer_lead_submission' );
add_action( 'wp_ajax_nopriv_bi_submit_footer_lead', 'bi_handle_footer_lead_submission' );

