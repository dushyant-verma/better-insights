<?php
/**
 * Better Insights - About Page Section 5: Company Information & Interactive Capabilities Explorer
 * Two-panel editorial composition: Left interactive capabilities menu and right dynamic content & image panel.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Resolve Better Insights logo for light background
$logo_file = ABSPATH . 'wp-content/uploads/2026/10/better-insights-logo-6.png';
if ( file_exists( $logo_file ) ) {
	$logo_url = content_url( '/uploads/2026/10/better-insights-logo-6.png' );
} else {
	$logo_url = get_theme_file_uri( 'assets/img/logo.svg' );
}

$upload_base = content_url( '/uploads' );

// 11 Verified Capabilities organized into 3 Categories
$capability_groups = array(
	array(
		'label' => __( 'Capabilities', 'astra-child' ),
		'items' => array(
			array(
				'id'          => 'digital-growth',
				'name'        => __( 'Digital Growth', 'astra-child' ),
				'eyebrow'     => __( 'DIGITAL GROWTH', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Accelerating customer acquisition and scaling %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'sustainable revenue pipelines.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We combine performance marketing, technical SEO, and conversion engineering to help ambitious businesses capture market share and drive repeatable commercial growth.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Conversion Funnel Optimization', 'astra-child' ),
						'desc'  => __( 'Eliminating friction across buyer journeys to maximize qualified lead generation and sales.', 'astra-child' ),
					),
					array(
						'title' => __( 'Data-Driven Attribution', 'astra-child' ),
						'desc'  => __( 'Aligning multi-channel acquisition spend to verified customer lifetime value and ROI.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/DIGITAL-GROWTH.webp',
				'image_alt'   => __( 'Better Insights Digital Growth and Acquisition Strategy', 'astra-child' ),
				'badge'       => __( 'ACQUISITION × RETENTION × REVENUE', 'astra-child' ),
			),
			array(
				'id'          => 'ai-automation',
				'name'        => __( 'AI & Automation', 'astra-child' ),
				'eyebrow'     => __( 'AI & AUTOMATION', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Empowering modern teams with %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'intelligent autonomous workflows.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We design and deploy purpose-built AI agents, automated operations, and smart workflows that eliminate repetitive tasks, reduce human error, and accelerate execution velocity.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Operational Efficiency', 'astra-child' ),
						'desc'  => __( 'Streamlining complex multi-step processes across internal departments and external customer touchpoints.', 'astra-child' ),
					),
					array(
						'title' => __( 'Human-in-the-Loop Oversight', 'astra-child' ),
						'desc'  => __( 'Delivering reliable automation with built-in observability, governance, and quality controls.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/AI-AUTOMATION.webp',
				'image_alt'   => __( 'Better Insights Intelligent AI Agents and Automated Operations', 'astra-child' ),
				'badge'       => __( 'AUTOMATION × INTELLIGENCE × SPEED', 'astra-child' ),
			),
			array(
				'id'          => 'crm-integrations',
				'name'        => __( 'CRM & Integrations', 'astra-child' ),
				'eyebrow'     => __( 'CRM & INTEGRATIONS', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Unifying commercial systems and %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'seamless customer intelligence.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We synchronize enterprise CRM platforms, marketing tools, and transactional backends into cohesive real-time ecosystems with zero data silos.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Bidirectional Data Sync', 'astra-child' ),
						'desc'  => __( 'Keeping commercial, support, and billing records perfectly coordinated in real time.', 'astra-child' ),
					),
					array(
						'title' => __( 'Custom API Infrastructure', 'astra-child' ),
						'desc'  => __( 'Building high-speed, secure connectors between core databases and specialized SaaS applications.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/CRM-INTEGRATIONS.webp',
				'image_alt'   => __( 'Better Insights Enterprise CRM Architecture and Systems Integration', 'astra-child' ),
				'badge'       => __( 'SYNC × ARCHITECTURE × DATA FLOW', 'astra-child' ),
			),
			array(
				'id'          => 'technology-engineering',
				'name'        => __( 'Technology & Engineering', 'astra-child' ),
				'eyebrow'     => __( 'TECHNOLOGY & ENGINEERING', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Architecting robust digital infrastructure %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'engineered for peak performance.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'From mission-critical web applications to custom platform backends, our multidisciplinary engineering teams build secure, scalable solutions built around your exact business needs.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Modern Cloud Architecture', 'astra-child' ),
						'desc'  => __( 'Designing scalable, elastic software platforms ready for high concurrency and zero downtime.', 'astra-child' ),
					),
					array(
						'title' => __( 'Rigorous Code Standards', 'astra-child' ),
						'desc'  => __( 'Implementing modern CI/CD pipelines, automated testing, and rock-solid security protocols.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/TECHNOLOGY-ENGINEERING.webp',
				'image_alt'   => __( 'Better Insights Full-Stack Engineering and Cloud Systems Architecture', 'astra-child' ),
				'badge'       => __( 'SECURITY × CONCURRENCY × SCALE', 'astra-child' ),
			),
			array(
				'id'          => 'digital-transformation',
				'name'        => __( 'Digital Transformation', 'astra-child' ),
				'eyebrow'     => __( 'DIGITAL TRANSFORMATION', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Modernizing enterprise operations for %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'continuous competitive agility.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We help established organizations evolve legacy systems, streamline digital operations, and connect customer-facing experiences to modern cloud foundations.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Legacy Modernization', 'astra-child' ),
						'desc'  => __( 'Replacing monolithic bottlenecks with modular, agile digital architectures that adapt quickly.', 'astra-child' ),
					),
					array(
						'title' => __( 'Strategic Alignment', 'astra-child' ),
						'desc'  => __( 'Connecting leadership vision, cross-functional teams, and tech execution to tangible business KPIs.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/DIGITAL-TRANSFORMATION.webp',
				'image_alt'   => __( 'Better Insights Enterprise Modernization and Transformation Roadmaps', 'astra-child' ),
				'badge'       => __( 'MODERNIZATION × STRATEGY × AGILITY', 'astra-child' ),
			),
		),
	),
	array(
		'label' => __( 'Digital Experience', 'astra-child' ),
		'items' => array(
			array(
				'id'          => 'website-development',
				'name'        => __( 'Website Development', 'astra-child' ),
				'eyebrow'     => __( 'WEBSITE DEVELOPMENT', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Crafting high-performance websites that %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'convert visitors into advocates.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We engineer bespoke, lightning-fast digital experiences with clean architectural code, intuitive CMS management, and responsive design that captivates on every screen.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Performance-First Build', 'astra-child' ),
						'desc'  => __( 'Optimized Core Web Vitals, ultra-low latency, and modern frontend animation standards.', 'astra-child' ),
					),
					array(
						'title' => __( 'Tailored CMS Experience', 'astra-child' ),
						'desc'  => __( 'Intuitive, modular editing controls allowing marketing teams to scale pages with complete autonomy.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/Digital-Experiences-Built-to-Perform.webp',
				'image_alt'   => __( 'Better Insights High-Performance Web Development and UI/UX Design', 'astra-child' ),
				'badge'       => __( 'EXPERIENCE × PERFORMANCE × DESIGN', 'astra-child' ),
			),
			array(
				'id'          => 'digital-strategy',
				'name'        => __( 'Digital Strategy', 'astra-child' ),
				'eyebrow'     => __( 'DIGITAL STRATEGY', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Translating strategic vision into %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'executable digital roadmaps.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We provide clear, actionable direction by auditing competitive landscapes, identifying digital market opportunities, and aligning technology investments directly to revenue.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Market Opportunity Mapping', 'astra-child' ),
						'desc'  => __( 'Pinpointing high-impact digital initiatives based on empirical user and competitor intelligence.', 'astra-child' ),
					),
					array(
						'title' => __( 'Integrated Delivery Roadmap', 'astra-child' ),
						'desc'  => __( 'Coordinating design, technology, and marketing milestones for predictable outcomes.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/BUILT-FOR-BUSINESS-IMPACT.webp',
				'image_alt'   => __( 'Better Insights Strategic Roadmaps and Digital Advisory', 'astra-child' ),
				'badge'       => __( 'ROADMAPS × INSIGHTS × EXECUTION', 'astra-child' ),
			),
			array(
				'id'          => 'conversion-optimization',
				'name'        => __( 'Conversion Optimization', 'astra-child' ),
				'eyebrow'     => __( 'CONVERSION OPTIMIZATION', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Turning digital traffic into %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'measurable commercial results.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'Through rigorous user journey analysis, quantitative tracking, and behavioral UX testing, we identify conversion roadblocks and systematically boost engagement rates.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Behavioral Funnel Analysis', 'astra-child' ),
						'desc'  => __( 'Uncovering where prospective customers drop off and testing targeted UX interventions.', 'astra-child' ),
					),
					array(
						'title' => __( 'Continuous Testing Cadence', 'astra-child' ),
						'desc'  => __( 'Data-backed iterative experimentation that compounds revenue gains over time.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/CONNECTED-AUTOMATED.webp',
				'image_alt'   => __( 'Better Insights Conversion Optimization and Behavioral UX Testing', 'astra-child' ),
				'badge'       => __( 'ANALYTICS × UX × CONVERSION', 'astra-child' ),
			),
		),
	),
	array(
		'label' => __( 'Technology', 'astra-child' ),
		'items' => array(
			array(
				'id'          => 'ai-solutions',
				'name'        => __( 'AI Solutions', 'astra-child' ),
				'eyebrow'     => __( 'AI SOLUTIONS', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Deploying practical AI applications that %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'solve real business problems.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We move beyond novelty to implement customized machine learning models, retrieval-augmented generative systems, and smart predictive tools that deliver immediate ROI.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Custom Model Integration', 'astra-child' ),
						'desc'  => __( 'Tailoring LLMs and computer vision to your proprietary data and enterprise workflows.', 'astra-child' ),
					),
					array(
						'title' => __( 'Enterprise Security & Privacy', 'astra-child' ),
						'desc'  => __( 'Ensuring data protection, strict access control, and compliant AI deployment.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/INTELLIGENT-BY-DESIGN.webp',
				'image_alt'   => __( 'Better Insights Practical AI Applications and Machine Learning Solutions', 'astra-child' ),
				'badge'       => __( 'PREDICTIVE × INTELLIGENT × SECURE', 'astra-child' ),
			),
			array(
				'id'          => 'data-analytics',
				'name'        => __( 'Data & Analytics', 'astra-child' ),
				'eyebrow'     => __( 'DATA & ANALYTICS', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Transforming complex data streams into %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'clear actionable insights.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We unify business metrics, customer events, and marketing telemetry into custom dashboards and automated reports that empower confident decision-making.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Unified Business Telemetry', 'astra-child' ),
						'desc'  => __( 'Capturing clean, structured event data across web, mobile, CRM, and product touchpoints.', 'astra-child' ),
					),
					array(
						'title' => __( 'Actionable Decision Dashboards', 'astra-child' ),
						'desc'  => __( 'Real-time visualization interfaces tailored for executive leadership and operational teams.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/Technology-That-Moves-Business-Forward.webp',
				'image_alt'   => __( 'Better Insights Data Telemetry and Real-Time Business Dashboards', 'astra-child' ),
				'badge'       => __( 'TELEMETRY × DASHBOARDS × METRICS', 'astra-child' ),
			),
			array(
				'id'          => 'managed-technology',
				'name'        => __( 'Managed Technology', 'astra-child' ),
				'eyebrow'     => __( 'MANAGED TECHNOLOGY', 'astra-child' ),
				'heading'     => sprintf(
					/* translators: %s is the highlighted blue phrase */
					esc_html__( 'Proactive management, continuous support, and %s', 'astra-child' ),
					'<span class="bi-about-company-info__lead-accent">' . esc_html__( 'uninterrupted digital uptime.', 'astra-child' ) . '</span>'
				),
				'description' => __( 'We safeguard and optimize your digital infrastructure with continuous maintenance, performance tuning, proactive security monitoring, and on-demand engineering support.', 'astra-child' ),
				'pillars'     => array(
					array(
						'title' => __( 'Continuous Infrastructure Health', 'astra-child' ),
						'desc'  => __( 'Around-the-clock monitoring, routine updates, and preventative security hardening.', 'astra-child' ),
					),
					array(
						'title' => __( 'Ongoing Optimization', 'astra-child' ),
						'desc'  => __( 'Iterative performance enhancements ensuring your platforms adapt as your business expands.', 'astra-child' ),
					),
				),
				'image'       => $upload_base . '/2026/10/MANAGED-TECHNOLOGY.webp',
				'image_alt'   => __( 'Better Insights Managed Cloud Infrastructure and Technical Support', 'astra-child' ),
				'badge'       => __( 'UPTIME × RESILIENCE × SUPPORT', 'astra-child' ),
			),
		),
	),
);

// Flatten items array for stage loop
$all_capabilities = array();
foreach ( $capability_groups as $group ) {
	foreach ( $group['items'] as $item ) {
		$all_capabilities[] = $item;
	}
}
?>

<section class="bi-about-company-info" aria-label="<?php esc_attr_e( 'Better Insights Company Information and Capabilities Explorer', 'astra-child' ); ?>">
	<div class="bi-about-company-info__container">
		
		<div class="bi-about-company-info__grid">

			<!-- LEFT NAVIGATION PANEL (32-36%): Interactive Capabilities Menu -->
			<aside class="bi-about-company-info__left" aria-label="<?php esc_attr_e( 'Capabilities Navigation Menu', 'astra-child' ); ?>">
				<div class="bi-about-company-info__panel">
					
					<div class="bi-about-company-info__panel-inner">
						
						<!-- Header & Branding Area -->
						<div class="bi-about-company-info__panel-header">
							<span class="bi-about-company-info__category-tag"><?php esc_html_e( 'Company', 'astra-child' ); ?></span>
							<div class="bi-about-company-info__brand">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="bi-about-company-info__brand-link" aria-label="<?php esc_attr_e( 'Better Insights Home', 'astra-child' ); ?>">
									<img
										src="<?php echo esc_url( $logo_url ); ?>"
										alt="<?php esc_attr_e( 'Better Insights', 'astra-child' ); ?>"
										class="bi-about-company-info__logo"
										width="170"
										height="40"
										loading="lazy"
									/>
								</a>
							</div>
						</div>

						<div class="bi-about-company-info__divider" aria-hidden="true"></div>

						<!-- Capability & Services Information Groups (Tablist) -->
						<div
							class="bi-about-company-info__groups"
							role="tablist"
							aria-orientation="vertical"
							aria-label="<?php esc_attr_e( 'Company Capabilities', 'astra-child' ); ?>"
						>
							<?php foreach ( $capability_groups as $g_index => $group ) : ?>
								<div class="bi-about-company-info__group">
									<h3 class="bi-about-company-info__group-title"><?php echo esc_html( $group['label'] ); ?></h3>
									<div class="bi-about-company-info__list" role="presentation">
										<?php foreach ( $group['items'] as $item ) :
											$is_first = ( 'digital-growth' === $item['id'] );
										?>
											<button
												type="button"
												class="bi-about-company-info__nav-btn<?php echo $is_first ? ' is-active' : ''; ?>"
												role="tab"
												id="bi-tab-<?php echo esc_attr( $item['id'] ); ?>"
												aria-selected="<?php echo $is_first ? 'true' : 'false'; ?>"
												aria-controls="bi-panel-<?php echo esc_attr( $item['id'] ); ?>"
												tabindex="<?php echo $is_first ? '0' : '-1'; ?>"
												data-capability-id="<?php echo esc_attr( $item['id'] ); ?>"
											>
												<span class="bi-about-company-info__nav-bullet" aria-hidden="true"></span>
												<span class="bi-about-company-info__nav-text"><?php echo esc_html( $item['name'] ); ?></span>
												<span class="bi-about-company-info__nav-indicator" aria-hidden="true">
													<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>
												</span>
											</button>
										<?php endforeach; ?>
									</div>
								</div>

								<?php if ( $g_index < count( $capability_groups ) - 1 ) : ?>
									<div class="bi-about-company-info__divider" aria-hidden="true"></div>
								<?php endif; ?>
							<?php endforeach; ?>
						</div>

					</div>

				</div>
			</aside>

			<!-- RIGHT CONTENT & IMAGE PANEL (64-68%): Dynamic Stage -->
			<div
				class="bi-about-company-info__right-display"
				id="bi-about-capability-stage"
				aria-live="polite"
				aria-atomic="true"
			>
				<div class="bi-about-company-info__stage-grid">
					<?php foreach ( $all_capabilities as $c_index => $capability ) :
						$is_active = ( 'digital-growth' === $capability['id'] );
					?>
						<article
							class="bi-about-company-info__content-panel<?php echo $is_active ? ' is-active' : ''; ?>"
							role="tabpanel"
							id="bi-panel-<?php echo esc_attr( $capability['id'] ); ?>"
							aria-labelledby="bi-tab-<?php echo esc_attr( $capability['id'] ); ?>"
							aria-hidden="<?php echo $is_active ? 'false' : 'true'; ?>"
							data-capability-id="<?php echo esc_attr( $capability['id'] ); ?>"
						>
							<!-- Left sub-column: Text Content (~52-56%) -->
							<div class="bi-about-company-info__content-col">
								<span class="bi-about-company-info__eyebrow">
									<?php echo esc_html( $capability['eyebrow'] ); ?>
								</span>

								<h2 class="bi-about-company-info__lead-text">
									<?php echo wp_kses_post( $capability['heading'] ); ?>
								</h2>

								<p class="bi-about-company-info__lead-desc">
									<?php echo esc_html( $capability['description'] ); ?>
								</p>

								<!-- Supporting Points / Pillars -->
								<div class="bi-about-company-info__subtext-area">
									<?php foreach ( $capability['pillars'] as $pillar ) : ?>
										<div class="bi-about-company-info__pillar">
											<span class="bi-about-company-info__pillar-dot" aria-hidden="true"></span>
											<p class="bi-about-company-info__pillar-desc">
												<strong><?php echo esc_html( $pillar['title'] ); ?>:</strong>
												<?php echo esc_html( $pillar['desc'] ); ?>
											</p>
										</div>
									<?php endforeach; ?>
								</div>
							</div>

							<!-- Right sub-column: Large Editorial Image (~44-48%) -->
							<div class="bi-about-company-info__image-col">
								<div class="bi-about-company-info__image-card">
									<div class="bi-about-company-info__image-frame">
										<img
											src="<?php echo esc_url( $capability['image'] ); ?>"
											alt="<?php echo esc_attr( $capability['image_alt'] ); ?>"
											class="bi-about-company-info__image"
											width="800"
											height="1000"
											loading="<?php echo $is_active ? 'eager' : 'lazy'; ?>"
										/>
										<div class="bi-about-company-info__image-overlay" aria-hidden="true"></div>
									</div>

									<!-- Floating Editorial Label Badge -->
									<div class="bi-about-company-info__image-badge">
										<span class="bi-about-company-info__image-badge-dot" aria-hidden="true"></span>
										<span class="bi-about-company-info__image-badge-text"><?php echo esc_html( $capability['badge'] ); ?></span>
									</div>
								</div>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			</div>

		</div>

	</div>
</section>
