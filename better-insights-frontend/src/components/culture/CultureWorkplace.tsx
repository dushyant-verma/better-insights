"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";

/**
 * Workplace Culture Statistics
 * Reference placeholder metrics configured in a single data source for easy updates.
 */
interface WorkplaceStat {
  id: string;
  value: string;
  label: string;
  variant: "green" | "dark";
  positionClass: string;
}

const WORKPLACE_STATS: WorkplaceStat[] = [
  {
    id: "retention",
    value: "98%",
    label: "Team retention",
    variant: "green",
    positionClass: "-top-6 sm:-top-8 -right-3 sm:-right-6 lg:-right-8",
  },
  {
    id: "ratio",
    value: "56:44",
    label: "Male:female ratio",
    variant: "dark",
    positionClass: "-bottom-6 sm:-bottom-8 -left-3 sm:-left-6 lg:-left-8",
  },
  {
    id: "faces",
    value: "16",
    label: "Happy faces",
    variant: "green",
    positionClass: "-bottom-8 sm:-bottom-10 right-4 sm:right-10 lg:right-16",
  },
];

export function CultureWorkplace() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          scale: 0.96,
          y: 40,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Subtle parallax movement on the main image
        if (imageInnerRef.current) {
          gsap.to(imageInnerRef.current, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }

      // 3. Floating statistic cards staggered entrance
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0 && imageWrapperRef.current) {
        gsap.from(validCards, {
          opacity: 0,
          y: 28,
          scale: 0.9,
          stagger: 0.14,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 72%",
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
      id="culture-intro"
      className="py-24 sm:py-32 lg:py-36 bg-[#0B0B0D] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="Our People & Workplace Culture"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] lg:w-[1000px] h-[500px] bg-[radial-gradient(circle,rgba(52,204,123,0.06)_0%,rgba(43,184,109,0.02)_45%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Header: Two-column layout */}
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

        {/* 2. Main Image Layout with Floating Statistic Cards */}
        <div className="relative w-full max-w-5xl lg:max-w-6xl mx-auto">
          {/* Dominant Wide Image Container (75-85% of available width) */}
          <div
            ref={imageWrapperRef}
            className="relative w-full md:w-[84%] mx-auto rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden border border-white/10 bg-[#16161D] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] group"
          >
            <div
              ref={imageInnerRef}
              className="relative h-[280px] sm:h-[420px] md:h-[480px] lg:h-[540px] w-full"
            >
              <Image
                src="/images/culture/photo-1552664730-d307ca884978.jpg"
                alt="Better Insights team collaborating on digital creative strategy in studio"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 85vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>

            {/* Desktop & Tablet Floating Overlapping Statistic Cards */}
            <div className="hidden md:block">
              {WORKPLACE_STATS.map((stat, idx) => {
                const isGreen = stat.variant === "green";
                return (
                  <div
                    key={stat.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className={`absolute ${stat.positionClass} z-20 rounded-2xl lg:rounded-[1.35rem] px-6 py-4 lg:px-7 lg:py-5 transition-transform duration-300 hover:scale-105 select-none ${
                      isGreen
                        ? "bg-[#34CC7B] text-[#0B0B0D] shadow-[0_16px_36px_rgba(52,204,123,0.35),0_6px_16px_rgba(0,0,0,0.2)] border border-[#34CC7B]/30"
                        : "bg-[#1E1F24] text-white border border-white/12 shadow-[0_20px_45px_rgba(0,0,0,0.65)] backdrop-blur-md"
                    }`}
                  >
                    <span
                      className={`block text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-none [font-family:'Host_Grotesk',sans-serif] ${
                        isGreen ? "text-[#0B0B0D]" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={`block text-[11px] lg:text-xs font-semibold uppercase tracking-wider mt-1.5 ${
                        isGreen ? "text-[#0B0B0D]/80" : "text-[#A5A5A5]"
                      }`}
                    >
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supporting Side Preview Wing (Desktop Wide Screens) */}
          <div
            className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-48 rounded-2xl overflow-hidden opacity-30 hidden 2xl:block border border-white/10 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/images/culture/photo-1556761175-4b46a572b786.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
          <div
            className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-48 rounded-2xl overflow-hidden opacity-30 hidden 2xl:block border border-white/10 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/images/culture/photo-1559136555-9303baea8ebd.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>

          {/* Mobile-Only Clean Statistic Cards Grid (No overlap collision or overflow) */}
          <div className="md:hidden mt-6 grid grid-cols-3 gap-2.5 px-1">
            {WORKPLACE_STATS.map((stat, idx) => {
              const isGreen = stat.variant === "green";
              return (
                <div
                  key={stat.id}
                  ref={(el) => {
                    // For mobile, index offset to avoid overriding desktop refs
                    if (!cardsRef.current[idx]) cardsRef.current[idx] = el;
                  }}
                  className={`rounded-xl p-3.5 flex flex-col justify-between ${
                    isGreen
                      ? "bg-[#34CC7B] text-[#0B0B0D] shadow-md"
                      : "bg-[#1E1F24] text-white border border-white/10"
                  }`}
                >
                  <span
                    className={`block text-xl sm:text-2xl font-bold tracking-tight leading-none [font-family:'Host_Grotesk',sans-serif] ${
                      isGreen ? "text-[#0B0B0D]" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-1.5 leading-tight ${
                      isGreen ? "text-[#0B0B0D]/80" : "text-[#A5A5A5]"
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureWorkplace;
