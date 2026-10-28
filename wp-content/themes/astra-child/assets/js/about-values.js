/**
 * Better Insights - About Page: Our Values & Animated Typography (.fwt) Motion Controller
 * Reference: Ascendion "Who We Are" (https://ascendion.com/who-we-are/)
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const valuesSection = document.querySelector(".bi-about-values");
		const fwtSection = document.querySelector(".bi-about-fwt");

		if (!valuesSection && !fwtSection) {
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

		// ----------------------------------------------------------------------
		// 1. VALUES SECTION ENTRANCE ANIMATION
		// ----------------------------------------------------------------------
		if (valuesSection && typeof ScrollTrigger !== "undefined") {
			const header = valuesSection.querySelector(".bi-about-values__header");
			const cols = valuesSection.querySelectorAll(".bi-about-values__col");

			if (header && cols.length) {
				gsap.set(header, { autoAlpha: 0, y: 24 });
				gsap.set(cols, { autoAlpha: 0, y: 28 });

				ScrollTrigger.create({
					trigger: valuesSection,
					start: "top 80%",
					once: true,
					onEnter: function () {
						gsap.to(header, {
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(header, { clearProps: "transform" });
							}
						});

						gsap.to(cols, {
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							stagger: 0.1,
							delay: 0.15,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(cols, { clearProps: "transform" });
							}
						});
					}
				});
			}
		}

		// ----------------------------------------------------------------------
		// 2. ANIMATED FULL-WIDTH TYPOGRAPHY (.fwt) SCROLL-LINKED HORIZONTAL MOTION
		// ----------------------------------------------------------------------
		if (fwtSection && typeof ScrollTrigger !== "undefined") {
			const primaryTrack = fwtSection.querySelector('[data-fwt-track="primary"]');
			const secondaryTrack = fwtSection.querySelector('[data-fwt-track="secondary"]');

			// Primary Headline Track Parallax Scrub (Moves Right-to-Left on Scroll)
			if (primaryTrack) {
				gsap.fromTo(
					primaryTrack,
					{ xPercent: 0 },
					{
						xPercent: -15,
						ease: "none",
						scrollTrigger: {
							trigger: fwtSection,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.6,
							invalidateOnRefresh: true
						}
					}
				);
			}

			// Secondary Layered Outline Track (Moves Left-to-Right Counter Parallax)
			if (secondaryTrack) {
				gsap.fromTo(
					secondaryTrack,
					{ xPercent: -8 },
					{
						xPercent: 6,
						ease: "none",
						scrollTrigger: {
							trigger: fwtSection,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.8,
							invalidateOnRefresh: true
						}
					}
				);
			}
		}
	});
})();
