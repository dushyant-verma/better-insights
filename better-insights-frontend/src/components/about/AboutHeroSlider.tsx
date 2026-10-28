"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    tag: "AI & Automation",
    title: "Intelligent Workflows",
    subtitle: "Autonomous AI agents, prompt engineering, and operational scale.",
    image: "/images/AI-AUTOMATION.webp",
  },
  {
    tag: "Engineering",
    title: "High-Speed Platforms",
    subtitle: "Custom headless architectures built with Next.js and modern cloud stacks.",
    image: "/images/TECHNOLOGY-ENGINEERING.webp",
  },
  {
    tag: "Digital Growth",
    title: "Measurable Impact",
    subtitle: "Performance marketing, technical SEO, and compounding customer acquisition.",
    image: "/images/DIGITAL-GROWTH.webp",
  },
  {
    tag: "CRM & Integrations",
    title: "Unified Pipelines",
    subtitle: "HubSpot, Zoho, and real-time webhook telemetry connecting marketing to sales.",
    image: "/images/CRM-INTEGRATIONS.webp",
  },
  {
    tag: "Transformation",
    title: "Enterprise Modernization",
    subtitle: "Full-lifecycle digital modernization turning legacy systems into market advantages.",
    image: "/images/DIGITAL-TRANSFORMATION.webp",
  },
];

export function AboutHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto rounded-[2rem] bg-white border border-black/10 p-5 sm:p-6 shadow-sm select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Capabilities Showcase Slider"
      role="region"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-black/8">
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#66574F] font-bold">
          Capabilities &amp; Craft
        </span>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1B1411]">
          <Sparkles className="w-3.5 h-3.5 text-[#33CC7A]" />
          <span>Interactive</span>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF5F0]">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.tag}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover transition-transform duration-1000 ease-out scale-100 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Slide Caption Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#33CC7A] text-[#1B1411] mb-2">
                  {slide.tag}
                </span>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug">
                  {slide.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mt-0.5 leading-relaxed font-normal">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Pagination */}
      <div className="flex items-center justify-between mt-4 pt-1">
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slider Pagination">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#33CC7A] ${
                  isActive ? "w-6 bg-[#33CC7A]" : "w-1.5 bg-black/20 hover:bg-black/40"
                }`}
              />
            );
          })}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#1B1411] hover:bg-black/5 hover:border-black/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#33CC7A]"
            aria-label="Previous capability"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#1B1411] hover:bg-black/5 hover:border-black/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#33CC7A]"
            aria-label="Next capability"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
