"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { AboutHeroGallery } from "@/components/about/AboutHeroGallery";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import { TeamSlider } from "@/components/about/TeamSlider";
import { TEAM_MEMBERS } from "@/data/teamData";
import { StackingCapabilitiesCards } from "@/components/about/StackingCapabilitiesCards";
import { WhoWeAreRedesign } from "@/components/about/WhoWeAreRedesign";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import "@/styles/about.css";

const CAPABILITIES = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    desc: "High-performance digital experiences, custom headless architectures, and conversion-engineered web applications built for speed, SEO, and scale.",
    href: "/services/website-development",
    image: "/images/TECHNOLOGY-ENGINEERING.webp",
    badges: ["Next.js & Headless", "Enterprise Speed", "Conversion UX"],
  },
  {
    id: "crm-integrations",
    number: "02",
    title: "CRM & Integrations",
    desc: "Unifying commercial databases, HubSpot/Zoho pipelines, and bidirectional API synchronization to eliminate data silos and accelerate sales velocity.",
    href: "/services/crm-integrations",
    image: "/images/CRM-INTEGRATIONS.webp",
    badges: ["HubSpot & Zoho", "Bidirectional Sync", "Real-Time Telemetry"],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & Automation",
    desc: "Production-grade generative AI, intelligent autonomous agents, and automated operational pipelines designed to eliminate manual cognitive friction.",
    href: "/services/ai-automation",
    image: "/images/AI-AUTOMATION.webp",
    badges: ["Agentic Workflows", "Custom LLMs", "Process Automation"],
  },
  {
    id: "digital-growth",
    number: "04",
    title: "Digital Growth",
    desc: "Data-driven performance marketing, technical SEO architecture, and conversion rate optimization designed to systematically lower CPR and accelerate pipeline.",
    href: "/services/digital-growth",
    image: "/images/DIGITAL-GROWTH.webp",
    badges: ["Technical SEO", "Paid Media (CPR)", "Conversion Funnels"],
  },
  {
    id: "digital-transformation",
    number: "05",
    title: "Digital Transformation",
    desc: "Full-lifecycle modernization uniting legacy enterprise architectures, cloud infrastructure, and organizational change into scalable commercial advantages.",
    href: "/services/digital-transformation",
    image: "/images/DIGITAL-TRANSFORMATION.webp",
    badges: ["Cloud Infrastructure", "Enterprise Modernization", "Change Management"],
  },
];

const WORKING_STAGES = [
  {
    step: "01",
    phase: "Discovery & Diagnostics",
    title: "Commercial & Technical Audit",
    desc: "Deep-dive diagnostic into conversion telemetry, code architecture, competitive positioning, and customer friction points to define high-conviction roadmaps.",
    deliverable: "Diagnostic Blueprint & Priority Matrix",
  },
  {
    step: "02",
    phase: "Architecture & Strategy",
    title: "System Blueprinting",
    desc: "Formulating technical blueprints, brand messaging systems, conversion funnels, and data pipeline schemas before writing a single line of code.",
    deliverable: "Engineering Specs & Sprint Roadmap",
  },
  {
    step: "03",
    phase: "Execution & Build",
    title: "Agile Precision Engineering",
    desc: "Rapid sprint development utilizing modern frameworks, clean code standards, AI model integrations, and continuous deployment environments.",
    deliverable: "Production-Ready Releases & QA Signoff",
  },
  {
    step: "04",
    phase: "Telemetry & Scale",
    title: "Continuous ROI Optimization",
    desc: "Post-launch measurement, algorithmic experimentation, search dominance, and systematic iterative enhancements focused entirely on compounding ROI.",
    deliverable: "Attribution Dashboard & Growth Loops",
  },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  return (
    <div className="bg-[#FAF5F0] text-[#1B1411]">
      {/* ========================================================================= */}
      {/* SECTION 1: ANIMATED IMAGE GALLERY HERO (MadeByShape Editorial Style)     */}
      {/* ========================================================================= */}
      <AboutHeroGallery />

      {/* ========================================================================= */}
      {/* SECTION 2: WHO WE ARE (REDESIGNED EDITORIAL CULTURE EXPERIENCE)            */}
      {/* Target element id="423758" & Preceding Statement                          */}
      {/* ========================================================================= */}
      <WhoWeAreRedesign />

      {/* ========================================================================= */}
      {/* SECTION 3: CORE CAPABILITIES MATRIX (Interactive Stacking Cards Deck)     */}
      {/* ========================================================================= */}
      <StackingCapabilitiesCards capabilities={CAPABILITIES} />

      {/* ========================================================================= */}
      {/* SECTION 4: HOW WE WORK (METHODOLOGY)                                      */}
      {/* ========================================================================= */}
      <section
        id="methodology"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="How We Work"
      >
        <div className="bi-container">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
              Delivery Framework
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
              Four stages to predictable scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKING_STAGES.map((st) => (
              <div
                key={st.step}
                className="p-8 rounded-[1.75rem] bg-white border border-black/8 shadow-sm flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="text-3xl font-mono font-bold text-[#66574F] mb-4">
                    {st.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#33CC7A] block mb-2">
                    {st.phase}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-[#1B1411] mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#66574F] leading-relaxed font-normal mb-6">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#66574F] font-mono">
                    Deliverable
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411]">{st.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: EXECUTIVE LEADERSHIP & INTERACTIVE TEAM DIRECTORY               */}
      {/* ========================================================================= */}
      <TeamSlider
        members={TEAM_MEMBERS}
        onSelectMember={(member) => setSelectedMember(member)}
      />

      {/* ========================================================================= */}
      {/* SECTION 6: CLOSING CTA (Clean Floating Card Architecture)                */}
      {/* ========================================================================= */}
      <section
        className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
        aria-label="Call to Action"
      >
        <div className="bi-container relative z-10">
          <div className="bg-[#1B1411] text-[#FAF5F0] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl text-center">
            {/* Ambient Accent Glow */}
            <div
              className="absolute -bottom-40 right-1/4 w-[600px] h-[400px] bg-[#33CC7A]/[0.12] blur-[150px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#33CC7A] block mb-4">
              Start Your Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#FAF5F0] max-w-3xl mx-auto leading-tight">
              Ready to build what’s next?
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#B8ABA3] max-w-2xl mx-auto leading-relaxed font-normal">
              Let’s discuss your brand, technology, and growth goals. Our specialists review every enquiry
              and deliver a tailored roadmap within 24 hours.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openMarketingPlanModal()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider hover:bg-[#2BB86D] transition-all hover:scale-105 shadow-lg shadow-[#33CC7A]/20 cursor-pointer"
              >
                <span>Get Marketing Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5F0] text-xs font-bold uppercase tracking-wider transition-all border border-white/15 hover:scale-105"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-[#B8ABA3]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details Modal Dialog */}
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
