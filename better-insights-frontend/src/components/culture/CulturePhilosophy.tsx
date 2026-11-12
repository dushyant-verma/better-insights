"use client";

import React from "react";
import Image from "next/image";
import { Quote, Sparkles, Compass, Lightbulb, ShieldCheck, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Compass,
    title: "Creative Autonomy & Trust",
    desc: "We hire self-driven problem solvers and give them the trust and space to take ownership. No micro-management, no unnecessary red tape.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning & Curiosity",
    desc: "Technology moves fast. We embrace experimentation with emerging AI, automation, and modern tech stacks, treating learning as an active daily discipline.",
  },
  {
    icon: Zap,
    title: "Do It Better and Better",
    desc: "Our internal motto: every sprint, every line of code, and every client deliverable should push our benchmark forward. Good enough is never the goal.",
  },
  {
    icon: ShieldCheck,
    title: "Direct Access & Radical Honesty",
    desc: "Clients talk directly with the designers and developers building their product. Open communication, direct feedback, and authentic relationships.",
  },
];

export function CulturePhilosophy() {
  return (
    <section
      id="culture-philosophy"
      className="py-24 sm:py-32 bg-[#F7F4F1] text-[#171717] select-none border-t border-black/8 relative overflow-hidden"
      aria-label="Our Philosophy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Title */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
            Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light lg:font-normal tracking-[-0.03em] text-[#171717] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            How we think, work, and grow together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#66574F] font-normal leading-relaxed">
            Culture isn&apos;t free snacks or a pool table. It&apos;s the shared standards we uphold, the way we
            treat one another under pressure, and how we empower each team member to create meaningful work.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-[2rem] bg-white border border-black/8 hover:border-[#CBFC6B]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F4F1] border border-black/5 flex items-center justify-center text-[#CBFC6B] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#171717] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#66574F] leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leadership Perspective Box */}
        <div className="rounded-[2.25rem] bg-[#0D0D10] text-white p-8 sm:p-12 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 right-0 w-[450px] h-[350px] bg-[radial-gradient(circle,rgba(203,252,107,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Founder Portrait */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[#CBFC6B]/30 shadow-2xl bg-[#1C1C24]">
                <Image
                  src="/team/photos/gautam-koli-photo.jpg"
                  alt="Gautam Koli, Founder & Director of Better Insights"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>

            {/* Founder Quote & Commentary */}
            <div className="lg:col-span-8 space-y-4">
              <Quote className="w-10 h-10 text-[#CBFC6B] opacity-80" />
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-snug [font-family:'Host_Grotesk',sans-serif]">
                &ldquo;My team is our greatest asset. By fostering an environment of trust, curiosity, and authentic
                collaboration, we achieve greater insights and make rapid, compounding progress together.&rdquo;
              </blockquote>
              <div className="pt-2">
                <span className="font-semibold text-white block text-base">Gautam Koli</span>
                <span className="text-xs text-[#CBFC6B] block font-mono">Founder &amp; Director · Better Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

