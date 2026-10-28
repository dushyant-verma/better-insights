<?php
/**
 * Better Insights - About Page Section 3: Our Values & Animated Full-Width Typography (.fwt)
 * Reference: Ascendion "Who We Are" (https://ascendion.com/who-we-are/)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$values = array(
	array(
		'number'  => '01',
		'title'   => __( 'Boldly Curious', 'astra-child' ),
		'desc'    => __( 'We question assumptions, explore possibilities, and discover smarter ways to solve business challenges.', 'astra-child' ),
	),
	array(
		'number'  => '02',
		'title'   => __( 'Relentlessly Innovative', 'astra-child' ),
		'desc'    => __( 'We combine creativity, technology, and AI to turn new ideas into practical solutions.', 'astra-child' ),
	),
	array(
		'number'  => '03',
		'title'   => __( 'Deeply Collaborative', 'astra-child' ),
		'desc'    => __( 'We work closely with our clients and teams to build meaningful, effective digital experiences.', 'astra-child' ),
	),
	array(
		'number'  => '04',
		'title'   => __( 'Focused on Impact', 'astra-child' ),
		'desc'    => __( 'We prioritize measurable outcomes, long-term value, and work that moves businesses forward.', 'astra-child' ),
	),
);
?>

<!-- 1. OUR VALUES SECTION -->
<section class="bi-about-values" id="our-values" aria-label="<?php esc_attr_e( 'Our Core Values', 'astra-child' ); ?>">
	<div id="our-approach" class="bi-anchor-target" aria-hidden="true"></div>
	<div class="bi-about-values__container">

		<!-- Section Header -->
		<header class="bi-about-values__header">
			<span class="bi-about-values__eyebrow"><?php esc_html_e( 'OUR GUIDING PRINCIPLES', 'astra-child' ); ?></span>
			<h2 class="bi-about-values__title">
				<?php echo wp_kses_post( __( 'Our <span class="bi-about-values__title-accent">Values</span>', 'astra-child' ) ); ?>
			</h2>
			<p class="bi-about-values__subtitle">
				<?php esc_html_e( 'The foundational beliefs that guide our thinking, shape our culture, and drive how we build what’s next for our partners.', 'astra-child' ); ?>
			</p>
		</header>

		<!-- Four Values Columns Grid -->
		<div class="bi-about-values__grid">
			<?php foreach ( $values as $index => $item ) : ?>
				<div class="bi-about-values__col" data-value-col="<?php echo esc_attr( $index + 1 ); ?>">
					<div class="bi-about-values__num-wrap">
						<span class="bi-about-values__number"><?php echo esc_html( $item['number'] ); ?></span>
						<span class="bi-about-values__divider-dot" aria-hidden="true"></span>
					</div>
					<h3 class="bi-about-values__heading"><?php echo esc_html( $item['title'] ); ?></h3>
					<p class="bi-about-values__desc"><?php echo esc_html( $item['desc'] ); ?></p>
					<div class="bi-about-values__accent-bar" aria-hidden="true"></div>
				</div>
			<?php endforeach; ?>
		</div>

	</div>
</section>

<!-- 2. ANIMATED FULL-WIDTH TYPOGRAPHY SECTION (.fwt) -->
<section class="bi-about-fwt fwt" aria-label="<?php esc_attr_e( 'Animated Brand Statement', 'astra-child' ); ?>">
	<!-- Top Hairline Divider -->
	<div class="bi-about-fwt__rule" aria-hidden="true"></div>

	<div class="bi-about-fwt__inner">
		<!-- Primary Statement Track (Scrubbed Horizontally via ScrollTrigger) -->
		<div class="bi-about-fwt__marquee-wrap bi-about-fwt__marquee-wrap--primary">
			<div class="bi-about-fwt__track" data-fwt-track="primary">
				<h2 class="bi-about-fwt__statement">
					BETTER GROWTH IS <span class="bi-about-fwt__accent">NEVER STANDING STILL.</span>
				</h2>
				<span class="bi-about-fwt__separator" aria-hidden="true"></span>
				<span class="bi-about-fwt__statement bi-about-fwt__statement--echo" aria-hidden="true">
					BETTER GROWTH IS <span class="bi-about-fwt__accent">NEVER STANDING STILL.</span>
				</span>
				<span class="bi-about-fwt__separator bi-about-fwt__separator--echo" aria-hidden="true"></span>
				<span class="bi-about-fwt__statement bi-about-fwt__statement--echo" aria-hidden="true">
					BETTER GROWTH IS <span class="bi-about-fwt__accent">NEVER STANDING STILL.</span>
				</span>
				<span class="bi-about-fwt__separator bi-about-fwt__separator--echo" aria-hidden="true"></span>
				<span class="bi-about-fwt__statement bi-about-fwt__statement--echo" aria-hidden="true">
					BETTER GROWTH IS <span class="bi-about-fwt__accent">NEVER STANDING STILL.</span>
				</span>
				<span class="bi-about-fwt__separator bi-about-fwt__separator--echo" aria-hidden="true"></span>
			</div>
		</div>

		<!-- Supporting Editorial Concept Track (Subtle Parallax Counter Movement) -->
		<div class="bi-about-fwt__marquee-wrap bi-about-fwt__marquee-wrap--secondary" aria-hidden="true">
			<div class="bi-about-fwt__track" data-fwt-track="secondary">
				<span class="bi-about-fwt__outline-text">
					<span class="bi-about-fwt__sub-item">STRATEGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">CREATIVITY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">AI &amp; AUTOMATION</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">TECHNOLOGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">MEASURABLE OUTCOMES</span>
				</span>
				<span class="bi-about-fwt__sub-dot bi-about-fwt__sub-dot--group" aria-hidden="true"></span>
				<span class="bi-about-fwt__outline-text bi-about-fwt__outline-text--echo">
					<span class="bi-about-fwt__sub-item">STRATEGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">CREATIVITY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">AI &amp; AUTOMATION</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">TECHNOLOGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">MEASURABLE OUTCOMES</span>
				</span>
				<span class="bi-about-fwt__sub-dot bi-about-fwt__sub-dot--group" aria-hidden="true"></span>
				<span class="bi-about-fwt__outline-text bi-about-fwt__outline-text--echo">
					<span class="bi-about-fwt__sub-item">STRATEGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">CREATIVITY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">AI &amp; AUTOMATION</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">TECHNOLOGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">MEASURABLE OUTCOMES</span>
				</span>
				<span class="bi-about-fwt__sub-dot bi-about-fwt__sub-dot--group" aria-hidden="true"></span>
				<span class="bi-about-fwt__outline-text bi-about-fwt__outline-text--echo">
					<span class="bi-about-fwt__sub-item">STRATEGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">CREATIVITY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">AI &amp; AUTOMATION</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">TECHNOLOGY</span><span class="bi-about-fwt__sub-dot" aria-hidden="true"></span><span class="bi-about-fwt__sub-item">MEASURABLE OUTCOMES</span>
				</span>
				<span class="bi-about-fwt__sub-dot bi-about-fwt__sub-dot--group" aria-hidden="true"></span>
			</div>
		</div>
	</div>

	<!-- Bottom Hairline Divider -->
	<div class="bi-about-fwt__rule" aria-hidden="true"></div>
</section>
