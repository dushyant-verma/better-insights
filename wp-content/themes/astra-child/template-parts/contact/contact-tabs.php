<?php
/**
 * Better Insights - Tabbed Enquiry Section Template Part
 * Section 2: Tabbed Enquiry Form (Inspired by Ascendion .cf-tabs__nav)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$services_taxonomy = array(
	'AI & Automation'          => __( 'AI & Automation', 'astra-child' ),
	'Digital Growth'           => __( 'Digital Growth', 'astra-child' ),
	'CRM & Integrations'       => __( 'CRM & Integrations', 'astra-child' ),
	'Technology & Engineering' => __( 'Technology & Engineering', 'astra-child' ),
	'Digital Transformation'   => __( 'Digital Transformation', 'astra-child' ),
	'Web & Digital Experience' => __( 'Web & Digital Experience', 'astra-child' ),
	'Data & Analytics'         => __( 'Data & Analytics', 'astra-child' ),
	'Other'                    => __( 'Other / Custom Advisory', 'astra-child' ),
);

$budget_ranges = array(
	'Under $10,000'         => __( 'Under $10,000 / ₹8,00,000', 'astra-child' ),
	'$10,000 - $25,000'     => __( '$10,000 - $25,000 / ₹8L - ₹20L', 'astra-child' ),
	'$25,000 - $50,000'     => __( '$25,000 - $50,000 / ₹20L - ₹40L', 'astra-child' ),
	'$50,000+'              => __( '$50,000+ / ₹40L+', 'astra-child' ),
	'Flexible / To Discuss' => __( 'Flexible / To be determined', 'astra-child' ),
);
?>

<section class="bi-enquiry-section" id="enquiry-section" aria-label="<?php esc_attr_e( 'Contact Enquiries and Requests', 'astra-child' ); ?>">
	<div class="bi-enquiry-container">

		<!-- Tab Navigation Header (Inspired by Ascendion .cf-tabs__nav) -->
		<div class="bi-tabs-nav-wrapper">
			<nav class="bi-tabs-nav" role="tablist" aria-label="<?php esc_attr_e( 'Enquiry Types', 'astra-child' ); ?>">
				<button
					type="button"
					class="bi-tab is-active"
					id="bi-tab-btn-general"
					role="tab"
					aria-selected="true"
					aria-controls="bi-panel-general"
					tabindex="0"
					data-tab-target="general"
				>
					<span class="bi-tab__text"><?php esc_html_e( 'General Enquiry', 'astra-child' ); ?></span>
					<span class="bi-tab__indicator" aria-hidden="true"></span>
				</button>

				<button
					type="button"
					class="bi-tab"
					id="bi-tab-btn-services"
					role="tab"
					aria-selected="false"
					aria-controls="bi-panel-services"
					tabindex="-1"
					data-tab-target="services"
				>
					<span class="bi-tab__text"><?php esc_html_e( 'Services', 'astra-child' ); ?></span>
					<span class="bi-tab__indicator" aria-hidden="true"></span>
				</button>

				<button
					type="button"
					class="bi-tab"
					id="bi-tab-btn-employment"
					role="tab"
					aria-selected="false"
					aria-controls="bi-panel-employment"
					tabindex="-1"
					data-tab-target="employment"
				>
					<span class="bi-tab__text"><?php esc_html_e( 'Employment Verification', 'astra-child' ); ?></span>
					<span class="bi-tab__indicator" aria-hidden="true"></span>
				</button>

				<button
					type="button"
					class="bi-tab"
					id="bi-tab-btn-press"
					role="tab"
					aria-selected="false"
					aria-controls="bi-panel-press"
					tabindex="-1"
					data-tab-target="press"
				>
					<span class="bi-tab__text"><?php esc_html_e( 'Press', 'astra-child' ); ?></span>
					<span class="bi-tab__indicator" aria-hidden="true"></span>
				</button>
			</nav>
		</div>

		<!-- Tab Panels Wrapper -->
		<div class="bi-tabs-panels">

			<!-- ======================================================================
			     TAB PANEL 1: GENERAL ENQUIRY
			     ====================================================================== -->
			<div
				class="bi-tab-panel is-active"
				id="bi-panel-general"
				role="tabpanel"
				aria-labelledby="bi-tab-btn-general"
				tabindex="0"
			>
				<div class="bi-tab-panel__grid">

					<!-- Left Column: Introduction & Verified Contact Details -->
					<div class="bi-tab-panel__left">
						<div class="bi-tab-panel__meta-badge">
							<span class="bi-tab-panel__meta-dot" aria-hidden="true"></span>
							<span class="bi-tab-panel__meta-title"><?php esc_html_e( 'DIRECT ASSISTANCE', 'astra-child' ); ?></span>
						</div>

						<h2 class="bi-tab-panel__title"><?php esc_html_e( 'General Enquiry', 'astra-child' ); ?></h2>

						<p class="bi-tab-panel__lead">
							<?php esc_html_e( 'Tell us about your goals, challenges, or upcoming project. Our team will help you identify the right next step.', 'astra-child' ); ?>
						</p>

						<div class="bi-contact-card">
							<h3 class="bi-contact-card__heading"><?php esc_html_e( 'Direct Contact Channels', 'astra-child' ); ?></h3>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
										<polyline points="22,6 12,13 2,6"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Email Us', 'astra-child' ); ?></span>
									<a href="mailto:contact@betterinsights.in" class="bi-contact-card__value">contact@betterinsights.in</a>
								</div>
							</div>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Call Us', 'astra-child' ); ?></span>
									<a href="tel:+919509996730" class="bi-contact-card__value">+91 950 999 6730</a>
								</div>
							</div>

							<div class="bi-contact-card__hours">
								<span class="bi-contact-card__hours-dot" aria-hidden="true"></span>
								<span class="bi-contact-card__hours-text"><?php esc_html_e( 'Responses typically within 24 business hours', 'astra-child' ); ?></span>
							</div>
						</div>
					</div>

					<!-- Right Column: General Enquiry Form -->
					<div class="bi-tab-panel__right">
						<form class="bi-contact-form" data-form-type="general" novalidate>
							<!-- Spam Honeypot Field -->
							<input type="text" name="bi_hp_field" class="bi-form-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
							<input type="hidden" name="tab_type" value="general">

							<!-- Status Notification Box -->
							<div class="bi-form-notice" role="alert" aria-live="polite" style="display: none;"></div>

							<!-- Success Confirmation Overlay -->
							<div class="bi-form-success" style="display: none;">
								<div class="bi-form-success__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<h3 class="bi-form-success__title"><?php esc_html_e( 'Enquiry Received!', 'astra-child' ); ?></h3>
								<p class="bi-form-success__desc"><?php esc_html_e( 'Thank you for reaching out. Our team will review your message and connect with you shortly.', 'astra-child' ); ?></p>
								<button type="button" class="bi-cta bi-cta--blue bi-form-success__reset">
									<span><?php esc_html_e( 'Send Another Message', 'astra-child' ); ?></span>
								</button>
							</div>

							<div class="bi-form-fields">
								<!-- Two-Column Names on Desktop -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="general_first_name" class="bi-form-label">
											<?php esc_html_e( 'First Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="general_first_name"
											name="first_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'e.g. Gautam', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-general_first_name" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="general_last_name" class="bi-form-label">
											<?php esc_html_e( 'Last Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="general_last_name"
											name="last_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'e.g. Koli', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-general_last_name" aria-live="polite"></span>
									</div>
								</div>

								<!-- Email & Phone -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="general_email" class="bi-form-label">
											<?php esc_html_e( 'Work Email', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="email"
											id="general_email"
											name="email"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'name@company.com', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-general_email" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="general_phone" class="bi-form-label">
											<?php esc_html_e( 'Phone Number', 'astra-child' ); ?>
										</label>
										<input
											type="tel"
											id="general_phone"
											name="phone"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( '+91 98765 43210', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-general_phone" aria-live="polite"></span>
									</div>
								</div>

								<!-- Company Name & Country -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="general_company" class="bi-form-label">
											<?php esc_html_e( 'Company Name', 'astra-child' ); ?>
										</label>
										<input
											type="text"
											id="general_company"
											name="company"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Your organization', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-general_company" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="general_country" class="bi-form-label">
											<?php esc_html_e( 'Country / Region', 'astra-child' ); ?>
										</label>
										<input
											type="text"
											id="general_country"
											name="country"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'e.g. India, United States', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-general_country" aria-live="polite"></span>
									</div>
								</div>

								<!-- Service of Interest Dropdown -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="general_service_interest" class="bi-form-label">
											<?php esc_html_e( 'Service of Interest', 'astra-child' ); ?>
										</label>
										<div class="bi-form-select-wrapper">
											<select id="general_service_interest" name="service_interest" class="bi-form-select">
												<option value=""><?php esc_html_e( 'Select a service area...', 'astra-child' ); ?></option>
												<?php foreach ( $services_taxonomy as $val => $label ) : ?>
													<option value="<?php echo esc_attr( $val ); ?>"><?php echo esc_html( $label ); ?></option>
												<?php endforeach; ?>
											</select>
											<span class="bi-form-select-arrow" aria-hidden="true">
												<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
													<path d="M4 6l4 4 4-4"/>
												</svg>
											</span>
										</div>
										<span class="bi-form-error" id="err-general_service_interest" aria-live="polite"></span>
									</div>
								</div>

								<!-- Message Field -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="general_message" class="bi-form-label">
											<?php esc_html_e( 'Message', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<textarea
											id="general_message"
											name="message"
											class="bi-form-textarea"
											rows="4"
											placeholder="<?php esc_attr_e( 'Tell us about your project, timelines, or questions...', 'astra-child' ); ?>"
											required
											aria-required="true"
										></textarea>
										<span class="bi-form-error" id="err-general_message" aria-live="polite"></span>
									</div>
								</div>

								<!-- Submit Row -->
								<div class="bi-form-row bi-form-row--actions">
									<button type="submit" class="bi-cta bi-cta--blue bi-form-submit">
										<span class="bi-form-submit__text"><?php esc_html_e( 'SEND ENQUIRY', 'astra-child' ); ?></span>
										<span class="bi-cta__icon" aria-hidden="true">
											<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</span>
										<span class="bi-form-spinner" aria-hidden="true"></span>
									</button>
									<span class="bi-form-guarantee"><?php esc_html_e( 'We treat all communication with strict confidentiality.', 'astra-child' ); ?></span>
								</div>
							</div>
						</form>
					</div>

				</div>
			</div>

			<!-- ======================================================================
			     TAB PANEL 2: SERVICES
			     ====================================================================== -->
			<div
				class="bi-tab-panel"
				id="bi-panel-services"
				role="tabpanel"
				aria-labelledby="bi-tab-btn-services"
				tabindex="0"
				hidden
			>
				<div class="bi-tab-panel__grid">

					<!-- Left Column: Services Context -->
					<div class="bi-tab-panel__left">
						<div class="bi-tab-panel__meta-badge">
							<span class="bi-tab-panel__meta-dot" aria-hidden="true"></span>
							<span class="bi-tab-panel__meta-title"><?php esc_html_e( 'CLIENT PARTNERSHIP', 'astra-child' ); ?></span>
						</div>

						<h2 class="bi-tab-panel__title"><?php esc_html_e( 'Services Enquiry', 'astra-child' ); ?></h2>

						<p class="bi-tab-panel__lead">
							<?php esc_html_e( 'Partner with Better Insights to engineer intelligent AI systems, streamline CRM and operations, and accelerate digital growth.', 'astra-child' ); ?>
						</p>

						<div class="bi-contact-card">
							<h3 class="bi-contact-card__heading"><?php esc_html_e( 'Direct Contact Channels', 'astra-child' ); ?></h3>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
										<polyline points="22,6 12,13 2,6"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Email Us', 'astra-child' ); ?></span>
									<a href="mailto:contact@betterinsights.in" class="bi-contact-card__value">contact@betterinsights.in</a>
								</div>
							</div>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Call Us', 'astra-child' ); ?></span>
									<a href="tel:+919509996730" class="bi-contact-card__value">+91 950 999 6730</a>
								</div>
							</div>

							<div class="bi-contact-card__hours">
								<span class="bi-contact-card__hours-dot" aria-hidden="true"></span>
								<span class="bi-contact-card__hours-text"><?php esc_html_e( 'Project scope and scoping calls scheduled promptly', 'astra-child' ); ?></span>
							</div>
						</div>
					</div>

					<!-- Right Column: Services Form -->
					<div class="bi-tab-panel__right">
						<form class="bi-contact-form" data-form-type="services" novalidate>
							<!-- Spam Honeypot Field -->
							<input type="text" name="bi_hp_field" class="bi-form-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
							<input type="hidden" name="tab_type" value="services">

							<!-- Status Notification Box -->
							<div class="bi-form-notice" role="alert" aria-live="polite" style="display: none;"></div>

							<!-- Success Confirmation Overlay -->
							<div class="bi-form-success" style="display: none;">
								<div class="bi-form-success__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<h3 class="bi-form-success__title"><?php esc_html_e( 'Project Enquiry Received!', 'astra-child' ); ?></h3>
								<p class="bi-form-success__desc"><?php esc_html_e( 'Thank you for your interest in partnering with Better Insights. We will review your project parameters and reach out promptly.', 'astra-child' ); ?></p>
								<button type="button" class="bi-cta bi-cta--blue bi-form-success__reset">
									<span><?php esc_html_e( 'Send Another Request', 'astra-child' ); ?></span>
								</button>
							</div>

							<div class="bi-form-fields">
								<!-- Two-Column Names on Desktop -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="services_first_name" class="bi-form-label">
											<?php esc_html_e( 'First Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="services_first_name"
											name="first_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'First name', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-services_first_name" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="services_last_name" class="bi-form-label">
											<?php esc_html_e( 'Last Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="services_last_name"
											name="last_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Last name', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-services_last_name" aria-live="polite"></span>
									</div>
								</div>

								<!-- Email & Phone -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="services_email" class="bi-form-label">
											<?php esc_html_e( 'Work Email', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="email"
											id="services_email"
											name="email"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'name@company.com', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-services_email" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="services_phone" class="bi-form-label">
											<?php esc_html_e( 'Phone Number', 'astra-child' ); ?>
										</label>
										<input
											type="tel"
											id="services_phone"
											name="phone"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( '+91 98765 43210', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-services_phone" aria-live="polite"></span>
									</div>
								</div>

								<!-- Company & Service Required -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="services_company" class="bi-form-label">
											<?php esc_html_e( 'Company Name', 'astra-child' ); ?>
										</label>
										<input
											type="text"
											id="services_company"
											name="company"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Organization name', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-services_company" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="services_required" class="bi-form-label">
											<?php esc_html_e( 'Service Required', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<div class="bi-form-select-wrapper">
											<select id="services_required" name="service_required" class="bi-form-select" required aria-required="true">
												<option value=""><?php esc_html_e( 'Select required service...', 'astra-child' ); ?></option>
												<?php foreach ( $services_taxonomy as $val => $label ) : ?>
													<option value="<?php echo esc_attr( $val ); ?>"><?php echo esc_html( $label ); ?></option>
												<?php endforeach; ?>
											</select>
											<span class="bi-form-select-arrow" aria-hidden="true">
												<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
													<path d="M4 6l4 4 4-4"/>
												</svg>
											</span>
										</div>
										<span class="bi-form-error" id="err-services_required" aria-live="polite"></span>
									</div>
								</div>

								<!-- Project Budget (Optional) -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="services_project_budget" class="bi-form-label">
											<?php esc_html_e( 'Project Budget (Optional)', 'astra-child' ); ?>
										</label>
										<div class="bi-form-select-wrapper">
											<select id="services_project_budget" name="project_budget" class="bi-form-select">
												<option value=""><?php esc_html_e( 'Select approximate budget range...', 'astra-child' ); ?></option>
												<?php foreach ( $budget_ranges as $val => $label ) : ?>
													<option value="<?php echo esc_attr( $val ); ?>"><?php echo esc_html( $label ); ?></option>
												<?php endforeach; ?>
											</select>
											<span class="bi-form-select-arrow" aria-hidden="true">
												<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
													<path d="M4 6l4 4 4-4"/>
												</svg>
											</span>
										</div>
										<span class="bi-form-error" id="err-services_project_budget" aria-live="polite"></span>
									</div>
								</div>

								<!-- Project Details -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="services_project_details" class="bi-form-label">
											<?php esc_html_e( 'Project Details', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<textarea
											id="services_project_details"
											name="project_details"
											class="bi-form-textarea"
											rows="4"
											placeholder="<?php esc_attr_e( 'Please outline your objectives, scope, target milestones, or existing tech stack...', 'astra-child' ); ?>"
											required
											aria-required="true"
										></textarea>
										<span class="bi-form-error" id="err-services_project_details" aria-live="polite"></span>
									</div>
								</div>

								<!-- Submit Row -->
								<div class="bi-form-row bi-form-row--actions">
									<button type="submit" class="bi-cta bi-cta--blue bi-form-submit">
										<span class="bi-form-submit__text"><?php esc_html_e( 'SEND ENQUIRY', 'astra-child' ); ?></span>
										<span class="bi-cta__icon" aria-hidden="true">
											<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</span>
										<span class="bi-form-spinner" aria-hidden="true"></span>
									</button>
									<span class="bi-form-guarantee"><?php esc_html_e( 'We treat all communication with strict confidentiality.', 'astra-child' ); ?></span>
								</div>
							</div>
						</form>
					</div>

				</div>
			</div>

			<!-- ======================================================================
			     TAB PANEL 3: EMPLOYMENT VERIFICATION
			     ====================================================================== -->
			<div
				class="bi-tab-panel"
				id="bi-panel-employment"
				role="tabpanel"
				aria-labelledby="bi-tab-btn-employment"
				tabindex="0"
				hidden
			>
				<div class="bi-tab-panel__grid">

					<!-- Left Column: Employment Verification Context -->
					<div class="bi-tab-panel__left">
						<div class="bi-tab-panel__meta-badge">
							<span class="bi-tab-panel__meta-dot" aria-hidden="true"></span>
							<span class="bi-tab-panel__meta-title"><?php esc_html_e( 'PEOPLE OPERATIONS', 'astra-child' ); ?></span>
						</div>

						<h2 class="bi-tab-panel__title"><?php esc_html_e( 'Employment Verification', 'astra-child' ); ?></h2>

						<p class="bi-tab-panel__lead">
							<?php esc_html_e( 'Official background check and past employment requests are processed securely by our HR operations team. Please provide legitimate corporate verification details.', 'astra-child' ); ?>
						</p>

						<div class="bi-contact-card">
							<h3 class="bi-contact-card__heading"><?php esc_html_e( 'Direct Contact Channels', 'astra-child' ); ?></h3>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
										<polyline points="22,6 12,13 2,6"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Email Us', 'astra-child' ); ?></span>
									<a href="mailto:contact@betterinsights.in" class="bi-contact-card__value">contact@betterinsights.in</a>
								</div>
							</div>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Call Us', 'astra-child' ); ?></span>
									<a href="tel:+919509996730" class="bi-contact-card__value">+91 950 999 6730</a>
								</div>
							</div>

							<div class="bi-contact-card__hours">
								<span class="bi-contact-card__hours-dot" aria-hidden="true"></span>
								<span class="bi-contact-card__hours-text"><?php esc_html_e( 'Verified within 2 to 3 corporate business days', 'astra-child' ); ?></span>
							</div>
						</div>
					</div>

					<!-- Right Column: Employment Verification Form -->
					<div class="bi-tab-panel__right">
						<form class="bi-contact-form" data-form-type="employment" novalidate>
							<!-- Spam Honeypot Field -->
							<input type="text" name="bi_hp_field" class="bi-form-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
							<input type="hidden" name="tab_type" value="employment">

							<!-- Status Notification Box -->
							<div class="bi-form-notice" role="alert" aria-live="polite" style="display: none;"></div>

							<!-- Success Confirmation Overlay -->
							<div class="bi-form-success" style="display: none;">
								<div class="bi-form-success__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<h3 class="bi-form-success__title"><?php esc_html_e( 'Verification Request Submitted', 'astra-child' ); ?></h3>
								<p class="bi-form-success__desc"><?php esc_html_e( 'Our People Operations team has received your verification request and will validate credentials accordingly.', 'astra-child' ); ?></p>
								<button type="button" class="bi-cta bi-cta--blue bi-form-success__reset">
									<span><?php esc_html_e( 'Submit Another Verification', 'astra-child' ); ?></span>
								</button>
							</div>

							<div class="bi-form-fields">
								<!-- Requester's Name & Organization -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="emp_requester_name" class="bi-form-label">
											<?php esc_html_e( "Requester's Name", 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="emp_requester_name"
											name="requester_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Your full name', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-emp_requester_name" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="emp_organization" class="bi-form-label">
											<?php esc_html_e( 'Organization / Agency', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="emp_organization"
											name="organization"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Requesting agency or company', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-emp_organization" aria-live="polite"></span>
									</div>
								</div>

								<!-- Work Email & Phone -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="emp_email" class="bi-form-label">
											<?php esc_html_e( 'Work Email', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="email"
											id="emp_email"
											name="email"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'official.email@organization.com', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-emp_email" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="emp_phone" class="bi-form-label">
											<?php esc_html_e( 'Phone Number', 'astra-child' ); ?>
										</label>
										<input
											type="tel"
											id="emp_phone"
											name="phone"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( '+1 555-0199 or +91...', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-emp_phone" aria-live="polite"></span>
									</div>
								</div>

								<!-- Employee / Former Employee Name -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="emp_employee_name" class="bi-form-label">
											<?php esc_html_e( 'Employee / Former Employee Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="emp_employee_name"
											name="employee_name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Name of individual being verified', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-emp_employee_name" aria-live="polite"></span>
									</div>
								</div>

								<!-- Verification Details -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="emp_verification_details" class="bi-form-label">
											<?php esc_html_e( 'Verification Details', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<textarea
											id="emp_verification_details"
											name="verification_details"
											class="bi-form-textarea"
											rows="4"
											placeholder="<?php esc_attr_e( 'Include required details (e.g. designation, dates of employment, reference/case ID)...', 'astra-child' ); ?>"
											required
											aria-required="true"
										></textarea>
										<span class="bi-form-error" id="err-emp_verification_details" aria-live="polite"></span>
									</div>
								</div>

								<!-- Submit Row -->
								<div class="bi-form-row bi-form-row--actions">
									<button type="submit" class="bi-cta bi-cta--blue bi-form-submit">
										<span class="bi-form-submit__text"><?php esc_html_e( 'SEND ENQUIRY', 'astra-child' ); ?></span>
										<span class="bi-cta__icon" aria-hidden="true">
											<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</span>
										<span class="bi-form-spinner" aria-hidden="true"></span>
									</button>
									<span class="bi-form-guarantee"><?php esc_html_e( 'We treat all communication with strict confidentiality.', 'astra-child' ); ?></span>
								</div>
							</div>
						</form>
					</div>

				</div>
			</div>

			<!-- ======================================================================
			     TAB PANEL 4: PRESS
			     ====================================================================== -->
			<div
				class="bi-tab-panel"
				id="bi-panel-press"
				role="tabpanel"
				aria-labelledby="bi-tab-btn-press"
				tabindex="0"
				hidden
			>
				<div class="bi-tab-panel__grid">

					<!-- Left Column: Press Context -->
					<div class="bi-tab-panel__left">
						<div class="bi-tab-panel__meta-badge">
							<span class="bi-tab-panel__meta-dot" aria-hidden="true"></span>
							<span class="bi-tab-panel__meta-title"><?php esc_html_e( 'COMMUNICATIONS & MEDIA', 'astra-child' ); ?></span>
						</div>

						<h2 class="bi-tab-panel__title"><?php esc_html_e( 'Press & Media', 'astra-child' ); ?></h2>

						<p class="bi-tab-panel__lead">
							<?php esc_html_e( 'Connect with our media communications team for executive interviews, expert commentary on AI and digital transformation, or official press kit assets.', 'astra-child' ); ?>
						</p>

						<div class="bi-contact-card">
							<h3 class="bi-contact-card__heading"><?php esc_html_e( 'Direct Contact Channels', 'astra-child' ); ?></h3>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
										<polyline points="22,6 12,13 2,6"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Email Us', 'astra-child' ); ?></span>
									<a href="mailto:contact@betterinsights.in" class="bi-contact-card__value">contact@betterinsights.in</a>
								</div>
							</div>

							<div class="bi-contact-card__item">
								<span class="bi-contact-card__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
									</svg>
								</span>
								<div class="bi-contact-card__details">
									<span class="bi-contact-card__label"><?php esc_html_e( 'Call Us', 'astra-child' ); ?></span>
									<a href="tel:+919509996730" class="bi-contact-card__value">+91 950 999 6730</a>
								</div>
							</div>

							<div class="bi-contact-card__hours">
								<span class="bi-contact-card__hours-dot" aria-hidden="true"></span>
								<span class="bi-contact-card__hours-text"><?php esc_html_e( 'Media deadline inquiries are prioritized promptly', 'astra-child' ); ?></span>
							</div>
						</div>
					</div>

					<!-- Right Column: Press Form -->
					<div class="bi-tab-panel__right">
						<form class="bi-contact-form" data-form-type="press" novalidate>
							<!-- Spam Honeypot Field -->
							<input type="text" name="bi_hp_field" class="bi-form-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
							<input type="hidden" name="tab_type" value="press">

							<!-- Status Notification Box -->
							<div class="bi-form-notice" role="alert" aria-live="polite" style="display: none;"></div>

							<!-- Success Confirmation Overlay -->
							<div class="bi-form-success" style="display: none;">
								<div class="bi-form-success__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<h3 class="bi-form-success__title"><?php esc_html_e( 'Press Enquiry Received!', 'astra-child' ); ?></h3>
								<p class="bi-form-success__desc"><?php esc_html_e( 'Thank you for contacting Better Insights media communications. We will respond promptly regarding your coverage or publication needs.', 'astra-child' ); ?></p>
								<button type="button" class="bi-cta bi-cta--blue bi-form-success__reset">
									<span><?php esc_html_e( 'Send Another Press Enquiry', 'astra-child' ); ?></span>
								</button>
							</div>

							<div class="bi-form-fields">
								<!-- Name & Media Organization -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="press_name" class="bi-form-label">
											<?php esc_html_e( 'Name', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="press_name"
											name="name"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Your full name', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-press_name" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="press_media_org" class="bi-form-label">
											<?php esc_html_e( 'Media Organization', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="press_media_org"
											name="media_org"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Publication, Network, or Outlet', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-press_media_org" aria-live="polite"></span>
									</div>
								</div>

								<!-- Work Email & Phone -->
								<div class="bi-form-row bi-form-row--two-col">
									<div class="bi-form-group">
										<label for="press_email" class="bi-form-label">
											<?php esc_html_e( 'Work Email', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="email"
											id="press_email"
											name="email"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'name@publication.com', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-press_email" aria-live="polite"></span>
									</div>

									<div class="bi-form-group">
										<label for="press_phone" class="bi-form-label">
											<?php esc_html_e( 'Phone Number', 'astra-child' ); ?>
										</label>
										<input
											type="tel"
											id="press_phone"
											name="phone"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( '+91 98765 43210', 'astra-child' ); ?>"
										>
										<span class="bi-form-error" id="err-press_phone" aria-live="polite"></span>
									</div>
								</div>

								<!-- Subject -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="press_subject" class="bi-form-label">
											<?php esc_html_e( 'Subject', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<input
											type="text"
											id="press_subject"
											name="subject"
											class="bi-form-input"
											placeholder="<?php esc_attr_e( 'Brief subject / interview topic / deadline date', 'astra-child' ); ?>"
											required
											aria-required="true"
										>
										<span class="bi-form-error" id="err-press_subject" aria-live="polite"></span>
									</div>
								</div>

								<!-- Message -->
								<div class="bi-form-row">
									<div class="bi-form-group">
										<label for="press_message" class="bi-form-label">
											<?php esc_html_e( 'Message', 'astra-child' ); ?> <span class="bi-form-required" aria-hidden="true">*</span>
										</label>
										<textarea
											id="press_message"
											name="message"
											class="bi-form-textarea"
											rows="4"
											placeholder="<?php esc_attr_e( 'Describe your story, questions, publication date, or asset requirements...', 'astra-child' ); ?>"
											required
											aria-required="true"
										></textarea>
										<span class="bi-form-error" id="err-press_message" aria-live="polite"></span>
									</div>
								</div>

								<!-- Submit Row -->
								<div class="bi-form-row bi-form-row--actions">
									<button type="submit" class="bi-cta bi-cta--blue bi-form-submit">
										<span class="bi-form-submit__text"><?php esc_html_e( 'SEND ENQUIRY', 'astra-child' ); ?></span>
										<span class="bi-cta__icon" aria-hidden="true">
											<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</span>
										<span class="bi-form-spinner" aria-hidden="true"></span>
									</button>
									<span class="bi-form-guarantee"><?php esc_html_e( 'We treat all communication with strict confidentiality.', 'astra-child' ); ?></span>
								</div>
							</div>
						</form>
					</div>

				</div>
			</div>

		</div>
	</div>
</section>
