<?php
/**
 * Template Name: Better Insights Contact Page
 * The template for displaying the Better Insights Contact page.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Contact Master Stylesheet
$contact_css = $theme_dir . '/assets/css/contact.css';
if ( ! wp_style_is( 'bi-contact-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-contact-style',
		$theme_uri . '/assets/css/contact.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $contact_css ) ? (string) filemtime( $contact_css ) : wp_get_theme()->get( 'Version' )
	);
}

// Contact Master Controller Script
$contact_js = $theme_dir . '/assets/js/contact.js';
if ( ! wp_script_is( 'bi-contact-script', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-contact-script',
		$theme_uri . '/assets/js/contact.js',
		array( 'gsap' ),
		file_exists( $contact_js ) ? (string) filemtime( $contact_js ) : wp_get_theme()->get( 'Version' ),
		true
	);

	wp_localize_script(
		'bi-contact-script',
		'bi_contact_ajax',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'bi_contact_nonce' ),
		)
	);
}

// Add page-specific body class for transparent header styling
add_filter(
	'body_class',
	function( $classes ) {
		$classes[] = 'bi-contact-page-active';
		return $classes;
	}
);

get_header();
?>

<main class="bi-contact-page" id="primary">
	<!-- Section 1: Contact Hero Banner (Modular) -->
	<?php get_template_part( 'template-parts/contact/contact-hero' ); ?>

	<!-- Section 2: Tabbed Enquiry Form (Modular) -->
	<?php get_template_part( 'template-parts/contact/contact-tabs' ); ?>
</main>

<?php
get_footer();
