(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		initBetterInsightsPageLoad();
		initBetterInsightsHero();
		initBetterInsightsSolutionsSlider();
		initBetterInsightsSolutionsThemeTransition();
		initBetterInsightsOurWorkCarousel();
		initBetterInsightsScrollReveal();
		initBetterInsightsScrollProgress();
	});

	function initBetterInsightsPageLoad() {
		requestAnimationFrame(function () {
			setTimeout(function () {
				document.body.classList.add("bi-loaded");
				const homepage = document.querySelector(".bi-homepage");
				if (homepage) {
					homepage.classList.add("bi-loaded");
				}
			}, 50);
		});
	}

	function initBetterInsightsHero() {
		const hero = document.querySelector(".bi-hero");
		if (!hero) {
			return;
		}

		const slides = Array.from(hero.querySelectorAll(".bi-hero__slide"));
		const tabs = Array.from(hero.querySelectorAll("[data-bi-hero-goto]"));
		const toggleBtns = Array.from(hero.querySelectorAll("[data-bi-hero-toggle]"));
		const prevBtn = hero.querySelector("[data-bi-hero-prev]");
		const nextBtn = hero.querySelector("[data-bi-hero-next]");
		const progressBar = hero.querySelector("[data-bi-hero-progress]");

		if (slides.length === 0) {
			return;
		}

		const DURATION = 8000; // 8 seconds per slide
		let currentIndex = 0;
		let isPaused = false;
		let startTime = null;
		let elapsedTime = 0;
		let animationFrameId = null;

		function getActiveVideo() {
			return slides[currentIndex] ? slides[currentIndex].querySelector("video") : null;
		}

		function playActiveVideo() {
			const video = getActiveVideo();
			if (video) {
				video.muted = true;
				const playPromise = video.play();
				if (playPromise !== undefined) {
					playPromise.catch(function () {
						// Autoplay handled by browser gracefully
					});
				}
			}
		}

		function pauseActiveVideo() {
			const video = getActiveVideo();
			if (video) {
				video.pause();
			}
		}

		function updateUI() {
			slides.forEach(function (slide, idx) {
				if (idx === currentIndex) {
					slide.classList.add("is-active");
					slide.removeAttribute("aria-hidden");
				} else {
					slide.classList.remove("is-active");
					slide.setAttribute("aria-hidden", "true");
					const v = slide.querySelector("video");
					if (v) {
						v.pause();
					}
				}
			});

			tabs.forEach(function (tab) {
				const gotoIdx = parseInt(tab.getAttribute("data-bi-hero-goto"), 10);
				if (gotoIdx === currentIndex) {
					tab.classList.add("is-active");
					tab.setAttribute("aria-selected", "true");
				} else {
					tab.classList.remove("is-active");
					tab.setAttribute("aria-selected", "false");
				}
			});

			toggleBtns.forEach(function (btn) {
				const textSpan = btn.querySelector(".bi-hero__pause-text");
				const pauseIcons = btn.querySelectorAll(".bi-hero__icon-pause, .bi-icon-pause");
				const playIcons = btn.querySelectorAll(".bi-hero__icon-play, .bi-icon-play");

				if (isPaused) {
					if (textSpan) textSpan.textContent = "Play video";
					pauseIcons.forEach(function (el) {
						el.setAttribute("hidden", "");
						el.style.display = "none";
					});
					playIcons.forEach(function (el) {
						el.removeAttribute("hidden");
						el.style.display = "";
					});
					btn.setAttribute("aria-label", "Play video and slideshow");
				} else {
					if (textSpan) textSpan.textContent = "Pause video";
					pauseIcons.forEach(function (el) {
						el.removeAttribute("hidden");
						el.style.display = "";
					});
					playIcons.forEach(function (el) {
						el.setAttribute("hidden", "");
						el.style.display = "none";
					});
					btn.setAttribute("aria-label", "Pause video and slideshow");
				}
			});
		}

		function startProgress() {
			cancelAnimationFrame(animationFrameId);
			startTime = performance.now() - elapsedTime;

			function step(now) {
				if (isPaused) {
					return;
				}

				elapsedTime = now - startTime;
				const progressPercent = Math.min((elapsedTime / DURATION) * 100, 100);

				if (progressBar) {
					progressBar.style.width = progressPercent + "%";
				}

				if (elapsedTime >= DURATION) {
					nextSlide();
				} else {
					animationFrameId = requestAnimationFrame(step);
				}
			}

			animationFrameId = requestAnimationFrame(step);
		}

		function goToSlide(targetIdx) {
			if (targetIdx === currentIndex) {
				return;
			}
			pauseActiveVideo();

			currentIndex = (targetIdx + slides.length) % slides.length;
			elapsedTime = 0;

			if (progressBar) {
				progressBar.style.width = "0%";
			}

			updateUI();
			playActiveVideo();

			if (!isPaused) {
				startProgress();
			}
		}

		function nextSlide() {
			goToSlide((currentIndex + 1) % slides.length);
		}

		function prevSlide() {
			goToSlide((currentIndex - 1 + slides.length) % slides.length);
		}

		function togglePause() {
			isPaused = !isPaused;
			if (isPaused) {
				pauseActiveVideo();
				cancelAnimationFrame(animationFrameId);
			} else {
				playActiveVideo();
				startProgress();
			}
			updateUI();
		}

		// Event Listeners
		toggleBtns.forEach(function (btn) {
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				togglePause();
			});
		});

		if (prevBtn) {
			prevBtn.addEventListener("click", function (e) {
				e.preventDefault();
				prevSlide();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", function (e) {
				e.preventDefault();
				nextSlide();
			});
		}

		tabs.forEach(function (tab) {
			tab.addEventListener("click", function (e) {
				e.preventDefault();
				const targetIdx = parseInt(tab.getAttribute("data-bi-hero-goto"), 10);
				if (!isNaN(targetIdx)) {
					goToSlide(targetIdx);
				}
			});
		});

		// Keyboard Navigation
		hero.addEventListener("keydown", function (e) {
			if (e.key === "ArrowLeft") {
				prevSlide();
			} else if (e.key === "ArrowRight") {
				nextSlide();
			} else if (e.key === " ") {
				togglePause();
			}
		});

		// Init
		updateUI();
		playActiveVideo();
		startProgress();
	}

	function initBetterInsightsSolutionsSlider() {
		const sliderRoot = document.querySelector("[data-bi-slider-root]");
		if (!sliderRoot) return;

		const trackContainer = sliderRoot.querySelector("[data-bi-slider-track-container]");
		const track = sliderRoot.querySelector("[data-bi-slider-track]");
		const items = Array.from(sliderRoot.querySelectorAll("[data-bi-slider-item]"));
		const prevBtn = sliderRoot.querySelector("[data-bi-slider-prev]");
		const nextBtn = sliderRoot.querySelector("[data-bi-slider-next]");
		const progressBar = sliderRoot.querySelector("[data-bi-slider-progress]");

		if (!track || items.length === 0) return;

		let currentTranslateX = 0;
		let maxTranslateX = 0;
		let isDragging = false;
		let startX = 0;
		let dragStartTranslateX = 0;

		function calculateMaxScroll() {
			const containerWidth = trackContainer.getBoundingClientRect().width;
			const trackWidth = track.scrollWidth;
			maxTranslateX = Math.max(0, trackWidth - containerWidth);
			clampAndApplyPosition(currentTranslateX);
		}

		function clampAndApplyPosition(translateX, animate) {
			if (typeof animate === "undefined") animate = true;
			currentTranslateX = Math.max(0, Math.min(translateX, maxTranslateX));

			if (animate) {
				track.classList.remove("is-dragging");
				trackContainer.classList.remove("is-dragging");
			} else {
				track.classList.add("is-dragging");
				trackContainer.classList.add("is-dragging");
			}

			track.style.transform = "translateX(-" + currentTranslateX + "px)";
			updateControls();
		}

		function updateControls() {
			if (prevBtn) {
				if (currentTranslateX <= 5) {
					prevBtn.setAttribute("disabled", "true");
				} else {
					prevBtn.removeAttribute("disabled");
				}
			}

			if (nextBtn) {
				if (currentTranslateX >= maxTranslateX - 5) {
					nextBtn.setAttribute("disabled", "true");
				} else {
					nextBtn.removeAttribute("disabled");
				}
			}

			if (progressBar) {
				const progressRatio = maxTranslateX > 0 ? Math.min(Math.max(currentTranslateX / maxTranslateX, 0), 1) : 0;
				if (typeof gsap !== "undefined") {
					gsap.set(progressBar, { transformOrigin: "left center", scaleX: progressRatio });
				} else {
					progressBar.style.transformOrigin = "left center";
					progressBar.style.transform = "scaleX(" + progressRatio + ")";
				}
			}
		}

		function getStepDistance() {
			if (items.length > 1) {
				const itemWidth = items[1].getBoundingClientRect().width;
				const gap = 24;
				return itemWidth + gap;
			}
			return 320;
		}

		function stepNext() {
			if (window.innerWidth > 1024 && typeof ScrollTrigger !== "undefined") {
				const st = ScrollTrigger.getById ? ScrollTrigger.getById("solutions-scrolltrigger") : null;
				if (st) {
					const stepProgress = 1 / Math.max(1, items.length - 1);
					const targetProg = Math.min(1, st.progress + stepProgress);
					const targetY = st.start + targetProg * (st.end - st.start);
					window.scrollTo({ top: targetY, behavior: "smooth" });
					return;
				}
			}
			const step = getStepDistance();
			clampAndApplyPosition(currentTranslateX + step, true);
		}

		function stepPrev() {
			if (window.innerWidth > 1024 && typeof ScrollTrigger !== "undefined") {
				const st = ScrollTrigger.getById ? ScrollTrigger.getById("solutions-scrolltrigger") : null;
				if (st) {
					const stepProgress = 1 / Math.max(1, items.length - 1);
					const targetProg = Math.max(0, st.progress - stepProgress);
					const targetY = st.start + targetProg * (st.end - st.start);
					window.scrollTo({ top: targetY, behavior: "smooth" });
					return;
				}
			}
			const step = getStepDistance();
			clampAndApplyPosition(currentTranslateX - step, true);
		}

		// Click events
		if (prevBtn) {
			prevBtn.addEventListener("click", function (e) {
				e.preventDefault();
				stepPrev();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", function (e) {
				e.preventDefault();
				stepNext();
			});
		}

		// Drag Events (Mouse)
		trackContainer.addEventListener("mousedown", function (e) {
			isDragging = true;
			startX = e.pageX;
			dragStartTranslateX = currentTranslateX;
			trackContainer.classList.add("is-dragging");
			track.classList.add("is-dragging");
		});

		window.addEventListener("mousemove", function (e) {
			if (!isDragging) return;
			const deltaX = e.pageX - startX;
			clampAndApplyPosition(dragStartTranslateX - deltaX, false);
		});

		window.addEventListener("mouseup", function () {
			if (isDragging) {
				isDragging = false;
				clampAndApplyPosition(currentTranslateX, true);
			}
		});

		// Touch Events (Mobile)
		trackContainer.addEventListener("touchstart", function (e) {
			if (e.touches.length === 1) {
				isDragging = true;
				startX = e.touches[0].pageX;
				dragStartTranslateX = currentTranslateX;
			}
		}, { passive: true });

		trackContainer.addEventListener("touchmove", function (e) {
			if (!isDragging || e.touches.length !== 1) return;
			const deltaX = e.touches[0].pageX - startX;
			clampAndApplyPosition(dragStartTranslateX - deltaX, false);
		}, { passive: true });

		trackContainer.addEventListener("touchend", function () {
			if (isDragging) {
				isDragging = false;
				clampAndApplyPosition(currentTranslateX, true);
			}
		});

		// Keyboard Events
		sliderRoot.addEventListener("keydown", function (e) {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				stepPrev();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				stepNext();
			}
		});

		// Window Resize
		window.addEventListener("resize", function () {
			calculateMaxScroll();
		});

		// Init
		calculateMaxScroll();
	}

	function initBetterInsightsOurWorkCarousel() {
		const carouselRoot = document.querySelector("[data-bi-work-carousel]");
		if (!carouselRoot) return;

		const cards = Array.from(carouselRoot.querySelectorAll(".bi-our-work-card"));
		const prevBtns = Array.from(carouselRoot.querySelectorAll("[data-bi-work-prev]"));
		const nextBtns = Array.from(carouselRoot.querySelectorAll("[data-bi-work-next]"));
		const counters = Array.from(carouselRoot.querySelectorAll("[data-bi-work-current]"));

		if (cards.length === 0) return;

		let currentIndex = 0;
		const total = cards.length;
		let startX = 0;
		let isSwiping = false;

		function formatNum(num) {
			return num < 10 ? "0" + num : "" + num;
		}

		function updateDeck() {
			cards.forEach(function (card, index) {
				// Calculate relative position in stack (0 = active front, 1 = layer 1, etc.)
				const relPos = (index - currentIndex + total) % total;

				// Remove existing stack classes
				card.classList.remove("is-active", "is-stack-1", "is-stack-2", "is-stack-3");

				if (relPos === 0) {
					card.classList.add("is-active");
					card.removeAttribute("aria-hidden");
				} else {
					card.classList.add("is-stack-" + relPos);
					card.setAttribute("aria-hidden", "true");
				}
			});

			// Update counter text
			counters.forEach(function (c) {
				c.textContent = formatNum(currentIndex + 1);
			});

			// Update Nav Button Disabled States
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

		function goToSlide(targetIndex) {
			if (targetIndex < 0 || targetIndex >= total || targetIndex === currentIndex) {
				return;
			}
			currentIndex = targetIndex;
			updateDeck();
		}

		function nextSlide() {
			if (currentIndex < total - 1) {
				goToSlide(currentIndex + 1);
			}
		}

		function prevSlide() {
			if (currentIndex > 0) {
				goToSlide(currentIndex - 1);
			}
		}

		// Button Event Listeners
		carouselRoot.addEventListener("click", function (e) {
			const prevTarget = e.target.closest("[data-bi-work-prev]");
			const nextTarget = e.target.closest("[data-bi-work-next]");

			if (prevTarget) {
				e.preventDefault();
				prevSlide();
			} else if (nextTarget) {
				e.preventDefault();
				nextSlide();
			}
		});

		// Touch & Drag Support
		carouselRoot.addEventListener("touchstart", function (e) {
			if (e.touches.length === 1) {
				startX = e.touches[0].pageX;
				isSwiping = true;
			}
		}, { passive: true });

		carouselRoot.addEventListener("touchend", function (e) {
			if (!isSwiping || e.changedTouches.length === 0) return;
			isSwiping = false;
			const deltaX = e.changedTouches[0].pageX - startX;
			if (deltaX < -50) {
				nextSlide();
			} else if (deltaX > 50) {
				prevSlide();
			}
		}, { passive: true });

		carouselRoot.addEventListener("mousedown", function (e) {
			startX = e.pageX;
			isSwiping = true;
		});

		carouselRoot.addEventListener("mouseup", function (e) {
			if (!isSwiping) return;
			isSwiping = false;
			const deltaX = e.pageX - startX;
			if (deltaX < -60) {
				nextSlide();
			} else if (deltaX > 60) {
				prevSlide();
			}
		});

		// Keyboard Arrow Navigation
		carouselRoot.addEventListener("keydown", function (e) {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				prevSlide();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				nextSlide();
			}
		});

		// Initial setup
		updateDeck();
	}

	function initBetterInsightsScrollReveal() {
		const revealElements = document.querySelectorAll(
			".bi-reveal, .bi-reveal-clip, .bi-reveal-img, .bi-beliefs-intro, .bi-solutions-header, .bi-services-header, .bi-our-work-header, .bi-tech-partners__header, .bi-resource-center__header, .bi-statement-container"
		);

		if (revealElements.length === 0) return;

		// Make all elements visible by default
		revealElements.forEach(function (el) {
			el.classList.add("is-in-view");
		});

		if (!("IntersectionObserver" in window)) return;

		const observer = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in-view");
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px 50px 0px"
			}
		);

		revealElements.forEach(function (el) {
			el.classList.add("bi-animate-ready");
			observer.observe(el);
		});

		// Failsafe timer: guarantee all elements are visible
		setTimeout(function () {
			revealElements.forEach(function (el) {
				el.classList.add("is-in-view");
			});
		}, 250);
	}

	function initBetterInsightsScrollProgress() {
		const progressBar = document.querySelector(".bi-scroll-progress__bar");
		if (!progressBar) return;

		let ticking = false;

		function updateProgress() {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

			progressBar.style.transform = "scaleY(" + progress + ")";
			ticking = false;
		}

		window.addEventListener(
			"scroll",
			function () {
				if (!ticking) {
					requestAnimationFrame(updateProgress);
					ticking = true;
				}
			},
			{ passive: true }
		);

		updateProgress();
	}

	/**
	 * Phase 2B: Homepage Scroll-Transition Pilot — AI Solutions Spotlight
	 * Manages seamless light-to-dark transition using lightweight IntersectionObserver.
	 * Reverses state naturally when user scrolls back upward into We Believe section.
	 */
	function initBetterInsightsSolutionsThemeTransition() {
		const section = document.querySelector(".bi-solutions-section");
		if (!section) return;

		// Prevent duplicate observer attachments
		if (section.dataset.themeObserverInit === "true") return;
		section.dataset.themeObserverInit = "true";

		if (!("IntersectionObserver" in window)) {
			// Fallback if IntersectionObserver is not supported: set dark theme directly
			section.classList.add("bi-theme--dark");
			section.setAttribute("data-theme", "dark");
			return;
		}

		// Trigger boundary: when section top crosses into lower 25% of viewport
		const observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						section.classList.add("bi-theme--dark");
						section.setAttribute("data-theme", "dark");
					} else {
						// Only revert to light when scrolling back upward (section top is below viewport)
						if (entry.boundingClientRect.top > 0) {
							section.classList.remove("bi-theme--dark");
							section.removeAttribute("data-theme");
						}
					}
				});
			},
			{
				root: null,
				rootMargin: "0px 0px -25% 0px",
				threshold: [0, 0.1, 0.2]
			}
		);

		observer.observe(section);
	}
})();
