<?php
/**
 * Template Name: Write For Us
 * The template for displaying the Guest Blogging & Editorial Guidelines page.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main class="bi-utility-page bi-write-page" id="primary">
	<div class="bi-utility-hero">
		<div class="bi-container">
			<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
				<ol class="bi-case-breadcrumbs__list">
					<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
					<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
					<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php esc_html_e( 'Write For Us', 'astra-child' ); ?></li>
				</ol>
			</nav>

			<div class="bi-utility-hero__content">
				<span class="bi-utility-hero__eyebrow"><?php esc_html_e( 'CONTRIBUTE & COLLABORATE', 'astra-child' ); ?></span>
				<h1 class="bi-utility-hero__title"><?php esc_html_e( 'Looking for Guest Posting Opportunities?', 'astra-child' ); ?></h1>
				<p class="bi-utility-hero__desc">
					<?php esc_html_e( 'Better Insights is accepting guest contributions from experienced marketers, engineers, and digital practitioners. Share your actionable insights, real-world experiments, and strategic analysis with our global executive audience.', 'astra-child' ); ?>
				</p>

				<div class="bi-write-hero__cta-row">
					<a href="mailto:editor.betterinsights@gmail.com?subject=Guest%20Blogging%20on%20Better%20Insights" class="bi-btn-primary">
						<span><?php esc_html_e( 'Submit Editorial Pitch', 'astra-child' ); ?></span>
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</a>
					<span class="bi-write-hero__email-note">
						<?php esc_html_e( 'Direct pitch to:', 'astra-child' ); ?> <code>editor.betterinsights@gmail.com</code>
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="bi-utility-body">
		<div class="bi-container">
			
			<div class="bi-guidelines-grid">
				<!-- Card 1: What We Accept -->
				<div class="bi-guide-card bi-guide-card--accept">
					<div class="bi-guide-card__badge bi-badge--green"><?php esc_html_e( 'What We Accept', 'astra-child' ); ?></div>
					<h3 class="bi-guide-card__title"><?php esc_html_e( 'High-Impact Editorial Standards', 'astra-child' ); ?></h3>
					<ul class="bi-guide-card__list">
						<li>
							<strong><?php esc_html_e( 'Original Ideas & Case Evidence:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'We only publish 100% original, plagiarism-free insights with firsthand experience or proprietary analysis.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'Core Industry Relevance:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Topics focused on AI solutions, SEO, conversion engineering, performance marketing, CRM, or web architecture.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'In-Depth Word Count:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Comprehensive articles ideally between 1,000 and 2,000 words that provide concrete, actionable value.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'Rich Supporting Media:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Relevant screenshots, diagrams, and data charts (with documented commercial or CC licensing rights).', 'astra-child' ); ?>
						</li>
					</ul>
				</div>

				<!-- Card 2: What We Do Not Accept -->
				<div class="bi-guide-card bi-guide-card--reject">
					<div class="bi-guide-card__badge bi-badge--red"><?php esc_html_e( 'What We Reject', 'astra-child' ); ?></div>
					<h3 class="bi-guide-card__title"><?php esc_html_e( 'Submissions We Will Decline', 'astra-child' ); ?></h3>
					<ul class="bi-guide-card__list">
						<li>
							<strong><?php esc_html_e( 'Thin or Surface-Level Content:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Articles under 1,000 words or superficial listicles lacking technical depth.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'Sales Pitches & Promo Pieces:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Direct promotional marketing, overt company PR, or undisclosed affiliate agendas.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'Restricted Topics & Spam:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'We strictly prohibit gambling, casinos, pay-day loans, adult content, or link-farming networks.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( 'Republished or Spun Content:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Articles published elsewhere or synthesized via repetitive, generic AI templates without human expertise.', 'astra-child' ); ?>
						</li>
					</ul>
				</div>

				<!-- Card 3: Editorial Guidelines & Rights -->
				<div class="bi-guide-card bi-guide-card--process">
					<div class="bi-guide-card__badge bi-badge--blue"><?php esc_html_e( 'Submission Process', 'astra-child' ); ?></div>
					<h3 class="bi-guide-card__title"><?php esc_html_e( 'How to Submit Your Article', 'astra-child' ); ?></h3>
					<ol class="bi-guide-process-list">
						<li>
							<strong><?php esc_html_e( '1. Pitch Your Topic:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Send 2-3 specific article headlines and a short 3-sentence outline explaining the takeaway for readers.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( '2. Email Format:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Send to editor.betterinsights@gmail.com with subject: "Guest Blogging on Better Insights".', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( '3. Editorial Review:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Our editorial team reviews submissions within 5 business days and may suggest collaborative refinements.', 'astra-child' ); ?>
						</li>
						<li>
							<strong><?php esc_html_e( '4. Publication & Attribution:', 'astra-child' ); ?></strong>
							<?php esc_html_e( 'Approved pieces receive full author bio, social attribution, and distribution across our community channels.', 'astra-child' ); ?>
						</li>
					</ol>
				</div>
			</div>

			<!-- Editorial Submission Callout -->
			<div class="bi-write-callout">
				<div class="bi-write-callout__content">
					<h3 class="bi-write-callout__title"><?php esc_html_e( 'Ready to share your insights?', 'astra-child' ); ?></h3>
					<p class="bi-write-callout__desc">
						<?php esc_html_e( 'Ensure your submission adheres to all quality standards above before sending your draft or outline.', 'astra-child' ); ?>
					</p>
				</div>
				<div class="bi-write-callout__action">
					<a href="mailto:editor.betterinsights@gmail.com?subject=Guest%20Blogging%20on%20Better%20Insights" class="bi-btn-primary">
						<span><?php esc_html_e( 'Email Editorial Team', 'astra-child' ); ?></span>
					</a>
				</div>
			</div>

		</div>
	</div>
</main>

<?php
get_footer();

