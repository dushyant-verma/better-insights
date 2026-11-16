"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, BookOpen, Layers } from "lucide-react";
import { BlobButton } from "@/components/ui/BlobButton";

export function ContactCTA() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target =
      document.getElementById("contact-form-section") ||
      document.getElementById("contact-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = target.querySelector<HTMLInputElement>(
        "input#name, input[name='name']"
      );
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 600);
      }
    }
  };

  return (
    <section
      className="py-20 sm:py-28 bg-[#0E0F10] border-t border-white/10 select-none relative overflow-hidden"
      aria-label="Contact Closing CTA"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-[#141518] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden border border-white/10 shadow-2xl">
          {/* Ambient Depth Accent */}
          <div
            className="absolute -top-32 right-1/4 w-[600px] h-[400px] bg-[#CBFC6B]/[0.08] blur-[140px] rounded-full pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="max-w-3xl relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CBFC6B] text-xs font-semibold uppercase tracking-[0.18em] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Build Together</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.04] mb-6 [font-family:'Host_Grotesk',sans-serif]">
              Your next big idea starts <br />
              <span className="text-neutral-400">with a conversation.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-light mb-8">
              Bring us your complex digital challenges. We combine creative thinking, modern engineering, and commercial clarity to build solutions that endure.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <BlobButton
                href="#contact-form-section"
                onClick={scrollToForm}
                size="lg"
                icon="arrow-down"
                ariaLabel="Let's Talk"
              >
                Let&apos;s Talk
              </BlobButton>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent text-white hover:text-[#CBFC6B] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 hover:border-[#CBFC6B]/40 transition-all"
              >
                <span>Explore Client Outcomes</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Links Strip */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <Link href="/insights" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <BookOpen className="w-3.5 h-3.5 text-[#CBFC6B]" />
                <span>Explore Strategic Insights &rarr;</span>
              </Link>

              <Link href="/our-clientele" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Layers className="w-3.5 h-3.5 text-[#CBFC6B]" />
                <span>Browse Clientele Directory &rarr;</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
