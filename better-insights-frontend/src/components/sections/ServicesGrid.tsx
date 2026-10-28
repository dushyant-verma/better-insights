"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceGridItem {
  number: string;
  title: string;
  description: string;
  link: string;
}

const SERVICES: ServiceGridItem[] = [
  {
    number: "01",
    title: "AI & Automation",
    description: "Build intelligent workflows, AI agents and automation systems that reduce repetitive work and help your teams operate more efficiently.",
    link: "/ai-solutions",
  },
  {
    number: "02",
    title: "Digital Growth",
    description: "Create high-performing digital experiences, campaigns and growth systems designed to attract customers and accelerate business growth.",
    link: "/digital-growth",
  },
  {
    number: "03",
    title: "CRM & Integrations",
    description: "Connect your CRM, marketing, sales and business platforms into one streamlined ecosystem with powerful integrations and automation.",
    link: "/crm-integrations",
  },
  {
    number: "04",
    title: "Technology & Engineering",
    description: "Build scalable digital products, platforms and custom technology that solve complex business challenges.",
    link: "/technology-engineering",
  },
  {
    number: "05",
    title: "Digital Transformation",
    description: "Modernize processes, platforms and customer experiences through practical digital transformation strategies.",
    link: "/digital-transformation",
  },
  {
    number: "06",
    title: "Website Development",
    description: "Design and develop fast, accessible and conversion-focused digital experiences that represent your brand at its best.",
    link: "/website-development",
  },
  {
    number: "07",
    title: "CPR Calculator & Analytics",
    description: "Calculate customer acquisition cost, conversion rate, and performance marketing ROI with mathematical precision.",
    link: "/cpr-tool",
  },
  {
    number: "08",
    title: "Data & Insights",
    description: "Turn fragmented business data into useful insights, dashboards and intelligent decision-making systems.",
    link: "/insights",
  },
  {
    number: "09",
    title: "Managed Technology",
    description: "Keep your digital ecosystem optimized, secure and evolving with ongoing technical support, improvements and strategic guidance.",
    link: "/what-we-do",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 sm:py-32 bg-[#000000] text-white border-b border-white/10 select-none" aria-label="Our Services Showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 block mb-3">
            Services Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Capabilities designed to scale your enterprise.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-normal leading-relaxed">
            From modern web architecture and CRM workflows to custom AI deployment, we engineer digital solutions that deliver measurable ROI.
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((s) => (
            <Link
              key={s.number}
              href={s.link}
              className="p-8 bg-[#171717] rounded-3xl border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm font-bold text-white/40">{s.number}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3 group-hover:text-white/90">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-white/50 group-hover:text-white flex items-center gap-1 transition-colors">
                <span>Learn more</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
