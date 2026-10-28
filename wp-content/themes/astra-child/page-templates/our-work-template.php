<?php
/**
 * Template Name: Better Insights Our Work Page
 * The master template for displaying the Better Insights Our Work / Case Studies page.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Our Work Master Stylesheet
$our_work_css = $theme_dir . '/assets/css/our-work.css';
if ( ! wp_style_is( 'bi-our-work-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-our-work-style',
		$theme_uri . '/assets/css/our-work.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $our_work_css ) ? (string) filemtime( $our_work_css ) : wp_get_theme()->get( 'Version' )
	);
}

// Our Work Master Interactive Script
$our_work_js = $theme_dir . '/assets/js/our-work.js';
if ( ! wp_script_is( 'bi-our-work-script', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-our-work-script',
		$theme_uri . '/assets/js/our-work.js',
		array(),
		file_exists( $our_work_js ) ? (string) filemtime( $our_work_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

// Case Studies Stylesheet & Script
$case_css = $theme_dir . '/assets/css/case-studies.css';
if ( ! wp_style_is( 'bi-case-studies-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-case-studies-style',
		$theme_uri . '/assets/css/case-studies.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $case_css ) ? (string) filemtime( $case_css ) : wp_get_theme()->get( 'Version' )
	);
}

$case_js = $theme_dir . '/assets/js/case-studies-filter.js';
if ( ! wp_script_is( 'bi-case-studies-filter', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-case-studies-filter',
		$theme_uri . '/assets/js/case-studies-filter.js',
		array(),
		file_exists( $case_js ) ? (string) filemtime( $case_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

// Add page-specific body class for transparent header styling
add_filter(
	'body_class',
	function( $classes ) {
		$classes[] = 'bi-our-work-page-active';
		return $classes;
	}
);

get_header();
?>

<main class="bi-our-work-page" id="primary">
	<!-- Section 1: Reusable Cinematic Our Work Hero Banner -->
	<?php get_template_part( 'template-parts/our-work/our-work-hero' ); ?>

	<!-- Section 2: Flagship Client Success Stories & Case Studies Section -->
	<?php get_template_part( 'template-parts/our-work/client-success-stories' ); ?>

	<!-- Section 3: Case Studies Showcase & Content Area -->
	<div class="bi-our-work-body">
		<?php
		// Preserve case-study showcase deck
		get_template_part( 'template-parts/homepage/our-work-carousel' );

		// Client Recognition Testimonial Marquee Slider
		get_template_part( 'template-parts/common/testimonial-marquee' );

		// Render any additional post content if added via WordPress editor
		while ( have_posts() ) :
			the_post();
			if ( get_the_content() ) :
				?>
				<div class="bi-our-work-container entry-content">
					<?php the_content(); ?>
				</div>
				<?php
			endif;
		endwhile;
		?>
	</div>
</main>

<?php
get_footer();
