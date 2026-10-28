<?php
/**
 * Better Insights - Single Service Page: Measurable Business Impact Section
 * Section: Reusable 4-Column Metrics Banner
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_id = get_the_ID();
$slug    = get_post_field( 'post_name', $post_id );

// 1. Dynamic Section Heading & Supporting Text
$custom_heading = get_post_meta( $post_id, 'bi_impact_heading', true );
$heading        = ! empty( $custom_heading ) ? $custom_heading : __( 'MEASURABLE IMPACT AT EVERY STAGE', 'astra-child' );

$custom_desc = get_post_meta( $post_id, 'bi_impact_desc', true );
$description = ! empty( $custom_desc ) ? $custom_desc : __( 'We combine strategy, creativity, technology, and data to help businesses improve performance and achieve meaningful outcomes. Our approach focuses on measurable progress at every stage.', 'astra-child' );

// 2. Verified Default Better Insights Metrics
// Note: Can be overridden per page via custom fields bi_metric_{1..4}_val, bi_metric_{1..4}_suffix, bi_metric_{1..4}_desc
$default_metrics = array(
	array(
		'val'    => '8',
		'suffix' => '+',
		'desc'   => __( 'Technology & AI platforms integrated across enterprise workflows', 'astra-child' ),
	),
	array(
		'val'    => '50',
		'suffix' => '+',
		'desc'   => __( 'Projects delivered across intelligent automation and digital systems', 'astra-child' ),
	),
	array(
		'val'    => '36',
		'suffix' => '+',
		'desc'   => __( 'Enterprise and high-growth brands supported with tailored solutions', 'astra-child' ),
	),
	array(
		'val'    => '100',
		'suffix' => '%',
		'desc'   => __( 'Outcome-driven focus committed to measurable business efficiency', 'astra-child' ),
	),
);

// Allow service-specific custom field overrides
$metrics = array();
for ( $i = 1; $i <= 4; $i++ ) {
	$c_val    = get_post_meta( $post_id, "bi_metric_{$i}_val", true );
	$c_suffix = get_post_meta( $post_id, "bi_metric_{$i}_suffix", true );
	$c_desc   = get_post_meta( $post_id, "bi_metric_{$i}_desc", true );

	$idx = $i - 1;
	$val    = ( '' !== $c_val && false !== $c_val ) ? $c_val : $default_metrics[ $idx ]['val'];
	$suffix = ( '' !== $c_suffix && false !== $c_suffix ) ? $c_suffix : $default_metrics[ $idx ]['suffix'];
	$desc   = ( '' !== $c_desc && false !== $c_desc ) ? $c_desc : $default_metrics[ $idx ]['desc'];

	$metrics[] = array(
		'val'    => $val,
		'suffix' => $suffix,
		'desc'   => $desc,
	);
}
?>

<section class="bi-service-impact" aria-label="<?php esc_attr_e( 'Measurable Business Impact', 'astra-child' ); ?>">
	<div class="bi-service-impact__container">

		<!-- Section Header -->
		<header class="bi-service-impact__header">
			<span class="bi-service-impact__eyebrow"><?php esc_html_e( 'BETTER INSIGHTS / MEASURABLE RESULTS', 'astra-child' ); ?></span>
			<h2 class="bi-service-impact__heading">
				<?php echo esc_html( $heading ); ?>
			</h2>
			<p class="bi-service-impact__desc">
				<?php echo esc_html( $description ); ?>
			</p>
		</header>

		<!-- Four Evenly Distributed Metric Columns -->
		<div class="bi-service-impact__grid">
			<?php foreach ( $metrics as $metric ) : ?>
				<?php
				$raw_val   = trim( $metric['val'] );
				$is_number = is_numeric( $raw_val );
				?>
				<div class="bi-service-impact__col">
					<div class="bi-service-impact__val-wrap">
						<?php if ( $is_number ) : ?>
							<span
								class="bi-service-impact__num"
								data-target="<?php echo esc_attr( $raw_val ); ?>"
							><?php echo esc_html( $raw_val ); ?></span>
						<?php else : ?>
							<span class="bi-service-impact__text-val"><?php echo esc_html( $raw_val ); ?></span>
						<?php endif; ?>

						<?php if ( ! empty( $metric['suffix'] ) ) : ?>
							<span class="bi-service-impact__suffix"><?php echo esc_html( $metric['suffix'] ); ?></span>
						<?php endif; ?>
					</div>

					<p class="bi-service-impact__metric-desc">
						<?php echo esc_html( $metric['desc'] ); ?>
					</p>
				</div>
			<?php endforeach; ?>
		</div>

	</div>
</section>
