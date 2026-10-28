"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2 } from "lucide-react";
import { 
  CLIENTELE_RECORDS, 
  CLIENT_INDUSTRIES, 
  ClientRecord, 
  ClientIndustryFilter 
} from "@/lib/data/clientele";

export function ClienteleDirectory() {
  const [selectedFilter, setSelectedFilter] = useState<ClientIndustryFilter>("All Sectors");

  const filteredClients = useMemo(() => {
    if (selectedFilter === "All Sectors") {
      return CLIENTELE_RECORDS;
    }
    const filterMap: Record<string, "Healthcare" | "Education" | "E-Commerce" | "Enterprise"> = {
      "Healthcare & Medical": "Healthcare",
      "Education & EdTech": "Education",
      "E-Commerce & Retail": "E-Commerce",
      "Enterprise & B2B": "Enterprise",
    };
    const target = filterMap[selectedFilter];
    return CLIENTELE_RECORDS.filter((c) => c.industry === target);
  }, [selectedFilter]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "All Sectors": CLIENTELE_RECORDS.length,
      "Healthcare & Medical": CLIENTELE_RECORDS.filter((c) => c.industry === "Healthcare").length,
      "Education & EdTech": CLIENTELE_RECORDS.filter((c) => c.industry === "Education").length,
      "E-Commerce & Retail": CLIENTELE_RECORDS.filter((c) => c.industry === "E-Commerce").length,
      "Enterprise & B2B": CLIENTELE_RECORDS.filter((c) => c.industry === "Enterprise").length,
    };
    return counts;
  }, []);

  return (
    <section id="clientele-directory" className="py-20 sm:py-28 bg-[#FAF5F0] select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Directory &amp; ecosystem
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Organizations we partner with
            </h2>
          </div>

          <div className="text-xs font-semibold text-[#1B1411]/70 bg-white px-4 py-2 rounded-full border border-black/10 self-start md:self-auto shadow-2xs">
            Displaying {filteredClients.length} verified partners
          </div>
        </div>

        {/* Industry Filter Tabs */}
        <div 
          className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none"
          role="tablist"
          aria-label="Filter clients by industry sector"
        >
          {CLIENT_INDUSTRIES.map((industry) => {
            const isActive = selectedFilter === industry;
            const count = filterCounts[industry] || 0;

            return (
              <button
                key={industry}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(industry)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#1B1411] text-white border-[#1B1411] shadow-xs"
                    : "bg-white text-[#1B1411]/70 border-black/10 hover:border-black/30 hover:text-[#1B1411] shadow-2xs"
                }`}
              >
                <span>{industry}</span>
                <span className={`ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#FAF5F0] text-[#1B1411]/70"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredClients.map((client) => {
            return (
              <div
                key={client.name}
                className="bg-white rounded-[1.5rem] border border-black/10 p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:border-[#33CC7A]/40 transition-all group"
              >
                <div>
                  {/* Logo Container */}
                  <div className="h-20 w-full relative mb-5 flex items-center justify-center p-2 rounded-xl bg-[#FAF5F0]">
                    <div className="relative w-full h-12 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      <Image
                        src={client.logo}
                        alt={`${client.name} Logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 240px"
                      />
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1B1411]/50">
                      {client.industry}
                    </span>
                    {client.caseStudySlug && (
                      <span className="px-2 py-0.5 rounded-full bg-[#33CC7A]/15 text-[#1B1411] text-[9px] font-bold uppercase tracking-wider">
                        Case study
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold tracking-tight text-[#1B1411] group-hover:text-[#33CC7A] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                    {client.name}
                  </h3>

                  {client.description && (
                    <p className="mt-2 text-xs text-[#1B1411]/65 leading-relaxed font-normal line-clamp-2">
                      {client.description}
                    </p>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="mt-5 pt-3 border-t border-black/5">
                  {client.caseStudySlug ? (
                    <Link
                      href={`/work/${client.caseStudySlug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                    >
                      <span>Read case study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-[11px] font-medium text-[#1B1411]/40 uppercase tracking-wider">
                      Collaborative partner
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
