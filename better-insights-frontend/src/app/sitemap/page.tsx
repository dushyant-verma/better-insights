import React from "react";
import Link from "next/link";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import {
  Globe,
  Briefcase,
  Layers,
  BookOpen,
  Scale,
  ExternalLink,
  ChevronRight,
  FileCode,
  ShieldCheck,
  FileText,
  Edit3,
  Calculator,
  Users,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Website Sitemap | Better Insights",
  description:
    "Comprehensive directory and index of all public pages, services, case studies, insights, and legal resources on Better Insights.",
};

const SITEMAP_SECTIONS = [
  {
    title: "Primary Navigation",
    icon: Compass,
    description: "Core destination pages across the Better Insights digital experience.",
    links: [
      { label: "Home", href: "/", desc: "Homepage and agency overview" },
      { label: "Services Overview", href: "/services", desc: "Comprehensive capabilities and enterprise offerings" },
      { label: "Our Work & Portfolio", href: "/work", desc: "Selected client case studies and verified outcomes" },
      { label: "Client Success Stories", href: "/our-work", desc: "In-depth project narratives and results" },
      { label: "Our Clientele", href: "/our-clientele", desc: "Brands, institutions, and partners we collaborate with" },
      { label: "Insights & Articles", href: "/insights", desc: "Analysis, strategies, and engineering insights" },
      { label: "About Better Insights", href: "/about", desc: "Our story, leadership, and engineering philosophy" },
      { label: "Careers", href: "/careers", desc: "Open roles and working culture at Better Insights" },
      { label: "Contact Us", href: "/contact", desc: "Direct communications, inquiries, and consultation bookings" },
      { label: "CPR Calculator Tool", href: "/cpr-tool", desc: "Interactive Cost Per Result & ROI estimation tool" },
    ],
  },
  {
    title: "Specialized Services",
    icon: Layers,
    description: "End-to-end consulting, design, engineering, and digital growth services.",
    links: [
      {
        label: "Website Development",
        href: "/services/website-development",
        desc: "High-performance websites, headless architectures, and CMS engineering",
      },
      {
        label: "CRM & Integrations",
        href: "/services/crm-integrations",
        desc: "Enterprise HubSpot, Salesforce, and automated customer pipelines",
      },
      {
        label: "AI & Automation",
        href: "/services/ai-automation",
        desc: "Intelligent workflows, custom models, and autonomous operational agents",
      },
      {
        label: "Digital Growth",
        href: "/services/digital-growth",
        desc: "Performance marketing, conversion optimization, and organic SEO scale",
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
        desc: "Modernizing legacy stacks and aligning business architecture with tech",
      },
      {
        label: "Technology & Engineering",
        href: "/services/technology-engineering",
        desc: "Cloud infrastructure, scalable backend APIs, and custom software",
      },
    ],
  },
  {
    title: "Portfolio & Case Studies",
    icon: Briefcase,
    description: "Representative case studies showcasing measurable business ROI.",
    links: [
      { label: "Thely Platform", href: "/work/thely", desc: "High-volume digital media infrastructure and speed optimization" },
      { label: "CourseProxy Scalability", href: "/work/courseproxy", desc: "High-availability educational gateway and platform" },
      { label: "Pooja Hospital Portal", href: "/work/pooja-hospital", desc: "Integrated healthcare appointment and patient flow architecture" },
      { label: "Voyya Travel Experience", href: "/work/voyya", desc: "Dynamic travel booking engine and digital product interface" },
      { label: "Veda Edu Academy", href: "/work/veda-edu", desc: "Digital learning system and student engagement workflow" },
      { label: "Sanction Store Commerce", href: "/work/sanction-store", desc: "Custom e-commerce infrastructure with seamless payment gateways" },
      { label: "GT Diagnostics", href: "/work/gt-diagnostics", desc: "Clinical pathology reporting and lab workflow integration" },
      { label: "Khare Legal Chambers", href: "/work/khare-legal-chambers", desc: "Prestige legal firm branding and digital advisory portal" },
      { label: "Old Fort Quarter", href: "/work/oldfortquater", desc: "Heritage hospitality brand and reservation platform" },
      { label: "Stylebar Ireland", href: "/work/stylebar-ireland", desc: "Premium salon booking platform and retail digital experience" },
    ],
  },
  {
    title: "Insights & Topic Hubs",
    icon: BookOpen,
    description: "Published knowledge articles, technical guides, and thought leadership.",
    links: [
      { label: "Explore All Insights", href: "/insights", desc: "Full library of strategic and engineering articles" },
      { label: "AI & Automation Hub", href: "/category/ai-automation", desc: "Articles focused on artificial intelligence and workflow automation" },
      { label: "Digital Growth & Marketing", href: "/category/marketing-growth", desc: "Performance media, funnel architecture, and analytics" },
      { label: "Web Technology & Architecture", href: "/category/web-technology", desc: "Next.js, modern frontends, and backend engineering" },
      { label: "CRM & Integrations", href: "/category/crm-integrations", desc: "Data pipelines, HubSpot architectures, and customer ops" },
      { label: "SEO Strategy", href: "/category/search-engine-optimization", desc: "Organic visibility, technical SEO, and semantic search" },
    ],
  },
  {
    title: "Legal, Compliance & Publishing",
    icon: Scale,
    description: "Statutory governance, privacy standards, and editorial collaboration.",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
        desc: "Information collection, data protection rights, and privacy practices",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
        desc: "Website terms of use, intellectual property rights, and legal governance",
      },
      {
        label: "Write for Us",
        href: "/write-for-us",
        desc: "Guest blogging opportunities, editorial standards, and pitch guidelines",
      },
      {
        label: "Search Engine XML Sitemap",
        href: "/sitemap.xml",
        desc: "Machine-readable XML protocol format for Google and search crawlers",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="bg-[#FAF5F0] min-h-screen text-[#1B1411]">
      <InnerPageHero
        eyebrow="Directory &amp; Index"
        title="Website Sitemap"
        description="A structured, navigable directory of every public page, service offering, case study, and knowledge article across Better Insights."
        variant="light"
        breadcrumb={[{ label: "Sitemap" }]}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Quick XML Sitemap Notification Banner */}
          <div className="bg-white rounded-[1.75rem] border border-black/10 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5F0] flex items-center justify-center shrink-0 text-[#1B1411]">
                <FileCode className="w-6 h-6 text-[#33CC7A]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-[-0.02em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] flex items-center gap-2">
                  Machine-Readable XML Sitemap
                  <span className="text-[10px] font-semibold tracking-wider px-2.5 py-0.5 bg-[#FAF5F0] border border-black/10 text-[#1B1411] rounded-full">
                    Protocol 0.9
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#1B1411]/60 mt-1 max-w-2xl leading-relaxed">
                  Looking for the auto-generated sitemap for search crawlers like Googlebot and Bingbot?
                  Our production XML sitemap conforms to the standard Sitemaps.org protocol and includes
                  dynamic blog posts, service routes, and case studies.
                </p>
              </div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1411] text-white text-xs font-semibold rounded-full hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all shrink-0 shadow-sm"
            >
              <span>View XML Sitemap</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Categorized Sitemap Sections */}
          <div className="space-y-14">
            {SITEMAP_SECTIONS.map((section, idx) => {
              const IconComponent = section.icon;
              return (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-black/10 pb-4">
                    <div className="w-8 h-8 rounded-full bg-[#1B1411] text-white flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 text-[#33CC7A]" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                        {section.title}
                      </h2>
                      <p className="text-xs text-[#1B1411]/60 mt-0.5">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.links.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className="group bg-white rounded-[1.25rem] border border-black/10 p-5 hover:border-[#33CC7A]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-sm font-semibold text-[#1B1411] group-hover:text-[#33CC7A] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                              {item.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#1B1411]/40 group-hover:text-[#33CC7A] group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <p className="text-xs text-[#1B1411]/60 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-black/5 text-[11px] font-mono text-[#1B1411]/40 group-hover:text-[#1B1411]/70 transition-colors">
                          {item.href}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Inquiries / Contact Section */}
          <div className="bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden shadow-xl">
            <div 
              className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            <div className="relative z-10 space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                Direct Communications
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif]">
                Can&apos;t find what you are looking for?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                Connect directly with our strategy and digital architecture team. We respond to all
                business and technical inquiries within one business day.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] transition-all shadow-sm"
              >
                Contact Strategy Desk
              </Link>
              <a
                href="mailto:contact@betterinsights.in"
                className="px-6 py-3 bg-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                Email Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
