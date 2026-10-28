/**
 * Better Insights - Career Application Modal & AJAX Submission
 *
 * Handles modal accessibility, focus trapping, file dropzone interaction,
 * client-side validation, and asynchronous multipart submission.
 *
 * @package Astra_Child
 */

(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var modal = document.getElementById('biCareerModal');
		if (!modal) {
			return;
		}

		var backdrop = document.getElementById('biCareerModalBackdrop');
		var closeBtn = document.getElementById('biCareerModalClose');
		var doneBtn = document.getElementById('biCareerDoneBtn');
		var form = document.getElementById('biCareerForm');
		var successView = document.getElementById('biCareerSuccess');
		var successMsg = document.getElementById('biCareerSuccessMessage');
		var alertBox = document.getElementById('biCareerFormAlert');
		var jobNameDisplay = document.getElementById('biCareerModalJobName');

		// Inputs
		var inputFullName = document.getElementById('biAppFullName');
		var inputEmail = document.getElementById('biAppEmail');
		var inputPhone = document.getElementById('biAppPhone');
		var inputPosition = document.getElementById('biAppPosition');
		var inputPositionId = document.getElementById('biAppPositionId');
		var inputLinkedIn = document.getElementById('biAppLinkedIn');
		var inputCoverLetter = document.getElementById('biAppCoverLetter');
		var inputConsent = document.getElementById('biAppConsent');
		var inputResume = document.getElementById('biAppResume');

		// Dropzone elements
		var dropzone = document.getElementById('biCareerDropzone');
		var dropzonePrompt = document.getElementById('biDropzonePrompt');
		var dropzoneFile = document.getElementById('biDropzoneFile');
		var dropzoneFileName = document.getElementById('biDropzoneFileName');
		var dropzoneFileSize = document.getElementById('biDropzoneFileSize');
		var dropzoneRemoveBtn = document.getElementById('biDropzoneRemove');

		// Button & Spinner
		var submitBtn = document.getElementById('biCareerSubmitBtn');
		var btnSpinner = document.getElementById('biBtnSpinner');
		var btnLabel = document.getElementById('biBtnLabel');

		var lastFocusedElement = null;
		var allowedExtensions = ['pdf', 'doc', 'docx'];
		var maxFileSize = 10 * 1024 * 1024; // 10MB

		// Localized variables fallback
		var config = window.bi_career_vars || {
			ajax_url: '/wp-admin/admin-ajax.php',
			nonce: '',
			i18n: {
				submitting: 'Submitting Application...',
				submit_btn: 'Submit Application',
				file_too_big: 'File size exceeds maximum limit of 10 MB.',
				invalid_ext: 'Invalid format. Please upload a PDF, DOC, or DOCX document.',
				fill_required: 'Please complete all required fields.',
				server_error: 'An unexpected error occurred. Please try again or email hr@betterinsights.in.'
			}
		};

		/**
		 * ----------------------------------------------------------------------
		 * Modal Open & Close Functions
		 * ----------------------------------------------------------------------
		 */
		function openModal(triggerElement) {
			lastFocusedElement = triggerElement || document.activeElement;

			// Extract job data from trigger
			var jobTitle = '';
			var jobId = '';

			if (triggerElement) {
				jobTitle = triggerElement.getAttribute('data-job-title') || '';
				jobId = triggerElement.getAttribute('data-job-id') || '';
			}

			if (!jobTitle) {
				jobTitle = 'Open Position';
			}

			// Update modal heading & position input
			if (jobNameDisplay) {
				jobNameDisplay.textContent = jobTitle;
			}
			if (inputPosition) {
				inputPosition.value = jobTitle !== 'Open Position' ? jobTitle : '';
			}
			if (inputPositionId) {
				inputPositionId.value = jobId;
			}

			// Reset form state if coming from previous submission
			if (successView && !successView.hidden) {
				resetForm();
			}

			// Open modal dialog
			modal.removeAttribute('hidden');
			document.body.classList.add('bi-career-modal-open');

			// Focus management: focus first input field
			setTimeout(function () {
				if (inputFullName) {
					inputFullName.focus();
				} else if (closeBtn) {
					closeBtn.focus();
				}
			}, 50);

			document.addEventListener('keydown', handleKeydown);
		}

		function closeModal() {
			modal.setAttribute('hidden', '');
			document.body.classList.remove('bi-career-modal-open');
			document.removeEventListener('keydown', handleKeydown);

			// Return focus to triggering button
			if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
				lastFocusedElement.focus();
			}
		}

		function handleKeydown(e) {
			if (e.key === 'Escape' || e.keyCode === 27) {
				closeModal();
				return;
			}

			// Focus trapping inside modal dialog
			if (e.key === 'Tab' || e.keyCode === 9) {
				var focusableElements = modal.querySelectorAll(
					'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);
				var firstElement = focusableElements[0];
				var lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						lastElement.focus();
						e.preventDefault();
					}
				} else {
					if (document.activeElement === lastElement) {
						firstElement.focus();
						e.preventDefault();
					}
				}
			}
		}

		// Attach triggers to all Apply buttons
		var applyButtons = document.querySelectorAll('[data-open-career-modal="true"], .bi-job-apply-btn');
		applyButtons.forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				openModal(btn);
			});
		});

		if (backdrop) {
			backdrop.addEventListener('click', closeModal);
		}
		if (closeBtn) {
			closeBtn.addEventListener('click', closeModal);
		}
		if (doneBtn) {
			doneBtn.addEventListener('click', closeModal);
		}

		/**
		 * ----------------------------------------------------------------------
		 * Resume Dropzone Handling
		 * ----------------------------------------------------------------------
		 */
		function formatBytes(bytes) {
			if (bytes === 0) return '0 Bytes';
			var k = 1024;
			var sizes = ['Bytes', 'KB', 'MB', 'GB'];
			var i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
		}

		function handleSelectedFile(file) {
			clearFieldError('resume');

			if (!file) {
				return;
			}

			var ext = file.name.split('.').pop().toLowerCase();
			if (allowedExtensions.indexOf(ext) === -1) {
				showFieldError('resume', config.i18n.invalid_ext);
				clearFileInput();
				return;
			}

			if (file.size > maxFileSize) {
				showFieldError('resume', config.i18n.file_too_big);
				clearFileInput();
				return;
			}

			// Show file display
			if (dropzoneFileName) {
				dropzoneFileName.textContent = file.name;
			}
			if (dropzoneFileSize) {
				dropzoneFileSize.textContent = formatBytes(file.size);
			}

			if (dropzonePrompt) {
				dropzonePrompt.setAttribute('hidden', '');
			}
			if (dropzoneFile) {
				dropzoneFile.removeAttribute('hidden');
			}
			if (dropzone) {
				dropzone.classList.remove('is-invalid');
			}
		}

		function clearFileInput() {
			if (inputResume) {
				inputResume.value = '';
			}
			if (dropzonePrompt) {
				dropzonePrompt.removeAttribute('hidden');
			}
			if (dropzoneFile) {
				dropzoneFile.setAttribute('hidden', '');
			}
		}

		if (inputResume) {
			inputResume.addEventListener('change', function () {
				if (this.files && this.files[0]) {
					handleSelectedFile(this.files[0]);
				}
			});
		}

		if (dropzoneRemoveBtn) {
			dropzoneRemoveBtn.addEventListener('click', function (e) {
				e.stopPropagation();
				clearFileInput();
			});
		}

		// Drag and drop events
		if (dropzone) {
			['dragenter', 'dragover'].forEach(function (eventName) {
				dropzone.addEventListener(eventName, function (e) {
					e.preventDefault();
					e.stopPropagation();
					dropzone.classList.add('is-dragover');
				});
			});

			['dragleave', 'drop'].forEach(function (eventName) {
				dropzone.addEventListener(eventName, function (e) {
					e.preventDefault();
					e.stopPropagation();
					dropzone.classList.remove('is-dragover');
				});
			});

			dropzone.addEventListener('drop', function (e) {
				if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
					var file = e.dataTransfer.files[0];
					if (inputResume) {
						// Assign file to input
						try {
							var container = new DataTransfer();
							container.items.add(file);
							inputResume.files = container.files;
						} catch (err) {
							// fallback
						}
					}
					handleSelectedFile(file);
				}
			});
		}

		/**
		 * ----------------------------------------------------------------------
		 * Inline Validation Helpers
		 * ----------------------------------------------------------------------
		 */
		function showFieldError(fieldName, message) {
			var errorEl = document.getElementById('biApp' + capitalize(fieldName) + 'Error');
			if (errorEl) {
				errorEl.textContent = message;
			}
			var inputEl = document.getElementById('biApp' + capitalize(fieldName));
			if (inputEl) {
				inputEl.classList.add('is-invalid');
			}
			if (fieldName === 'resume' && dropzone) {
				dropzone.classList.add('is-invalid');
			}
		}

		function clearFieldError(fieldName) {
			var errorEl = document.getElementById('biApp' + capitalize(fieldName) + 'Error');
			if (errorEl) {
				errorEl.textContent = '';
			}
			var inputEl = document.getElementById('biApp' + capitalize(fieldName));
			if (inputEl) {
				inputEl.classList.remove('is-invalid');
			}
			if (fieldName === 'resume' && dropzone) {
				dropzone.classList.remove('is-invalid');
			}
		}

		function clearAllErrors() {
			var errorSpans = form.querySelectorAll('.bi-field-error');
			errorSpans.forEach(function (el) {
				el.textContent = '';
			});
			var invalidInputs = form.querySelectorAll('.is-invalid');
			invalidInputs.forEach(function (el) {
				el.classList.remove('is-invalid');
			});
			if (alertBox) {
				alertBox.setAttribute('hidden', '');
				alertBox.textContent = '';
			}
		}

		function capitalize(str) {
			if (!str) return '';
			if (str === 'full_name') return 'FullName';
			if (str === 'cover_letter') return 'CoverLetter';
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		function isValidEmail(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		}

		// Real-time error clearing on user input
		if (inputFullName) {
			inputFullName.addEventListener('input', function () {
				if (this.value.trim().length >= 2) clearFieldError('full_name');
			});
		}
		if (inputEmail) {
			inputEmail.addEventListener('input', function () {
				if (isValidEmail(this.value.trim())) clearFieldError('email');
			});
		}
		if (inputPhone) {
			inputPhone.addEventListener('input', function () {
				if (this.value.trim().length >= 6) clearFieldError('phone');
			});
		}
		if (inputPosition) {
			inputPosition.addEventListener('input', function () {
				if (this.value.trim().length > 0) clearFieldError('position');
			});
		}
		if (inputConsent) {
			inputConsent.addEventListener('change', function () {
				if (this.checked) clearFieldError('consent');
			});
		}

		/**
		 * ----------------------------------------------------------------------
		 * Form Submission Handler
		 * ----------------------------------------------------------------------
		 */
		function validateForm() {
			clearAllErrors();
			var isValid = true;
			var firstInvalidField = null;

			// 1. Full Name
			if (!inputFullName || inputFullName.value.trim().length < 2) {
				showFieldError('full_name', 'Please enter your full name.');
				isValid = false;
				firstInvalidField = firstInvalidField || inputFullName;
			}

			// 2. Email Address
			if (!inputEmail || !isValidEmail(inputEmail.value.trim())) {
				showFieldError('email', 'Please enter a valid email address.');
				isValid = false;
				firstInvalidField = firstInvalidField || inputEmail;
			}

			// 3. Phone Number
			if (!inputPhone || inputPhone.value.trim().length < 6) {
				showFieldError('phone', 'Please enter a valid phone number.');
				isValid = false;
				firstInvalidField = firstInvalidField || inputPhone;
			}

			// 4. Position
			if (!inputPosition || inputPosition.value.trim().length === 0) {
				showFieldError('position', 'Please specify the position you are applying for.');
				isValid = false;
				firstInvalidField = firstInvalidField || inputPosition;
			}

			// 5. Resume
			if (!inputResume || !inputResume.files || !inputResume.files[0]) {
				showFieldError('resume', 'Please attach your Resume/CV (PDF, DOC, or DOCX).');
				isValid = false;
				firstInvalidField = firstInvalidField || dropzone;
			}

			// 6. LinkedIn (optional, but validate format if present)
			if (inputLinkedIn && inputLinkedIn.value.trim().length > 0) {
				var liVal = inputLinkedIn.value.trim();
				if (!/^https?:\/\//i.test(liVal)) {
					showFieldError('linkedin', 'Please include http:// or https:// in your LinkedIn URL.');
					isValid = false;
					firstInvalidField = firstInvalidField || inputLinkedIn;
				}
			}

			// 7. Consent
			if (!inputConsent || !inputConsent.checked) {
				showFieldError('consent', 'Consent is required to submit your application.');
				isValid = false;
				firstInvalidField = firstInvalidField || inputConsent;
			}

			if (!isValid && firstInvalidField) {
				if (typeof firstInvalidField.focus === 'function') {
					firstInvalidField.focus();
				}
			}

			return isValid;
		}

		function resetForm() {
			form.reset();
			clearFileInput();
			clearAllErrors();
			if (form) {
				form.removeAttribute('hidden');
			}
			if (successView) {
				successView.setAttribute('hidden', '');
			}
			if (submitBtn) {
				submitBtn.disabled = false;
			}
			if (btnSpinner) {
				btnSpinner.setAttribute('hidden', '');
			}
			if (btnLabel) {
				btnLabel.textContent = config.i18n.submit_btn;
			}
		}

		if (form) {
			form.addEventListener('submit', function (e) {
				e.preventDefault();

				if (!validateForm()) {
					if (alertBox) {
						alertBox.textContent = config.i18n.fill_required;
						alertBox.className = 'bi-career-form__alert';
						alertBox.removeAttribute('hidden');
					}
					return;
				}

				// Loading state
				if (submitBtn) {
					submitBtn.disabled = true;
				}
				if (btnSpinner) {
					btnSpinner.removeAttribute('hidden');
				}
				if (btnLabel) {
					btnLabel.textContent = config.i18n.submitting;
				}
				if (alertBox) {
					alertBox.setAttribute('hidden', '');
				}

				var formData = new FormData(form);

				var xhr = new XMLHttpRequest();
				xhr.open('POST', config.ajax_url, true);

				xhr.onload = function () {
					// Reset button state
					if (submitBtn) {
						submitBtn.disabled = false;
					}
					if (btnSpinner) {
						btnSpinner.setAttribute('hidden', '');
					}
					if (btnLabel) {
						btnLabel.textContent = config.i18n.submit_btn;
					}

					var response;
					try {
						response = JSON.parse(xhr.responseText);
					} catch (err) {
						response = null;
					}

					if (xhr.status >= 200 && xhr.status < 300 && response && response.success) {
						// Success state
						form.setAttribute('hidden', '');
						if (successMsg && response.data && response.data.message) {
							successMsg.textContent = response.data.message;
						}
						if (successView) {
							successView.removeAttribute('hidden');
						}
					} else {
						// Error state
						var errorMessage = (response && response.data && response.data.message) ? response.data.message : config.i18n.server_error;
						if (alertBox) {
							alertBox.textContent = errorMessage;
							alertBox.className = 'bi-career-form__alert';
							alertBox.removeAttribute('hidden');
						}

						// Display field-specific errors if returned
						if (response && response.data && response.data.errors) {
							for (var field in response.data.errors) {
								if (response.data.errors.hasOwnProperty(field)) {
									showFieldError(field, response.data.errors[field]);
								}
							}
						}
					}
				};

				xhr.onerror = function () {
					if (submitBtn) {
						submitBtn.disabled = false;
					}
					if (btnSpinner) {
						btnSpinner.setAttribute('hidden', '');
					}
					if (btnLabel) {
						btnLabel.textContent = config.i18n.submit_btn;
					}
					if (alertBox) {
						alertBox.textContent = config.i18n.server_error;
						alertBox.className = 'bi-career-form__alert';
						alertBox.removeAttribute('hidden');
					}
				};

				xhr.send(formData);
			});
		}
	});
})();
