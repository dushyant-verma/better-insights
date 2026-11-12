/**
 * Better Insights - About Page: Team Section (MadeByShape Recreation)
 * Alpine.js Component: x-data="entriesProfiles"
 *
 * Implements:
 * - Continuous smooth horizontal transform-based scrolling
 * - Seamless infinite track looping
 * - Mouse drag (desktop) and touch swipe (mobile) support
 * - Hover pause and automatic resumption
 * - Staggered card positioning & interactive plus buttons
 * - Authentic profile popup modal with full bio, expertise, and LinkedIn links
 * - ESC key, backdrop click, and focus management
 * - Prefers-reduced-motion accessibility
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	window.entriesProfiles = function () {
		return {
			// Data State
			members: [],
			activeMember: null,
			isModalOpen: false,

			// Motion & Drag State
			scrollX: 0,
			speed: 0.65, // Pixels per frame
			isPaused: false,
			isDragging: false,
			startX: 0,
			lastX: 0,
			dragDistance: 0,
			trackWidth: 0,
			rafId: null,
			reducedMotion: false,
			lastFocusedElement: null,

			/**
			 * Component Initialization
			 */
			init: function () {
				var self = this;

				// 1. Read team data from embedded JSON
				var dataScript = document.getElementById("bi-team-modal-data");
				if (dataScript) {
					try {
						var parsed = JSON.parse(dataScript.textContent);
						if (Array.isArray(parsed)) {
							self.members = parsed;
						}
					} catch (err) {
						console.error("[Better Insights] Failed to parse team data:", err);
					}
				}

				// 2. Check for prefers-reduced-motion
				if (window.matchMedia) {
					var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
					self.reducedMotion = mediaQuery.matches;
					mediaQuery.addEventListener("change", function (e) {
						self.reducedMotion = e.matches;
						if (self.reducedMotion && self.rafId) {
							cancelAnimationFrame(self.rafId);
						} else if (!self.reducedMotion) {
							self.startAnimation();
						}
					});
				}

				// 3. Compute track width & start animation loop
				this.$nextTick(function () {
					self.calcTrackWidth();
					self.startAnimation();
				});

				// 4. Handle window resizing
				this._resizeHandler = function () {
					self.calcTrackWidth();
				};
				window.addEventListener("resize", this._resizeHandler);

				// 5. Global Keyboard Listener (Escape closes modal)
				this._keydownHandler = function (e) {
					if (self.isModalOpen && (e.key === "Escape" || e.keyCode === 27)) {
						e.preventDefault();
						self.closeModal();
					}
				};
				window.addEventListener("keydown", this._keydownHandler);
			},

			/**
			 * Calculate track width for seamless wrapping
			 */
			calcTrackWidth: function () {
				var track = this.$refs.track;
				if (track) {
					// The track contains 2 duplicated sets; half scrollWidth is one full cycle
					this.trackWidth = track.scrollWidth / 2;
				}
			},

			/**
			 * Continuous requestAnimationFrame Motion Loop
			 */
			startAnimation: function () {
				var self = this;
				if (this.reducedMotion) {
					return;
				}

				var step = function () {
					if (!self.isPaused && !self.isDragging && self.trackWidth > 0) {
						self.scrollX -= self.speed;

						// Seamless infinite wrap to origin
						if (Math.abs(self.scrollX) >= self.trackWidth) {
							self.scrollX += self.trackWidth;
						}

						if (self.$refs.track) {
							self.$refs.track.style.transform = "translate3d(" + self.scrollX + "px, 0, 0)";
						}
					}
					self.rafId = requestAnimationFrame(step);
				};

				if (this.rafId) {
					cancelAnimationFrame(this.rafId);
				}
				this.rafId = requestAnimationFrame(step);
			},

			/**
			 * Hover Controls
			 */
			pause: function () {
				this.isPaused = true;
			},

			resume: function () {
				if (!this.isModalOpen) {
					this.isPaused = false;
				}
			},

			/**
			 * Pointer / Mouse Drag & Touch Swipe
			 */
			startDrag: function (e) {
				// Don't drag if clicking directly on a button or link
				if (e.target.closest("button, a")) {
					return;
				}
				this.isDragging = true;
				this.dragDistance = 0;
				this.startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
				this.lastX = this.startX;
			},

			onDrag: function (e) {
				if (!this.isDragging) {
					return;
				}
				var currentX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
				var deltaX = currentX - this.lastX;
				this.lastX = currentX;
				this.dragDistance += Math.abs(deltaX);

				this.scrollX += deltaX;

				// Seamless infinite wrap during drag
				if (this.trackWidth > 0) {
					if (this.scrollX > 0) {
						this.scrollX -= this.trackWidth;
					} else if (Math.abs(this.scrollX) >= this.trackWidth) {
						this.scrollX += this.trackWidth;
					}
				}

				if (this.$refs.track) {
					this.$refs.track.style.transform = "translate3d(" + this.scrollX + "px, 0, 0)";
				}
			},

			endDrag: function () {
				this.isDragging = false;
			},

			/**
			 * Profile Selection & Modal Opening
			 */
			openProfileById: function (memberId, e) {
				// Prevent accidental trigger if user was dragging the slider
				if (this.dragDistance > 8) {
					return;
				}
				if (e) {
					e.stopPropagation();
				}

				var member = this.members.find(function (m) {
					return m.id === memberId;
				});

				if (!member) {
					return;
				}

				this.lastFocusedElement = e ? e.currentTarget || e.target : document.activeElement;
				this.activeMember = member;
				this.isModalOpen = true;
				this.isPaused = true;

				// Lock body scroll with scrollbar padding compensation
				var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
				if (scrollbarWidth > 0) {
					document.body.style.paddingRight = scrollbarWidth + "px";
				}
				document.body.classList.add("bi-modal-is-open");

				// Move focus to modal close button for accessibility
				this.$nextTick(function () {
					var closeBtn = document.querySelector(".bi-team-modal__close-btn");
					if (closeBtn) {
						closeBtn.focus();
					}
				});
			},

			/**
			 * Close Profile Modal
			 */
			closeModal: function () {
				this.isModalOpen = false;
				this.activeMember = null;
				this.isPaused = false;

				// Restore body scroll
				document.body.classList.remove("bi-modal-is-open");
				document.body.style.paddingRight = "";

				// Return focus to originating element
				if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === "function") {
					this.lastFocusedElement.focus();
				}
				this.lastFocusedElement = null;
			},

			/**
			 * Helper: Format Multiline Biography into HTML Paragraphs
			 */
			formatBio: function (bio) {
				if (!bio || typeof bio !== "string") {
					return "";
				}
				var paragraphs = bio.split(/\n\n+/);
				var html = "";
				for (var i = 0; i < paragraphs.length; i++) {
					var text = paragraphs[i].trim();
					if (text.length > 0) {
						html += "<p>" + text + "</p>";
					}
				}
				return html;
			},

			/**
			 * Component Cleanup
			 */
			destroy: function () {
				if (this.rafId) {
					cancelAnimationFrame(this.rafId);
				}
				if (this._resizeHandler) {
					window.removeEventListener("resize", this._resizeHandler);
				}
				if (this._keydownHandler) {
					window.removeEventListener("keydown", this._keydownHandler);
				}
				document.body.classList.remove("bi-modal-is-open");
				document.body.style.paddingRight = "";
			}
		};
	};

	// Register with Alpine.js
	if (window.Alpine) {
		window.Alpine.data("entriesProfiles", window.entriesProfiles);
	} else {
		document.addEventListener("alpine:init", function () {
			window.Alpine.data("entriesProfiles", window.entriesProfiles);
		});
	}
})();
