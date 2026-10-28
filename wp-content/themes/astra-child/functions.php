<?php
/**
 * Astra Child Theme functions
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add preconnect resource hints for Google Fonts.
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array
 */
function bi_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.googleapis.com',
		);
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'bi_resource_hints', 10, 2 );

/**
 * Enqueue Noto Sans Google Font.
 */
function bi_enqueue_google_fonts() {
	wp_enqueue_style(
		'bi-font-noto-sans',
		'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap',
		array(),
		null
	);
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_google_fonts', 2 );

/**
 * Enqueue parent/child base styles.
 */
function astra_child_enqueue_styles() {
	wp_enqueue_style(
		'astra-parent-style',
		get_template_directory_uri() . '/style.css',
		array(),
		ASTRA_THEME_VERSION
	);

	wp_enqueue_style(
		'astra-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		array( 'bi-font-noto-sans', 'astra-parent-style' ),
		wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_style(
		'bi-footer-style',
		get_stylesheet_directory_uri() . '/assets/css/footer.css',
		array( 'astra-child-style' ),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'astra_child_enqueue_styles' );

/**
 * Enqueue global UI enhancements (Master CTA System & Custom Cursor).
 */
function bi_enqueue_global_assets() {
	$theme_dir = get_stylesheet_directory();
	$theme_uri = get_stylesheet_directory_uri();

	// GSAP JS Library (global)
	wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );

	// Master CTA stylesheet
	$cta_css = $theme_dir . '/assets/css/cta.css';
	wp_enqueue_style(
		'bi-cta-style',
		$theme_uri . '/assets/css/cta.css',
		array( 'astra-child-style' ),
		file_exists( $cta_css ) ? (string) filemtime( $cta_css ) : wp_get_theme()->get( 'Version' )
	);

	// Custom Cursor stylesheet & script
	$cursor_css = $theme_dir . '/assets/css/cursor.css';
	$cursor_js  = $theme_dir . '/assets/js/cursor.js';

	wp_enqueue_style(
		'bi-cursor-style',
		$theme_uri . '/assets/css/cursor.css',
		array( 'astra-child-style' ),
		file_exists( $cursor_css ) ? (string) filemtime( $cursor_css ) : wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_script(
		'bi-cursor-script',
		$theme_uri . '/assets/js/cursor.js',
		array( 'gsap' ),
		file_exists( $cursor_js ) ? (string) filemtime( $cursor_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_global_assets', 15 );

/**
 * Enqueue homepage assets.
 */
function bi_enqueue_home_assets() {
	$theme_dir = get_stylesheet_directory();
	$theme_uri = get_stylesheet_directory_uri();

	$is_merged_home = is_front_page()
		|| is_page_template( 'page-templates/home-merged-template.php' )
		|| is_page_template( 'home-merged-template.php' );

	$is_legacy_home = is_page_template( 'page-templates/homepage-template.php' )
		|| is_page_template( 'homepage-template.php' )
		|| is_page_template( 'front-page-original.php' );

	if ( ! $is_legacy_home && is_page() ) {
		$template_slug = get_page_template_slug( get_queried_object_id() );
		if ( $template_slug && false !== strpos( $template_slug, 'homepage-template.php' ) ) {
			$is_legacy_home = true;
		}
	}

	if ( $is_merged_home && ! $is_legacy_home ) {
		// Enqueue GSAP, ScrollTrigger, SplitText, and Lenis for merged homepage
		wp_enqueue_script( 'gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', array(), '3.13.0', true );
		wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', array( 'gsap' ), '3.13.0', true );
		wp_enqueue_script( 'gsap-splittext', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js', array( 'gsap' ), '3.13.0', true );
		wp_enqueue_script( 'lenis', 'https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js', array(), '1.3.27', true );

		$merged_css = $theme_dir . '/assets/css/home-merged.css';
		$merged_js  = $theme_dir . '/assets/js/home-merged.js';

		wp_enqueue_style(
			'bi-home-merged',
			$theme_uri . '/assets/css/home-merged.css',
			array( 'astra-child-style' ),
			file_exists( $merged_css ) ? (string) filemtime( $merged_css ) : wp_get_theme()->get( 'Version' )
		);

		wp_enqueue_script(
			'bi-home-merged',
			$theme_uri . '/assets/js/home-merged.js',
			array( 'gsap', 'gsap-scrolltrigger', 'gsap-splittext', 'lenis' ),
			file_exists( $merged_js ) ? (string) filemtime( $merged_js ) : wp_get_theme()->get( 'Version' ),
			true
		);
	} elseif ( $is_legacy_home ) {
		$home_css = $theme_dir . '/assets/css/home.css';
		$home_js  = $theme_dir . '/assets/js/home.js';

		wp_enqueue_style(
			'bi-home',
			$theme_uri . '/assets/css/home.css',
			array( 'astra-child-style' ),
			file_exists( $home_css ) ? (string) filemtime( $home_css ) : wp_get_theme()->get( 'Version' )
		);

		$ambient_css = $theme_dir . '/assets/css/ambient-backdrop.css';
		wp_enqueue_style(
			'bi-ambient-backdrop',
			$theme_uri . '/assets/css/ambient-backdrop.css',
			array( 'bi-home' ),
			file_exists( $ambient_css ) ? (string) filemtime( $ambient_css ) : wp_get_theme()->get( 'Version' )
		);

		// Enqueue GSAP, ScrollTrigger, Lenis, and legacy homepage motion controller
		wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );
		wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', array( 'gsap' ), '3.12.5', true );
		wp_enqueue_script( 'lenis', 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js', array(), '1.0.42', true );

		$motion_js = $theme_dir . '/assets/js/homepage-motion.js';
		wp_enqueue_script(
			'bi-homepage-motion',
			$theme_uri . '/assets/js/homepage-motion.js',
			array( 'gsap', 'gsap-scrolltrigger', 'lenis' ),
			file_exists( $motion_js ) ? (string) filemtime( $motion_js ) : wp_get_theme()->get( 'Version' ),
			true
		);

		$logo_css = $theme_dir . '/assets/css/client-logo-wall.css';
		$logo_js  = $theme_dir . '/assets/js/client-logo-wall.js';

		wp_enqueue_style(
			'bi-client-logo-wall',
			$theme_uri . '/assets/css/client-logo-wall.css',
			array( 'bi-home' ),
			file_exists( $logo_css ) ? (string) filemtime( $logo_css ) : wp_get_theme()->get( 'Version' )
		);

		wp_enqueue_script(
			'bi-client-logo-wall',
			$theme_uri . '/assets/js/client-logo-wall.js',
			array( 'gsap', 'gsap-scrolltrigger' ),
			file_exists( $logo_js ) ? (string) filemtime( $logo_js ) : wp_get_theme()->get( 'Version' ),
			true
		);

		wp_enqueue_script(
			'bi-home',
			$theme_uri . '/assets/js/home.js',
			array(),
			file_exists( $home_js ) ? (string) filemtime( $home_js ) : wp_get_theme()->get( 'Version' ),
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_home_assets', 25 );

/**
 * Enqueue footer motion assets globally.
 */
function bi_enqueue_footer_motion() {
	wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );
	wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', array( 'gsap' ), '3.12.5', true );

	$theme_dir = get_stylesheet_directory();
	$theme_uri = get_stylesheet_directory_uri();
	$footer_js = $theme_dir . '/assets/js/footer-motion.js';

	wp_enqueue_script(
		'bi-footer-motion',
		$theme_uri . '/assets/js/footer-motion.js',
		array( 'gsap', 'gsap-scrolltrigger' ),
		file_exists( $footer_js ) ? (string) filemtime( $footer_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_footer_motion', 30 );

/**
 * Enqueue utility and specialized pages assets (CPR Tool, Write For Us, Clientele, Careers).
 */
function bi_enqueue_utility_pages_assets() {
	$is_utility = is_page_template( 'page-cpr-tool.php' )
		|| is_page_template( 'page-write-for-us.php' )
		|| is_page_template( 'page-clientele.php' )
		|| is_page_template( 'page-careers.php' )
		|| is_page( array( 'cpr-tool', 'write-for-us', 'clientele', 'careers' ) );

	if ( $is_utility ) {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();
		$css_file  = $theme_dir . '/assets/css/utility-pages.css';

		wp_enqueue_style(
			'bi-utility-pages',
			$theme_uri . '/assets/css/utility-pages.css',
			array( 'astra-child-style', 'bi-cta-style' ),
			file_exists( $css_file ) ? (string) filemtime( $css_file ) : wp_get_theme()->get( 'Version' )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_utility_pages_assets', 20 );

/**
 * Enqueue service page assets.
 */
function bi_enqueue_service_page_assets() {
	$is_service = is_page_template( 'page-templates/service-template.php' )
		|| is_page_template( 'service-template.php' )
		|| is_page( array( 'ai-solutions', 'digital-growth', 'technology-engineering', 'digital-transformation', 'crm-integrations', 'website-development', 'what-we-do' ) );

	if ( $is_service ) {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();

		$service_css = $theme_dir . '/assets/css/service.css';
		$service_js  = $theme_dir . '/assets/js/service.js';

		wp_enqueue_style(
			'bi-service-style',
			$theme_uri . '/assets/css/service.css',
			array( 'astra-child-style', 'bi-cta-style' ),
			file_exists( $service_css ) ? (string) filemtime( $service_css ) : wp_get_theme()->get( 'Version' )
		);

		wp_enqueue_script(
			'bi-service-script',
			$theme_uri . '/assets/js/service.js',
			array(),
			file_exists( $service_js ) ? (string) filemtime( $service_js ) : wp_get_theme()->get( 'Version' ),
			true
		);

		add_filter(
			'body_class',
			function( $classes ) {
				if ( ! in_array( 'bi-service-page-active', $classes, true ) ) {
					$classes[] = 'bi-service-page-active';
				}
				return $classes;
			}
		);
	}
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_service_page_assets', 20 );

/**
 * Enqueue legal document pages assets (Privacy Policy, Terms and Conditions).
 */
function bi_enqueue_legal_pages_assets() {
	$is_legal = is_page_template( 'page-templates/legal-template.php' )
		|| is_page_template( 'page-privacy-policy.php' )
		|| is_page_template( 'page-terms-and-conditions.php' )
		|| is_page( array( 'privacy-policy', 'terms-and-conditions' ) );

	if ( $is_legal ) {
		$theme_dir = get_stylesheet_directory();
		$theme_uri = get_stylesheet_directory_uri();
		$css_file  = $theme_dir . '/assets/css/legal-pages.css';

		wp_enqueue_style(
			'bi-legal-pages',
			$theme_uri . '/assets/css/legal-pages.css',
			array( 'astra-child-style', 'bi-cta-style' ),
			file_exists( $css_file ) ? (string) filemtime( $css_file ) : wp_get_theme()->get( 'Version' )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_legal_pages_assets', 20 );

require_once get_stylesheet_directory() . '/inc/header.php';
require_once get_stylesheet_directory() . '/inc/class-wp-image-editor-gd-cli.php';
require_once get_stylesheet_directory() . '/inc/contact-handler.php';
require_once get_stylesheet_directory() . '/inc/careers-handler.php';
require_once get_stylesheet_directory() . '/inc/case-studies.php';

/**
 * Register WP_Image_Editor_GD_CLI for WebP image processing support.
 *
 * @param array $editors List of registered image editor classes.
 * @return array
 */
function bi_register_webp_image_editor( $editors ) {
	if ( class_exists( 'WP_Image_Editor_GD_CLI' ) && ! in_array( 'WP_Image_Editor_GD_CLI', $editors, true ) ) {
		array_unshift( $editors, 'WP_Image_Editor_GD_CLI' );
	}
	return $editors;
}
add_filter( 'wp_image_editors', 'bi_register_webp_image_editor' );


/**
 * Enable TTF, OTF, WOFF, WOFF2 font formats and WebP images in WordPress Media Library.
 *
 * @param array $mimes Allowed MIME types.
 * @return array
 */
function bi_custom_upload_mimes( $mimes ) {
	$mimes['ttf']   = 'font/ttf';
	$mimes['otf']   = 'font/otf';
	$mimes['woff']  = 'font/woff';
	$mimes['woff2'] = 'font/woff2';
	$mimes['webp']  = 'image/webp';
	return $mimes;
}
add_filter( 'upload_mimes', 'bi_custom_upload_mimes' );

/**
 * Override WordPress real binary MIME check (wp_check_filetype_and_ext) for custom font formats.
 *
 * @param array  $data     File data.
 * @param string $file     File path.
 * @param string $filename File name.
 * @param array  $mimes    MIME types array.
 * @return array
 */
function bi_fix_font_filetype_check( $data, $file, $filename, $mimes ) {
	$ext = strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
	if ( in_array( $ext, array( 'ttf', 'otf', 'woff', 'woff2' ), true ) ) {
		$type_map = array(
			'ttf'   => 'font/ttf',
			'otf'   => 'font/otf',
			'woff'  => 'font/woff',
			'woff2' => 'font/woff2',
		);
		$data['ext']  = $ext;
		$data['type'] = $type_map[ $ext ];
	} elseif ( 'webp' === $ext ) {
		$data['ext']  = 'webp';
		$data['type'] = 'image/webp';
	}
	return $data;
}
add_filter( 'wp_check_filetype_and_ext', 'bi_fix_font_filetype_check', 10, 4 );

/**
 * Ensure WebP images are marked as displayable images in WordPress even if local PHP GD lacks WebP editing.
 *
 * @param bool   $result Current displayable status.
 * @param string $path   Image file path.
 * @return bool
 */
function bi_file_is_displayable_image( $result, $path ) {
	if ( ! $result && preg_match( '/\.webp$/i', $path ) ) {
		return true;
	}
	return $result;
}
add_filter( 'file_is_displayable_image', 'bi_file_is_displayable_image', 10, 2 );

/**
 * Customizer settings for Better Insights Branch Logo.
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function bi_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'bi_branch_logo_section',
		array(
			'title'    => __( 'Branch Logo (WebP)', 'astra-child' ),
			'priority' => 30,
		)
	);

	$wp_customize->add_setting(
		'bi_branch_logo_url',
		array(
			'default'           => '',
			'type'              => 'option',
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'bi_branch_logo_url_control',
			array(
				'label'    => __( 'Branch Logo (.webp)', 'astra-child' ),
				'section'  => 'bi_branch_logo_section',
				'settings' => 'bi_branch_logo_url',
			)
		)
	);

	$wp_customize->add_setting(
		'bi_branch_logo_alt',
		array(
			'default'           => 'Better Insights Branch',
			'type'              => 'option',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	$wp_customize->add_control(
		'bi_branch_logo_alt_control',
		array(
			'label'    => __( 'Branch Logo Alt Text', 'astra-child' ),
			'section'  => 'bi_branch_logo_section',
			'settings' => 'bi_branch_logo_alt',
			'type'     => 'text',
		)
	);
}
add_action( 'customize_register', 'bi_customize_register' );



