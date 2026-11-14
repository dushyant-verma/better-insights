"use client";

import React from "react";
import { BlobButton } from "@/components/ui/BlobButton";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  widthClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "card-1",
    src: "/images/culture/hero-marketing-team.jpg",
    alt: "Better Insights team collaborating in studio workspace",
    widthClass: "w-[280px] sm:w-[350px] md:w-[390px] xl:w-[430px]",
  },
  {
    id: "card-2",
    src: "/images/culture/photo-1573496359142-b8d87734a5a2.jpg",
    alt: "Creative strategy and brand growth specialist smiling",
    widthClass: "w-[240px] sm:w-[290px] md:w-[320px] xl:w-[350px]",
  },
  {
    id: "card-3",
    src: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Sprint discussion and ideation in creative studio",
    widthClass: "w-[310px] sm:w-[380px] md:w-[430px] xl:w-[470px]",
  },
  {
    id: "card-4",
    src: "/images/culture/photo-1552664730-d307ca884978.jpg",
    alt: "Multi-disciplinary team planning and design session",
    widthClass: "w-[380px] sm:w-[480px] md:w-[560px] xl:w-[620px]",
  },
  {
    id: "card-5",
    src: "/images/culture/photo-1573497019940-1c28c88b4f3e.jpg",
    alt: "Engineering and technology specialist at laptop",
    widthClass: "w-[250px] sm:w-[300px] md:w-[330px] xl:w-[360px]",
  },
  {
    id: "card-6",
    src: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    alt: "Design architecture and UX review workshop",
    widthClass: "w-[330px] sm:w-[420px] md:w-[480px] xl:w-[530px]",
  },
];

export function CareersHero() {
  const scrollToPositions = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="careers-hero"
      className="w-full bg-[#0E0F10] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-18 lg:pb-20 xl:pt-18 xl:pb-24 overflow-hidden select-none border-b border-white/10"
      aria-label="Careers at Better Insights"
    >
      {/* Top Hero Text Section (Center-aligned MadeByShape Blueprint) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Section Indicator: • Careers */}
        <div className="inline-flex items-center space-x-2 mb-4 sm:mb-6">
          <span
            className="bg-white/80 w-1.5 h-1.5 rounded-full inline-block"
            aria-hidden="true"
          />
          <span className="font-light text-sm sm:text-base text-white/80 tracking-normal">
            Careers
          </span>
        </div>

        {/* Main Headline with Exact Reference Line Breaks */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] 2xl:text-[88px] font-semibold tracking-tight text-white leading-[1.05] sm:leading-[1.02] max-w-4xl text-center select-none">
          Build your future at <br />
          Better Insights.
        </h1>

        {/* Subtitle & CTA Row matching MadeByShape */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10 mb-10 sm:mb-14 lg:mb-16">
          <span className="text-white/70 text-sm sm:text-base font-normal">
            Get on with it...
          </span>

          <BlobButton
            href="#open-positions"
            onClick={scrollToPositions}
            size="md"
            icon="arrow-up-right"
            ariaLabel="View open positions at Better Insights"
          >
            View open positions
          </BlobButton>
        </div>
      </div>

      {/* Horizontally Scrolling Image Gallery */}
      <div className="careers-gallery-wrap" aria-label="Workplace & culture photograph marquee">
        <div className="careers-gallery-track">
          {/* Set 1 */}
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={`set1-${item.id}-${index}`}
              className={`h-[260px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[320px] ${item.widthClass} rounded-2xl lg:rounded-3xl overflow-hidden bg-[#18191D] relative flex-shrink-0 group shadow-2xl`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Set 2 (Seamless loop duplicate) */}
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={`set2-${item.id}-${index}`}
              className={`h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px] ${item.widthClass} rounded-2xl lg:rounded-3xl overflow-hidden bg-[#18191D] relative flex-shrink-0 group shadow-2xl`}
              aria-hidden="true"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
