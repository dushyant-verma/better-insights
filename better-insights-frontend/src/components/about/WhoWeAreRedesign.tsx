"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { getGSAP } from "@/lib/gsap";
import { RollingStatNumber } from "@/components/ui/RollingStatNumber";

interface StatItem {
  number: number;
  symbol: string;
  label: string;
  desc: string;
}

const STATS_DATA: StatItem[] = [
  {
    number: 5,
    symbol: "+",
    label: "Years of Experience",
    desc: "Delivering high-conviction digital products & marketing.",
  },
  {
    number: 50,
    symbol: "+",
    label: "Projects Delivered",
    desc: "Modern headless web apps, CRM syncs & brand platforms.",
  },
  {
    number: 30,
    symbol: "+",
    label: "Happy Clients",
    desc: "Global enterprises, venture-backed startups & leaders.",
  },
  {
    number: 10,
    symbol: "+",
    label: "Digital Solutions",
    desc: "Full-lifecycle engineering, AI pipelines & growth engines.",
  },
];

export function WhoWeAreRedesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Viewport detection for odometer rolling number animation (runs strictly once per page visit)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const statsEl = statsRef.current;
    if (!statsEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsAnimated(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(statsEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP reveal animations for headers and editorial copy
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { gsap, ScrollTrigger } = getGSAP();

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reveal animations for section headings and text
      const revealItems = container.querySelectorAll(".who-reveal-item");
      revealItems.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="who-redesign">
      {/* ========================================================================= */}
      {/* TARGET ANCHOR: id="423758" & PRECEDING CULTURE STATEMENT                  */}
      {/* ========================================================================= */}
      <div id="423758" className="scroll-mt-24" />

      {/* Preceding Statement Block */}


      {/* ========================================================================= */}
      {/* SUBSECTION A: WHO WE ARE – INTRODUCTION & EDITORIAL WORKSPACE IMAGE        */}
      {/* ========================================================================= */}
      <section
        id="who-we-are"
        className="py-20 sm:py-28 border-b border-black/8 select-none"
        aria-label="Who We Are Introduction"
      >
        <div className="bi-container">
          {/* Introductory Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 sm:mb-20">
            <div className="lg:col-span-6 who-reveal-item">
              <div className="who-intro-badge mb-4">
                <span className="who-intro-badge__dot" />
                <span>Who We Are</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold tracking-[-0.03em] text-[#1B1411] leading-[1.08] [font-family:'Host_Grotesk',sans-serif]">
                A team of thinkers, creators &amp; digital problem solvers.
              </h2>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-5 text-base sm:text-lg text-[#66574F] font-normal leading-relaxed lg:pt-8 who-reveal-item">
              <p>
                Better Insights was established with a singular conviction: technology, creative
                design, and marketing must never operate in silos. Ambitious companies don’t need
                fragmented vendors or disconnected experiments—they need unified systems where brand
                strategy, performance engineering, and intelligent automation work in synchrony.
              </p>
              <p>
                As an integrated digital growth and technology partner, we collaborate with
                enterprise leaders, high-growth brands, and institutional partners worldwide to
                engineer digital experiences that capture market share and generate accountable ROI.
              </p>
            </div>
          </div>

          {/* Asymmetrical Editorial Workspace Image with Corner Badge */}
          <div className="who-hero-card who-reveal-item">
            <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full">
              <Image
                src="/images/culture/hero-marketing-team.jpg"
                alt="Better Insights creative team collaborating in our modern open workspace"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </div>

            {/* Floating Editorial Badge (MadeByShape style) */}
            <div className="who-floating-badge flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1B1411] text-[#CBFC6B] flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#66574F] block">
                  Studio Culture
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1B1411]">
                  Pune Hub &amp; Global Remote
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SUBSECTION B: OUR CULTURE (DARK EDITORIAL 2-COLUMN + LIME-GREEN PANEL)   */}
      {/* ========================================================================= */}
      <section
        className="who-culture-dark-section py-20 sm:py-28 lg:py-36 select-none"
        aria-label="Our Culture"
      >
        <div className="bi-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column – Large Image (approx 55% width) */}
            <div className="lg:col-span-7 who-reveal-item">
              <div className="who-culture-image-card group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src="/images/culture/photo-1552664730-d307ca884978.jpg"
                    alt="Better Insights team collaborating on digital sprint strategies"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                  />
                  {/* Subtle glassmorphic tag */}
                  <div className="absolute top-5 left-5 who-pill-tag !bg-black/40 !backdrop-blur-md !border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CBFC6B]" />
                    <span>Cross-Disciplinary Pods</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column – Culture Content (approx 45% width) */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-6 sm:gap-7 lg:gap-8">
              {/* A. Section Label */}
              <div className="inline-flex items-center gap-2.5 who-reveal-item">
                <span className="w-2 h-2 rounded-full bg-[#CBFC6B] shadow-[0_0_8px_rgba(203,252,107,0.6)]" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#CBFC6B]">
                  Our Culture
                </span>
              </div>

              {/* B. Main Heading */}
              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-semibold sm:font-bold tracking-[-0.03em] text-[#FFFFFF] leading-[1.15] who-reveal-item [font-family:'Host_Grotesk',sans-serif]">
                We&apos;ve created an environment where everyone feels comfortable, valued, and open.
              </h2>

              {/* C. Supporting Description */}
              <p className="text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed who-reveal-item">
                We produce good work for good people, with the conviction that both our team and our clients will feel energized throughout the entire delivery cycle. This transparency builds compounding trust and long-standing partnerships.
              </p>

              {/* D. Testimonial Card (Prominent Lime-Green Panel) */}
              <div className="who-culture-testimonial-card who-reveal-item mt-2">
                <span className="who-culture-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-lg sm:text-xl lg:text-[23px] font-semibold text-[#101112] leading-snug mb-6 relative z-10">
                  &ldquo;Our vision has always been to look after the clients we work with, but to look after the people doing the craft just as much. That will always generate the finest results for everyone.&rdquo;
                </p>
                <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-[#101112]/15">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#101112]/20 shrink-0 bg-[#101112]/10">
                    <Image
                      src="/team/gautam-koli.png"
                      alt="Gautam Koli"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#101112]">Gautam Koli</h4>
                    <p className="text-xs sm:text-sm text-[#101112]/75 font-medium">Founding Partner &amp; Operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SUBSECTION C: BETTER INSIGHTS – BY THE NUMBERS (WHITE THEME REDESIGN)     */}
      {/* ========================================================================= */}
      <section
        id="by-the-numbers"
        ref={statsRef}
        className="who-numbers-white-section relative bg-[#FFFFFF] text-[#111827] py-20 sm:py-28 lg:py-32 select-none border-t border-b border-black/8 overflow-hidden"
        aria-label="Better Insights By The Numbers"
      >
        {/* Subtle ambient light gradient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(203, 252, 107,0.05),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="bi-container relative z-10">
          <div className="max-w-3xl mb-14 sm:mb-16 who-reveal-item">
            {/* Eyebrow Label with Green Accent Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] bg-[#CBFC6B]/10 text-[#111827] border border-[#CBFC6B]/25 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#CBFC6B] shadow-[0_0_8px_rgba(203, 252, 107,0.6)]" />
              <span>BY THE NUMBERS</span>
            </div>

            {/* Dark Charcoal Modern Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-semibold sm:font-bold tracking-[-0.03em] text-[#111827] leading-[1.12] mb-4 [font-family:'Host_Grotesk',sans-serif]">
              Measurable momentum, verified track record.
            </h2>

            {/* Muted Grey Description */}
            <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed">
              We hold ourselves accountable to commercial outcomes. Every solution we deploy is
              measured by customer engagement, system reliability, and sustained business ROI.
            </p>
          </div>

          {/* 4 Large Typography Statistic Cards with Rolling Digits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {STATS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="who-stat-card who-reveal-item group flex flex-col justify-between h-full bg-white border border-black/8 rounded-[24px] sm:rounded-[26px] lg:rounded-[28px] p-7 sm:p-8 lg:p-9 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03),0_12px_30px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(203, 252, 107,0.12),0_12px_24px_-6px_rgba(0,0,0,0.08)] hover:border-[#CBFC6B]/55 hover:-translate-y-1.5 transition-all duration-350 ease-out"
              >
                <div>
                  <div className="mb-4">
                    <RollingStatNumber
                      value={item.number}
                      symbol={item.symbol}
                      isAnimated={statsAnimated}
                      cardIndex={idx}
                      className="text-[#111827]"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#111827] mb-2 transition-colors duration-300 group-hover:text-[#CBFC6B]">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 pt-4 border-t border-black/8 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#9CA3AF] tracking-wider uppercase font-medium">METRIC // 0{idx + 1}</span>
                  <span className="text-[#CBFC6B] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

