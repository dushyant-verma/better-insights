"use client";

import React from "react";
import { TrendingUp, Sparkles, Cpu, Users, Compass, Rocket } from "lucide-react";
import { CAREERS_BENEFITS } from "@/components/careers/CareersBenefits";

export function SingleCareerBenefits() {
  return (
    <section id="benefits" className="scroll-mt-32 pt-16 sm:pt-20 border-t border-white/10">
      <div className="flex items-center gap-2 mb-4 text-[#CBFC6B] font-mono text-xs tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
        <span>05 / Perks & Culture</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white mb-4 [font-family:'Host_Grotesk',sans-serif]">
        Benefits of working at Better Insights
      </h2>

      <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mb-10 font-light">
        We invest in our people so they can do the best work of their lives. Here are the genuine benefits and culture perks you will enjoy at Better Insights:
      </p>

      {/* 2-Column Responsive Grid on detail page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {CAREERS_BENEFITS.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              className="p-6 rounded-2xl bg-[#141518] border border-white/[0.08] hover:border-[#CBFC6B]/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] text-[#CBFC6B] flex items-center justify-center mb-4 group-hover:bg-[#CBFC6B] group-hover:text-black transition-all duration-300">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white mb-2 [font-family:'Host_Grotesk',sans-serif]">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                {b.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
