"use client";

import React from "react";

// Configured verified business contact information for Better Insights
export const BETTER_INSIGHTS_WHATSAPP_NUMBER = "919509996730";
export const BETTER_INSIGHTS_WHATSAPP_PREFILL =
  "Hi Better Insights, I'd like to discuss digital marketing services.";

export function FloatingWhatsApp() {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${BETTER_INSIGHTS_WHATSAPP_NUMBER}&text=${encodeURIComponent(
    BETTER_INSIGHTS_WHATSAPP_PREFILL
  )}`;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[990]">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-2px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_-2px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
        aria-label="Chat on WhatsApp with Better Insights"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:scale-110"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.44 0-2.85-.38-4.08-1.11l-.29-.17-3.12.82.83-3.04-.19-.3a8.16 8.16 0 01-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
        </svg>

        {/* Desktop Hover Tooltip */}
        <span className="hidden sm:block absolute left-16 px-3 py-1.5 rounded-full bg-[#1B1411] text-white text-xs font-medium whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
