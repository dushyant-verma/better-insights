<?php
/**
 * Better Insights - Single Case Study Template
 * Implements Section 6 (9 structured sections) for bi_case_study post type.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Enqueue styles
$case_css = $theme_dir . '/assets/css/case-studies.css';
if ( ! wp_style_is( 'bi-case-studies-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-case-studies-style',
		$theme_uri . '/assets/css/case-studies.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $case_css ) ? (string) filemtime( $case_css ) : wp_get_theme()->get( 'Version' )
	);
}

get_header();

while ( have_posts() ) :
	the_post();
	$post_id   = get_the_ID();
	$data      = bi_get_case_study_data( $post_id );
	$work_url  = home_url( '/our-work/' );

	// Fetch 2 related case studies (excluding current)
	$related_args = array(
		'post_type'      => 'bi_case_study',
		'post_status'    => 'publish',
		'posts_per_page' => 2,
		'post__not_in'   => array( $post_id ),
		'orderby'        => 'rand',
	);
	$related_studies = bi_get_case_studies( $related_args );
	?>

	<article class="bi-single-case-study" id="case-study-<?php echo esc_attr( $post_id ); ?>">

		<!-- 1. Case-Study Hero -->
		<header class="bi-case-hero">
			<div class="bi-case-hero__container bi-container">
				
				<!-- Breadcrumbs -->
				<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
					<ol class="bi-case-breadcrumbs__list">
						<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
						<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
						<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'Our Work', 'astra-child' ); ?></a></li>
						<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
						<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php echo esc_html( $data['client_name'] ); ?></li>
					</ol>
				</nav>

				<div class="bi-case-hero__topline">
					<div class="bi-case-hero__badges">
						<span class="bi-case-badge bi-case-badge--industry"><?php echo esc_html( $data['industry'] ); ?></span>
						<span class="bi-case-badge bi-case-badge--service"><?php echo esc_html( $data['service'] ); ?></span>
					</div>

					<?php if ( ! empty( $data['client_logo'] ) ) : ?>
						<div class="bi-case-hero__client-logo-wrap">
							<img
								src="<?php echo esc_url( $data['client_logo'] ); ?>"
								alt="<?php echo esc_attr( $data['client_name'] . ' Logo' ); ?>"
								class="bi-case-hero__client-logo"
							/>
						</div>
					<?php endif; ?>
				</div>

				<h1 class="bi-case-hero__title"><?php echo esc_html( $data['title'] ); ?></h1>

				<p class="bi-case-hero__summary"><?php echo esc_html( $data['card_overview'] ); ?></p>

				<?php if ( ! empty( $data['tags'] ) ) : ?>
					<div class="bi-case-hero__tags">
						<?php foreach ( $data['tags'] as $tag ) : ?>
							<span class="bi-case-hero__tag"><?php echo esc_html( $tag ); ?></span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

			</div>

			<!-- Hero Media Banner -->
			<div class="bi-case-hero__media-wrapper bi-container">
				<div class="bi-case-hero__media">
					<img
						src="<?php echo esc_url( $data['image_url'] ); ?>"
						alt="<?php echo esc_attr( $data['title'] ); ?>"
						class="bi-case-hero__img"
						loading="eager"
					/>
				</div>
			</div>
		</header>

		<!-- 2. Client Overview & Quick Facts -->
		<section class="bi-case-section bi-case-section--overview">
			<div class="bi-case-section__container bi-container">
				<div class="bi-case-grid-split">
					<div class="bi-case-split__label-col">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '01 / CONTEXT', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'Client & Project Overview', 'astra-child' ); ?></h2>
					</div>
					<div class="bi-case-split__content-col">
						<p class="bi-case-lead-text"><?php echo esc_html( $data['client_overview'] ); ?></p>

						<div class="bi-case-fact-box">
							<div class="bi-case-fact-item">
								<span class="bi-case-fact-label"><?php esc_html_e( 'Client', 'astra-child' ); ?></span>
								<strong class="bi-case-fact-value"><?php echo esc_html( $data['client_name'] ); ?></strong>
							</div>
							<div class="bi-case-fact-item">
								<span class="bi-case-fact-label"><?php esc_html_e( 'Industry', 'astra-child' ); ?></span>
								<strong class="bi-case-fact-value"><?php echo esc_html( $data['industry'] ); ?></strong>
							</div>
							<div class="bi-case-fact-item">
								<span class="bi-case-fact-label"><?php esc_html_e( 'Core Service', 'astra-child' ); ?></span>
								<strong class="bi-case-fact-value"><?php echo esc_html( $data['service'] ); ?></strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 3. Business Challenge -->
		<section class="bi-case-section bi-case-section--challenge">
			<div class="bi-case-section__container bi-container">
				<div class="bi-case-grid-split">
					<div class="bi-case-split__label-col">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '02 / CHALLENGE', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'The Business Challenge', 'astra-child' ); ?></h2>
					</div>
					<div class="bi-case-split__content-col">
						<div class="bi-case-callout-card">
							<p><?php echo esc_html( $data['challenge'] ); ?></p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 4. Objectives -->
		<?php if ( ! empty( $data['objectives'] ) ) : ?>
			<section class="bi-case-section bi-case-section--objectives">
				<div class="bi-case-section__container bi-container">
					<div class="bi-case-grid-split">
						<div class="bi-case-split__label-col">
							<span class="bi-case-section__eyebrow"><?php esc_html_e( '03 / GOALS', 'astra-child' ); ?></span>
							<h2 class="bi-case-section__heading"><?php esc_html_e( 'Strategic Objectives', 'astra-child' ); ?></h2>
						</div>
						<div class="bi-case-split__content-col">
							<ul class="bi-case-objectives-list">
								<?php foreach ( $data['objectives'] as $idx => $objective ) : ?>
									<li class="bi-case-objective-item">
										<span class="bi-case-objective-num" aria-hidden="true"><?php echo esc_html( sprintf( '%02d', $idx + 1 ) ); ?></span>
										<span class="bi-case-objective-text"><?php echo esc_html( $objective ); ?></span>
									</li>
								<?php endforeach; ?>
							</ul>
						</div>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<!-- 5. BI Services & Approach -->
		<section class="bi-case-section bi-case-section--approach">
			<div class="bi-case-section__container bi-container">
				<div class="bi-case-grid-split">
					<div class="bi-case-split__label-col">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '04 / APPROACH', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'Our Approach & Strategy', 'astra-child' ); ?></h2>
					</div>
					<div class="bi-case-split__content-col">
						<p class="bi-case-body-text"><?php echo esc_html( $data['approach'] ); ?></p>
					</div>
				</div>
			</div>
		</section>

		<!-- 6. Solution & Implementation -->
		<section class="bi-case-section bi-case-section--solution">
			<div class="bi-case-section__container bi-container">
				<div class="bi-case-grid-split">
					<div class="bi-case-split__label-col">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '05 / SOLUTION', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'Solution & Implementation', 'astra-child' ); ?></h2>
					</div>
					<div class="bi-case-split__content-col">
						<p class="bi-case-body-text"><?php echo esc_html( $data['solution'] ); ?></p>
					</div>
				</div>
			</div>
		</section>

		<!-- 7. Measurable Results (Verified Outcomes) -->
		<?php if ( ! empty( $data['metrics'] ) ) : ?>
			<section class="bi-case-section bi-case-section--results">
				<div class="bi-case-section__container bi-container">
					<header class="bi-case-results__header">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '06 / IMPACT', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'Measurable Business Results', 'astra-child' ); ?></h2>
						<p class="bi-case-results__sub">
							<?php esc_html_e( 'Verified performance outcomes delivered through our partnership with ', 'astra-child' ); ?>
							<strong><?php echo esc_html( $data['client_name'] ); ?></strong>.
						</p>
					</header>

					<div class="bi-case-metrics-grid">
						<?php foreach ( $data['metrics'] as $metric ) : ?>
							<div class="bi-case-metric-card">
								<span class="bi-case-metric-value"><?php echo esc_html( $metric['value'] ); ?></span>
								<span class="bi-case-metric-label"><?php echo esc_html( $metric['label'] ); ?></span>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<!-- 8. Related Case Studies -->
		<?php if ( ! empty( $related_studies ) ) : ?>
			<section class="bi-case-section bi-case-section--related">
				<div class="bi-case-section__container bi-container">
					<header class="bi-case-related__header">
						<span class="bi-case-section__eyebrow"><?php esc_html_e( '07 / MORE WORK', 'astra-child' ); ?></span>
						<h2 class="bi-case-section__heading"><?php esc_html_e( 'Related Client Success Stories', 'astra-child' ); ?></h2>
					</header>

					<div class="bi-stories-grid">
						<?php foreach ( $related_studies as $rel ) : ?>
							<article class="bi-story-card">
								<div class="bi-story-card__media">
									<a href="<?php echo esc_url( $rel['permalink'] ); ?>" class="bi-story-card__media-link" tabindex="-1" aria-hidden="true">
										<img
											src="<?php echo esc_url( $rel['image_url'] ); ?>"
											alt="<?php echo esc_attr( $rel['client_name'] . ' - ' . $rel['title'] ); ?>"
											class="bi-story-card__image"
											loading="lazy"
										/>
									</a>
									<?php if ( ! empty( $rel['client_logo'] ) ) : ?>
										<div class="bi-story-card__logo-pill">
											<img
												src="<?php echo esc_url( $rel['client_logo'] ); ?>"
												alt="<?php echo esc_attr( $rel['client_name'] . ' Logo' ); ?>"
												class="bi-story-card__logo-img"
												loading="lazy"
											/>
										</div>
									<?php endif; ?>
								</div>

								<div class="bi-story-card__content">
									<div class="bi-story-card__content-inner">
										<div class="bi-story-card__meta">
											<span class="bi-story-card__badge"><?php echo esc_html( $rel['industry'] ); ?></span>
										</div>
										<h3 class="bi-story-card__title">
											<a href="<?php echo esc_url( $rel['permalink'] ); ?>">
												<?php echo esc_html( $rel['title'] ); ?>
											</a>
										</h3>
										<p class="bi-story-card__overview"><?php echo esc_html( $rel['card_overview'] ); ?></p>
										<?php if ( ! empty( $rel['tags'] ) ) : ?>
											<div class="bi-story-card__tags">
												<?php foreach ( array_slice( $rel['tags'], 0, 3 ) as $tag ) : ?>
													<span class="bi-story-card__tag"><?php echo esc_html( $tag ); ?></span>
												<?php endforeach; ?>
											</div>
										<?php endif; ?>
									</div>
									<div class="bi-story-card__footer">
										<a
											href="<?php echo esc_url( $rel['permalink'] ); ?>"
											class="bi-story-card__cta"
											aria-label="<?php echo esc_attr( sprintf( __( 'Read the story: %s', 'astra-child' ), $rel['title'] ) ); ?>"
										>
											<span class="bi-story-card__cta-text"><?php esc_html_e( 'READ THE STORY', 'astra-child' ); ?></span>
											<span class="bi-story-card__cta-arrow" aria-hidden="true">↗</span>
										</a>
									</div>
								</div>
							</article>
						<?php endforeach; ?>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<!-- 9. Contact CTA -->
		<section class="bi-case-cta-section">
			<div class="bi-case-cta__container bi-container">
				<div class="bi-case-cta__inner">
					<span class="bi-case-cta__eyebrow"><?php esc_html_e( 'READY TO CREATE MEASURABLE IMPACT?', 'astra-child' ); ?></span>
					<h2 class="bi-case-cta__title">
						<?php esc_html_e( 'Let’s build something extraordinary together.', 'astra-child' ); ?>
					</h2>
					<p class="bi-case-cta__desc">
						<?php esc_html_e( 'Whether you are accelerating digital growth, engineering scalable cloud infrastructure, or deploying applied AI, our team is ready to help.', 'astra-child' ); ?>
					</p>
					<div class="bi-case-cta__actions">
						<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-btn bi-btn--primary">
							<?php esc_html_e( 'Start a Conversation', 'astra-child' ); ?>
						</a>
						<a href="<?php echo esc_url( $work_url ); ?>" class="bi-btn bi-btn--secondary">
							<?php esc_html_e( 'Explore All Work', 'astra-child' ); ?>
						</a>
					</div>
				</div>
			</div>
		</section>

	</article>

<?php
endwhile;

get_footer();
