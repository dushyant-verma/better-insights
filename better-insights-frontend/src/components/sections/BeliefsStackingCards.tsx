"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BeliefCard {
  number: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
}

const BELIEF_CARDS: BeliefCard[] = [
  {
    number: "01",
    title: "INTELLIGENT BY DESIGN",
    description: "We build intelligent digital experiences that combine AI, automation and technology around real business needs — not technology for technology's sake.",
    ctaText: "Explore AI Solutions",
    ctaUrl: "/ai-solutions",
    imageUrl: "/images/INTELLIGENT-BY-DESIGN.webp",
  },
  {
    number: "02",
    title: "BUILT FOR BUSINESS IMPACT",
    description: "We connect strategy, technology and execution to create solutions that improve efficiency, customer experience and measurable business outcomes.",
    ctaText: "Explore Digital Transformation",
    ctaUrl: "/digital-transformation",
    imageUrl: "/images/BUILT-FOR-BUSINESS-IMPACT.webp",
  },
  {
    number: "03",
    title: "CONNECTED & AUTOMATED",
    description: "We connect systems, data, people and workflows so businesses can reduce manual work, improve visibility and operate with greater speed.",
    ctaText: "Explore Automation",
    ctaUrl: "/ai-solutions",
    imageUrl: "/images/CONNECTED-AUTOMATED.webp",
  },
  {
    number: "04",
    title: "BETTER TOGETHER",
    description: "We work alongside our clients as technology partners — combining creativity, engineering and business thinking to build what comes next.",
    ctaText: "Work With Better Insights",
    ctaUrl: "/contact",
    imageUrl: "/images/BETTER-TOGETHER.webp",
  },
];

export function BeliefsStackingCards() {
  return (
    <section className="py-24 sm:py-32 bg-[#F3F2EF] border-b border-black/10 select-none" aria-label="Our Beliefs and Approach">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
              We Believe
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-none">
              Better Marketing,<br />Better ROI.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-black/70 leading-relaxed font-normal">
              We combine technology, AI, automation and digital strategy to help businesses move faster, operate smarter and create measurable impact.
            </p>
          </div>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative space-y-8 sm:space-y-12">
          {BELIEF_CARDS.map((card, idx) => {
            const topOffset = 100 + idx * 48;
            return (
              <article
                key={card.number}
                className="sticky bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden transition-all duration-300"
                style={{
                  top: `${topOffset}px`,
                  zIndex: (idx + 1) * 10,
                }}
              >
                {/* Header Strip */}
                <div className="px-6 sm:px-10 py-5 sm:py-6 border-b border-black/10 flex items-center justify-between bg-black/[0.02]">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm sm:text-base font-bold text-black/40">
                      {card.number}
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold uppercase tracking-tight text-black">
                      {card.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-black/40 hidden sm:inline-block">
                    Principle {card.number}
                  </span>
                </div>

                {/* Card Body Grid */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <p className="text-base sm:text-lg text-black/80 font-normal leading-relaxed">
                      {card.description}
                    </p>
                    <div>
                      <Link
                        href={card.ctaUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all hover:scale-105 shadow-md"
                      >
                        <span>{card.ctaText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F3F2EF] border border-black/10 shadow-inner">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
