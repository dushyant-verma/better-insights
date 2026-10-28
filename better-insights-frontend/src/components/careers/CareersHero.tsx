import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function CareersHero() {
  return (
    <section
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden select-none bg-[linear-gradient(140deg,#0B0818_0%,#160D33_45%,#100A24_80%,#07050F_100%)] text-white border-b border-white/10"
      aria-label="Careers Editorial Hero"
    >
      {/* Ambient Depth Elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#7C3AED]/20 via-[#6366F1]/14 to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* Organic Blobs in Bottom-Right Corner (Overlapping, soft-edged, cropped) */}
      <div
        className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.16)_0%,rgba(124,58,237,0.08)_45%,transparent_75%)] blur-[60px] sm:blur-[80px] pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 right-24 sm:-bottom-12 sm:right-40 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(99,102,241,0.12)_0%,rgba(139,92,246,0.05)_50%,transparent_75%)] blur-[45px] sm:blur-[65px] pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 right-6 sm:-bottom-20 sm:right-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.08)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)] blur-[45px] sm:blur-[65px] pointer-events-none z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#33CC7A]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Careers at Better Insights / Join our team
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.06] mb-6 [font-family:'Host_Grotesk',sans-serif]">
            Do meaningful work. <br className="hidden sm:inline" />
            <span className="text-white/70">Build what&apos;s next.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-white/75 max-w-2xl font-normal leading-relaxed mb-8">
            Join a team exploring the intersection of creativity, technology, marketing, and AI to solve meaningful business challenges.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-sm font-semibold rounded-full transition-all shadow-lg"
            >
              <span>Explore opportunities</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/15 transition-all"
            >
              <span>Meet Better Insights</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
