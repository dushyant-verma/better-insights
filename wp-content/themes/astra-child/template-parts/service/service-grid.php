<?php
/**
 * Better Insights - Single Service Page: 2x2 Alternating Image & Content Grid
 * Section: Reusable Alternating Editorial Quad Grid
 * Reference: Clean 2x2 alternating quadrant layout (Text, Image / Image, Text)
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

// Service-specific curated copy and image pairs
$service_presets = array(
	'ai-solutions' => array(
		'q1_heading'   => __( 'INTELLIGENT AGENTS & WORKFLOW AUTOMATION', 'astra-child' ),
		'q1_desc'      => __( 'We engineer autonomous AI agents and automated workflows that eliminate operational bottlenecks, streamline manual processes, and enable enterprise teams to focus on high-impact strategic execution.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/Intelligent-Automation-for-Modern-Business.webp',
		'q2_alt'       => __( 'Intelligent automation systems and enterprise AI workflows', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/INTELLIGENT-BY-DESIGN.webp',
		'q3_alt'       => __( 'Connected enterprise platform architecture and intelligent software design', 'astra-child' ),
		'q4_heading'   => __( 'ENTERPRISE AI STRATEGY & SECURE INTEGRATION', 'astra-child' ),
		'q4_desc'      => __( 'Integrate advanced machine learning models and secure private knowledge bases into your existing business stack with enterprise compliance, data privacy, and measurable ROI benchmarks.', 'astra-child' ),
		'q4_link_text' => __( 'START A CONVERSATION ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
	'ai-automation' => array(
		'q1_heading'   => __( 'AUTONOMOUS WORKFLOWS & INTELLIGENT AGENTS', 'astra-child' ),
		'q1_desc'      => __( 'Transform time-consuming operational tasks into automated, intelligent routines that operate with precision, reduce error rates, and scale effortlessly with your organization.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/AI-AUTOMATION.webp',
		'q2_alt'       => __( 'AI automation infrastructure and digital agent systems', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
		'q3_alt'       => __( 'Connected enterprise systems and automated data flow', 'astra-child' ),
		'q4_heading'   => __( 'SYSTEM INTEROPERABILITY & SMART INTEGRATION', 'astra-child' ),
		'q4_desc'      => __( 'Connect legacy tools with modern cognitive services to create unified, intelligent pipelines that adapt to shifting business demands and customer interactions.', 'astra-child' ),
		'q4_link_text' => __( 'START A CONVERSATION ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
	'digital-transformation' => array(
		'q1_heading'   => __( 'MODERNIZE PROCESSES WITH DIGITAL CLARITY', 'astra-child' ),
		'q1_desc'      => __( 'Turn structural complexity into an agile technological advantage by aligning people, processes, and modern platform architectures around clear commercial objectives.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/Connecting-Technology-People-and-Process.webp',
		'q2_alt'       => __( 'Connecting technology, people, and modern enterprise processes', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/DIGITAL-TRANSFORMATION.webp',
		'q3_alt'       => __( 'Scalable digital transformation architecture and technology consulting', 'astra-child' ),
		'q4_heading'   => __( 'BUILD RESILIENT ENTERPRISE FOUNDATIONS', 'astra-child' ),
		'q4_desc'      => __( 'Migrate legacy friction into modern digital platforms that improve operational velocity, foster continuous innovation, and future-proof organizational agility.', 'astra-child' ),
		'q4_link_text' => __( 'START A CONVERSATION ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
	'technology-engineering' => array(
		'q1_heading'   => __( 'RESILIENT DIGITAL PRODUCT ENGINEERING', 'astra-child' ),
		'q1_desc'      => __( 'Architect and build robust digital products that handle enterprise-grade load, ensure continuous security, and deliver flawless user interactions at scale.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/Digital-Experiences-Built-to-Perform.webp',
		'q2_alt'       => __( 'High-performance digital products and scalable engineering architecture', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
		'q3_alt'       => __( 'Modern software engineering and scalable technology stack', 'astra-child' ),
		'q4_heading'   => __( 'SCALABLE CLOUD & API PLATFORMS', 'astra-child' ),
		'q4_desc'      => __( 'Engineer maintainable, high-throughput backend services and modern component-driven architectures that empower rapid product iteration and reliable performance.', 'astra-child' ),
		'q4_link_text' => __( 'START A CONVERSATION ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
	'crm-integrations' => array(
		'q1_heading'   => __( 'UNIFY CUSTOMER DATA ACROSS THE ENTERPRISE', 'astra-child' ),
		'q1_desc'      => __( 'Break down departmental data silos by connecting CRM, marketing automation, and sales systems into a synchronized, real-time single source of truth.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
		'q2_alt'       => __( 'Connected customer relationship management and automated data sync', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
		'q3_alt'       => __( 'CRM integration architecture and enterprise customer platform', 'astra-child' ),
		'q4_heading'   => __( 'SEAMLESS API & PIPELINE AUTOMATION', 'astra-child' ),
		'q4_desc'      => __( 'Implement custom webhook pipelines, bidirectional sync routines, and robust error-recovery protocols that keep your critical commercial data accurate 24/7.', 'astra-child' ),
		'q4_link_text' => __( 'START A CONVERSATION ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
	'digital-growth' => array(
		'q1_heading'   => __( 'OPTIMIZE THE FULL FUNNEL WITH ADVANCED ANALYTICS', 'astra-child' ),
		'q1_desc'      => __( 'We help businesses turn marketing data into actionable insights, improve campaign performance, and make informed decisions across the customer journey.', 'astra-child' ),
		'q1_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q1_link_url'  => home_url( '/contact/' ),
		'q2_img'       => $upload_base . '/2026/10/DIGITAL-GROWTH.webp',
		'q2_alt'       => __( 'Digital growth analytics and customer conversion insights', 'astra-child' ),
		'q3_img'       => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
		'q3_alt'       => __( 'Performance marketing and measurable customer impact', 'astra-child' ),
		'q4_heading'   => __( 'TURN CUSTOMER DATA INTO BETTER DECISIONS', 'astra-child' ),
		'q4_desc'      => __( 'Connect customer insights, marketing performance, and business objectives to identify opportunities for stronger engagement and sustainable growth.', 'astra-child' ),
		'q4_link_text' => __( 'EXPLORE OUR APPROACH ↗', 'astra-child' ),
		'q4_link_url'  => home_url( '/contact/' ),
	),
);

// Map slug or fallback to active preset
$slug_map = array(
	'website-development'   => 'technology-engineering',
	'web-development'       => 'technology-engineering',
	'wordpress-development' => 'technology-engineering',
	'woocommerce'           => 'technology-engineering',
	'crm-development'       => 'crm-integrations',
	'what-we-do'            => 'digital-transformation',
);
$resolved_slug = isset( $slug_map[ $slug ] ) ? $slug_map[ $slug ] : $slug;
$preset = isset( $service_presets[ $resolved_slug ] ) ? $service_presets[ $resolved_slug ] : $service_presets['ai-solutions'];

// Dynamic custom field overrides per quadrant
$q1_heading   = get_post_meta( $post_id, 'bi_quad_1_heading', true );
$q1_heading   = ! empty( $q1_heading ) ? $q1_heading : $preset['q1_heading'];
$q1_desc      = get_post_meta( $post_id, 'bi_quad_1_desc', true );
$q1_desc      = ! empty( $q1_desc ) ? $q1_desc : $preset['q1_desc'];
$q1_link_text = get_post_meta( $post_id, 'bi_quad_1_link_text', true );
$q1_link_text = ! empty( $q1_link_text ) ? $q1_link_text : $preset['q1_link_text'];
$q1_link_url  = get_post_meta( $post_id, 'bi_quad_1_link_url', true );
$q1_link_url  = ! empty( $q1_link_url ) ? $q1_link_url : $preset['q1_link_url'];

$q2_img = get_post_meta( $post_id, 'bi_quad_2_img', true );
$q2_img = ! empty( $q2_img ) ? $q2_img : $preset['q2_img'];
$q2_alt = get_post_meta( $post_id, 'bi_quad_2_alt', true );
$q2_alt = ! empty( $q2_alt ) ? $q2_alt : $preset['q2_alt'];

$q3_img = get_post_meta( $post_id, 'bi_quad_3_img', true );
$q3_img = ! empty( $q3_img ) ? $q3_img : $preset['q3_img'];
$q3_alt = get_post_meta( $post_id, 'bi_quad_3_alt', true );
$q3_alt = ! empty( $q3_alt ) ? $q3_alt : $preset['q3_alt'];

$q4_heading   = get_post_meta( $post_id, 'bi_quad_4_heading', true );
$q4_heading   = ! empty( $q4_heading ) ? $q4_heading : $preset['q4_heading'];
$q4_desc      = get_post_meta( $post_id, 'bi_quad_4_desc', true );
$q4_desc      = ! empty( $q4_desc ) ? $q4_desc : $preset['q4_desc'];
$q4_link_text = get_post_meta( $post_id, 'bi_quad_4_link_text', true );
$q4_link_text = ! empty( $q4_link_text ) ? $q4_link_text : $preset['q4_link_text'];
$q4_link_url  = get_post_meta( $post_id, 'bi_quad_4_link_url', true );
$q4_link_url  = ! empty( $q4_link_url ) ? $q4_link_url : $preset['q4_link_url'];
?>

<section class="bi-service-quad-section" aria-label="<?php esc_attr_e( 'Service Capabilities and Solutions', 'astra-child' ); ?>">
	<div class="bi-service-quad-container">

		<!-- 2x2 Alternating Grid (Q1: Text, Q2: Image / Q3: Image, Q4: Text) -->
		<div class="bi-service-quad-grid">

			<!-- Quadrant 1: Top-Left (Text) -->
			<div class="bi-quad bi-quad--text bi-quad--q1">
				<div class="bi-quad__inner">
					<h3 class="bi-quad__heading"><?php echo esc_html( $q1_heading ); ?></h3>
					<p class="bi-quad__desc"><?php echo esc_html( $q1_desc ); ?></p>
					<?php if ( ! empty( $q1_link_text ) && ! empty( $q1_link_url ) ) : ?>
						<a href="<?php echo esc_url( $q1_link_url ); ?>" class="bi-quad__link">
							<span><?php echo esc_html( $q1_link_text ); ?></span>
						</a>
					<?php endif; ?>
				</div>
			</div>

			<!-- Quadrant 2: Top-Right (Image) -->
			<div class="bi-quad bi-quad--image bi-quad--q2">
				<img
					class="bi-quad__img"
					src="<?php echo esc_url( $q2_img ); ?>"
					alt="<?php echo esc_attr( $q2_alt ); ?>"
					loading="lazy"
				/>
			</div>

			<!-- Quadrant 3: Bottom-Left (Image) -->
			<div class="bi-quad bi-quad--image bi-quad--q3">
				<img
					class="bi-quad__img"
					src="<?php echo esc_url( $q3_img ); ?>"
					alt="<?php echo esc_attr( $q3_alt ); ?>"
					loading="lazy"
				/>
			</div>

			<!-- Quadrant 4: Bottom-Right (Text) -->
			<div class="bi-quad bi-quad--text bi-quad--q4">
				<div class="bi-quad__inner">
					<h3 class="bi-quad__heading"><?php echo esc_html( $q4_heading ); ?></h3>
					<p class="bi-quad__desc"><?php echo esc_html( $q4_desc ); ?></p>
					<?php if ( ! empty( $q4_link_text ) && ! empty( $q4_link_url ) ) : ?>
						<a href="<?php echo esc_url( $q4_link_url ); ?>" class="bi-quad__link">
							<span><?php echo esc_html( $q4_link_text ); ?></span>
						</a>
					<?php endif; ?>
				</div>
			</div>

		</div>

	</div>
</section>
