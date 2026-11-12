<?php
/**
 * Better Insights - About Page Hero Section Template Part
 * Reference: MadeByShape (https://madebyshape.co.uk/about/)
 * Reference Component: archedImageCarouselDesktop
 *
 * Implements arched image carousel animation and visual composition:
 * - Full-width dark (#0D0D0D) background
 * - Centered heading: "Good ideas. Great people. Better outcomes."
 * - Circular arched carousel trajectory for 12 authentic Better Insights images
 * - Smooth continuous rotation without visible jumps
 * - Centered CTA button matching Better Insights header button (#33CC7A)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_uri   = get_stylesheet_directory_uri();
$culture_uri = $theme_uri . '/assets/images/culture/';

$arched_cards = array(
	array(
		'id'    => 'bi-arch-1',
		'image' => $culture_uri . 'hero-marketing-team.jpg',
		'alt'   => __( 'Better Insights creative studio team collaborating in modern open workspace', 'astra-child' ),
		'tag'   => __( 'Studio Culture', 'astra-child' ),
		'angle' => 0,
	),
	array(
		'id'    => 'bi-arch-2',
		'image' => $culture_uri . 'photo-1552664730-d307ca884978.jpg',
		'alt'   => __( 'Collaborative sprint strategy workshop with cross-disciplinary pods', 'astra-child' ),
		'tag'   => __( 'Strategy Sprint', 'astra-child' ),
		'angle' => 30,
	),
	array(
		'id'    => 'bi-arch-3',
		'image' => $culture_uri . 'photo-1531403009284-440f080d1e12.jpg',
		'alt'   => __( 'Interface design & UX architecture wireframing session', 'astra-child' ),
		'tag'   => __( 'Design Architecture', 'astra-child' ),
		'angle' => 60,
	),
	array(
		'id'    => 'bi-arch-4',
		'image' => $culture_uri . 'photo-1556761175-4b46a572b786.jpg',
		'alt'   => __( 'Creative ideation sprint & continuous delivery dialogue', 'astra-child' ),
		'tag'   => __( 'Ideation Sprint', 'astra-child' ),
		'angle' => 90,
	),
	array(
		'id'    => 'bi-arch-5',
		'image' => $culture_uri . 'photo-1553877522-43269d4ea984.jpg',
		'alt'   => __( 'Full-stack digital engineering & growth pod at Better Insights', 'astra-child' ),
		'tag'   => __( 'Engineering Pod', 'astra-child' ),
		'angle' => 120,
	),
	array(
		'id'    => 'bi-arch-6',
		'image' => $culture_uri . 'photo-1559136555-9303baea8ebd.jpg',
		'alt'   => __( 'Cloud architecture & headless systems review', 'astra-child' ),
		'tag'   => __( 'Modern Engineering', 'astra-child' ),
		'angle' => 150,
	),
	array(
		'id'    => 'bi-arch-7',
		'image' => $culture_uri . 'photo-1551836022-d5d88e9218df.jpg',
		'alt'   => __( 'First principles inquiry & creative design thinking session', 'astra-child' ),
		'tag'   => __( 'Creative Thinking', 'astra-child' ),
		'angle' => 180,
	),
	array(
		'id'    => 'bi-arch-8',
		'image' => $culture_uri . 'photo-1515187029135-18ee286d815b.jpg',
		'alt'   => __( 'Executive leadership & strategic agency roadmap meeting', 'astra-child' ),
		'tag'   => __( 'Executive Strategy', 'astra-child' ),
		'angle' => 210,
	),
	array(
		'id'    => 'bi-arch-9',
		'image' => $culture_uri . 'photo-1573164713988-8665fc963095.jpg',
		'alt'   => __( 'Enterprise digital transformation & technical planning', 'astra-child' ),
		'tag'   => __( 'Digital Solutions', 'astra-child' ),
		'angle' => 240,
	),
	array(
		'id'    => 'bi-arch-10',
		'image' => $culture_uri . 'photo-1573496359142-b8d87734a5a2.jpg',
		'alt'   => __( 'Design sprint & interactive prototyping review', 'astra-child' ),
		'tag'   => __( 'UX Prototyping', 'astra-child' ),
		'angle' => 270,
	),
	array(
		'id'    => 'bi-arch-11',
		'image' => $culture_uri . 'photo-1573497019940-1c28c88b4f3e.jpg',
		'alt'   => __( 'Product quality engineering & continuous integration discussion', 'astra-child' ),
		'tag'   => __( 'Quality Engineering', 'astra-child' ),
		'angle' => 300,
	),
	array(
		'id'    => 'bi-arch-12',
		'image' => $culture_uri . 'photo-1573497491765-dccce02b29df.jpg',
		'alt'   => __( 'Cross-disciplinary sprint sync & client telemetry review', 'astra-child' ),
		'tag'   => __( 'Delivery Excellence', 'astra-child' ),
		'angle' => 330,
	),
);
?>

<section id="about-hero" class="bi-about-hero-dark" aria-label="<?php esc_attr_e( 'About Better Insights Hero', 'astra-child' ); ?>">
	<!-- Background ambient radial illumination -->
	<div class="bi-about-hero-glow" aria-hidden="true"></div>

	<!-- 1. Large Centered Headline (Overlaps slightly with arched carousel below) -->
	<div class="bi-about-hero-header">
		<h1 class="bi-hero-title">
			<?php esc_html_e( 'Good ideas. Great people.', 'astra-child' ); ?><br />
			<?php esc_html_e( 'Better outcomes.', 'astra-child' ); ?>
		</h1>
	</div>

	<!-- 2. Arched Image Carousel (Reference: archedImageCarouselDesktop) -->
	<div
		class="bi-arched-carousel-stage"
		role="region"
		aria-label="<?php esc_attr_e( 'Arched rotating gallery of Better Insights culture and craft', 'astra-child' ); ?>"
		x-data="archedImageCarouselDesktop"
	>
		<div
			class="bi-arched-wheel"
			x-ref="wheel"
			@mouseenter="pause()"
			@mouseleave="resume()"
			@pointerdown="startDrag($event)"
			@pointermove="onDrag($event)"
			@pointerup="endDrag()"
			@pointercancel="endDrag()"
			@pointerleave="endDrag()"
		>
			<?php foreach ( $arched_cards as $index => $card ) : ?>
				<div
					class="bi-arched-spoke"
					style="--spoke-angle: <?php echo esc_attr( $card['angle'] ); ?>deg;"
				>
					<div class="bi-arched-card">
						<img
							src="<?php echo esc_url( $card['image'] ); ?>"
							alt="<?php echo esc_attr( $card['alt'] ); ?>"
							class="bi-arched-card__img"
							loading="<?php echo $index < 3 ? 'eager' : 'lazy'; ?>"
						/>
						<div class="bi-arched-card__tag">
							<span class="bi-arched-card__tag-dot"></span>
							<span><?php echo esc_html( $card['tag'] ); ?></span>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>

	<!-- 3. Centered Brand CTA Button (Matches BI Header Button Identity #33CC7A) -->
	<div class="bi-hero-cta-wrap">
		<a
			href="#who-we-are"
			class="bi-hero-cta-btn"
			aria-label="<?php esc_attr_e( 'Learn about us - Scroll to who we are', 'astra-child' ); ?>"
		>
			<span class="bi-hero-cta-btn__text"><?php esc_html_e( 'Learn about us', 'astra-child' ); ?></span>
			<span class="bi-hero-cta-arrow" aria-hidden="true">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="7" y1="7" x2="17" y2="17" />
					<polyline points="7 17 17 17 17 7" />
				</svg>
			</span>
		</a>
	</div>
</section>
