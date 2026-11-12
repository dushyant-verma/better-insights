"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";

export function CultureEthos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle scroll reveal
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-ethos"
      className="py-24 sm:py-32 lg:py-36 bg-[#0B0B0D] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="Our Culture and People"
    >
      {/* Background Subtle Radial Lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(52,204,123,0.06)_0%,rgba(43,184,109,0.02)_50%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* ========================================================================= */}
          {/* Left Column – Visual Area (~55% width on desktop)                         */}
          {/* ========================================================================= */}
          <div ref={leftColRef} className="lg:col-span-7">
            <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] bg-[#15151A] group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] w-full overflow-hidden">
                <Image
                  src="/images/culture/hero-marketing-team.jpg"
                  alt="Better Insights team collaborating on digital sprint strategies in our studio"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                />
                
                {/* Subtle dark gradient overlay at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Subtle glassmorphic corner badge */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#34CC7B] animate-pulse" />
                  <span className="text-[11px] font-medium tracking-wide uppercase">
                    Cross-Disciplinary Pods
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Right Column – Content Area (~45% width on desktop)                        */}
          {/* ========================================================================= */}
          <div ref={rightColRef} className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Section Identifier Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#34CC7B]">
                Our Culture
              </span>
            </div>

            {/* Expressive Editorial Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-light lg:font-normal tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif]">
              We&apos;ve created an environment where everyone feels comfortable, valued, and open.
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#A5A5A5] font-normal leading-relaxed">
              We produce good work for good people, with the conviction that both our team and our clients will feel energized throughout the entire delivery cycle. When people feel trusted, supported, and free to innovate, extraordinary outcomes happen naturally.
            </p>

            {/* Testimonial / Culture Statement Card (Brand Green #34CC7B) */}
            <div className="relative bg-[#34CC7B] text-[#101112] rounded-[1.75rem] sm:rounded-[2rem] p-7 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(52,204,123,0.22)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(52,204,123,0.32)] hover:-translate-y-1">
              
              {/* Oversized Decorative Quotation Mark */}
              <svg
                className="absolute top-5 right-6 w-12 h-12 text-[#101112]/15 pointer-events-none select-none fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              {/* Quote Statement */}
              <p className="text-lg sm:text-xl lg:text-[22px] font-semibold text-[#101112] leading-snug tracking-tight mb-6 relative z-10 [font-family:'Host_Grotesk',sans-serif]">
                &ldquo;Our vision has always been to look after the partners we collaborate with, but to look after the craftspeople and minds building the work just as much. That respect will always generate the finest results for everyone.&rdquo;
              </p>

              {/* Author / Profile Row */}
              <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 pt-5 border-t border-[#101112]/15">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#101112]/20 shrink-0 bg-[#101112]/10">
                  <Image
                    src="/team/gautam-koli.png"
                    alt="Gautam Koli - Founder & Director at Better Insights"
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#101112] leading-tight [font-family:'Host_Grotesk',sans-serif]">
                    Gautam Koli
                  </h4>
                  <p className="text-xs sm:text-sm text-[#101112]/80 font-medium mt-0.5">
                    Founder &amp; Director, Better Insights
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CultureEthos;
