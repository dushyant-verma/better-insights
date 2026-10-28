"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Calculator, TrendingUp, Sparkles, Target, BarChart2 } from "lucide-react";

export function CprHero() {
  const scrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("cpr-calculator-app");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[linear-gradient(135deg,#FAF8F5_0%,#F5EFFB_45%,#FAF5F0_80%,#F1EAF8_100%)] border-b border-black/10 select-none overflow-hidden">
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

        {/* Eyebrow badge */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
            <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
            Resources &amp; calculators
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/50">
            Interactive marketing analytics
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-[1.05] max-w-4xl [font-family:'Host_Grotesk',sans-serif]">
          Cost per result (CPR)<br />
          <span className="text-[#1B1411]/60">Performance calculator.</span>
        </h1>

        {/* Supporting text */}
        <p className="mt-6 text-base sm:text-lg text-[#1B1411]/70 max-w-2xl font-normal leading-relaxed">
          Benchmark and evaluate the efficiency of your marketing campaigns. Calculate your true Cost Per Result across paid media, search ads, and conversion funnels with mathematical precision.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="#cpr-calculator-app"
            onClick={scrollToCalculator}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-sm font-semibold rounded-full transition-all shadow-md"
          >
            <span>Start calculating</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>

          <Link
            href="/digital-growth"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1B1411] border border-black/15 text-sm font-semibold rounded-full hover:border-black transition-all shadow-sm"
          >
            <span>Explore growth services</span>
          </Link>
        </div>

        {/* Analytical Highlights */}
        <div className="mt-16 pt-10 border-t border-black/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-2xl sm:text-4xl font-semibold text-[#1B1411] tracking-tight [font-family:'Host_Grotesk',sans-serif]">100%</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/50 mt-1">
              Client-side calculation
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-semibold text-[#1B1411] tracking-tight [font-family:'Host_Grotesk',sans-serif]">Multi-Keyword</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/50 mt-1">
              Campaign modeling
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-semibold text-[#1B1411] tracking-tight [font-family:'Host_Grotesk',sans-serif]">Real-Time</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/50 mt-1">
              Blended unit economics
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-semibold text-[#1B1411] tracking-tight [font-family:'Host_Grotesk',sans-serif]">Zero Lag</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/50 mt-1">
              Instant metric evaluation
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
