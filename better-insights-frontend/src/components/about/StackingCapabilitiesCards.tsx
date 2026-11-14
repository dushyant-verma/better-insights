"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  href: string;
  image?: string;
  badges: string[];
}

interface StackingCapabilitiesCardsProps {
  capabilities: CapabilityItem[];
}

export function StackingCapabilitiesCards({ capabilities }: StackingCapabilitiesCardsProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll position with RAF throttling to eliminate layout thrashing
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateActiveCard = () => {
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768;
      const navOffset = isDesktop ? 88 : isTablet ? 78 : 64;
      const stackOffset = isDesktop ? 22 : isTablet ? 18 : 14;

      let current = 0;
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stickyTarget = navOffset + idx * stackOffset;
        // If the card has reached near its sticky position, it's considered active
        if (rect.top <= stickyTarget + 10) {
          current = idx;
        }
      });
      setActiveIndex(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveCard);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveCard();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [capabilities.length]);

  // Smooth click navigation when clicking any header in the stack
  const handleHeaderClick = (index: number) => {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;
    const isDesktop = window.innerWidth >= 1024;
    const isTablet = window.innerWidth >= 768;
    const navOffset = isDesktop ? 88 : isTablet ? 78 : 64;
    const stackOffset = isDesktop ? 22 : isTablet ? 18 : 14;
    const stickyTop = navOffset + index * stackOffset;
    const targetY = window.scrollY + cardEl.getBoundingClientRect().top - stickyTop;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="capabilities"
      className="py-20 sm:py-28 bi-capabilities-section select-none"
      aria-label="Our Strategic Capabilities"
    >
      {/* Ambient background light */}
      <div className="bi-capabilities-ambient" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#CBFC6B] block mb-3">
              Full-Lifecycle Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF5F0] leading-tight">
              Our strategic capabilities
            </h2>
          </div>
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF5F0] hover:text-[#CBFC6B] transition-colors group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-[#CBFC6B] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED CONNECTED STACKING DECK (SINGLE PARENT CONTAINER)                 */}
        {/* ========================================================================= */}
        <div ref={deckRef} className="bi-connected-deck-container">
          {capabilities.map((cap, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={cap.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`bi-connected-card ${isActive ? "bi-connected-card--active" : ""}`}
                style={
                  {
                    "--card-index": index,
                    zIndex: 10 + index,
                  } as React.CSSProperties
                }
              >
                {/* 1. Compact Horizontal Header Row (Consistent Alignment & Spacing) */}
                <div
                  className="bi-connected-card-header group"
                  onClick={() => handleHeaderClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleHeaderClick(index);
                    }
                  }}
                  aria-expanded={isActive}
                  aria-label={`View ${cap.title}`}
                >
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <span className="font-mono text-sm sm:text-base lg:text-lg font-bold text-[#CBFC6B] w-6 sm:w-8 shrink-0">
                      {cap.number}
                    </span>
                    <span className="w-px h-4 bg-black/10 shrink-0" aria-hidden="true" />
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold tracking-tight text-[#1B1411] truncate group-hover:text-[#CBFC6B] transition-colors">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-[14px] text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FAF5F0] text-[#66574F] border border-black/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                      <span>DOMAIN // 0{index + 1}</span>
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF5F0] border border-black/8 flex items-center justify-center text-[#1B1411] group-hover:border-[#CBFC6B] group-hover:bg-[#CBFC6B] group-hover:text-white transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 2. Active Panel Body (Two-Column Layout: Left Text & CTA, Right Rounded Image) */}
                <div className="bi-connected-card-body">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Descriptive Content & CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[14px] bg-[#FAF5F0] border border-black/8 text-[11px] font-bold uppercase tracking-wider text-[#66574F] mb-3 sm:mb-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                          <span>Core Capability // {cap.number}</span>
                        </div>

                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#1B1411] leading-tight mb-3">
                          {cap.title}
                        </h4>

                        <p className="text-sm sm:text-base text-[#66574F] leading-relaxed font-normal mb-5 sm:mb-6">
                          {cap.desc}
                        </p>

                        {/* Feature Badges (12-16px inner element radius) */}
                        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                          {cap.badges.map((b) => (
                            <span
                              key={b}
                              className="px-3 py-1 rounded-[14px] text-xs font-semibold bg-[#FAF5F0] border border-black/8 text-[#1B1411] hover:border-[#CBFC6B]/50 transition-colors"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Explore Service CTA Button */}
                      <div>
                        <Link
                          href={cap.href}
                          className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#1B1411] text-[#FAF5F0] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all hover:scale-105 shadow-md group/btn"
                        >
                          <span>Explore Service</span>
                          <ArrowUpRight className="w-4 h-4 text-[#CBFC6B] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Rounded Visual Showcase (22px image border radius) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3] rounded-[22px] overflow-hidden border border-black/8 shadow-md bg-[#EDE5DC] group/img">
                        {cap.image ? (
                          <Image
                            src={cap.image}
                            alt={cap.title}
                            fill
                            className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#FAF5F0] text-[#66574F]">
                            <Sparkles className="w-10 h-10 text-[#CBFC6B]" />
                          </div>
                        )}
                        <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-white/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#1B1411] font-bold shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                          <span>Enterprise Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
