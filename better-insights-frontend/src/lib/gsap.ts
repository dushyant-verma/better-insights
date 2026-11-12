"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Unified GSAP & ScrollTrigger Initialization Helper
 *
 * Ensures that:
 * 1. Global CDN instances (window.gsap / window.ScrollTrigger from layout.tsx)
 *    and local bundled ES module instances are synchronized.
 * 2. ScrollTrigger is registered before ANY timeline, tween, or context is created.
 * 3. GSAP core globals (_globals.ScrollTrigger) are populated on both instances,
 *    eliminating the "Missing plugin? gsap.registerPlugin()" warning.
 * 4. Safe for SSR and client-side hydration.
 */

let initialized = false;

export function getGSAP() {
  if (typeof window === "undefined") {
    return { gsap, ScrollTrigger };
  }

  // Detect whether window.gsap or window.ScrollTrigger were injected by layout CDN scripts
  const win = window as any;
  const activeGsap = win.gsap || gsap;
  const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;

  if (!initialized) {
    try {
      // Register on active instance
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    try {
      // Also register on local bundled instance if different
      if (gsap !== activeGsap) {
        gsap.registerPlugin(activeScrollTrigger);
        gsap.registerPlugin(ScrollTrigger);
      }
    } catch {}

    // Explicitly set core globals so tween / timeline creation never misses ScrollTrigger
    try {
      const activeCore = (activeGsap as any).core;
      if (activeCore && typeof activeCore.globals === "function") {
        activeCore.globals("ScrollTrigger", activeScrollTrigger);
      }
      const localCore = (gsap as any).core;
      if (localCore && typeof localCore.globals === "function") {
        localCore.globals("ScrollTrigger", activeScrollTrigger);
        localCore.globals("ScrollTrigger", ScrollTrigger);
      }
    } catch {}

    // Expose unified instances globally
    win.gsap = activeGsap;
    win.ScrollTrigger = activeScrollTrigger;

    try {
      activeScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      });
    } catch {}

    initialized = true;
  }

  return { gsap: activeGsap, ScrollTrigger: activeScrollTrigger };
}

// Auto-register immediately in browser execution context
if (typeof window !== "undefined") {
  getGSAP();
}

export { gsap, ScrollTrigger };
export default gsap;
