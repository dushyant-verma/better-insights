import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code, TrendingUp, Cpu, Workflow, Layers, Palette } from "lucide-react";

const DISCIPLINES = [
  {
    title: "Web Development & Engineering",
    desc: "Architecting headless web applications, high-performance WordPress themes, and scalable frontend experiences with Next.js and TypeScript.",
    href: "/website-development",
    icon: Code,
    focus: "Next.js, TypeScript, Headless CMS, APIs",
  },
  {
    title: "AI & Workflow Automation",
    desc: "Developing autonomous agent workflows, enterprise LLM integrations, and automated business operations that eliminate repetitive friction.",
    href: "/ai-solutions",
    icon: Cpu,
    focus: "Agents, Event-Driven Systems, Python, APIs",
  },
  {
    title: "Digital Marketing & Growth",
    desc: "Scaling paid acquisition, Google Performance Max, conversion rate optimization (CRO), and user intent-driven organic search architecture.",
    href: "/digital-growth",
    icon: TrendingUp,
    focus: "Performance Media, GA4, Funnel Optimization",
  },
  {
    title: "CRM & Enterprise Integrations",
    desc: "Connecting enterprise CRM ecosystems, bidirectional data pipelines, and ERP platforms to dissolve organizational data silos.",
    href: "/crm-integrations",
    icon: Workflow,
    focus: "HubSpot, Salesforce, Custom Webhooks, Sync",
  },
  {
    title: "Digital Transformation & Strategy",
    desc: "Helping leadership teams align organizational workflows, technology infrastructure, and customer touchpoints for enduring modernization.",
    href: "/digital-transformation",
    icon: Layers,
    focus: "Architecture Audits, Modernization Roadmaps",
  },
  {
    title: "Creative Direction & Editorial",
    desc: "Crafting authoritative editorial narratives, brand case studies, motion graphics, and technical content that elevate digital presence.",
    href: "/what-we-do",
    icon: Palette,
    focus: "Thought Leadership, Motion Design, Copywriting",
  },
];

export function CareersDisciplines() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/10 select-none" aria-label="Areas of Work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Practice disciplines
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Areas of expertise
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1B1411]/70 font-normal leading-relaxed">
              Explore the core consulting and engineering practices that define our client work. We welcome curious thinkers who want to deepen their mastery in these domains.
            </p>
          </div>

          <div className="text-xs text-[#1B1411]/50 font-mono max-w-xs">
            * Note: These represent practice disciplines across Better Insights, not a claim of active openings in each area.
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DISCIPLINES.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="p-8 bg-white rounded-[1.75rem] border border-black/10 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:border-[#33CC7A]/40 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#1B1411] text-white flex items-center justify-center mb-6 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1B1411] mb-3 [font-family:'Host_Grotesk',sans-serif]">
                    {d.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal mb-6">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/5 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-[#1B1411]/50 uppercase tracking-wider">
                    {d.focus}
                  </div>

                  <Link
                    href={d.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                  >
                    <span>View practice</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
