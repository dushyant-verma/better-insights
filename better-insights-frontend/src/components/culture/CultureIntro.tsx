"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function CultureIntro() {
  return (
    <section
      id="culture-intro"
      className="py-24 sm:py-32 bg-[#F7F4F1] text-[#171717] select-none border-t border-black/8 relative overflow-hidden"
      aria-label="Culture Introduction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold uppercase tracking-[0.18em] text-[#171717]">
            <span className="w-2 h-2 rounded-full bg-[#34CC7B]" />
            Life at Better Insights
          </span>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
          {/* Left Column: Massive Headline */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#171717] [font-family:'Host_Grotesk',sans-serif]">
              A place where good ideas become great work.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#66574F] leading-relaxed font-normal">
              Better Insights was created to be the agency we always wanted to work with: nimble, transparent,
              deeply creative, and relentlessly focused on compounding commercial results.
            </p>
          </div>

          {/* Right Column: Editorial Details */}
          <div className="lg:col-span-6 space-y-6 text-[#171717]/85 text-sm sm:text-base leading-relaxed">
            <p>
              We don&apos;t believe in endless layers of middle management, vanity pitch decks, or corporate
              posturing. Instead, we assemble focused squads of seasoned strategists, engineers, and creatives who
              work in direct alignment with our partners.
            </p>
            <p>
              Every project is an opportunity to push past standard industry templates. Whether we are architecting
              a complex headless platform, implementing high-impact AI automations, or formulating acquisition
              engines, we nurture an environment where every voice has impact and experimentation is encouraged.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#34CC7B]" />
                <span>Zero agency drama or egos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#34CC7B]" />
                <span>Direct client-to-creator collaboration</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#34CC7B]" />
                <span>Obsession with measurable ROI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#34CC7B]" />
                <span>Continuous learning &amp; growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Editorial Photography Banner */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border border-black/8 bg-[#EDE8E3]">
          <div className="relative h-[320px] sm:h-[460px] w-full">
            <Image
              src="/images/culture/photo-1552664730-d307ca884978.jpg"
              alt="Strategic workshop and creative ideation session at Better Insights"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6 max-w-xl text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white mb-2">
                <Sparkles className="w-3 h-3 text-[#34CC7B]" />
                Daily Studio Life
              </span>
              <p className="text-sm sm:text-lg font-medium text-white/95 leading-snug">
                &ldquo;Great digital work doesn&apos;t happen by accident. It takes curious minds, genuine trust,
                and the relentless drive to do it better every day.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

