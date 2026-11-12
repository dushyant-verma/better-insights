"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const CAPABILITY_CHIPS = [
  {
    icon: Code2,
    title: "High-Performance Web",
    detail: "Next.js & Headless Architecture",
  },
  {
    icon: Sparkles,
    title: "Intelligent AI Automation",
    detail: "Autonomous Agents & Workflows",
  },
  {
    icon: Layers,
    title: "Connected CRM Systems",
    detail: "Unified Data & API Integrations",
  },
  {
    icon: TrendingUp,
    title: "Measurable Digital Growth",
    detail: "Technical Strategy & Scale",
  },
];

export function ContactHero() {
  const handleStartProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target =
      document.getElementById("contact-form-section") ||
      document.getElementById("enquiry-form");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Focus first form field for accessibility after smooth scroll
      const firstInput = target.querySelector<HTMLInputElement>(
        "input#name, input[name='name']"
      );
      if (firstInput) {
        setTimeout(() => {
          firstInput.focus({ preventScroll: true });
        }, 600);
      }
    }
  };

  return (
    <section
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24 bg-[#FAF5F0] text-[#1B1411] overflow-hidden select-none border-b border-black/8"
      aria-label="Contact Better Insights Hero Banner"
    >
      {/* 1. Subtle Architectural Blueprint Grid */}
      <div className="contact-hero-grid" aria-hidden="true" />

      {/* 2. Soft Ambient Lighting Accents */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[radial-gradient(circle,rgba(51,204,122,0.08)_0%,rgba(238,229,220,0.4)_45%,transparent_75%)] blur-[100px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(51,204,122,0.05)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EEE5DC]/90 border border-black/6 text-[#1B1411] shadow-xs mb-6 sm:mb-8 animate-contact-fade-in-up">
          <span
            className="w-2 h-2 rounded-full bg-[#33CC7A] contact-pulse-dot"
            aria-hidden="true"
          />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1B1411]">
            GET IN TOUCH · LET&apos;S BUILD SOMETHING BETTER
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1B1411] leading-[1.08] sm:leading-[1.04] mb-6 animate-contact-fade-in-up contact-delay-1">
          Have an ambitious idea? <br />
          <span className="text-[#66574F]">Let&apos;s make it happen.</span>
        </h1>

        {/* Supporting Description */}
        <p className="text-base sm:text-lg lg:text-xl text-[#66574F] max-w-2xl sm:max-w-3xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10 animate-contact-fade-in-up contact-delay-2">
          From high-performance websites and intelligent AI automation to
          connected CRM ecosystems, we help ambitious businesses turn complex
          challenges into measurable digital growth.
        </p>

        {/* Hero CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-16 animate-contact-fade-in-up contact-delay-3">
          {/* Primary CTA: Smooth scroll to enquiry form */}
          <a
            href="#contact-form-section"
            onClick={handleStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#33CC7A] hover:bg-[#2BB86D] text-[#1B1411] text-sm sm:text-[15px] font-semibold rounded-full shadow-[0_8px_24px_rgba(51,204,122,0.32)] hover:shadow-[0_12px_28px_rgba(51,204,122,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
            aria-label="Start a project - Scroll down to enquiry form"
          >
            <span>Start a Project</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          {/* Secondary CTA: Explore Our Services */}
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-[#FAF5F0] text-[#1B1411] border border-black/12 hover:border-black/25 text-sm sm:text-[15px] font-semibold rounded-full shadow-xs hover:shadow-sm transition-all group"
            aria-label="Explore our services"
          >
            <span>Explore Our Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#66574F] group-hover:text-[#1B1411]" />
          </Link>
        </div>

        {/* 3. Agency Capability Pills (Representing Web, AI, CRM, Growth) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10 sm:mb-12 animate-contact-fade-in-up contact-delay-4">
          {CAPABILITY_CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <div
                key={chip.title}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-black/6 shadow-[0_4px_16px_-4px_rgba(27,20,17,0.04)] text-left hover:border-black/15 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#33CC7A]/15 text-[#1B1411] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#1B1411]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1B1411] leading-tight line-clamp-1">
                    {chip.title}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#66574F] font-mono leading-snug pl-9 line-clamp-1">
                  {chip.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. Verified Trust & Response Micro-Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#66574F] font-mono animate-contact-fade-in-up contact-delay-5">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#33CC7A]" />
            <span>24h Response SLA</span>
          </span>
          <span className="hidden sm:inline text-black/20">•</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#33CC7A]" />
            <span>Strict Mutual NDA</span>
          </span>
          <span className="hidden sm:inline text-black/20">•</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A]" />
            <span>Direct Engineering Lead Access</span>
          </span>
        </div>
      </div>
    </section>
  );
}
