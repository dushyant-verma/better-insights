/**
 * Better Insights - Blog & Insights Interactive Controller
 *
 * Handles:
 * 1. Smooth scroll to articles feed
 * 2. Copy link to clipboard on single articles
 * 3. Mobile category scroll resilience
 *
 * @package Astra_Child
 */

(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', initBlogInteractions);

	function initBlogInteractions() {
		initSmoothScroll();
		initCopyShareLink();
	}

	/**
	 * Smooth scroll from hero CTA to articles feed
	 */
	function initSmoothScroll() {
		var scrollCta = document.getElementById('bi-blog-scroll-cta');
		var targetSection = document.getElementById('bi-insights-feed');

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
		});
	}

	/**
	 * Copy article link to clipboard with instant feedback
	 */
	function initCopyShareLink() {
		var copyButtons = document.querySelectorAll('.bi-share-btn--copy');

		copyButtons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				var url = btn.getAttribute('data-copy-url') || window.location.href;

				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(url).then(function () {
						showCopiedFeedback(btn);
					}).catch(function () {
						fallbackCopy(url, btn);
					});
				} else {
					fallbackCopy(url, btn);
				}
			});
		});

		function showCopiedFeedback(btn) {
			btn.classList.add('bi-share-btn--copied');
			setTimeout(function () {
				btn.classList.remove('bi-share-btn--copied');
			}, 2000);
		}

		function fallbackCopy(text, btn) {
			var textarea = document.createElement('textarea');
			textarea.value = text;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			try {
				document.execCommand('copy');
				showCopiedFeedback(btn);
			} catch (err) {
				console.warn('Copy link command failed', err);
			}
			document.body.removeChild(textarea);
		}
	}
})();
