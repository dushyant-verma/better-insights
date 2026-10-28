"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SolutionItem {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
}

const SOLUTIONS: SolutionItem[] = [
  {
    title: "AI & AUTOMATION",
    description: "Build intelligent workflows, AI-powered experiences and automation systems that reduce manual work and help your business move faster.",
    ctaText: "Explore Solution",
    ctaUrl: "/ai-solutions",
    imageUrl: "/images/AI-AUTOMATION.webp",
  },
  {
    title: "DIGITAL GROWTH",
    description: "Create high-performing digital experiences that strengthen your brand, attract the right audience and turn attention into measurable growth.",
    ctaText: "Explore Solution",
    ctaUrl: "/digital-growth",
    imageUrl: "/images/DIGITAL-GROWTH.webp",
  },
  {
    title: "TECHNOLOGY & ENGINEERING",
    description: "From websites and applications to APIs and custom platforms, we engineer reliable technology built around your business requirements.",
    ctaText: "Explore Solution",
    ctaUrl: "/technology-engineering",
    imageUrl: "/images/TECHNOLOGY-ENGINEERING.webp",
  },
  {
    title: "DIGITAL TRANSFORMATION",
    description: "Connect strategy, technology and execution to modernize operations, improve customer experiences and create scalable digital foundations.",
    ctaText: "Explore Solution",
    ctaUrl: "/digital-transformation",
    imageUrl: "/images/DIGITAL-TRANSFORMATION.webp",
  },
  {
    title: "CRM & INTEGRATIONS",
    description: "Connect your CRM, marketing, sales and business systems to create seamless data flows, better visibility and stronger customer journeys.",
    ctaText: "Explore Solution",
    ctaUrl: "/crm-integrations",
    imageUrl: "/images/CRM-INTEGRATIONS.webp",
  },
  {
    title: "MANAGED TECHNOLOGY",
    description: "Keep your digital ecosystem optimized with continuous improvements, technical support, performance optimization and ongoing innovation.",
    ctaText: "Explore Solution",
    ctaUrl: "/what-we-do",
    imageUrl: "/images/MANAGED-TECHNOLOGY.webp",
  },
];

export function SolutionsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#000000] text-white border-b border-white/10 select-none" aria-label="Our Solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Circular Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 block mb-3">
              Our Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Solutions built around<br />your business.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollLeft}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Previous solutions"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Next solutions"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none focus:outline-none"
          tabIndex={0}
        >
          {SOLUTIONS.map((item) => (
            <div
              key={item.title}
              className="w-[320px] sm:w-[380px] bg-[#171717] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shrink-0 snap-start hover:border-white/30 transition-all group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-black border border-white/5">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="380px"
                  />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <Link
                  href={item.ctaUrl}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
