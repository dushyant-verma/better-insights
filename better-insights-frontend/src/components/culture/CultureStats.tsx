"use client";

import React from "react";
import { Award, Briefcase, Smile, Layers } from "lucide-react";

const STATS = [
  {
    number: "5+",
    label: "Years of Experience",
    desc: "Dedicated to transforming ideas into scalable, high-performance digital products.",
    icon: Award,
  },
  {
    number: "50+",
    label: "Projects Delivered",
    desc: "From enterprise headless websites to automated CRM pipelines and AI workflows.",
    icon: Briefcase,
  },
  {
    number: "30+",
    label: "Happy Clients",
    desc: "Long-term partners who rely on our team for strategic insight and execution.",
    icon: Smile,
  },
  {
    number: "10+",
    label: "Digital Solutions",
    desc: "Integrated capabilities combining engineering, design, search, and marketing.",
    icon: Layers,
  },
];

export function CultureStats() {
  return (
    <section
      className="py-20 sm:py-28 bg-[#0D0D10] text-white select-none border-t border-white/10 relative overflow-hidden"
      aria-label="Culture by the Numbers"
    >
      {/* Background Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(203, 252, 107,0.1)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#CBFC6B] block mb-3">
            Impact &amp; Growth
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold sm:font-bold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Culture by the numbers.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A5A5A5] font-normal leading-relaxed">
            Our culture isn&apos;t measured in buzzwords. It shows up in the velocity of our releases, the longevity
            of our client partnerships, and the collective momentum of our team.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group p-8 rounded-[1.75rem] bg-[#15151A] border border-white/10 hover:border-[#CBFC6B]/40 hover:bg-[#191920] transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight [font-family:'Host_Grotesk',sans-serif] group-hover:text-[#CBFC6B] transition-colors">
                      {stat.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CBFC6B] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed font-normal">
                    {stat.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/50">
                    Verified BI Record
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

