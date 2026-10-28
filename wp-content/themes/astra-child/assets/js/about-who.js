/**
 * Better Insights - About Page Section 2 Motion Controller
 * Reference: Ascendion "Who We Are" (https://ascendion.com/who-we-are/)
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const section = document.querySelector(".bi-about-who");
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

		const bannerEyebrow = section.querySelector(".bi-about-who__banner-eyebrow");
		const bannerTitle = section.querySelector(".bi-about-who__banner-title");
		const bannerDesc = section.querySelector(".bi-about-who__banner-desc");

		const statementLeft = section.querySelector(".bi-about-who__statement-left");
		const statementRight = section.querySelector(".bi-about-who__statement-right");

		const metricCards = section.querySelectorAll(".bi-about-who__metric-card");
		const ctaWrap = section.querySelector(".bi-about-who__cta-wrap");

		if (typeof ScrollTrigger !== "undefined") {
			// 1. Banner Entrance Animation
			const banner = section.querySelector(".bi-about-who__banner");
			if (banner && bannerTitle) {
				gsap.set([bannerEyebrow, bannerTitle, bannerDesc], { autoAlpha: 0, y: 26 });

				ScrollTrigger.create({
					trigger: banner,
					start: "top 80%",
					once: true,
					onEnter: function () {
						gsap.to([bannerEyebrow, bannerTitle, bannerDesc], {
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							stagger: 0.1,
							ease: "power2.out"
						});
					}
				});
			}

			// 2. Statement Two-Column Reveal
			const statementWrap = section.querySelector(".bi-about-who__statement-wrap");
			if (statementWrap && statementLeft) {
				gsap.set([statementLeft, statementRight], { autoAlpha: 0, y: 30 });

				ScrollTrigger.create({
					trigger: statementWrap,
					start: "top 80%",
					once: true,
					onEnter: function () {
						gsap.to([statementLeft, statementRight], {
							autoAlpha: 1,
							y: 0,
							duration: 0.7,
							stagger: 0.12,
							ease: "power2.out",
							onComplete: function () {
								gsap.set([statementLeft, statementRight], { clearProps: "transform" });
							}
						});
					}
				});
			}

			// 3. Horizontal Metrics Grid Reveal
			const metricsWrap = section.querySelector(".bi-about-who__metrics-wrap");
			if (metricsWrap && metricCards.length) {
				gsap.set(metricCards, { autoAlpha: 0, y: 28 });
				if (ctaWrap) gsap.set(ctaWrap, { autoAlpha: 0, y: 20 });

				ScrollTrigger.create({
					trigger: metricsWrap,
					start: "top 80%",
					once: true,
					onEnter: function () {
						gsap.to(metricCards, {
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							stagger: 0.09,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(metricCards, { clearProps: "transform" });
							}
						});

						if (ctaWrap) {
							gsap.to(ctaWrap, {
								autoAlpha: 1,
								y: 0,
								duration: 0.6,
								delay: 0.35,
								ease: "power2.out",
								onComplete: function () {
									gsap.set(ctaWrap, { clearProps: "transform" });
								}
							});
						}
					}
				});
			}
		}
	});
})();
