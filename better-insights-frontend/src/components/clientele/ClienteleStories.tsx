import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { getFeaturedClientStories } from "@/lib/data/clientele";

const FEATURED_STORIES = [
  {
    client: "The Ly International",
    industry: "Enterprise / Education",
    logo: "/images/thely-logo.png",
    metric: "+340%",
    metricLabel: "International Leads",
    slug: "the-ly",
    summary: "Multi-market PPC infrastructure and localized admissions funnels scaling global student recruitment.",
    services: ["Search Marketing", "Conversion Architecture", "CRM Telemetry"],
  },
  {
    client: "Pooja Hospital",
    industry: "Healthcare & Life Sciences",
    logo: "/images/Pooja-Hospital.webp",
    metric: "-65%",
    metricLabel: "OPD Waiting Time",
    slug: "pooja-hospital-telehealth",
    summary: "Unified digital hospital ecosystem digitizing OPD queues, physician rosters, and virtual consultations.",
    services: ["Digital Transformation", "Queue Telemetry", "Telemedicine"],
  },
  {
    client: "Course Proxy",
    industry: "Education & EdTech",
    logo: "/images/courseproxy-logo.png.webp",
    metric: "2.8x",
    metricLabel: "Student Engagement",
    slug: "course-proxy",
    summary: "AI course matching portal and automated student counseling workflows simplifying academic admissions.",
    services: ["AI Recommendation Engine", "Web Platform", "Counselor Portal"],
  },
  {
    client: "Sanction Store",
    industry: "E-Commerce & Retail",
    logo: "/images/Sanction-Store-2.png.webp",
    metric: "99.99%",
    metricLabel: "Drop Uptime",
    slug: "sanction-store",
    summary: "Resilient edge-rendered headless e-commerce sustaining 25,000+ concurrent checkout surges during flash drops.",
    services: ["Headless Next.js", "Redis Queue Throttling", "Bot Mitigation"],
  },
  {
    client: "Khare Legal Chambers",
    industry: "Enterprise & Legal",
    logo: "/images/khare-legal-chambers-logo-1.png.webp",
    metric: "-50%",
    metricLabel: "Research Time",
    slug: "khare-legal-chambers",
    summary: "Private enterprise cloud portal with bank-grade role-based access control and AI document intelligence.",
    services: ["Enterprise Software", "Document Intelligence", "Security & RBAC"],
  },
  {
    client: "GT Diagnostics",
    industry: "Healthcare Telemetry",
    logo: "/images/gt-diagnostics-logo-e1747472463202.png.webp",
    metric: "< 2 min",
    metricLabel: "Report Dispatch",
    slug: "gt-diagnostics",
    summary: "Automated LIS diagnostic result listener and encrypted patient delivery via WhatsApp Business API.",
    services: ["CRM & Integrations", "LIS Telemetry", "Automated Dispatch"],
  },
];

export function ClienteleStories() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Collaborations in action
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Selected client stories
            </h2>
            <p className="text-sm sm:text-base text-[#1B1411]/70 mt-2 max-w-xl font-normal leading-relaxed">
              Discover how we partner with organizations across industries to solve critical challenges and engineer scalable digital products.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1B1411] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all self-start md:self-auto group shadow-xs"
          >
            <span>Explore all case studies</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_STORIES.map((story) => (
            <div
              key={story.slug}
              className="bg-white rounded-[1.75rem] p-8 border border-black/10 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#33CC7A]/40 transition-all group"
            >
              <div>
                {/* Header row: logo & metric */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="h-12 w-28 relative grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all">
                    <Image
                      src={story.logo}
                      alt={`${story.client} Logo`}
                      fill
                      className="object-contain object-left"
                      sizes="120px"
                    />
                  </div>

                  <div className="px-3.5 py-1.5 bg-[#FAF5F0] border border-black/5 text-[#1B1411] rounded-xl shadow-2xs text-right shrink-0">
                    <div className="text-xs font-bold text-[#1B1411]">{story.metric}</div>
                    <div className="text-[10px] text-[#1B1411]/60 font-semibold uppercase">{story.metricLabel}</div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1B1411]/50 block mb-1">
                  {story.industry}
                </span>

                <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] leading-snug group-hover:text-[#33CC7A] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                  {story.client}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                  {story.summary}
                </p>

                {/* Services list */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {story.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 bg-[#FAF5F0] rounded-full text-[10px] font-medium text-[#1B1411]/75 border border-black/5"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-black/5">
                <Link
                  href={`/work/${story.slug}`}
                  className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                >
                  <span>Read the case study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
