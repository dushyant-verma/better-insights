<?php
/*
Template Name: Better Insights Homepage
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Ensure homepage hero assets are enqueued before head is rendered
$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();
$home_css  = $theme_dir . '/assets/css/home.css';
$home_js   = $theme_dir . '/assets/js/home.js';

if ( ! wp_style_is( 'bi-home', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-home',
		$theme_uri . '/assets/css/home.css',
		array( 'astra-child-style' ),
		file_exists( $home_css ) ? (string) filemtime( $home_css ) : wp_get_theme()->get( 'Version' )
	);
}

if ( ! wp_script_is( 'bi-home', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-home',
		$theme_uri . '/assets/js/home.js',
		array(),
		file_exists( $home_js ) ? (string) filemtime( $home_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

get_header();

// Dynamically resolve upload video URLs
$upload_dir      = wp_upload_dir();
$upload_base_url = rtrim( $upload_dir['baseurl'], '/' );
$video_1_url     = $upload_base_url . '/2026/10/Banner-Video01.mp4';
$video_2_url     = $upload_base_url . '/2026/10/2.mp4';

// Slide 1 Content
$slide_1_eyebrow = __( 'AI & DIGITAL TRANSFORMATION', 'astra-child' );
$slide_1_heading = __( 'Better Marketing,<br>Better ROI.', 'astra-child' );
$slide_1_desc    = __( 'We’re not just a digital agency—we’re your growth partners. Better Insights transforms your marketing with AI, data-driven strategies, and measurable results that impact your bottom line.', 'astra-child' );
$slide_1_cta     = __( 'Explore Solutions', 'astra-child' );
$slide_1_url     = home_url( '/solutions/' );

// Slide 2 Content
$slide_2_eyebrow = __( 'BETTER INSIGHTS', 'astra-child' );
$slide_2_heading = __( 'Technology that<br>drives what’s next.', 'astra-child' );
$slide_2_desc    = __( 'From intelligent automation to digital engineering, we help businesses turn complex technology into real-world impact.', 'astra-child' );
$slide_2_cta     = __( 'Discover Better Insights', 'astra-child' );
$slide_2_url     = home_url( '/about/' );
?>

<main class="bi-homepage">
	<!-- Ambient Scroll Background (WPP Media Inspired) -->
	<?php get_template_part( 'template-parts/homepage/ambient-backdrop' ); ?>

	<!-- Vertical Scroll Progress Bar -->
	<div class="bi-scroll-progress" aria-hidden="true"><div class="bi-scroll-progress__bar"></div></div>

	<section class="bi-hero" aria-label="<?php esc_attr_e( 'Hero Showcase', 'astra-child' ); ?>">

		<!-- Slides Wrapper -->
		<div class="bi-hero__slides">

			<!-- Slide 1 -->
			<article class="bi-hero__slide is-active" data-bi-slide="0">
				<video
					class="bi-hero__video"
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
				>
					<source src="<?php echo esc_url( $video_1_url ); ?>" type="video/mp4">
				</video>

				<div class="bi-hero__overlay" aria-hidden="true"></div>

				<div class="bi-hero__content-container bi-container">
					<div class="bi-hero__content">
						<span class="bi-hero__eyebrow"><?php echo esc_html( $slide_1_eyebrow ); ?></span>
						<h1 class="bi-hero__heading"><?php echo wp_kses_post( $slide_1_heading ); ?></h1>
						<p class="bi-hero__desc"><?php echo esc_html( $slide_1_desc ); ?></p>
						<div class="bi-hero__cta-wrap">
							<a href="<?php echo esc_url( $slide_1_url ); ?>" class="bi-hero__cta">
								<?php echo esc_html( $slide_1_cta ); ?>
							</a>
						</div>
					</div>
				</div>
			</article>

			<!-- Slide 2 -->
			<article class="bi-hero__slide" data-bi-slide="1" aria-hidden="true">
				<video
					class="bi-hero__video"
					muted
					loop
					playsinline
					preload="metadata"
				>
					<source src="<?php echo esc_url( $video_2_url ); ?>" type="video/mp4">
				</video>

				<div class="bi-hero__overlay" aria-hidden="true"></div>

				<div class="bi-hero__content-container bi-container">
					<div class="bi-hero__content">
						<span class="bi-hero__eyebrow"><?php echo esc_html( $slide_2_eyebrow ); ?></span>
						<h2 class="bi-hero__heading"><?php echo wp_kses_post( $slide_2_heading ); ?></h2>
						<p class="bi-hero__desc"><?php echo esc_html( $slide_2_desc ); ?></p>
						<div class="bi-hero__cta-wrap">
							<a href="<?php echo esc_url( $slide_2_url ); ?>" class="bi-hero__cta">
								<?php echo esc_html( $slide_2_cta ); ?>
							</a>
						</div>
					</div>
				</div>
			</article>

		</div>

		<!-- Primary Pause / Play Pill Control -->
		<button
			type="button"
			class="bi-hero__pause-pill"
			data-bi-hero-toggle
			aria-label="<?php esc_attr_e( 'Pause video and slideshow', 'astra-child' ); ?>"
		>
			<span class="bi-hero__pause-icon" aria-hidden="true">
				<span class="bi-hero__icon-pause">
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
				</span>
				<span class="bi-hero__icon-play" hidden>
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
				</span>
			</span>
			<span class="bi-hero__pause-text"><?php esc_html_e( 'Pause video', 'astra-child' ); ?></span>
		</button>

		<!-- Bottom Controls Bar -->
		<div class="bi-hero__controls">
			<!-- Progress Line -->
			<div class="bi-hero__progress-track" aria-hidden="true">
				<div class="bi-hero__progress-bar" data-bi-hero-progress></div>
			</div>

			<div class="bi-hero__bottom">
				<!-- Slide Labels / Pagination -->
				<div class="bi-hero__pagination" role="tablist" aria-label="<?php esc_attr_e( 'Slide Navigation', 'astra-child' ); ?>">
					<button
						type="button"
						class="bi-hero__tab is-active"
						role="tab"
						aria-selected="true"
						data-bi-hero-goto="0"
						aria-label="<?php esc_attr_e( 'Go to Slide 1: Solutions', 'astra-child' ); ?>"
					>
						<span class="bi-hero__tab-num">01.</span>
						<span class="bi-hero__tab-label">Solutions</span>
					</button>

					<button
						type="button"
						class="bi-hero__tab"
						role="tab"
						aria-selected="false"
						data-bi-hero-goto="1"
						aria-label="<?php esc_attr_e( 'Go to Slide 2: Insights', 'astra-child' ); ?>"
					>
						<span class="bi-hero__tab-num">02.</span>
						<span class="bi-hero__tab-label">Insights</span>
					</button>
				</div>

				<!-- Navigation Arrow & Toggle Buttons -->
				<div class="bi-hero__navigation">
					<button
						type="button"
						class="bi-hero__nav-btn bi-hero__nav-btn--prev"
						data-bi-hero-prev
						aria-label="<?php esc_attr_e( 'Previous slide', 'astra-child' ); ?>"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>

					<button
						type="button"
						class="bi-hero__nav-btn bi-hero__nav-btn--toggle"
						data-bi-hero-toggle
						aria-label="<?php esc_attr_e( 'Pause video', 'astra-child' ); ?>"
					>
						<span class="bi-hero__icon-pause">
							<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
						</span>
						<span class="bi-hero__icon-play" hidden>
							<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
						</span>
					</button>

					<button
						type="button"
						class="bi-hero__nav-btn bi-hero__nav-btn--next"
						data-bi-hero-next
						aria-label="<?php esc_attr_e( 'Next slide', 'astra-child' ); ?>"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
				</div>
			</div>
		</div>

	</section>

	<?php get_template_part( 'template-parts/homepage/client-logo-wall' ); ?>

	<!-- Editorial Statement 1: Vision -->
	<!-- <section class="bi-statement-section bi-statement-section--dark" aria-label="<?php esc_attr_e( 'Editorial Statement Vision', 'astra-child' ); ?>">
		<div class="bi-statement-container bi-container bi-reveal-clip">
			<span class="bi-statement-eyebrow"><?php esc_html_e( 'OUR VISION', 'astra-child' ); ?></span>
			<h2 class="bi-statement-heading">
				WE BUILD<br><span class="bi-statement-accent">WHAT’S NEXT.</span>
			</h2>
		</div>
	</section> -->

	<?php get_template_part( 'template-parts/homepage/beliefs-stacking-cards' ); ?>

	<!-- Editorial Statement 2: AI -->
	<!-- <section class="bi-statement-section bi-statement-section--light" aria-label="<?php esc_attr_e( 'Editorial Statement AI', 'astra-child' ); ?>">
		<div class="bi-statement-container bi-container bi-reveal-clip">
			<span class="bi-statement-eyebrow"><?php esc_html_e( 'INTELLIGENT FUTURE', 'astra-child' ); ?></span>
			<h2 class="bi-statement-heading">
				TRANSFORMING BUSINESS<br><span class="bi-statement-accent">WITH AI.</span>
			</h2>
		</div>
	</section> -->

	<?php get_template_part( 'template-parts/homepage/solutions-slider' ); ?>

	<!-- Editorial Statement 3: Technology -->
	<section class="bi-statement-section bi-statement-section--dark" aria-label="<?php esc_attr_e( 'Editorial Statement Technology', 'astra-child' ); ?>">
		<div class="bi-statement-container bi-container bi-reveal-clip">
			<span class="bi-statement-eyebrow"><?php esc_html_e( 'ENGINEERING EXCELLENCE', 'astra-child' ); ?></span>
			<h2 class="bi-statement-heading">
				POWERED<br><span class="bi-statement-accent">WITH TECHNOLOGY.</span>
			</h2>
		</div>
	</section>

	<?php get_template_part( 'template-parts/homepage/services-grid' ); ?>

	<?php get_template_part( 'template-parts/homepage/our-work-carousel' ); ?>

	<!-- Client Recognition Testimonial Marquee Slider -->
	<?php get_template_part( 'template-parts/common/testimonial-marquee' ); ?>

	<?php get_template_part( 'template-parts/homepage/technology-partners' ); ?>

	<?php get_template_part( 'template-parts/homepage/resource-center' ); ?>
</main>

<?php
get_footer();

