import React from "react";
import { Compass, Lightbulb, Code2, Gauge } from "lucide-react";

const APPROACH_STAGES = [
  {
    step: "01",
    name: "Discover",
    headline: "Understand business, goals, and technical bottlenecks.",
    desc: "We begin with comprehensive technical auditing, stakeholder interviews, and data flow analysis. We map existing constraints and clarify business objectives before proposing solutions.",
    icon: Compass,
    deliverables: ["Current-state architecture audit", "Workflow friction analysis", "Target business KPIs"],
  },
  {
    step: "02",
    name: "Strategize",
    headline: "Identify priorities and engineer a clear roadmap.",
    desc: "We establish architectural specifications, UI wireframes, data schemas, and a prioritized sprint plan. We focus on delivering high-impact quick wins while building resilient foundations.",
    icon: Lightbulb,
    deliverables: ["Technical specification contract", "High-fidelity UX blueprints", "Phased implementation schedule"],
  },
  {
    step: "03",
    name: "Build",
    headline: "Deliver the agreed digital solution with precision.",
    desc: "Our engineering team develops scalable code, connects APIs, configures automated pipelines, and conducts rigorous cross-browser and security tests in active staging environments.",
    icon: Code2,
    deliverables: ["Modular type-safe codebase", "End-to-end API integrations", "Comprehensive automated QA"],
  },
  {
    step: "04",
    name: "Optimize",
    headline: "Evaluate performance and improve continuously.",
    desc: "Post-launch, we benchmark speed, monitor telemetry logs, run conversion split tests, and continuously refine features based on real-world customer usage patterns.",
    icon: Gauge,
    deliverables: ["90+ Core Web Vitals audit", "Conversion attribution telemetry", "Ongoing iterative enhancements"],
  },
];

export function ServicesApproach() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF5F0] border-b border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Execution framework
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Our approach: from ambition to execution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
            We follow a structured delivery methodology that eliminates guesswork, safeguards technical integrity,
            and ensures every digital solution drives measurable business progress.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {APPROACH_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-white rounded-[1.75rem] border border-black/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#1B1411] bg-[#FAF5F0] px-2.5 py-1 rounded-md border border-black/5">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5F0] flex items-center justify-center text-[#1B1411]/60">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#33CC7A] block mb-1">
                    Stage {stage.step}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-2 [font-family:'Host_Grotesk',sans-serif]">
                    {stage.name}
                  </h3>
                  <h4 className="text-xs font-medium text-[#1B1411]/80 leading-snug mb-3">
                    {stage.headline}
                  </h4>
                  <p className="text-xs text-[#1B1411]/65 font-normal leading-relaxed mb-6">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/40 block mb-2">
                    Key outputs:
                  </span>
                  <ul className="space-y-1.5">
                    {stage.deliverables.map((d) => (
                      <li key={d} className="text-xs text-[#1B1411]/75 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
