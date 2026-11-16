"use client";

import React from "react";
import { MessageSquareText, SearchCode, CalendarCheck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: MessageSquareText,
    title: "Tell Us About Your Goals",
    desc: "Share your core challenges, target timeline, and technology objectives through our direct form or discovery call.",
  },
  {
    step: "02",
    icon: SearchCode,
    title: "We Review Your Request",
    desc: "Our consulting leads review your enquiry to understand your architecture needs, tech stack, and strategic scope.",
  },
  {
    step: "03",
    icon: CalendarCheck,
    title: "Discuss Next Steps",
    desc: "We coordinate a high-value introductory discussion to explore solution architecture, commercial terms, and actionable milestones.",
  },
];

export function ContactProcess() {
  return (
    <section
      id="contact-process"
      className="py-20 sm:py-28 bg-[#0D0D0F] border-t border-white/10 select-none text-white scroll-mt-28"
      aria-label="Workflow and Discovery Process"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#CBFC6B]">
              Workflow &amp; Discovery
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
            What happens next?
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-light leading-relaxed">
            Here is what you can expect after you submit your project enquiry to Better Insights.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-8 sm:p-10 bg-[#141518] rounded-[1.75rem] border border-white/10 flex flex-col justify-between shadow-xl hover:border-white/20 hover:bg-[#18191D] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-white/10 text-[#CBFC6B] rounded-full border border-white/5">
                      Stage {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#CBFC6B]/15 text-[#CBFC6B] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-white mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {s.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
