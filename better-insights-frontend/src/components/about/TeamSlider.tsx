"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { TeamMemberData } from "./TeamModal";

interface TeamSliderProps {
  members: TeamMemberData[];
  onSelectMember: (member: TeamMemberData) => void;
}

// Subtle vertical offsets to create the premium wavy / staggered carousel rhythm
const STAGGER_OFFSETS = [14, -18, 10, -14, 16, -10, 12, -16, 8];

export function TeamSlider({ members, onSelectMember }: TeamSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicated sequence ensures a mathematically seamless infinite loop
  const loopMembers = [...members, ...members];

  // Motion & Drag State
  const scrollXRef = useRef(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isInteractingRef = useRef(false);
  const isHorizontalDragRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const trackWidthRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Calculate track width with robust fallback
  const calcTrackWidth = useCallback(() => {
    if (trackRef.current) {
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (halfWidth > 0) {
        trackWidthRef.current = halfWidth;
      }
    }
  }, []);

  // Viewport visibility check: Uses IntersectionObserver with scroll fallback
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const checkVisibility = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.bottom >= -400 &&
        rect.top <= (window.innerHeight || 800) + 400;
      isVisibleRef.current = inView;
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting;
          });
        },
        { rootMargin: "600px 0px", threshold: 0 }
      );
      observer.observe(section);
    }

    // Scroll listener ensures visibility never gets stuck in production or webviews
    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  // ResizeObserver: Dynamically update track width if images/fonts load
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      calcTrackWidth();
    });
    ro.observe(track);

    return () => ro.disconnect();
  }, [calcTrackWidth]);

  // Continuous animation loop (Production & Localhost resilient)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    calcTrackWidth();

    // Staggered measurements to handle late-loading web fonts and images in production
    const t1 = setTimeout(calcTrackWidth, 100);
    const t2 = setTimeout(calcTrackWidth, 500);
    const t3 = setTimeout(calcTrackWidth, 1200);

    const speed = 0.65; // Pixels per frame (~40px/sec at 60fps)

    const step = () => {
      // Dynamic track measurement if initially 0
      if (trackWidthRef.current <= 0 && trackRef.current) {
        calcTrackWidth();
      }

      if (
        isVisibleRef.current &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        trackWidthRef.current > 0
      ) {
        scrollXRef.current -= speed;

        // Seamless infinite wrap
        if (Math.abs(scrollXRef.current) >= trackWidthRef.current) {
          scrollXRef.current += trackWidthRef.current;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${scrollXRef.current}px, 0, 0)`;
        }
      }
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    const handleResize = () => {
      calcTrackWidth();
    };
    const handleLoad = () => {
      calcTrackWidth();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
    };
  }, [calcTrackWidth, members]);

  // Pointer / Drag Event Handlers with Directional Thresholding
  const handlePointerDown = (e: React.PointerEvent) => {
    // If clicking a link or button directly, skip dragging
    if (
      (e.target as HTMLElement).closest("a") ||
      (e.target as HTMLElement).closest("button")
    ) {
      return;
    }
    isInteractingRef.current = true;
    isHorizontalDragRef.current = false;
    isDraggingRef.current = false;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX;
    startYRef.current = e.pageY;
    lastXRef.current = e.pageX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractingRef.current) return;
    const deltaXTotal = Math.abs(e.pageX - startXRef.current);
    const deltaYTotal = Math.abs(e.pageY - startYRef.current);

    // Threshold check: determine if gesture is vertical (page scroll) or horizontal (slider drag)
    if (!isHorizontalDragRef.current && !isDraggingRef.current) {
      if (deltaYTotal > 8 && deltaYTotal > deltaXTotal) {
        // Vertical swipe: release interaction so native page scroll continues smoothly
        isInteractingRef.current = false;
        return;
      }
      if (deltaXTotal > 8 && deltaXTotal > deltaYTotal) {
        // Horizontal swipe: lock into slider drag
        isHorizontalDragRef.current = true;
        isDraggingRef.current = true;
      }
    }

    if (isDraggingRef.current) {
      const deltaX = e.pageX - lastXRef.current;
      lastXRef.current = e.pageX;
      dragDistanceRef.current += Math.abs(deltaX);

      scrollXRef.current += deltaX;

      // Seamless wrap during manual drag
      if (trackWidthRef.current > 0) {
        if (scrollXRef.current > 0) {
          scrollXRef.current -= trackWidthRef.current;
        } else if (Math.abs(scrollXRef.current) >= trackWidthRef.current) {
          scrollXRef.current += trackWidthRef.current;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${scrollXRef.current}px, 0, 0)`;
      }
    }
  };

  const handlePointerUp = () => {
    isInteractingRef.current = false;
    isHorizontalDragRef.current = false;
    isDraggingRef.current = false;
    isPausedRef.current = false;
  };

  const handleCardClick = (member: TeamMemberData) => {
    // Prevent accidental popup opening if the user was actively dragging
    if (dragDistanceRef.current > 8) {
      return;
    }
    onSelectMember(member);
  };

  return (
    <section
      ref={sectionRef}
      id="our-team"
      className="relative w-full bg-[#0D0D0D] text-white py-20 sm:py-28 lg:py-32 overflow-hidden select-none border-t border-white/8"
      aria-label="Better Insights Team Gallery"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle,rgba(199,255,98,0.04)_0%,rgba(255,255,255,0.015)_45%,transparent_70%)] blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 1. SECTION INTRODUCTION (MadeByShape Reference Style) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70 mb-4">
          <span className="text-[#C7FF62] text-lg leading-none">•</span>
          <span>Our Team</span>
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.035em] text-white leading-[1.05] max-w-4xl mx-auto">
          Multiple personalities,<br />
          No egos.
        </h2>
      </div>

      {/* 2. CONTINUOUS HORIZONTAL INFINITE SCROLLING GALLERY */}
      <div
        className="relative w-full overflow-hidden py-12 z-10 cursor-grab active:cursor-grabbing touch-pan-y [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]"
        role="region"
        aria-label="Continuous horizontal team profiles carousel"
        onPointerEnter={(e: React.PointerEvent) => {
          // Only pause for actual desktop mouse hover, not touch taps
          if (
            e.pointerType === "mouse" ||
            (typeof window !== "undefined" &&
              window.matchMedia &&
              window.matchMedia("(hover: hover)").matches)
          ) {
            isPausedRef.current = true;
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 w-max will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {loopMembers.map((member, index) => {
            const isDuplicate = index >= members.length;
            const offset = STAGGER_OFFSETS[index % STAGGER_OFFSETS.length];

            return (
              <div
                key={`${member.id}-${index}`}
                className="shrink-0 w-[270px] sm:w-[300px] lg:w-[325px] transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(${offset}px)`,
                }}
                aria-hidden={isDuplicate ? "true" : "false"}
              >
                <article
                  role="button"
                  tabIndex={isDuplicate ? -1 : 0}
                  onClick={() => handleCardClick(member)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(member);
                    }
                  }}
                  className="group relative w-full aspect-[3/4] rounded-[22px] lg:rounded-[26px] overflow-hidden bg-[#EEEEEE] shadow-[0_18px_45px_-10px_rgba(0,0,0,0.65)] hover:shadow-[0_26px_60px_-10px_rgba(0,0,0,0.85)] hover:-translate-y-1.5 transition-all duration-400 ease-out cursor-pointer select-none"
                  aria-label={`View ${member.name}'s profile: ${member.role}`}
                >
                  {/* Top-Right Floating Actions (+ Button & LinkedIn) */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-30">
                    {/* LinkedIn Quick Link */}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${member.name} on LinkedIn`}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#34cc7b] text-white hover:text-[#0D0D0D] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md group/in"
                      >
                        <span className="font-bold text-[11px] font-sans">in</span>
                      </a>
                    )}

                    {/* Interactive Plus Button to open modal */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMember(member);
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#34cc7b] text-[#0D0D0D] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-90 hover:bg-[#2bb86d]"
                      aria-label={`Open details for ${member.name}`}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Portrait Media Area with Light Grey Background (#EEEEEE) */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#EEEEEE]">
                    {/* 1. Emoji / 3D Avatar Image (Default Resting View) */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105">
                      <Image
                        src={member.image}
                        alt={`${member.name} 3D Avatar`}
                        fill
                        priority={index < 4}
                        sizes="(max-width: 640px) 270px, (max-width: 1024px) 300px, 325px"
                        className="object-cover object-center pointer-events-none"
                      />
                    </div>

                    {/* 2. Original Real Photograph (Revealed on Card Hover) */}
                    {member.originalPhoto && (
                      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-105 group-hover:scale-100">
                        <Image
                          src={member.originalPhoto}
                          alt={`${member.name} Real Photograph`}
                          fill
                          sizes="(max-width: 640px) 270px, (max-width: 1024px) 300px, 325px"
                          className="object-cover object-top pointer-events-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom-Left Information Container with Custom Curved/Stepped Corner Fillets */}
                  <div className="w-full absolute bottom-0 left-0 pr-12 sm:pr-14 z-20 pointer-events-none">
                    <div className="w-auto relative inline-flex flex-col rounded-tr-2xl lg:rounded-tr-3xl pt-2.5 pb-2.5 pl-4 pr-5 lg:pt-3 lg:pb-3 lg:pl-5 lg:pr-7 bg-[#0D0D0D] text-white">
                      {/* Inverted Fillet Curve: Bottom-Right of the label */}
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute -bottom-px right-px transform translate-x-full rotate-180 text-[#0D0D0D] pointer-events-none"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                      >
                        <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                      </svg>

                      {/* Inverted Fillet Curve: Top-Left of the label */}
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute top-px left-0 transform -translate-y-full rotate-180 text-[#0D0D0D] pointer-events-none"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                      >
                        <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
                      </svg>

                      {/* Typography: Name in white medium-weight, Designation in muted grey */}
                      <div className="text-[15px] sm:text-base lg:text-[17px] font-medium text-white tracking-tight leading-snug">
                        {member.name}
                      </div>
                      <div className="text-xs sm:text-[13px] font-light text-white/60 tracking-normal leading-tight mt-0.5">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CENTERED LIME-GREEN PILL CTA BUTTON (MadeByShape Reference) */}
      <div className="relative z-10 flex justify-center mt-12 sm:mt-16">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#34cc7b] text-[#0D0D0D] text-[15px] font-semibold rounded-full shadow-[0_8px_24px_rgba(199,255,98,0.28)] hover:bg-[#34cc7b] hover:scale-105 hover:shadow-[0_14px_34px_rgba(199,255,98,0.42)] transition-all duration-300"
          aria-label="Meet the whole Team - Explore Better Insights Careers"
        >
          <span>Join Our Team</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
