"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TechPartner {
  id: string;
  name: string;
}

const PARTNERS: TechPartner[] = [
  { id: "adobe", name: "Adobe" },
  { id: "google-cloud", name: "Google Cloud" },
  { id: "microsoft", name: "Microsoft" },
  { id: "hubspot", name: "HubSpot" },
  { id: "salesforce", name: "Salesforce" },
  { id: "shopify", name: "Shopify" },
  { id: "zoho", name: "Zoho" },
  { id: "openai", name: "OpenAI" },
];

export function TechnologyPartners() {
  return (
    <section className="py-24 sm:py-32 bg-[#000000] text-white border-b border-white/10 select-none" aria-label="Platforms & Technologies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 block mb-3">
              Platforms &amp; Technologies
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Platforms &amp; Technologies
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed font-normal">
              We leverage leading enterprise platforms and modern technologies to build smarter, scalable digital experiences.
            </p>
          </div>

          <div>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
            >
              <span>View All Platforms</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4x2 Grid of Tech Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {PARTNERS.map((p) => (
            <div
              key={p.id}
              className="p-8 sm:p-10 bg-[#171717] rounded-3xl border border-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center text-center group min-h-[140px]"
            >
              <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:scale-105 transition-transform">
                {p.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                Enterprise Integration
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
