(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const container = document.getElementById("bi-shared-mega-menu") || document.querySelector("[data-bi-mega-container]");
		if (!container) {
			return;
		}

		if (typeof gsap === "undefined") {
			console.warn("GSAP is required for Better Insights mega menu interactions.");
			return;
		}

		const viewsMap = {};
		const viewElements = container.querySelectorAll("[data-bi-mega-view]");
		viewElements.forEach(function (v) {
			const key = v.getAttribute("data-bi-mega-view");
			if (key) {
				viewsMap[key] = v;
			}
		});

		function isDesktop() {
			return window.innerWidth >= 1200;
		}

		function prefersReducedMotion() {
			return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}

		function getTriggerKey(el) {
			if (!el) {
				return null;
			}
			const dataKey = el.getAttribute("data-mega-menu") || el.getAttribute("data-bi-mega-trigger");
			if (dataKey && dataKey !== "true" && dataKey !== "") {
				return dataKey;
			}
			if (el.hasAttribute("data-bi-search-open")) {
				return "search";
			}
			return null;
		}

		const megaTriggers = Array.from(
			document.querySelectorAll('[data-mega-menu], [data-bi-mega-trigger], [data-bi-search-open]')
		).filter(function (el) {
			return getTriggerKey(el) !== null;
		});

		function getViewContentItems(viewEl) {
			if (!viewEl) {
				return [];
			}
			const selectors = [
				".bi-what-we-do-menu__item",
				".bi-what-we-do-menu__heading",
				".bi-what-we-do-menu__col",
				".bi-what-we-do-menu__view-all-wrap",
				".bi-insights-mega__title",
				".bi-insights-mega__cta",
				".bi-insights-mega__col",
				".bi-about-menu__column",
				".bi-contact-menu__column",
				".bi-search-menu__form"
			];
			const items = viewEl.querySelectorAll(selectors.join(", "));
			return Array.from(items);
		}

		const menuController = {
			currentKey: null,
			activeTrigger: null,
			openTimer: null,
			closeTimer: null,
			currentTimeline: null,

			updateTriggerStates: function (activeKey) {
				megaTriggers.forEach(function (t) {
					const key = getTriggerKey(t);
					const isMatch = (key === activeKey);
					t.setAttribute("aria-expanded", isMatch ? "true" : "false");
					if (t.parentElement) {
						t.parentElement.classList.toggle("is-open", isMatch);
					}
				});
			},

			open: function (targetKey, triggerEl) {
				window.clearTimeout(this.openTimer);
				window.clearTimeout(this.closeTimer);

				if (!targetKey || !viewsMap[targetKey]) {
					return;
				}

				if (this.currentKey === targetKey) {
					return;
				}

				if (this.currentKey && this.currentKey !== targetKey) {
					this.switchView(targetKey, triggerEl);
					return;
				}

				const targetView = viewsMap[targetKey];
				this.currentKey = targetKey;
				this.activeTrigger = triggerEl || null;
				this.updateTriggerStates(targetKey);

				Object.keys(viewsMap).forEach(function (k) {
					if (k === targetKey) {
						viewsMap[k].style.display = "block";
						viewsMap[k].removeAttribute("hidden");
						viewsMap[k].classList.add("is-active");
					} else {
						viewsMap[k].style.display = "none";
						viewsMap[k].setAttribute("hidden", "");
						viewsMap[k].classList.remove("is-active");
					}
				});

				container.removeAttribute("hidden");
				container.classList.add("is-active");

				if (this.currentTimeline) {
					this.currentTimeline.kill();
				}

				const contentItems = getViewContentItems(targetView);

				if (prefersReducedMotion()) {
					gsap.set(container, {
						display: "block",
						autoAlpha: 1,
						y: 0,
						clipPath: "inset(0 0 0% 0 round 0 0 20px 20px)",
						pointerEvents: "auto"
					});
					if (contentItems.length) {
						gsap.set(contentItems, { autoAlpha: 1, y: 0 });
					}
					return;
				}

				gsap.set(container, {
					display: "block",
					autoAlpha: 0,
					y: -14,
					clipPath: "inset(0 0 100% 0 round 0 0 20px 20px)",
					pointerEvents: "auto"
				});
				if (contentItems.length) {
					gsap.set(contentItems, { autoAlpha: 0, y: 8 });
				}

				const tl = gsap.timeline();
				this.currentTimeline = tl;

				tl.to(container, {
					autoAlpha: 1,
					y: 0,
					clipPath: "inset(0 0 0% 0 round 0 0 20px 20px)",
					duration: 0.42,
					ease: "power3.out"
				});

				if (contentItems.length > 0) {
					tl.to(
						contentItems,
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.35,
							stagger: 0.04,
							ease: "power2.out"
						},
						"-=0.28"
					);
				}

				if (targetKey === "search") {
					const searchInput = container.querySelector(".bi-search-menu__input");
					if (searchInput) {
						tl.add(function () {
							searchInput.focus();
						});
					}
				}
			},

			close: function (immediate) {
				window.clearTimeout(this.openTimer);
				window.clearTimeout(this.closeTimer);

				if (!this.currentKey && container.hasAttribute("hidden")) {
					return;
				}

				const self = this;
				this.currentKey = null;
				this.activeTrigger = null;
				this.updateTriggerStates(null);

				if (this.currentTimeline) {
					this.currentTimeline.kill();
				}

				const finalizeClose = function () {
					container.setAttribute("hidden", "");
					container.classList.remove("is-active");
					gsap.set(container, {
						display: "none",
						autoAlpha: 0,
						pointerEvents: "none",
						clipPath: "inset(0 0 100% 0 round 0 0 20px 20px)"
					});
					Object.keys(viewsMap).forEach(function (k) {
						viewsMap[k].style.display = "none";
						viewsMap[k].setAttribute("hidden", "");
						viewsMap[k].classList.remove("is-active");
					});
				};

				if (immediate || prefersReducedMotion()) {
					finalizeClose();
					return;
				}

				const tl = gsap.timeline({
					onComplete: finalizeClose
				});
				this.currentTimeline = tl;

				tl.to(container, {
					autoAlpha: 0,
					y: -6,
					clipPath: "inset(0 0 100% 0 round 0 0 20px 20px)",
					duration: 0.24,
					ease: "power2.in"
				});
			},

			switchView: function (targetKey, triggerEl) {
				window.clearTimeout(this.openTimer);
				window.clearTimeout(this.closeTimer);

				if (!targetKey || !viewsMap[targetKey] || this.currentKey === targetKey) {
					return;
				}

				const outgoingKey = this.currentKey;
				const outgoingView = viewsMap[outgoingKey];
				const incomingView = viewsMap[targetKey];

				this.currentKey = targetKey;
				this.activeTrigger = triggerEl || null;
				this.updateTriggerStates(targetKey);

				if (this.currentTimeline) {
					this.currentTimeline.kill();
				}

				const incomingItems = getViewContentItems(incomingView);

				if (prefersReducedMotion()) {
					if (outgoingView) {
						outgoingView.style.display = "none";
						outgoingView.setAttribute("hidden", "");
						outgoingView.classList.remove("is-active");
					}
					incomingView.style.display = "block";
					incomingView.removeAttribute("hidden");
					incomingView.classList.add("is-active");
					if (incomingItems.length) {
						gsap.set(incomingItems, { autoAlpha: 1, y: 0 });
					}
					return;
				}

				const tl = gsap.timeline();
				this.currentTimeline = tl;

				incomingView.style.display = "block";
				incomingView.removeAttribute("hidden");
				incomingView.classList.add("is-active");
				if (incomingItems.length) {
					gsap.set(incomingItems, { autoAlpha: 0, y: 8 });
				}

				if (outgoingView) {
					const outgoingItems = getViewContentItems(outgoingView);
					tl.to(outgoingItems.length ? outgoingItems : outgoingView, {
						autoAlpha: 0,
						duration: 0.14,
						ease: "power2.in",
						onComplete: function () {
							outgoingView.style.display = "none";
							outgoingView.setAttribute("hidden", "");
							outgoingView.classList.remove("is-active");
						}
					});
				}

				if (incomingItems.length) {
					tl.to(
						incomingItems,
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.32,
							stagger: 0.035,
							ease: "power2.out"
						},
						"-=0.06"
					);
				}

				if (targetKey === "search") {
					const searchInput = container.querySelector(".bi-search-menu__input");
					if (searchInput) {
						tl.add(function () {
							searchInput.focus();
						});
					}
				}
			}
		};

		megaTriggers.forEach(function (trigger) {
			const key = getTriggerKey(trigger);
			trigger.setAttribute("aria-controls", "bi-shared-mega-menu");
			trigger.setAttribute("aria-haspopup", "true");
			if (!trigger.hasAttribute("aria-expanded")) {
				trigger.setAttribute("aria-expanded", "false");
			}

			const parentLi = trigger.parentElement;

			if (parentLi) {
				parentLi.addEventListener("mouseenter", function () {
					if (!isDesktop()) {
						return;
					}
					window.clearTimeout(menuController.closeTimer);
					menuController.openTimer = window.setTimeout(function () {
						menuController.open(key, trigger);
					}, 90);
				});

				parentLi.addEventListener("mouseleave", function () {
					if (!isDesktop()) {
						return;
					}
					window.clearTimeout(menuController.openTimer);
					menuController.closeTimer = window.setTimeout(function () {
						menuController.close(false);
					}, 140);
				});
			}

			trigger.addEventListener("click", function (e) {
				if (!isDesktop()) {
					return;
				}
				e.preventDefault();

				if (menuController.currentKey === key) {
					menuController.close(false);
				} else {
					menuController.open(key, trigger);
				}
			});

			trigger.addEventListener("keydown", function (e) {
				if (!isDesktop()) {
					return;
				}
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					if (menuController.currentKey === key) {
						menuController.close(false);
					} else {
						menuController.open(key, trigger);
					}
				}
			});
		});

		const allNavItems = document.querySelectorAll(".bi-nav__item");
		allNavItems.forEach(function (li) {
			const link = li.querySelector(".bi-nav__link");
			if (link && !getTriggerKey(link)) {
				li.addEventListener("mouseenter", function () {
					if (isDesktop() && menuController.currentKey) {
						window.clearTimeout(menuController.openTimer);
						menuController.close(false);
					}
				});
			}
		});

		container.addEventListener("mouseenter", function () {
			if (isDesktop()) {
				window.clearTimeout(menuController.openTimer);
				window.clearTimeout(menuController.closeTimer);
			}
		});

		container.addEventListener("mouseleave", function () {
			if (isDesktop()) {
				window.clearTimeout(menuController.openTimer);
				menuController.closeTimer = window.setTimeout(function () {
					menuController.close(false);
				}, 140);
			}
		});

		document.addEventListener("click", function (event) {
			if (!isDesktop() || !menuController.currentKey) {
				return;
			}

			const isInsideContainer = container.contains(event.target);
			let isInsideTrigger = false;
			megaTriggers.forEach(function (t) {
				if (t.contains(event.target)) {
					isInsideTrigger = true;
				}
			});

			if (!isInsideContainer && !isInsideTrigger) {
				menuController.close(false);
			}
		});

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && menuController.currentKey) {
				const activeTrig = menuController.activeTrigger;
				menuController.close(false);
				if (activeTrig && typeof activeTrig.focus === "function") {
					activeTrig.focus();
				}
			}
		});

		window.addEventListener("resize", function () {
			if (!isDesktop() && menuController.currentKey) {
				menuController.close(true);
			}
		});
	});
})();
