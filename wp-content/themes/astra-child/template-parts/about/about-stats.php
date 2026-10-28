<?php
/**
 * Better Insights - About Page Section 4: Animated Statistics Cards
 * Reference: OWLED Media (.framer-13pkimt) - https://www.owledmedia.com/socials
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Statistics Cards Data Configuration.
 * Note: These values can be updated directly when verified client metrics are provided.
 */
$stat_cards = array(
	array(
		'id'          => 'digital-reach',
		'theme'       => 'blue',
		'number'      => 10,
		'suffix'      => 'M+',
		'label'       => __( 'Digital Reach', 'astra-child' ),
		'description' => __( 'Campaigns and experiences designed to connect brands with their audiences.', 'astra-child' ),
	),
	array(
		'id'          => 'projects-delivered',
		'theme'       => 'white',
		'number'      => 50,
		'suffix'      => '+',
		'label'       => __( 'Projects Delivered', 'astra-child' ),
		'description' => __( 'Digital, creative, and technology solutions built around business goals.', 'astra-child' ),
	),
	array(
		'id'          => 'business-impact',
		'theme'       => 'dark',
		'number'      => 100,
		'suffix'      => '%',
		'label'       => __( 'Business Impact', 'astra-child' ),
		'description' => __( 'Helping organizations improve experiences, efficiency, and growth.', 'astra-child' ),
	),
);
?>

<section class="bi-about-stats" aria-label="<?php esc_attr_e( 'Better Insights Key Statistics', 'astra-child' ); ?>">
	<div class="bi-about-stats__ambient-glow" aria-hidden="true"></div>

	<div class="bi-about-stats__container">

		<!-- Section Header -->
		<header class="bi-about-stats__header">
			<span class="bi-about-stats__eyebrow"><?php esc_html_e( 'BY THE NUMBERS', 'astra-child' ); ?></span>
			<h2 class="bi-about-stats__title">
				<?php echo wp_kses_post( __( 'Measurable Outcomes. <span class="bi-about-stats__title-accent">Real Impact.</span>', 'astra-child' ) ); ?>
			</h2>
			<p class="bi-about-stats__subtitle">
				<?php esc_html_e( 'Strategic thinking and digital execution engineered to drive scalable, long-term business performance.', 'astra-child' ); ?>
			</p>
		</header>

		<!-- Three Overlapping Statistics Cards Row (.framer-13pkimt Inspired) -->
		<div class="bi-about-stats__cards-row">
			<?php foreach ( $stat_cards as $index => $card ) : ?>
				<div
					class="bi-about-stats__card-item"
					data-stat-index="<?php echo esc_attr( $index + 1 ); ?>"
				>
					<div
						class="bi-about-stats__card bi-about-stats__card--<?php echo esc_attr( $card['theme'] ); ?>"
						data-stat-card="<?php echo esc_attr( $index + 1 ); ?>"
					>
						<!-- Upper Portion: Oversized Animated Number -->
						<div class="bi-about-stats__num-area">
							<span
								class="bi-about-stats__num"
								data-count-target="<?php echo esc_attr( $card['number'] ); ?>"
								data-count-suffix="<?php echo esc_attr( $card['suffix'] ); ?>"
							><?php echo esc_html( $card['number'] . $card['suffix'] ); ?></span>
						</div>

						<!-- Middle: Thin Subtle Divider -->
						<div class="bi-about-stats__divider" aria-hidden="true"></div>

						<!-- Lower Portion: Metric Title & Explanatory Description -->
						<div class="bi-about-stats__info-area">
							<h3 class="bi-about-stats__label"><?php echo esc_html( $card['label'] ); ?></h3>
							<p class="bi-about-stats__desc"><?php echo esc_html( $card['description'] ); ?></p>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

	</div>
</section>
