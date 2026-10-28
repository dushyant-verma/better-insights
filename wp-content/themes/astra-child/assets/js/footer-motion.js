/**
 * Better Insights — Cinematic Footer Motion & Velocity Bounce Controller
 * Powered by GSAP + ScrollTrigger
 */
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		initBetterInsightsFooterMotion();
	});

	function initBetterInsightsFooterMotion() {
		if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		// Respect prefers-reduced-motion
		if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const footer = document.querySelector(".bi-footer");
		if (!footer) return;

		// 1. GSAP SCROLL-VELOCITY ELASTIC SVG FOOTER BOUNCE (Directional Deformation)
		const bouncePath = document.getElementById("bi-footer-bounce-path");
		if (bouncePath) {
			let isBouncing = false;

			ScrollTrigger.create({
				trigger: footer,
				start: "top bottom",
				end: "bottom bottom",
				onUpdate: function (self) {
					if (isBouncing) return;

					const velocity = self.getVelocity();
					const absVelocity = Math.abs(velocity);

					// Trigger bounce if velocity exceeds threshold (> 150)
					if (absVelocity > 150) {
						let normVelocity = Math.min(absVelocity / 25, 110);
						let direction = velocity > 0 ? 1 : -1; // Downward (1) or Upward (-1) scroll deformation

						// Path deformation target Y: neutral is 0.
						// Downward scroll deforms control point downward (+normVelocity)
						// Upward scroll deforms control point upward (-normVelocity)
						let targetY = normVelocity * 0.75 * direction;

						isBouncing = true;

						gsap.to(bouncePath, {
							duration: 1.3,
							ease: "elastic.out(1, 0.35)",
							attr: { d: `M0,0 Q720,${targetY} 1440,0 L1440,120 L0,120 Z` },
							onComplete: function () {
								gsap.to(bouncePath, {
									duration: 0.5,
									ease: "power2.out",
									attr: { d: "M0,0 Q720,0 1440,0 L1440,120 L0,120 Z" },
									onComplete: function () {
										isBouncing = false;
									}
								});
							}
						});
					}
				}
			});
		}

		// 2. FOOTER ENTRANCE STAGGERED REVEAL & MONUMENTAL OUTLINED WORDMARK REVEAL
		const ctaHeading = footer.querySelector(".bi-footer__cta-heading");
		const ctaDesc = footer.querySelector(".bi-footer__cta-desc");
		const ctaBtn = footer.querySelector(".bi-footer__primary-btn");
		const cols = gsap.utils.toArray(".bi-footer__column");
		const ctaStrip = footer.querySelector(".bi-footer__cta-strip");
		const wordmark = footer.querySelector(".bi-footer__wordmark-text");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: footer,
				start: "top 80%",
				toggleActions: "play none none reverse"
			}
		});

		if (ctaHeading) {
			tl.fromTo(ctaHeading, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0);
		}

		if (ctaDesc) {
			tl.fromTo(ctaDesc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
		}

		if (ctaBtn) {
			tl.fromTo(ctaBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.35);
		}

		if (cols.length > 0) {
			tl.fromTo(cols, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 0.45);
		}

		if (ctaStrip) {
			tl.fromTo(ctaStrip, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.6);
		}

		// Monumental Wordmark rise reveal (translateY 15% -> 0%)
		if (wordmark) {
			tl.fromTo(wordmark, { yPercent: 15, opacity: 0.4 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" }, 0.7);
		}
	}
})();
