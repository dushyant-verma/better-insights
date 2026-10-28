(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		initBetterInsightsCustomCursor();
	});

	function initBetterInsightsCustomCursor() {
		// Responsive & Device checks
		if (
			window.innerWidth <= 1024 ||
			(window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
			(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
		) {
			return;
		}

		// Create cursor DOM element if not present
		let cursor = document.getElementById("bi-cursor");
		if (!cursor) {
			cursor = document.createElement("div");
			cursor.id = "bi-cursor";
			cursor.className = "bi-cursor";
			cursor.setAttribute("aria-hidden", "true");

			const dot = document.createElement("div");
			dot.className = "bi-cursor__dot";
			cursor.appendChild(dot);

			document.body.appendChild(cursor);
		}

		document.body.classList.add("bi-custom-cursor-active");

		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;
		let cursorX = mouseX;
		let cursorY = mouseY;
		let isHoveringLink = false;
		let isHoveringCard = false;
		let isClicking = false;

		// Move cursor smoothly using GSAP ticker if available, or requestAnimationFrame
		if (typeof gsap !== "undefined") {
			gsap.set(cursor, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY, autoAlpha: 0 });

			const xSet = gsap.quickSetter(cursor, "x", "px");
			const ySet = gsap.quickSetter(cursor, "y", "px");

			gsap.ticker.add(function () {
				const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
				cursorX += (mouseX - cursorX) * dt;
				cursorY += (mouseY - cursorY) * dt;
				xSet(cursorX);
				ySet(cursorY);
			});
		} else {
			function render() {
				cursorX += (mouseX - cursorX) * 0.25;
				cursorY += (mouseY - cursorY) * 0.25;
				cursor.style.transform = "translate(" + cursorX + "px, " + cursorY + "px)";
				requestAnimationFrame(render);
			}
			requestAnimationFrame(render);
		}

		// Mouse Movement Tracking
		window.addEventListener("mousemove", function (e) {
			mouseX = e.clientX;
			mouseY = e.clientY;

			if (!cursor.classList.contains("is-active")) {
				cursor.classList.add("is-active");
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
				} else {
					cursor.style.opacity = "1";
				}
			}
		}, { passive: true });

		// Mouse Leave / Enter Window
		document.addEventListener("mouseleave", function () {
			cursor.classList.remove("is-active");
			if (typeof gsap !== "undefined") {
				gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
			} else {
				cursor.style.opacity = "0";
			}
		});

		document.addEventListener("mouseenter", function () {
			cursor.classList.add("is-active");
			if (typeof gsap !== "undefined") {
				gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
			} else {
				cursor.style.opacity = "1";
			}
		});

		// Hover Element Detection using Event Delegation
		document.addEventListener("mouseover", function (e) {
			const target = e.target;
			if (!target) return;

			// Text inputs check -> hide custom cursor for native I-beam cursor
			const isTextInput = target.closest('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea, [contenteditable="true"]');
			if (isTextInput) {
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { autoAlpha: 0, duration: 0.15 });
				} else {
					cursor.style.opacity = "0";
				}
				return;
			} else {
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { autoAlpha: 1, duration: 0.15 });
				} else {
					cursor.style.opacity = "1";
				}
			}

			// Interactive Link/Button check
			const clickable = target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .bi-cta, .bi-nav__link, .bi-header__search-btn, .bi-burger');
			if (clickable) {
				isHoveringLink = true;
				cursor.classList.add("is-hovering-link");
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { scale: 1.6, duration: 0.25, ease: "power2.out" });
				}
				return;
			}

			// Card / Image Container check
			const cardable = target.closest('.bi-solution-card, .bi-our-work-card, .bi-service-card, .bi-client-logo-wall__cell, .bi-stacking-card, .bi-resource-card, img');
			if (cardable) {
				isHoveringCard = true;
				cursor.classList.add("is-hovering-card");
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { scale: 1.35, duration: 0.25, ease: "power2.out" });
				}
				return;
			}
		});

		document.addEventListener("mouseout", function (e) {
			const target = e.target;
			if (!target) return;

			const clickable = target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .bi-cta, .bi-nav__link, .bi-header__search-btn, .bi-burger');
			if (clickable) {
				isHoveringLink = false;
				cursor.classList.remove("is-hovering-link");
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
				}
			}

			const cardable = target.closest('.bi-solution-card, .bi-our-work-card, .bi-service-card, .bi-client-logo-wall__cell, .bi-stacking-card, .bi-resource-card, img');
			if (cardable) {
				isHoveringCard = false;
				cursor.classList.remove("is-hovering-card");
				if (typeof gsap !== "undefined") {
					gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
				}
			}
		});

		// Mouse Click Feedback
		document.addEventListener("mousedown", function () {
			isClicking = true;
			cursor.classList.add("is-clicking");
			if (typeof gsap !== "undefined") {
				gsap.to(cursor, { scale: 0.75, duration: 0.15, ease: "power2.out" });
			}
		});

		document.addEventListener("mouseup", function () {
			isClicking = false;
			cursor.classList.remove("is-clicking");
			const targetScale = isHoveringLink ? 1.6 : (isHoveringCard ? 1.35 : 1);
			if (typeof gsap !== "undefined") {
				gsap.to(cursor, { scale: targetScale, duration: 0.2, ease: "power2.out" });
			}
		});
	}
})();
