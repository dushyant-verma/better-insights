"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles, Users, HeartHandshake } from "lucide-react";

export function CultureHero() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-[#0D0D10] text-white pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden select-none"
      aria-label="Culture Hero"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(52,204,123,0.15)_0%,rgba(43,184,109,0.05)_50%,transparent_75%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(52,204,123,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Orbital Background Line */}
      <div
        className="absolute inset-0 max-w-7xl mx-auto pointer-events-none opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-dashed border-white/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#34CC7B] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Culture &amp; Life at Better Insights
          </span>
        </div>

        {/* Master Headline */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.035em] text-white leading-[1.02] [font-family:'Host_Grotesk',sans-serif]">
            Good ideas. Great people.{" "}
            <span className="text-[#34CC7B] inline-block">Better culture.</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-[#A5A5A5] max-w-2xl mx-auto font-normal leading-relaxed">
            We believe great digital experiences begin with great people. At Better Insights, strategy,
            creativity, and technology come together in an environment where ideas grow and people do their
            best work.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#culture-intro"
              onClick={(e) => handleScrollToSection(e, "culture-intro")}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#34CC7B] text-[#171717] font-bold text-xs uppercase tracking-wider hover:bg-[#2BB86D] transition-all hover:scale-105 shadow-lg shadow-[#34CC7B]/20 cursor-pointer"
            >
              <span>Explore our culture</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <a
              href="#culture-team"
              onClick={(e) => handleScrollToSection(e, "culture-team")}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all backdrop-blur-md hover:scale-105"
            >
              <Users className="w-4 h-4 text-[#34CC7B]" />
              <span>Meet the team</span>
            </a>
          </div>
        </div>

        {/* MadeByShape-Style Asymmetrical Overlapping Hero Collage */}
        <div className="mt-14 sm:mt-18 relative max-w-5xl mx-auto">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Primary Left/Center Main Photo */}
            <div className="col-span-12 sm:col-span-7 relative group">
              <div className="relative h-[280px] sm:h-[400px] w-full rounded-3xl sm:rounded-[2.25rem] overflow-hidden shadow-2xl border border-white/10 bg-[#16161D]">
                <Image
                  src="/images/culture/hero-marketing-team.jpg"
                  alt="Better Insights team collaborating on digital creative strategy"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10]/80 via-transparent to-transparent" />
              </div>
              {/* Floating Caption Top-Left */}
              <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D0D10]/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl">
                <span>☝️</span>
                <span>Ideas in motion</span>
              </div>
            </div>

            {/* Overlapping Secondary Right Stack */}
            <div className="col-span-12 sm:col-span-5 flex flex-col gap-4 sm:-ml-8 sm:mt-12 relative z-20">
              {/* Top Card */}
              <div className="relative h-[190px] sm:h-[220px] rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#16161D] group">
                <Image
                  src="/images/culture/photo-1556761175-4b46a572b786.jpg"
                  alt="Team engineering and design sprint"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10]/70 via-transparent to-transparent" />
                {/* Floating Caption Bottom-Right */}
                <div className="absolute -bottom-3 right-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D0D10]/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl">
                  <span>✨</span>
                  <span>Built together</span>
                </div>
              </div>

              {/* Bottom Card / Badge Pill */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#34CC7B]/15 border border-[#34CC7B]/30 flex items-center justify-center text-[#34CC7B]">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">People-first mindset</span>
                    <span className="text-[11px] text-[#A5A5A5] block">Empowering creativity &amp; trust</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34CC7B]/10 border border-[#34CC7B]/20">
                  <span className="w-2 h-2 rounded-full bg-[#34CC7B] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#34CC7B]">Active Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

