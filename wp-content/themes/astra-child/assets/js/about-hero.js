/**
 * Better Insights - About Page Hero: Arched Image Carousel
 * Reference Component: archedImageCarouselDesktop (MadeByShape)
 *
 * Implements Alpine.js component: x-data="archedImageCarouselDesktop"
 * - Smooth continuous rotation along the curved arch trajectory
 * - Mouse drag and touch swipe interaction
 * - Hover pause and automatic resumption
 * - Respects prefers-reduced-motion
 *
 * @package Astra_Child
 */

(function () {
	"use strict";

	window.archedImageCarouselDesktop = function () {
		return {
			rotation: 0,
			speed: 0.04, // Stately rotation speed in deg per frame
			isPaused: false,
			isDragging: false,
			startX: 0,
			lastX: 0,
			rafId: null,
			reducedMotion: false,

			init: function () {
				var self = this;

				// Check prefers-reduced-motion
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

				this.$nextTick(function () {
					self.startAnimation();
				});
			},

			startAnimation: function () {
				var self = this;
				if (this.reducedMotion) {
					return;
				}

				var step = function () {
					if (!self.isPaused && !self.isDragging) {
						self.rotation -= self.speed;

						if (self.rotation <= -360) {
							self.rotation += 360;
						}

						if (self.$refs.wheel) {
							self.$refs.wheel.style.transform = "rotate(" + self.rotation + "deg)";
						}
					}
					self.rafId = requestAnimationFrame(step);
				};

				if (this.rafId) {
					cancelAnimationFrame(this.rafId);
				}
				this.rafId = requestAnimationFrame(step);
			},

			pause: function () {
				this.isPaused = true;
			},

			resume: function () {
				this.isPaused = false;
			},

			startDrag: function (e) {
				this.isDragging = true;
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

				// Convert drag distance to rotation angle
				this.rotation += deltaX * 0.08;

				if (this.rotation <= -360) {
					this.rotation += 360;
				} else if (this.rotation > 0) {
					this.rotation -= 360;
				}

				if (this.$refs.wheel) {
					this.$refs.wheel.style.transform = "rotate(" + this.rotation + "deg)";
				}
			},

			endDrag: function () {
				this.isDragging = false;
			},

			destroy: function () {
				if (this.rafId) {
					cancelAnimationFrame(this.rafId);
				}
			}
		};
	};

	// Register with Alpine.js
	if (window.Alpine) {
		window.Alpine.data("archedImageCarouselDesktop", window.archedImageCarouselDesktop);
	} else {
		document.addEventListener("alpine:init", function () {
			window.Alpine.data("archedImageCarouselDesktop", window.archedImageCarouselDesktop);
		});
	}
})();
