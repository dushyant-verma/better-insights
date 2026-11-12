"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";

export function CultureJoinCTA() {
  return (
    <section
      className="py-24 sm:py-32 bg-[#F7F4F1] text-[#171717] select-none border-t border-black/8 relative overflow-hidden"
      aria-label="Join Our Team"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-[#0D0D10] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl text-center border border-white/10">
          {/* Ambient Accent Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(52,204,123,0.15)_0%,transparent_70%)] blur-[130px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/5 text-[#34CC7B] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                Join Our Collective
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light lg:font-normal tracking-[-0.035em] text-white leading-[1.05] mb-6 [font-family:'Host_Grotesk',sans-serif]">
              Great people make <span className="text-[#34CC7B]">better things happen.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#A5A5A5] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
              Interested in building something meaningful with us? We are always interested in connecting
              with creative minds, thoughtful engineers, and ambitious growth strategists.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#34CC7B] hover:bg-[#2BB86D] text-[#171717] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#34CC7B]/20 hover:scale-105"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <span>Explore Careers</span>
                <ArrowUpRight className="w-4 h-4 text-[#A5A5A5]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

