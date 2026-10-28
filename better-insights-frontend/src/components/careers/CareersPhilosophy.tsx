import React from "react";
import { Sparkles, Target, BookOpen, Users, Compass, Cpu, Layers } from "lucide-react";

const PHILOSOPHY_POINTS = [
  {
    num: "01",
    icon: Target,
    title: "Meaningful Challenges",
    desc: "Work on genuine, high-impact business problems across modern engineering, strategic growth, and performance marketing for ambitious enterprise partners.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Continuous Learning & AI",
    desc: "Actively develop craft across next-generation digital platforms, event-driven architectures, workflow automation, and generative AI systems.",
  },
  {
    num: "03",
    icon: Users,
    title: "Collaborative Thinking",
    desc: "Bring diverse perspectives together. Cross-functional collaboration between developers, strategists, and creatives produces superior client outcomes.",
  },
  {
    num: "04",
    icon: Compass,
    title: "Ownership & Initiative",
    desc: "Take responsibility from day one. You are empowered to propose bold solutions, experiment with modern techniques, and see your ideas put into production.",
  },
  {
    num: "05",
    icon: Layers,
    title: "Outcome Over Hours",
    desc: "We measure progress by tangible value delivered to partners and users, prioritizing depth of execution, thoughtful architecture, and measurable ROI.",
  },
  {
    num: "06",
    icon: BookOpen,
    title: "Continuous Craft Mastery",
    desc: "We maintain a high bar for engineering and design discipline. Learn through direct peer reviews, dedicated research time, and challenging client briefs.",
  },
];

export function CareersPhilosophy() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none" aria-label="Why Work With Us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Working philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            An environment built for rigor &amp; craft
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
            At Better Insights, we value intellectual curiosity, clear thinking, and deliberate execution. We provide our consultants and engineers the trust, clarity, and platform to solve complex problems with integrity.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PHILOSOPHY_POINTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-8 sm:p-10 bg-white rounded-[1.75rem] border border-black/10 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#33CC7A]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-bold text-[#1B1411]/30">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#1B1411] text-white flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B1411]/65 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#33CC7A]">
                    Better Insights Principle
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
