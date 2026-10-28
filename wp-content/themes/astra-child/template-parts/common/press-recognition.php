<?php
/**
 * Better Insights - Common Press & Media Recognition Section
 * Reinstating original authority proof logos:
 * Business Standard, The Economic Times, Entrepreneur Magazine, Hindustan Times, Indian Express.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$upload_base = content_url( '/uploads/2026/10/' );

$press_outlets = array(
	array(
		'name'   => 'Business Standard',
		'logo'   => $upload_base . 'Business-Standard.webp',
		'width'  => 688,
		'height' => 413,
	),
	array(
		'name'   => 'The Economic Times',
		'logo'   => $upload_base . 'Economic-Times.png',
		'width'  => 688,
		'height' => 413,
	),
	array(
		'name'   => 'Entrepreneur Magazine',
		'logo'   => $upload_base . 'Entrepreneur-Magazine.png',
		'width'  => 688,
		'height' => 413,
	),
	array(
		'name'   => 'Hindustan Times',
		'logo'   => $upload_base . 'Hindustan-Times.png',
		'width'  => 688,
		'height' => 413,
	),
	array(
		'name'   => 'The Indian Express',
		'logo'   => $upload_base . 'Indian-Express.png',
		'width'  => 688,
		'height' => 413,
	),
);
?>

<section class="bi-press-recognition" aria-label="<?php esc_attr_e( 'Media & Editorial Recognition', 'astra-child' ); ?>">
	<div class="bi-press-recognition__container bi-container">
		
		<div class="bi-press-recognition__header">
			<span class="bi-press-recognition__eyebrow"><?php esc_html_e( 'MEDIA & EDITORIAL RECOGNITION', 'astra-child' ); ?></span>
			<h2 class="bi-press-recognition__title">
				<?php esc_html_e( 'We have helped brands earn trust, visibility, and media attention.', 'astra-child' ); ?>
			</h2>
			<p class="bi-press-recognition__sub">
				<?php esc_html_e( 'Our client transformations, digital campaigns, and executive perspectives have been featured across India’s premier financial, business, and national news publications.', 'astra-child' ); ?>
			</p>
		</div>

		<div class="bi-press-recognition__grid">
			<?php foreach ( $press_outlets as $outlet ) : ?>
				<div class="bi-press-card" title="<?php echo esc_attr( $outlet['name'] ); ?>">
					<img
						src="<?php echo esc_url( $outlet['logo'] ); ?>"
						alt="<?php echo esc_attr( $outlet['name'] . ' Logo' ); ?>"
						class="bi-press-card__img"
						width="180"
						height="108"
						loading="lazy"
						decoding="async"
					/>
				</div>
			<?php endforeach; ?>
		</div>

	</div>
</section>
