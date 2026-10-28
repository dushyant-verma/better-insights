<?php
/**
 * The template for displaying the custom Better Insights footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<?php astra_content_bottom(); ?>
	</div> <!-- .ast-container -->
	</div><!-- #content -->
<?php
	astra_content_after();
	astra_footer_before();
?>

<footer id="colophon" class="bi-footer" role="contentinfo">

	<!-- TOP EDGE SVG SCROLL-VELOCITY ELASTIC BOUNCE LAYER -->
	<div class="bi-footer-bounce" aria-hidden="true">
		<svg class="bi-footer-bounce__svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
			<path id="bi-footer-bounce-path" class="bi-footer-bounce__path" fill="#000000" d="M0,0 Q720,0 1440,0 L1440,120 L0,120 Z" />
		</svg>
	</div>

	<!-- Atmospheric glow background elements -->
	<div class="bi-footer__glow bi-footer__glow--1" aria-hidden="true"></div>
	<div class="bi-footer__glow bi-footer__glow--2" aria-hidden="true"></div>
	<div class="bi-footer__glow bi-footer__glow--3" aria-hidden="true"></div>

	<div class="bi-footer__inner bi-container">

		<!-- SECTION 1: EDITORIAL CTA AREA -->
		<div class="bi-footer__cinematic-cta">
			<span class="bi-footer__cta-eyebrow"><?php esc_html_e( 'GET IN TOUCH', 'astra-child' ); ?></span>
			<h2 class="bi-footer__cta-heading">
				<?php echo wp_kses_post( __( 'LET\'S BUILD<br>WHAT\'S NEXT', 'astra-child' ) ); ?>
			</h2>
			<p class="bi-footer__cta-desc">
				<?php esc_html_e( "Bring us your challenge. We'll bring intelligent technology, creative thinking and digital execution together.", 'astra-child' ); ?>
			</p>
			<div class="bi-footer__cta-btn-wrap">
				<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-footer__primary-btn bi-cta bi-cta--white">
					<span><?php esc_html_e( "LET'S TALK", 'astra-child' ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</span>
				</a>
			</div>
		</div>

		<!-- SECTION 2: MAIN FOOTER NAVIGATION & LEAD FORM -->
		<div class="bi-footer__columns">
			<!-- Column 1: SOLUTIONS -->
			<div class="bi-footer__column">
				<h3 class="bi-footer__col-title"><?php esc_html_e( 'SOLUTIONS', 'astra-child' ); ?></h3>
				<ul class="bi-footer__col-list">
					<li><a href="<?php echo esc_url( home_url( '/clientele/' ) ); ?>"><?php esc_html_e( 'By Industry', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/what-we-do/' ) ); ?>"><?php esc_html_e( 'By Business Need', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/our-work/' ) ); ?>"><?php esc_html_e( 'By Role & Outcomes', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/ai-solutions/' ) ); ?>"><?php esc_html_e( 'AI Solutions', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/digital-transformation/' ) ); ?>"><?php esc_html_e( 'Digital Transformation', 'astra-child' ); ?></a></li>
				</ul>
			</div>

			<!-- Column 2: SERVICES -->
			<div class="bi-footer__column">
				<h3 class="bi-footer__col-title"><?php esc_html_e( 'SERVICES', 'astra-child' ); ?></h3>
				<ul class="bi-footer__col-list">
					<li><a href="<?php echo esc_url( home_url( '/website-development/' ) ); ?>"><?php esc_html_e( 'Website Development', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/crm-integrations/' ) ); ?>"><?php esc_html_e( 'CRM & Integrations', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/ai-solutions/' ) ); ?>"><?php esc_html_e( 'AI & Automation', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/digital-growth/' ) ); ?>"><?php esc_html_e( 'Digital Growth', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/digital-transformation/' ) ); ?>"><?php esc_html_e( 'Digital Transformation', 'astra-child' ); ?></a></li>
				</ul>
			</div>

			<!-- Column 3: PRODUCTS & PLATFORMS -->
			<div class="bi-footer__column">
				<h3 class="bi-footer__col-title"><?php esc_html_e( 'CAPABILITIES', 'astra-child' ); ?></h3>
				<ul class="bi-footer__col-list">
					<li><a href="<?php echo esc_url( home_url( '/technology-engineering/' ) ); ?>"><?php esc_html_e( 'Technology Engineering', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/what-we-do/' ) ); ?>"><?php esc_html_e( 'What We Do', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About Better Insights', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/about/#our-team' ) ); ?>"><?php esc_html_e( 'Executive Team', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'astra-child' ); ?></a></li>
				</ul>
			</div>

			<!-- Column 4: RESOURCES -->
			<div class="bi-footer__column">
				<h3 class="bi-footer__col-title"><?php esc_html_e( 'RESOURCES', 'astra-child' ); ?></h3>
				<ul class="bi-footer__col-list">
					<li><a href="<?php echo esc_url( home_url( '/insights/' ) ); ?>"><?php esc_html_e( 'Insights & Articles', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/our-work/' ) ); ?>"><?php esc_html_e( 'Client Success Stories', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/clientele/' ) ); ?>"><?php esc_html_e( 'Our Clientele', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/cpr-tool/' ) ); ?>"><?php esc_html_e( 'CPR Calculator Tool', 'astra-child' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/careers/' ) ); ?>"><?php esc_html_e( 'Careers', 'astra-child' ); ?></a></li>
				</ul>
			</div>

			<!-- Column 5: LEAD GENERATION FORM & CONTACT INFO -->
			<div class="bi-footer__column bi-footer__column--form">
				<h3 class="bi-footer__col-title"><?php esc_html_e( "LET'S WORK TOGETHER", 'astra-child' ); ?></h3>
				<div class="bi-footer__form-slot" id="bi-footer-form-slot">
					<form class="bi-footer__form" id="bi-footer-lead-form" method="post" action="<?php echo esc_url( home_url( '/contact/' ) ); ?>" novalidate>
						<input type="hidden" name="action" value="bi_submit_footer_lead" />
						<input type="hidden" name="nonce" id="bi-footer-lead-nonce" value="<?php echo esc_attr( wp_create_nonce( 'bi_footer_lead_nonce' ) ); ?>" />
						<input type="text" name="bi_hp_field" id="bi-footer-hp" value="" style="display:none !important;" tabindex="-1" autocomplete="off" />

						<div class="bi-footer__form-group">
							<label for="bi-lead-name" class="screen-reader-text"><?php esc_html_e( 'Your Name', 'astra-child' ); ?></label>
							<input type="text" name="bi_lead_name" id="bi-lead-name" class="bi-footer__input" placeholder="<?php esc_attr_e( 'Your Name', 'astra-child' ); ?>" required aria-required="true" />
						</div>
						<div class="bi-footer__form-group">
							<label for="bi-lead-email" class="screen-reader-text"><?php esc_html_e( 'Email Address', 'astra-child' ); ?></label>
							<input type="email" name="bi_lead_email" id="bi-lead-email" class="bi-footer__input" placeholder="<?php esc_attr_e( 'Email Address', 'astra-child' ); ?>" required aria-required="true" />
						</div>
						<div class="bi-footer__form-group">
							<label for="bi-lead-phone" class="screen-reader-text"><?php esc_html_e( 'Phone', 'astra-child' ); ?></label>
							<input type="tel" name="bi_lead_phone" id="bi-lead-phone" class="bi-footer__input" placeholder="<?php esc_attr_e( 'Phone', 'astra-child' ); ?>" required aria-required="true" />
						</div>
						<button type="submit" class="bi-footer__submit-btn" id="bi-footer-submit-btn">
							<?php esc_html_e( 'SUBMIT', 'astra-child' ); ?>
						</button>
						<div class="bi-footer__form-status" id="bi-footer-form-status" aria-live="polite"></div>
					</form>
				</div>

				<!-- Contact Details Below Form -->
				<div class="bi-footer__contact-info">
					<p><strong><?php esc_html_e( 'Phone:', 'astra-child' ); ?></strong> <a href="tel:+919509996730">+91 950 999 6730</a></p>
					<p><strong><?php esc_html_e( 'Email:', 'astra-child' ); ?></strong> <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a></p>
					<p class="bi-footer__address">
						Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune - 411048, Maharashtra
					</p>
				</div>
			</div>
		</div>

		<!-- SECTION 3: CTA UTILITY STRIP -->
		<div class="bi-footer__cta-strip">
			<a href="mailto:contact@betterinsights.in" class="bi-footer__cta-item">
				<span class="bi-footer__cta-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="4" width="20" height="16" rx="2"/>
						<path d="M22 6l-10 7L2 6"/>
					</svg>
				</span>
				<span class="bi-footer__cta-text"><?php esc_html_e( 'Email Us', 'astra-child' ); ?></span>
			</a>

			<div class="bi-footer__cta-divider" aria-hidden="true"></div>

			<a href="#bi-lead-modal" class="bi-footer__cta-item" role="button" id="bi-footer-cta-marketing-plan" data-bi-modal-trigger="lead-modal" aria-haspopup="dialog" aria-expanded="false" aria-controls="bi-lead-modal">
				<span class="bi-footer__cta-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
					</svg>
				</span>
				<span class="bi-footer__cta-text"><?php esc_html_e( 'Get Marketing Plan', 'astra-child' ); ?></span>
			</a>

			<div class="bi-footer__cta-divider" aria-hidden="true"></div>

			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-footer__cta-item">
				<span class="bi-footer__cta-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
						<line x1="16" y1="2" x2="16" y2="6"/>
						<line x1="8" y1="2" x2="8" y2="6"/>
						<line x1="3" y1="10" x2="21" y2="10"/>
					</svg>
				</span>
				<span class="bi-footer__cta-text"><?php esc_html_e( 'Schedule a Meeting', 'astra-child' ); ?></span>
			</a>

			<div class="bi-footer__cta-divider" aria-hidden="true"></div>

			<a href="https://api.whatsapp.com/send?phone=919509996730" target="_blank" rel="noopener noreferrer" class="bi-footer__cta-item">
				<span class="bi-footer__cta-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
					</svg>
				</span>
				<span class="bi-footer__cta-text"><?php esc_html_e( 'WhatsApp Us', 'astra-child' ); ?></span>
			</a>
		</div>

		<!-- SECTION 4: HUGE OUTLINED ARCHITECTURAL BETTER INSIGHTS WORDMARK -->
		<div class="bi-footer__wordmark">
			<span class="bi-footer__wordmark-text"><?php esc_html_e( 'BETTER INSIGHTS', 'astra-child' ); ?></span>
		</div>

		<!-- Horizontal Divider -->
		<div class="bi-footer__divider"></div>

		<!-- SECTION 5: LEGAL, COPYRIGHT & SVG SOCIAL ICONS -->
		<div class="bi-footer__bottom">
			<div class="bi-footer__bottom-left">
				<span class="bi-footer__copyright">&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php esc_html_e( 'Digispace Global Ventures Private Limited. All Rights Reserved.', 'astra-child' ); ?></span>
				<div class="bi-footer__bottom-legal">
					<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'astra-child' ); ?></a>
					<span class="bi-footer__bottom-dot" aria-hidden="true">•</span>
					<a href="<?php echo esc_url( home_url( '/terms-and-conditions/' ) ); ?>"><?php esc_html_e( 'Terms & Conditions', 'astra-child' ); ?></a>
					<span class="bi-footer__bottom-dot" aria-hidden="true">•</span>
					<a href="<?php echo esc_url( home_url( '/write-for-us/' ) ); ?>"><?php esc_html_e( 'Write for us', 'astra-child' ); ?></a>
					<span class="bi-footer__bottom-dot" aria-hidden="true">•</span>
					<a href="<?php echo esc_url( home_url( '/wp-sitemap.xml' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Sitemap', 'astra-child' ); ?></a>
				</div>
			</div>

			<!-- SVG Social Links -->
			<div class="bi-footer__social">
				<a href="https://www.linkedin.com/company/better-insights-bi/" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link" aria-label="Better Insights on LinkedIn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
				</a>
				<a href="https://www.facebook.com/better.insights.bi#" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link" aria-label="Better Insights on Facebook">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
				</a>
				<a href="https://www.instagram.com/better.insights/" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link" aria-label="Better Insights on Instagram">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
				</a>
				<a href="https://www.behance.net/betterinsights" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link" aria-label="Better Insights on Behance">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22 7h-7v-2h7v2zm-1.708 3.791c-2.468 0-4.067 1.493-4.067 3.882 0 2.531 1.758 4.027 4.256 4.027 1.85 0 3.324-.803 3.82-2.316h-1.921c-.24.512-.962.883-1.782.883-1.298 0-2.18-.756-2.298-1.977h6.155c.036-.237.054-.51.054-.784 0-2.348-1.49-3.715-3.717-3.715zm-2.029 3.011c.149-1.026.962-1.733 2.012-1.733 1.056 0 1.76.689 1.879 1.733h-3.891zm-9.743-4.802h-5.52v12h5.797c2.932 0 4.688-1.494 4.688-3.74 0-1.579-.909-2.735-2.285-3.239 1.157-.5 1.889-1.545 1.889-2.85 0-1.989-1.602-3.171-4.569-3.171zm-3.242 2.115h2.804c1.29 0 2.043.497 2.043 1.411 0 .963-.789 1.488-2.116 1.488h-2.731v-2.899zm0 4.757h3.045c1.424 0 2.227.568 2.227 1.621 0 1.107-.847 1.674-2.312 1.674h-2.96v-3.295z"/></svg>
				</a>
			</div>
		</div>

	</div>

	<!-- ACCESSIBLE "GET MARKETING PLAN" LEAD MODAL DIALOG -->
	<div id="bi-lead-modal" class="bi-lead-modal" role="dialog" aria-modal="true" aria-labelledby="bi-lead-modal-title" aria-describedby="bi-lead-modal-desc" hidden>
		<div class="bi-lead-modal__backdrop" data-bi-modal-close tabindex="-1"></div>
		<div class="bi-lead-modal__dialog" role="document">
			<button type="button" class="bi-lead-modal__close" data-bi-modal-close aria-label="<?php esc_attr_e( 'Close dialog', 'astra-child' ); ?>">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div class="bi-lead-modal__header">
				<span class="bi-lead-modal__eyebrow"><?php esc_html_e( 'GROWTH STRATEGY & AUDIT', 'astra-child' ); ?></span>
				<h2 id="bi-lead-modal-title" class="bi-lead-modal__title"><?php esc_html_e( 'Get Your Marketing Plan', 'astra-child' ); ?></h2>
				<p id="bi-lead-modal-desc" class="bi-lead-modal__desc">
					<?php esc_html_e( 'Share your details below. Our digital growth experts will review your brand and prepare an actionable strategic marketing roadmap.', 'astra-child' ); ?>
				</p>
			</div>

			<div class="bi-lead-modal__body" id="bi-lead-modal-body">
				<!-- Single lead form #bi-footer-lead-form is mounted here dynamically when opened -->
			</div>
		</div>
	</div>

	<script>
	(function() {
		var form      = document.getElementById('bi-footer-lead-form');
		var submitBtn = document.getElementById('bi-footer-submit-btn');
		var statusDiv = document.getElementById('bi-footer-form-status');
		var ajaxUrl   = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;

		var modal         = document.getElementById('bi-lead-modal');
		var modalBody     = document.getElementById('bi-lead-modal-body');
		var formSlot      = document.getElementById('bi-footer-form-slot');
		var activeTrigger = null;

		// Open Modal
		function openLeadModal(triggerEl) {
			if (!modal) return;
			activeTrigger = triggerEl || document.getElementById('bi-footer-cta-marketing-plan');
			if (activeTrigger) {
				activeTrigger.setAttribute('aria-expanded', 'true');
			}

			// Reparent single form into modal body
			if (form && modalBody && form.parentNode !== modalBody) {
				if (formSlot) {
					formSlot.innerHTML = '<div class="bi-footer__form-slot-placeholder"><?php echo esc_js( __( 'Form open in strategic modal popup...', 'astra-child' ) ); ?></div>';
				}
				modalBody.appendChild(form);
			}

			modal.removeAttribute('hidden');
			document.body.classList.add('bi-modal-open');

			requestAnimationFrame(function() {
				modal.classList.add('is-active');
				var nameInput = document.getElementById('bi-lead-name');
				if (nameInput) {
					nameInput.focus();
				}
			});
		}

		// Close Modal
		function closeLeadModal() {
			if (!modal || !modal.classList.contains('is-active')) return;

			modal.classList.remove('is-active');
			document.body.classList.remove('bi-modal-open');

			if (activeTrigger) {
				activeTrigger.setAttribute('aria-expanded', 'false');
				activeTrigger.focus();
			}

			setTimeout(function() {
				modal.setAttribute('hidden', '');
				// Restore form back to footer column 5 slot
				if (form && formSlot && form.parentNode !== formSlot) {
					formSlot.innerHTML = '';
					formSlot.appendChild(form);
				}
			}, 300);
		}

		// Trigger click listeners
		document.addEventListener('click', function(e) {
			var trigger = e.target.closest('[data-bi-modal-trigger="lead-modal"], a[href="#bi-lead-modal"], a[href="#bi-footer-lead-form"]');
			if (trigger) {
				e.preventDefault();
				openLeadModal(trigger);
				return;
			}

			var closeBtn = e.target.closest('[data-bi-modal-close]');
			if (closeBtn) {
				e.preventDefault();
				closeLeadModal();
				return;
			}
		});

		// Escape key to close & Focus trap inside modal
		document.addEventListener('keydown', function(e) {
			if (!modal || !modal.classList.contains('is-active')) return;

			if (e.key === 'Escape' || e.keyCode === 27) {
				e.preventDefault();
				closeLeadModal();
				return;
			}

			if (e.key === 'Tab' || e.keyCode === 9) {
				var focusables = modal.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
				if (!focusables || focusables.length === 0) return;

				var firstEl = focusables[0];
				var lastEl  = focusables[focusables.length - 1];

				if (e.shiftKey) {
					if (document.activeElement === firstEl) {
						e.preventDefault();
						lastEl.focus();
					}
				} else {
					if (document.activeElement === lastEl) {
						e.preventDefault();
						firstEl.focus();
					}
				}
			}
		});

		// Form Submission Handler
		if (form) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();
				var nameInput  = document.getElementById('bi-lead-name');
				var emailInput = document.getElementById('bi-lead-email');
				var phoneInput = document.getElementById('bi-lead-phone');
				var nonceInput = document.getElementById('bi-footer-lead-nonce');
				var hpInput    = document.getElementById('bi-footer-hp');
				var isValid    = true;

				[nameInput, emailInput, phoneInput].forEach(function(input) {
					if (input) input.classList.remove('is-invalid');
				});

				if (!nameInput || !nameInput.value.trim()) {
					if (nameInput) nameInput.classList.add('is-invalid');
					isValid = false;
				}

				var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
					if (emailInput) emailInput.classList.add('is-invalid');
					isValid = false;
				}

				var phoneRegex = /^[0-9\+\-\s\(\)]{7,20}$/;
				if (!phoneInput || !phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
					if (phoneInput) phoneInput.classList.add('is-invalid');
					isValid = false;
				}

				if (!isValid) {
					statusDiv.className = 'bi-footer__form-status is-error';
					statusDiv.textContent = 'Please fill out all required fields with valid details.';
					return;
				}

				var formData = new FormData();
				formData.append('action', 'bi_submit_footer_lead');
				formData.append('nonce', nonceInput ? nonceInput.value : '');
				formData.append('bi_hp_field', hpInput ? hpInput.value : '');
				formData.append('bi_lead_name', nameInput.value.trim());
				formData.append('bi_lead_email', emailInput.value.trim());
				formData.append('bi_lead_phone', phoneInput.value.trim());

				submitBtn.disabled = true;
				submitBtn.classList.add('is-loading');
				statusDiv.className = 'bi-footer__form-status is-submitting';
				statusDiv.textContent = 'Transmitting your enquiry securely...';

				fetch(ajaxUrl, {
					method: 'POST',
					body: formData
				})
				.then(function(res) {
					return res.json();
				})
				.then(function(res) {
					submitBtn.disabled = false;
					submitBtn.classList.remove('is-loading');
					if (res && res.success) {
						statusDiv.className = 'bi-footer__form-status is-success';
						statusDiv.textContent = res.data && res.data.message ? res.data.message : 'Thank you! Your enquiry has been received.';
						form.reset();
					} else {
						statusDiv.className = 'bi-footer__form-status is-error';
						statusDiv.textContent = (res && res.data && res.data.message) ? res.data.message : 'Unable to submit your enquiry. Please try again.';
					}
				})
				.catch(function(err) {
					submitBtn.disabled = false;
					submitBtn.classList.remove('is-loading');
					statusDiv.className = 'bi-footer__form-status is-error';
					statusDiv.textContent = 'Network connection error. Please try again or email us directly.';
				});
			});
		}
	})();
	</script>
</footer>

<?php
	astra_footer_after();
?>
	</div><!-- #page -->
<?php
	astra_body_bottom();
	wp_footer();
?>
	</body>
</html>
