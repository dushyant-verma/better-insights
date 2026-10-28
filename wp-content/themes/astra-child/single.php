<?php
/**
 * Better Insights - Single Blog Article Template
 * Section 9: Individual Blog Article Compatibility
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Blog Stylesheet
$blog_css = $theme_dir . '/assets/css/blog.css';
if ( ! wp_style_is( 'bi-blog-style', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-blog-style',
		$theme_uri . '/assets/css/blog.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $blog_css ) ? (string) filemtime( $blog_css ) : wp_get_theme()->get( 'Version' )
	);
}

// Blog Script
$blog_js = $theme_dir . '/assets/js/blog.js';
if ( ! wp_script_is( 'bi-blog-script', 'enqueued' ) ) {
	wp_enqueue_script(
		'bi-blog-script',
		$theme_uri . '/assets/js/blog.js',
		array(),
		file_exists( $blog_js ) ? (string) filemtime( $blog_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

get_header();

while ( have_posts() ) :
	the_post();
	$post_id     = get_the_ID();
	$title       = get_the_title();
	$permalink   = get_permalink();
	$date        = get_the_date( 'F j, Y' );
	$author      = get_the_author();
	$content     = get_the_content();
	$words       = str_word_count( wp_strip_all_tags( $content ) );
	$read_time   = max( 1, ceil( $words / 200 ) ) . ' min read';
	$categories  = get_the_category();
	$primary_cat = ! empty( $categories ) ? $categories[0] : null;
	$cat_name    = $primary_cat ? $primary_cat->name : __( 'Insight', 'astra-child' );
	$cat_slug    = $primary_cat ? $primary_cat->slug : '';
	$insights_url = home_url( '/insights/' );
	$thumb_url   = get_the_post_thumbnail_url( $post_id, 'large' );

	if ( ! $thumb_url ) {
		$thumb_url = content_url( '/uploads/2026/10/AI-AUTOMATION.webp' );
	}
	?>

	<article class="bi-single-post" id="post-<?php the_ID(); ?>">

		<!-- Article Hero Header -->
		<header class="bi-single-post__header">
			<div class="bi-single-post__container">

				<!-- Breadcrumbs -->
				<nav class="bi-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
					<ol class="bi-breadcrumbs__list">
						<li class="bi-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
						<li class="bi-breadcrumbs__sep" aria-hidden="true">/</li>
						<li class="bi-breadcrumbs__item"><a href="<?php echo esc_url( $insights_url ); ?>"><?php esc_html_e( 'Insights', 'astra-child' ); ?></a></li>
						<?php if ( $primary_cat ) : ?>
							<li class="bi-breadcrumbs__sep" aria-hidden="true">/</li>
							<li class="bi-breadcrumbs__item"><a href="<?php echo esc_url( add_query_arg( 'category', $cat_slug, $insights_url ) ); ?>"><?php echo esc_html( $cat_name ); ?></a></li>
						<?php endif; ?>
					</ol>
				</nav>

				<!-- Category Badge -->
				<div class="bi-single-post__cat-wrap">
					<span class="bi-article-pill"><?php echo esc_html( $cat_name ); ?></span>
				</div>

				<!-- Article Title (Single H1) -->
				<h1 class="bi-single-post__title"><?php echo esc_html( $title ); ?></h1>

				<!-- Author & Metadata Row -->
				<div class="bi-single-post__meta-bar">
					<div class="bi-single-post__author-block">
						<span class="bi-single-post__author-avatar" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
						</span>
						<div class="bi-single-post__meta-text">
							<span class="bi-single-post__author-name"><?php echo esc_html( $author ? $author : 'Better Insights Team' ); ?></span>
							<span class="bi-single-post__details">
								<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( $date ); ?></time>
								<span class="bi-sep" aria-hidden="true">&bull;</span>
								<span><?php echo esc_html( $read_time ); ?></span>
							</span>
						</div>
					</div>

					<!-- Safe Social Sharing Controls -->
					<div class="bi-single-post__share-wrap">
						<span class="bi-single-post__share-label"><?php esc_html_e( 'Share:', 'astra-child' ); ?></span>
						<a
							href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo rawurlencode( $permalink ); ?>"
							target="_blank"
							rel="noopener noreferrer"
							class="bi-share-btn"
							aria-label="<?php esc_attr_e( 'Share on LinkedIn', 'astra-child' ); ?>"
						>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
						</a>
						<a
							href="https://twitter.com/intent/tweet?url=<?php echo rawurlencode( $permalink ); ?>&text=<?php echo rawurlencode( $title ); ?>"
							target="_blank"
							rel="noopener noreferrer"
							class="bi-share-btn"
							aria-label="<?php esc_attr_e( 'Share on X', 'astra-child' ); ?>"
						>
							<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
							</svg>
						</a>
						<button
							type="button"
							class="bi-share-btn bi-share-btn--copy"
							data-copy-url="<?php echo esc_url( $permalink ); ?>"
							aria-label="<?php esc_attr_e( 'Copy article link to clipboard', 'astra-child' ); ?>"
						>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
							</svg>
							<span class="bi-share-copied-tooltip" aria-hidden="true"><?php esc_html_e( 'Copied!', 'astra-child' ); ?></span>
						</button>
					</div>
				</div>

				<!-- Featured Image Banner -->
				<div class="bi-single-post__featured-img-wrap">
					<img
						class="bi-single-post__featured-img"
						src="<?php echo esc_url( $thumb_url ); ?>"
						alt="<?php echo esc_attr( $title ); ?>"
						loading="eager"
						fetchpriority="high"
					/>
				</div>

			</div>
		</header>

		<!-- Main Article Content Body -->
		<div class="bi-single-post__body">
			<div class="bi-single-post__content-container">

				<div class="bi-single-post__content entry-content">
					<?php the_content(); ?>
				</div>

				<!-- Author Bio / Better Insights Transformation Card -->
				<div class="bi-article-cta-box">
					<div class="bi-article-cta-box__inner">
						<div class="bi-article-cta-box__text">
							<span class="bi-article-cta-box__eyebrow"><?php esc_html_e( "LET'S BUILD WHAT'S NEXT", 'astra-child' ); ?></span>
							<h3 class="bi-article-cta-box__title"><?php esc_html_e( 'Ready to translate strategy into measurable business outcomes?', 'astra-child' ); ?></h3>
							<p class="bi-article-cta-box__desc"><?php esc_html_e( 'Connect with our team to discuss how AI automation, modern engineering, and digital growth can transform your organization.', 'astra-child' ); ?></p>
						</div>
						<div class="bi-article-cta-box__action">
							<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-cta bi-cta--blue">
								<span><?php esc_html_e( 'START A CONVERSATION', 'astra-child' ); ?></span>
								<span class="bi-cta__icon" aria-hidden="true">
									<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
							</a>
						</div>
					</div>
				</div>

				<!-- Back to Insights Link -->
				<div class="bi-single-post__back">
					<a href="<?php echo esc_url( $insights_url ); ?>" class="bi-back-link">
						<span aria-hidden="true">&larr;</span> <?php esc_html_e( 'Back to All Insights', 'astra-child' ); ?>
					</a>
				</div>

			</div>
		</div>

		<!-- Related Articles Section -->
		<?php
		$related_args = array(
			'post_type'      => 'post',
			'posts_per_page' => 3,
			'post__not_in'   => array( $post_id ),
			'post_status'    => 'publish',
		);
		if ( $primary_cat ) {
			$related_args['category__in'] = array( $primary_cat->term_id );
		}
		$related_query = new WP_Query( $related_args );

		if ( $related_query->have_posts() ) :
			?>
			<section class="bi-related-articles" aria-label="<?php esc_attr_e( 'Related Perspectives', 'astra-child' ); ?>">
				<div class="bi-related-articles__container">
					<div class="bi-related-articles__head">
						<span class="bi-related-articles__eyebrow"><?php esc_html_e( 'RELATED PERSPECTIVES', 'astra-child' ); ?></span>
						<h2 class="bi-related-articles__heading"><?php esc_html_e( 'Continue Reading', 'astra-child' ); ?></h2>
					</div>

					<div class="bi-blog-grid bi-blog-grid--related">
						<?php
						while ( $related_query->have_posts() ) :
							$related_query->the_post();
							$rel_id    = get_the_ID();
							$rel_title = get_the_title();
							$rel_url   = get_permalink();
							$rel_date  = get_the_date( 'M j, Y' );
							$rel_words = str_word_count( wp_strip_all_tags( get_the_content() ) );
							$rel_time  = max( 1, ceil( $rel_words / 200 ) ) . ' min read';
							$rel_cats  = get_the_category();
							$rel_cat   = ! empty( $rel_cats ) ? $rel_cats[0]->name : __( 'Insight', 'astra-child' );
							$rel_thumb = get_the_post_thumbnail_url( $rel_id, 'medium_large' );

							if ( ! $rel_thumb ) {
								$rel_thumb = content_url( '/uploads/2026/10/AI-AUTOMATION.webp' );
							}
							?>
							<article class="bi-article-card">
								<div class="bi-article-card__visual">
									<a href="<?php echo esc_url( $rel_url ); ?>" class="bi-article-card__img-link" tabindex="-1" aria-hidden="true">
										<img
											class="bi-article-card__img"
											src="<?php echo esc_url( $rel_thumb ); ?>"
											alt="<?php echo esc_attr( $rel_title ); ?>"
											loading="lazy"
										/>
									</a>
									<span class="bi-article-card__cat-badge"><?php echo esc_html( $rel_cat ); ?></span>
								</div>

								<div class="bi-article-card__body">
									<div class="bi-article-card__meta">
										<span class="bi-article-card__date"><?php echo esc_html( $rel_date ); ?></span>
										<span class="bi-article-card__sep" aria-hidden="true">&bull;</span>
										<span class="bi-article-card__read-time"><?php echo esc_html( $rel_time ); ?></span>
									</div>

									<h3 class="bi-article-card__title">
										<a href="<?php echo esc_url( $rel_url ); ?>" class="bi-article-card__title-link">
											<?php echo esc_html( $rel_title ); ?>
										</a>
									</h3>

									<div class="bi-article-card__cta-wrap">
										<a href="<?php echo esc_url( $rel_url ); ?>" class="bi-cta bi-cta--blue bi-article-card__cta">
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
				</div>
			</section>
			<?php
			wp_reset_postdata();
		endif;
		?>

	</article>

<?php
endwhile;

get_footer();
