import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  getProjectBySlug, 
  getAllProjects, 
  getRelatedProjects,
  PortfolioProject 
} from "@/lib/data/portfolio";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Sparkles,
  Compass,
  Building2,
  Calendar,
  Briefcase
} from "lucide-react";
import type { Metadata } from "next";
import "@/styles/portfolio.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Better Insights",
    };
  }

  return {
    title: `${project.clientName} Case Study | ${project.title} | Better Insights`,
    description: project.cardOverview,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.clientName} Case Study | Better Insights`,
      description: project.cardOverview,
      url: `/work/${project.slug}`,
      siteName: "Better Insights",
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 2);

  return (
    <article className="min-h-screen bg-[linear-gradient(180deg,#F4EEFA_0%,#FAF7F4_28%,#FAF5F0_100%)] text-[#1B1411] select-none pt-28 sm:pt-36 pb-24 relative overflow-hidden">
      {/* Ambient Subtle Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(124,58,237,0.07)_0%,transparent_70%)] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#1B1411]/60">
          <Link href="/" className="hover:text-[#1B1411] transition-colors">Home</Link>
          <span className="text-black/30">/</span>
          <Link href="/work" className="hover:text-[#1B1411] transition-colors">Our Work</Link>
          <span className="text-black/30">/</span>
          <span className="text-[#1B1411] truncate">{project.clientName}</span>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1B1411] text-[11px] font-semibold border border-black/10 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
              {project.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white border border-black/10 text-[#1B1411] text-[11px] font-semibold shadow-2xs">
              Verified Case Study
            </span>
          </div>

          {project.clientLogo && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-black/10 rounded-full shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#1B1411]/60" />
              <span className="text-xs font-semibold text-[#1B1411]">
                {project.clientName}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-[1.1] mb-6">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-[#1B1411]/70 max-w-3xl font-normal leading-relaxed mb-8">
          {project.cardOverview}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white text-[#1B1411]/80 border border-black/10 rounded-full text-xs font-medium shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hero Visual Asset */}
        <div className="relative aspect-[16/9] w-full rounded-[1.75rem] overflow-hidden shadow-xl border border-black/10 bg-black/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </header>

      {/* Main Case Study Body Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 01 / CONTEXT: Client & Project Overview */}
        <section className="bg-white rounded-[1.75rem] p-8 sm:p-12 lg:p-16 border border-black/10 shadow-2xs">
          <div className="case-split-grid">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                01 / Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                Client &amp; Project Overview
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-[#1B1411]/80 font-normal leading-relaxed">
                {project.clientOverview}
              </p>

              {/* Quick Facts Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                <div className="p-4 bg-[#FAF5F0] rounded-2xl border border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block">
                    Client
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] block mt-1">
                    {project.clientName}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF5F0] rounded-2xl border border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block">
                    Discipline
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] block mt-1">
                    {project.category}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF5F0] rounded-2xl border border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block">
                    Delivered
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] block mt-1">
                    Full-Cycle Solution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / CHALLENGE: Business Challenge */}
        <section className="bg-white rounded-[1.75rem] p-8 sm:p-12 lg:p-16 border border-black/10 shadow-2xs">
          <div className="case-split-grid">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                02 / Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                The Business Challenge
              </h2>
            </div>

            <div>
              <div className="p-6 sm:p-8 bg-[#FAF5F0] rounded-2xl border-l-4 border-[#33CC7A] text-sm sm:text-base text-[#1B1411]/80 font-normal leading-relaxed">
                {project.challenge}
              </div>
            </div>
          </div>
        </section>

        {/* 03 / GOALS: Strategic Objectives */}
        <section className="bg-white rounded-[1.75rem] p-8 sm:p-12 lg:p-16 border border-black/10 shadow-2xs">
          <div className="case-split-grid">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                03 / Goals
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                Strategic Objectives
              </h2>
            </div>

            <div className="space-y-4">
              {project.objectives.map((objective, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF5F0] border border-black/5">
                  <span className="font-mono text-xs font-semibold text-[#1B1411] bg-white px-2.5 py-1 rounded-lg border border-black/10 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs sm:text-sm text-[#1B1411]/80 font-medium leading-relaxed">
                    {objective}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 / APPROACH & 05 / SOLUTION */}
        <section className="bg-white rounded-[1.75rem] p-8 sm:p-12 lg:p-16 border border-black/10 shadow-2xs space-y-12">
          
          <div className="case-split-grid">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                04 / Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                Our Strategy &amp; Approach
              </h2>
            </div>

            <div>
              <p className="text-sm sm:text-base text-[#1B1411]/80 font-normal leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10 case-split-grid">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                05 / Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                Solution &amp; Implementation
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-[#1B1411]/80 font-normal leading-relaxed">
                {project.solution}
              </p>

              {/* Services Provided */}
              <div className="pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/50 block mb-3">
                  Core Capabilities Delivered:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF5F0] border border-black/10 rounded-full text-xs font-semibold text-[#1B1411]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#33CC7A]" />
                      <span>{svc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* 06 / IMPACT: Measurable Business Results */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-8 sm:p-12 lg:p-16 shadow-xl border border-white/10 relative overflow-hidden">
            <div 
              className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            <div className="relative z-10 max-w-2xl mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                06 / Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif] leading-tight">
                Measurable Business Results
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-2">
                Verified performance outcomes delivered through our partnership with {project.clientName}.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl sm:text-4xl font-semibold font-mono text-[#33CC7A] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-xs text-white/70 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 07 / MORE WORK: Related Case Studies */}
        {relatedProjects.length > 0 && (
          <section className="pt-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1B1411] text-[11px] font-semibold border border-black/10 shadow-2xs mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                  07 / More Work
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  Related Client Success Stories
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs font-semibold text-[#1B1411] hover:text-[#33CC7A] hidden sm:inline-flex items-center gap-1 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <article
                  key={rel.slug}
                  className="bg-white rounded-[1.75rem] border border-black/10 overflow-hidden shadow-2xs hover:shadow-xl hover:border-black/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-black/5 overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#1B1411] text-[10px] font-semibold rounded-full shadow-sm">
                          {rel.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/50 mb-2">
                        {rel.clientName}
                      </div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-snug group-hover:text-[#33CC7A] transition-colors">
                        <Link href={`/work/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal line-clamp-2">
                        {rel.cardOverview}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <Link
                      href={`/work/${rel.slug}`}
                      className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
                    >
                      <span>Read The Story</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 08 / CONTACT CTA STRIP */}
        <div className="p-8 sm:p-14 bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2.25rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl border border-white/10 relative overflow-hidden">
          <div 
            className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
              Ready to create measurable impact?
            </span>
            <h3 className="text-xl sm:text-3xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif] leading-tight">
              Let&apos;s build something extraordinary together.
            </h3>
            <p className="text-xs text-white/70 mt-2 max-w-xl">
              Connect with our digital architects to review your goals, technical requirements, and growth opportunities.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] transition-all hover:scale-105 shadow-md portfolio-focus-ring"
            >
              <span>Start A Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-all portfolio-focus-ring"
            >
              <span>Explore All Work</span>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
