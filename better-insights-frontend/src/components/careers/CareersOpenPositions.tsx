"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  status: "open" | "filled";
  employmentType: "Full Time" | "Part Time";
}

export const SAMPLE_JOB_OPENINGS: JobOpening[] = [
  {
    id: "frontend-developer",
    title: "Front End Developer",
    department: "Technology & Engineering",
    status: "filled",
    employmentType: "Full Time",
  },
  {
    id: "wordpress-developer",
    title: "WordPress Developer",
    department: "Technology & Engineering",
    status: "filled",
    employmentType: "Full Time",
  },
  {
    id: "seo-specialist",
    title: "SEO Specialist",
    department: "Organic Search & Growth",
    status: "filled",
    employmentType: "Full Time",
  },
  {
    id: "content-strategist",
    title: "Content Strategist",
    department: "Editorial & Content Strategy",
    status: "filled",
    employmentType: "Full Time",
  },
  {
    id: "account-manager",
    title: "Account Manager",
    department: "Client Services & Growth",
    status: "open",
    employmentType: "Full Time",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    department: "Delivery & Operations",
    status: "open",
    employmentType: "Full Time",
  },
  {
    id: "marketing-intern",
    title: "Marketing Intern",
    department: "Growth Marketing",
    status: "filled",
    employmentType: "Part Time",
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    department: "Brand & Creative",
    status: "open",
    employmentType: "Part Time",
  },
  {
    id: "freelance-photographers",
    title: "Freelance Photographers",
    department: "Creative & Media",
    status: "open",
    employmentType: "Part Time",
  },
];

interface CareersOpenPositionsProps {
  positions?: JobOpening[];
  onSelectRole?: (role: { id: string; title: string; department: string }) => void;
}

export function CareersOpenPositions({
  positions = SAMPLE_JOB_OPENINGS,
  onSelectRole,
}: CareersOpenPositionsProps) {
  return (
    <section
      id="open-positions"
      className="py-20 sm:py-28 lg:py-32 bg-[#0E0F10] text-white relative select-none scroll-mt-24"
      aria-label="Open Positions & Careers"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* 1. Section Header (Center-Aligned)                                */}
        {/* ================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
              Open Positions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif]">
            Find your next job
          </h2>
        </div>

        {/* ================================================================= */}
        {/* 2. Job Listing Rows                                               */}
        {/* ================================================================= */}
        <div className="space-y-3 sm:space-y-3.5" role="list" aria-label="Available positions">
          {positions.map((job) => {
            const isOpen = job.status === "open";

            if (isOpen) {
              return (
                <div
                  key={job.id}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    onSelectRole?.({
                      id: job.id,
                      title: job.title,
                      department: job.department,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectRole?.({
                        id: job.id,
                        title: job.title,
                        department: job.department,
                      });
                    }
                  }}
                  className="w-full bg-[#191A1C] hover:bg-[#202226] border border-white/[0.04] hover:border-white/10 rounded-2xl py-4 sm:py-5 px-5 sm:px-8 cursor-pointer transition-all duration-300 group shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CBFC6B]/50"
                  aria-label={`${job.title} – ${job.employmentType} (Open position, click to apply)`}
                >
                  <div className="flex items-center justify-between gap-4 w-full">
                    {/* Left: Availability Badge */}
                    <div className="shrink-0 w-24 sm:w-28">
                      <span className="inline-flex items-center justify-center px-3.5 py-1 text-xs font-semibold rounded-full bg-[#CBFC6B] text-[#101112] [font-family:'Host_Grotesk',sans-serif]">
                        Open
                      </span>
                    </div>

                    {/* Center: Job Title */}
                    <div className="flex-1 min-w-0 px-2 sm:px-6">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-[19px] truncate tracking-tight text-white font-medium group-hover:text-[#CBFC6B] transition-colors duration-200 [font-family:'Host_Grotesk',sans-serif]">
                        {job.title}
                      </h3>
                    </div>

                    {/* Right: Employment Type & Circular Arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                      <span className="text-xs sm:text-sm text-white/70 font-normal [font-family:'Host_Grotesk',sans-serif]">
                        {job.employmentType}
                      </span>

                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#CBFC6B] group-hover:text-black group-hover:scale-105"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Filled / Unavailable Position (Muted, non-actionable)
            return (
              <div
                key={job.id}
                className="w-full bg-[#191A1C]/80 border border-transparent rounded-2xl py-4 sm:py-5 px-5 sm:px-8 cursor-default select-none opacity-50"
                aria-label={`${job.title} – ${job.employmentType} (Job Filled)`}
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  {/* Left: Availability Badge */}
                  <div className="shrink-0 w-24 sm:w-28">
                    <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-normal rounded-full bg-white/[0.06] text-white/40 border border-white/5 [font-family:'Host_Grotesk',sans-serif]">
                      Job Filled
                    </span>
                  </div>

                  {/* Center: Job Title */}
                  <div className="flex-1 min-w-0 px-2 sm:px-6">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-[19px] truncate tracking-tight text-white/30 font-normal [font-family:'Host_Grotesk',sans-serif]">
                      {job.title}
                    </h3>
                  </div>

                  {/* Right: Employment Type & Circular Arrow */}
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <span className="text-xs sm:text-sm text-white/20 font-normal [font-family:'Host_Grotesk',sans-serif]">
                      {job.employmentType}
                    </span>

                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-transparent text-white/15 flex items-center justify-center opacity-30"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 3. Bottom Promotional Card – Stay on the Boss's Radar            */}
        {/* ================================================================= */}
        <div className="mt-10 sm:mt-14 lg:mt-16 bg-[#191A1C] border border-white/[0.04] rounded-2xl sm:rounded-[24px] p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left Side: Eyebrow + Large Heading */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-xs sm:text-sm font-light text-white/80 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
                  Not for you?
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-white tracking-[-0.03em] leading-[1.14] [font-family:'Host_Grotesk',sans-serif]">
                Nothing open for you right now? Stay on the Boss&apos;s radar...
              </h3>
            </div>

            {/* Right Side: Team/Founder Info, CTA & Photograph */}
            <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-center shrink-0">
              {/* Text & Button */}
              <div className="flex flex-col items-start sm:items-end gap-3 text-left sm:text-right">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white [font-family:'Host_Grotesk',sans-serif] leading-tight">
                    Gautam Koli
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 font-normal [font-family:'Host_Grotesk',sans-serif] mt-0.5">
                    Founder &amp; Director
                  </p>
                </div>

                <a
                  href="https://www.linkedin.com/company/better-insights-bi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#CBFC6B] hover:bg-[#bbf055] text-[#101112] text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md group [font-family:'Host_Grotesk',sans-serif]"
                >
                  <span>Follow BI on</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.75a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                  </svg>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Founder Photograph */}
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-2xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 shadow-lg">
                <Image
                  src="/team/photos/gautam-koli-photo.jpg"
                  alt="Gautam Koli, Founder & Director at Better Insights"
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
