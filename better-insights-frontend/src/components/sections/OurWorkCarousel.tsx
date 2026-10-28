"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: "01",
    category: "AI & AUTOMATION",
    title: "Intelligent Automation for Modern Business",
    description: "We design AI-powered workflows and automation systems that reduce manual effort, improve efficiency and help teams focus on higher-value work.",
    link: "/ai-solutions",
    image: "/images/Intelligent-Automation-for-Modern-Business.webp",
  },
  {
    id: "02",
    category: "DIGITAL GROWTH",
    title: "Digital Experiences Built to Perform",
    description: "We combine strategy, UX, development and performance to create digital experiences that attract audiences and turn engagement into measurable growth.",
    link: "/digital-growth",
    image: "/images/Digital-Experiences-Built-to-Perform.webp",
  },
  {
    id: "03",
    category: "TECHNOLOGY & ENGINEERING",
    title: "Technology That Moves Business Forward",
    description: "From websites and applications to APIs and custom platforms, we build scalable technology designed around real business requirements.",
    link: "/technology-engineering",
    image: "/images/Technology-That-Moves-Business-Forward.webp",
  },
  {
    id: "04",
    category: "DIGITAL TRANSFORMATION",
    title: "Connecting Technology, People and Process",
    description: "We help businesses modernize their digital ecosystem by connecting systems, workflows, data and experiences into a stronger technology foundation.",
    link: "/digital-transformation",
    image: "/images/Connecting-Technology-People-and-Process.webp",
  },
];

export function OurWorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % WORK_ITEMS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + WORK_ITEMS.length) % WORK_ITEMS.length);

  const current = WORK_ITEMS[activeIndex];

  return (
    <section className="py-24 sm:py-32 bg-white text-black border-b border-black/10 select-none" aria-label="Our Work Showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
              Extraordinary digital experiences.<br />Measurable business results.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-colors mr-2"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={prev}
              className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-black transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-black transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Split Showcase Card */}
        <div className="bg-[#F3F2EF] rounded-3xl border border-black/10 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left 50% Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black/5">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right 50% Content */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/50 px-3 py-1 bg-white rounded-full border border-black/10">
                {current.category}
              </span>
              <span className="font-mono text-xs font-bold text-black/40">
                0{activeIndex + 1} / 0{WORK_ITEMS.length}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black leading-snug">
              {current.title}
            </h3>

            <p className="text-sm text-black/70 font-normal leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4">
              <Link
                href={current.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all hover:scale-105"
              >
                <span>Explore Capability</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
