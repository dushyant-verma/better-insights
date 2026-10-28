<?php
/**
 * Better Insights - Reusable Single Service Page Hero Template Part
 * Section: Full-Width Cinematic Dark Hero with Video & Editorial Typography
 * Visual Reference: Nagarro Digital Engineering Hero
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_id     = get_the_ID();
$slug        = get_post_field( 'post_name', $post_id );
$title       = get_the_title( $post_id );
$upload_dir  = wp_upload_dir();
$upload_base = rtrim( $upload_dir['baseurl'], '/' );

// 1. Dynamic Eyebrow / Service Category Label (editable via custom field or automatic mapping)
$eyebrow = get_post_meta( $post_id, 'bi_service_eyebrow', true );
if ( empty( $eyebrow ) ) {
	$eyebrow = get_post_meta( $post_id, 'eyebrow', true );
}
if ( empty( $eyebrow ) ) {
	$service_category_map = array(
		'ai-solutions'           => __( 'AI & Automation', 'astra-child' ),
		'ai-automation'          => __( 'AI & Automation', 'astra-child' ),
		'digital-transformation' => __( 'Digital Transformation', 'astra-child' ),
		'crm-development'        => __( 'CRM & Integrations', 'astra-child' ),
		'crm-integrations'       => __( 'CRM & Integrations', 'astra-child' ),
		'technology-engineering' => __( 'Technology & Engineering', 'astra-child' ),
		'web-development'        => __( 'Technology & Engineering', 'astra-child' ),
		'website-development'    => __( 'Technology & Engineering', 'astra-child' ),
		'digital-growth'         => __( 'Digital Growth', 'astra-child' ),
		'performance-marketing'  => __( 'Digital Growth', 'astra-child' ),
		'digital-marketing'      => __( 'Digital Marketing', 'astra-child' ),
		'seo-search-strategy'    => __( 'SEO & Strategy', 'astra-child' ),
		'seo'                    => __( 'SEO & Strategy', 'astra-child' ),
		'data-analytics'         => __( 'Data & Analytics', 'astra-child' ),
		'managed-technology'     => __( 'Managed Technology', 'astra-child' ),
	);
	$eyebrow = isset( $service_category_map[ $slug ] ) ? $service_category_map[ $slug ] : __( 'Services', 'astra-child' );
}

// 2. Dynamic Main H1 (editable via custom field or WordPress page title)
$h1_custom = get_post_meta( $post_id, 'bi_service_h1', true );
$h1_title  = ! empty( $h1_custom ) ? $h1_custom : ( ! empty( $title ) ? $title : __( 'Enterprise Services', 'astra-child' ) );

// 3. Dynamic CTA Button (label and URL)
$cta_label_custom = get_post_meta( $post_id, 'bi_service_cta_label', true );
$cta_label        = ! empty( $cta_label_custom ) ? $cta_label_custom : __( "LET'S TALK", 'astra-child' );

$cta_url_custom   = get_post_meta( $post_id, 'bi_service_cta_url', true );
$cta_url          = ! empty( $cta_url_custom ) ? $cta_url_custom : home_url( '/contact/' );

// 4. Background Video & Poster Asset
$custom_video = get_post_meta( $post_id, 'bi_service_video_url', true );
$video_url    = ! empty( $custom_video ) ? $custom_video : $upload_base . '/2026/10/2.mp4';

// Poster Image Fallback (Priority: Featured Image -> Category WebP -> Default WebP)
$poster_url = get_the_post_thumbnail_url( $post_id, 'full' );
if ( ! $poster_url ) {
	$slug_posters = array(
		'ai-solutions'           => $upload_base . '/2026/10/AI-AUTOMATION.webp',
		'ai-automation'          => $upload_base . '/2026/10/AI-AUTOMATION.webp',
		'digital-transformation' => $upload_base . '/2026/10/DIGITAL-TRANSFORMATION.webp',
		'crm-development'        => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
		'crm-integrations'       => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
		'technology-engineering' => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
		'web-development'        => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
		'digital-growth'         => $upload_base . '/2026/10/DIGITAL-GROWTH.webp',
		'managed-technology'     => $upload_base . '/2026/10/MANAGED-TECHNOLOGY.webp',
	);
	$poster_url = isset( $slug_posters[ $slug ] ) ? $slug_posters[ $slug ] : $upload_base . '/2026/10/Technology-That-Moves-Business-Forward.webp';
}
?>

<section class="bi-service-hero" aria-label="<?php echo esc_attr( sprintf( __( '%s Hero Banner', 'astra-child' ), $h1_title ) ); ?>">

	<!-- Full-Width Background Media Layer (Video & Static Fallback Poster) -->
	<div class="bi-service-hero__media" aria-hidden="true">
		<video
			class="bi-service-hero__video"
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
			class="bi-service-hero__poster"
			src="<?php echo esc_url( $poster_url ); ?>"
			alt=""
			loading="eager"
			fetchpriority="high"
			aria-hidden="true"
		/>

		<!-- Cinematic Dark Navy / Black Contrast Overlay -->
		<div class="bi-service-hero__overlay"></div>

		<!-- Subtle Ambient Blue Glow and Abstract Grid -->
		<div class="bi-service-hero__ambient-glow"></div>
		<div class="bi-service-hero__ambient-grid"></div>
	</div>

	<!-- Content Layer (Left-aligned, max-width: 1380px, generous horizontal padding) -->
	<div class="bi-service-hero__container">
		<div class="bi-service-hero__content">

			<!-- Small Bright Accent-Colored Service / Category Label -->
			<div class="bi-service-hero__label-wrap">
				<span class="bi-service-hero__label-dot" aria-hidden="true"></span>
				<span class="bi-service-hero__label"><?php echo esc_html( $eyebrow ); ?></span>
			</div>

			<!-- Large Lightweight White Service Title (H1) -->
			<h1 class="bi-service-hero__title">
				<?php echo esc_html( $h1_title ); ?>
			</h1>

			<!-- Rounded Accent-Color CTA Button -->
			<div class="bi-service-hero__cta-wrap">
				<a
					href="<?php echo esc_url( $cta_url ); ?>"
					class="bi-cta bi-cta--blue bi-service-hero__cta"
					aria-label="<?php echo esc_attr( sprintf( __( '%s - %s', 'astra-child' ), $cta_label, $h1_title ) ); ?>"
				>
					<span><?php echo esc_html( $cta_label ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</div>

		</div>
	</div>

</section>
