<?php
/**
 * Better Insights "We Believe" Stacking Cards Homepage Section.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$theme_uri       = get_stylesheet_directory_uri();
$upload_dir      = wp_upload_dir();
$upload_base_url = rtrim( $upload_dir['baseurl'], '/' );

$belief_cards = array(
	array(
		'number'      => '01',
		'title'       => __( 'INTELLIGENT BY DESIGN', 'astra-child' ),
		'description' => __( 'We build intelligent digital experiences that combine AI, automation and technology around real business needs — not technology for technology\'s sake.', 'astra-child' ),
		'cta_text'    => __( 'Explore AI Solutions', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/INTELLIGENT-BY-DESIGN.webp',
	),
	array(
		'number'      => '02',
		'title'       => __( 'BUILT FOR BUSINESS IMPACT', 'astra-child' ),
		'description' => __( 'We connect strategy, technology and execution to create solutions that improve efficiency, customer experience and measurable business outcomes.', 'astra-child' ),
		'cta_text'    => __( 'Explore Digital Transformation', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
	),
	array(
		'number'      => '03',
		'title'       => __( 'CONNECTED & AUTOMATED', 'astra-child' ),
		'description' => __( 'We connect systems, data, people and workflows so businesses can reduce manual work, improve visibility and operate with greater speed.', 'astra-child' ),
		'cta_text'    => __( 'Explore Automation', 'astra-child' ),
		'cta_url'     => home_url( '/solutions/' ),
		'image_url'   => $upload_base_url . '/2026/10/CONNECTED-AUTOMATED.webp',
	),
	array(
		'number'      => '04',
		'title'       => __( 'BETTER TOGETHER', 'astra-child' ),
		'description' => __( 'We work alongside our clients as technology partners — combining creativity, engineering and business thinking to build what comes next.', 'astra-child' ),
		'cta_text'    => __( 'Work With Better Insights', 'astra-child' ),
		'cta_url'     => home_url( '/contact/' ),
		'image_url'   => $upload_base_url . '/2026/10/BETTER-TOGETHER.webp',
	),
);
?>

<section class="bi-beliefs-section bi-theme--stone" data-theme="stone" aria-label="<?php esc_attr_e( 'Our Beliefs and Approach', 'astra-child' ); ?>">
	<div class="bi-beliefs-container bi-container">

		<!-- PART 1: INTRO BLOCK -->
		<div class="bi-beliefs-intro">
			<div class="bi-beliefs-intro__left">
				<span class="bi-beliefs-subtitle"><?php esc_html_e( 'WE BELIEVE', 'astra-child' ); ?></span>
				<h2 class="bi-beliefs-title">
					<?php echo wp_kses_post( __( 'Better Marketing, <br>Better ROI.', 'astra-child' ) ); ?>
				</h2>
			</div>
			<div class="bi-beliefs-intro__right">
				<p class="bi-beliefs-desc">
					<?php esc_html_e( 'We combine technology, AI, automation and digital strategy to help businesses move faster, operate smarter and create measurable impact.', 'astra-child' ); ?>
				</p>
			</div>
		</div>

		<!-- PART 2: STACKING CARDS -->
		<div class="bi-stacking-cards">
			<?php foreach ( $belief_cards as $index => $card ) : ?>
				<?php
				$card_number   = $index + 1;
				// Base top sticky offset = 106px. Each stacked header row is 68px high.
				$top_offset_px = 106 + ( $index * 68 );
				$z_index       = $card_number * 10;
				?>
				<article
					class="bi-stacking-card bi-stacking-card--<?php echo esc_attr( $card_number ); ?>"
					style="top: <?php echo esc_attr( $top_offset_px ); ?>px; z-index: <?php echo esc_attr( $z_index ); ?>;"
					data-bi-card-index="<?php echo esc_attr( $index ); ?>"
				>
					<!-- STACKED HEADER ROW -->
					<header class="bi-stacking-card__header">
						<span class="bi-stacking-card__num"><?php echo esc_html( $card['number'] ); ?></span>
						<h3 class="bi-stacking-card__title"><?php echo esc_html( $card['title'] ); ?></h3>
					</header>

					<!-- EXPANDED BODY CONTENT (UNCOVERED BELOW STACKED HEADERS) -->
					<div class="bi-stacking-card__body">
						<div class="bi-stacking-card__content">
							<p class="bi-stacking-card__desc"><?php echo esc_html( $card['description'] ); ?></p>

							<div class="bi-stacking-card__cta-wrap">
								<a href="<?php echo esc_url( $card['cta_url'] ); ?>" class="bi-stacking-card__cta">
									<span><?php echo esc_html( $card['cta_text'] ); ?></span>
									<span class="bi-stacking-card__cta-icon" aria-hidden="true">
										<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
											<line x1="7" y1="17" x2="17" y2="7"></line>
											<polyline points="7 7 17 7 17 17"></polyline>
										</svg>
									</span>
								</a>
							</div>
						</div>

						<!-- Right Circular Image -->
						<div class="bi-stacking-card__image-wrap">
							<img
								src="<?php echo esc_url( $card['image_url'] ); ?>"
								alt="<?php echo esc_attr( $card['title'] ); ?>"
								class="bi-stacking-card__image"
								loading="lazy"
							>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

	</div>
</section>
