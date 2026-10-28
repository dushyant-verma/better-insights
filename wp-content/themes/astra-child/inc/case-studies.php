<?php
/**
 * Better Insights - Client Success Stories & Case Studies System
 * Handles CPT registration, metadata retrieval, asset management, and querying.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Custom Post Type: bi_case_study
 */
function bi_register_case_study_cpt() {
	$labels = array(
		'name'                  => _x( 'Case Studies', 'Post Type General Name', 'astra-child' ),
		'singular_name'         => _x( 'Case Study', 'Post Type Singular Name', 'astra-child' ),
		'menu_name'             => __( 'Case Studies', 'astra-child' ),
		'name_admin_bar'        => __( 'Case Study', 'astra-child' ),
		'archives'              => __( 'Case Study Archives', 'astra-child' ),
		'attributes'            => __( 'Case Study Attributes', 'astra-child' ),
		'parent_item_colon'     => __( 'Parent Case Study:', 'astra-child' ),
		'all_items'             => __( 'All Case Studies', 'astra-child' ),
		'add_new_item'          => __( 'Add New Case Study', 'astra-child' ),
		'add_new'               => __( 'Add New', 'astra-child' ),
		'new_item'              => __( 'New Case Study', 'astra-child' ),
		'edit_item'             => __( 'Edit Case Study', 'astra-child' ),
		'update_item'           => __( 'Update Case Study', 'astra-child' ),
		'view_item'             => __( 'View Case Study', 'astra-child' ),
		'view_items'            => __( 'View Case Studies', 'astra-child' ),
		'search_items'          => __( 'Search Case Studies', 'astra-child' ),
		'not_found'             => __( 'No case studies found', 'astra-child' ),
		'not_found_in_trash'    => __( 'No case studies found in Trash', 'astra-child' ),
		'featured_image'        => __( 'Featured Image', 'astra-child' ),
		'set_featured_image'    => __( 'Set featured image', 'astra-child' ),
		'remove_featured_image' => __( 'Remove featured image', 'astra-child' ),
		'use_featured_image'    => __( 'Use as featured image', 'astra-child' ),
	);

	$args = array(
		'label'                 => __( 'Case Study', 'astra-child' ),
		'description'           => __( 'Better Insights Client Success Stories & Case Studies', 'astra-child' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-portfolio',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
		'rewrite'               => array(
			'slug'       => 'case-study',
			'with_front' => false,
		),
	);

	register_post_type( 'bi_case_study', $args );
}
add_action( 'init', 'bi_register_case_study_cpt', 0 );

/**
 * Enqueue Case Studies assets on Our Work and Single Case Study pages.
 */
function bi_enqueue_case_study_assets() {
	$is_our_work_page = is_page( 'our-work' ) || is_page_template( 'page-templates/our-work-template.php' ) || is_page_template( 'page-our-work.php' );
	$is_single_case   = is_singular( 'bi_case_study' );

	if ( $is_our_work_page || $is_single_case ) {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();

		// Stylesheet
		$css_file = $theme_dir . '/assets/css/case-studies.css';
		if ( ! wp_style_is( 'bi-case-studies-style', 'enqueued' ) ) {
			wp_enqueue_style(
				'bi-case-studies-style',
				$theme_uri . '/assets/css/case-studies.css',
				array( 'astra-child-style', 'bi-cta-style' ),
				file_exists( $css_file ) ? (string) filemtime( $css_file ) : wp_get_theme()->get( 'Version' )
			);
		}

		// Filter Script (only needed on the listing page)
		if ( $is_our_work_page ) {
			$js_file = $theme_dir . '/assets/js/case-studies-filter.js';
			if ( ! wp_script_is( 'bi-case-studies-filter', 'enqueued' ) ) {
				wp_enqueue_script(
					'bi-case-studies-filter',
					$theme_uri . '/assets/js/case-studies-filter.js',
					array(),
					file_exists( $js_file ) ? (string) filemtime( $js_file ) : wp_get_theme()->get( 'Version' ),
					true
				);
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_case_study_assets', 22 );

/**
 * Helper: Retrieve all published case studies with full metadata.
 *
 * @param array $args Optional query args override.
 * @return array Array of case study data arrays.
 */
function bi_get_case_studies( $args = array() ) {
	$default_args = array(
		'post_type'      => 'bi_case_study',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order date',
		'order'          => 'ASC',
	);

	$query_args = wp_parse_args( $args, $default_args );
	$query      = new WP_Query( $query_args );
	$studies    = array();

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			$post_id   = get_the_ID();
			$studies[] = bi_get_case_study_data( $post_id );
		}
		wp_reset_postdata();
	}

	return $studies;
}

/**
 * Helper: Retrieve comprehensive structured data for a single case study.
 *
 * @param int $post_id Post ID.
 * @return array Normalized case study data.
 */
function bi_get_case_study_data( $post_id ) {
	$title     = get_the_title( $post_id );
	$permalink = get_permalink( $post_id );

	// Featured image fallback
	$image_url = get_the_post_thumbnail_url( $post_id, 'full' );
	if ( ! $image_url ) {
		$image_url = get_post_meta( $post_id, '_bi_image_url', true );
	}
	if ( ! $image_url ) {
		$image_url = content_url( '/uploads/2026/10/Digital-Experiences-Built-to-Perform.webp' );
	}

	// Client metadata
	$client_name = get_post_meta( $post_id, '_bi_client_name', true );
	if ( empty( $client_name ) ) {
		$client_name = $title;
	}

	$client_logo = get_post_meta( $post_id, '_bi_client_logo', true );
	$industry    = get_post_meta( $post_id, '_bi_industry', true );
	$service     = get_post_meta( $post_id, '_bi_service', true );

	// Tags
	$tags_raw = get_post_meta( $post_id, '_bi_tags', true );
	if ( is_array( $tags_raw ) ) {
		$tags = $tags_raw;
	} elseif ( is_string( $tags_raw ) && ! empty( $tags_raw ) ) {
		$tags = array_map( 'trim', explode( ',', $tags_raw ) );
	} else {
		$tags = array();
	}

	// Overview & detail copy
	$overview    = get_post_meta( $post_id, '_bi_card_overview', true );
	if ( empty( $overview ) ) {
		$overview = get_the_excerpt( $post_id );
	}

	$client_overview = get_post_meta( $post_id, '_bi_client_overview', true );
	$challenge       = get_post_meta( $post_id, '_bi_challenge', true );
	$objectives      = get_post_meta( $post_id, '_bi_objectives', true );
	$approach        = get_post_meta( $post_id, '_bi_approach', true );
	$solution        = get_post_meta( $post_id, '_bi_solution', true );

	// Metrics
	$metrics = get_post_meta( $post_id, '_bi_metrics', true );
	if ( ! is_array( $metrics ) ) {
		$metrics = array();
	}

	return array(
		'id'              => $post_id,
		'title'           => $title,
		'permalink'       => $permalink,
		'client_name'     => $client_name,
		'client_logo'     => $client_logo,
		'industry'        => $industry,
		'service'         => $service,
		'tags'            => $tags,
		'image_url'       => $image_url,
		'card_overview'   => $overview,
		'client_overview' => $client_overview,
		'challenge'       => $challenge,
		'objectives'      => is_array( $objectives ) ? $objectives : array_filter( array_map( 'trim', explode( "\n", (string) $objectives ) ) ),
		'approach'        => $approach,
		'solution'        => $solution,
		'metrics'         => $metrics,
	);
}

/**
 * Helper: Get distinct industries from published case studies.
 *
 * @return array Sorted array of unique industry names.
 */
function bi_get_unique_case_study_industries() {
	$studies    = bi_get_case_studies();
	$industries = array();

	foreach ( $studies as $study ) {
		if ( ! empty( $study['industry'] ) ) {
			$industries[ $study['industry'] ] = true;
		}
	}

	$unique = array_keys( $industries );
	sort( $unique );
	return $unique;
}

/**
 * Helper: Get distinct services from published case studies.
 *
 * @return array Sorted array of unique service names.
 */
function bi_get_unique_case_study_services() {
	$studies  = bi_get_case_studies();
	$services = array();

	foreach ( $studies as $study ) {
		if ( ! empty( $study['service'] ) ) {
			$services[ $study['service'] ] = true;
		}
	}

	$unique = array_keys( $services );
	sort( $unique );
	return $unique;
}
