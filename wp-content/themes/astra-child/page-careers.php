<?php
/**
 * Template Name: Careers at Better Insights
 * The template for displaying Careers, open positions, and culture.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$open_positions = array(
	array(
		'id'          => 'job-web-dev',
		'title'       => 'Web Developer (WordPress & Full-Stack)',
		'department'  => 'Technology & Engineering',
		'location'    => 'Gurgaon, India / Hybrid',
		'type'        => 'Full-Time',
		'overview'    => 'Engineer high-performance custom themes, scalable API integrations, and modern interactive digital experiences for global clients.',
		'reqs'        => array(
			'Strong proficiency in modern PHP (8+), WordPress core architecture, and headless/custom theme development.',
			'Hands-on expertise with JavaScript (ES6+), GSAP animations, REST APIs, and webhook automation.',
			'Deep knowledge of web vitals performance, semantic HTML5, and responsive CSS architecture.',
		),
	),
	array(
		'id'          => 'job-seo-analyst',
		'title'       => 'SEO Analyst & Search Strategist',
		'department'  => 'Search & Organic Growth',
		'location'    => 'Gurgaon, India / Hybrid',
		'type'        => 'Full-Time',
		'overview'    => 'Drive enterprise organic search visibility, technical crawl auditing, and data-driven content strategy across competitive B2B and consumer verticals.',
		'reqs'        => array(
			'Proven track record optimizing multi-thousand-page sites for international and national search rankings.',
			'Mastery of Google Search Console, Ahrefs, SEMrush, Screaming Frog, and schema markup.',
			'Experience translating search analytics into actionable product and content roadmaps.',
		),
	),
	array(
		'id'          => 'job-perf-marketing',
		'title'       => 'Performance Marketing Specialist',
		'department'  => 'Growth & Paid Media',
		'location'    => 'Gurgaon, India',
		'type'        => 'Full-Time',
		'overview'    => 'Architect, manage, and scale high-ROI paid media campaigns across Google Search, Performance Max, and Meta Ads ecosystems.',
		'reqs'        => array(
			'Demonstrated success managing large monthly ad budgets with rigorous cost-per-acquisition metrics.',
			'Proficiency with conversion tracking, Google Tag Manager, GA4 attribution models, and landing page CRO.',
			'Analytical mindset capable of continuous A/B creative and copy experimentation.',
		),
	),
	array(
		'id'          => 'job-content-lead',
		'title'       => 'Content & Editorial Strategist',
		'department'  => 'Editorial & Brand',
		'location'    => 'Gurgaon, India / Remote',
		'type'        => 'Full-Time',
		'overview'    => 'Produce authoritative, well-researched thought leadership articles, case studies, and editorial content that position Better Insights at the forefront of digital transformation.',
		'reqs'        => array(
			'Exceptional writing and storytelling ability covering AI, engineering, and digital growth topics.',
			'Experience interviewing technical subject-matter experts and distilling complex workflows into clear narratives.',
			'Familiarity with SEO copywriting and editorial calendar orchestration.',
		),
	),
	array(
		'id'          => 'job-video-editor',
		'title'       => 'Motion Designer & Video Producer',
		'department'  => 'Creative & Media',
		'location'    => 'Gurgaon, India',
		'type'        => 'Full-Time / Internship',
		'overview'    => 'Create compelling brand reels, motion design snippets, and case study video narratives for digital distribution.',
		'reqs'        => array(
			'Proficiency with Premiere Pro, After Effects, and audio mixing workflows.',
			'Strong visual aesthetic with keen sense of pacing, typography, and motion physics.',
			'Portfolio showcasing high-energy creative edits or brand identity storytelling.',
		),
	),
);
?>

<main class="bi-utility-page bi-careers-page" id="primary">
	<div class="bi-utility-hero">
		<div class="bi-container">
			<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
				<ol class="bi-case-breadcrumbs__list">
					<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
					<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
					<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php esc_html_e( 'Careers', 'astra-child' ); ?></li>
				</ol>
			</nav>

			<div class="bi-utility-hero__content">
				<span class="bi-utility-hero__eyebrow"><?php esc_html_e( 'JOIN OUR TEAM', 'astra-child' ); ?></span>
				<h1 class="bi-utility-hero__title"><?php esc_html_e( 'Build What’s Next With Us', 'astra-child' ); ?></h1>
				<p class="bi-utility-hero__desc">
					<?php esc_html_e( 'We are a close-knit collective of strategists, engineers, and growth thinkers. Join us in building transformative technology and high-ROI digital solutions for ambitious brands worldwide.', 'astra-child' ); ?>
				</p>
			</div>
		</div>
	</div>

	<div class="bi-utility-body">
		<div class="bi-container">
			
			<!-- Culture & Values Highlights -->
			<div class="bi-careers-perks-grid">
				<div class="bi-perk-card">
					<span class="bi-perk-num">01</span>
					<h3 class="bi-perk-title"><?php esc_html_e( 'Outcome Over Hours', 'astra-child' ); ?></h3>
					<p class="bi-perk-desc"><?php esc_html_e( 'We measure success by the tangible business results we deliver to our partners, not time logged in an office.', 'astra-child' ); ?></p>
				</div>
				<div class="bi-perk-card">
					<span class="bi-perk-num">02</span>
					<h3 class="bi-perk-title"><?php esc_html_e( 'Continuous Craft Mastery', 'astra-child' ); ?></h3>
					<p class="bi-perk-desc"><?php esc_html_e( 'We invest actively in modern tooling, AI infrastructure, and professional certifications for every team member.', 'astra-child' ); ?></p>
				</div>
				<div class="bi-perk-card">
					<span class="bi-perk-num">03</span>
					<h3 class="bi-perk-title"><?php esc_html_e( 'Autonomy & Ownership', 'astra-child' ); ?></h3>
					<p class="bi-perk-desc"><?php esc_html_e( 'Own your domain from day one. You collaborate directly with founders, directors, and client executives without layers of bureaucracy.', 'astra-child' ); ?></p>
				</div>
			</div>

			<!-- Open Positions Section -->
			<div class="bi-jobs-header">
				<span class="bi-jobs-eyebrow"><?php esc_html_e( 'CURRENT OPENINGS', 'astra-child' ); ?></span>
				<h2 class="bi-jobs-title"><?php esc_html_e( 'Open Positions', 'astra-child' ); ?></h2>
				<p class="bi-jobs-sub"><?php esc_html_e( 'Click on any role to view detailed responsibilities and requirements.', 'astra-child' ); ?></p>
			</div>

			<div class="bi-jobs-list">
				<?php foreach ( $open_positions as $job ) : ?>
					<div class="bi-job-card" id="<?php echo esc_attr( $job['id'] ); ?>">
						<div class="bi-job-card__header">
							<div class="bi-job-card__title-wrap">
								<h3 class="bi-job-card__title"><?php echo esc_html( $job['title'] ); ?></h3>
								<div class="bi-job-card__badges">
									<span class="bi-job-badge"><?php echo esc_html( $job['department'] ); ?></span>
									<span class="bi-job-badge bi-job-badge--alt"><?php echo esc_html( $job['location'] ); ?></span>
									<span class="bi-job-badge bi-job-badge--type"><?php echo esc_html( $job['type'] ); ?></span>
								</div>
							</div>
							<button
								type="button"
								class="bi-job-apply-btn"
								data-open-career-modal="true"
								data-job-id="<?php echo esc_attr( $job['id'] ); ?>"
								data-job-title="<?php echo esc_attr( $job['title'] ); ?>"
								data-job-department="<?php echo esc_attr( $job['department'] ); ?>"
								aria-haspopup="dialog"
							>
								<span><?php esc_html_e( 'Apply Now', 'astra-child' ); ?></span>
								<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
							</button>
						</div>
						<div class="bi-job-card__body">
							<p class="bi-job-overview"><?php echo esc_html( $job['overview'] ); ?></p>
							<div class="bi-job-reqs">
								<strong class="bi-job-reqs-label"><?php esc_html_e( 'Key Qualifications:', 'astra-child' ); ?></strong>
								<ul class="bi-job-reqs-list">
									<?php foreach ( $job['reqs'] as $req ) : ?>
										<li><?php echo esc_html( $req ); ?></li>
									<?php endforeach; ?>
								</ul>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<!-- General Inquiries Box -->
			<div class="bi-careers-general-box">
				<div class="bi-careers-general__content">
					<h3 class="bi-careers-general__title"><?php esc_html_e( 'Don’t see your exact role?', 'astra-child' ); ?></h3>
					<p class="bi-careers-general__desc">
						<?php esc_html_e( 'We’re always looking for exceptional engineers, AI practitioners, and growth strategists. Send your resume and portfolio directly to our leadership team.', 'astra-child' ); ?>
					</p>
				</div>
				<button
					type="button"
					class="bi-btn-primary"
					data-open-career-modal="true"
					data-job-id="general-application"
					data-job-title="<?php esc_attr_e( 'General / Open Application', 'astra-child' ); ?>"
					data-job-department="<?php esc_attr_e( 'Leadership Team', 'astra-child' ); ?>"
					aria-haspopup="dialog"
				>
					<span><?php esc_html_e( 'Send Open Application', 'astra-child' ); ?></span>
				</button>
			</div>

		</div>
	</div>
</main>

<?php
// Include Career Application Popup Modal
get_template_part( 'template-parts/career-modal' );

get_footer();

