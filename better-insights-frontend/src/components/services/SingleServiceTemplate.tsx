"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ChevronRight,
  Code2,
  Cpu,
  Compass,
  BarChart3,
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  MessageSquareCode,
  Building2,
} from "lucide-react";
import { ServiceItem, getRelatedServices } from "@/lib/data/services";
import { ServicesWork } from "@/components/services/ServicesWork";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";

interface SingleServiceTemplateProps {
  service: ServiceItem;
}

const APPROACH_PILLARS = [
  {
    step: "01",
    icon: Compass,
    title: "Discovery & Strategic Audit",
    description:
      "We interrogate user telemetry, technical architecture, and commercial bottlenecks to build a roadmap grounded in measurable ROI.",
    tag: "Clarity & Intent",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Architectural Blueprinting",
    description:
      "Formulating engineering specs, UX journey maps, conversion funnels, and data schemas before writing production code.",
    tag: "Precision Specs",
  },
  {
    step: "03",
    icon: Code2,
    title: "Agile Sprint Engineering",
    description:
      "Rapid sprint execution with modern frameworks, rigorous QA verification, enterprise security, and continuous deployment pipelines.",
    tag: "Clean Code",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Attribution & Compound Growth",
    description:
      "Post-launch telemetry tracking, automated conversion loops, search dominance, and ongoing algorithmic optimizations.",
    tag: "Continuous ROI",
  },
];

export function SingleServiceTemplate({ service }: SingleServiceTemplateProps) {
  const relatedServices = getRelatedServices(service.slug);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article className="min-h-screen bg-white">
      {/* ===================================================================
          SECTION 1: SERVICE HERO (Two-Column Balanced Layout)
          =================================================================== */}
      <section className="relative min-h-[82vh] flex items-center justify-center bg-[linear-gradient(135deg,#080712_0%,#130D2B_35%,#1C123D_65%,#090714_100%)] text-white overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 select-none">
        {/* Background Media & Ambient Glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          {service.heroVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={service.heroPoster}
            >
              <source src={service.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={service.heroPoster}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080712]/75 via-[#130D2B]/85 to-[#080712]" />
        </div>

        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#6C3CFF]/20 via-[#8B5CF6]/14 to-[#3B82F6]/08 rounded-full blur-[130px] pointer-events-none" />

        {/* Organic Blobs in Bottom-Right Corner (Overlapping, soft-edged, cropped) */}
        <div
          className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.18)_0%,rgba(124,58,237,0.08)_45%,transparent_75%)] blur-[60px] sm:blur-[80px] pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 right-24 sm:-bottom-12 sm:right-40 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(99,102,241,0.12)_0%,rgba(139,92,246,0.05)_50%,transparent_75%)] blur-[45px] sm:blur-[65px] pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 right-6 sm:-bottom-20 sm:right-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.08)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)] blur-[45px] sm:blur-[65px] pointer-events-none z-10"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs font-medium text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3" />
              </li>
              <li className="text-white font-semibold" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Category, Headline, Narrative & Dual CTAs */}
            <div className="lg:col-span-7">
              {/* Category Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-white border border-white/15 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" />
                <span>
                  {service.eyebrow} &bull; {service.categoryTag}
                </span>
              </div>

              {/* Service Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08] mb-6 [font-family:'Host_Grotesk',sans-serif]">
                {service.heroHeadline}
              </h1>

              {/* Service Value Description */}
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed mb-8">
                {service.heroDescription}
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => openMarketingPlanModal()}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] font-semibold text-sm transition-all duration-300 shadow-xl shadow-black/30 group hover:scale-[1.03] cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href="#relevant-work"
                  onClick={(e) => handleScrollToSection(e, "relevant-work")}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/15 transition-all duration-300 hover:scale-[1.03]"
                >
                  <span>Explore Relevant Work</span>
                  <ArrowDown className="w-4 h-4 text-white/70" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/15 text-xs text-white/70 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A]" />
                  Verified Case Studies
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A]" />
                  Full Code &amp; Data Ownership
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A]" />
                  Direct Lead Partner Strategy
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Visual Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-3 sm:p-4 group">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden bg-black/40">
                  <Image
                    src={service.cardImage || service.heroPoster}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top-Right Active Status Pill */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white">
                      <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" />
                      Production Architecture
                    </span>
                  </div>

                  {/* Bottom Information Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#33CC7A] block mb-1">
                      {service.categoryTag}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug [font-family:'Host_Grotesk',sans-serif]">
                      {service.shortTitle} Solutions
                    </h3>
                  </div>
                </div>

                {/* Live Performance Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-left">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block font-medium">Standard</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">Sub-Second Load Times</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block font-medium">Attribution</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#33CC7A]">100% Measurable ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: CLIENT CHALLENGES (Problems We Solve)
          =================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Strategic Friction Diagnosed
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Challenges we eliminate.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
              We diagnose root friction across your architecture, data pipelines, and customer touchpoints to design permanent, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {service.challenges.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-10 flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                      {c.title}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block mb-1">
                        The Friction:
                      </span>
                      <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                        {c.problem}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600/80 block mb-1">
                        Business Impact:
                      </span>
                      <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                        {c.consequence}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 bg-[#33CC7A]/[0.08] -mx-8 -mb-10 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-[1.75rem] border-t border-[#33CC7A]/20">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411] block mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#33CC7A]" />
                    Our Engineered Solution:
                  </span>
                  <p className="text-xs sm:text-sm text-[#1B1411] font-medium leading-relaxed">
                    {c.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: OUR APPROACH (The Better Insights Methodology)
          =================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#FAF5F0] border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Engineering Discipline
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              How we approach {service.title.toLowerCase()}.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
              We eliminate guesswork with a structured four-stage execution framework engineered to deliver high velocity and predictable commercial impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {APPROACH_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="bg-[#FAF5F0] rounded-[1.75rem] border border-black/10 p-8 flex flex-col justify-between hover:border-[#33CC7A]/60 transition-all hover:shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-[#1B1411] bg-white px-2.5 py-1 rounded-md border border-black/10">
                        {pillar.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#1B1411] group-hover:text-[#33CC7A] transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#1B1411]/70 font-normal leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10">
                    <span className="text-[11px] font-semibold text-[#1B1411]/50 uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: CAPABILITIES AND DELIVERABLES
          =================================================================== */}
      <section
        id="capabilities"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Specialized Scope
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Services &amp; capabilities.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
              Every deliverable is engineered to enterprise standards with full documentation, scalable architecture, and seamless operational handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {service.capabilities.map((cap) => (
              <div
                key={cap.number}
                className="bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-10 flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#1B1411] bg-[#FAF5F0] px-2.5 py-1 rounded-md border border-black/5">
                      {cap.number}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 bg-[#FAF5F0] px-2.5 py-1 rounded-full border border-black/5">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B1411]/70 font-normal leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/40 block mb-2.5">
                    Included deliverables:
                  </span>
                  <ul className="space-y-2">
                    {cap.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-[#1B1411]/85 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: PROCESS AND DELIVERABLES (Delivery Roadmap)
          =================================================================== */}
      <section className="py-20 sm:py-28 bg-[linear-gradient(145deg,#0A0818_0%,#150D2E_45%,#0F0A24_80%,#080611_100%)] text-white border-b border-black/10 select-none relative overflow-hidden">
        {/* Subtle ambient violet depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#7C3AED]/18 via-[#6366F1]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-white border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Predictable Roadmap
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Our process: discover to optimize.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/75 font-normal leading-relaxed">
              We apply a proven 4-stage execution framework customized for {service.title}, ensuring transparent milestones, rigorous QA signoff, and zero disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="bg-white/5 backdrop-blur-md rounded-[1.75rem] border border-white/10 p-8 flex flex-col justify-between hover:border-[#33CC7A]/60 transition-all hover:bg-white/[0.08]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#33CC7A] bg-[#33CC7A]/15 px-2.5 py-1 rounded-md border border-[#33CC7A]/30">
                      {p.step}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                      {p.phase}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white mb-1 [font-family:'Host_Grotesk',sans-serif]">
                    {p.name}
                  </h3>
                  <h4 className="text-xs font-medium text-white/80 mb-3 leading-snug">
                    {p.headline}
                  </h4>
                  <p className="text-xs text-white/70 font-normal leading-relaxed mb-6">
                    {p.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 block mb-2">
                    Milestone artifacts:
                  </span>
                  <ul className="space-y-1.5">
                    {p.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-white/85 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6: RELEVANT WORK (Verified Case Studies)
          =================================================================== */}
      <div id="relevant-work" className="scroll-mt-20">
        <ServicesWork
          projectSlugs={service.projectSlugs}
          title={`Verified ${service.shortTitle} Case Studies.`}
          subtitle={`Explore documented client outcomes where our ${service.title.toLowerCase()} capabilities solved critical operational and growth challenges.`}
        />
      </div>

      {/* ===================================================================
          SECTION 7: BENEFITS AND BUSINESS OUTCOMES
          =================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Core Measurable Outcomes */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                  <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                  Measurable ROI
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight mb-6 [font-family:'Host_Grotesk',sans-serif]">
                Benefits &amp; business outcomes.
              </h2>
              <p className="text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed mb-8">
                {service.overview.description}
              </p>

              <div className="space-y-4">
                {service.overview.coreOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-black/10 flex items-start gap-4 shadow-2xs hover:border-[#33CC7A]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1B1411] mb-1">
                        Commercial Outcome {idx + 1}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1B1411]/75 font-normal leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Who Benefits Most Card */}
            <div className="lg:col-span-5 bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#FAF5F0] flex items-center justify-center text-[#33CC7A]">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1B1411]/70">
                  Target Audience &amp; Scenarios
                </h3>
              </div>

              <h4 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                Who benefits most from {service.title.toLowerCase()}
              </h4>

              <p className="text-xs text-[#1B1411]/60 mb-6 font-normal leading-relaxed">
                This capability is specifically engineered for high-growth and established organizations facing complex scale hurdles:
              </p>

              <ul className="space-y-3 mb-8">
                {service.overview.targetAudience.map((target, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FAF5F0] border border-black/5 text-xs text-[#1B1411]/85 font-medium flex items-start gap-3 shadow-2xs"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#33CC7A]/20 text-[#1B1411] font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{target}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-black/10 text-center">
                <button
                  type="button"
                  onClick={() => openMarketingPlanModal()}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Request Architectural Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 8: SERVICE-SPECIFIC FAQS (Accessible Accordion)
          =================================================================== */}
      <ServicesFaq
        faqs={service.faqs}
        title={`${service.title} FAQs.`}
        subtitle={`Everything you need to know about our approach, technical deliverables, and partnership for ${service.title.toLowerCase()}.`}
      />

      {/* ===================================================================
          SECTION 9: FINAL CONVERSION CTA
          =================================================================== */}
      <ServicesCTA
        headline={`Ready to scale with ${service.title.toLowerCase()}?`}
        supportingText={`Discuss your objectives directly with our strategy and engineering leads. We will audit your requirements and map out the ideal delivery roadmap for your team.`}
        ctaLabel="Get a Free Consultation"
        serviceName={service.contactServiceValue}
      />

      {/* ===================================================================
          SECTION 10: COMPLEMENTARY SERVICES
          =================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Complementary Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Related services.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
              Our offerings are engineered to reinforce one another. Explore capabilities commonly paired with {service.title}:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-[1.75rem] border border-black/10 overflow-hidden flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all hover:shadow-md group"
              >
                <div>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="block relative aspect-16/10 overflow-hidden bg-black/5"
                  >
                    <Image
                      src={rel.cardImage || rel.heroPoster}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/20">
                        {rel.eyebrow}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-2 group-hover:text-[#33CC7A] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                      <Link href={`/services/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B1411]/70 font-normal leading-relaxed mb-6 line-clamp-3">
                      {rel.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    href={`/services/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                  >
                    <span>Explore service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
