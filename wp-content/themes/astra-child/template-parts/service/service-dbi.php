<?php
/**
 * Better Insights - Single Service Page: Editorial Image Panel Section (.dbi)
 * Reusable editorial 3-panel section inspired by modern technology editorial design.
 * Structure:
 *   A. Two-column introductory header (Large 2-line title with BI-blue accent + supporting text)
 *   B. Asymmetric 3-card desktop row (Card 1 featured ~54%, Cards 2 & 3 ~23% each)
 *   C. Left-aligned closing statement
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

// 1. Service Presets for Editorial Panels
$dbi_presets = array(
	'ai-solutions' => array(
		'heading_line1' => __( 'PEOPLE AND AI', 'astra-child' ),
		'heading_line2' => __( 'DELIVER MORE TOGETHER.', 'astra-child' ),
		'intro'         => __( 'We combine human expertise, creative thinking, and intelligent technology to help businesses solve complex challenges, accelerate delivery, and create measurable impact.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'AUGMENTED INTELLIGENCE AT SCALE', 'astra-child' ),
			'lead'  => __( 'Empowering enterprise teams with context-aware cognitive systems.', 'astra-child' ),
			'p1'    => __( 'Real transformation happens when artificial intelligence is woven seamlessly into everyday workflows, amplifying human judgment rather than replacing it.', 'astra-child' ),
			'p2'    => __( 'From predictive analytics to autonomous reasoning agents, our solutions deliver clear decision support, unprecedented speed, and sustained business agility.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Technology-That-Moves-Business-Forward.webp',
			'alt'   => __( 'Augmented intelligence and human-AI collaboration architecture', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'INTELLIGENT BY DESIGN', 'astra-child' ),
			'desc'  => __( 'Architected for precision, security, and adaptive performance across dynamic enterprise environments.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/INTELLIGENT-BY-DESIGN.webp',
			'alt'   => __( 'Intelligent system design and cognitive platform architecture', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'CONNECTED & AUTOMATED', 'astra-child' ),
			'desc'  => __( 'Bridging siloed data systems and operational touchpoints into unified, real-time value streams.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
			'alt'   => __( 'Connected enterprise data systems and automated value streams', 'astra-child' ),
		),
		'closing'       => __( 'Better outcomes happen when strategy, people, and technology work as one.', 'astra-child' ),
	),
	'ai-automation' => array(
		'heading_line1' => __( 'AUTOMATION & INGENUITY', 'astra-child' ),
		'heading_line2' => __( 'SCALE WORKFLOW VELOCITY.', 'astra-child' ),
		'intro'         => __( 'We engineer autonomous workflows that liberate teams from manual repetition, accelerate execution cycles, and drive measurable productivity gains.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'END-TO-END AUTONOMOUS WORKFLOWS', 'astra-child' ),
			'lead'  => __( 'Eliminating friction between enterprise systems and human decision-makers.', 'astra-child' ),
			'p1'    => __( 'Modern automation goes far beyond simple rule-based scripts. We design self-healing agent pipelines that anticipate task requirements and execute multi-step routines with precision.', 'astra-child' ),
			'p2'    => __( 'By synchronizing front-line operations with backend databases, our systems eliminate manual delays while preserving complete auditability and governance.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/AI-AUTOMATION.webp',
			'alt'   => __( 'Autonomous enterprise process engineering and workflow orchestration', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'CONTINUOUS ADAPTATION', 'astra-child' ),
			'desc'  => __( 'Autonomous routines that monitor variance, optimize performance, and adapt to shifting operational parameters in real time.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Intelligent-Automation-for-Modern-Business.webp',
			'alt'   => __( 'Continuous workflow optimization and automated intelligence', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'OPERATIONAL RESILIENCE', 'astra-child' ),
			'desc'  => __( 'Fault-tolerant architectures engineered to withstand spikes, prevent failures, and ensure zero operational interruption.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Resilient system infrastructure and enterprise reliability', 'astra-child' ),
		),
		'closing'       => __( 'Enduring operational velocity begins when automated precision meets strategic human oversight.', 'astra-child' ),
	),
	'digital-transformation' => array(
		'heading_line1' => __( 'VISION AND VELOCITY', 'astra-child' ),
		'heading_line2' => __( 'TRANSFORM WITH PURPOSE.', 'astra-child' ),
		'intro'         => __( 'Modernizing legacy infrastructure, empowering agile teams, and orchestrating digital ecosystems built for sustainable long-term competitive advantage.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'HOLISTIC ENTERPRISE MODERNIZATION', 'astra-child' ),
			'lead'  => __( 'Re-architecting technology stacks around customer centricity and operational agility.', 'astra-child' ),
			'p1'    => __( 'Digital transformation succeeds only when technology investments directly empower people and accelerate strategic initiatives.', 'astra-child' ),
			'p2'    => __( 'We guide organizations through legacy deconstruction, cloud modernization, and workflow redesign to establish platforms that scale effortlessly.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/DIGITAL-TRANSFORMATION.webp',
			'alt'   => __( 'Digital transformation roadmap and enterprise architecture modernization', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'UNIFIED ECOSYSTEMS', 'astra-child' ),
			'desc'  => __( 'Eliminating fragmentation by knitting disparate platforms into cohesive, frictionless digital operational environments.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Connecting-Technology-People-and-Process.webp',
			'alt'   => __( 'Unified digital ecosystems connecting technology, people, and process', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'CULTURAL VELOCITY', 'astra-child' ),
			'desc'  => __( 'Equipping internal teams with modern tooling, agile cadences, and continuous learning frameworks that endure.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BETTER-TOGETHER.webp',
			'alt'   => __( 'Cross-functional agile teams and collaborative digital culture', 'astra-child' ),
		),
		'closing'       => __( 'Sustainable digital evolution requires aligning technological capability with human potential.', 'astra-child' ),
	),
	'technology-engineering' => array(
		'heading_line1' => __( 'ENGINEERING EXCELLENCE', 'astra-child' ),
		'heading_line2' => __( 'BUILT FOR PEAK PERFORMANCE.', 'astra-child' ),
		'intro'         => __( 'We architect and build resilient digital products, scalable cloud platforms, and mission-critical software solutions tailored to ambitious business goals.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'MISSION-CRITICAL SOFTWARE PLATFORMS', 'astra-child' ),
			'lead'  => __( 'Architected for ultra-low latency, elastic scalability, and unyielding security.', 'astra-child' ),
			'p1'    => __( 'Enterprise software must be engineered to deliver flawless experiences under extreme concurrency while maintaining structural integrity over time.', 'astra-child' ),
			'p2'    => __( 'Our multidisciplinary engineering teams apply rigorous standards, modern CI/CD pipelines, and cloud-native practices to deliver code that stands the test of time.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
			'alt'   => __( 'Full-stack technology engineering and high-performance digital platforms', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'MANAGED EXCELLENCE', 'astra-child' ),
			'desc'  => __( 'Proactive observability, rigorous performance benchmarking, and zero-compromise architectural standards.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/MANAGED-TECHNOLOGY.webp',
			'alt'   => __( 'Managed technology infrastructure and enterprise platform oversight', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'EXPERIENCES THAT PERFORM', 'astra-child' ),
			'desc'  => __( 'Engineered with precision to ensure blazing fast interactions and high conversion across every user touchpoint.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/Digital-Experiences-Built-to-Perform.webp',
			'alt'   => __( 'Digital experiences engineered for speed and conversion performance', 'astra-child' ),
		),
		'closing'       => __( 'Superior technical architecture turns ambitious engineering roadmaps into market-defining realities.', 'astra-child' ),
	),
	'crm-integrations' => array(
		'heading_line1' => __( 'DATA AND CONNECTION', 'astra-child' ),
		'heading_line2' => __( 'ACCELERATE REVENUE PIPELINES.', 'astra-child' ),
		'intro'         => __( 'Synchronize commercial workflows, unify customer intelligence, and eliminate data silos with high-speed bidirectional integration architecture.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'UNIFIED COMMERCIAL INTELLIGENCE', 'astra-child' ),
			'lead'  => __( 'Eliminating friction between customer touchpoints and backend commercial systems.', 'astra-child' ),
			'p1'    => __( 'When customer data is scattered across fragmented tools, decision-making slows and customer relationships suffer.', 'astra-child' ),
			'p2'    => __( 'We architect robust bidirectional integrations that synchronize customer records in real time, giving your teams a single, accurate source of truth.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
			'alt'   => __( 'Enterprise CRM integration architecture and customer data pipelines', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'BIDIRECTIONAL SYNC', 'astra-child' ),
			'desc'  => __( 'Real-time synchronization across billing, support, and marketing tools with zero duplication or data loss.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
			'alt'   => __( 'Real-time bidirectional synchronization between enterprise systems', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'SCALABLE WEBHOOKS & APIS', 'astra-child' ),
			'desc'  => __( 'Fault-tolerant integration middleware engineered to handle millions of transactions securely and without latency.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Enterprise API middleware and webhook architecture', 'astra-child' ),
		),
		'closing'       => __( 'Seamless commercial connectivity transforms disconnected customer data into sustained revenue growth.', 'astra-child' ),
	),
	'digital-growth' => array(
		'heading_line1' => __( 'STRATEGY AND EXPERIMENTATION', 'astra-child' ),
		'heading_line2' => __( 'DRIVE MEASURABLE EXPANSION.', 'astra-child' ),
		'intro'         => __( 'We combine empirical data analysis, precision marketing, and iterative experimentation to expand your reach and maximize customer lifetime value.', 'astra-child' ),
		'card1'         => array(
			'title' => __( 'CONTINUOUS CONVERSION OPTIMIZATION', 'astra-child' ),
			'lead'  => __( 'Systematic, hypothesis-driven experimentation that unlocks sustainable revenue velocity.', 'astra-child' ),
			'p1'    => __( 'Growth is not a one-time campaign—it is an ongoing discipline of behavioral analysis, user experience testing, and conversion path refinement.', 'astra-child' ),
			'p2'    => __( 'We identify friction at every stage of the user journey, deploying targeted optimizations that elevate conversion rates and maximize return on customer acquisition.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/DIGITAL-GROWTH.webp',
			'alt'   => __( 'Digital growth optimization and conversion funnel engineering', 'astra-child' ),
		),
		'card2'         => array(
			'title' => __( 'DATA-DRIVEN MEDIA', 'astra-child' ),
			'desc'  => __( 'Precision acquisition campaigns guided by multi-touch attribution and real-time statistical modeling.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
			'alt'   => __( 'Data-driven media campaigns and statistical attribution modeling', 'astra-child' ),
		),
		'card3'         => array(
			'title' => __( 'LIFECYCLE RETENTION', 'astra-child' ),
			'desc'  => __( 'Automated re-engagement sequences and predictive churn prevention that nurture long-term customer loyalty.', 'astra-child' ),
			'img'   => $upload_base . '/2026/10/BETTER-TOGETHER.webp',
			'alt'   => __( 'Customer lifecycle retention and automated loyalty marketing', 'astra-child' ),
		),
		'closing'       => __( 'Predictable digital growth happens when rigorous experimentation meets deep customer insight.', 'astra-child' ),
	),
);

// Map preset or default
$slug_map = array(
	'website-development'   => 'technology-engineering',
	'web-development'       => 'technology-engineering',
	'wordpress-development' => 'technology-engineering',
	'woocommerce'           => 'technology-engineering',
	'crm-development'       => 'crm-integrations',
	'what-we-do'            => 'digital-transformation',
);
$resolved_slug = isset( $slug_map[ $slug ] ) ? $slug_map[ $slug ] : $slug;
$preset = isset( $dbi_presets[ $resolved_slug ] ) ? $dbi_presets[ $resolved_slug ] : $dbi_presets['ai-solutions'];

// 2. Resolve Dynamic Header Copy with Custom Field Overrides
$c_hl1 = get_post_meta( $post_id, 'bi_dbi_heading_line1', true );
$c_hl2 = get_post_meta( $post_id, 'bi_dbi_heading_line2', true );
$c_intro = get_post_meta( $post_id, 'bi_dbi_intro', true );
$c_closing = get_post_meta( $post_id, 'bi_dbi_closing', true );

$heading_line1 = ! empty( $c_hl1 ) ? $c_hl1 : $preset['heading_line1'];
$heading_line2 = ! empty( $c_hl2 ) ? $c_hl2 : $preset['heading_line2'];
$intro         = ! empty( $c_intro ) ? $c_intro : $preset['intro'];
$closing       = ! empty( $c_closing ) ? $c_closing : $preset['closing'];

// 3. Resolve Card 1 (Wide Featured Panel) Data
$c1_title = get_post_meta( $post_id, 'bi_dbi_card1_title', true );
$c1_lead  = get_post_meta( $post_id, 'bi_dbi_card1_lead', true );
$c1_p1    = get_post_meta( $post_id, 'bi_dbi_card1_p1', true );
$c1_p2    = get_post_meta( $post_id, 'bi_dbi_card1_p2', true );
$c1_img   = get_post_meta( $post_id, 'bi_dbi_card1_img', true );
$c1_alt   = get_post_meta( $post_id, 'bi_dbi_card1_alt', true );

$card1 = array(
	'title' => ! empty( $c1_title ) ? $c1_title : $preset['card1']['title'],
	'lead'  => ! empty( $c1_lead ) ? $c1_lead : $preset['card1']['lead'],
	'p1'    => ! empty( $c1_p1 ) ? $c1_p1 : $preset['card1']['p1'],
	'p2'    => ! empty( $c1_p2 ) ? $c1_p2 : $preset['card1']['p2'],
	'img'   => ! empty( $c1_img ) ? $c1_img : $preset['card1']['img'],
	'alt'   => ! empty( $c1_alt ) ? $c1_alt : $preset['card1']['alt'],
);

// 4. Resolve Card 2 (Narrow Panel) Data
$c2_title = get_post_meta( $post_id, 'bi_dbi_card2_title', true );
$c2_desc  = get_post_meta( $post_id, 'bi_dbi_card2_desc', true );
$c2_img   = get_post_meta( $post_id, 'bi_dbi_card2_img', true );
$c2_alt   = get_post_meta( $post_id, 'bi_dbi_card2_alt', true );

$card2 = array(
	'title' => ! empty( $c2_title ) ? $c2_title : $preset['card2']['title'],
	'desc'  => ( '' !== $c2_desc && false !== $c2_desc ) ? $c2_desc : $preset['card2']['desc'],
	'img'   => ! empty( $c2_img ) ? $c2_img : $preset['card2']['img'],
	'alt'   => ! empty( $c2_alt ) ? $c2_alt : $preset['card2']['alt'],
);

// 5. Resolve Card 3 (Narrow Panel) Data
$c3_title = get_post_meta( $post_id, 'bi_dbi_card3_title', true );
$c3_desc  = get_post_meta( $post_id, 'bi_dbi_card3_desc', true );
$c3_img   = get_post_meta( $post_id, 'bi_dbi_card3_img', true );
$c3_alt   = get_post_meta( $post_id, 'bi_dbi_card3_alt', true );

$card3 = array(
	'title' => ! empty( $c3_title ) ? $c3_title : $preset['card3']['title'],
	'desc'  => ( '' !== $c3_desc && false !== $c3_desc ) ? $c3_desc : $preset['card3']['desc'],
	'img'   => ! empty( $c3_img ) ? $c3_img : $preset['card3']['img'],
	'alt'   => ! empty( $c3_alt ) ? $c3_alt : $preset['card3']['alt'],
);
?>

<section class="bi-dbi-section" aria-label="<?php echo esc_attr( $heading_line1 . ' ' . $heading_line2 ); ?>">
	<div class="bi-dbi-container">

		<!-- A. Introductory Header Row (2-column on desktop) -->
		<header class="bi-dbi-header">
			<div class="bi-dbi-header__left">
				<h2 class="bi-dbi-heading">
					<span class="bi-dbi-heading__line1"><?php echo esc_html( $heading_line1 ); ?></span>
					<span class="bi-dbi-heading__line2"><?php echo esc_html( $heading_line2 ); ?></span>
				</h2>
			</div>
			<div class="bi-dbi-header__right">
				<p class="bi-dbi-intro"><?php echo esc_html( $intro ); ?></p>
			</div>
		</header>

		<!-- B. Three Image-Led Panels (Asymmetric desktop layout) -->
		<div class="bi-dbi-grid">

			<!-- Card 1: Featured Wide Panel (~54% width) -->
			<article class="bi-dbi-card bi-dbi-card--featured" tabindex="0">
				<div class="bi-dbi-card__media">
					<img
						class="bi-dbi-card__img"
						src="<?php echo esc_url( $card1['img'] ); ?>"
						alt="<?php echo esc_attr( $card1['alt'] ); ?>"
						loading="lazy"
					/>
					<div class="bi-dbi-card__overlay" aria-hidden="true"></div>
				</div>
				<div class="bi-dbi-card__content">
					<h3 class="bi-dbi-card__title"><?php echo esc_html( $card1['title'] ); ?></h3>
					<?php if ( ! empty( $card1['lead'] ) ) : ?>
						<p class="bi-dbi-card__lead"><?php echo esc_html( $card1['lead'] ); ?></p>
					<?php endif; ?>
					<div class="bi-dbi-card__body">
						<?php if ( ! empty( $card1['p1'] ) ) : ?>
							<p><?php echo esc_html( $card1['p1'] ); ?></p>
						<?php endif; ?>
						<?php if ( ! empty( $card1['p2'] ) ) : ?>
							<p><?php echo esc_html( $card1['p2'] ); ?></p>
						<?php endif; ?>
					</div>
				</div>
			</article>

			<!-- Card 2: Narrow Panel (~23% width) -->
			<article class="bi-dbi-card bi-dbi-card--narrow" tabindex="0">
				<div class="bi-dbi-card__media">
					<img
						class="bi-dbi-card__img"
						src="<?php echo esc_url( $card2['img'] ); ?>"
						alt="<?php echo esc_attr( $card2['alt'] ); ?>"
						loading="lazy"
					/>
					<div class="bi-dbi-card__overlay" aria-hidden="true"></div>
				</div>
				<div class="bi-dbi-card__content">
					<h3 class="bi-dbi-card__title"><?php echo esc_html( $card2['title'] ); ?></h3>
					<?php if ( ! empty( $card2['desc'] ) ) : ?>
						<p class="bi-dbi-card__desc"><?php echo esc_html( $card2['desc'] ); ?></p>
					<?php endif; ?>
				</div>
			</article>

			<!-- Card 3: Narrow Panel (~23% width) -->
			<article class="bi-dbi-card bi-dbi-card--narrow" tabindex="0">
				<div class="bi-dbi-card__media">
					<img
						class="bi-dbi-card__img"
						src="<?php echo esc_url( $card3['img'] ); ?>"
						alt="<?php echo esc_attr( $card3['alt'] ); ?>"
						loading="lazy"
					/>
					<div class="bi-dbi-card__overlay" aria-hidden="true"></div>
				</div>
				<div class="bi-dbi-card__content">
					<h3 class="bi-dbi-card__title"><?php echo esc_html( $card3['title'] ); ?></h3>
					<?php if ( ! empty( $card3['desc'] ) ) : ?>
						<p class="bi-dbi-card__desc"><?php echo esc_html( $card3['desc'] ); ?></p>
					<?php endif; ?>
				</div>
			</article>

		</div>

		<!-- C. Closing Statement -->
		<?php if ( ! empty( $closing ) ) : ?>
			<div class="bi-dbi-closing">
				<p class="bi-dbi-closing__text"><?php echo esc_html( $closing ); ?></p>
			</div>
		<?php endif; ?>

	</div>
</section>
