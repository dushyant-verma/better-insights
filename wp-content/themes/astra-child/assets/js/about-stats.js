/**
 * Better Insights - About Page Section 4: Animated Statistics Cards Motion Controller
 * Reference: OWLED Media (.framer-13pkimt) - https://www.owledmedia.com/socials
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const section = document.querySelector(".bi-about-stats");
		if (!section) {
			return;
		}

		if (typeof gsap === "undefined") {
			return;
		}

		const prefersReducedMotion =
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			return;
		}

		const header = section.querySelector(".bi-about-stats__header");
		const cardItems = section.querySelectorAll(".bi-about-stats__card-item");
		const numElements = section.querySelectorAll(".bi-about-stats__num");

		if (typeof ScrollTrigger !== "undefined") {
			// Set initial hidden state on wrappers (avoids interfering with card rotations)
			if (header) {
				gsap.set(header, { autoAlpha: 0, y: 24 });
			}
			if (cardItems.length) {
				gsap.set(cardItems, { autoAlpha: 0, y: 36 });
			}

			ScrollTrigger.create({
				trigger: section,
				start: "top 75%",
				once: true,
				onEnter: function () {
					// 1. Reveal Header
					if (header) {
						gsap.to(header, {
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(header, { clearProps: "transform" });
							}
						});
					}

					// 2. Staggered Card Items Reveal
					if (cardItems.length) {
						gsap.to(cardItems, {
							autoAlpha: 1,
							y: 0,
							duration: 0.75,
							stagger: 0.15,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(cardItems, { clearProps: "transform" });
							}
						});
					}

					// 3. Smooth Count-Up Animation
					numElements.forEach(function (el, index) {
						const target = parseFloat(el.getAttribute("data-count-target"));
						const suffix = el.getAttribute("data-count-suffix") || "";

						if (!isNaN(target)) {
							// Initialize counter display at 0
							el.textContent = "0" + suffix;
							const counter = { val: 0 };
							gsap.to(counter, {
								val: target,
								duration: 1.8,
								delay: 0.15 * index,
								ease: "power2.out",
								onUpdate: function () {
									const formatted = Math.round(counter.val).toLocaleString();
									el.textContent = formatted + suffix;
								},
								onComplete: function () {
									const formatted = target.toLocaleString();
									el.textContent = formatted + suffix;
								}
							});
						}
					});
				}
			});
		}
	});
})();
