<?php
/**
 * Homepage Template Part: Resource Center / More to Explore Section
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$upload_dir      = wp_upload_dir();
$upload_base_url = rtrim( $upload_dir['baseurl'], '/' );

$blog_card_images = array(
	$upload_base_url . '/2026/10/blog01.webp',
	$upload_base_url . '/2026/10/blog02.webp',
	$upload_base_url . '/2026/10/blog03.webp',
);

// Query published posts for dynamic homepage resource cards
$args = array(
	'post_type'      => 'post',
	'posts_per_page' => 3,
	'post_status'    => 'publish',
	'orderby'        => 'date',
	'order'          => 'DESC',
);

$query = new WP_Query( $args );
$posts_data = array();

if ( $query->have_posts() ) {
	$index = 0;
	while ( $query->have_posts() ) {
		$query->the_post();
		$post_id = get_the_ID();

		// Category label
		$categories = get_the_category( $post_id );
		$cat_name   = ! empty( $categories ) ? strtoupper( $categories[0]->name ) : __( 'INSIGHT', 'astra-child' );

		// Featured Image for the blog card
		$image_url = isset( $blog_card_images[ $index ] ) ? $blog_card_images[ $index ] : $blog_card_images[0];

		// Excerpt
		$excerpt = get_the_excerpt( $post_id );
		if ( empty( $excerpt ) ) {
			$excerpt = wp_trim_words( wp_strip_all_tags( get_the_content( null, false, $post_id ) ), 20, '...' );
		}

		$posts_data[] = array(
			'title'    => get_the_title( $post_id ),
			'link'     => get_permalink( $post_id ),
			'date'     => strtoupper( get_the_date( 'F j, Y', $post_id ) ),
			'category' => $cat_name,
			'excerpt'  => $excerpt,
			'image'    => $image_url,
		);

		$index++;
	}
	wp_reset_postdata();
}

// Fallback items if fewer than 3 posts are available in WP database
if ( count( $posts_data ) < 3 ) {
	$defaults = array(
		array(
			'title'    => __( 'The Future of Enterprise AI: Beyond Automation to Intelligent Workflows', 'astra-child' ),
			'link'     => home_url( '/insights/future-of-enterprise-ai/' ),
			'date'     => __( 'OCTOBER 6, 2026', 'astra-child' ),
			'category' => __( 'AI & AUTOMATION', 'astra-child' ),
			'excerpt'  => __( 'Discover how modern enterprises are integrating custom AI models and automated workflows to accelerate decision-making and eliminate operational friction.', 'astra-child' ),
			'image'    => $blog_card_images[0],
		),
		array(
			'title'    => __( 'Architecting Modern Digital Experiences for Measurable Growth', 'astra-child' ),
			'link'     => home_url( '/insights/digital-experiences-growth/' ),
			'date'     => __( 'OCTOBER 3, 2026', 'astra-child' ),
			'category' => __( 'DIGITAL GROWTH', 'astra-child' ),
			'excerpt'  => __( 'How aligning design systems, user experience strategy, and scalable technology infrastructure drives higher conversion and audience retention.', 'astra-child' ),
			'image'    => $blog_card_images[1],
		),
		array(
			'title'    => __( 'Building Scalable Cloud Infrastructure for Modern Applications', 'astra-child' ),
			'link'     => home_url( '/insights/scalable-cloud-infrastructure/' ),
			'date'     => __( 'SEPTEMBER 28, 2026', 'astra-child' ),
			'category' => __( 'TECHNOLOGY & ENGINEERING', 'astra-child' ),
			'excerpt'  => __( 'Key architectural principles for engineering resilient, cloud-native platforms that move business forward without sacrificing performance.', 'astra-child' ),
			'image'    => $blog_card_images[2],
		),
	);

	// Fill remaining slots
	$count_existing = count( $posts_data );
	for ( $i = $count_existing; $i < 3; $i++ ) {
		$posts_data[] = $defaults[ $i - $count_existing ];
	}
}

// Ensure exact mapping for the 3 displayed cards
foreach ( $posts_data as $i => &$post_item ) {
	if ( isset( $blog_card_images[ $i ] ) ) {
		$post_item['image'] = $blog_card_images[ $i ];
	}
}
unset( $post_item );

// Archive Page Permalink
$archive_link = get_option( 'page_for_posts' ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/insights/' );
?>

<section class="bi-resource-section bi-theme--stone" data-theme="stone" aria-label="<?php esc_attr_e( 'Resource Center and Insights', 'astra-child' ); ?>">
	<div class="bi-resource-container bi-container">
		
		<!-- Section Centered Header Intro -->
		<div class="bi-resource-intro">
			<span class="bi-resource-intro__eyebrow"><?php esc_html_e( 'RESOURCE CENTER', 'astra-child' ); ?></span>
			<h2 class="bi-resource-intro__heading"><?php esc_html_e( 'More to explore', 'astra-child' ); ?></h2>
			<p class="bi-resource-intro__desc">
				<?php esc_html_e( 'Go further with connected insights, practical guidance, and expert perspective.', 'astra-child' ); ?>
			</p>
		</div>

		<!-- Blog / Resource Card Grid -->
		<div class="bi-resource-grid">
			<?php foreach ( $posts_data as $post_item ) : ?>
				<article class="bi-resource-card">
					<a href="<?php echo esc_url( $post_item['link'] ); ?>" class="bi-resource-card__link-wrapper" aria-label="<?php echo esc_attr( $post_item['title'] ); ?>">
						
						<!-- Top Image Area -->
						<div class="bi-resource-card__image-wrap">
							<img
								src="<?php echo esc_url( $post_item['image'] ); ?>"
								alt="<?php echo esc_attr( $post_item['title'] ); ?>"
								class="bi-resource-card__image"
								loading="lazy"
							>
						</div>

						<!-- Bottom Content Area -->
						<div class="bi-resource-card__content">
							<span class="bi-resource-card__category"><?php echo esc_html( $post_item['category'] ); ?></span>
							<h3 class="bi-resource-card__title"><?php echo esc_html( $post_item['title'] ); ?></h3>
							<span class="bi-resource-card__date"><?php echo esc_html( $post_item['date'] ); ?></span>
							<?php if ( ! empty( $post_item['excerpt'] ) ) : ?>
								<p class="bi-resource-card__excerpt"><?php echo esc_html( $post_item['excerpt'] ); ?></p>
							<?php endif; ?>
						</div>

					</a>
				</article>
			<?php endforeach; ?>
		</div>

		<!-- Centered Section CTA -->
		<div class="bi-resource-cta-wrap">
			<a href="<?php echo esc_url( $archive_link ); ?>" class="bi-resource-cta bi-cta bi-cta--blue">
				<span><?php esc_html_e( 'View All Insights', 'astra-child' ); ?></span>
				<span class="bi-cta__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<line x1="7" y1="17" x2="17" y2="7"></line>
						<polyline points="7 7 17 7 17 17"></polyline>
					</svg>
				</span>
			</a>
		</div>

	</div>
</section>
