/**
 * Better Insights - About Page Section 6: Our Team Directory Grid & Profile Modal Controller
 * Sourced directly and verified from https://www.betterinsights.in/about/team/
 * Individual profile pages: https://www.betterinsights.in/teams/{profile-slug}/
 *
 * Features:
 * - GSAP Scroll entrance animation for directory grid
 * - Accessible Profile Modal with full keyboard navigation & focus trapping
 * - Displays authentic original photograph from each member's individual profile page
 * - Unshortened complete biography, expertise tags, and verified links
 * - ESC key and backdrop click to close
 * - Background scroll lock with zero layout shift
 * - Focus restoration to originating button
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const section = document.querySelector(".bi-about-team");
		if (!section) {
			return;
		}

		/* --------------------------------------------------------------------------
		   1. GSAP Scroll Entrance Animation (Grid)
		   -------------------------------------------------------------------------- */
		const prefersReducedMotion =
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
			const header = section.querySelector(".bi-about-team__header");
			const cards = section.querySelectorAll(".bi-about-team__card");

			if (header) {
				gsap.set(header, { autoAlpha: 0, y: 24 });
				ScrollTrigger.create({
					trigger: section,
					start: "top 82%",
					once: true,
					onEnter: function () {
						gsap.to(header, {
							autoAlpha: 1,
							y: 0,
							duration: 0.7,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(header, { clearProps: "all" });
							}
						});
					}
				});
			}

			if (cards && cards.length > 0) {
				gsap.set(cards, { autoAlpha: 0, y: 30 });
				ScrollTrigger.create({
					trigger: ".bi-about-team__grid",
					start: "top 86%",
					once: true,
					onEnter: function () {
						gsap.to(cards, {
							autoAlpha: 1,
							y: 0,
							duration: 0.6,
							stagger: 0.08,
							ease: "power2.out",
							onComplete: function () {
								gsap.set(cards, { clearProps: "all" });
							}
						});
					}
				});
			}
		}

		/* --------------------------------------------------------------------------
		   2. Team Dataset Loading
		   -------------------------------------------------------------------------- */
		const dataScript = document.getElementById("bi-team-modal-data");
		let teamDataMap = {};

		if (dataScript) {
			try {
				const rawData = JSON.parse(dataScript.textContent);
				if (Array.isArray(rawData)) {
					rawData.forEach(function (member) {
						if (member && member.id) {
							teamDataMap[member.id] = member;
						}
					});
				}
			} catch (err) {
				console.error("[Better Insights] Failed to parse team data JSON:", err);
			}
		}

		/* --------------------------------------------------------------------------
		   3. Modal DOM References
		   -------------------------------------------------------------------------- */
		const modal = document.getElementById("bi-team-profile-modal");
		if (!modal) {
			return;
		}

		const portraitImg = document.getElementById("bi-modal-employee-portrait");
		const deptEl = document.getElementById("bi-modal-employee-dept");
		const nameEl = document.getElementById("bi-modal-employee-name");
		const roleEl = document.getElementById("bi-modal-employee-role");
		const aboutSection = document.getElementById("bi-modal-about-section");
		const bioEl = document.getElementById("bi-modal-employee-bio");
		const expertiseSection = document.getElementById("bi-modal-expertise-section");
		const expertiseList = document.getElementById("bi-modal-employee-expertise");
		const linksRow = document.getElementById("bi-modal-links-row");
		const linkedinWrap = document.getElementById("bi-modal-employee-linkedin-wrap");
		const experienceSection = document.getElementById("bi-modal-experience-section");
		const experienceEl = document.getElementById("bi-modal-employee-experience");
		const educationSection = document.getElementById("bi-modal-education-section");
		const educationEl = document.getElementById("bi-modal-employee-education");
		const interestsSection = document.getElementById("bi-modal-interests-section");
		const interestsList = document.getElementById("bi-modal-employee-interests");
		const scrollableArea = modal.querySelector(".bi-team-modal__scrollable");
		const closeBtn = modal.querySelector(".bi-team-modal__close-btn");

		let lastFocusedElement = null;

		/* --------------------------------------------------------------------------
		   4. Helper: Focusable Elements Finder
		   -------------------------------------------------------------------------- */
		function getFocusableElements(container) {
			const selector =
				'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
			const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
			return elements.filter(function (el) {
				return el.offsetWidth > 0 || el.offsetHeight > 0 || el === closeBtn;
			});
		}

		/* --------------------------------------------------------------------------
		   5. Populate & Open Modal
		   -------------------------------------------------------------------------- */
		function openTeamModal(memberId, triggerEl) {
			const member = teamDataMap[memberId];
			if (!member) {
				console.warn("[Better Insights] No team member found for ID:", memberId);
				return;
			}

			// Store originating trigger button for focus restoration
			lastFocusedElement = triggerEl || document.activeElement;

			// 1. Original Profile Photograph (Critical Requirement)
			if (portraitImg) {
				const photoUrl = member.original_photo || member.original_photo_url || member.image;
				if (photoUrl) {
					portraitImg.src = photoUrl;
					portraitImg.alt = member.name + " - Original profile photograph";
					portraitImg.style.display = "";
				} else {
					portraitImg.style.display = "none";
				}
			}

			// 2. Department / Category
			if (deptEl) {
				if (member.department) {
					deptEl.textContent = member.department;
					deptEl.style.display = "";
				} else {
					deptEl.textContent = "";
					deptEl.style.display = "none";
				}
			}

			// 3. Name & Role (in right column header)
			if (nameEl) {
				nameEl.textContent = member.name || "";
			}
			if (roleEl) {
				roleEl.textContent = member.role || "";
			}

			// 4. Biography (Unshortened complete paragraphs)
			if (bioEl && aboutSection) {
				bioEl.innerHTML = "";
				if (member.bio && member.bio.trim().length > 0) {
					const paragraphs = member.bio.split(/\n\n+/);
					paragraphs.forEach(function (paraText) {
						const trimmed = paraText.trim();
						if (trimmed.length > 0) {
							const p = document.createElement("p");
							p.textContent = trimmed;
							bioEl.appendChild(p);
						}
					});
					aboutSection.style.display = "";
				} else {
					aboutSection.style.display = "none";
				}
			}

			// 5. Areas of Expertise
			if (expertiseList && expertiseSection) {
				expertiseList.innerHTML = "";
				if (Array.isArray(member.expertise) && member.expertise.length > 0) {
					member.expertise.forEach(function (skill) {
						const li = document.createElement("li");
						li.className = "bi-team-modal__tag";
						li.textContent = skill;
						expertiseList.appendChild(li);
					});
					expertiseSection.style.display = "";
				} else {
					expertiseSection.style.display = "none";
				}
			}

			// 6. Experience & Background (if available)
			if (experienceEl && experienceSection) {
				if (member.experience && member.experience.trim().length > 0) {
					experienceEl.textContent = member.experience.trim();
					experienceSection.style.display = "";
				} else {
					experienceEl.textContent = "";
					experienceSection.style.display = "none";
				}
			}

			// 7. Education (if available)
			if (educationEl && educationSection) {
				if (member.education && member.education.trim().length > 0) {
					educationEl.textContent = member.education.trim();
					educationSection.style.display = "";
				} else {
					educationEl.textContent = "";
					educationSection.style.display = "none";
				}
			}

			// 8. Outside Work & Interests (if available)
			if (interestsList && interestsSection) {
				interestsList.innerHTML = "";
				const interests = Array.isArray(member.interests)
					? member.interests
					: (member.interests ? [member.interests] : []);
				if (interests.length > 0) {
					interests.forEach(function (interest) {
						const li = document.createElement("li");
						li.className = "bi-team-modal__tag bi-team-modal__tag--interest";
						li.textContent = interest;
						interestsList.appendChild(li);
					});
					interestsSection.style.display = "";
				} else {
					interestsSection.style.display = "none";
				}
			}

			// 9. Verified Social Links (e.g. LinkedIn - only when available)
			// Kept self-contained inside modal; NO external profile-page redirect or "View on Better Insights"
			let hasAnyLinks = false;

			if (linkedinWrap) {
				linkedinWrap.innerHTML = "";
				if (member.linkedin) {
					hasAnyLinks = true;
					const linkedinLink = document.createElement("a");
					linkedinLink.href = member.linkedin;
					linkedinLink.target = "_blank";
					linkedinLink.rel = "noopener noreferrer";
					linkedinLink.className = "bi-team-modal__linkedin-btn";
					linkedinLink.setAttribute(
						"aria-label",
						(member.name || "Employee") + " on LinkedIn (opens in new tab)"
					);
					linkedinLink.innerHTML =
						'<svg class="bi-team-modal__linkedin-svg" viewBox="0 0 24 24" aria-hidden="true">' +
						'<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>' +
						"</svg>" +
						"<span>Connect on LinkedIn ↗</span>";
					linkedinWrap.appendChild(linkedinLink);
				}
			}

			if (linksRow) {
				linksRow.style.display = hasAnyLinks ? "" : "none";
			}

			// Reset scroll position to top
			if (scrollableArea) {
				scrollableArea.scrollTop = 0;
			}

			// Lock body scroll & prevent layout shift
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = scrollbarWidth + "px";
			}
			document.body.classList.add("bi-modal-is-open");

			// Activate modal
			modal.classList.add("is-active");
			modal.setAttribute("aria-hidden", "false");

			// Focus management: move focus into modal to close button once visible
			setTimeout(function () {
				if (closeBtn) {
					closeBtn.focus();
				}
			}, 40);
		}

		/* --------------------------------------------------------------------------
		   6. Close Modal
		   -------------------------------------------------------------------------- */
		function closeTeamModal() {
			if (!modal.classList.contains("is-active")) {
				return;
			}

			modal.classList.remove("is-active");
			modal.setAttribute("aria-hidden", "true");

			// Restore body scroll
			document.body.classList.remove("bi-modal-is-open");
			document.body.style.paddingRight = "";

			// Return focus to originating button
			if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
				lastFocusedElement.focus();
			}
			lastFocusedElement = null;
		}

		/* --------------------------------------------------------------------------
		   7. Event Listeners: Triggers, Close, ESC, Focus Trap
		   -------------------------------------------------------------------------- */

		// Open triggers on cards
		section.addEventListener("click", function (e) {
			const trigger = e.target.closest("[data-team-modal-trigger]");
			if (!trigger) {
				return;
			}

			e.preventDefault();
			const memberId = trigger.getAttribute("data-team-modal-trigger");
			if (memberId) {
				openTeamModal(memberId, trigger);
			}
		});

		// Close button and Backdrop click
		modal.addEventListener("click", function (e) {
			const closeTarget = e.target.closest("[data-team-modal-close]");
			if (closeTarget) {
				e.preventDefault();
				closeTeamModal();
			}
		});

		// Keyboard Navigation: Escape to close & Tab Focus Trap
		document.addEventListener("keydown", function (e) {
			if (!modal.classList.contains("is-active")) {
				return;
			}

			// 1. Escape key closes modal
			if (e.key === "Escape" || e.keyCode === 27) {
				e.preventDefault();
				closeTeamModal();
				return;
			}

			// 2. Tab Key Focus Trap
			if (e.key === "Tab" || e.keyCode === 9) {
				const focusableElements = getFocusableElements(modal);
				if (focusableElements.length === 0) {
					e.preventDefault();
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey) {
					// Shift + Tab: if on first element, wrap to last
					if (document.activeElement === firstElement || !modal.contains(document.activeElement)) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					// Tab: if on last element, wrap to first
					if (document.activeElement === lastElement || !modal.contains(document.activeElement)) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		});
	});
})();
