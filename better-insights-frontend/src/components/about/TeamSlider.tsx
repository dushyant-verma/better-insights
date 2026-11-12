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

  // Calculate track width
  const calcTrackWidth = useCallback(() => {
    if (trackRef.current) {
      // The track contains 2 identical halves; half the scrollWidth is 1 complete cycle
      trackWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  // IntersectionObserver: Pause RAF loop when slider is outside the viewport to maximize 60fps scroll budget
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // ResizeObserver: Dynamically update track width if images/fonts load without any jump
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      calcTrackWidth();
    });
    ro.observe(track);

    return () => ro.disconnect();
  }, [calcTrackWidth]);

  // Continuous animation loop
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    calcTrackWidth();

    const speed = 0.65; // Pixels per frame

    const step = () => {
      if (
        isVisibleRef.current &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        trackWidthRef.current > 0
      ) {
        scrollXRef.current -= speed;

        // Seamless wrap
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
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
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
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
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
                aria-hidden={isDuplicate}
              >
                <article
                  onClick={() => handleCardClick(member)}
                  role="button"
                  tabIndex={isDuplicate ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(member);
                    }
                  }}
                  className="group relative w-full aspect-[3/4] rounded-[22px] lg:rounded-[26px] overflow-hidden bg-[#EEEEEE] shadow-[0_18px_45px_-10px_rgba(0,0,0,0.65)] hover:shadow-[0_26px_60px_-10px_rgba(0,0,0,0.85)] hover:-translate-y-1.5 transition-all duration-400 ease-out cursor-pointer select-none"
                  aria-label={`View ${member.name}'s profile: ${member.role}`}
                >
                  {/* Top-Right Action Buttons: Optional LinkedIn + Lime-Green Plus Button */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-30">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-[#0D0D0D]/75 hover:bg-[#0A66C2] backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                        aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                        tabIndex={isDuplicate ? -1 : 0}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="13"
                          height="13"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    )}

                    {/* Circular Plus Button: Styled lime-green (#C7FF62) with dark icon, opens modal */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(member);
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#C7FF62] text-[#0D0D0D] flex items-center justify-center shadow-[0_2px_12px_rgba(199,255,98,0.4)] transition-all duration-300 group-hover:rotate-90 hover:scale-110 cursor-pointer"
                      aria-label={`Open ${member.name}'s profile modal`}
                      tabIndex={isDuplicate ? -1 : 0}
                    >
                      <Plus className="w-4 h-4 stroke-[2.8]" />
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
