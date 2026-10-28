/**
 * Better Insights — Master Homepage Motion & Storytelling Choreography
 * Powered by GSAP 3 + ScrollTrigger + Lenis
 *
 * Architecture:
 * - GSAP ScrollTrigger drives section choreography, pinned stacking, and horizontal scroll.
 * - Lenis drives smooth scrolling synchronization.
 * - Progressive Enhancement: 100% visible default CSS state; animations run ONLY if GSAP initializes cleanly.
 */
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		initBetterInsightsMasterMotion();
	});

	function initBetterInsightsMasterMotion() {
		// Progressive Enhancement Check: If GSAP or ScrollTrigger is missing, exit safely.
		if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
			console.warn("GSAP / ScrollTrigger unavailable. Fallback: Content remains 100% visible.");
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		// Respect prefers-reduced-motion
		if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			console.log("Reduced motion preferred: GSAP ScrollTrigger choreography bypassed.");
			return;
		}

		// Initialize Lenis Smooth Scroll if available
		initLenisSmoothScroll();

		// GSAP Context for clean scoping and resize cleanup
		let ctx = gsap.context(function () {
			initHeroMotion();
			initAmbientScrollBackground();
			initWeBelievePinnedStacking();
			initSolutionsHorizontalScroll();
			initServicesStaggeredGrid();
			initStatementBridges();
			initOurWorkDeckCarousel();
			initTechPartnersMotion();
			initResourceCenterMotion();
			initFooterMotion();
		});

		// Refresh ScrollTrigger on window resize
		let resizeTimeout;
		window.addEventListener("resize", function () {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function () {
				ScrollTrigger.refresh();
			}, 250);
		});
	}

	function initLenisSmoothScroll() {
		if (typeof Lenis === "undefined") return;

		try {
			const lenis = new Lenis({
				duration: 1.2,
				easing: function (t) {
					return Math.min(1, 1.001 - Math.pow(2, -10 * t));
				},
				smoothWheel: true,
				touchMultiplier: 1.5
			});

			lenis.on("scroll", ScrollTrigger.update);

			gsap.ticker.add(function (time) {
				lenis.raf(time * 1000);
			});

			gsap.ticker.lagSmoothing(0);
		} catch (e) {
			console.warn("Lenis smooth scroll bypassed:", e);
		}
	}

	/* --------------------------------------------------------------------------
	   SECTION 1: HERO MOTION & EXIT PARALLAX
	   -------------------------------------------------------------------------- */
	function initHeroMotion() {
		const hero = document.querySelector(".bi-hero");
		if (!hero) return;

		const video = hero.querySelector(".bi-hero__video");
		const eyebrow = hero.querySelector(".bi-hero__eyebrow");
		const heading = hero.querySelector(".bi-hero__heading");
		const desc = hero.querySelector(".bi-hero__desc");
		const cta = hero.querySelector(".bi-hero__cta-wrap");
		const controls = hero.querySelector(".bi-hero__controls");

		// Hero Initial Entrance Animation
		const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

		if (video) {
			tl.fromTo(video, { scale: 1.03, opacity: 0.85 }, { scale: 1, opacity: 1, duration: 1.2 }, 0);
		}

		if (eyebrow) {
			tl.fromTo(eyebrow, { y: 25, opacity: 0 }, { y: 0, opacity: 1 }, 0.2);
		}

		if (heading) {
			tl.fromTo(heading, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.35);
		}

		if (desc) {
			tl.fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0.55);
		}

		if (cta) {
			tl.fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.7);
		}

		if (controls) {
			tl.fromTo(controls, { y: 15, opacity: 0 }, { y: 0, opacity: 1 }, 0.85);
		}

		// Hero Exit Parallax on Scroll (Child elements only - zero section scale)
		if (heading || video) {
			gsap.to([eyebrow, heading, desc, cta], {
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: true
				},
				y: -70,
				opacity: 0.3,
				stagger: 0.05
			});

			if (video) {
				gsap.to(video, {
					scrollTrigger: {
						trigger: hero,
						start: "top top",
						end: "bottom top",
						scrub: true
					},
					scale: 1.05
				});
			}
		}
	}

	/* --------------------------------------------------------------------------
	   SECTION 2: WE BELIEVE STACKING CARDS MOTION ENHANCEMENT
	   -------------------------------------------------------------------------- */
	function initWeBelievePinnedStacking() {
		const section = document.querySelector(".bi-beliefs-section");
		if (!section) return;

		const cards = gsap.utils.toArray(".bi-stacking-card");
		if (cards.length < 2) return;

		// Micro-animation: Subtle image scale reveal as each card enters its sticky threshold
		cards.forEach(function (card) {
			const cardImg = card.querySelector(".bi-stacking-card__image");
			const cardContent = card.querySelector(".bi-stacking-card__content");

			if (cardImg) {
				gsap.fromTo(
					cardImg,
					{ scale: 1.06, opacity: 0.9 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 75%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			if (cardContent) {
				gsap.fromTo(
					cardContent,
					{ y: 15 },
					{
						y: 0,
						duration: 0.6,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 80%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}
		});
	}

	/* --------------------------------------------------------------------------
	   SECTION 3: HOW WE HELP HORIZONTAL SCROLL SLIDER
	   -------------------------------------------------------------------------- */
	function initSolutionsHorizontalScroll() {
		const section = document.querySelector(".bi-solutions-section");
		const trackContainer = document.querySelector(".bi-solutions-track-container");
		const track = document.querySelector(".bi-solutions-track");
		const progressBar = section ? (section.querySelector("[data-bi-slider-progress]") || section.querySelector(".bi-solutions-progress-bar")) : null;

		if (!section || !trackContainer || !track) return;
		if (window.innerWidth <= 1024) return; // Desktop horizontal scroll

		function getScrollAmount() {
			let trackWidth = track.scrollWidth;
			let containerWidth = trackContainer.offsetWidth;
			return -(trackWidth - containerWidth + 40);
		}

		if (progressBar) {
			gsap.set(progressBar, { transformOrigin: "left center", scaleX: 0 });
		}

		const solutionsTween = gsap.to(track, {
			x: getScrollAmount,
			ease: "none",
			scrollTrigger: {
				id: "solutions-scrolltrigger",
				trigger: section,
				start: "top top",
				end: function () {
					return "+=" + Math.abs(getScrollAmount());
				},
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true,
				onUpdate: function (self) {
					if (progressBar) {
						gsap.set(progressBar, { transformOrigin: "left center", scaleX: self.progress });
					}
				}
			}
		});

		// Solution Cards Image Scale Reveal during horizontal scroll
		const cards = gsap.utils.toArray(".bi-solution-card");
		cards.forEach(function (card) {
			const img = card.querySelector(".bi-solution-card__image");
			if (img) {
				gsap.fromTo(
					img,
					{ scale: 1.12 },
					{
						scale: 1,
						scrollTrigger: {
							trigger: card,
							containerAnimation: solutionsTween,
							start: "left right",
							end: "right left",
							scrub: true
						}
					}
				);
			}
		});
	}

	/* --------------------------------------------------------------------------
	   SECTION 4: OUR SERVICES STAGGERED GRID
	   -------------------------------------------------------------------------- */
	function initServicesStaggeredGrid() {
		const section = document.querySelector(".bi-services-section");
		if (!section) return;

		const cards = gsap.utils.toArray(".bi-service-card");
		if (cards.length === 0) return;

		gsap.fromTo(
			cards,
			{ opacity: 0, y: 45 },
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: {
					each: 0.08,
					grid: [3, 3],
					from: "start"
				},
				ease: "power2.out",
				scrollTrigger: {
					trigger: section,
					start: "top 75%",
					toggleActions: "play none none none"
				}
			}
		);
	}

	/* --------------------------------------------------------------------------
	   SECTION 5: BOLD EDITORIAL STATEMENT BRIDGES
	   -------------------------------------------------------------------------- */
	function initStatementBridges() {
		const statements = gsap.utils.toArray(".bi-statement-section");

		statements.forEach(function (sec) {
			const eyebrow = sec.querySelector(".bi-statement-eyebrow");
			const heading = sec.querySelector(".bi-statement-heading");

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sec,
					start: "top 80%",
					toggleActions: "play none none none"
				}
			});

			if (eyebrow) {
				tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
			}

			if (heading) {
				tl.fromTo(heading, { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 0.9, ease: "power3.out" }, "-=0.3");
			}
		});
	}

	/* --------------------------------------------------------------------------
	   SECTION 6: OUR WORK CAROUSEL DECK
	   -------------------------------------------------------------------------- */
	function initOurWorkDeckCarousel() {
		const section = document.querySelector(".bi-our-work-section");
		if (!section) return;

		const activeCard = section.querySelector(".bi-our-work-card.is-active");
		if (activeCard) {
			const img = activeCard.querySelector(".bi-our-work-card__image");
			const content = activeCard.querySelector(".bi-our-work-card__content");

			gsap.fromTo(
				[img, content],
				{ opacity: 0, y: 35 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 70%",
						toggleActions: "play none none none"
					}
				}
			);
		}
	}

	/* --------------------------------------------------------------------------
	   SECTION 7: TECHNOLOGY PLATFORMS LOGO STAGGER
	   -------------------------------------------------------------------------- */
	function initTechPartnersMotion() {
		const section = document.querySelector(".bi-partners-section");
		if (!section) return;

		const items = gsap.utils.toArray(section.querySelectorAll(".bi-partner-item, .bi-tech-partners__item"));
		if (!items.length) return;

		gsap.fromTo(
			items,
			{ opacity: 0, y: 25 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.06,
				ease: "power2.out",
				scrollTrigger: {
					trigger: section,
					start: "top 80%",
					toggleActions: "play none none none"
				}
			}
		);
	}

	/* --------------------------------------------------------------------------
	   SECTION 8: RESOURCE CENTER STAGGERED CARDS
	   -------------------------------------------------------------------------- */
	function initResourceCenterMotion() {
		const section = document.querySelector(".bi-resource-section");
		if (!section) return;

		const cards = gsap.utils.toArray(".bi-resource-card");

		gsap.fromTo(
			cards,
			{ opacity: 0, y: 45 },
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.12,
				ease: "power2.out",
				scrollTrigger: {
					trigger: section,
					start: "top 75%",
					toggleActions: "play none none none"
				}
			}
		);
	}

	/* --------------------------------------------------------------------------
	   SECTION 9: CINEMATIC FOOTER REVEAL & SCROLL VELOCITY ELASTIC BOUNCE
	   -------------------------------------------------------------------------- */
	function initFooterMotion() {
		const footer = document.querySelector(".bi-footer");
		if (!footer) return;

		// 1. GSAP SCROLL-VELOCITY ELASTIC SVG FOOTER BOUNCE
		const bouncePath = document.getElementById("bi-footer-bounce-path");
		if (bouncePath && typeof ScrollTrigger !== "undefined") {
			let isBouncing = false;

			ScrollTrigger.create({
				trigger: footer,
				start: "top bottom",
				onEnter: function (self) {
					triggerBounce(self.getVelocity());
				},
				onEnterBack: function (self) {
					triggerBounce(self.getVelocity());
				}
			});

			function triggerBounce(velocity) {
				if (isBouncing) return;

				// Calculate velocity deformation (clamp between 0 and 100)
				let normVelocity = Math.min(Math.abs(velocity / 25), 100);
				if (normVelocity < 6) return;

				isBouncing = true;
				let targetY = 40 - (normVelocity * 0.8); // Curve deforms upward into elastic bounce

				gsap.to(bouncePath, {
					duration: 1.4,
					ease: "elastic.out(1, 0.35)",
					attr: { d: `M 0,100 L 0,40 Q 500,${targetY} 1000,40 L 1000,100 Z` },
					onComplete: function () {
						gsap.to(bouncePath, {
							duration: 0.5,
							ease: "power2.out",
							attr: { d: "M 0,100 L 0,40 Q 500,40 1000,40 L 1000,100 Z" },
							onComplete: function () {
								isBouncing = false;
							}
						});
					}
				});
			}
		}

		// 2. CINEMATIC STAGGERED FOOTER ENTRANCE
		const ctaHeading = footer.querySelector(".bi-footer__cta-heading");
		const ctaDesc = footer.querySelector(".bi-footer__cta-desc");
		const ctaBtn = footer.querySelector(".bi-footer__primary-btn");
		const cols = gsap.utils.toArray(".bi-footer__column");
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

		if (wordmark) {
			tl.fromTo(wordmark, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }, 0.6);
		}
	}

	/* --------------------------------------------------------------------------
	   SECTION 10: WPP MEDIA–INSPIRED AMBIENT SCROLL BACKGROUND
	   -------------------------------------------------------------------------- */
	function initAmbientScrollBackground() {
		const backdrop = document.querySelector(".bi-ambient-backdrop");
		if (!backdrop) return;

		// Respect prefers-reduced-motion
		if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const isMobile = window.innerWidth <= 768;

		// Subtle parallax drift profiles for soft organic shapes
		const motionProfiles = [
			// Shape 1 (Green - Hero Exit / Logo Wall): Drifts down and right
			{ y: isMobile ? 80 : 220, x: isMobile ? 15 : 45 },
			// Shape 2 (Blue - We Believe Top Right): Drifts up and left
			{ y: isMobile ? -60 : -180, x: isMobile ? -10 : -35 },
			// Shape 3 (Lavender - We Believe Lower Left): Drifts down and left
			{ y: isMobile ? 70 : 200, x: isMobile ? -15 : -40 },
			// Shape 4 (Green - Solutions Entrance): Drifts down and right
			{ y: isMobile ? 85 : 240, x: isMobile ? 20 : 50 },
			// Shape 5 (Lavender - Solutions Slider Area): Drifts up and right
			{ y: isMobile ? -70 : -190, x: isMobile ? 15 : 40 },
			// Shape 6 (Deep Blue - Services Dark Section): Subtle slow drift
			{ y: isMobile ? 45 : 130, x: isMobile ? -10 : -25 },
			// Shape 7 (Blue - Our Work Entrance): Drifts down and right
			{ y: isMobile ? 75 : 210, x: isMobile ? 15 : 45 },
			// Shape 8 (Green - Our Work Cards): Drifts up and left
			{ y: isMobile ? -80 : -230, x: isMobile ? -15 : -45 },
			// Shape 9 (Deep Blue - Tech Partners Dark Section): Subtle slow drift
			{ y: isMobile ? 40 : 120, x: isMobile ? 10 : 25 },
			// Shape 10 (Green - Resource Center Left): Drifts down and right
			{ y: isMobile ? 70 : 190, x: isMobile ? 15 : 35 },
			// Shape 11 (Lavender - Resource Center Right): Drifts up and left
			{ y: isMobile ? -60 : -170, x: isMobile ? -10 : -30 },
		];

		const shapes = backdrop.querySelectorAll(".bi-ambient-shape");
		shapes.forEach(function (shape, idx) {
			const m = motionProfiles[idx] || { y: 150, x: 30 };

			gsap.to(shape, {
				y: m.y,
				x: m.x,
				ease: "none",
				scrollTrigger: {
					trigger: shape,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.2,
					invalidateOnRefresh: true,
				},
			});
		});
	}
})();
