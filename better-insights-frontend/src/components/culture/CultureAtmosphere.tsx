"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";
import "@/styles/about-culture.css";

interface ClusterCard {
  id: string;
  src: string;
  alt: string;
  wrapperClass: string;
  cardRotation: string;
  caption?: {
    text: string;
    emoji: string;
    position: "top" | "bottom";
    align?: "left" | "center" | "right";
  };
}

interface ImageCluster {
  id: string;
  title: string;
  widthClass: string;
  cards: ClusterCard[];
}

// -----------------------------------------------------------------------------
// 5 Distinct Editorial Clusters (12 Images Total)
// Organically arranged with overlapping cards, varying aspect ratios,
// subtle rotations, and pointing emoji captions.
// -----------------------------------------------------------------------------
const ATMOSPHERE_CLUSTERS: ImageCluster[] = [
  // ---------------------------------------------------------------------------
  // Cluster 1: Strategy & Discovery (3 Overlapping Photos)
  // ---------------------------------------------------------------------------
  {
    id: "cluster-1",
    title: "Strategy & Discovery",
    widthClass: "w-[84vw] sm:w-[540px] md:w-[580px] lg:w-[640px] xl:w-[680px]",
    cards: [
      {
        id: "c1-card-1",
        src: "/images/culture/hero-marketing-team.jpg",
        alt: "Better Insights team collaborating on digital sprint strategy in our studio",
        wrapperClass: "w-[56%] sm:w-[52%] aspect-[4/3] top-[10%] left-[2%] z-10",
        cardRotation: "-rotate-[3.5deg]",
        caption: {
          text: "Strategy Sprints in Motion",
          emoji: "👇",
          position: "top",
          align: "left",
        },
      },
      {
        id: "c1-card-2",
        src: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
        alt: "Wireframing and user experience architecture design",
        wrapperClass: "w-[50%] sm:w-[46%] aspect-[4/3] top-[6%] left-[46%] z-5",
        cardRotation: "rotate-[3.5deg]",
        caption: {
          text: "Designing User Journeys",
          emoji: "👇",
          position: "top",
          align: "right",
        },
      },
      {
        id: "c1-card-3",
        src: "/images/culture/photo-1556761175-4b46a572b786.jpg",
        alt: "Cross-functional team discussing solutions around conference table",
        wrapperClass: "w-[62%] sm:w-[58%] aspect-[16/11] top-[42%] left-[18%] z-20",
        cardRotation: "-rotate-[4.5deg]",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Cluster 2: Focus & Engineering (2 Overlapping Photos)
  // ---------------------------------------------------------------------------
  {
    id: "cluster-2",
    title: "Focus & Engineering",
    widthClass: "w-[80vw] sm:w-[420px] md:w-[460px] lg:w-[500px] xl:w-[540px]",
    cards: [
      {
        id: "c2-card-1",
        src: "/images/culture/photo-1553877522-43269d4ea984.jpg",
        alt: "Product engineers working with focused craft and precision",
        wrapperClass: "w-[50%] sm:w-[46%] aspect-[3/4] top-[10%] left-[2%] z-10",
        cardRotation: "rotate-[4deg]",
        caption: {
          text: "Behind the Pixels",
          emoji: "☝️",
          position: "top",
          align: "left",
        },
      },
      {
        id: "c2-card-2",
        src: "/images/culture/photo-1552664730-d307ca884978.jpg",
        alt: "Interactive whiteboard workshop and strategic roadmap planning",
        wrapperClass: "w-[58%] sm:w-[56%] aspect-[4/3] top-[40%] left-[32%] z-20",
        cardRotation: "-rotate-[3deg]",
        caption: {
          text: "Whiteboard Architecture",
          emoji: "👇",
          position: "bottom",
          align: "right",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Cluster 3: Milestones & Community (3 Overlapping Photos)
  // ---------------------------------------------------------------------------
  {
    id: "cluster-3",
    title: "Milestones & Community",
    widthClass: "w-[84vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[700px]",
    cards: [
      {
        id: "c3-card-1",
        src: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
        alt: "Team milestones, celebrations, and collaborative energy",
        wrapperClass: "w-[52%] sm:w-[48%] aspect-[4/3] top-[10%] left-[2%] z-10",
        cardRotation: "-rotate-[2.5deg]",
        caption: {
          text: "Team Milestones & Summits",
          emoji: "☝️",
          position: "top",
          align: "left",
        },
      },
      {
        id: "c3-card-2",
        src: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
        alt: "Creative specialist focusing on visual design details",
        wrapperClass: "w-[46%] sm:w-[42%] aspect-[3/4] top-[38%] left-[24%] z-20",
        cardRotation: "rotate-[3deg]",
        caption: {
          text: "Crafting with Focus",
          emoji: "👇",
          position: "bottom",
          align: "left",
        },
      },
      {
        id: "c3-card-3",
        src: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
        alt: "Team exploring new tech patterns in studio lounge",
        wrapperClass: "w-[46%] sm:w-[44%] aspect-[3/4] top-[12%] left-[52%] z-15",
        cardRotation: "-rotate-[4.5deg]",
        caption: {
          text: "Always Exploring",
          emoji: "☝️",
          position: "top",
          align: "right",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Cluster 4: Curiosity & Standups (2 Overlapping Photos)
  // ---------------------------------------------------------------------------
  {
    id: "cluster-4",
    title: "Curiosity & Standups",
    widthClass: "w-[80vw] sm:w-[420px] md:w-[460px] lg:w-[500px] xl:w-[540px]",
    cards: [
      {
        id: "c4-card-1",
        src: "/images/culture/photo-1573496359142-b8d87734a5a2.jpg",
        alt: "Creative thinkers fostering genuine collaboration and open dialogue",
        wrapperClass: "w-[54%] sm:w-[50%] aspect-[4/3] top-[12%] left-[4%] z-15",
        cardRotation: "rotate-[3.5deg]",
        caption: {
          text: "Curiosity in Action",
          emoji: "☝️",
          position: "top",
          align: "left",
        },
      },
      {
        id: "c4-card-2",
        src: "/images/culture/photo-1573497491765-dccce02b29df.jpg",
        alt: "Product squad aligning on deliverable sprint goals",
        wrapperClass: "w-[58%] sm:w-[56%] aspect-[16/10] top-[42%] left-[32%] z-20",
        cardRotation: "-rotate-[3.5deg]",
        caption: {
          text: "Sprint Standups",
          emoji: "👇",
          position: "bottom",
          align: "right",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Cluster 5: Impact & Real Results (2 Overlapping Photos)
  // ---------------------------------------------------------------------------
  {
    id: "cluster-5",
    title: "Impact & Real Results",
    widthClass: "w-[80vw] sm:w-[440px] md:w-[480px] lg:w-[520px] xl:w-[560px]",
    cards: [
      {
        id: "c5-card-1",
        src: "/images/culture/photo-1573164713988-8665fc963095.jpg",
        alt: "Delivering business impact and measurable client ROI",
        wrapperClass: "w-[54%] sm:w-[50%] aspect-[4/3] top-[10%] left-[2%] z-15",
        cardRotation: "-rotate-[2.5deg]",
        caption: {
          text: "Turning Ideas into Reality",
          emoji: "🚀",
          position: "top",
          align: "left",
        },
      },
      {
        id: "c5-card-2",
        src: "/images/culture/photo-1573497019940-1c28c88b4f3e.jpg",
        alt: "Executive leadership and client partnership reviews",
        wrapperClass: "w-[48%] sm:w-[44%] aspect-[3/4] top-[36%] left-[38%] z-20",
        cardRotation: "rotate-[4deg]",
        caption: {
          text: "Client Partnerships",
          emoji: "👇",
          position: "bottom",
          align: "right",
        },
      },
    ],
  },
];

export function CultureAtmosphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Setup: Pinned Horizontal Scrubbing on Desktop, Tablet & Mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance reveal for header elements
      gsap.fromTo(
        section.querySelectorAll(".atmosphere-header-item"),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2. Dynamic Scroll Distance Calculation (Responsive across all viewports)
      const getScrollDistance = () => {
        if (!track) return 0;
        const padding = window.innerWidth < 768 ? 32 : 120;
        return Math.max(0, track.scrollWidth - window.innerWidth + padding);
      };

      const getPinDuration = () => {
        const dist = getScrollDistance();
        if (window.innerWidth < 768) {
          // Responsive pin distance tuned for mobile touch scrolling
          return Math.max(1100, dist * 0.95);
        }
        return Math.max(1600, dist * 1.15);
      };

      // 3. Master Pinned Horizontal Scrub Timeline
      // Section pins in place while track moves along the X-axis from 0 to -getScrollDistance()
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinDuration()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Translate the track horizontally from right to left
      tl.to(
        track,
        {
          x: () => -getScrollDistance(),
          ease: "none",
          duration: 1,
        },
        0
      );

      // Progress bar scrub at the bottom
      if (progressBar) {
        tl.to(
          progressBar,
          {
            scaleX: 1,
            ease: "none",
            duration: 1,
          },
          0
        );
      }

      // Floating parallax & subtle tilt shifts on alternating cards during horizontal travel
      const cards = track.querySelectorAll(".atmosphere-card");
      cards.forEach((card, idx) => {
        const isOdd = idx % 2 === 1;
        tl.to(
          card,
          {
            y: () => {
              const isMobile = window.innerWidth < 768;
              return isMobile ? (isOdd ? -10 : 10) : (isOdd ? -20 : 20);
            },
            ease: "none",
            duration: 1,
          },
          0
        );
      });

      return () => {
        tl.kill();
        gsap.set(track, { clearProps: "all" });
        if (progressBar) gsap.set(progressBar, { clearProps: "all" });
        if (cards.length > 0) gsap.set(cards, { clearProps: "all" });
      };
    }, section);

    // ResizeObserver: auto-refresh calculations when photos or fonts finish settling
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(track);
    }

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", handleLoad);
      if (ro) ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-atmosphere"
      className="relative w-full bg-[#0d0c12] select-none h-[100dvh] min-h-[560px] max-h-[1100px] flex flex-col justify-between overflow-hidden py-3 sm:py-5 md:py-0"
      aria-labelledby="bi-culture-title"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] lg:w-[1200px] h-[550px] bg-[radial-gradient(circle,rgba(52,204,123,0.06)_0%,rgba(43,184,109,0.015)_50%,transparent_70%)] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ===================================================================== */}
      {/* 1. Stationary Header (Fixed at top of pinned section on all screens)   */}
      {/* ===================================================================== */}
      <header className="bi-culture-container pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-2 sm:pb-3 shrink-0 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-5 lg:gap-12">
          {/* Eyebrow & Title */}
          <div className="atmosphere-header-item">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-2 sm:mb-3 md:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#34CC7B]">
                Our Culture &amp; People
              </span>
            </div>
            <h2
              id="bi-culture-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-[-0.035em] [font-family:'Host_Grotesk',sans-serif] leading-[1.1] sm:leading-[1.08]"
            >
              Feel the atmosphere.
            </h2>
          </div>

          {/* Introductory Paragraph */}
          <div className="max-w-xl atmosphere-header-item">
            <p className="text-xs sm:text-sm md:text-base lg:text-[17px] text-[#A5A5A5] font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
              Behind every great digital experience is a team of curious minds, creative thinkers and problem solvers. At Better Insights, we bring strategy, design and technology together to create meaningful digital experiences and build things that make a difference.
            </p>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. Horizontal Photographic Gallery Track (Pinned Scroll on All Devices)*/}
      {/* Smooth right-to-left travel driven by vertical scroll scrub           */}
      {/* ===================================================================== */}
      <div
        ref={trackWrapperRef}
        className="relative w-full flex-1 min-h-0 flex items-center overflow-hidden py-0 z-10"
      >
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-28 w-max pl-4 sm:pl-8 md:pl-16 lg:pl-24 pr-8 sm:pr-16 md:pr-28 lg:pr-44 will-change-transform"
        >
          {ATMOSPHERE_CLUSTERS.map((cluster) => {
            return (
              <div
                key={cluster.id}
                className={`relative shrink-0 snap-center h-[320px] sm:h-[400px] md:h-[480px] lg:h-[510px] xl:h-[540px] ${cluster.widthClass}`}
                aria-label={cluster.title}
              >
                {cluster.cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      className={`absolute overflow-visible ${card.wrapperClass}`}
                    >
                      <div
                        className={`atmosphere-card relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-visible ${card.cardRotation} group transition-transform duration-500 hover:scale-105 hover:z-30`}
                      >
                        {/* Caption Decoration with Emoji */}
                        {card.caption && (
                          <div
                            className={`absolute z-30 pointer-events-none flex flex-col items-center ${
                              card.caption.position === "top"
                                ? "-top-9 sm:-top-11 md:-top-14"
                                : "-bottom-10 sm:-bottom-13 md:-bottom-16"
                            } ${
                              card.caption.align === "left"
                                ? "left-1 sm:left-2 md:left-4"
                                : card.caption.align === "right"
                                ? "right-1 sm:right-2 md:right-4"
                                : "left-1/2 -translate-x-1/2"
                            }`}
                          >
                            {card.caption.position === "bottom" && (
                              <span className="text-base sm:text-xl md:text-2xl mb-0.5 filter drop-shadow">
                                {card.caption.emoji}
                              </span>
                            )}
                            <span className="text-[10px] sm:text-xs md:text-sm font-light text-[#CCCCCC] tracking-tight whitespace-nowrap text-center filter drop-shadow [font-family:'Host_Grotesk',sans-serif]">
                              {card.caption.text}
                            </span>
                            {card.caption.position === "top" && (
                              <span className="text-base sm:text-xl md:text-2xl mt-0.5 filter drop-shadow">
                                {card.caption.emoji}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Image Container with Rounded Corners & Soft Border */}
                        <div className="relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#181622] border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] group-hover:border-[#34CC7B]/40 transition-colors duration-300">
                          <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 400px"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. Pinned Scroll Progress Indicator (Bottom of pinned screen)         */}
      {/* ===================================================================== */}
      <div className="bi-culture-container pb-3 sm:pb-5 md:pb-6 pt-1 sm:pt-2 shrink-0 relative z-20 flex items-center justify-between text-xs text-white/40">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B] animate-pulse" />
          <span className="tracking-widest uppercase text-[9px] sm:text-[10px] text-white/60 font-mono">
            Scroll down to explore gallery
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[9px] sm:text-[10px] text-white/40 font-mono">01</span>
          <div className="w-24 sm:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#34CC7B] w-full origin-left scale-x-0 will-change-transform"
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/40 font-mono">05</span>
        </div>
      </div>
    </section>
  );
}

export default CultureAtmosphere;
