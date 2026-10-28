<?php
/**
 * Better Insights - Category Archive Template
 * The master editorial template for displaying WordPress category archives.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// 1. Enqueue Master CTA Stylesheet
$cta_css = $theme_dir . '/assets/css/cta.css';
if ( ! wp_style_is( 'bi-cta-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-cta-style',
		$theme_uri . '/assets/css/cta.css',
		array( 'astra-child-style' ),
		file_exists( $cta_css ) ? (string) filemtime( $cta_css ) : wp_get_theme()->get( 'Version' )
	);
}

// 2. Enqueue Dedicated Category Archive Stylesheet
$category_css = $theme_dir . '/assets/css/category.css';
if ( ! wp_style_is( 'bi-category-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-category-style',
		$theme_uri . '/assets/css/category.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $category_css ) ? (string) filemtime( $category_css ) : wp_get_theme()->get( 'Version' )
	);
}

// 3. Resolve Current Category Information
$current_cat  = get_queried_object();
$cat_id       = isset( $current_cat->term_id ) ? (int) $current_cat->term_id : 0;
$cat_title    = single_cat_title( '', false );
$cat_slug     = isset( $current_cat->slug ) ? $current_cat->slug : '';
$raw_desc     = category_description( $cat_id );

// Fallback category description if not provided in WordPress admin
if ( ! empty( trim( wp_strip_all_tags( $raw_desc ) ) ) ) {
	$cat_desc = trim( wp_strip_all_tags( $raw_desc ) );
} elseif ( 'ai-automation' === $cat_slug ) {
	$cat_desc = __( 'Explore how artificial intelligence, intelligent agents, and workflow automation are transforming the way businesses operate and grow.', 'astra-child' );
} else {
	$cat_desc = sprintf(
		/* translators: %s is category name */
		__( 'Explore perspectives, analysis, and strategic insights on %s from the Better Insights team.', 'astra-child' ),
		$cat_title
	);
}

// 4. Retrieve Published Categories for Filter Bar
$all_categories = get_categories(
	array(
		'hide_empty' => true,
		'exclude'    => array( 1 ), // Exclude default 'Uncategorized'
	)
);

$clean_cat_title = wp_specialchars_decode( $cat_title, ENT_QUOTES );

get_header();
?>

<main class="bi-category-archive" id="primary" role="main">

	<!-- =====================================================================
	     1. DEDICATED CATEGORY HERO (Directly Below Global Header)
	     ===================================================================== -->
	<header class="bi-category-hero" aria-label="<?php echo esc_attr( sprintf( __( '%s Category Overview', 'astra-child' ), $clean_cat_title ) ); ?>">
		<div class="bi-category-hero__container">
			<div class="bi-category-hero__content">

				<!-- Eyebrow Pill -->
				<div class="bi-category-hero__eyebrow-wrap">
					<span class="bi-category-hero__eyebrow-dot" aria-hidden="true"></span>
					<span class="bi-category-hero__eyebrow">
						<?php echo esc_html( sprintf( __( 'INSIGHTS / %s', 'astra-child' ), strtoupper( $clean_cat_title ) ) ); ?>
					</span>
				</div>

				<!-- Main Category Title -->
				<h1 class="bi-category-hero__title">
					<?php echo esc_html( $clean_cat_title ); ?>
				</h1>

				<!-- Category Description -->
				<p class="bi-category-hero__desc">
					<?php echo esc_html( $cat_desc ); ?>
				</p>

			</div>
		</div>
	</header>

	<!-- =====================================================================
	     2. CATEGORY ARCHIVE FEED SECTION
	     ===================================================================== -->
	<section class="bi-category-feed" aria-label="<?php echo esc_attr( sprintf( __( '%s Articles', 'astra-child' ), $cat_title ) ); ?>">
		<div class="bi-category-feed__container">

			<!-- Category Navigation Filter Bar (Horizontal Scrollable on Mobile) -->
			<div class="bi-category-nav-bar">
				<nav class="bi-category-pills" aria-label="<?php esc_attr_e( 'Filter insights by category', 'astra-child' ); ?>">
					<!-- All Insights Link -->
					<a
						href="<?php echo esc_url( home_url( '/insights/' ) ); ?>"
						class="bi-cat-pill"
					>
						<?php esc_html_e( 'All Insights', 'astra-child' ); ?>
					</a>

					<!-- Individual Category Links -->
					<?php foreach ( $all_categories as $cat ) : ?>
						<?php
						$is_active = ( $cat_id === (int) $cat->term_id );
						$cat_url   = get_category_link( $cat->term_id );
						?>
						<a
							href="<?php echo esc_url( $cat_url ); ?>"
							class="bi-cat-pill<?php echo $is_active ? ' is-active' : ''; ?>"
							<?php echo $is_active ? 'aria-current="page"' : ''; ?>
						>
							<?php echo esc_html( $cat->name ); ?>
							<span class="bi-cat-pill__count"><?php echo esc_html( $cat->count ); ?></span>
						</a>
					<?php endforeach; ?>
				</nav>
			</div>

			<!-- 3-Column Responsive Article Grid -->
			<?php if ( have_posts() ) : ?>
				<div class="bi-category-grid">
					<?php
					while ( have_posts() ) :
						the_post();
						$post_id    = get_the_ID();
						$post_title = get_the_title();
						$post_url   = get_permalink();
						$post_date  = get_the_date( 'M j, Y' );
						$raw_words  = str_word_count( wp_strip_all_tags( get_the_content() ) );
						$read_time  = max( 1, ceil( $raw_words / 200 ) ) . ' min read';
						$categories = get_the_category();
						$card_cat   = ! empty( $categories ) ? $categories[0]->name : $cat_title;
						$thumb_url  = get_the_post_thumbnail_url( $post_id, 'large' );

						// Graceful image fallback
						if ( ! $thumb_url ) {
							$fallback_file = ABSPATH . 'wp-content/uploads/2026/10/AI-AUTOMATION.webp';
							if ( file_exists( $fallback_file ) ) {
								$thumb_url = content_url( '/uploads/2026/10/AI-AUTOMATION.webp' );
							} else {
								$thumb_url = get_theme_file_uri( 'assets/images/work-01.jpg' );
							}
						}
						?>
						<article class="bi-category-card" id="post-<?php echo esc_attr( $post_id ); ?>">
							
							<!-- 1. Featured Image Visual (16:9 Aspect Ratio) -->
							<div class="bi-category-card__visual">
								<a
									href="<?php echo esc_url( $post_url ); ?>"
									class="bi-category-card__img-link"
									tabindex="-1"
									aria-hidden="true"
								>
									<img
										class="bi-category-card__img"
										src="<?php echo esc_url( $thumb_url ); ?>"
										alt="<?php echo esc_attr( $post_title ); ?>"
										loading="lazy"
										width="640"
										height="360"
									/>
								</a>
								<span class="bi-category-card__cat-badge"><?php echo esc_html( $card_cat ); ?></span>
							</div>

							<!-- 2. Card Body Content -->
							<div class="bi-category-card__body">
								
								<!-- Meta Information: Date & Reading Time -->
								<div class="bi-category-card__meta">
									<time class="bi-category-card__date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
										<?php echo esc_html( $post_date ); ?>
									</time>
									<span class="bi-category-card__sep" aria-hidden="true">&bull;</span>
									<span class="bi-category-card__read-time"><?php echo esc_html( $read_time ); ?></span>
								</div>

								<!-- Article Title -->
								<h2 class="bi-category-card__title">
									<a href="<?php echo esc_url( $post_url ); ?>" class="bi-category-card__title-link">
										<?php echo esc_html( $post_title ); ?>
									</a>
								</h2>

								<!-- Short Excerpt -->
								<div class="bi-category-card__excerpt">
									<?php the_excerpt(); ?>
								</div>

								<!-- 3. Subtle Bottom CTA: READ ARTICLE ↗ -->
								<div class="bi-category-card__footer">
									<a
										href="<?php echo esc_url( $post_url ); ?>"
										class="bi-category-card__cta"
										aria-label="<?php echo esc_attr( sprintf( __( 'Read article: %s', 'astra-child' ), $post_title ) ); ?>"
									>
										<span><?php esc_html_e( 'READ ARTICLE', 'astra-child' ); ?></span>
										<span class="bi-category-card__cta-icon" aria-hidden="true">
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

				<!-- Pagination Navigation (if multiple pages exist) -->
				<?php
				global $wp_query;
				$total_pages = $wp_query->max_num_pages;
				if ( $total_pages > 1 ) :
					$paged = max( 1, get_query_var( 'paged' ) );
					?>
					<nav class="bi-category-pagination" aria-label="<?php esc_attr_e( 'Category pagination', 'astra-child' ); ?>">
						<?php
						echo paginate_links(
							array(
								'base'      => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
								'format'    => '?paged=%#%',
								'current'   => $paged,
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
				<!-- Empty State if Category Has No Articles -->
				<div class="bi-category-empty">
					<div class="bi-category-empty__icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
							<polyline points="14 2 14 8 20 8"></polyline>
							<line x1="9" y1="15" x2="15" y2="15"></line>
						</svg>
					</div>
					<h3 class="bi-category-empty__title"><?php esc_html_e( 'No Articles in This Category', 'astra-child' ); ?></h3>
					<p class="bi-category-empty__desc">
						<?php esc_html_e( 'There are currently no published articles in this category. Please check back soon or explore our other perspectives.', 'astra-child' ); ?>
					</p>
					<a href="<?php echo esc_url( home_url( '/insights/' ) ); ?>" class="bi-cta bi-cta--blue bi-category-empty__cta">
						<span><?php esc_html_e( 'VIEW ALL INSIGHTS', 'astra-child' ); ?></span>
						<span class="bi-cta__icon" aria-hidden="true">
							<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
				</div>
			<?php endif; ?>

		</div>
	</section>

</main>

<?php
get_footer();
