import React from "react";
import Link from "next/link";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import { ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

export interface ServiceDetailProps {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  problemHeading: string;
  problemDesc: string;
  solutions: Array<{
    number: string;
    title: string;
    desc: string;
    items: string[];
  }>;
  techStack: string[];
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

export function ServiceDetailLayout({
  slug,
  eyebrow,
  title,
  description,
  problemHeading,
  problemDesc,
  solutions,
  techStack,
  faqs,
}: ServiceDetailProps) {
  return (
    <>
      <InnerPageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        variant="dark"
        breadcrumb={[
          { label: "What We Do", href: "/what-we-do" },
          { label: eyebrow },
        ]}
        cta={{ label: "Request Architecture Consultation", href: "/contact" }}
      />

      {/* Problem Statement Chapter */}
      <section className="py-20 sm:py-28 bg-[#F3F2EF] border-b border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
              The Strategic Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-black leading-tight">
              {problemHeading}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed font-normal">
              {problemDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Architecture & Solutions Grid */}
      <section className="py-24 sm:py-32 bg-white border-b border-black/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
              Solution Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
              How We Engineer What&apos;s Next
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol) => (
              <div
                key={sol.number}
                className="p-8 sm:p-10 bg-[#F3F2EF] rounded-3xl border border-black/10 flex flex-col justify-between hover:border-black/30 transition-all"
              >
                <div>
                  <span className="font-mono text-sm font-bold text-black/40 mb-4 block">
                    {sol.number}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-black mb-3">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-normal mb-6">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-3">
                    Capabilities Included:
                  </h4>
                  <ul className="space-y-2">
                    {sol.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-black/80 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tech Stack */}
      <section className="py-20 sm:py-24 bg-[#000000] text-white border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 block mb-2">
              Technology Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Enterprise Tools &amp; Frameworks
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#171717] rounded-full border border-white/15 text-xs font-semibold text-white/90 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 sm:py-32 bg-[#F3F2EF] border-b border-black/10 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-2">
              Clarity &amp; Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-black/10 p-6 sm:p-7 shadow-sm"
              >
                <h3 className="text-base font-bold text-black mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-black/40 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-normal pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all hover:scale-105 shadow-xl"
            >
              <span>Discuss Your Requirements</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
