<?php
/**
 * Better Insights - Blog / Insights Hero Section Template Part
 * Section 4: Blog Hero Section
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="bi-blog-hero" aria-label="<?php esc_attr_e( 'Better Insights Editorial Hero', 'astra-child' ); ?>">
	<!-- Ambient Background Glow & Minimal Grid Accents -->
	<div class="bi-blog-hero__ambient-glow" aria-hidden="true"></div>
	<div class="bi-blog-hero__ambient-grid" aria-hidden="true"></div>

	<div class="bi-blog-hero__container">
		<div class="bi-blog-hero__content">

			<!-- Eyebrow Pill Tag -->
			<div class="bi-blog-hero__eyebrow-wrap">
				<span class="bi-blog-hero__eyebrow-dot" aria-hidden="true"></span>
				<span class="bi-blog-hero__eyebrow"><?php esc_html_e( 'BETTER INSIGHTS / IDEAS & PERSPECTIVES', 'astra-child' ); ?></span>
			</div>

			<!-- Main Editorial Heading -->
			<h1 class="bi-blog-hero__heading">
				<?php esc_html_e( 'IDEAS THAT MOVE', 'astra-child' ); ?>
				<span class="bi-blog-hero__accent"><?php esc_html_e( 'BUSINESS FORWARD.', 'astra-child' ); ?></span>
			</h1>

			<!-- Supporting Copy -->
			<p class="bi-blog-hero__desc">
				<?php esc_html_e( "Explore perspectives on AI, digital transformation, marketing, technology, and the ideas shaping what's next.", 'astra-child' ); ?>
			</p>

			<!-- Quick Jump / Scroll Indicator -->
			<div class="bi-blog-hero__actions">
				<a href="#bi-insights-feed" class="bi-cta bi-cta--blue bi-blog-hero__cta" id="bi-blog-scroll-cta">
					<span><?php esc_html_e( 'BROWSE ALL INSIGHTS', 'astra-child' ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<!-- Down arrow ↘ -->
						<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 4.5L11.5 11.5M11.5 11.5H5.5M11.5 11.5V5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</div>

		</div>
	</div>
</section>
