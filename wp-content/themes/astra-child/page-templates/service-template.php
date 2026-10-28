<?php
/**
 * Template Name: Better Insights Service Page
 * The master reusable template for all individual service pages.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Service Master Stylesheet
$service_css = $theme_dir . '/assets/css/service.css';
if ( ! wp_style_is( 'bi-service-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-service-style',
		$theme_uri . '/assets/css/service.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $service_css ) ? (string) filemtime( $service_css ) : wp_get_theme()->get( 'Version' )
	);
}

// Service Master Interactive Script
$service_js = $theme_dir . '/assets/js/service.js';
if ( ! wp_script_is( 'bi-service-script', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-service-script',
		$theme_uri . '/assets/js/service.js',
		array(),
		file_exists( $service_js ) ? (string) filemtime( $service_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

// Add page-specific body class for transparent header styling
add_filter(
	'body_class',
	function( $classes ) {
		$classes[] = 'bi-service-page-active';
		return $classes;
	}
);

get_header();
?>

<main class="bi-service-page" id="primary">
	<!-- Reusable Cinematic Service Hero Banner -->
	<?php get_template_part( 'template-parts/service/service-hero' ); ?>

	<!-- Reusable Measurable Business Impact Metrics Section -->
	<?php get_template_part( 'template-parts/service/service-impact' ); ?>

	<!-- Reusable Editorial Image Panels (.dbi) Section -->
	<?php get_template_part( 'template-parts/service/service-dbi' ); ?>

	<!-- Reusable 2x2 Alternating Image & Content Grid Section -->
	<?php get_template_part( 'template-parts/service/service-grid' ); ?>

	<!-- Reusable Service Capabilities Cards — Premium 3-Column Section -->
	<?php get_template_part( 'template-parts/service/service-cards' ); ?>


	<!-- Existing & Future Service Page Content Below Hero -->
	<div class="bi-service-body">
		<div class="bi-service-container">
			<div class="bi-service-content entry-content">
				<?php
				while ( have_posts() ) :
					the_post();
					the_content();
				endwhile;
				?>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
