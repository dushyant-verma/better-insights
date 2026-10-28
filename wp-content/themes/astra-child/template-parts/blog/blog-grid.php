<?php
/**
 * Better Insights - Blog Grid, Categories Filter, Search & Pagination Template Part
 * Sections 6, 7 & 8: Category Navigation, Article Grid, Search & Pagination
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Current Page URL for filter links
$current_page_url = get_permalink();

// Determine filter and pagination parameters
$paged        = ( get_query_var( 'paged' ) ) ? (int) get_query_var( 'paged' ) : ( ( get_query_var( 'page' ) ) ? (int) get_query_var( 'page' ) : 1 );
$current_cat  = isset( $_GET['category'] ) ? sanitize_key( $_GET['category'] ) : '';
$search_query = isset( $_GET['bi_search'] ) ? sanitize_text_field( wp_unslash( $_GET['bi_search'] ) ) : '';

// Retrieve actual WordPress categories that have posts
$all_categories = get_categories(
	array(
		'hide_empty' => false,
		'exclude'    => array( 1 ), // Exclude default 'Uncategorized' if desired
	)
);

// Query Arguments
$grid_args = array(
	'post_type'           => 'post',
	'post_status'         => 'publish',
	'posts_per_page'      => 6,
	'paged'               => $paged,
	'ignore_sticky_posts' => 1,
);

if ( ! empty( $current_cat ) && 'all' !== $current_cat ) {
	$grid_args['category_name'] = $current_cat;
}

if ( ! empty( $search_query ) ) {
	$grid_args['s'] = $search_query;
}

$grid_query = new WP_Query( $grid_args );
?>

<section class="bi-blog-feed" id="bi-insights-feed" aria-label="<?php esc_attr_e( 'All Better Insights Articles', 'astra-child' ); ?>">
	<div class="bi-blog-feed__container">

		<!-- Controls Toolbar: Category Pills & Inline Search -->
		<div class="bi-blog-controls">

			<!-- Category Filter Nav (Horizontal Scrollable on Mobile) -->
			<div class="bi-blog-cats-wrapper">
				<nav class="bi-blog-cats" aria-label="<?php esc_attr_e( 'Filter articles by category', 'astra-child' ); ?>">
					<?php
					$all_active = ( empty( $current_cat ) || 'all' === $current_cat ) ? ' is-active' : '';
					$all_url    = remove_query_arg( array( 'category', 'paged', 'page' ), $current_page_url );
					if ( ! empty( $search_query ) ) {
						$all_url = add_query_arg( 'bi_search', rawurlencode( $search_query ), $all_url );
					}
					?>
					<a
						href="<?php echo esc_url( $all_url ); ?>#bi-insights-feed"
						class="bi-cat-pill<?php echo esc_attr( $all_active ); ?>"
						data-cat-slug="all"
					>
						<?php esc_html_e( 'All Insights', 'astra-child' ); ?>
					</a>

					<?php foreach ( $all_categories as $cat ) : ?>
						<?php
						$is_active = ( $current_cat === $cat->slug ) ? ' is-active' : '';
						$cat_url   = add_query_arg( 'category', $cat->slug, $current_page_url );
						$cat_url   = remove_query_arg( array( 'paged', 'page' ), $cat_url );
						if ( ! empty( $search_query ) ) {
							$cat_url = add_query_arg( 'bi_search', rawurlencode( $search_query ), $cat_url );
						}
						?>
						<a
							href="<?php echo esc_url( $cat_url ); ?>#bi-insights-feed"
							class="bi-cat-pill<?php echo esc_attr( $is_active ); ?>"
							data-cat-slug="<?php echo esc_attr( $cat->slug ); ?>"
						>
							<?php echo esc_html( $cat->name ); ?>
							<span class="bi-cat-pill__count"><?php echo esc_html( $cat->count ); ?></span>
						</a>
					<?php endforeach; ?>
				</nav>
			</div>

			<!-- Search Bar -->
			<div class="bi-blog-search-wrap">
				<form method="get" action="<?php echo esc_url( $current_page_url ); ?>" class="bi-blog-search-form" role="search">
					<?php if ( ! empty( $current_cat ) ) : ?>
						<input type="hidden" name="category" value="<?php echo esc_attr( $current_cat ); ?>">
					<?php endif; ?>

					<label for="bi-blog-search-input" class="screen-reader-text"><?php esc_html_e( 'Search insights articles', 'astra-child' ); ?></label>
					<div class="bi-blog-search-inner">
						<span class="bi-blog-search-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="11" cy="11" r="8"/>
								<line x1="21" y1="21" x2="16.65" y2="16.65"/>
							</svg>
						</span>
						<input
							type="search"
							id="bi-blog-search-input"
							name="bi_search"
							class="bi-blog-search-input"
							placeholder="<?php esc_attr_e( 'Search perspectives & ideas...', 'astra-child' ); ?>"
							value="<?php echo esc_attr( $search_query ); ?>"
						/>
						<?php if ( ! empty( $search_query ) ) : ?>
							<?php
							$clear_url = remove_query_arg( array( 'bi_search', 'paged', 'page' ), $current_page_url );
							if ( ! empty( $current_cat ) ) {
								$clear_url = add_query_arg( 'category', $current_cat, $clear_url );
							}
							?>
							<a href="<?php echo esc_url( $clear_url ); ?>#bi-insights-feed" class="bi-blog-search-clear" aria-label="<?php esc_attr_e( 'Clear search', 'astra-child' ); ?>">
								&times;
							</a>
						<?php endif; ?>
					</div>
					<button type="submit" class="bi-blog-search-btn">
						<span><?php esc_html_e( 'Search', 'astra-child' ); ?></span>
					</button>
				</form>
			</div>

		</div>

		<!-- Active Filters Indicator -->
		<?php if ( ! empty( $current_cat ) || ! empty( $search_query ) ) : ?>
			<div class="bi-blog-active-filter-bar">
				<span class="bi-blog-filter-label"><?php esc_html_e( 'Showing results for:', 'astra-child' ); ?></span>
				<?php if ( ! empty( $current_cat ) ) : ?>
					<?php
					$term_obj = get_term_by( 'slug', $current_cat, 'category' );
					$term_label = $term_obj ? $term_obj->name : ucfirst( $current_cat );
					$remove_cat_url = remove_query_arg( 'category', $current_page_url );
					?>
					<span class="bi-blog-active-tag">
						<?php echo esc_html( $term_label ); ?>
						<a href="<?php echo esc_url( $remove_cat_url ); ?>#bi-insights-feed" aria-label="<?php esc_attr_e( 'Remove category filter', 'astra-child' ); ?>">&times;</a>
					</span>
				<?php endif; ?>

				<?php if ( ! empty( $search_query ) ) : ?>
					<?php $remove_search_url = remove_query_arg( 'bi_search', $current_page_url ); ?>
					<span class="bi-blog-active-tag">
						&ldquo;<?php echo esc_html( $search_query ); ?>&rdquo;
						<a href="<?php echo esc_url( $remove_search_url ); ?>#bi-insights-feed" aria-label="<?php esc_attr_e( 'Remove search term', 'astra-child' ); ?>">&times;</a>
					</span>
				<?php endif; ?>

				<a href="<?php echo esc_url( remove_query_arg( array( 'category', 'bi_search', 'paged', 'page' ), $current_page_url ) ); ?>#bi-insights-feed" class="bi-blog-reset-all">
					<?php esc_html_e( 'Reset all filters', 'astra-child' ); ?>
				</a>
			</div>
		<?php endif; ?>

		<!-- 3-Column Responsive Articles Grid -->
		<?php if ( $grid_query->have_posts() ) : ?>
			<div class="bi-blog-grid">
				<?php
				while ( $grid_query->have_posts() ) :
					$grid_query->the_post();
					$card_id    = get_the_ID();
					$card_title = get_the_title();
					$card_url   = get_permalink();
					$card_date  = get_the_date( 'M j, Y' );
					$card_words = str_word_count( wp_strip_all_tags( get_the_content() ) );
					$card_time  = max( 1, ceil( $card_words / 200 ) ) . ' min read';
					$card_cats  = get_the_category();
					$card_cat   = ! empty( $card_cats ) ? $card_cats[0]->name : __( 'Insight', 'astra-child' );
					$card_thumb = get_the_post_thumbnail_url( $card_id, 'medium_large' );

					if ( ! $card_thumb ) {
						$card_thumb = content_url( '/uploads/2026/10/AI-AUTOMATION.webp' );
					}
					?>
					<article class="bi-article-card">
						<!-- Image Container with Hover Zoom -->
						<div class="bi-article-card__visual">
							<a href="<?php echo esc_url( $card_url ); ?>" class="bi-article-card__img-link" tabindex="-1" aria-hidden="true">
								<img
									class="bi-article-card__img"
									src="<?php echo esc_url( $card_thumb ); ?>"
									alt="<?php echo esc_attr( $card_title ); ?>"
									loading="lazy"
								/>
							</a>
							<span class="bi-article-card__cat-badge"><?php echo esc_html( $card_cat ); ?></span>
						</div>

						<!-- Card Body -->
						<div class="bi-article-card__body">
							<div class="bi-article-card__meta">
								<span class="bi-article-card__date"><?php echo esc_html( $card_date ); ?></span>
								<span class="bi-article-card__sep" aria-hidden="true">&bull;</span>
								<span class="bi-article-card__read-time"><?php echo esc_html( $card_time ); ?></span>
							</div>

							<h3 class="bi-article-card__title">
								<a href="<?php echo esc_url( $card_url ); ?>" class="bi-article-card__title-link">
									<?php echo esc_html( $card_title ); ?>
								</a>
							</h3>

							<div class="bi-article-card__excerpt">
								<?php the_excerpt(); ?>
							</div>

							<div class="bi-article-card__cta-wrap">
								<a href="<?php echo esc_url( $card_url ); ?>" class="bi-cta bi-cta--blue bi-article-card__cta" aria-label="<?php echo esc_attr( sprintf( __( 'Read article: %s', 'astra-child' ), $card_title ) ); ?>">
									<span><?php esc_html_e( 'READ ARTICLE', 'astra-child' ); ?></span>
									<span class="bi-cta__icon" aria-hidden="true">
										<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</span>
								</a>
							</div>
						</div>
					</article>
				<?php endwhile; ?>
			</div>

			<!-- Pagination Navigation -->
			<?php
			$total_pages = $grid_query->max_num_pages;
			if ( $total_pages > 1 ) :
				?>
				<nav class="bi-blog-pagination" aria-label="<?php esc_attr_e( 'Insights articles pagination', 'astra-child' ); ?>">
					<?php
					echo paginate_links(
						array(
							'base'      => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
							'format'    => '?paged=%#%',
							'current'   => max( 1, $paged ),
							'total'     => $total_pages,
							'prev_text' => '&larr; ' . __( 'Previous', 'astra-child' ),
							'next_text' => __( 'Next', 'astra-child' ) . ' &rarr;',
							'type'      => 'list',
						)
					);
					?>
				</nav>
			<?php endif; ?>

		<?php else : ?>
			<!-- Empty State when no articles match filter or search -->
			<div class="bi-blog-empty">
				<div class="bi-blog-empty__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
						<line x1="9" y1="15" x2="15" y2="15"></line>
					</svg>
				</div>
				<h3 class="bi-blog-empty__title"><?php esc_html_e( 'No Articles Found', 'astra-child' ); ?></h3>
				<p class="bi-blog-empty__desc">
					<?php
					if ( ! empty( $search_query ) ) {
						printf(
							/* translators: %s: search query */
							esc_html__( 'We couldn’t find any perspectives matching "%s". Try searching with different keywords or browse all categories.', 'astra-child' ),
							esc_html( $search_query )
						);
					} else {
						esc_html_e( 'There are currently no articles published under this category. Please check back soon or browse all insights.', 'astra-child' );
					}
					?>
				</p>
				<a href="<?php echo esc_url( remove_query_arg( array( 'category', 'bi_search', 'paged', 'page' ), $current_page_url ) ); ?>#bi-insights-feed" class="bi-cta bi-cta--blue bi-blog-empty__cta">
					<span><?php esc_html_e( 'VIEW ALL INSIGHTS', 'astra-child' ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</div>
		<?php endif; ?>

		<?php wp_reset_postdata(); ?>

	</div>
</section>
