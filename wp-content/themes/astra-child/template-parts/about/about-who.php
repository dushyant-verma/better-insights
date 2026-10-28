<?php
/**
 * Better Insights - About Page Section 2: Who We Are & Business Metrics
 * Reference: Ascendion "Who We Are" (https://ascendion.com/who-we-are/)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$upload_base = content_url( '/uploads/2026/10/' );
$banner_bg   = $upload_base . 'BI-media.webp';

// Resolve verified capabilities / services destination URL
$services_page     = get_page_by_path( 'services' );
$ai_solutions_page = get_page_by_path( 'ai-solutions' );
$capabilities_url  = $services_page ? get_permalink( $services_page->ID ) : ( $ai_solutions_page ? get_permalink( $ai_solutions_page->ID ) : home_url( '/ai-solutions/' ) );

// Verified Better Insights Business Metrics
$metrics = array(
	array(
		'number' => '36',
		'symbol' => '+',
		'label'  => __( 'Clients & Brands Served', 'astra-child' ),
		'desc'   => __( 'Enterprise & high-growth businesses', 'astra-child' ),
	),
	array(
		'number' => '8',
		'symbol' => '+',
		'label'  => __( 'Technology Platforms', 'astra-child' ),
		'desc'   => __( 'Cloud, CRM & AI partner integrations', 'astra-child' ),
	),
	array(
		'number' => '6',
		'symbol' => '',
		'label'  => __( 'Core Digital Capabilities', 'astra-child' ),
		'desc'   => __( 'Strategy, creative & engineering', 'astra-child' ),
	),
	array(
		'number' => '100',
		'symbol' => '%',
		'label'  => __( 'Outcome-Driven Focus', 'astra-child' ),
		'desc'   => __( 'Accountable, measurable ROI delivery', 'astra-child' ),
	),
);
?>

<section class="bi-about-who" id="who-we-are" aria-label="<?php esc_attr_e( 'Who We Are and Business Capabilities', 'astra-child' ); ?>">

	<!-- 1. INTRODUCTORY BANNER -->
	<div class="bi-about-who__banner">
		<div class="bi-about-who__banner-bg" style="background-image: url('<?php echo esc_url( $banner_bg ); ?>');" aria-hidden="true">
			<div class="bi-about-who__banner-overlay"></div>
		</div>

		<div class="bi-about-who__container">
			<div class="bi-about-who__banner-content">
				<span class="bi-about-who__banner-eyebrow"><?php esc_html_e( 'WHO WE ARE', 'astra-child' ); ?></span>
				<h2 class="bi-about-who__banner-title"><?php esc_html_e( 'Who We Are', 'astra-child' ); ?></h2>
				<p class="bi-about-who__banner-desc">
					<?php esc_html_e( 'Better Insights brings strategy, creativity, marketing, and technology together to help businesses grow. We combine human insight with intelligent solutions to create digital experiences and measurable business impact.', 'astra-child' ); ?>
				</p>
			</div>
		</div>
	</div>

	<!-- 2. MAIN EDITORIAL STATEMENT (Two-Column on Black) -->
	<div class="bi-about-who__statement-wrap">
		<div class="bi-about-who__container">
			<div class="bi-about-who__statement-grid">

				<!-- Left Column: Large Editorial Statement -->
				<div class="bi-about-who__statement-left">
					<h3 class="bi-about-who__statement-heading">
						BUSINESS GROWTH WAS THE GOAL.<br>
						<span class="bi-about-who__statement-accent">NOW, LET’S MAKE IT MEASURABLE.</span>
					</h3>
				</div>

				<!-- Right Column: Supporting Copy -->
				<div class="bi-about-who__statement-right">
					<p class="bi-about-who__statement-desc">
						<?php esc_html_e( 'We connect creative thinking, digital experiences, marketing, and technology to help businesses solve meaningful challenges, work smarter, and move forward with confidence.', 'astra-child' ); ?>
					</p>
				</div>

			</div>
		</div>
	</div>

	<!-- 3. BUSINESS METRICS (Horizontal Grid with Subtle Dividers) -->
	<div class="bi-about-who__metrics-wrap">
		<div class="bi-about-who__container">
			<div class="bi-about-who__metrics-grid">
				<?php foreach ( $metrics as $index => $metric ) : ?>
					<div class="bi-about-who__metric-card" data-metric-card="<?php echo esc_attr( $index + 1 ); ?>">
						<div class="bi-about-who__metric-stat">
							<span class="bi-about-who__metric-num"><?php echo esc_html( $metric['number'] ); ?></span><?php if ( ! empty( $metric['symbol'] ) ) : ?><span class="bi-about-who__metric-sym"><?php echo esc_html( $metric['symbol'] ); ?></span><?php endif; ?>
						</div>
						<h4 class="bi-about-who__metric-label"><?php echo esc_html( $metric['label'] ); ?></h4>
						<p class="bi-about-who__metric-sub"><?php echo esc_html( $metric['desc'] ); ?></p>
						<div class="bi-about-who__metric-line" aria-hidden="true"></div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<!-- 4. COMPACT WHITE CTA BUTTON -->
	<div class="bi-about-who__cta-wrap">
		<div class="bi-about-who__container">
			<div class="bi-about-who__cta-inner">
				<a
					href="<?php echo esc_url( $capabilities_url ); ?>"
					class="bi-about-who__cta-btn"
					aria-label="<?php esc_attr_e( 'Explore Our Capabilities - Better Insights Services', 'astra-child' ); ?>"
				>
					<span class="bi-about-who__cta-text"><?php esc_html_e( 'EXPLORE OUR CAPABILITIES', 'astra-child' ); ?></span>
					<span class="bi-about-who__cta-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</div>

</section>
