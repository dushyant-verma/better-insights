/**
 * Better Insights - Client Success Stories Interactive Filter
 * Implements combined dual-filtering (Industry + Service), live counters,
 * reset triggers, empty-state toggling, and keyboard accessibility.
 */

(function () {
	'use strict';

	function initCaseStudiesFilter() {
		var section = document.getElementById('client-success-stories');
		if (!section) return;

		var industrySelect = document.getElementById('bi-filter-industry');
		var serviceSelect = document.getElementById('bi-filter-service');
		var resetBtn = document.getElementById('bi-filter-reset');
		var emptyResetBtn = document.getElementById('bi-empty-reset-btn');
		var counterEl = document.getElementById('bi-stories-counter');
		var gridEl = document.getElementById('bi-stories-grid');
		var emptyEl = document.getElementById('bi-stories-empty');

		if (!industrySelect || !serviceSelect || !gridEl) return;

		var cards = Array.prototype.slice.call(gridEl.querySelectorAll('.bi-story-card'));
		var totalCount = cards.length;

		function filterCards() {
			var indVal = (industrySelect.value || '').trim();
			var srvVal = (serviceSelect.value || '').trim();

			// Treat 'ALL' same as ''
			var isIndFiltered = indVal !== '' && indVal !== 'ALL';
			var isSrvFiltered = srvVal !== '' && srvVal !== 'ALL';

			// Toggle active class on select elements
			if (isIndFiltered) {
				industrySelect.classList.add('is-active');
			} else {
				industrySelect.classList.remove('is-active');
			}

			if (isSrvFiltered) {
				serviceSelect.classList.add('is-active');
			} else {
				serviceSelect.classList.remove('is-active');
			}

			// Show or hide the reset button
			if (resetBtn) {
				if (isIndFiltered || isSrvFiltered) {
					resetBtn.classList.add('is-visible');
				} else {
					resetBtn.classList.remove('is-visible');
				}
			}

			var visibleCount = 0;

			cards.forEach(function (card) {
				var cardInd = (card.getAttribute('data-industry') || '').trim();
				var cardSrv = (card.getAttribute('data-service') || '').trim();

				var matchesInd = !isIndFiltered || cardInd.toLowerCase() === indVal.toLowerCase();
				var matchesSrv = !isSrvFiltered || cardSrv.toLowerCase() === srvVal.toLowerCase();

				if (matchesInd && matchesSrv) {
					card.classList.remove('is-hidden');
					visibleCount++;
				} else {
					card.classList.add('is-hidden');
				}
			});

			// Update counter
			if (counterEl) {
				if (isIndFiltered || isSrvFiltered) {
					counterEl.textContent = 'Showing ' + visibleCount + ' of ' + totalCount + ' stories';
				} else {
					counterEl.textContent = 'Showing ' + totalCount + ' stories';
				}
			}

			// Toggle empty state
			if (visibleCount === 0) {
				gridEl.style.display = 'none';
				if (emptyEl) emptyEl.style.display = 'block';
			} else {
				gridEl.style.display = 'grid';
				if (emptyEl) emptyEl.style.display = 'none';
			}
		}

		function resetFilters() {
			industrySelect.value = '';
			serviceSelect.value = '';
			filterCards();
			industrySelect.focus();
		}

		industrySelect.addEventListener('change', filterCards);
		serviceSelect.addEventListener('change', filterCards);

		if (resetBtn) {
			resetBtn.addEventListener('click', resetFilters);
		}

		if (emptyResetBtn) {
			emptyResetBtn.addEventListener('click', resetFilters);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initCaseStudiesFilter);
	} else {
		initCaseStudiesFilter();
	}
})();
