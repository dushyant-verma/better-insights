<?php
/**
 * Better Insights - Single Service Page: Service Capabilities Cards
 * Section: Premium 3-Column Rectangular Card Layout
 * Structure: Top image (with dark blend gradient) + Dark navy content base
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$post_id     = get_the_ID();
$slug        = get_post_field( 'post_name', $post_id );
$upload_dir  = wp_upload_dir();
$upload_base = rtrim( $upload_dir['baseurl'], '/' );

// 1. Dynamic Section Header
$custom_eyebrow = get_post_meta( $post_id, 'bi_cards_eyebrow', true );
$eyebrow        = ! empty( $custom_eyebrow ) ? $custom_eyebrow : __( 'WHAT WE DO', 'astra-child' );

$custom_heading = get_post_meta( $post_id, 'bi_cards_heading', true );
$heading        = ! empty( $custom_heading ) ? $custom_heading : __( 'CAPABILITIES THAT MOVE YOU FORWARD.', 'astra-child' );

// 2. Service Presets for 3 Capabilities Cards
$cards_presets = array(
	'ai-solutions' => array(
		array(
			'title' => __( 'Cognitive AI Agents & Copilots', 'astra-child' ),
			'desc'  => __( 'Deploy autonomous agents trained on proprietary enterprise knowledge to automate complex workflows and assist internal teams in real time.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Technology-That-Moves-Business-Forward.webp',
			'alt'   => __( 'Cognitive AI agents and autonomous workflows architecture', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Intelligent Document & Data Pipelines', 'astra-child' ),
			'desc'  => __( 'Transform unstructured contracts, emails, and PDFs into structured, actionable business intelligence with automated NLP extraction.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
			'alt'   => __( 'Intelligent data pipelines and automated document processing', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Predictive Decision & Optimization Models', 'astra-child' ),
			'desc'  => __( 'Leverage predictive machine learning models to forecast demand, optimize resource allocation, and drive proactive business decisions.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Predictive analytics and business intelligence visualization', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
	'ai-automation' => array(
		array(
			'title' => __( 'Autonomous Process Engineering', 'astra-child' ),
			'desc'  => __( 'Eliminate high-frequency operational bottlenecks by designing resilient automation sequences that execute with speed and precision.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/AI-AUTOMATION.webp',
			'alt'   => __( 'Autonomous process engineering and automation sequences', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'AI Agent Orchestration', 'astra-child' ),
			'desc'  => __( 'Coordinate multi-agent workflows that collaborate across tools, databases, and APIs to resolve complex multi-step tasks independently.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/INTELLIGENT-BY-DESIGN.webp',
			'alt'   => __( 'Multi-agent orchestration and intelligent task resolution', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Continuous Performance Auditing', 'astra-child' ),
			'desc'  => __( 'Monitor automated routines with built-in observability, anomaly detection, and human-in-the-loop oversight to ensure zero downtime.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Intelligent-Automation-for-Modern-Business.webp',
			'alt'   => __( 'Continuous performance monitoring and automation observability', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
	'digital-transformation' => array(
		array(
			'title' => __( 'Digital Strategy & Architecture', 'astra-child' ),
			'desc'  => __( 'Formulate clear transformation roadmaps that align leadership, technology stacks, and operational teams toward measurable business growth.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Connecting-Technology-People-and-Process.webp',
			'alt'   => __( 'Enterprise digital strategy and technological roadmap', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Modern Cloud & Platform Modernization', 'astra-child' ),
			'desc'  => __( 'Deconstruct monolithic legacy applications into agile, cloud-native services designed for elasticity, resilience, and fast deployment.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/DIGITAL-TRANSFORMATION.webp',
			'alt'   => __( 'Cloud native modernization and platform engineering', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Change Enablement & Digital Culture', 'astra-child' ),
			'desc'  => __( 'Empower teams with the tools, training, and operational frameworks needed to adopt modern technologies and sustain long-term velocity.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BETTER-TOGETHER.webp',
			'alt'   => __( 'Collaborative change enablement and cross-functional teams', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
	'technology-engineering' => array(
		array(
			'title' => __( 'Digital Product Engineering', 'astra-child' ),
			'desc'  => __( 'From concept to launch and beyond. Build high-performing digital products that evolve seamlessly with your business and user demands.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Digital-Experiences-Built-to-Perform.webp',
			'alt'   => __( 'High-performance digital product engineering', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'UX & Experience Engineering', 'astra-child' ),
			'desc'  => __( 'Create intuitive, accessible, friction-free digital experiences that customers love to use, engineered for speed and conversion.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
			'alt'   => __( 'Modern UX architecture and frontend engineering', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Software & Platform Engineering', 'astra-child' ),
			'desc'  => __( 'Build scalable, reliable platforms designed for enterprise security, high concurrency, and uninterrupted business performance.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/MANAGED-TECHNOLOGY.webp',
			'alt'   => __( 'Enterprise software engineering and scalable backend platforms', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
	'crm-integrations' => array(
		array(
			'title' => __( 'Enterprise CRM Implementation', 'astra-child' ),
			'desc'  => __( 'Configure and customize enterprise CRM platforms around your exact sales, service, and marketing pipelines to eliminate operational drag.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
			'alt'   => __( 'Enterprise CRM implementation and pipeline architecture', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Bidirectional Data Sync', 'astra-child' ),
			'desc'  => __( 'Keep critical commercial records synchronized in real-time across your billing, support, and marketing tools with zero duplication.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
			'alt'   => __( 'Bidirectional customer data synchronization and integration', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Custom API & Webhook Infrastructure', 'astra-child' ),
			'desc'  => __( 'Engineer robust API middleware that bridges third-party platforms with your internal databases reliably, securely, and at high speed.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Custom API infrastructure and webhook middleware', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
	'digital-growth' => array(
		array(
			'title' => __( 'Conversion Funnel Optimization', 'astra-child' ),
			'desc'  => __( 'Pinpoint friction across the user journey and implement continuous testing to maximize lead conversion and customer acquisition.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/DIGITAL-GROWTH.webp',
			'alt'   => __( 'Conversion rate optimization and growth funnel analysis', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Data-Driven Performance Marketing', 'astra-child' ),
			'desc'  => __( 'Deploy high-ROI paid media and organic strategies backed by statistical attribution models that tie every dollar directly to revenue.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Data-driven performance marketing campaigns', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
		array(
			'title' => __( 'Lifecycle & Retention Strategy', 'astra-child' ),
			'desc'  => __( 'Cultivate long-term customer value with automated nurture sequences, predictive churn prevention, and personalized re-engagement.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BETTER-TOGETHER.webp',
			'alt'   => __( 'Customer lifecycle and retention marketing strategy', 'astra-child' ),
			'link'  => home_url( '/contact/' ),
		),
	),
);

// Map preset or fallback
$slug_map = array(
	'website-development'   => 'technology-engineering',
	'web-development'       => 'technology-engineering',
	'wordpress-development' => 'technology-engineering',
	'woocommerce'           => 'technology-engineering',
	'crm-development'       => 'crm-integrations',
	'what-we-do'            => 'digital-transformation',
);
$resolved_slug = isset( $slug_map[ $slug ] ) ? $slug_map[ $slug ] : $slug;
$preset = isset( $cards_presets[ $resolved_slug ] ) ? $cards_presets[ $resolved_slug ] : $cards_presets['ai-solutions'];

// Build cards data with custom field override support
$cards = array();
for ( $i = 1; $i <= 3; $i++ ) {
	$idx    = $i - 1;
	$c_title = get_post_meta( $post_id, "bi_card_{$i}_title", true );
	$c_desc  = get_post_meta( $post_id, "bi_card_{$i}_desc", true );
	$c_img   = get_post_meta( $post_id, "bi_card_{$i}_img", true );
	$c_alt   = get_post_meta( $post_id, "bi_card_{$i}_alt", true );
	$c_link  = get_post_meta( $post_id, "bi_card_{$i}_link", true );

	$cards[] = array(
		'title' => ! empty( $c_title ) ? $c_title : $preset[ $idx ]['title'],
		'desc'  => ! empty( $c_desc ) ? $c_desc : $preset[ $idx ]['desc'],
		'img'   => ! empty( $c_img ) ? $c_img : $preset[ $idx ]['img'],
		'alt'   => ! empty( $c_alt ) ? $c_alt : $preset[ $idx ]['alt'],
		'link'  => ( '' !== $c_link && false !== $c_link ) ? $c_link : $preset[ $idx ]['link'],
	);
}
?>

<section class="bi-service-cards-section" aria-label="<?php esc_attr_e( 'Service Capabilities Cards', 'astra-child' ); ?>">
	<div class="bi-service-cards-container">

		<!-- Section Introduction Header -->
		<header class="bi-service-cards-header">
			<span class="bi-service-cards-eyebrow"><?php echo esc_html( $eyebrow ); ?></span>
			<h2 class="bi-service-cards-heading"><?php echo esc_html( $heading ); ?></h2>
		</header>

		<!-- 3-Column Rectangular Cards Grid -->
		<div class="bi-service-cards-grid">
			<?php foreach ( $cards as $card ) : ?>
				<article class="bi-cap-card">

					<!-- Top Image Area with Bottom Blend Gradient -->
					<div class="bi-cap-card__visual">
						<img
							class="bi-cap-card__img"
							src="<?php echo esc_url( $card['img'] ); ?>"
							alt="<?php echo esc_attr( $card['alt'] ); ?>"
							loading="lazy"
						/>
						<div class="bi-cap-card__gradient" aria-hidden="true"></div>
					</div>

					<!-- Dark Navy/Black Content Area -->
					<div class="bi-cap-card__body">
						<div class="bi-cap-card__text-wrap">
							<h3 class="bi-cap-card__title"><?php echo esc_html( $card['title'] ); ?></h3>
							<p class="bi-cap-card__desc"><?php echo esc_html( $card['desc'] ); ?></p>
						</div>

						<?php if ( ! empty( $card['link'] ) ) : ?>
							<div class="bi-cap-card__action">
								<a
									href="<?php echo esc_url( $card['link'] ); ?>"
									class="bi-cap-card__link"
									aria-label="<?php echo esc_attr( sprintf( __( 'Learn more about %s', 'astra-child' ), $card['title'] ) ); ?>"
								>
									<span class="bi-cap-card__link-icon" aria-hidden="true">
										<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</span>
								</a>
							</div>
						<?php endif; ?>
					</div>

				</article>
			<?php endforeach; ?>
		</div>

	</div>
</section>
