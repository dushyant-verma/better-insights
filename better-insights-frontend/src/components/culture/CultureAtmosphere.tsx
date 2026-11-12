"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Camera } from "lucide-react";

interface AtmosphereItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
  emoji: string;
  captionPos: "top-left" | "bottom-right" | "top-right" | "bottom-left";
  styleVariant: "portrait-lg" | "landscape" | "square" | "portrait-sm" | "wide";
  clusterId: number;
}

const ATMOSPHERE_ITEMS: AtmosphereItem[] = [
  {
    id: "item-1",
    image: "/images/culture/hero-marketing-team.jpg",
    alt: "Better Insights team collaborating on digital campaign",
    caption: "Ideas in motion",
    emoji: "☝️",
    captionPos: "top-left",
    styleVariant: "portrait-lg",
    clusterId: 1,
  },
  {
    id: "item-2",
    image: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    alt: "Design architecture and wireframe review",
    caption: "Design meets technology",
    emoji: "👇",
    captionPos: "bottom-right",
    styleVariant: "landscape",
    clusterId: 1,
  },
  {
    id: "item-3",
    image: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Engineering sprint and cross-functional team session",
    caption: "Built together",
    emoji: "✨",
    captionPos: "top-right",
    styleVariant: "portrait-sm",
    clusterId: 2,
  },
  {
    id: "item-4",
    image: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    alt: "Creative strategy and brand conceptualization",
    caption: "Creative minds at work",
    emoji: "☝️",
    captionPos: "bottom-left",
    styleVariant: "square",
    clusterId: 2,
  },
  {
    id: "item-5",
    image: "/images/culture/photo-1552664730-d307ca884978.jpg",
    alt: "Strategic whiteboard planning and roadmap workshop",
    caption: "Brainstorming something big",
    emoji: "👇",
    captionPos: "bottom-right",
    styleVariant: "wide",
    clusterId: 3,
  },
  {
    id: "item-6",
    image: "/images/culture/photo-1553877522-43269d4ea984.jpg",
    alt: "Deep focus engineering and interface design",
    caption: "Behind the pixels",
    emoji: "☝️",
    captionPos: "top-left",
    styleVariant: "portrait-sm",
    clusterId: 3,
  },
  {
    id: "item-7",
    image: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    alt: "Celebrating team milestones and social camaraderie",
    caption: "Team moments",
    emoji: "👇",
    captionPos: "bottom-right",
    styleVariant: "portrait-lg",
    clusterId: 4,
  },
  {
    id: "item-8",
    image: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    alt: "Researching emerging technological patterns and AI tools",
    caption: "Always exploring",
    emoji: "☝️",
    captionPos: "top-right",
    styleVariant: "landscape",
    clusterId: 4,
  },
  {
    id: "item-9",
    image: "/images/culture/photo-1573164713988-8665fc963095.jpg",
    alt: "Delivering measurable business impact and client results",
    caption: "Turning ideas into reality",
    emoji: "🚀",
    captionPos: "top-left",
    styleVariant: "wide",
    clusterId: 5,
  },
  {
    id: "item-10",
    image: "/images/culture/photo-1573497019940-1c28c88b4f3e.jpg",
    alt: "United agency team building the future together",
    caption: "Better together",
    emoji: "🤝",
    captionPos: "bottom-right",
    styleVariant: "portrait-sm",
    clusterId: 5,
  },
];

export function CultureAtmosphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0, hasMoved: false });

  // Update progress and navigation arrow states
  const updateScrollState = () => {
    if (!wrapRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = wrapRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < maxScroll - 15);
    }
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  // Arrow button click handlers
  const handleScrollBy = (direction: "left" | "right") => {
    if (!wrapRef.current) return;
    const distance = (typeof window !== "undefined" ? window.innerWidth : 800) * 0.65;
    wrapRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  // Mouse Drag to Scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX,
      scrollLeft: wrapRef.current.scrollLeft,
      hasMoved: false,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wrapRef.current) return;
    e.preventDefault();
    const dx = e.pageX - dragStartRef.current.x;
    if (Math.abs(dx) > 5) {
      dragStartRef.current.hasMoved = true;
    }
    wrapRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="culture-atmosphere"
      className="py-24 sm:py-32 bg-[#0D0D10] text-white select-none border-t border-white/10 relative overflow-hidden"
      aria-label="Feel the Atmosphere"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(circle,rgba(52,204,123,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34CC7B] block mb-3">
              Everyday Life · Agency Moments
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Feel the atmosphere.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A5A5A5] font-normal leading-relaxed">
              A scrapbook of real moments: solving hard problems, whiteboarding big ideas, celebrating
              deliveries, and enjoying the journey together. Drag or scroll to explore.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleScrollBy("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#34CC7B] hover:text-[#171717] disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll gallery left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollBy("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#34CC7B] hover:text-[#171717] disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll gallery right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Flagship Horizontal Atmosphere Gallery Track */}
      <div
        ref={wrapRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`bi-atmosphere-wrap ${isDragging ? "is-dragging" : ""}`}
        role="region"
        aria-label="Culture photo scrapbook"
        tabIndex={0}
      >
        <div className="bi-atmosphere-track">
          {/* Group into pairs / clusters */}
          {[1, 2, 3, 4, 5].map((clusterNum) => {
            const clusterItems = ATMOSPHERE_ITEMS.filter((item) => item.clusterId === clusterNum);
            return (
              <div key={clusterNum} className="bi-atmosphere-cluster">
                {clusterItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bi-atmosphere-item bi-atmosphere-item--${item.styleVariant}`}
                  >
                    {/* Floating Caption Pill */}
                    <div className={`bi-atmosphere-caption bi-atmosphere-caption--${item.captionPos}`}>
                      <span className="bi-atmosphere-caption__emoji">{item.emoji}</span>
                      <span className="bi-atmosphere-caption__badge">{item.caption}</span>
                    </div>

                    {/* Media Container */}
                    <div className="bi-atmosphere-item__media w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="bi-atmosphere-item__img"
                        sizes="(max-width: 768px) 70vw, 420px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar & Footer telemetry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between text-xs text-[#A5A5A5]">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#34CC7B]" />
          <span>Real moments captured across Better Insights</span>
        </div>
        <div className="w-40 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#34CC7B] transition-all duration-150 rounded-full"
            style={{ width: `${Math.max(8, scrollProgress)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

