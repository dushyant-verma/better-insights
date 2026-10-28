<?php
/**
 * Better Insights - About Page Hero Section Template Part
 * Reference: OWLED Media (https://www.owledmedia.com/socials)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$upload_base  = content_url( '/uploads/2026/10/' );
$contact_page = get_page_by_path( 'contact' );
$contact_url  = $contact_page ? get_permalink( $contact_page->ID ) : '#colophon';

// Column 1 visual items (4 unique portfolio/solutions images)
$col1_items = array(
	array(
		'image'  => $upload_base . 'AI-AUTOMATION.webp',
		'alt'    => __( 'AI and Automation Solutions - Better Insights', 'astra-child' ),
		'height' => 290,
	),
	array(
		'image'  => $upload_base . 'Connecting-Technology-People-and-Process.webp',
		'alt'    => __( 'Connecting Technology, People and Process', 'astra-child' ),
		'height' => 210,
	),
	array(
		'image'  => $upload_base . 'BUILT-FOR-BUSINESS-IMPACT.webp',
		'alt'    => __( 'Built for Business Impact', 'astra-child' ),
		'height' => 270,
	),
	array(
		'image'  => $upload_base . 'blog01.webp',
		'alt'    => __( 'Digital Strategy and Creative Engineering', 'astra-child' ),
		'height' => 230,
	),
);

// Column 2 visual items (4 unique portfolio/solutions images)
$col2_items = array(
	array(
		'image'  => $upload_base . 'TECHNOLOGY-ENGINEERING.webp',
		'alt'    => __( 'Technology and Engineering Architecture', 'astra-child' ),
		'height' => 230,
	),
	array(
		'image'  => $upload_base . 'INTELLIGENT-BY-DESIGN.webp',
		'alt'    => __( 'Intelligent by Design Digital Systems', 'astra-child' ),
		'height' => 310,
	),
	array(
		'image'  => $upload_base . 'DIGITAL-GROWTH.webp',
		'alt'    => __( 'Measurable Digital Growth', 'astra-child' ),
		'height' => 200,
	),
	array(
		'image'  => $upload_base . 'Intelligent-Automation-for-Modern-Business.webp',
		'alt'    => __( 'Intelligent Automation for Modern Business', 'astra-child' ),
		'height' => 280,
	),
);

// Column 3 visual items (4 unique portfolio/solutions images)
$col3_items = array(
	array(
		'image'  => $upload_base . 'DIGITAL-TRANSFORMATION.webp',
		'alt'    => __( 'Enterprise Digital Transformation', 'astra-child' ),
		'height' => 280,
	),
	array(
		'image'  => $upload_base . 'CRM-INTEGRATIONS.webp',
		'alt'    => __( 'Connected CRM and Cloud Integrations', 'astra-child' ),
		'height' => 220,
	),
	array(
		'image'  => $upload_base . 'CONNECTED-AUTOMATED.webp',
		'alt'    => __( 'Connected and Automated Systems', 'astra-child' ),
		'height' => 300,
	),
	array(
		'image'  => $upload_base . 'Digital-Experiences-Built-to-Perform.webp',
		'alt'    => __( 'Digital Experiences Built to Perform', 'astra-child' ),
		'height' => 240,
	),
);
?>

<section class="bi-about-hero" aria-label="<?php esc_attr_e( 'About Better Insights Hero', 'astra-child' ); ?>">
	<div class="bi-about-hero__ambient-glow" aria-hidden="true"></div>

	<div class="bi-about-hero__container">
		<div class="bi-about-hero__grid">

			<!-- LEFT COLUMN: Brand Story & Editorial Messaging -->
			<div class="bi-about-hero__content">
				
				<div class="bi-about-hero__eyebrow-wrap">
					<span class="bi-about-hero__eyebrow-dot" aria-hidden="true"></span>
					<span class="bi-about-hero__eyebrow"><?php esc_html_e( 'ABOUT BETTER INSIGHTS', 'astra-child' ); ?></span>
				</div>

				<h1 class="bi-about-hero__heading">
					BUILT FOR THE NEXT ERA OF <span class="bi-about-hero__accent">DIGITAL.</span>
				</h1>

				<div class="bi-about-hero__desc">
					<p class="bi-about-hero__desc-lead">
						<?php esc_html_e( 'We bring strategy, creativity, AI, and technology together to help businesses move forward.', 'astra-child' ); ?>
					</p>
					<p class="bi-about-hero__desc-sub">
						<?php esc_html_e( 'From digital experiences to intelligent automation, we turn complex challenges into meaningful business outcomes.', 'astra-child' ); ?>
					</p>
				</div>

				<div class="bi-about-hero__cta-wrap">
					<a
						href="<?php echo esc_url( $contact_url ); ?>"
						class="bi-about-hero__cta"
						aria-label="<?php esc_attr_e( "Let's build something - Contact Better Insights", 'astra-child' ); ?>"
					>
						<span class="bi-about-hero__cta-text"><?php esc_html_e( "LET'S BUILD SOMETHING", 'astra-child' ); ?></span>
						<span class="bi-about-hero__cta-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<line x1="7" y1="17" x2="17" y2="7"></line>
								<polyline points="7 7 17 7 17 17"></polyline>
							</svg>
						</span>
					</a>
				</div>

			</div>

			<!-- RIGHT COLUMN: Multi-Column Moving Portfolio Collage Slider -->
			<div class="bi-about-hero__visual" aria-label="<?php esc_attr_e( 'Better Insights Portfolio and Project Visuals Collage', 'astra-child' ); ?>">
				<div class="bi-about-collage">

					<!-- Column 1 (Moves Upwards) -->
					<div class="bi-about-collage-col bi-about-collage-col--1" data-collage-col="1">
						<div class="bi-about-collage-track" data-collage-track="1">
							<!-- Original Set -->
							<div class="bi-about-collage-set">
								<?php foreach ( $col1_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt="<?php echo esc_attr( $item['alt'] ); ?>"
											loading="eager"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
							<!-- Duplicated Set for Seamless Infinite Vertical Loop -->
							<div class="bi-about-collage-set" aria-hidden="true">
								<?php foreach ( $col1_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt=""
											loading="lazy"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					</div>

					<!-- Column 2 (Moves Downwards) -->
					<div class="bi-about-collage-col bi-about-collage-col--2" data-collage-col="2">
						<div class="bi-about-collage-track" data-collage-track="2">
							<!-- Original Set -->
							<div class="bi-about-collage-set">
								<?php foreach ( $col2_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt="<?php echo esc_attr( $item['alt'] ); ?>"
											loading="eager"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
							<!-- Duplicated Set for Seamless Infinite Vertical Loop -->
							<div class="bi-about-collage-set" aria-hidden="true">
								<?php foreach ( $col2_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt=""
											loading="lazy"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					</div>

					<!-- Column 3 (Moves Upwards) -->
					<div class="bi-about-collage-col bi-about-collage-col--3" data-collage-col="3">
						<div class="bi-about-collage-track" data-collage-track="3">
							<!-- Original Set -->
							<div class="bi-about-collage-set">
								<?php foreach ( $col3_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt="<?php echo esc_attr( $item['alt'] ); ?>"
											loading="eager"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
							<!-- Duplicated Set for Seamless Infinite Vertical Loop -->
							<div class="bi-about-collage-set" aria-hidden="true">
								<?php foreach ( $col3_items as $item ) : ?>
									<div class="bi-about-collage-card" style="height: <?php echo esc_attr( $item['height'] ); ?>px;">
										<img
											class="bi-about-collage-img"
											src="<?php echo esc_url( $item['image'] ); ?>"
											alt=""
											loading="lazy"
											decoding="async"
										/>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</section>
