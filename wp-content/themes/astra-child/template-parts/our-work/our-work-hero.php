<?php
/**
 * Better Insights - Our Work Page Hero Template Part
 * Section: Full-Width Cinematic Dark Hero with Video / Image & Editorial Typography
 * Visual Reference: Nagarro Enterprise Case Studies Hero Composition
 * Feature: Overlapping "Impact by the Numbers" Statistics Panel
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_id     = get_the_ID();
$theme_uri   = get_stylesheet_directory_uri();
$upload_dir  = wp_upload_dir();
$upload_base = rtrim( $upload_dir['baseurl'], '/' );

// 1. Dynamic Main Heading (One H1 with two visual lines, editable via custom fields)
$c_hl1 = get_post_meta( $post_id, 'bi_our_work_hero_heading_line1', true );
$c_hl2 = get_post_meta( $post_id, 'bi_our_work_hero_heading_line2', true );

$heading_line1 = ! empty( $c_hl1 ) ? $c_hl1 : __( 'REAL CHALLENGES.', 'astra-child' );
$heading_line2 = ! empty( $c_hl2 ) ? $c_hl2 : __( 'MEASURABLE IMPACT.', 'astra-child' );

// 2. Dynamic Supporting Text
$c_desc = get_post_meta( $post_id, 'bi_our_work_hero_desc', true );
$desc   = ! empty( $c_desc ) ? $c_desc : __( 'Discover how we partner with clients to turn complex challenges into meaningful outcomes, driving innovation, accelerating growth, and creating lasting impact.', 'astra-child' );

// 3. Background Media (Video with high-resolution poster fallback)
$custom_video  = get_post_meta( $post_id, 'bi_our_work_hero_video', true );
$custom_poster = get_post_meta( $post_id, 'bi_our_work_hero_poster', true );
$custom_image  = get_post_meta( $post_id, 'bi_our_work_hero_image', true );

$video_url  = ! empty( $custom_video ) ? $custom_video : $upload_base . '/2026/10/2.mp4';
$poster_url = ! empty( $custom_poster ) ? $custom_poster : ( ! empty( $custom_image ) ? $custom_image : $upload_base . '/2026/10/Connecting-Technology-People-and-Process.webp' );

// 4. Overlapping "Impact by the Numbers" Statistics
// Verified Better Insights figures from published client portfolio & capability models
$stat1_val  = get_post_meta( $post_id, 'bi_work_stat_1_val', true );
$stat1_suf  = get_post_meta( $post_id, 'bi_work_stat_1_suffix', true );
$stat1_desc = get_post_meta( $post_id, 'bi_work_stat_1_desc', true );

$stat2_val  = get_post_meta( $post_id, 'bi_work_stat_2_val', true );
$stat2_suf  = get_post_meta( $post_id, 'bi_work_stat_2_suffix', true );
$stat2_desc = get_post_meta( $post_id, 'bi_work_stat_2_desc', true );

$stat3_val  = get_post_meta( $post_id, 'bi_work_stat_3_val', true );
$stat3_suf  = get_post_meta( $post_id, 'bi_work_stat_3_suffix', true );
$stat3_desc = get_post_meta( $post_id, 'bi_work_stat_3_desc', true );

$stat4_val  = get_post_meta( $post_id, 'bi_work_stat_4_val', true );
$stat4_suf  = get_post_meta( $post_id, 'bi_work_stat_4_suffix', true );
$stat4_desc = get_post_meta( $post_id, 'bi_work_stat_4_desc', true );

$impact_stats = array(
	// Metric 1: Verified client satisfaction percentage
	array(
		'number' => ( '' !== $stat1_val && false !== $stat1_val ) ? $stat1_val : '100',
		'suffix' => ( '' !== $stat1_suf && false !== $stat1_suf ) ? $stat1_suf : '%',
		'desc'   => ! empty( $stat1_desc ) ? $stat1_desc : __( 'Client Satisfaction & Outcome Commitment', 'astra-child' ),
	),
	// Metric 2: Verified number of clients or markets served (36 partner brands in client-logo-wall)
	array(
		'number' => ( '' !== $stat2_val && false !== $stat2_val ) ? $stat2_val : '36',
		'suffix' => ( '' !== $stat2_suf && false !== $stat2_suf ) ? $stat2_suf : '+',
		'desc'   => ! empty( $stat2_desc ) ? $stat2_desc : __( 'Enterprise Clients & High-Growth Brands Served', 'astra-child' ),
	),
	// Metric 3: Verified years of experience / technology operations
	array(
		'number' => ( '' !== $stat3_val && false !== $stat3_val ) ? $stat3_val : '8',
		'suffix' => ( '' !== $stat3_suf && false !== $stat3_suf ) ? $stat3_suf : '+',
		'desc'   => ! empty( $stat3_desc ) ? $stat3_desc : __( 'Years of Digital Innovation & Technology Delivery', 'astra-child' ),
	),
	// Metric 4: Verified completed projects / case studies (50+ from service-impact & about-stats)
	array(
		'number' => ( '' !== $stat4_val && false !== $stat4_val ) ? $stat4_val : '50',
		'suffix' => ( '' !== $stat4_suf && false !== $stat4_suf ) ? $stat4_suf : '+',
		'desc'   => ! empty( $stat4_desc ) ? $stat4_desc : __( 'Completed Digital Solutions & Transformations', 'astra-child' ),
	),
);
?>

<section class="bi-our-work-hero" aria-label="<?php esc_attr_e( 'Our Work Showcase Hero', 'astra-child' ); ?>">

	<!-- Full-Width Background Video & Media Layer -->
	<div class="bi-our-work-hero__media" aria-hidden="true">
		<video
			class="bi-our-work-hero__video"
			autoplay
			muted
			loop
			playsinline
			preload="auto"
			poster="<?php echo esc_url( $poster_url ); ?>"
		>
			<source src="<?php echo esc_url( $video_url ); ?>" type="video/mp4">
		</video>

		<!-- High-Resolution Static Fallback Poster Image -->
		<img
			class="bi-our-work-hero__fallback-img"
			src="<?php echo esc_url( $poster_url ); ?>"
			alt=""
			loading="eager"
			fetchpriority="high"
		/>

		<!-- Asymmetric Dark Navy / Black Gradient Overlay -->
		<div class="bi-our-work-hero__overlay"></div>

		<!-- Subtle Ambient Technological Vignette -->
		<div class="bi-our-work-hero__vignette"></div>
	</div>

	<!-- Hero Container & Typography Content -->
	<div class="bi-our-work-hero__container">
		<div class="bi-our-work-hero__content">

			<!-- One H1 with Two Visual Lines -->
			<h1 class="bi-our-work-hero__title">
				<span class="bi-our-work-hero__title-line"><?php echo esc_html( $heading_line1 ); ?></span>
				<span class="bi-our-work-hero__title-line"><?php echo esc_html( $heading_line2 ); ?></span>
			</h1>

			<!-- Supporting Paragraph -->
			<p class="bi-our-work-hero__desc">
				<?php echo esc_html( $desc ); ?>
			</p>

		</div>
	</div>

	<!-- Floating Overlapping Statistics Panel (Impact by the Numbers) -->
	<div class="bi-work-impact-panel-wrap">
		<div class="bi-work-impact-panel" id="impact-by-the-numbers">
			
			<!-- Panel Heading with BI-blue Line Icon -->
			<header class="bi-work-impact-panel__header">
				<div class="bi-work-impact-panel__heading-wrap">
					<span class="bi-work-impact-panel__icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
						</svg>
					</span>
					<h2 class="bi-work-impact-panel__title"><?php esc_html_e( 'IMPACT BY THE NUMBERS', 'astra-child' ); ?></h2>
				</div>
			</header>

			<!-- 4 Evenly Spaced Columns with Light-Gray Vertical Dividers -->
			<div class="bi-work-impact-panel__grid">
				<?php foreach ( $impact_stats as $stat ) : ?>
					<div class="bi-work-impact-col">
						<div class="bi-work-impact-col__val-wrap">
							<span class="bi-work-impact-col__number" data-target="<?php echo esc_attr( $stat['number'] ); ?>">
								<?php echo esc_html( $stat['number'] ); ?>
							</span>
							<span class="bi-work-impact-col__suffix"><?php echo esc_html( $stat['suffix'] ); ?></span>
						</div>
						<p class="bi-work-impact-col__desc"><?php echo esc_html( $stat['desc'] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>

		</div>
	</div>

</section>
