/**
 * Better Insights - About Page Hero Section Motion Controller
 * Reference: OWLED Media (https://www.owledmedia.com/socials)
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const hero = document.querySelector(".bi-about-hero");
		if (!hero) {
			return;
		}

		if (typeof gsap === "undefined") {
			console.warn("GSAP is required for About hero animations.");
			return;
		}

		const prefersReducedMotion =
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const eyebrow = hero.querySelector(".bi-about-hero__eyebrow-wrap");
		const heading = hero.querySelector(".bi-about-hero__heading");
		const desc = hero.querySelector(".bi-about-hero__desc");
		const cta = hero.querySelector(".bi-about-hero__cta-wrap");
		const visual = hero.querySelector(".bi-about-hero__visual");

		// Staggered Entrance Animation for Brand Story
		if (!prefersReducedMotion) {
			gsap.set([eyebrow, heading, desc, cta], { autoAlpha: 0, y: 26 });
			gsap.set(visual, { autoAlpha: 0, y: 32 });

			const entranceTl = gsap.timeline({ delay: 0.1 });
			entranceTl
				.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
				.to(heading, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
				.to(desc, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
				.to(cta, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
				.to(visual, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6");
		} else {
			gsap.set([eyebrow, heading, desc, cta, visual], { autoAlpha: 1, y: 0 });
			return;
		}

		// Vertical Opposing Marquee Tracks (Parallax Multi-Column Collage)
		const track1 = hero.querySelector('[data-collage-track="1"]');
		const track2 = hero.querySelector('[data-collage-track="2"]');
		const track3 = hero.querySelector('[data-collage-track="3"]');

		const tweens = [];

		// Column 1: Continuously moves Upwards (Duration: 28s)
		if (track1) {
			const tween1 = gsap.to(track1, {
				yPercent: -50,
				duration: 28,
				ease: "none",
				repeat: -1
			});
			tweens.push(tween1);
		}

		// Column 2: Continuously moves Downwards (Duration: 32s)
		if (track2) {
			const tween2 = gsap.fromTo(
				track2,
				{ yPercent: -50 },
				{
					yPercent: 0,
					duration: 32,
					ease: "none",
					repeat: -1
				}
			);
			tweens.push(tween2);
		}

		// Column 3: Continuously moves Upwards at different speed (Duration: 36s)
		if (track3) {
			const tween3 = gsap.to(track3, {
				yPercent: -50,
				duration: 36,
				ease: "none",
				repeat: -1
			});
			tweens.push(tween3);
		}

		// Smooth Deceleration on Hover / Focus
		if (visual && tweens.length) {
			visual.addEventListener("mouseenter", function () {
				tweens.forEach(function (tw) {
					gsap.to(tw, { timeScale: 0.2, duration: 0.6, ease: "power1.out", overwrite: "auto" });
				});
			});

			visual.addEventListener("mouseleave", function () {
				tweens.forEach(function (tw) {
					gsap.to(tw, { timeScale: 1, duration: 0.6, ease: "power1.out", overwrite: "auto" });
				});
			});
		}

		// Smooth scroll for in-page contact anchor
		const ctaLink = hero.querySelector(".bi-about-hero__cta");
		if (ctaLink && ctaLink.getAttribute("href") === "#colophon") {
			ctaLink.addEventListener("click", function (e) {
				const target = document.querySelector("#colophon");
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: "smooth" });
				}
			});
		}

		// Handle tab visibility to avoid frame jumps when tab is hidden
		document.addEventListener("visibilitychange", function () {
			if (document.hidden) {
				tweens.forEach(function (tw) {
					tw.pause();
				});
			} else {
				tweens.forEach(function (tw) {
					tw.resume();
				});
			}
		});
	});
})();
