"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, Sparkles, BookOpen, Layers } from "lucide-react";

export function ContactCTA() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact-form-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
      aria-label="Contact Closing CTA"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#1B1411] text-[#FAF5F0] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Depth Accent */}
          <div
            className="absolute -top-32 right-1/4 w-[600px] h-[400px] bg-[#33CC7A]/[0.12] blur-[140px] rounded-full pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#33CC7A] text-xs font-bold uppercase tracking-[0.18em] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Build Together</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF5F0] leading-[1.05] mb-6">
              Your next big idea starts <br />
              <span className="text-[#B8ABA3]">with a conversation.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#B8ABA3] leading-relaxed max-w-2xl font-normal mb-8">
              Bring us your complex digital challenges. We combine creative thinking, modern engineering, and commercial clarity to build solutions that endure.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#contact-form-section"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#2BB86D] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#33CC7A]/20"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUp className="w-4 h-4" />
              </a>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent text-[#FAF5F0] hover:text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20 hover:border-white/50 transition-all"
              >
                <span>Explore Client Outcomes</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Links Strip */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#B8ABA3]">
              <Link href="/insights" className="inline-flex items-center gap-1.5 hover:text-[#FAF5F0] transition-colors">
                <BookOpen className="w-3.5 h-3.5 text-[#33CC7A]" />
                <span>Explore Strategic Insights &rarr;</span>
              </Link>

              <Link href="/our-clientele" className="inline-flex items-center gap-1.5 hover:text-[#FAF5F0] transition-colors">
                <Layers className="w-3.5 h-3.5 text-[#33CC7A]" />
                <span>Browse Clientele Directory &rarr;</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
