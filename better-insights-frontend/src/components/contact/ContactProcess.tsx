"use client";

import React from "react";
import { MessageSquareText, SearchCode, CalendarCheck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: MessageSquareText,
    title: "Tell Us About Your Goals",
    desc: "Share your core challenges, target timeline, and technology objectives through our secure form.",
  },
  {
    step: "02",
    icon: SearchCode,
    title: "We Review Your Request",
    desc: "Our consulting leads review your enquiry to understand your architecture needs and strategic scope.",
  },
  {
    step: "03",
    icon: CalendarCheck,
    title: "Discuss Next Steps",
    desc: "We coordinate a high-value introductory discussion to explore solution architecture and actionable next steps.",
  },
];

export function ContactProcess() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none" aria-label="What Happens Next">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
            Workflow &amp; Discovery
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
            What happens next?
          </h2>
          <p className="mt-4 text-base text-[#66574F] font-normal leading-relaxed">
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
                className="p-8 sm:p-10 bg-white rounded-[1.75rem] border border-black/8 flex flex-col justify-between shadow-sm hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-[#EEE5DC] text-[#1B1411] rounded-full">
                      Stage {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-[#1B1411] mb-3">
                    {s.title}
                  </h3>

                  <p className="text-sm text-[#66574F] leading-relaxed font-normal">
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
