<?php
/**
 * Better Insights - Featured Article Template Part
 * Section 5: Featured Article
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Fetch the most recent published post for the Featured spotlight
$featured_query = new WP_Query(
	array(
		'post_type'           => 'post',
		'posts_per_page'      => 1,
		'post_status'         => 'publish',
		'ignore_sticky_posts' => 1,
	)
);

if ( $featured_query->have_posts() ) :
	while ( $featured_query->have_posts() ) :
		$featured_query->the_post();
		$post_id    = get_the_ID();
		$title      = get_the_title();
		$permalink  = get_permalink();
		$date       = get_the_date( 'F j, Y' );
		$content    = get_the_content();
		$words      = str_word_count( wp_strip_all_tags( $content ) );
		$read_time  = max( 1, ceil( $words / 200 ) ) . ' min read';
		$categories = get_the_category();
		$cat_name   = ! empty( $categories ) ? $categories[0]->name : __( 'Insight', 'astra-child' );
		$cat_slug   = ! empty( $categories ) ? $categories[0]->slug : '';
		$thumb_url  = get_the_post_thumbnail_url( $post_id, 'large' );

		// Fallback poster image if post has no thumbnail
		if ( ! $thumb_url ) {
			$thumb_url = content_url( '/uploads/2026/10/AI-AUTOMATION.webp' );
		}
		?>
		<section class="bi-featured-article" aria-label="<?php esc_attr_e( 'Featured Insight', 'astra-child' ); ?>">
			<div class="bi-featured-article__container">

				<div class="bi-featured-article__card">
					<!-- Visual Column -->
					<div class="bi-featured-article__visual">
						<a href="<?php echo esc_url( $permalink ); ?>" class="bi-featured-article__img-link" tabindex="-1" aria-hidden="true">
							<img
								class="bi-featured-article__img"
								src="<?php echo esc_url( $thumb_url ); ?>"
								alt="<?php echo esc_attr( $title ); ?>"
								loading="eager"
								fetchpriority="high"
							/>
							<div class="bi-featured-article__badge-overlay">
								<span class="bi-featured-article__badge"><?php esc_html_e( 'FEATURED PERSPECTIVE', 'astra-child' ); ?></span>
							</div>
						</a>
					</div>

					<!-- Content Column -->
					<div class="bi-featured-article__content">
						<div class="bi-featured-article__meta-top">
							<span class="bi-article-pill"><?php echo esc_html( $cat_name ); ?></span>
							<span class="bi-featured-article__read-time">
								<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
									<circle cx="8" cy="8" r="6.5"/>
									<polyline points="8,4 8,8 10.5,9.5"/>
								</svg>
								<?php echo esc_html( $read_time ); ?>
							</span>
						</div>

						<h2 class="bi-featured-article__title">
							<a href="<?php echo esc_url( $permalink ); ?>" class="bi-featured-article__title-link">
								<?php echo esc_html( $title ); ?>
							</a>
						</h2>

						<div class="bi-featured-article__excerpt">
							<?php the_excerpt(); ?>
						</div>

						<div class="bi-featured-article__footer">
							<span class="bi-featured-article__date">
								<?php echo esc_html( $date ); ?>
							</span>

							<a href="<?php echo esc_url( $permalink ); ?>" class="bi-cta bi-cta--blue bi-featured-article__cta">
								<span><?php esc_html_e( 'READ ARTICLE', 'astra-child' ); ?></span>
								<span class="bi-cta__icon" aria-hidden="true">
									<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
							</a>
						</div>
					</div>
				</div>

			</div>
		</section>
		<?php
	endwhile;
	wp_reset_postdata();
endif;
