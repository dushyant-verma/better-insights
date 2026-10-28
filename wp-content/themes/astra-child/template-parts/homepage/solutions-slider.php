<?php
/**
 * Better Insights "How We Help / Our Solutions" Slider Section.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$theme_uri       = get_stylesheet_directory_uri();
$upload_dir      = wp_upload_dir();
$upload_base_url = rtrim( $upload_dir['baseurl'], '/' );

$solution_cards = array(
	array(
		'title'       => __( 'AI & AUTOMATION', 'astra-child' ),
		'description' => __( 'Build intelligent workflows, AI-powered experiences and automation systems that reduce manual work and help your business move faster.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/AI-AUTOMATION.webp',
	),
	array(
		'title'       => __( 'DIGITAL GROWTH', 'astra-child' ),
		'description' => __( 'Create high-performing digital experiences that strengthen your brand, attract the right audience and turn attention into measurable growth.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/DIGITAL-GROWTH.webp',
	),
	array(
		'title'       => __( 'TECHNOLOGY & ENGINEERING', 'astra-child' ),
		'description' => __( 'From websites and applications to APIs and custom platforms, we engineer reliable technology built around your business requirements.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
	),
	array(
		'title'       => __( 'DIGITAL TRANSFORMATION', 'astra-child' ),
		'description' => __( 'Connect strategy, technology and execution to modernize operations, improve customer experiences and create scalable digital foundations.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/DIGITAL-TRANSFORMATION.webp',
	),
	array(
		'title'       => __( 'CRM & INTEGRATIONS', 'astra-child' ),
		'description' => __( 'Connect your CRM, marketing, sales and business systems to create seamless data flows, better visibility and stronger customer journeys.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/CRM-INTEGRATIONS.webp',
	),
	array(
		'title'       => __( 'MANAGED TECHNOLOGY', 'astra-child' ),
		'description' => __( 'Keep your digital ecosystem optimized with continuous improvements, technical support, performance optimization and ongoing innovation.', 'astra-child' ),
		'cta_text'    => __( 'Explore Solution', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/MANAGED-TECHNOLOGY.webp',
	),
);
?>

<section class="bi-solutions-section bi-theme--dark" data-theme="dark" data-theme-transition="solutions" aria-label="<?php esc_attr_e( 'Our Solutions', 'astra-child' ); ?>">
	<div class="bi-solutions-container bi-container">

		<!-- Editorial Header Above Slider -->
		<div class="bi-solutions-header">
			<span class="bi-solutions-subtitle"><?php esc_html_e( 'OUR SOLUTIONS', 'astra-child' ); ?></span>
			<h2 class="bi-solutions-title"><?php esc_html_e( 'Solutions built around your business.', 'astra-child' ); ?></h2>
		</div>

		<!-- Slider Wrapper with Arrows -->
		<div class="bi-solutions-slider-wrapper" data-bi-slider-root tabindex="0">

			<!-- Circular Arrow Navigation -->
			<div class="bi-solutions-controls">
				<button
					type="button"
					class="bi-solutions-nav-btn bi-solutions-nav-btn--prev"
					data-bi-slider-prev
					aria-label="<?php esc_attr_e( 'Previous solution', 'astra-child' ); ?>"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>

				<button
					type="button"
					class="bi-solutions-nav-btn bi-solutions-nav-btn--next"
					data-bi-slider-next
					aria-label="<?php esc_attr_e( 'Next solution', 'astra-child' ); ?>"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>

			<!-- Track & Slides -->
			<div class="bi-solutions-track-container" data-bi-slider-track-container>
				<div class="bi-solutions-track" data-bi-slider-track>

					<!-- LEFT INTRO PANEL -->
					<div class="bi-solution-intro-panel" data-bi-slider-item>
						<div class="bi-solution-intro-panel__inner">
							<span class="bi-solution-intro-panel__label"><?php esc_html_e( 'HOW WE HELP', 'astra-child' ); ?></span>
							<p class="bi-solution-intro-panel__desc">
								<?php esc_html_e( 'We combine strategy, AI, technology and digital growth to help businesses build smarter experiences, automate operations and create measurable digital impact.', 'astra-child' ); ?>
							</p>
						</div>
					</div>

					<!-- 6 SERVICE CARDS -->
					<?php foreach ( $solution_cards as $idx => $card ) : ?>
						<article class="bi-solution-card" data-bi-slider-item>
							<div class="bi-solution-card__image-wrap">
								<img
									src="<?php echo esc_url( $card['image_url'] ); ?>"
									alt="<?php echo esc_attr( $card['title'] ); ?>"
									class="bi-solution-card__image"
									loading="lazy"
								>
							</div>

							<div class="bi-solution-card__content">
								<h3 class="bi-solution-card__title"><?php echo esc_html( $card['title'] ); ?></h3>
								<p class="bi-solution-card__desc"><?php echo esc_html( $card['description'] ); ?></p>

								<div class="bi-solution-card__cta-wrap">
									<a href="<?php echo esc_url( $card['cta_url'] ); ?>" class="bi-solution-card__cta">
										<span><?php echo esc_html( $card['cta_text'] ); ?></span>
										<span class="bi-solution-card__cta-icon" aria-hidden="true">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
												<line x1="7" y1="17" x2="17" y2="7"></line>
												<polyline points="7 7 17 7 17 17"></polyline>
											</svg>
										</span>
									</a>
								</div>
							</div>
						</article>
					<?php endforeach; ?>

				</div>
			</div>

			<!-- PROGRESS INDICATOR TRACK -->
			<div class="bi-solutions-progress-wrap" aria-hidden="true">
				<div class="bi-solutions-progress-track">
					<div class="bi-solutions-progress-bar" data-bi-slider-progress></div>
				</div>
			</div>

		</div>

	</div>
</section>
