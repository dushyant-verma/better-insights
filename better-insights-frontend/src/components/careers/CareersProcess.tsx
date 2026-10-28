import React from "react";
import { CheckCircle2, MessageSquare, Search, FileCheck } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    icon: FileCheck,
    title: "Application",
    desc: "Submit your credentials, resume, and relevant work or repository links through our application form. We review every submission individually.",
  },
  {
    step: "02",
    icon: Search,
    title: "Technical & Craft Review",
    desc: "Our practice leadership reviews your past projects, problem-solving approach, and technical depth against the requirements of the role.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Conversational Interview",
    desc: "Shortlisted candidates are invited to an open, in-depth discussion about real enterprise challenges, architecture decisions, and mutual expectations.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Decision & Onboarding",
    desc: "We prioritize swift, transparent feedback. Successful candidates receive clear offer terms and an intentional, high-trust onboarding roadmap.",
  },
];

export function CareersProcess() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none" aria-label="Candidate Experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Candidate journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            What to expect
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1B1411]/70 font-normal leading-relaxed">
            We value your time. Our hiring process is designed to be transparent, respectful, and focused on genuine problem-solving ability rather than artificial hurdles.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-8 bg-white rounded-[1.75rem] border border-black/10 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#33CC7A]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-[#1B1411] text-white rounded-full">
                      Step {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#FAF5F0] text-[#1B1411] flex items-center justify-center border border-black/5">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B1411]/65 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#33CC7A]">
                    Transparent evaluation
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
