/**
 * Better Insights - About Page Section 5: Company Information & Capabilities Explorer Controller
 * Manages interactive capability navigation, hover previews with intent debouncing, coordinated
 * exit/enter stage transitions, keyboard accessibility, and state synchronization.
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const section = document.querySelector(".bi-about-company-info");
		if (!section) {
			return;
		}

		// 1. Entrance Motion with GSAP ScrollTrigger (if available and motion preferred)
		const prefersReducedMotion =
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!prefersReducedMotion && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
			const leftCol = section.querySelector(".bi-about-company-info__left");
			const rightStage = section.querySelector(".bi-about-company-info__right-display");
			const cols = [leftCol, rightStage].filter(Boolean);

			if (cols.length > 0) {
				gsap.set(cols, { autoAlpha: 0, y: 26 });

				ScrollTrigger.create({
					trigger: section,
					start: "top 80%",
					once: true,
					onEnter: function () {
						gsap.to(cols, {
							autoAlpha: 1,
							y: 0,
							duration: 0.72,
							stagger: 0.14,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(cols, { clearProps: "transform,opacity,visibility" });
							}
						});
					}
				});
			}
		}

		// 2. Interactive Capabilities Explorer Controller
		const navButtons = Array.from(section.querySelectorAll(".bi-about-company-info__nav-btn"));
		const panels = Array.from(section.querySelectorAll(".bi-about-company-info__content-panel"));
		const navContainer = section.querySelector(".bi-about-company-info__groups");

		if (!navButtons.length || !panels.length) {
			return;
		}

		// Timing configuration (tuned to specification)
		const HOVER_INTENT_DELAY = 130;   // 100–150ms hover-intent delay
		const EXIT_DURATION = 200;        // 180–250ms text fade-out
		const ENTER_IMAGE_DURATION = 520; // 450–600ms image transition
		const REVERT_DELAY = 180;         // Graceful delay before reverting to locked tab

		// State management
		let currentActiveId = "digital-growth";
		let selectedLockedId = "digital-growth";
		let hoverIntentTimer = null;
		let revertTimer = null;
		let exitTimer = null;
		let enterTimer = null;
		let isSwitching = false;
		let pendingTargetId = null;

		function updateNavButtons(activeId) {
			navButtons.forEach(function (btn) {
				const isCurrent = btn.dataset.capabilityId === activeId;
				btn.classList.toggle("is-active", isCurrent);
				btn.setAttribute("aria-selected", isCurrent ? "true" : "false");
				btn.setAttribute("tabindex", isCurrent ? "0" : "-1");
			});
		}

		function switchCapability(targetId, isLocked, isImmediate) {
			if (!targetId) {
				return;
			}

			if (isLocked) {
				selectedLockedId = targetId;
			}

			// If target is already active and steady, no animation needed
			if (targetId === currentActiveId && !isSwitching) {
				updateNavButtons(targetId);
				return;
			}

			// If already in the middle of a switch, queue the latest target
			if (isSwitching) {
				pendingTargetId = targetId;
				return;
			}

			// Reduced motion: instant swap without delay
			if (prefersReducedMotion) {
				currentActiveId = targetId;
				updateNavButtons(targetId);
				panels.forEach(function (p) {
					const isMatch = p.dataset.capabilityId === targetId;
					p.classList.toggle("is-active", isMatch);
					p.classList.remove("is-exiting");
					p.setAttribute("aria-hidden", isMatch ? "false" : "true");
				});
				return;
			}

			isSwitching = true;
			const fromId = currentActiveId;
			const toId = targetId;
			const fromPanel = section.querySelector('.bi-about-company-info__content-panel[data-capability-id="' + fromId + '"]');
			const toPanel = section.querySelector('.bi-about-company-info__content-panel[data-capability-id="' + toId + '"]');

			if (!toPanel) {
				isSwitching = false;
				return;
			}

			// Immediately update active tab indicator so it glides smoothly (300–400ms)
			updateNavButtons(toId);

			// Start exit transition on current panel (180–250ms)
			if (fromPanel && fromPanel !== toPanel) {
				fromPanel.classList.add("is-exiting");
				fromPanel.classList.remove("is-active");
			}

			clearTimeout(exitTimer);
			exitTimer = setTimeout(function () {
				// Retrieve final target in case another was requested during exit
				const finalTargetId = pendingTargetId || toId;
				pendingTargetId = null;
				currentActiveId = finalTargetId;

				const finalToPanel =
					section.querySelector('.bi-about-company-info__content-panel[data-capability-id="' + finalTargetId + '"]') || toPanel;

				// Deactivate other panels cleanly
				panels.forEach(function (p) {
					if (p !== finalToPanel) {
						p.classList.remove("is-active", "is-exiting");
						p.setAttribute("aria-hidden", "true");
					}
				});

				updateNavButtons(finalTargetId);

				// Activate the target panel and enter smoothly
				finalToPanel.classList.remove("is-exiting");
				finalToPanel.classList.add("is-active");
				finalToPanel.setAttribute("aria-hidden", "false");

				clearTimeout(enterTimer);
				enterTimer = setTimeout(function () {
					isSwitching = false;

					// If a new target was queued during enter, transition to it
					if (pendingTargetId && pendingTargetId !== currentActiveId) {
						const nextId = pendingTargetId;
						pendingTargetId = null;
						switchCapability(nextId, nextId === selectedLockedId, false);
					}
				}, ENTER_IMAGE_DURATION);

			}, EXIT_DURATION);
		}

		const isFinePointer =
			window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

		navButtons.forEach(function (btn, index) {
			const capId = btn.dataset.capabilityId;

			// Desktop Hover Preview: 130ms hover-intent delay
			if (isFinePointer) {
				btn.addEventListener("mouseenter", function () {
					clearTimeout(hoverIntentTimer);
					clearTimeout(revertTimer);

					if (capId === currentActiveId && !isSwitching) {
						return;
					}

					hoverIntentTimer = setTimeout(function () {
						switchCapability(capId, false, false);
					}, HOVER_INTENT_DELAY);
				});
			}

			// Click Selection: immediate selection, locks capability
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				clearTimeout(hoverIntentTimer);
				clearTimeout(revertTimer);
				switchCapability(capId, true, true);
			});

			// Touch Selection: tap-to-select immediately
			btn.addEventListener(
				"touchend",
				function () {
					clearTimeout(hoverIntentTimer);
					clearTimeout(revertTimer);
					switchCapability(capId, true, true);
				},
				{ passive: true }
			);

			// Keyboard Navigation
			btn.addEventListener("keydown", function (e) {
				let targetIndex = -1;

				if (e.key === "ArrowDown") {
					e.preventDefault();
					targetIndex = (index + 1) % navButtons.length;
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					targetIndex = (index - 1 + navButtons.length) % navButtons.length;
				} else if (e.key === "Home") {
					e.preventDefault();
					targetIndex = 0;
				} else if (e.key === "End") {
					e.preventDefault();
					targetIndex = navButtons.length - 1;
				} else if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					clearTimeout(hoverIntentTimer);
					clearTimeout(revertTimer);
					switchCapability(capId, true, true);
					return;
				}

				if (targetIndex >= 0) {
					const targetBtn = navButtons[targetIndex];
					targetBtn.focus();
					clearTimeout(hoverIntentTimer);
					clearTimeout(revertTimer);
					switchCapability(targetBtn.dataset.capabilityId, true, false);
				}
			});
		});

		// Graceful revert when cursor leaves the menu area on desktop
		if (isFinePointer && navContainer) {
			navContainer.addEventListener("mouseleave", function () {
				clearTimeout(hoverIntentTimer);
				clearTimeout(revertTimer);

				if (currentActiveId !== selectedLockedId) {
					revertTimer = setTimeout(function () {
						switchCapability(selectedLockedId, false, false);
					}, REVERT_DELAY);
				}
			});
		}
	});
})();
