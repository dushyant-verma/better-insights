"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

export function ServicesHero() {
  const handleScrollToOverview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("services-overview");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center bg-[linear-gradient(145deg,#090714_0%,#150D2E_40%,#100A24_70%,#080611_100%)] text-[#FAF5F0] overflow-hidden pt-28 pb-20 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(108,60,255,0.18)_0%,rgba(79,70,229,0.06)_50%,transparent_75%)] blur-3xl pointer-events-none" />

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

      {/* Background Ambient Media */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Technology-That-Moves-Business-Forward.webp"
        >
          <source src="/videos/2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#090714]/75 via-[#150D2E]/85 to-[#080611]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left">
        <div className="max-w-4xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#33CC7A] text-xs font-bold uppercase tracking-[0.18em]">
              <Sparkles className="w-3.5 h-3.5" />
              Enterprise Solutions &amp; Capabilities
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#FAF5F0] leading-[1.05] mb-6">
            Digital solutions built around your{" "}
            <span className="text-[#33CC7A] block sm:inline">
              next big move.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-[#B8ABA3] max-w-2xl font-normal leading-relaxed mb-10">
            From digital experiences and business automation to marketing and transformation, we bring
            strategy, creativity, and technology together to help businesses move forward.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <a
              href="#services-overview"
              onClick={handleScrollToOverview}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#33CC7A] text-[#1B1411] font-bold text-xs uppercase tracking-wider hover:bg-[#2BB86D] transition-all duration-300 shadow-md shadow-[#33CC7A]/20"
            >
              <span>Explore Capabilities</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5F0] font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all duration-300"
            >
              <span>Schedule Strategic Consult</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
