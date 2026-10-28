import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Layers, Sparkles, RefreshCw, TrendingUp } from "lucide-react";

const SYNERGIES = [
  {
    from: "Website Development",
    fromIcon: Globe,
    to: "Digital Growth",
    toIcon: TrendingUp,
    title: "High-Performance Speed Powers Conversion Acceleration",
    description:
      "A fast, responsive headless website provides the essential landing experience required for high-intent paid search campaigns and organic search authority to convert visitors into customers.",
    benefits: ["Lower bounce rates on ad traffic", "Higher Google Quality Scores", "Maximized Return on Ad Spend (ROAS)"],
    linkFrom: "/services/website-development",
    linkTo: "/services/digital-growth",
  },
  {
    from: "CRM & Integrations",
    fromIcon: Layers,
    to: "Customer Journeys",
    toIcon: RefreshCw,
    title: "Connected Data Pipelines Create Frictionless Journeys",
    description:
      "Synchronizing lead captures, marketing automation, support tickets, and ERP invoicing eliminates disconnected data silos and delivers unified 360-degree customer context.",
    benefits: ["Instant automated lead routing", "Zero manual double-entry", "Seamless WhatsApp & SMS touchpoints"],
    linkFrom: "/services/crm-integrations",
    linkTo: "/services/digital-transformation",
  },
  {
    from: "AI & Automation",
    fromIcon: Sparkles,
    to: "Operations",
    toIcon: Layers,
    title: "Intelligent Workflows Streamline Repetitive Tasks",
    description:
      "Deploying context-aware AI copilots, automated document extraction, and multi-agent workflows liberates operational teams from hours of manual repetition.",
    benefits: ["Up to 60% faster document processing", "24/7 intelligent inquiry triage", "Automated routine execution"],
    linkFrom: "/services/ai-automation",
    linkTo: "/services/technology-engineering",
  },
  {
    from: "Digital Transformation",
    fromIcon: RefreshCw,
    to: "Business Growth",
    toIcon: Globe,
    title: "Modernized Architecture Aligns Tech with Strategic Goals",
    description:
      "Deconstructing legacy bottlenecks and introducing digital queue management, self-service portals, and paperless systems unlocks new operational velocity and customer satisfaction.",
    benefits: ["65% reduction in customer wait times", "Paperless operational efficiency", "Future-proof modular cloud stacks"],
    linkFrom: "/services/digital-transformation",
    linkTo: "/services/website-development",
  },
];

export function ServicesSynergy() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF5F0] border-b border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Ecosystem synergy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            How our services work together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
            Our capabilities are intentionally modular yet deeply interconnected. When combined, they multiply
            operational efficiency, streamline customer touchpoints, and compound business velocity.
          </p>
        </div>

        {/* 2x2 Connected Editorial Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SYNERGIES.map((syn, idx) => {
            const FromIcon = syn.fromIcon;
            const ToIcon = syn.toIcon;

            return (
              <div
                key={idx}
                className="bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-10 flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all hover:shadow-md"
              >
                <div>
                  {/* Visual Node Connection Bar */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FAF5F0] border border-black/10 text-[#1B1411]">
                      <FromIcon className="w-3.5 h-3.5 text-[#33CC7A]" />
                      {syn.from}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#1B1411]/40" />
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FAF5F0] border border-black/10 text-[#1B1411]">
                      <ToIcon className="w-3.5 h-3.5 text-[#33CC7A]" />
                      {syn.to}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {syn.title}
                  </h3>

                  <p className="text-sm text-[#1B1411]/70 leading-relaxed font-normal mb-6">
                    {syn.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block mb-2">
                    Compounding benefits:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {syn.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#FAF5F0] border border-black/5 text-[#1B1411]/80 font-medium"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
