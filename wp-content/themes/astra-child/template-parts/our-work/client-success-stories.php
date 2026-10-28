<?php
/**
 * Template Part: Client Success Stories & Case Studies Section
 * Implements Section 1-5 & 7-10 inspired by Nagarro reference design.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$case_studies = bi_get_case_studies();
$industries   = bi_get_unique_case_study_industries();
$services     = bi_get_unique_case_study_services();
$total_count  = count( $case_studies );
?>

<section class="bi-success-stories" id="client-success-stories" aria-label="<?php esc_attr_e( 'Client Success Stories & Case Studies', 'astra-child' ); ?>">
	<div class="bi-success-stories__container bi-container">

		<!-- Section Heading & Introduction -->
		<header class="bi-success-stories__header">
			<h2 class="bi-success-stories__title"><?php esc_html_e( 'CLIENT SUCCESS STORIES', 'astra-child' ); ?></h2>
			<p class="bi-success-stories__intro">
				<?php esc_html_e( 'Explore how we help businesses solve complex challenges, improve digital experiences, and create meaningful business outcomes through strategy, creativity, marketing, and technology.', 'astra-child' ); ?>
			</p>
		</header>

		<!-- Filter Bar -->
		<div class="bi-stories-filter-bar">
			<div class="bi-stories-filter-controls">
				
				<!-- Filter 1: Industry -->
				<div class="bi-filter-group">
					<label for="bi-filter-industry" class="screen-reader-text"><?php esc_html_e( 'Select industry', 'astra-child' ); ?></label>
					<div class="bi-select-wrapper">
						<select id="bi-filter-industry" class="bi-filter-select" aria-label="<?php esc_attr_e( 'Select industry', 'astra-child' ); ?>">
							<option value=""><?php esc_html_e( 'Select industry', 'astra-child' ); ?></option>
							<option value="ALL"><?php esc_html_e( 'All industries', 'astra-child' ); ?></option>
							<?php foreach ( $industries as $ind ) : ?>
								<option value="<?php echo esc_attr( $ind ); ?>"><?php echo esc_html( $ind ); ?></option>
							<?php endforeach; ?>
						</select>
						<span class="bi-select-arrow" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</span>
					</div>
				</div>

				<!-- Filter 2: Service -->
				<div class="bi-filter-group">
					<label for="bi-filter-service" class="screen-reader-text"><?php esc_html_e( 'Select service', 'astra-child' ); ?></label>
					<div class="bi-select-wrapper">
						<select id="bi-filter-service" class="bi-filter-select" aria-label="<?php esc_attr_e( 'Select service', 'astra-child' ); ?>">
							<option value=""><?php esc_html_e( 'Select service', 'astra-child' ); ?></option>
							<option value="ALL"><?php esc_html_e( 'All services', 'astra-child' ); ?></option>
							<?php foreach ( $services as $srv ) : ?>
								<option value="<?php echo esc_attr( $srv ); ?>"><?php echo esc_html( $srv ); ?></option>
							<?php endforeach; ?>
						</select>
						<span class="bi-select-arrow" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</span>
					</div>
				</div>

				<!-- Reset Button (shown when filter active) -->
				<button type="button" class="bi-filter-reset" id="bi-filter-reset" aria-label="<?php esc_attr_e( 'Reset all filters', 'astra-child' ); ?>">
					<span><?php esc_html_e( 'Reset filters', 'astra-child' ); ?></span>
					<span class="bi-filter-reset__icon" aria-hidden="true">×</span>
				</button>
			</div>

			<!-- Dynamic Counter -->
			<div class="bi-stories-counter" id="bi-stories-counter" aria-live="polite">
				<?php printf( esc_html__( 'Showing %d stories', 'astra-child' ), $total_count ); ?>
			</div>
		</div>

		<!-- Case Studies Grid (2 cards per row on desktop) -->
		<div class="bi-stories-grid" id="bi-stories-grid" data-total-count="<?php echo esc_attr( $total_count ); ?>">
			<?php if ( ! empty( $case_studies ) ) : ?>
				<?php foreach ( $case_studies as $study ) : ?>
					<article
						class="bi-story-card"
						data-industry="<?php echo esc_attr( $study['industry'] ); ?>"
						data-service="<?php echo esc_attr( $study['service'] ); ?>"
					>
						<!-- Left Side: Project Visual / Image (~42% width) -->
						<div class="bi-story-card__media">
							<a href="<?php echo esc_url( $study['permalink'] ); ?>" class="bi-story-card__media-link" tabindex="-1" aria-hidden="true">
								<img
									src="<?php echo esc_url( $study['image_url'] ); ?>"
									alt="<?php echo esc_attr( $study['client_name'] . ' - ' . $study['title'] ); ?>"
									class="bi-story-card__image"
									loading="lazy"
									decoding="async"
								/>
							</a>

							<?php if ( ! empty( $study['client_logo'] ) ) : ?>
								<div class="bi-story-card__logo-pill">
									<img
										src="<?php echo esc_url( $study['client_logo'] ); ?>"
										alt="<?php echo esc_attr( $study['client_name'] . ' Logo' ); ?>"
										class="bi-story-card__logo-img"
										loading="lazy"
									/>
								</div>
							<?php endif; ?>
						</div>

						<!-- Right Side: Light-Gray Editorial Content Panel -->
						<div class="bi-story-card__content">
							<div class="bi-story-card__content-inner">
								
								<!-- Industry Badge -->
								<div class="bi-story-card__meta">
									<span class="bi-story-card__badge"><?php echo esc_html( $study['industry'] ); ?></span>
								</div>

								<!-- Title -->
								<h3 class="bi-story-card__title">
									<a href="<?php echo esc_url( $study['permalink'] ); ?>">
										<?php echo esc_html( $study['title'] ); ?>
									</a>
								</h3>

								<!-- Overview -->
								<p class="bi-story-card__overview">
									<?php echo esc_html( $study['card_overview'] ); ?>
								</p>

								<!-- Tags -->
								<?php if ( ! empty( $study['tags'] ) ) : ?>
									<div class="bi-story-card__tags">
										<?php foreach ( $study['tags'] as $tag ) : ?>
											<span class="bi-story-card__tag"><?php echo esc_html( $tag ); ?></span>
										<?php endforeach; ?>
									</div>
								<?php endif; ?>
							</div>

							<!-- Card Footer / CTA -->
							<div class="bi-story-card__footer">
								<a
									href="<?php echo esc_url( $study['permalink'] ); ?>"
									class="bi-story-card__cta"
									aria-label="<?php echo esc_attr( sprintf( __( 'Read the story: %s', 'astra-child' ), $study['title'] ) ); ?>"
								>
									<span class="bi-story-card__cta-text"><?php esc_html_e( 'READ THE STORY', 'astra-child' ); ?></span>
									<span class="bi-story-card__cta-arrow" aria-hidden="true">↗</span>
								</a>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>

		<!-- Empty State Box -->
		<div class="bi-stories-empty" id="bi-stories-empty" role="status" aria-live="polite" style="display: none;">
			<div class="bi-stories-empty__icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>
			<h3 class="bi-stories-empty__heading"><?php esc_html_e( 'No matching case studies found', 'astra-child' ); ?></h3>
			<p class="bi-stories-empty__text">
				<?php esc_html_e( 'No client success stories match both selected filters. Adjust your filters or reset to view all published work.', 'astra-child' ); ?>
			</p>
			<button type="button" class="bi-stories-empty__btn" id="bi-empty-reset-btn">
				<?php esc_html_e( 'Reset All Filters', 'astra-child' ); ?>
			</button>
		</div>

	</div>
</section>
