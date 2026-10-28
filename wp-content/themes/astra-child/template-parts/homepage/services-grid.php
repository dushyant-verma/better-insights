<?php
/**
 * Homepage Template Part: Premium Services Grid Section
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$services = array(
	array(
		'number'      => '01',
		'id'          => 'ai-automation',
		'title'       => __( 'AI & Automation', 'astra-child' ),
		'description' => __( 'Build intelligent workflows, AI agents and automation systems that reduce repetitive work and help your teams operate more efficiently.', 'astra-child' ),
		'cta'         => __( 'Explore AI & Automation', 'astra-child' ),
		'link'        => home_url( '/services/ai-automation/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-ai" aria-hidden="true"><g class="bi-icon-core"><path d="M28 22C22.4772 22 18 26.4772 18 32C18 34.75 19.1 37.25 20.9 39C19.1 40.75 18 43.25 18 46C18 51.5228 22.4772 56 28 56C29.4 56 30.7 55.7 31.9 55.1C33.8 58.5 37.6 60.8 42 60.8C47.6 60.8 52.2 56.8 53.1 51.4C55.1 51.9 57.2 51.1 58.7 49.6C60.7 47.6 61.5 44.7 60.9 42.1C63.2 39.7 63.8 36.1 62.8 33C61.8 29.9 59.2 27.5 56 27.1C54.6 22.7 50.6 19.5 45.8 19.5C43.5 19.5 41.4 20.3 39.8 21.6C37.5 20.3 34.8 19.5 32 19.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><g class="bi-icon-lines"><line x1="28" y1="32" x2="45" y2="30" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3" class="bi-synapse-line-1"/><line x1="28" y1="32" x2="32" y2="46" stroke="#FFFFFF" stroke-width="2" class="bi-synapse-line-2"/><line x1="45" y1="30" x2="50" y2="44" stroke="#FFFFFF" stroke-width="2" class="bi-synapse-line-3"/><line x1="32" y1="46" x2="50" y2="44" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3" class="bi-synapse-line-4"/></g><g class="bi-icon-nodes"><circle cx="28" cy="32" r="4" fill="#FFFFFF" class="bi-node bi-node-1"/><circle cx="45" cy="30" r="4" fill="#FFFFFF" class="bi-node bi-node-2"/><circle cx="32" cy="46" r="4" fill="#FFFFFF" class="bi-node bi-node-3"/><circle cx="50" cy="44" r="4" fill="#FFFFFF" class="bi-node bi-node-4"/></g></svg>',
	),
	array(
		'number'      => '02',
		'id'          => 'digital-growth',
		'title'       => __( 'Digital Growth', 'astra-child' ),
		'description' => __( 'Create high-performing digital experiences, campaigns and growth systems designed to attract customers and accelerate business growth.', 'astra-child' ),
		'cta'         => __( 'Explore Digital Growth', 'astra-child' ),
		'link'        => home_url( '/services/digital-growth/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-growth" aria-hidden="true"><g class="bi-icon-core"><path d="M16 64H64M16 64V16" stroke="rgba(255,255,255,0.35)" stroke-width="2.5" stroke-linecap="round"/></g><g class="bi-icon-bars"><rect x="23" y="46" width="8" height="18" rx="2" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" stroke-width="2" class="bi-bar-1"/><rect x="36" y="36" width="8" height="28" rx="2" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" stroke-width="2" class="bi-bar-2"/><rect x="49" y="26" width="8" height="38" rx="2" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" stroke-width="2" class="bi-bar-3"/></g><g class="bi-icon-line"><path d="M21 52L36 36L49 28L63 14" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="bi-growth-line"/><path d="M52 14H63V25" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="bi-growth-head"/><circle cx="63" cy="14" r="4" fill="#FFFFFF" class="bi-growth-dot"/></g></svg>',
	),
	array(
		'number'      => '03',
		'id'          => 'crm-integrations',
		'title'       => __( 'CRM & Integrations', 'astra-child' ),
		'description' => __( 'Connect your CRM, marketing, sales and business platforms into one streamlined ecosystem with powerful integrations and automation.', 'astra-child' ),
		'cta'         => __( 'Explore CRM & Integrations', 'astra-child' ),
		'link'        => home_url( '/services/crm-integrations/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-crm" aria-hidden="true"><g class="bi-icon-center"><circle cx="40" cy="40" r="10" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2.5" class="bi-crm-center-dot"/><circle cx="40" cy="40" r="4" fill="#FFFFFF"/></g><g class="bi-icon-spokes"><line x1="24" y1="24" x2="33" y2="33" stroke="#FFFFFF" stroke-width="2.5" class="bi-spoke-1"/><line x1="56" y1="24" x2="47" y2="33" stroke="#FFFFFF" stroke-width="2.5" class="bi-spoke-2"/><line x1="24" y1="56" x2="33" y2="47" stroke="#FFFFFF" stroke-width="2.5" class="bi-spoke-3"/><line x1="56" y1="56" x2="47" y2="47" stroke="#FFFFFF" stroke-width="2.5" class="bi-spoke-4"/></g><g class="bi-icon-outer-nodes"><circle cx="20" cy="20" r="6" stroke="#FFFFFF" stroke-width="2.5" fill="#343B4C" class="bi-crm-outer-1"/><circle cx="60" cy="20" r="6" stroke="#FFFFFF" stroke-width="2.5" fill="#343B4C" class="bi-crm-outer-2"/><circle cx="20" cy="60" r="6" stroke="#FFFFFF" stroke-width="2.5" fill="#343B4C" class="bi-crm-outer-3"/><circle cx="60" cy="60" r="6" stroke="#FFFFFF" stroke-width="2.5" fill="#343B4C" class="bi-crm-outer-4"/></g></svg>',
	),
	array(
		'number'      => '04',
		'id'          => 'technology-engineering',
		'title'       => __( 'Technology & Engineering', 'astra-child' ),
		'description' => __( 'Build scalable digital products, platforms and custom technology that solve complex business challenges.', 'astra-child' ),
		'cta'         => __( 'Explore Technology & Engineering', 'astra-child' ),
		'link'        => home_url( '/services/technology-engineering/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-engineering" aria-hidden="true"><g class="bi-icon-bracket-left"><path d="M26 24L14 40L26 56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g><g class="bi-icon-bracket-right"><path d="M54 24L66 40L54 56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g><g class="bi-icon-circuit"><line x1="45" y1="18" x2="35" y2="62" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" class="bi-circuit-slash"/><circle cx="45" cy="18" r="4" fill="#FFFFFF" class="bi-circuit-node-top"/><circle cx="35" cy="62" r="4" fill="#FFFFFF" class="bi-circuit-node-bottom"/></g></svg>',
	),
	array(
		'number'      => '05',
		'id'          => 'digital-transformation',
		'title'       => __( 'Digital Transformation', 'astra-child' ),
		'description' => __( 'Modernize processes, platforms and customer experiences through practical digital transformation strategies.', 'astra-child' ),
		'cta'         => __( 'Explore Digital Transformation', 'astra-child' ),
		'link'        => home_url( '/services/digital-transformation/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-transformation" aria-hidden="true"><g class="bi-icon-layer-top"><path d="M40 12L62 23L40 34L18 23L40 12Z" stroke="#FFFFFF" stroke-width="2.5" fill="rgba(255,255,255,0.18)" stroke-linejoin="round"/></g><g class="bi-icon-layer-mid"><path d="M18 33L40 44L62 33" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><g class="bi-icon-layer-bottom"><path d="M18 43L40 54L62 43" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 53L40 64L62 53" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><line x1="40" y1="24" x2="40" y2="48" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 2" class="bi-trans-flow"/></svg>',
	),
	array(
		'number'      => '06',
		'id'          => 'ai-solutions',
		'title'       => __( 'AI Solutions', 'astra-child' ),
		'description' => __( 'Turn AI into practical business solutions with intelligent assistants, agents, content systems and AI-powered workflows.', 'astra-child' ),
		'cta'         => __( 'Explore AI Solutions', 'astra-child' ),
		'link'        => home_url( '/services/ai-solutions/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-ai-solutions" aria-hidden="true"><g class="bi-icon-rays"><line x1="40" y1="12" x2="40" y2="68" stroke="rgba(255,255,255,0.2)" stroke-width="2"/><line x1="12" y1="40" x2="68" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="2"/><line x1="20" y1="20" x2="60" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="2"/><line x1="60" y1="20" x2="20" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="2"/></g><g class="bi-icon-center-spark"><path d="M40 18L44.5 33.5L60 38L44.5 42.5L40 58L35.5 42.5L20 38L35.5 33.5L40 18Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" class="bi-ai-spark-path"/><circle cx="40" cy="38" r="5" fill="#FFFFFF"/></g></svg>',
	),
	array(
		'number'      => '07',
		'id'          => 'web-digital-experience',
		'title'       => __( 'Web & Digital Experience', 'astra-child' ),
		'description' => __( 'Design and develop fast, accessible and conversion-focused digital experiences that represent your brand at its best.', 'astra-child' ),
		'cta'         => __( 'Explore Web & Digital Experience', 'astra-child' ),
		'link'        => home_url( '/services/web-digital-experience/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-web" aria-hidden="true"><g class="bi-icon-frame"><rect x="12" y="18" width="56" height="44" rx="7" stroke="#FFFFFF" stroke-width="2.8"/><line x1="12" y1="28" x2="68" y2="28" stroke="#FFFFFF" stroke-width="2"/><circle cx="20" cy="23" r="2" fill="#FFFFFF"/><circle cx="26" cy="23" r="2" fill="#FFFFFF"/><circle cx="32" cy="23" r="2" fill="#FFFFFF"/></g><g class="bi-icon-ui-blocks"><rect x="20" y="36" width="18" height="20" rx="4" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="1.5" class="bi-ui-card"/><line x1="42" y1="38" x2="60" y2="38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" class="bi-ui-line-1"/><line x1="42" y1="46" x2="54" y2="46" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round" class="bi-ui-line-2"/><line x1="42" y1="52" x2="60" y2="52" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round" class="bi-ui-line-3"/></g></svg>',
	),
	array(
		'number'      => '08',
		'id'          => 'data-analytics',
		'title'       => __( 'Data & Analytics', 'astra-child' ),
		'description' => __( 'Turn fragmented business data into useful insights, dashboards and intelligent decision-making systems.', 'astra-child' ),
		'cta'         => __( 'Explore Data & Analytics', 'astra-child' ),
		'link'        => home_url( '/services/data-analytics/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-analytics" aria-hidden="true"><g class="bi-icon-arc"><circle cx="40" cy="40" r="22" stroke="rgba(255,255,255,0.2)" stroke-width="6"/><path d="M40 18C52.1503 18 62 27.8497 62 40C62 44.8 60.5 49.2 57.9 52.8" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" class="bi-analytics-arc-path"/></g><g class="bi-icon-data-points"><circle cx="40" cy="40" r="8" fill="#FFFFFF" class="bi-analytics-core-dot"/><circle cx="40" cy="40" r="3" fill="#FFFFFF"/><circle cx="58" cy="24" r="3" fill="#FFFFFF" class="bi-analytics-node-1"/></g></svg>',
	),
	array(
		'number'      => '09',
		'id'          => 'managed-technology',
		'title'       => __( 'Managed Technology', 'astra-child' ),
		'description' => __( 'Keep your digital ecosystem optimized, secure and evolving with ongoing technical support, improvements and strategic guidance.', 'astra-child' ),
		'cta'         => __( 'Explore Managed Technology', 'astra-child' ),
		'link'        => home_url( '/services/managed-technology/' ),
		'svg'         => '<svg viewBox="0 0 80 80" width="76" height="76" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi-service-svg bi-svg-managed" aria-hidden="true"><g class="bi-icon-cloud"><path d="M22 52C17.9 52 14.5 48.6 14.5 44.5C14.5 40.7 17.3 37.6 21 37.1C20.8 36.2 20.7 35.3 20.7 34.4C20.7 27.5 26.3 21.9 33.2 21.9C37.8 21.9 41.9 24.4 44 28.3C45.8 26.7 48.1 25.7 50.7 25.7C56.2 25.7 60.7 30.2 60.7 35.7C60.7 36.3 60.6 36.9 60.5 37.5C64.2 38.5 67 42 67 46.2C67 51.4 62.7 55.7 57.5 55.7H22Z" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><g class="bi-icon-gear"><circle cx="40" cy="43" r="6" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" class="bi-gear-center"/><circle cx="40" cy="43" r="2" fill="#FFFFFF"/><line x1="40" y1="33" x2="40" y2="37" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><line x1="40" y1="49" x2="40" y2="53" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="43" x2="34" y2="43" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><line x1="46" y1="43" x2="50" y2="43" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></g></svg>',
	),
);
?>

<section class="bi-services-section bi-theme--dark" data-theme="dark" aria-label="<?php esc_attr_e( 'Our Services Showcase', 'astra-child' ); ?>">
	<div class="bi-services-container bi-container">
		
		<!-- 2-Column Editorial Intro Header -->
		<div class="bi-services-header">
			<div class="bi-services-header__left">
				<span class="bi-services-header__label"><?php esc_html_e( 'OUR SERVICES', 'astra-child' ); ?></span>
				<h2 class="bi-services-header__title">
					<?php _e( 'Services built to move<br>your business forward', 'astra-child' ); ?>
				</h2>
			</div>
			<div class="bi-services-header__right">
				<p class="bi-services-header__desc">
					<?php esc_html_e( 'From AI and automation to digital growth and technology engineering, we build connected solutions that help businesses work smarter, move faster and create measurable impact.', 'astra-child' ); ?>
				</p>
				<a href="<?php echo esc_url( home_url( '/services/' ) ); ?>" class="bi-services-header__link">
					<span><?php esc_html_e( 'Explore all services', 'astra-child' ); ?></span>
					<span class="bi-services-header__link-arrow" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</span>
				</a>
			</div>
		</div>

		<!-- Services 3x3 Grid -->
		<div class="bi-services-grid">
			<?php foreach ( $services as $index => $service ) : ?>
				<article class="bi-service-card" data-bi-service="<?php echo esc_attr( $service['id'] ); ?>">
					
					<!-- Top Service Meta: Number & Large Animated Icon -->
					<div class="bi-service-card__top">
						<span class="bi-service-card__number"><?php echo esc_html( $service['number'] ); ?></span>
						
						<div class="bi-service-card__icon-wrap">
							<?php echo $service['svg']; ?>
						</div>

						<!-- Subtle Horizontal Blue Accent Bar -->
						<span class="bi-service-card__accent-bar" aria-hidden="true"></span>
					</div>

					<!-- Body Content -->
					<h3 class="bi-service-card__title"><?php echo esc_html( $service['title'] ); ?></h3>
					<p class="bi-service-card__desc"><?php echo esc_html( $service['description'] ); ?></p>

					<!-- CTA Link -->
					<div class="bi-service-card__cta-wrap">
						<a href="<?php echo esc_url( $service['link'] ); ?>" class="bi-service-card__link">
							<span><?php echo esc_html( $service['cta'] ); ?></span>
							<span class="bi-service-card__arrow" aria-hidden="true">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<line x1="7" y1="17" x2="17" y2="7"></line>
									<polyline points="7 7 17 7 17 17"></polyline>
								</svg>
							</span>
						</a>
					</div>

				</article>
			<?php endforeach; ?>
		</div>

		<!-- Bottom Section CTA -->
		<div class="bi-services-bottom-cta">
			<div class="bi-services-bottom-cta__content">
				<h3 class="bi-services-bottom-cta__title"><?php esc_html_e( 'Not sure what your business needs?', 'astra-child' ); ?></h3>
				<p class="bi-services-bottom-cta__desc"><?php esc_html_e( 'Let’s find the right solution for your goals.', 'astra-child' ); ?></p>
			</div>
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-services-bottom-cta__btn">
				<span><?php esc_html_e( 'Talk to Better Insights', 'astra-child' ); ?></span>
				<span class="bi-services-bottom-cta__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<line x1="7" y1="17" x2="17" y2="7"></line>
						<polyline points="7 7 17 7 17 17"></polyline>
					</svg>
				</span>
			</a>
		</div>

	</div>
</section>
