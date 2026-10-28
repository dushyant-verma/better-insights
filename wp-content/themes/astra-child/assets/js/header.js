(function () {
	"use strict";

	const header = document.querySelector("[data-bi-header]");
	if (!header) {
		return;
	}

	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const desktopQuery = window.matchMedia("(min-width: 1200px)");
	const searchRoot = document.querySelector("[data-bi-search]");
	const drawer = document.querySelector("[data-bi-drawer]");
	const searchOpenBtn = header.querySelector("[data-bi-search-open]");
	const menuOpenBtn = header.querySelector("[data-bi-menu-open]");
	const searchField = document.getElementById("bi-search-field");
	const megaItems = Array.prototype.slice.call(header.querySelectorAll(".bi-nav__item--mega"));

	let lastFocus = null;
	let hoverTimer = null;

	function prefersReducedMotion() {
		return reduceMotion.matches;
	}

	function setOverlayOpen(isOpen) {
		document.body.classList.toggle("bi-overlay-open", isOpen);
	}

	function onScroll() {
		header.classList.toggle("is-scrolled", window.scrollY > 8);
	}

	function closeMegas() {
		const sharedMenu = document.getElementById("bi-shared-mega-menu");
		if (sharedMenu) {
			sharedMenu.setAttribute("hidden", "");
			sharedMenu.classList.remove("is-active");
			if (typeof gsap !== "undefined") {
				gsap.set(sharedMenu, { autoAlpha: 0, display: "none", pointerEvents: "none" });
			}
		}
	}

	function getFocusable(container) {
		if (!container) {
			return [];
		}
		return Array.prototype.slice.call(
			container.querySelectorAll(
				'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		).filter(function (el) {
			return !el.hasAttribute("hidden") && el.offsetParent !== null;
		});
	}

	function trapFocus(container, event) {
		const focusable = getFocusable(container);
		if (!focusable.length) {
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	function openSearch() {
		if (!searchRoot) {
			return;
		}
		closeMegas();
		closeDrawer(true);
		lastFocus = document.activeElement;
		searchRoot.removeAttribute("hidden");
		searchOpenBtn.setAttribute("aria-expanded", "true");
		setOverlayOpen(true);
		window.setTimeout(function () {
			if (searchField) {
				searchField.focus();
			}
		}, 10);
	}

	function closeSearch() {
		if (!searchRoot || searchRoot.hasAttribute("hidden")) {
			return;
		}
		searchRoot.setAttribute("hidden", "");
		searchOpenBtn.setAttribute("aria-expanded", "false");
		if (!drawer || drawer.hasAttribute("hidden")) {
			setOverlayOpen(false);
		}
		if (lastFocus && typeof lastFocus.focus === "function") {
			lastFocus.focus();
		}
	}

	function openDrawer() {
		if (!drawer) {
			return;
		}
		closeSearch();
		lastFocus = document.activeElement;
		drawer.removeAttribute("hidden");
		menuOpenBtn.setAttribute("aria-expanded", "true");
		document.body.classList.add("bi-menu-open");
		setOverlayOpen(true);
		const closeBtn = drawer.querySelector("[data-bi-menu-close]");
		if (closeBtn) {
			closeBtn.focus();
		}
	}

	function closeDrawer(skipFocus) {
		if (!drawer || drawer.hasAttribute("hidden")) {
			return;
		}
		drawer.setAttribute("hidden", "");
		menuOpenBtn.setAttribute("aria-expanded", "false");
		document.body.classList.remove("bi-menu-open");
		if (!searchRoot || searchRoot.hasAttribute("hidden")) {
			setOverlayOpen(false);
		}
		if (!skipFocus && lastFocus && typeof lastFocus.focus === "function") {
			lastFocus.focus();
		}
	}

	if (searchOpenBtn) {
		searchOpenBtn.addEventListener("click", function () {
			if (searchRoot && !searchRoot.hasAttribute("hidden")) {
				closeSearch();
				return;
			}
			openSearch();
		});
	}

	if (searchRoot) {
		searchRoot.querySelectorAll("[data-bi-search-close]").forEach(function (btn) {
			btn.addEventListener("click", closeSearch);
		});
		searchRoot.addEventListener("keydown", function (event) {
			if (event.key === "Tab") {
				trapFocus(searchRoot.querySelector(".bi-search__panel"), event);
			}
		});
	}

	if (menuOpenBtn) {
		menuOpenBtn.addEventListener("click", function () {
			if (drawer && !drawer.hasAttribute("hidden")) {
				closeDrawer();
				return;
			}
			openDrawer();
		});
	}

	if (drawer) {
		drawer.querySelectorAll("[data-bi-menu-close]").forEach(function (btn) {
			btn.addEventListener("click", function () {
				closeDrawer();
			});
		});

		drawer.addEventListener("click", function (event) {
			const modalTrigger = event.target.closest('[data-bi-modal-trigger="lead-modal"], a[href="#bi-lead-modal"], a[href="#bi-footer-lead-form"]');
			if (modalTrigger) {
				closeDrawer(true);
				return;
			}

			const accordion = event.target.closest(".bi-drawer__accordion");
			if (!accordion) {
				const link = event.target.closest(".bi-drawer__link");
				if (link && link.getAttribute("href") && link.getAttribute("href").indexOf("#") !== -1) {
					closeDrawer(true);
				}
				return;
			}
			const item = accordion.closest(".bi-drawer__item--parent");
			if (!item) {
				return;
			}
			const sub = item.querySelector(":scope > .bi-drawer__sub");
			const open = item.classList.contains("is-open");
			item.classList.toggle("is-open", !open);
			accordion.setAttribute("aria-expanded", open ? "false" : "true");
			if (sub) {
				if (open) {
					sub.setAttribute("hidden", "");
				} else {
					sub.removeAttribute("hidden");
				}
			}
		});

		drawer.addEventListener("keydown", function (event) {
			if (event.key === "Tab") {
				trapFocus(drawer.querySelector(".bi-drawer__panel"), event);
			}
		});
	}

	document.addEventListener("keydown", function (event) {
		if (event.key !== "Escape") {
			return;
		}
		closeMegas();
		closeSearch();
		closeDrawer();
	});

	function onBreakpointChange() {
		if (desktopQuery.matches) {
			closeDrawer(true);
		} else {
			closeMegas();
		}
	}

	if (typeof desktopQuery.addEventListener === "function") {
		desktopQuery.addEventListener("change", onBreakpointChange);
	} else if (typeof desktopQuery.addListener === "function") {
		desktopQuery.addListener(onBreakpointChange);
	}

	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
})();
