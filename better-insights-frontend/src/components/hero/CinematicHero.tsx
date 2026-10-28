"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  eyebrow: string;
  heading: string;
  desc: string;
  ctaText: string;
  ctaUrl: string;
  videoSrc: string;
  tabLabel: string;
  tabNum: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    eyebrow: "AI & DIGITAL TRANSFORMATION",
    heading: "Better Marketing,<br />Better ROI.",
    desc: "We’re not just a digital agency—we’re your growth partners. Better Insights transforms your marketing with AI, data-driven strategies, and measurable results that impact your bottom line.",
    ctaText: "Explore Solutions",
    ctaUrl: "/what-we-do",
    videoSrc: "/videos/Banner-Video01.mp4",
    tabLabel: "Solutions",
    tabNum: "01.",
  },
  {
    eyebrow: "BETTER INSIGHTS",
    heading: "Technology that<br />drives what’s next.",
    desc: "From intelligent automation to digital engineering, we help businesses turn complex technology into real-world impact.",
    ctaText: "Discover Better Insights",
    ctaUrl: "/about",
    videoSrc: "/videos/2.mp4",
    tabLabel: "Insights",
    tabNum: "02.",
  },
];

const SLIDE_DURATION_MS = 8000;

export function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  // Synchronize active video playback
  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      const vid = ref.current;
      if (!vid) return;

      if (index === currentSlide) {
        if (isPlaying) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentSlide, isPlaying]);

  // Slideshow timer and scrub progress calculation
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION_MS) {
        elapsedBeforePauseRef.current = 0;
        setProgress(0);
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    }, 50);

    timerRef.current = interval;

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  const goToSlide = (index: number) => {
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const togglePlay = () => {
    if (isPlaying) {
      elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-black text-white overflow-hidden select-none" aria-label="Hero Showcase">
      {/* Background Videos with Crossfade */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.tabNum}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <video
              ref={videoRefs[idx]}
              src={slide.videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Cinematic Vignette & Readability Gradient Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 z-20 bg-black/25 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Floating Pause/Play Pill Control */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-30">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label={isPlaying ? "Pause video and slideshow" : "Play video and slideshow"}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          <span>{isPlaying ? "Pause video" : "Play video"}</span>
        </button>
      </div>

      {/* Slide Content Overlay */}
      <div className="relative z-30 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-32 sm:pb-36">
        <div className="max-w-3xl animate-fade-in" key={currentSlide}>
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-3 sm:mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            {activeSlide.eyebrow}
          </span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.04]"
            dangerouslySetInnerHTML={{ __html: activeSlide.heading }}
          />
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
            {activeSlide.desc}
          </p>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <Link
              href={activeSlide.ctaUrl}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#F3F2EF] transition-all hover:scale-105 shadow-2xl"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Line */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4" aria-hidden="true">
            <div
              className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Tabs / Slide Labels */}
            <div className="flex items-center gap-2 sm:gap-4" role="tablist" aria-label="Slide Navigation">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.tabNum}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goToSlide(idx)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-white text-black shadow-md font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="opacity-70">{slide.tabNum}</span>
                    <span>{slide.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
