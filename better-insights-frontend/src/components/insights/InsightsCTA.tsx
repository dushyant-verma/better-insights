"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { BlobButton } from "@/components/ui/BlobButton";

export function InsightsCTA() {
  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
      aria-label="Insights Closing Call to Action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#1B1411] text-[#FAF5F0] border border-black/15 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Depth Glow */}
          <div
            className="absolute -top-32 right-1/4 w-[600px] h-[400px] bg-[#CBFC6B]/[0.12] blur-[140px] rounded-full pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#CBFC6B] text-xs font-bold uppercase tracking-[0.18em] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Continuous Discovery</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold tracking-[-0.035em] text-[#FAF5F0] leading-[1.04] mb-6 [font-family:'Host_Grotesk',sans-serif]">
              Stay curious. <br />
              <span className="text-[#B8ABA3]">Keep growing.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#B8ABA3] leading-relaxed max-w-2xl font-normal mb-8">
              Whether you are evaluating intelligent AI workflows, modernizing legacy infrastructure, or scaling your digital acquisition channels, our consultants are here to help turn ambitious ideas into lasting market impact.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <BlobButton
                href="/contact"
                size="lg"
                icon="arrow-up-right"
              >
                Start a Conversation
              </BlobButton>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent text-[#FAF5F0] hover:text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20 hover:border-white/50 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#CBFC6B]" />
                <span>Explore Client Outcomes</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
