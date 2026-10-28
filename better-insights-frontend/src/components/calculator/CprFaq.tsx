import React from "react";
import { HelpCircle, CheckCircle2 } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is Cost Per Result (CPR)?",
    a: "Cost Per Result (CPR)—often referred to interchangeably with Cost Per Acquisition (CPA) or Cost Per Lead (CPL)—measures the average monetary expenditure required to achieve a verified conversion event, such as a consultation booking, qualified sales lead, application submission, or customer checkout.",
  },
  {
    q: "How is CPR mathematically calculated?",
    a: "CPR is calculated by dividing total advertising spend by the number of completed conversions: CPR = Total Spend ÷ Total Conversions. In search and performance marketing, spend is derived from Clicks × Cost Per Click (CPC), and conversions are derived from Clicks × Conversion Rate (CR%).",
  },
  {
    q: "What is the difference between CPC, CPA, and CPR?",
    a: "CPC (Cost Per Click) measures what you pay when an interested user clicks your advertisement. CPA (Cost Per Acquisition) and CPR (Cost Per Result) measure the cost after the click occurs—accounting for your landing page conversion rate to determine what each actual client or customer costs to acquire.",
  },
  {
    q: "How can I lower my CPR without reducing lead volume?",
    a: "The most effective lever to lower CPR is Conversion Rate Optimization (CRO). Increasing your landing page conversion rate from 3% to 6% cuts your effective CPR in half for the exact same ad spend. Secondarily, negative keyword sculpting and ad relevance optimization reduce wasted clicks.",
  },
];

export function CprFaq() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/10 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Methodology &amp; standards
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Understanding cost per result
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1B1411]/70 leading-relaxed font-normal">
            Essential principles, mathematical formulas, and optimization benchmarks for digital campaign efficiency.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[1.25rem] p-6 sm:p-8 border border-black/10 shadow-2xs"
            >
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#1B1411] mb-3 flex items-start gap-3 [font-family:'Host_Grotesk',sans-serif]">
                <span className="font-mono text-[#33CC7A] text-xs font-bold mt-1">0{idx + 1}.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#1B1411]/75 leading-relaxed font-normal pl-7">
                {item.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
