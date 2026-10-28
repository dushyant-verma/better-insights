<?php
/**
 * Homepage Template Part: Our Work Carousel Card Section
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_uri       = get_stylesheet_directory_uri();
$upload_dir      = wp_upload_dir();
$upload_base_url = rtrim( $upload_dir['baseurl'], '/' );

$work_items = array(
	array(
		'id'          => '01',
		'category'    => __( 'AI & AUTOMATION', 'astra-child' ),
		'title'       => __( 'Intelligent Automation for Modern Business', 'astra-child' ),
		'description' => __( 'We design AI-powered workflows and automation systems that reduce manual effort, improve efficiency and help teams focus on higher-value work.', 'astra-child' ),
		'cta_label'   => __( 'Explore AI & Automation', 'astra-child' ),
		'link'        => home_url( '/ai-solutions/' ),
		'image'       => $upload_base_url . '/2026/10/Intelligent-Automation-for-Modern-Business.webp',
		'alt'         => __( 'Intelligent Automation for Modern Business', 'astra-child' ),
	),
	array(
		'id'          => '02',
		'category'    => __( 'DIGITAL GROWTH', 'astra-child' ),
		'title'       => __( 'Digital Experiences Built to Perform', 'astra-child' ),
		'description' => __( 'We combine strategy, UX, development and performance to create digital experiences that attract audiences and turn engagement into measurable growth.', 'astra-child' ),
		'cta_label'   => __( 'Explore Digital Growth', 'astra-child' ),
		'link'        => home_url( '/digital-growth/' ),
		'image'       => $upload_base_url . '/2026/10/Digital-Experiences-Built-to-Perform.webp',
		'alt'         => __( 'Digital Experiences Built to Perform', 'astra-child' ),
	),
	array(
		'id'          => '03',
		'category'    => __( 'TECHNOLOGY & ENGINEERING', 'astra-child' ),
		'title'       => __( 'Technology That Moves Business Forward', 'astra-child' ),
		'description' => __( 'From websites and applications to APIs and custom platforms, we build scalable technology designed around real business requirements.', 'astra-child' ),
		'cta_label'   => __( 'Explore Technology & Engineering', 'astra-child' ),
		'link'        => home_url( '/technology-engineering/' ),
		'image'       => $upload_base_url . '/2026/10/Technology-That-Moves-Business-Forward.webp',
		'alt'         => __( 'Technology That Moves Business Forward', 'astra-child' ),
	),
	array(
		'id'          => '04',
		'category'    => __( 'DIGITAL TRANSFORMATION', 'astra-child' ),
		'title'       => __( 'Connecting Technology, People and Process', 'astra-child' ),
		'description' => __( 'We help businesses modernize their digital ecosystem by connecting systems, workflows, data and experiences into a stronger technology foundation.', 'astra-child' ),
		'cta_label'   => __( 'Explore Digital Transformation', 'astra-child' ),
		'link'        => home_url( '/digital-transformation/' ),
		'image'       => $upload_base_url . '/2026/10/Connecting-Technology-People-and-Process.webp',
		'alt'         => __( 'Connecting Technology, People and Process', 'astra-child' ),
	),
);
?>

<section class="bi-our-work-section bi-theme--light" data-theme="light" aria-label="<?php esc_attr_e( 'Our Work Showcase', 'astra-child' ); ?>">
	<div class="bi-our-work-container bi-container">
		
		<!-- Section Header -->
		<div class="bi-our-work-header">
			<div class="bi-our-work-header__left">
				<span class="bi-our-work-header__label"><?php esc_html_e( 'OUR WORK', 'astra-child' ); ?></span>
				<h2 class="bi-our-work-header__title">
					<?php _e( 'Extraordinary digital experiences.<br>Measurable business results.', 'astra-child' ); ?>
				</h2>
			</div>
			<div class="bi-our-work-header__right">
				<a href="<?php echo esc_url( home_url( '/work/' ) ); ?>" class="bi-our-work-header__cta">
					<span class="bi-our-work-header__cta-text"><?php esc_html_e( 'View Our Work', 'astra-child' ); ?></span>
					<span class="bi-our-work-header__cta-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</span>
				</a>
			</div>
		</div>

		<!-- Carousel Stage & Wrapper -->
		<div class="bi-our-work-carousel" data-bi-work-carousel tabindex="0" role="region" aria-label="<?php esc_attr_e( 'Case Studies Carousel', 'astra-child' ); ?>">
			
			<!-- Cards Stage Deck -->
			<div class="bi-our-work-deck">
				<?php foreach ( $work_items as $index => $item ) :
					$stack_class = ( 0 === $index ) ? 'is-active' : 'is-stack-' . $index;
				?>
					<article
						class="bi-our-work-card <?php echo esc_attr( $stack_class ); ?>"
						data-slide-index="<?php echo esc_attr( $index ); ?>"
						aria-hidden="<?php echo 0 === $index ? 'false' : 'true'; ?>"
					>
						<!-- Left 50% Image -->
						<div class="bi-our-work-card__image-wrap">
							<img
								src="<?php echo esc_url( $item['image'] ); ?>"
								alt="<?php echo esc_attr( $item['alt'] ); ?>"
								class="bi-our-work-card__image"
								loading="<?php echo 0 === $index ? 'eager' : 'lazy'; ?>"
							>
						</div>

						<!-- Right 50% Content -->
						<div class="bi-our-work-card__content">
							
							<!-- Top-Right Action Circle Button -->
							<a
								href="<?php echo esc_url( $item['link'] ); ?>"
								class="bi-our-work-card__circle-btn"
								aria-label="<?php echo esc_attr( sprintf( __( 'View %s case study', 'astra-child' ), $item['category'] ) ); ?>"
							>
								<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<line x1="7" y1="17" x2="17" y2="7"></line>
									<polyline points="7 7 17 7 17 17"></polyline>
								</svg>
							</a>

							<!-- Main Editorial Body -->
							<div class="bi-our-work-card__body">
								<span class="bi-our-work-card__category"><?php echo esc_html( $item['category'] ); ?></span>
								<h3 class="bi-our-work-card__title"><?php echo esc_html( $item['title'] ); ?></h3>
								<p class="bi-our-work-card__desc"><?php echo esc_html( $item['description'] ); ?></p>
								
								<div class="bi-our-work-card__cta-wrap">
									<a href="<?php echo esc_url( $item['link'] ); ?>" class="bi-our-work-card__link bi-cta bi-cta--soft">
										<span><?php echo esc_html( $item['cta_label'] ); ?></span>
										<span class="bi-cta__icon" aria-hidden="true">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
												<line x1="7" y1="17" x2="17" y2="7"></line>
												<polyline points="7 7 17 7 17 17"></polyline>
											</svg>
										</span>
									</a>
								</div>
							</div>

							<!-- Navigation Bar inside content area -->
							<div class="bi-our-work-nav">
								<div class="bi-our-work-nav__buttons">
									<button
										type="button"
										class="bi-our-work-nav__btn bi-our-work-nav__btn--prev"
										data-bi-work-prev
										aria-label="<?php esc_attr_e( 'Previous case study', 'astra-child' ); ?>"
										disabled
									>
										<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
											<line x1="19" y1="12" x2="5" y2="12"></line>
											<polyline points="12 19 5 12 12 5"></polyline>
										</svg>
									</button>
									<button
										type="button"
										class="bi-our-work-nav__btn bi-our-work-nav__btn--next"
										data-bi-work-next
										aria-label="<?php esc_attr_e( 'Next case study', 'astra-child' ); ?>"
									>
										<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</button>
								</div>
								<div class="bi-our-work-nav__counter">
									<span class="bi-our-work-nav__current" data-bi-work-current>01</span>
									<span class="bi-our-work-nav__divider">/</span>
									<span class="bi-our-work-nav__total">04</span>
								</div>
							</div>

						</div>
					</article>
				<?php endforeach; ?>
			</div>

		</div>

	</div>
</section>
