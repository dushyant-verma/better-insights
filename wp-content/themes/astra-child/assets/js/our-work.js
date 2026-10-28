/**
 * Better Insights - Our Work Page Interactive Controller
 * Handles background video autoplay resilience, reduced-motion fallback,
 * restrained hero entrance reveal, and case studies carousel.
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	function initOurWorkHero() {
		var hero = document.querySelector(".bi-our-work-hero");
		if (!hero) {
			return;
		}

		var video = hero.querySelector(".bi-our-work-hero__video");
		var fallbackImg = hero.querySelector(".bi-our-work-hero__fallback-img");

		// Autoplay resilience
		if (video) {
			var playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise.catch(function () {
					// Autoplay blocked by browser power-saving or policy -> show poster
					if (fallbackImg) {
						fallbackImg.style.display = "block";
					}
				});
			}
		}

		// Scroll reveal respecting prefers-reduced-motion
		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			hero.classList.add("is-visible");
			if (fallbackImg) {
				fallbackImg.style.display = "block";
			}
			return;
		}

		hero.classList.add("has-reveal");

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							hero.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "0px 0px -40px 0px",
				}
			);

			observer.observe(hero);
		} else {
			hero.classList.add("is-visible");
		}
	}

	function initWorkCarousel() {
		var carouselRoot = document.querySelector("[data-bi-work-carousel]");
		if (!carouselRoot) {
			return;
		}

		var cards = Array.from(carouselRoot.querySelectorAll(".bi-our-work-card"));
		var prevBtns = Array.from(carouselRoot.querySelectorAll("[data-bi-work-prev]"));
		var nextBtns = Array.from(carouselRoot.querySelectorAll("[data-bi-work-next]"));
		var counters = Array.from(carouselRoot.querySelectorAll("[data-bi-work-current]"));

		if (cards.length === 0) {
			return;
		}

		var currentIndex = 0;
		var total = cards.length;
		var startX = 0;
		var isSwiping = false;

		function formatNum(num) {
			return num < 10 ? "0" + num : "" + num;
		}

		function updateDeck() {
			cards.forEach(function (card, index) {
				var relPos = (index - currentIndex + total) % total;
				card.classList.remove("is-active", "is-stack-1", "is-stack-2", "is-stack-3");

				if (relPos === 0) {
					card.classList.add("is-active");
					card.removeAttribute("aria-hidden");
				} else {
					card.classList.add("is-stack-" + relPos);
					card.setAttribute("aria-hidden", "true");
				}
			});

			counters.forEach(function (c) {
				c.textContent = formatNum(currentIndex + 1);
			});

			prevBtns.forEach(function (btn) {
				if (currentIndex === 0) {
					btn.setAttribute("disabled", "true");
				} else {
					btn.removeAttribute("disabled");
				}
			});

			nextBtns.forEach(function (btn) {
				if (currentIndex === total - 1) {
					btn.setAttribute("disabled", "true");
				} else {
					btn.removeAttribute("disabled");
				}
			});
		}

		function nextSlide() {
			if (currentIndex < total - 1) {
				currentIndex++;
				updateDeck();
			}
		}

		function prevSlide() {
			if (currentIndex > 0) {
				currentIndex--;
				updateDeck();
			}
		}

		nextBtns.forEach(function (btn) {
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				nextSlide();
			});
		});

		prevBtns.forEach(function (btn) {
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				prevSlide();
			});
		});

		// Touch swipe support
		carouselRoot.addEventListener(
			"touchstart",
			function (e) {
				if (e.touches && e.touches.length > 0) {
					startX = e.touches[0].clientX;
					isSwiping = true;
				}
			},
			{ passive: true }
		);

		carouselRoot.addEventListener(
			"touchend",
			function (e) {
				if (!isSwiping || !e.changedTouches || e.changedTouches.length === 0) {
					return;
				}
				var diffX = startX - e.changedTouches[0].clientX;
				if (Math.abs(diffX) > 40) {
					if (diffX > 0) {
						nextSlide();
					} else {
						prevSlide();
					}
				}
				isSwiping = false;
			},
			{ passive: true }
		);

		updateDeck();
	}

	function initImpactCounters() {
		var panel = document.getElementById("impact-by-the-numbers");
		if (!panel) return;

		var numberEls = Array.from(panel.querySelectorAll(".bi-work-impact-col__number"));
		if (numberEls.length === 0) return;

		var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			return;
		}

		var hasAnimated = false;

		function startCounting() {
			if (hasAnimated) return;
			hasAnimated = true;

			numberEls.forEach(function (el) {
				var targetStr = el.getAttribute("data-target") || el.textContent;
				var targetNum = parseFloat(targetStr);
				if (isNaN(targetNum)) return;

				var duration = 1200;
				var startTime = null;

				function step(timestamp) {
					if (!startTime) startTime = timestamp;
					var progress = Math.min((timestamp - startTime) / duration, 1);
					var ease = progress * (2 - progress);
					var currentVal = Math.floor(ease * targetNum);
					el.textContent = currentVal;

					if (progress < 1) {
						window.requestAnimationFrame(step);
					} else {
						el.textContent = targetStr;
					}
				}

				window.requestAnimationFrame(step);
			});
		}

		if ("IntersectionObserver" in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							startCounting();
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.2,
				}
			);
			observer.observe(panel);
		} else {
			startCounting();
		}
	}

	function initAll() {
		initOurWorkHero();
		initWorkCarousel();
		initImpactCounters();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAll);
	} else {
		initAll();
	}
})();
