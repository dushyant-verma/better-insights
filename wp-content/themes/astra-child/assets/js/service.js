/**
 * Better Insights - Service Page Interactive Controller
 * Handles background video autoplay resilience, smooth interaction,
 * and restrained metrics counter animation.
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	function initServiceHero() {
		var video = document.querySelector(".bi-service-hero__video");
		var poster = document.querySelector(".bi-service-hero__poster");

		if (video) {
			// Ensure video plays smoothly or falls back to high-res poster
			var playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise.catch(function () {
					// Autoplay prevented by browser power-saving or policy
					if (poster) {
						poster.style.display = "block";
					}
				});
			}
		}

		// Smooth scroll support for internal CTA anchors
		var cta = document.querySelector(".bi-service-hero__cta");
		if (cta && cta.getAttribute("href") && cta.getAttribute("href").indexOf("#") === 0) {
			cta.addEventListener("click", function (e) {
				var targetId = cta.getAttribute("href");
				var targetEl = document.querySelector(targetId);
				if (targetEl) {
					e.preventDefault();
					targetEl.scrollIntoView({ behavior: "smooth" });
				}
			});
		}
	}

	function initImpactMetrics() {
		var section = document.querySelector(".bi-service-impact");
		if (!section) {
			return;
		}

		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		var counters = section.querySelectorAll(".bi-service-impact__num[data-target]");

		if (prefersReducedMotion) {
			section.classList.add("is-visible");
			return;
		}

		function animateCounter(el, target, duration) {
			var startTime = null;
			var startVal = 0;

			function step(timestamp) {
				if (!startTime) {
					startTime = timestamp;
				}
				var progress = Math.min((timestamp - startTime) / duration, 1);
				// Ease out cubic
				var easeOut = 1 - Math.pow(1 - progress, 3);
				var current = Math.floor(easeOut * (target - startVal) + startVal);
				el.textContent = current;

				if (progress < 1) {
					window.requestAnimationFrame(step);
				} else {
					el.textContent = target;
				}
			}

			window.requestAnimationFrame(step);
		}

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							section.classList.add("is-visible");

							counters.forEach(function (counter) {
								var target = parseFloat(counter.getAttribute("data-target"));
								if (!isNaN(target)) {
									counter.textContent = "0";
									animateCounter(counter, target, 1400);
								}
							});

							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.15,
					rootMargin: "0px 0px -40px 0px",
				}
			);

			observer.observe(section);
		} else {
			// Fallback if IntersectionObserver is not supported
			section.classList.add("is-visible");
		}
	}

	function initQuadGrid() {
		var section = document.querySelector(".bi-service-quad-section");
		if (!section) {
			return;
		}

		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			section.classList.add("is-visible");
			return;
		}

		// Activate reveal styles only when JS is running
		section.classList.add("has-reveal");

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							section.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "0px 0px -40px 0px",
				}
			);

			observer.observe(section);
		} else {
			section.classList.add("is-visible");
		}
	}

	function initCapabilitiesCards() {
		var section = document.querySelector(".bi-service-cards-section");
		if (!section) {
			return;
		}

		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			section.classList.add("is-visible");
			return;
		}

		// Activate reveal styles only when JS is running
		section.classList.add("has-reveal");

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							section.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "0px 0px -40px 0px",
				}
			);

			observer.observe(section);
		} else {
			section.classList.add("is-visible");
		}
	}

	function initDbiSection() {
		var section = document.querySelector(".bi-dbi-section");
		if (!section) {
			return;
		}

		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			section.classList.add("is-visible");
			return;
		}

		// Activate reveal styles only when JS is running
		section.classList.add("has-reveal");

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							section.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "0px 0px -40px 0px",
				}
			);

			observer.observe(section);
		} else {
			section.classList.add("is-visible");
		}

		// Expandable DBI cards hover and keyboard focus enhancement
		var grid = section.querySelector(".bi-dbi-grid");
		var cards = grid ? grid.querySelectorAll(".bi-dbi-card") : [];

		if (grid && cards.length >= 3) {
			cards.forEach(function (card, index) {
				card.addEventListener("mouseenter", function () {
					grid.setAttribute("data-active-card", (index + 1).toString());
				});
				card.addEventListener("focusin", function () {
					grid.setAttribute("data-active-card", (index + 1).toString());
				});
			});

			grid.addEventListener("mouseleave", function () {
				grid.removeAttribute("data-active-card");
			});
			grid.addEventListener("focusout", function (e) {
				if (!grid.contains(e.relatedTarget)) {
					grid.removeAttribute("data-active-card");
				}
			});
		}
	}

	function initAll() {
		initServiceHero();
		initImpactMetrics();
		initQuadGrid();
		initCapabilitiesCards();
		initDbiSection();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAll);
	} else {
		initAll();
	}
})();

