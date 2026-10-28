"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Clock, Briefcase, CheckCircle2, ArrowUpRight, Sparkles, Send } from "lucide-react";

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  category: "tech" | "growth" | "creative";
  location: string;
  type: string;
  overview: string;
  reqs: string[];
}

export const VERIFIED_POSITIONS: JobPosition[] = [
  {
    id: "job-web-dev",
    title: "Web Developer (WordPress & Full-Stack)",
    department: "Technology & Engineering",
    category: "tech",
    location: "Gurgaon, India / Hybrid",
    type: "Full-Time",
    overview:
      "Engineer high-performance custom themes, scalable API integrations, and modern interactive digital experiences with Next.js, PHP, and headless architectures.",
    reqs: [
      "Strong proficiency in modern PHP (8+), WordPress core architecture, and headless/custom theme development.",
      "Hands-on expertise with JavaScript (ES6+), React/Next.js, animations, REST APIs, and webhook automation.",
      "Deep knowledge of Core Web Vitals performance, semantic HTML5, and responsive CSS architecture.",
    ],
  },
  {
    id: "job-seo-analyst",
    title: "SEO Analyst & Search Strategist",
    department: "Search & Organic Growth",
    category: "growth",
    location: "Gurgaon, India / Hybrid",
    type: "Full-Time",
    overview:
      "Drive enterprise organic search visibility, technical crawl auditing, and data-driven content strategy across competitive B2B and consumer verticals.",
    reqs: [
      "Proven track record optimizing multi-thousand-page sites for international and national search rankings.",
      "Mastery of Google Search Console, Ahrefs, SEMrush, Screaming Frog, and schema markup.",
      "Experience translating search analytics into actionable product and content roadmaps.",
    ],
  },
  {
    id: "job-perf-marketing",
    title: "Performance Marketing Specialist",
    department: "Growth & Paid Media",
    category: "growth",
    location: "Gurgaon, India",
    type: "Full-Time",
    overview:
      "Architect, manage, and scale high-ROI paid media campaigns across Google Search, Performance Max, and Meta Ads ecosystems.",
    reqs: [
      "Demonstrated success managing large monthly ad budgets with rigorous cost-per-acquisition metrics.",
      "Proficiency with conversion tracking, Google Tag Manager, GA4 attribution models, and landing page CRO.",
      "Analytical mindset capable of continuous A/B creative and copy experimentation.",
    ],
  },
  {
    id: "job-content-lead",
    title: "Content & Editorial Strategist",
    department: "Editorial & Brand",
    category: "creative",
    location: "Gurgaon, India / Remote",
    type: "Full-Time",
    overview:
      "Produce authoritative, well-researched thought leadership articles, case studies, and editorial content that position Better Insights at the forefront of digital transformation.",
    reqs: [
      "Exceptional writing and storytelling ability covering AI, engineering, and digital growth topics.",
      "Experience interviewing technical subject-matter experts and distilling complex workflows into clear narratives.",
      "Familiarity with SEO copywriting and editorial calendar orchestration.",
    ],
  },
  {
    id: "job-video-editor",
    title: "Motion Designer & Video Producer",
    department: "Creative & Media",
    category: "creative",
    location: "Gurgaon, India",
    type: "Full-Time / Internship",
    overview:
      "Create compelling brand reels, motion design snippets, and case study video narratives for digital distribution across web and social channels.",
    reqs: [
      "Proficiency with Premiere Pro, After Effects, and audio mixing workflows.",
      "Strong visual aesthetic with keen sense of pacing, typography, and motion physics.",
      "Portfolio showcasing high-energy creative edits or brand identity storytelling.",
    ],
  },
];

interface CareersOpenPositionsProps {
  onSelectRole: (role: { id: string; title: string; department: string }) => void;
}

export function CareersOpenPositions({ onSelectRole }: CareersOpenPositionsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredRoles = useMemo(() => {
    if (activeFilter === "all") return VERIFIED_POSITIONS;
    return VERIFIED_POSITIONS.filter((j) => j.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="open-positions" className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Active opportunities
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Open positions
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#1B1411]/60 max-w-sm">
            Explore our verified vacancies below. Click on any position to view detailed requirements and apply directly.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              activeFilter === "all"
                ? "bg-[#1B1411] text-white shadow-xs"
                : "bg-white text-[#1B1411]/70 hover:text-[#1B1411] border border-black/10 shadow-2xs"
            }`}
          >
            All roles ({VERIFIED_POSITIONS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("tech")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              activeFilter === "tech"
                ? "bg-[#1B1411] text-white shadow-xs"
                : "bg-white text-[#1B1411]/70 hover:text-[#1B1411] border border-black/10 shadow-2xs"
            }`}
          >
            Technology &amp; Engineering
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("growth")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              activeFilter === "growth"
                ? "bg-[#1B1411] text-white shadow-xs"
                : "bg-white text-[#1B1411]/70 hover:text-[#1B1411] border border-black/10 shadow-2xs"
            }`}
          >
            Growth &amp; SEO
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("creative")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
              activeFilter === "creative"
                ? "bg-[#1B1411] text-white shadow-xs"
                : "bg-white text-[#1B1411]/70 hover:text-[#1B1411] border border-black/10 shadow-2xs"
            }`}
          >
            Editorial &amp; Creative
          </button>
        </div>

        {/* Positions List */}
        {filteredRoles.length > 0 ? (
          <div className="space-y-6">
            {filteredRoles.map((job) => (
              <div
                key={job.id}
                id={job.id}
                className="p-8 sm:p-10 bg-white rounded-[1.75rem] border border-black/10 flex flex-col lg:flex-row lg:items-start justify-between gap-8 shadow-2xs hover:shadow-lg hover:border-[#33CC7A]/40 transition-all"
              >
                <div className="max-w-3xl space-y-4">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 bg-[#1B1411] text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-[#FAF5F0] text-[#1B1411]/70 text-[11px] font-mono rounded-full flex items-center gap-1 border border-black/5">
                      <MapPin className="w-3.5 h-3.5 text-[#1B1411]/50" /> {job.location}
                    </span>
                    <span className="px-3 py-1 bg-[#FAF5F0] text-[#1B1411]/70 text-[11px] font-mono rounded-full flex items-center gap-1 border border-black/5">
                      <Clock className="w-3.5 h-3.5 text-[#1B1411]/50" /> {job.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                    {job.title}
                  </h3>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                    {job.overview}
                  </p>

                  {/* Qualifications */}
                  <div className="pt-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/50 mb-2.5">
                      Key Qualifications:
                    </h4>
                    <ul className="space-y-2">
                      {job.reqs.map((req) => (
                        <li key={req} className="flex items-start gap-2.5 text-xs text-[#1B1411]/80 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#33CC7A] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="shrink-0 pt-4 lg:pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectRole({
                        id: job.id,
                        title: job.title,
                        department: job.department,
                      })
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md"
                  >
                    <span>Apply now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-black/10 p-8 shadow-sm">
            <h3 className="text-lg font-bold uppercase tracking-tight text-black">
              There are no listed openings at the moment.
            </h3>
            <p className="text-xs text-black/60 mt-2 max-w-md mx-auto">
              We update our active roles regularly. In the meantime, you are welcome to submit a speculative application below.
            </p>
          </div>
        )}

        {/* Speculative / Open Application Banner */}
        <div className="mt-12 p-8 sm:p-12 bg-white rounded-3xl border border-black/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 block mb-1">
              Speculative Inquiries
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-black">
              Don&apos;t see your exact role?
            </h3>
            <p className="text-xs sm:text-sm text-black/70 mt-2 leading-relaxed font-normal">
              We are constantly interested in meeting high-caliber engineers, AI practitioners, growth analysts, and creative strategists. Send an open application directly to our leadership team.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onSelectRole({
                id: "general-application",
                title: "General / Open Application",
                department: "Leadership & Growth",
              })
            }
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/85 transition-all hover:scale-105 active:scale-95 shadow-md careers-focus-ring"
          >
            <Send className="w-4 h-4" />
            <span>Send Open Application</span>
          </button>
        </div>

      </div>
    </section>
  );
}
