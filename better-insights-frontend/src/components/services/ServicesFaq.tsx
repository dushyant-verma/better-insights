"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ServiceFaq } from "@/lib/data/services";

interface ServicesFaqProps {
  faqs?: ServiceFaq[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_LANDING_FAQS: ServiceFaq[] = [
  {
    question: "How does Better Insights determine which services our business needs?",
    answer:
      "We begin every relationship with an exploratory discovery phase where we audit your existing digital infrastructure, analyze user drop-off points, and evaluate technical debt. We recommend only the services that directly solve your commercial bottlenecks and deliver measurable ROI.",
  },
  {
    question: "Can we engage Better Insights for a single service or do we need a full package?",
    answer:
      "Our services are completely modular. Many clients begin with a targeted high-priority initiative—such as a headless Next.js website re-architecture, a HubSpot/WhatsApp CRM integration, or an AI counseling bot—and later expand into performance marketing or broader digital transformation.",
  },
  {
    question: "How do your services work together to accelerate growth?",
    answer:
      "Our offerings are engineered to build upon one another. For example, a sub-second headless website improves paid ad conversion rates and organic search rankings, while CRM integrations ensure every captured lead is instantly routed to sales, and AI automation handles repetitive qualification.",
  },
  {
    question: "What is your typical project delivery timeline?",
    answer:
      "Targeted integrations and conversion landing funnels typically launch in 2 to 4 weeks. Full headless website re-platforms, enterprise AI agents, and comprehensive digital transformation roadmaps typically span 6 to 12 weeks, delivered in iterative, transparent two-week sprints.",
  },
  {
    question: "How do you coordinate with our existing internal teams or technology vendors?",
    answer:
      "We operate as an agile extension of your internal team. We integrate seamlessly into your preferred communication channels (Slack, Teams, Jira) and coordinate directly with internal IT, compliance leads, and marketing managers without disrupting day-to-day operations.",
  },
  {
    question: "How do we get started with a consultation?",
    answer:
      "You can submit an inquiry through our Contact page or select a specific service to discuss your requirements. We schedule an initial 30-minute discovery consultation with our technical and strategy leads to review your architecture and outline preliminary recommendations.",
  },
];

export function ServicesFaq({
  faqs = DEFAULT_LANDING_FAQS,
  title = "Frequently Asked Questions.",
  subtitle = "Clear answers about how we partner with clients, engineer digital architectures, and deliver measurable outcomes.",
}: ServicesFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF5F0] border-b border-black/10 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Clarity &amp; transparency
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                data-open={isOpen}
                className="service-faq-item bg-white rounded-[1.25rem] border border-black/10 overflow-hidden shadow-2xs"
              >
                <button
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#33CC7A] focus-visible:outline-offset-2 transition-colors hover:bg-black/[0.02]"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#1B1411] leading-snug [font-family:'Host_Grotesk',sans-serif]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#33CC7A] text-[#1B1411] border-[#33CC7A]" : "bg-[#FAF5F0] text-[#1B1411]/70"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#1B1411]/75 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
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
