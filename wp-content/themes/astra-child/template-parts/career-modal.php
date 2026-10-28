<?php
/**
 * Better Insights - Career Application Popup Modal Template
 *
 * Responsive, accessible modal with inline validation, drag-and-drop resume upload,
 * anti-spam protection, and high-contrast clean branding.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="bi-career-modal" id="biCareerModal" role="dialog" aria-modal="true" aria-labelledby="biCareerModalTitle" hidden>
	<div class="bi-career-modal__backdrop" id="biCareerModalBackdrop"></div>

	<div class="bi-career-modal__dialog" role="document">
		<!-- Close Button -->
		<button type="button" class="bi-career-modal__close" id="biCareerModalClose" aria-label="<?php esc_attr_e( 'Close application modal', 'astra-child' ); ?>">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>

		<!-- Modal Header -->
		<header class="bi-career-modal__header">
			<span class="bi-career-modal__eyebrow"><?php esc_html_e( 'CAREERS AT BETTER INSIGHTS', 'astra-child' ); ?></span>
			<h2 class="bi-career-modal__title" id="biCareerModalTitle">
				<?php esc_html_e( 'Apply for', 'astra-child' ); ?> <span class="bi-career-modal__job-name" id="biCareerModalJobName"><?php esc_html_e( 'Open Position', 'astra-child' ); ?></span>
			</h2>
			<p class="bi-career-modal__sub">
				<?php esc_html_e( 'Join our team of engineers, growth strategists, and digital architects. Submit your details below.', 'astra-child' ); ?>
			</p>
		</header>

		<!-- Main Application Form -->
		<form id="biCareerForm" class="bi-career-form" enctype="multipart/form-data" novalidate>
			<input type="hidden" name="action" value="bi_submit_career_application">
			<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'bi_careers_nonce' ) ); ?>">
			<input type="hidden" name="position_id" id="biAppPositionId" value="">
			
			<!-- Honeypot anti-spam field -->
			<div style="display:none !important; visibility:hidden !important;" aria-hidden="true">
				<label for="bi_hp_career"><?php esc_html_e( 'Leave this field blank', 'astra-child' ); ?></label>
				<input type="text" name="bi_hp_career" id="bi_hp_career" tabindex="-1" autocomplete="off">
			</div>

			<!-- Form Alert Message Banner -->
			<div class="bi-career-form__alert" id="biCareerFormAlert" role="alert" hidden></div>

			<div class="bi-career-form__grid">
				<!-- Full Name -->
				<div class="bi-form-field bi-form-field--half">
					<label for="biAppFullName" class="bi-form-label">
						<?php esc_html_e( 'Full Name', 'astra-child' ); ?> <span class="bi-req" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="biAppFullName"
						name="full_name"
						class="bi-form-input"
						placeholder="<?php esc_attr_e( 'e.g. Alex Morgan', 'astra-child' ); ?>"
						required
						autocomplete="name"
						maxlength="100"
					>
					<span class="bi-field-error" id="biAppFullNameError" aria-live="polite"></span>
				</div>

				<!-- Email Address -->
				<div class="bi-form-field bi-form-field--half">
					<label for="biAppEmail" class="bi-form-label">
						<?php esc_html_e( 'Email Address', 'astra-child' ); ?> <span class="bi-req" aria-hidden="true">*</span>
					</label>
					<input
						type="email"
						id="biAppEmail"
						name="email"
						class="bi-form-input"
						placeholder="<?php esc_attr_e( 'e.g. alex.morgan@example.com', 'astra-child' ); ?>"
						required
						autocomplete="email"
					>
					<span class="bi-field-error" id="biAppEmailError" aria-live="polite"></span>
				</div>

				<!-- Phone Number -->
				<div class="bi-form-field bi-form-field--half">
					<label for="biAppPhone" class="bi-form-label">
						<?php esc_html_e( 'Phone Number', 'astra-child' ); ?> <span class="bi-req" aria-hidden="true">*</span>
					</label>
					<input
						type="tel"
						id="biAppPhone"
						name="phone"
						class="bi-form-input"
						placeholder="<?php esc_attr_e( 'e.g. +91 98765 43210', 'astra-child' ); ?>"
						required
						autocomplete="tel"
					>
					<span class="bi-field-error" id="biAppPhoneError" aria-live="polite"></span>
				</div>

				<!-- Position (Prefilled & Selectable) -->
				<div class="bi-form-field bi-form-field--half">
					<label for="biAppPosition" class="bi-form-label">
						<?php esc_html_e( 'Position Applying For', 'astra-child' ); ?> <span class="bi-req" aria-hidden="true">*</span>
					</label>
					<input
						type="text"
						id="biAppPosition"
						name="position"
						class="bi-form-input"
						placeholder="<?php esc_attr_e( 'Position title', 'astra-child' ); ?>"
						required
					>
					<span class="bi-field-error" id="biAppPositionError" aria-live="polite"></span>
				</div>

				<!-- Resume Upload Field (Required) -->
				<div class="bi-form-field bi-form-field--full">
					<label class="bi-form-label" id="biAppResumeLabel">
						<?php esc_html_e( 'Resume / Curriculum Vitae', 'astra-child' ); ?> <span class="bi-req" aria-hidden="true">*</span>
						<span class="bi-form-hint"><?php esc_html_e( '(PDF, DOC, or DOCX, max 10 MB)', 'astra-child' ); ?></span>
					</label>
					
					<div class="bi-dropzone" id="biCareerDropzone" tabindex="0" role="button" aria-labelledby="biAppResumeLabel">
						<input
							type="file"
							id="biAppResume"
							name="resume"
							class="bi-dropzone__input"
							accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
							required
							aria-label="<?php esc_attr_e( 'Upload Resume in PDF, DOC, or DOCX format', 'astra-child' ); ?>"
						>
						<div class="bi-dropzone__prompt" id="biDropzonePrompt">
							<div class="bi-dropzone__icon-wrap">
								<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
							</div>
							<div class="bi-dropzone__text">
								<strong><?php esc_html_e( 'Click to browse', 'astra-child' ); ?></strong> <?php esc_html_e( 'or drag & drop your resume file here', 'astra-child' ); ?>
							</div>
							<div class="bi-dropzone__sub"><?php esc_html_e( 'Supported formats: PDF, DOC, DOCX up to 10 MB', 'astra-child' ); ?></div>
						</div>

						<!-- Selected File Badge (Shown when file selected) -->
						<div class="bi-dropzone__file" id="biDropzoneFile" hidden>
							<div class="bi-dropzone__file-icon">
								<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
									<polyline points="14 2 14 8 20 8"></polyline>
									<line x1="16" y1="13" x2="8" y2="13"></line>
									<line x1="16" y1="17" x2="8" y2="17"></line>
								</svg>
							</div>
							<div class="bi-dropzone__file-meta">
								<span class="bi-dropzone__file-name" id="biDropzoneFileName"><?php esc_html_e( 'resume.pdf', 'astra-child' ); ?></span>
								<span class="bi-dropzone__file-size" id="biDropzoneFileSize"><?php esc_html_e( '1.2 MB', 'astra-child' ); ?></span>
							</div>
							<button type="button" class="bi-dropzone__remove-btn" id="biDropzoneRemove" aria-label="<?php esc_attr_e( 'Remove file', 'astra-child' ); ?>">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>
					</div>
					<span class="bi-field-error" id="biAppResumeError" aria-live="polite"></span>
				</div>

				<!-- LinkedIn Profile (Optional) -->
				<div class="bi-form-field bi-form-field--full">
					<label for="biAppLinkedIn" class="bi-form-label">
						<?php esc_html_e( 'LinkedIn Profile URL', 'astra-child' ); ?> <span class="bi-opt"><?php esc_html_e( '(Optional)', 'astra-child' ); ?></span>
					</label>
					<input
						type="url"
						id="biAppLinkedIn"
						name="linkedin"
						class="bi-form-input"
						placeholder="<?php esc_attr_e( 'https://www.linkedin.com/in/yourname', 'astra-child' ); ?>"
						autocomplete="url"
					>
					<span class="bi-field-error" id="biAppLinkedInError" aria-live="polite"></span>
				</div>

				<!-- Cover Letter / Message (Optional) -->
				<div class="bi-form-field bi-form-field--full">
					<label for="biAppCoverLetter" class="bi-form-label">
						<?php esc_html_e( 'Cover Letter / Note', 'astra-child' ); ?> <span class="bi-opt"><?php esc_html_e( '(Optional)', 'astra-child' ); ?></span>
					</label>
					<textarea
						id="biAppCoverLetter"
						name="cover_letter"
						class="bi-form-textarea"
						rows="3"
						placeholder="<?php esc_attr_e( 'Briefly highlight your relevant experience, key achievements, or motivation for joining Better Insights...', 'astra-child' ); ?>"
					></textarea>
					<span class="bi-field-error" id="biAppCoverLetterError" aria-live="polite"></span>
				</div>

				<!-- Consent Checkbox (Required) -->
				<div class="bi-form-field bi-form-field--full bi-form-field--consent">
					<label class="bi-consent-label" for="biAppConsent">
						<input
							type="checkbox"
							id="biAppConsent"
							name="consent"
							value="1"
							class="bi-consent-checkbox"
							required
						>
						<span class="bi-consent-text">
							<?php
							printf(
								/* translators: %s: privacy policy URL */
								esc_html__( 'I consent to Better Insights processing my application details, contact information, and resume for recruitment in accordance with the %s.', 'astra-child' ),
								'<a href="' . esc_url( home_url( '/privacy-policy/' ) ) . '" target="_blank" rel="noopener noreferrer">' . esc_html__( 'Privacy Policy', 'astra-child' ) . '</a>'
							);
							?>
							<span class="bi-req" aria-hidden="true">*</span>
						</span>
					</label>
					<span class="bi-field-error" id="biAppConsentError" aria-live="polite"></span>
				</div>
			</div>

			<!-- Form Submission Actions -->
			<div class="bi-career-form__actions">
				<button type="submit" class="bi-career-submit-btn" id="biCareerSubmitBtn">
					<span class="bi-btn-spinner" id="biBtnSpinner" aria-hidden="true" hidden></span>
					<span class="bi-btn-label" id="biBtnLabel"><?php esc_html_e( 'Submit Application', 'astra-child' ); ?></span>
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="bi-btn-arrow">
						<line x1="7" y1="17" x2="17" y2="7"></line>
						<polyline points="7 7 17 7 17 17"></polyline>
					</svg>
				</button>
			</div>
		</form>

		<!-- Success Confirmation Screen -->
		<div class="bi-career-success" id="biCareerSuccess" hidden>
			<div class="bi-career-success__icon">
				<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
					<polyline points="22 4 12 14.01 9 11.01"></polyline>
				</svg>
			</div>
			<h3 class="bi-career-success__title"><?php esc_html_e( 'Application Submitted Successfully!', 'astra-child' ); ?></h3>
			<p class="bi-career-success__message" id="biCareerSuccessMessage">
				<?php esc_html_e( 'Thank you for your interest in joining Better Insights. We have received your application and resume. Our talent acquisition and technical leadership team will review your qualifications and contact you soon.', 'astra-child' ); ?>
			</p>
			<div class="bi-career-success__action">
				<button type="button" class="bi-career-btn-done" id="biCareerDoneBtn">
					<?php esc_html_e( 'Close & Return to Careers', 'astra-child' ); ?>
				</button>
			</div>
		</div>

	</div>
</div>
