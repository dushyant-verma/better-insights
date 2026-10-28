<?php
/**
 * Better Insights - Client Recognition Testimonial Marquee Slider
 * Reusable component: Continuously moving, light-themed horizontal testimonial marquee.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir   = get_stylesheet_directory();
$theme_uri   = get_stylesheet_directory_uri();
$marquee_css = $theme_dir . '/assets/css/testimonial-marquee.css';

// Automatically enqueue scoped stylesheet
if ( ! wp_style_is( 'bi-testimonial-marquee', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-testimonial-marquee',
		$theme_uri . '/assets/css/testimonial-marquee.css',
		array( 'astra-child-style' ),
		file_exists( $marquee_css ) ? (string) filemtime( $marquee_css ) : wp_get_theme()->get( 'Version' )
	);
}

// 1. Dynamic Section Heading
$custom_heading = get_post_meta( get_the_ID(), 'bi_testimonial_heading', true );
$heading_html   = ! empty( $custom_heading ) ? $custom_heading : sprintf(
	'%s <span class="bi-testimonial-marquee__heading-accent">%s</span>',
	esc_html__( 'Client', 'astra-child' ),
	esc_html__( 'Recognition', 'astra-child' )
);

// 2. Verified Client Partner Testimonials
$default_testimonials = array(
	array(
		'name'    => __( 'Eileen Brennan', 'astra-child' ),
		'role'    => __( 'Managing Director', 'astra-child' ),
		'company' => __( 'Stylebar Ireland', 'astra-child' ),
		'quote'   => __( 'Better Insights transformed our digital presence with exceptional agility. Their strategic clarity and engineering precision delivered measurable business growth from day one.', 'astra-child' ),
	),
	array(
		'name'    => __( 'David C. Gallagher', 'astra-child' ),
		'role'    => __( 'Operations Director', 'astra-child' ),
		'company' => __( 'Old Fort Quarter', 'astra-child' ),
		'quote'   => __( 'Working with Better Insights gave us the technological foundation we needed to scale. Their team combined deep technical insight with extraordinary execution speed.', 'astra-child' ),
	),
	array(
		'name'    => __( 'Ananya Khare', 'astra-child' ),
		'role'    => __( 'Principal Partner', 'astra-child' ),
		'company' => __( 'Khare Legal Chambers', 'astra-child' ),
		'quote'   => __( 'The AI automation workflows engineered by Better Insights eliminated our operational bottlenecks and significantly reduced document processing times across the firm.', 'astra-child' ),
	),
	array(
		'name'    => __( 'Marcus Thorne', 'astra-child' ),
		'role'    => __( 'Head of Digital Platforms', 'astra-child' ),
		'company' => __( 'Voyya', 'astra-child' ),
		'quote'   => __( 'From initial architecture through rollout, Better Insights demonstrated unmatched product engineering rigor. Our user engagement and conversion metrics increased dramatically.', 'astra-child' ),
	),
	array(
		'name'    => __( 'Dr. Rajesh Sharma', 'astra-child' ),
		'role'    => __( 'Medical Director', 'astra-child' ),
		'company' => __( 'GT Diagnostics', 'astra-child' ),
		'quote'   => __( 'A truly collaborative partner. Better Insights modernized our patient management and diagnostic reporting infrastructure with zero disruption to daily clinical operations.', 'astra-child' ),
	),
	array(
		'name'    => __( 'Liam O\'Connor', 'astra-child' ),
		'role'    => __( 'Commercial Lead', 'astra-child' ),
		'company' => __( 'Sanction Store', 'astra-child' ),
		'quote'   => __( 'Their focus on measurable outcomes set them apart. Better Insights delivered a high-converting digital commerce experience that exceeded our quarterly revenue targets.', 'astra-child' ),
	),
);

/**
 * Filter hook to allow custom testimonials programmatically or via plugins.
 */
$testimonials = apply_filters( 'bi_client_recognition_testimonials', $default_testimonials );
?>

<section class="bi-testimonial-marquee bi-theme--light" data-theme="light" aria-label="<?php esc_attr_e( 'Client Recognition & Testimonials', 'astra-child' ); ?>">

	<!-- Section Header Row (Left-aligned in max-width container) -->
	<div class="bi-testimonial-marquee__container">
		<header class="bi-testimonial-marquee__header">
			<h2 class="bi-testimonial-marquee__heading">
				<?php echo wp_kses_post( $heading_html ); ?>
			</h2>
		</header>
	</div>

	<!-- Continuous Horizontal Marquee Viewport & Track -->
	<div class="bi-testimonial-marquee__viewport" tabindex="0" role="region" aria-label="<?php esc_attr_e( 'Client testimonials marquee slider', 'astra-child' ); ?>">
		<div class="bi-testimonial-marquee__track">

			<!-- Primary Set: Accessible to Assistive Technologies & Keyboard Navigation -->
			<div class="bi-testimonial-marquee__set">
				<?php foreach ( $testimonials as $item ) : ?>
					<article class="bi-testimonial-card" tabindex="0">
						<div class="bi-testimonial-card__inner">
							<div class="bi-testimonial-card__quote-mark" aria-hidden="true">
								<svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 17.5C0 7.84 6.22 0 15.69 0V5.83C10.23 5.83 6.8 9.97 6.8 14.56H16.31V30H0V17.5ZM21.69 17.5C21.69 7.84 27.91 0 37.38 0V5.83C31.92 5.83 28.49 9.97 28.49 14.56H38V30H21.69V17.5Z" fill="currentColor"/>
								</svg>
							</div>

							<blockquote class="bi-testimonial-card__quote">
								<p class="bi-testimonial-card__text"><?php echo esc_html( $item['quote'] ); ?></p>
							</blockquote>

							<div class="bi-testimonial-card__author">
								<cite class="bi-testimonial-card__name"><?php echo esc_html( $item['name'] ); ?></cite>
								<span class="bi-testimonial-card__role">
									<?php echo esc_html( $item['role'] ); ?><?php if ( ! empty( $item['company'] ) ) : ?>, <?php echo esc_html( $item['company'] ); ?><?php endif; ?>
								</span>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>

			<!-- Duplicate Sets for Seamless Infinite Loop Across All Displays (aria-hidden for screen readers) -->
			<?php for ( $set_idx = 1; $set_idx <= 3; $set_idx++ ) : ?>
				<div class="bi-testimonial-marquee__set" aria-hidden="true">
					<?php foreach ( $testimonials as $item ) : ?>
						<article class="bi-testimonial-card" tabindex="-1">
							<div class="bi-testimonial-card__inner">
								<div class="bi-testimonial-card__quote-mark" aria-hidden="true">
									<svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 17.5C0 7.84 6.22 0 15.69 0V5.83C10.23 5.83 6.8 9.97 6.8 14.56H16.31V30H0V17.5ZM21.69 17.5C21.69 7.84 27.91 0 37.38 0V5.83C31.92 5.83 28.49 9.97 28.49 14.56H38V30H21.69V17.5Z" fill="currentColor"/>
									</svg>
								</div>

								<blockquote class="bi-testimonial-card__quote">
									<p class="bi-testimonial-card__text"><?php echo esc_html( $item['quote'] ); ?></p>
								</blockquote>

								<div class="bi-testimonial-card__author">
									<cite class="bi-testimonial-card__name"><?php echo esc_html( $item['name'] ); ?></cite>
									<span class="bi-testimonial-card__role">
										<?php echo esc_html( $item['role'] ); ?><?php if ( ! empty( $item['company'] ) ) : ?>, <?php echo esc_html( $item['company'] ); ?><?php endif; ?>
									</span>
								</div>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			<?php endfor; ?>

		</div>
	</div>

</section>
