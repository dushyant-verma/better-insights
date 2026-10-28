(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		const searchRoot = document.querySelector("[data-bi-search]");
		const searchOpenBtn = document.querySelector("[data-bi-search-open]");
		const searchField = document.getElementById("bi-search-field");

		if (!searchRoot || !searchOpenBtn) {
			return;
		}

		let lastFocus = null;

		function getFocusable(container) {
			if (!container) {
				return [];
			}
			return Array.prototype.slice
				.call(
					container.querySelectorAll(
						'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
					)
				)
				.filter(function (el) {
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
			if (!searchRoot.hasAttribute("hidden")) {
				closeSearch();
				return;
			}
			lastFocus = document.activeElement;
			searchRoot.removeAttribute("hidden");
			searchOpenBtn.setAttribute("aria-expanded", "true");
			document.body.classList.add("bi-search-open");

			window.setTimeout(function () {
				if (searchField) {
					searchField.focus();
					if (typeof searchField.select === "function") {
						searchField.select();
					}
				}
			}, 60);
		}

		function closeSearch() {
			if (searchRoot.hasAttribute("hidden")) {
				return;
			}
			searchRoot.setAttribute("hidden", "");
			searchOpenBtn.setAttribute("aria-expanded", "false");
			document.body.classList.remove("bi-search-open");

			if (lastFocus && typeof lastFocus.focus === "function") {
				lastFocus.focus();
			}
		}

		searchOpenBtn.addEventListener("click", function (e) {
			e.preventDefault();
			if (searchRoot.hasAttribute("hidden")) {
				openSearch();
			} else {
				closeSearch();
			}
		});

		searchRoot.querySelectorAll("[data-bi-search-close]").forEach(function (btn) {
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				closeSearch();
			});
		});

		searchRoot.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				closeSearch();
			} else if (event.key === "Tab") {
				trapFocus(searchRoot.querySelector(".bi-search__panel"), event);
			}
		});

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && !searchRoot.hasAttribute("hidden")) {
				closeSearch();
			}
		});
	});
})();
