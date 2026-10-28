<?php
/**
 * Template Name: Better Insights About Page
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();
$about_css = $theme_dir . '/assets/css/about-hero.css';
$about_js  = $theme_dir . '/assets/js/about-hero.js';
$who_css   = $theme_dir . '/assets/css/about-who.css';
$who_js    = $theme_dir . '/assets/js/about-who.js';

if ( ! wp_style_is( 'bi-about-hero', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-hero',
		$theme_uri . '/assets/css/about-hero.css',
		array( 'astra-child-style' ),
		file_exists( $about_css ) ? (string) filemtime( $about_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-hero', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-hero',
		$theme_uri . '/assets/js/about-hero.js',
		array( 'gsap' ),
		file_exists( $about_js ) ? (string) filemtime( $about_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}


$values_css = $theme_dir . '/assets/css/about-values.css';
$values_js  = $theme_dir . '/assets/js/about-values.js';

if ( ! wp_style_is( 'bi-about-values', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-values',
		$theme_uri . '/assets/css/about-values.css',
		array( 'astra-child-style' ),
		file_exists( $values_css ) ? (string) filemtime( $values_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-values', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-values',
		$theme_uri . '/assets/js/about-values.js',
		array( 'gsap' ),
		file_exists( $values_js ) ? (string) filemtime( $values_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

$stats_css = $theme_dir . '/assets/css/about-stats.css';
$stats_js  = $theme_dir . '/assets/js/about-stats.js';


if ( ! wp_style_is( 'bi-about-who', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-who',
		$theme_uri . '/assets/css/about-who.css',
		array( 'astra-child-style' ),
		file_exists( $who_css ) ? (string) filemtime( $who_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-who', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-who',
		$theme_uri . '/assets/js/about-who.js',
		array( 'gsap' ),
		file_exists( $who_js ) ? (string) filemtime( $who_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}




if ( ! wp_style_is( 'bi-about-stats', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-stats',
		$theme_uri . '/assets/css/about-stats.css',
		array( 'astra-child-style' ),
		file_exists( $stats_css ) ? (string) filemtime( $stats_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-stats', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-stats',
		$theme_uri . '/assets/js/about-stats.js',
		array( 'gsap' ),
		file_exists( $stats_js ) ? (string) filemtime( $stats_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

$company_info_css = $theme_dir . '/assets/css/about-company-info.css';
$company_info_js  = $theme_dir . '/assets/js/about-company-info.js';

if ( ! wp_style_is( 'bi-about-company-info', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-company-info',
		$theme_uri . '/assets/css/about-company-info.css',
		array( 'astra-child-style' ),
		file_exists( $company_info_css ) ? (string) filemtime( $company_info_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-company-info', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-company-info',
		$theme_uri . '/assets/js/about-company-info.js',
		array( 'gsap' ),
		file_exists( $company_info_js ) ? (string) filemtime( $company_info_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

$team_css = $theme_dir . '/assets/css/about-team.css';
$team_js  = $theme_dir . '/assets/js/about-team.js';

if ( ! wp_style_is( 'bi-about-team', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-about-team',
		$theme_uri . '/assets/css/about-team.css',
		array( 'astra-child-style' ),
		file_exists( $team_css ) ? (string) filemtime( $team_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-about-team', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-about-team',
		$theme_uri . '/assets/js/about-team.js',
		array( 'gsap' ),
		file_exists( $team_js ) ? (string) filemtime( $team_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

get_header();
?>

<main class="bi-about-page" id="primary">
	<!-- Section 1: Hero Section (Modular) -->
	<?php get_template_part( 'template-parts/about/about-hero' ); ?>

	<!-- Section 3: Our Values & Animated Typography .fwt (Modular) -->
	<?php get_template_part( 'template-parts/about/about-values' ); ?>

	<!-- Section 2: Who We Are & Business Metrics (Modular) -->
	<?php get_template_part( 'template-parts/about/about-who' ); ?>

	<!-- Section 6: Our Team (Modular) -->
	<?php get_template_part( 'template-parts/about/about-team' ); ?>

	<!-- Section 4: Animated Statistics Cards (Modular) -->
	<?php get_template_part( 'template-parts/about/about-stats' ); ?>

	<!-- Section 5: Company Information (Modular) -->
	<?php get_template_part( 'template-parts/about/about-company-info' ); ?>
</main>

<?php
get_footer();
