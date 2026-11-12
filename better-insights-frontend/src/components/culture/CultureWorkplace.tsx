"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";

export function CultureWorkplace() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 35,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // 2. Main image reveal animation
      if (imageWrapperRef.current) {
        gsap.from(imageWrapperRef.current, {
          opacity: 0,
          scale: 0.98,
          y: 30,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // 3. Floating statistic cards staggered entrance
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      if (cards.length > 0 && imageWrapperRef.current) {
        gsap.from(cards, {
          opacity: 0,
          y: (i: number) => (i === 0 ? -25 : 25),
          scale: 0.92,
          stagger: 0.12,
          duration: 0.9,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 75%",
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
      id="culture-workplace"
      className="pt-20 sm:pt-28 lg:pt-32 pb-28 sm:pb-36 lg:pb-44 bg-[#0B0B0D] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="Our People & Workplace Culture"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] lg:w-[1100px] h-[550px] bg-[radial-gradient(circle,rgba(52,204,123,0.05)_0%,rgba(43,184,109,0.015)_50%,transparent_70%)] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* 1. Section Header: Two-column layout                                      */}
        {/* ========================================================================= */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Left Column: Eyebrow + Large Heading */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#34CC7B]">
                Culture at Better Insights
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light lg:font-normal tracking-[-0.03em] text-white leading-[1.08] [font-family:'Host_Grotesk',sans-serif]">
              A home away from home, a place where you can be who you want to be
            </h2>
          </div>

          {/* Right Column: Two Editorial Paragraphs */}
          <div className="lg:col-span-5 lg:pt-4 space-y-4 sm:space-y-5 text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-normal">
            <p>
              At Better Insights, we want every team member to feel comfortable with the people they work with
              and the environment they work in. We believe great work happens when people feel trusted, supported
              and free to be creative.
            </p>
            <p>
              Better Insights is a team of curious, talented and driven individuals. We value honest
              communication, meaningful collaboration and continuous learning to help everyone grow together.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Main Image Layout with 3 Floating Statistics Cards                     */}
      {/* Wide photographic composition occupying ~92-95% width with ~4-5% outer   */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 relative z-20 overflow-visible">
        <div className="relative w-full overflow-visible">
          
          {/* Main Large Photographic Canvas (rounded ~24px, no dark overlay) */}
          <div
            ref={imageWrapperRef}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[320px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[660px] rounded-2xl sm:rounded-3xl lg:rounded-[24px] overflow-hidden bg-[#16161D] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] z-10"
          >
            <Image
              src="/images/culture/photo-1552664730-d307ca884978.jpg"
              alt="Better Insights team collaborating in a comfortable and supportive creative environment"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1500px"
            />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* Card 1 – Top Right: 98% TEAM RETENTION (Bright Green #34CC7B)         */}
          {/* Outer black container extends below green card into the photo         */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={card1Ref}
            className="absolute z-20 rounded-2xl sm:rounded-3xl lg:rounded-[1.75rem] bg-[#0B0B0D] top-0 -translate-y-12 sm:-translate-y-16 lg:-translate-y-20 right-3 sm:right-12 md:right-20 lg:right-32 xl:right-44 pt-2.5 sm:pt-3.5 lg:pt-4 px-2.5 sm:px-3.5 lg:px-4 pb-5 sm:pb-7 lg:pb-9 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Left Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current top-12 sm:top-16 lg:top-20 left-0 -mt-px ml-px -translate-x-full pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
            </svg>

            {/* Right Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current top-12 sm:top-16 lg:top-20 right-0 -mt-px mr-px translate-x-full pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>

            {/* Inner Green Statistic Card */}
            <div className="w-28 h-28 p-3 rounded-2xl sm:w-40 sm:h-40 sm:p-4 md:w-44 md:h-44 lg:w-52 lg:h-52 lg:p-5 xl:w-60 xl:h-60 xl:p-6 bg-[#34CC7B] flex flex-col justify-between shadow-[0_12px_32px_rgba(52,204,123,0.32)] select-none">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#101112] leading-none [font-family:'Host_Grotesk',sans-serif]">
                98%
              </h3>
              <div className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-[#101112] leading-tight">
                team retention
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* Card 2 – Bottom Left: 56:44 MALE:FEMALE RATIO (Dark Charcoal)        */}
          {/* Outer black container extends upwards into the photo                  */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={card2Ref}
            className="absolute z-20 rounded-2xl sm:rounded-3xl lg:rounded-[1.75rem] bg-[#0B0B0D] bottom-0 translate-y-12 sm:translate-y-16 lg:translate-y-20 left-3 sm:left-10 md:left-16 lg:left-24 xl:left-32 pb-2.5 sm:pb-3.5 lg:pb-4 px-2.5 sm:px-3.5 lg:px-4 pt-5 sm:pt-7 lg:pt-9 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Left Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current bottom-12 sm:bottom-16 lg:bottom-20 left-0 -mb-px ml-px -translate-x-full rotate-180 pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>

            {/* Right Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current bottom-12 sm:bottom-16 lg:bottom-20 right-0 -mb-px mr-px translate-x-full rotate-180 pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
            </svg>

            {/* Inner Dark Charcoal Statistic Card */}
            <div className="w-28 h-28 p-3 rounded-2xl sm:w-40 sm:h-40 sm:p-4 md:w-44 md:h-44 lg:w-52 lg:h-52 lg:p-5 xl:w-60 xl:h-60 xl:p-6 bg-[#1A1B1F] flex flex-col justify-between border border-white/8 shadow-[0_12px_32px_rgba(0,0,0,0.6)] select-none">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-none [font-family:'Host_Grotesk',sans-serif]">
                56:44
              </h3>
              <div className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-[#A5A5A5] leading-tight">
                male:female ratio
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* Card 3 – Bottom Right: 16 HAPPY FACES (Dark Charcoal)                */}
          {/* Outer black container extends upwards into the photo                  */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={card3Ref}
            className="absolute z-20 rounded-2xl sm:rounded-3xl lg:rounded-[1.75rem] bg-[#0B0B0D] bottom-0 translate-y-16 sm:translate-y-24 lg:translate-y-28 right-3 sm:right-8 md:right-14 lg:right-20 xl:right-28 pb-2.5 sm:pb-3.5 lg:pb-4 px-2.5 sm:px-3.5 lg:px-4 pt-5 sm:pt-7 lg:pt-9 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Left Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current bottom-16 sm:bottom-24 lg:bottom-28 left-0 -mb-px ml-px -translate-x-full rotate-180 pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>

            {/* Right Inverted Concave Corner Fillet */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 absolute text-[#0B0B0D] fill-current bottom-16 sm:bottom-24 lg:bottom-28 right-0 -mb-px mr-px translate-x-full rotate-180 pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
            </svg>

            {/* Inner Dark Charcoal Statistic Card */}
            <div className="w-28 h-28 p-3 rounded-2xl sm:w-40 sm:h-40 sm:p-4 md:w-44 md:h-44 lg:w-52 lg:h-52 lg:p-5 xl:w-60 xl:h-60 xl:p-6 bg-[#222328] flex flex-col justify-between border border-white/8 shadow-[0_12px_32px_rgba(0,0,0,0.6)] select-none">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-none [font-family:'Host_Grotesk',sans-serif]">
                16
              </h3>
              <div className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-[#A5A5A5] leading-tight">
                happy faces
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CultureWorkplace;
