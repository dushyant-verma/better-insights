(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const section = document.querySelector(".bi-client-logo-wall");
		if (!section) {
			return;
		}

		if (typeof gsap === "undefined") {
			console.warn("GSAP is required for client logo wall marquee animations.");
			return;
		}

		const prefersReducedMotion =
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const eyebrow = section.querySelector(".bi-client-logo-wall__eyebrow");
		const heading = section.querySelector(".bi-client-logo-wall__heading");
		const rowsWrapper = section.querySelector(".bi-client-logo-wall__rows-wrapper");
		const track1 = section.querySelector('[data-logo-track="1"]');
		const track2 = section.querySelector('[data-logo-track="2"]');

		// Entrance animation
		if (typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
			gsap.set([eyebrow, heading], { autoAlpha: 0, y: 24 });
			gsap.set(rowsWrapper, { autoAlpha: 0, y: 28 });

			const entranceTl = gsap.timeline({ paused: true });
			entranceTl
				.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
				.to(heading, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
				.to(rowsWrapper, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

			ScrollTrigger.create({
				trigger: section,
				start: "top 80%",
				once: true,
				onEnter: function () {
					entranceTl.play();
				}
			});
		} else {
			gsap.set([eyebrow, heading, rowsWrapper], { autoAlpha: 1, y: 0 });
		}

		if (prefersReducedMotion) {
			return;
		}

		let tween1 = null;
		let tween2 = null;

		// Continuous Infinite Opposing Marquee Animations (OWLED Media Motion Pattern)
		// Row 1: Continuously moves Right-to-Left
		if (track1) {
			tween1 = gsap.to(track1, {
				xPercent: -50,
				duration: 36,
				ease: "none",
				repeat: -1
			});

			const row1Container = track1.closest(".bi-logo-row");
			if (row1Container) {
				row1Container.addEventListener("mouseenter", function () {
					gsap.to(tween1, { timeScale: 0.25, duration: 0.5, ease: "power1.out", overwrite: "auto" });
				});
				row1Container.addEventListener("mouseleave", function () {
					gsap.to(tween1, { timeScale: 1, duration: 0.5, ease: "power1.out", overwrite: "auto" });
				});
			}
		}

		// Row 2: Continuously moves Left-to-Right
		if (track2) {
			tween2 = gsap.fromTo(
				track2,
				{ xPercent: -50 },
				{
					xPercent: 0,
					duration: 36,
					ease: "none",
					repeat: -1
				}
			);

			const row2Container = track2.closest(".bi-logo-row");
			if (row2Container) {
				row2Container.addEventListener("mouseenter", function () {
					gsap.to(tween2, { timeScale: 0.25, duration: 0.5, ease: "power1.out", overwrite: "auto" });
				});
				row2Container.addEventListener("mouseleave", function () {
					gsap.to(tween2, { timeScale: 1, duration: 0.5, ease: "power1.out", overwrite: "auto" });
				});
			}
		}

		// Handle tab visibility to maintain smooth marquee sync and avoid frame jumps
		document.addEventListener("visibilitychange", function () {
			if (document.hidden) {
				if (tween1) tween1.pause();
				if (tween2) tween2.pause();
			} else {
				if (tween1) tween1.resume();
				if (tween2) tween2.resume();
			}
		});
	});
})();
