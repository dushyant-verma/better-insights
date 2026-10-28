import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolio";

interface ServicesWorkProps {
  projectSlugs?: string[];
  title?: string;
  subtitle?: string;
}

export function ServicesWork({
  projectSlugs,
  title = "Proven Solutions in the Field.",
  subtitle = "Explore verified case studies highlighting how our architectural engineering and digital strategies solve mission-critical challenges.",
}: ServicesWorkProps) {
  // If specific slugs provided, filter to those; otherwise pick premier representative projects
  const defaultSlugs = [
    "sanction-store",
    "the-ly",
    "course-proxy",
    "pooja-hospital-telehealth",
    "gt-diagnostics",
    "khare-legal-chambers",
  ];

  const targetSlugs = projectSlugs && projectSlugs.length > 0 ? projectSlugs : defaultSlugs;
  const projects = PORTFOLIO_PROJECTS.filter((p) => targetSlugs.includes(p.slug));

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 bg-[#FAF5F0] border-b border-black/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
                Verified impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
              {subtitle}
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1B1411] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all shrink-0 self-start md:self-auto group"
          >
            <span>View all case studies</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[1.75rem] border border-black/10 overflow-hidden flex flex-col justify-between hover:border-[#33CC7A]/40 transition-all hover:shadow-lg group"
            >
              <div>
                <Link
                  href={`/work/${project.slug}`}
                  className="block relative aspect-16/10 overflow-hidden bg-black/5"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/20">
                      {project.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 sm:p-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1B1411]/50 block mb-2">
                    {project.clientName}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] mb-3 group-hover:text-[#33CC7A] transition-colors leading-snug [font-family:'Host_Grotesk',sans-serif]">
                    <Link href={`/work/${project.slug}`}>
                      {project.title.split(":")[0]}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1B1411]/70 font-normal leading-relaxed mb-6 line-clamp-3">
                    {project.cardOverview}
                  </p>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-black/5 bg-[#FAF5F0] flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[#1B1411] tracking-tight block">
                    {project.metrics[0]?.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block">
                    {project.metrics[0]?.label}
                  </span>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                >
                  <span>Case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
