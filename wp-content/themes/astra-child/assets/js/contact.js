/**
 * Better Insights - Contact Page Master Interactive Controller
 *
 * Handles:
 * 1. Hero CTA smooth scrolling with header offset
 * 2. Accessible tab navigation & keyboard shortcuts (Ascendion inspired)
 * 3. Client-side field validation & responsive interaction
 * 4. Asynchronous AJAX form submission to WordPress backend
 * 5. Success overlay and error state rendering
 *
 * @package Astra_Child
 */

(function () {
	'use strict';

	// Wait for DOM to be ready
	document.addEventListener('DOMContentLoaded', initContactPage);

	function initContactPage() {
		var contactPage = document.querySelector('.bi-contact-page');
		if (!contactPage) {
			return;
		}

		initHeroVideo();
		initSmoothScroll();
		initTabs();
		initForms();
	}

	/**
	 * Hero Background Video Controller
	 * Handles autoplay, reduced motion, and fallback resilience
	 */
	function initHeroVideo() {
		var video = document.querySelector('.bi-contact-hero__video');
		if (!video) {
			return;
		}

		var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

		function checkMotion() {
			if (prefersReduced.matches) {
				video.pause();
				video.style.display = 'none';
			} else {
				video.style.display = 'block';
				var playPromise = video.play();
				if (playPromise !== undefined) {
					playPromise.catch(function () {
						// Autoplay prevented by browser; fallback poster image is visible
					});
				}
			}
		}

		checkMotion();
		if (typeof prefersReduced.addEventListener === 'function') {
			prefersReduced.addEventListener('change', checkMotion);
		} else if (typeof prefersReduced.addListener === 'function') {
			prefersReduced.addListener(checkMotion);
		}
	}

	/**
	 * 1. Smooth Scroll to Enquiry Section
	 */
	function initSmoothScroll() {
		var scrollCta = document.getElementById('bi-hero-scroll-cta');
		var targetSection = document.getElementById('enquiry-section');

		if (!scrollCta || !targetSection) {
			return;
		}

		scrollCta.addEventListener('click', function (e) {
			e.preventDefault();

			var header = document.querySelector('.site-header') || document.querySelector('.bi-header') || document.querySelector('header');
			var headerOffset = header ? header.offsetHeight + 24 : 80;
			var targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: targetTop,
				behavior: 'smooth'
			});

			// Move focus to first tab for accessibility
			var activeTab = targetSection.querySelector('.bi-tab.is-active');
			if (activeTab) {
				setTimeout(function () {
					activeTab.focus();
				}, 600);
			}
		});
	}

	/**
	 * 2. Tab Navigation & ARIA Keyboard Control
	 */
	function initTabs() {
		var nav = document.querySelector('.bi-tabs-nav');
		if (!nav) {
			return;
		}

		var tabs = Array.prototype.slice.call(nav.querySelectorAll('.bi-tab'));
		var panels = Array.prototype.slice.call(document.querySelectorAll('.bi-tab-panel'));

		if (!tabs.length || !panels.length) {
			return;
		}

		// Click event on tabs
		tabs.forEach(function (tab, index) {
			tab.addEventListener('click', function () {
				switchTab(tab, tabs, panels);
			});

			// W3C ARIA Keyboard navigation for tabs
			tab.addEventListener('keydown', function (e) {
				var targetIndex = -1;

				if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
					e.preventDefault();
					targetIndex = (index + 1) % tabs.length;
				} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
					e.preventDefault();
					targetIndex = (index - 1 + tabs.length) % tabs.length;
				} else if (e.key === 'Home') {
					e.preventDefault();
					targetIndex = 0;
				} else if (e.key === 'End') {
					e.preventDefault();
					targetIndex = tabs.length - 1;
				}

				if (targetIndex >= 0) {
					tabs[targetIndex].focus();
					switchTab(tabs[targetIndex], tabs, panels);
				}
			});
		});

		function switchTab(activeTab, allTabs, allPanels) {
			var targetSlug = activeTab.getAttribute('data-tab-target');

			// Deactivate all tabs
			allTabs.forEach(function (tab) {
				tab.classList.remove('is-active');
				tab.setAttribute('aria-selected', 'false');
				tab.setAttribute('tabindex', '-1');
			});

			// Activate selected tab
			activeTab.classList.remove('is-active');
			void activeTab.offsetWidth; // trigger reflow for smooth indicator
			activeTab.classList.add('is-active');
			activeTab.setAttribute('aria-selected', 'true');
			activeTab.setAttribute('tabindex', '0');

			// Switch panels
			allPanels.forEach(function (panel) {
				if (panel.id === 'bi-panel-' + targetSlug) {
					panel.removeAttribute('hidden');
					// Micro animation
					panel.classList.remove('is-active');
					void panel.offsetWidth;
					panel.classList.add('is-active');
				} else {
					panel.classList.remove('is-active');
					panel.setAttribute('hidden', '');
				}
			});
		}
	}

	/**
	 * 3. Form Validation & Asynchronous Submission
	 */
	function initForms() {
		var forms = Array.prototype.slice.call(document.querySelectorAll('.bi-contact-form'));

		forms.forEach(function (form) {
			setupForm(form);
		});

		function setupForm(form) {
			var inputs = Array.prototype.slice.call(form.querySelectorAll('.bi-form-input, .bi-form-select, .bi-form-textarea'));
			var noticeBox = form.querySelector('.bi-form-notice');
			var successBox = form.querySelector('.bi-form-success');
			var fieldsBox = form.querySelector('.bi-form-fields');
			var submitBtn = form.querySelector('.bi-form-submit');
			var resetBtn = form.querySelector('.bi-form-success__reset');

			// Real-time error clearing
			inputs.forEach(function (input) {
				input.addEventListener('input', function () {
					clearFieldError(input);
					hideNotice(noticeBox);
				});

				input.addEventListener('change', function () {
					clearFieldError(input);
					hideNotice(noticeBox);
				});

				input.addEventListener('blur', function () {
					validateField(input);
				});
			});

			// Form Reset after success
			if (resetBtn) {
				resetBtn.addEventListener('click', function () {
					form.reset();
					inputs.forEach(clearFieldError);
					hideNotice(noticeBox);
					if (successBox) {
						successBox.style.display = 'none';
					}
					if (fieldsBox) {
						fieldsBox.style.display = 'flex';
					}
				});
			}

			// Submit Handler
			form.addEventListener('submit', function (e) {
				e.preventDefault();

				// Validate all inputs in this form
				var isValid = true;
				var firstInvalid = null;

				inputs.forEach(function (input) {
					if (!validateField(input)) {
						isValid = false;
						if (!firstInvalid) {
							firstInvalid = input;
						}
					}
				});

				if (!isValid) {
					showNotice(noticeBox, 'Please correct the highlighted fields before submitting.', 'error');
					if (firstInvalid) {
						firstInvalid.focus();
					}
					return;
				}

				// Check AJAX config
				if (typeof bi_contact_ajax === 'undefined' || !bi_contact_ajax.ajax_url) {
					showNotice(noticeBox, 'Submission endpoint unavailable. Please email us at contact@betterinsights.in', 'error');
					return;
				}

				// Prepare Submission
				var formData = new FormData(form);
				formData.append('action', 'bi_submit_enquiry');
				formData.append('nonce', bi_contact_ajax.nonce);

				// UI Loading State
				setSubmitting(submitBtn, true);
				hideNotice(noticeBox);

				fetch(bi_contact_ajax.ajax_url, {
					method: 'POST',
					body: formData
				})
				.then(function (res) {
					return res.json();
				})
				.then(function (res) {
					setSubmitting(submitBtn, false);

					if (res && res.success) {
						// Success state
						if (fieldsBox) {
							fieldsBox.style.display = 'none';
						}
						if (successBox) {
							var descEl = successBox.querySelector('.bi-form-success__desc');
							if (descEl && res.data && res.data.message) {
								descEl.textContent = res.data.message;
							}
							successBox.style.display = 'flex';
						}
						form.reset();
					} else {
						// Error state
						var errorMsg = (res && res.data && res.data.message) ? res.data.message : 'An error occurred while sending your enquiry. Please try again.';
						showNotice(noticeBox, errorMsg, 'error');

						// Highlight individual field errors from backend if returned
						if (res && res.data && res.data.errors) {
							Object.keys(res.data.errors).forEach(function (fieldName) {
								var errInput = form.querySelector('[name="' + fieldName + '"]');
								if (errInput) {
									setFieldError(errInput, res.data.errors[fieldName]);
								}
							});
						}
					}
				})
				.catch(function (err) {
					console.error('Submission failed:', err);
					setSubmitting(submitBtn, false);
					showNotice(noticeBox, 'Network connection issue. Please check your internet connection or email us at contact@betterinsights.in.', 'error');
				});
			});
		}

		function validateField(input) {
			var isRequired = input.hasAttribute('required') || input.getAttribute('aria-required') === 'true';
			var val = input.value.trim();
			var fieldName = input.getAttribute('name');

			// Required check
			if (isRequired && !val) {
				setFieldError(input, 'This field is required.');
				return false;
			}

			// Email format check
			if (input.type === 'email' && val) {
				var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
				if (!emailPattern.test(val)) {
					setFieldError(input, 'Please enter a valid email address.');
					return false;
				}
			}

			clearFieldError(input);
			return true;
		}

		function setFieldError(input, message) {
			var group = input.closest('.bi-form-group');
			if (!group) return;

			group.classList.add('has-error');
			var errSpan = group.querySelector('.bi-form-error');
			if (errSpan) {
				errSpan.textContent = message;
			}
		}

		function clearFieldError(input) {
			var group = input.closest('.bi-form-group');
			if (!group) return;

			group.classList.remove('has-error');
			var errSpan = group.querySelector('.bi-form-error');
			if (errSpan) {
				errSpan.textContent = '';
			}
		}

		function showNotice(box, message, type) {
			if (!box) return;
			box.textContent = message;
			box.className = 'bi-form-notice bi-form-notice--' + type;
			box.style.display = 'block';
		}

		function hideNotice(box) {
			if (!box) return;
			box.style.display = 'none';
			box.textContent = '';
		}

		function setSubmitting(btn, isSubmitting) {
			if (!btn) return;
			var textSpan = btn.querySelector('.bi-form-submit__text');

			if (isSubmitting) {
				btn.classList.add('is-submitting');
				btn.setAttribute('disabled', 'disabled');
				if (textSpan) {
					textSpan.setAttribute('data-orig-text', textSpan.textContent);
					textSpan.textContent = 'SENDING...';
				}
			} else {
				btn.classList.remove('is-submitting');
				btn.removeAttribute('disabled');
				if (textSpan && textSpan.getAttribute('data-orig-text')) {
					textSpan.textContent = textSpan.getAttribute('data-orig-text');
				}
			}
		}
	}
})();
