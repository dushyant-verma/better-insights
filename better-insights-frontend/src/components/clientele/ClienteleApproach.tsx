import React from "react";
import { Search, Compass, Cpu, TrendingUp } from "lucide-react";

const PARTNERSHIP_STEPS = [
  {
    step: "01",
    title: "Discovery & Goal Alignment",
    desc: "We start by listening. We seek to understand your core business challenges, competitive landscape, team workflows, and concrete outcome milestones before recommending technology.",
    icon: Search,
  },
  {
    step: "02",
    title: "Strategy & Architecture",
    desc: "We align creative direction with sound technical architecture. We establish an actionable roadmap designed to maximize return on investment while mitigating delivery risks.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Practical Implementation",
    desc: "We build resilient, scalable digital systems. Whether developing modern web platforms, deploying AI workflows, or integrating CRMs, we prioritize performance, usability, and speed.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Continuous Feedback & Scale",
    desc: "Launch is only the starting point. We evaluate live telemetry, listen to stakeholder feedback, and proactively optimize systems to adapt as your business expands.",
    icon: TrendingUp,
  },
];

export function ClienteleApproach() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Collaboration model
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Our approach to client partnerships
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1B1411]/70 leading-relaxed font-normal">
            We work as an extension of your internal leadership, combining strategic clarity, technical rigor, and honest collaboration at every phase.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PARTNERSHIP_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-[1.75rem] p-8 border border-black/10 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#33CC7A]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-[#1B1411]/30">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF5F0] flex items-center justify-center text-[#1B1411]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 text-[10px] font-semibold uppercase tracking-wider text-[#33CC7A]">
                  Shared ownership
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
