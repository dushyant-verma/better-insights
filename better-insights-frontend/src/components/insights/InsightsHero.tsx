"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function InsightsHero() {
  const scrollToFeed = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("bi-insights-feed");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden select-none bg-[linear-gradient(135deg,#FAF8F5_0%,#F5EFFB_45%,#FAF5F0_80%,#F1EAF8_100%)] text-[#1B1411] border-b border-black/8"
      aria-label="Insights Editorial Hero"
    >
      {/* Subtle Ambient Glow Behind Content */}
      <div
        className="absolute -top-32 left-1/3 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,rgba(139,92,246,0.03)_50%,transparent_75%)] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Organic Blobs in Bottom-Right Corner (Overlapping, soft-edged, cropped) */}
      <div
        className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(192,132,252,0.18)_0%,rgba(168,85,247,0.09)_45%,rgba(147,51,234,0.02)_70%,transparent_85%)] blur-[50px] sm:blur-[70px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 right-24 sm:-bottom-12 sm:right-40 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(147,51,234,0.11)_0%,rgba(167,139,250,0.05)_50%,transparent_75%)] blur-[40px] sm:blur-[60px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 right-6 sm:-bottom-20 sm:right-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.07)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)] blur-[45px] sm:blur-[65px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEE5DC] border border-black/5 text-[#1B1411] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
              Ideas &amp; Perspectives
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1B1411] leading-[1.05] mb-6">
            Ideas that move <br className="hidden sm:inline" />
            <span className="text-[#66574F]">businesses forward.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-[#66574F] max-w-2xl font-normal leading-relaxed mb-8">
            Explore perspectives, practical guidance, and emerging ideas across digital growth, marketing, AI, technology, and business transformation.
          </p>

          {/* Quick Jump CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#bi-insights-feed"
              onClick={scrollToFeed}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#2BB86D] hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#33CC7A]/20"
            >
              <span>Browse All Insights</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-black/5 text-[#1B1411] text-xs font-bold uppercase tracking-wider rounded-full border border-black/15 transition-all"
            >
              <span>Start a Conversation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
