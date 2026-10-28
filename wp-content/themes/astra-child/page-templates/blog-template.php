<?php
/**
 * Template Name: Better Insights Blog Page
 * The master template for displaying the Better Insights Blog / Insights page.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Blog Master Stylesheet
$blog_css = $theme_dir . '/assets/css/blog.css';
if ( ! wp_style_is( 'bi-blog-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-blog-style',
		$theme_uri . '/assets/css/blog.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $blog_css ) ? (string) filemtime( $blog_css ) : wp_get_theme()->get( 'Version' )
	);
}

// Blog Master Interactive Script
$blog_js = $theme_dir . '/assets/js/blog.js';
if ( ! wp_script_is( 'bi-blog-script', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-blog-script',
		$theme_uri . '/assets/js/blog.js',
		array( 'gsap' ),
		file_exists( $blog_js ) ? (string) filemtime( $blog_js ) : wp_get_theme()->get( 'Version' ),
		true
	);

	wp_localize_script(
		'bi-blog-script',
		'bi_blog_data',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'site_url' => home_url( '/' ),
		)
	);
}

get_header();
?>

<main class="bi-blog-page" id="primary">
	<!-- Section 1: Editorial Hero -->
	<?php get_template_part( 'template-parts/blog/blog-hero' ); ?>

	<!-- Section 2: Featured Article Spotlight -->
	<?php get_template_part( 'template-parts/blog/blog-featured' ); ?>

	<!-- Section 3: Categories Filter, Search, Article Grid & Pagination -->
	<?php get_template_part( 'template-parts/blog/blog-grid' ); ?>
</main>

<?php
get_footer();
