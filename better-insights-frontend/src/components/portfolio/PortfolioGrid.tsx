"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Filter, Layers, CheckCircle2 } from "lucide-react";
import { 
  PORTFOLIO_PROJECTS, 
  PORTFOLIO_CATEGORIES, 
  PortfolioProject, 
  PortfolioCategory 
} from "@/lib/data/portfolio";

export function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("All Work");

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All Work") {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Compute category count dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "All Work": PORTFOLIO_PROJECTS.length,
    };
    PORTFOLIO_CATEGORIES.forEach((cat) => {
      if (cat !== "All Work") {
        counts[cat] = PORTFOLIO_PROJECTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <section id="portfolio-grid" className="py-20 sm:py-28 bg-[#FAF5F0] select-none scroll-mt-20 relative overflow-hidden">
      {/* Ambient Depth Accents */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#33CC7A]/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#33CC7A]/[0.04] to-transparent blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Portfolio &amp; solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Featured case studies
            </h2>
          </div>

          <div className="text-xs font-semibold text-[#1B1411]/70 bg-white px-4 py-2 rounded-full border border-black/10 self-start md:self-auto shadow-2xs">
            Showing {filteredProjects.length} of {PORTFOLIO_PROJECTS.length} projects
          </div>
        </div>

        {/* Filter Bar */}
        <div 
          className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none"
          role="tablist"
          aria-label="Filter case studies by discipline"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;

            // Only show categories that have at least 1 project
            if (count === 0 && category !== "All Work") return null;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#1B1411] text-white border-[#1B1411] shadow-xs"
                    : "bg-white text-[#1B1411]/70 border-black/10 hover:border-black/30 hover:text-[#1B1411]"
                }`}
              >
                <span>{category}</span>
                <span className={`ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#FAF5F0] text-[#1B1411]/70"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const primaryMetric = project.metrics[0];

            return (
              <article
                key={project.slug}
                className="bg-white rounded-[1.75rem] border border-black/10 overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#33CC7A]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Project Image & Badges */}
                  <div className="relative aspect-16/10 w-full bg-black/5 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-sm">
                        {project.category}
                      </span>

                      {project.clientLogo && (
                        <div className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-sm flex items-center gap-1.5 border border-black/5">
                          <span className="text-[10px] font-semibold text-[#1B1411] uppercase tracking-wider">
                            {project.clientName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Metric Chip */}
                    {primaryMetric && (
                      <div className="absolute bottom-4 left-4">
                        <div className="px-3.5 py-1.5 bg-[#1B1411]/90 backdrop-blur-md text-white rounded-xl shadow-md border border-white/10 flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#33CC7A]">
                            {primaryMetric.value}
                          </span>
                          <span className="text-[10px] text-white/70 font-medium">
                            {primaryMetric.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 sm:p-8">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[#1B1411]/50 mb-2">
                      {project.clientName}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1B1411] leading-snug group-hover:text-[#33CC7A] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                      {project.cardOverview}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-[#FAF5F0] text-[#1B1411]/75 border border-black/5 rounded-full text-[10px] font-medium uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    href={`/work/${project.slug}`}
                    className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                  >
                    <span>View case study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
