<?php
/**
 * Better Insights - Contact Page Hero Section Template Part
 * Section 1: Contact Hero Banner with Full-Width Cinematic Background Video
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Dynamically resolve upload paths for local video and poster assets
$upload_dir  = wp_upload_dir();
$upload_base = rtrim( $upload_dir['baseurl'], '/' );
$video_url   = $upload_base . '/2026/10/2.mp4';
$poster_url  = $upload_base . '/2026/10/Technology-That-Moves-Business-Forward.webp';
?>

<section class="bi-contact-hero" aria-label="<?php esc_attr_e( 'Contact Better Insights Hero', 'astra-child' ); ?>">
	<!-- Full-Width Background Video & Cinematic Dark Navy Overlay -->
	<div class="bi-contact-hero__video-wrap" aria-hidden="true">
		<video
			class="bi-contact-hero__video"
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
			class="bi-contact-hero__fallback-img"
			src="<?php echo esc_url( $poster_url ); ?>"
			alt=""
			loading="eager"
			aria-hidden="true"
		/>
		<!-- Cinematic Dark Navy / Black Atmosphere Overlay -->
		<div class="bi-contact-hero__overlay"></div>
		<!-- Ambient Blue Glow and Abstract Digital Elements -->
		<div class="bi-contact-hero__ambient-glow"></div>
		<div class="bi-contact-hero__ambient-grid"></div>
	</div>

	<div class="bi-contact-hero__container">
		<div class="bi-contact-hero__content">

			<!-- Eyebrow Tag -->
			<div class="bi-contact-hero__eyebrow-wrap">
				<span class="bi-contact-hero__eyebrow-dot" aria-hidden="true"></span>
				<span class="bi-contact-hero__eyebrow"><?php esc_html_e( "LET'S TALK", 'astra-child' ); ?></span>
			</div>

			<!-- Large Editorial Headline -->
			<h1 class="bi-contact-hero__heading">
				<?php esc_html_e( "LET'S BUILD", 'astra-child' ); ?>
				<span class="bi-contact-hero__accent"><?php esc_html_e( "WHAT'S NEXT.", 'astra-child' ); ?></span>
			</h1>

			<!-- Supporting Copy -->
			<p class="bi-contact-hero__desc">
				<?php esc_html_e( "Have a project in mind, a business challenge to solve, or an idea worth exploring? Tell us what you're working on. We'll help you find the right way forward.", 'astra-child' ); ?>
			</p>

			<!-- Primary Action Button: Smooth scroll to enquiry section -->
			<div class="bi-contact-hero__cta-wrap">
				<a
					href="#enquiry-section"
					class="bi-cta bi-cta--blue bi-contact-hero__cta"
					id="bi-hero-scroll-cta"
					aria-label="<?php esc_attr_e( 'Start a conversation - Scroll to enquiry form', 'astra-child' ); ?>"
				>
					<span class="bi-contact-hero__cta-text"><?php esc_html_e( 'START A CONVERSATION', 'astra-child' ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<!-- Arrow pointing down-right ↘ -->
						<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 4.5L11.5 11.5M11.5 11.5H5.5M11.5 11.5V5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</div>

		</div>
	</div>
</section>
