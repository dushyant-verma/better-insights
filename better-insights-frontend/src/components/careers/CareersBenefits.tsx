"use client";

import React from "react";
import {
  TrendingUp,
  Sparkles,
  Cpu,
  Users,
  Compass,
  Rocket,
} from "lucide-react";

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CAREERS_BENEFITS: BenefitItem[] = [
  {
    id: "growth-learning",
    title: "Growth & Learning",
    description:
      "Opportunities to learn new technologies, develop your skills, and grow professionally.",
    icon: TrendingUp,
  },
  {
    id: "creative-freedom",
    title: "Creative Freedom",
    description:
      "Bring your ideas to life, experiment with new approaches, and contribute to meaningful projects.",
    icon: Sparkles,
  },
  {
    id: "modern-tools",
    title: "Modern Tools & Technology",
    description:
      "Work with modern tools, platforms, and technologies to create impactful digital experiences.",
    icon: Cpu,
  },
  {
    id: "collaborative-culture",
    title: "Collaborative Culture",
    description:
      "Work alongside creative thinkers, developers, strategists, and digital professionals.",
    icon: Users,
  },
  {
    id: "flexible-working",
    title: "Flexible Working",
    description:
      "A collaborative working environment that encourages flexibility, ownership, and productivity.",
    icon: Compass,
  },
  {
    id: "real-world-impact",
    title: "Real-World Impact",
    description:
      "Work on exciting projects and build digital solutions that create measurable business value.",
    icon: Rocket,
  },
];

interface CareersBenefitsProps {
  className?: string;
  benefits?: BenefitItem[];
}

export function CareersBenefits({
  className = "",
  benefits = CAREERS_BENEFITS,
}: CareersBenefitsProps) {
  return (
    <section
      id="careers-benefits"
      className={`w-full py-16 sm:py-20 lg:py-24 bg-[#0E0F10] text-white relative select-none scroll-mt-24 ${className}`}
      aria-label="Benefits and Perks"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* Large Rounded, Blob-Inspired Card with Stepped Top-Left Cutout    */}
        {/* ================================================================= */}
        <div className="relative w-full bg-[#191A1D] rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-6 sm:p-10 lg:p-14 xl:p-16 border border-white/[0.04] shadow-2xl overflow-hidden">
          {/* --------------------------------------------------------------- */}
          {/* Distinctive Stepped/Curved Top-Left Cutout & Fillet SVGs        */}
          {/* Exactly matching MadeByShape organic container geometry         */}
          {/* --------------------------------------------------------------- */}
          <div
            className="bg-[#0E0F10] text-[#0E0F10] absolute top-0 left-0 z-20 rounded-br-2xl sm:rounded-br-3xl w-48 sm:w-64 lg:w-80 h-12 sm:h-16 lg:h-20 pointer-events-none"
            aria-hidden="true"
          >
            {/* Bottom Fillet (Smooth vertical junction transition) */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#0E0F10] fill-current absolute bottom-px -left-px transform translate-y-full pointer-events-none"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>

            {/* Right Fillet (Smooth horizontal junction transition) */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#0E0F10] fill-current absolute -top-px right-px transform translate-x-full pointer-events-none"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>
          </div>

          {/* =============================================================== */}
          {/* Section Header: Center-Aligned                                  */}
          {/* =============================================================== */}
          <div className="w-full flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20 mt-8 sm:mt-10 lg:mt-6 relative z-10">
            {/* Small Bullet Label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
                Benefits
              </span>
            </div>

            {/* Main Display Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium tracking-[-0.03em] text-white leading-tight text-balance max-w-2xl [font-family:'Host_Grotesk',sans-serif]">
              A little more than just a workplace
            </h2>
          </div>

          {/* =============================================================== */}
          {/* Benefits Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile)  */}
          {/* Thin horizontal dividers between rows                           */}
          {/* =============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-8 lg:gap-y-12 relative z-10">
            {benefits.map((benefit, idx) => {
              const isFirstRowDesktop = idx < 3;
              const isFirstTwoRowsTablet = idx < 4;
              const isNotLastMobile = idx < benefits.length - 1;

              return (
                <div
                  key={benefit.id}
                  className={`flex flex-col items-start pb-8 lg:pb-12 ${
                    isFirstRowDesktop
                      ? "lg:border-b lg:border-white/10"
                      : "lg:border-b-0"
                  } ${
                    isFirstTwoRowsTablet
                      ? "md:max-lg:border-b md:max-lg:border-white/10"
                      : "md:max-lg:border-b-0"
                  } ${
                    isNotLastMobile
                      ? "max-md:border-b max-md:border-white/10"
                      : "max-md:border-b-0"
                  }`}
                >
                  {/* Top: Lime-green icon container + Benefit title */}
                  <div className="flex items-center gap-3.5 sm:gap-4 mb-3 sm:mb-4">
                    <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#CBFC6B] text-[#101112] flex items-center justify-center shadow-sm">
                      <benefit.icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-[22px] font-semibold text-white tracking-tight leading-tight [font-family:'Host_Grotesk',sans-serif]">
                      {benefit.title}
                    </h3>
                  </div>

                  {/* Bottom: Description */}
                  <p className="text-xs sm:text-sm text-white/60 font-normal leading-relaxed [font-family:'Host_Grotesk',sans-serif]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersBenefits;

