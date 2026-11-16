import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerBySlug, getAllCareerSlugs, CAREERS_LIST } from "@/data/careersData";
import { SingleCareerHero } from "@/components/careers/SingleCareerHero";
import { SingleCareerTOC } from "@/components/careers/SingleCareerTOC";
import { SingleCareerContent } from "@/components/careers/SingleCareerContent";
import { SingleCareerBenefits } from "@/components/careers/SingleCareerBenefits";
import { SingleCareerApplySection } from "@/components/careers/SingleCareerApplySection";
import { BlogSocialShare } from "@/components/insights/BlogSocialShare";
import { CultureTeamSlider } from "@/components/culture/CultureTeamSlider";
import { CultureAtmosphere } from "@/components/culture/CultureAtmosphere";
import { SingleCareerTeamSection } from "@/components/careers/SingleCareerTeamSection";
import "@/styles/careers.css";
import "@/styles/culture-page.css";
import "@/styles/about-culture.css";

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerBySlug(slug);

  if (!career) {
    return { title: "Career Not Found | Better Insights" };
  }

  return {
    title: `${career.title} – Careers | Better Insights`,
    description: career.shortDescription,
    alternates: {
      canonical: `/careers/${career.slug}`,
    },
    openGraph: {
      title: `Join Better Insights as ${career.title}`,
      description: career.shortDescription,
      url: `https://betterinsights.in/careers/${career.slug}`,
      type: "website",
      images: [{ url: career.heroImage, alt: career.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${career.title} – Careers | Better Insights`,
      description: career.shortDescription,
      images: [career.heroImage],
    },
  };
}

export default async function SingleCareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);

  if (!career) {
    notFound();
  }

  // Schema.org JobPosting structured data for search engines
  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: career.title,
    description: career.shortDescription,
    datePosted: "2026-11-01",
    employmentType: career.employmentType === "Full Time" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Better Insights",
      sameAs: "https://betterinsights.in",
      logo: "https://betterinsights.in/logos/better-insights-logo-6.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.location,
        addressCountry: "GB",
      },
    },
  };

  return (
    <>
      {/* Schema.org JobPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />

      <article className="min-h-screen bg-[#0E0F10] text-[#E5E5E5] select-none pb-24 relative">
        {/* Ambient Subtle Lime Glow in Background */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(203,252,107,0.05)_0%,transparent_70%)] blur-[140px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* ================================================================= */}
        {/* 1. Hero Section – Full-Width Background Photo + Organic Blob Overlays */}
        {/* ================================================================= */}
        <SingleCareerHero career={career} />

        {/* ================================================================= */}
        {/* 2. Job Description Section (3-Column Layout: TOC + JD + Social)   */}
        {/* ================================================================= */}
        <section id="career-details" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20 scroll-mt-28">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10 xl:gap-14 relative">
            
            {/* Left Column: Sticky Apply CTA Card + Table of Contents */}
            <SingleCareerTOC career={career} />

            {/* Middle Column: Main Job Description Content & Benefits */}
            <main className="w-full flex-1 min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[820px]">
              <SingleCareerContent career={career} />
              <SingleCareerBenefits />

              {/* Mobile / Tablet Horizontal Social Share Bar */}
              <div className="block lg:hidden mt-10 pt-6 border-t border-white/10">
                <BlogSocialShare
                  url={`https://betterinsights.in/careers/${career.slug}`}
                  title={`Better Insights is looking for an ${career.title}`}
                  layout="horizontal"
                />
              </div>
            </main>

            {/* Right Column: Sticky Social Sharing Toolbar (Desktop) */}
            <aside className="hidden lg:flex flex-col items-center w-12 xl:w-16 shrink-0 lg:sticky lg:top-28 lg:self-start z-10 pt-2">
              <BlogSocialShare
                url={`https://betterinsights.in/careers/${career.slug}`}
                title={`Better Insights is looking for an ${career.title}`}
                layout="vertical"
              />
            </aside>

          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. Our Team Review Slider (Testimonials with Two-Column Intro)    */}
        {/* ================================================================= */}
        <div className="mt-20 sm:mt-28 lg:mt-32 border-t border-white/10">
          <CultureTeamSlider showLifeIntro={true} />
        </div>

        {/* ================================================================= */}
        {/* 4. Feel the Atmosphere Section (Scrapbook Culture Gallery)         */}
        {/* ================================================================= */}
        <div className="border-t border-white/10">
          <CultureAtmosphere />
        </div>

        {/* ================================================================= */}
        {/* 5. Our Team Slider (Interactive Team Profiles & Modal Details)    */}
        {/* ================================================================= */}
        <div className="border-t border-white/10">
          <SingleCareerTeamSection />
        </div>

        {/* ================================================================= */}
        {/* 6. Apply for This Position (Final Application Form Section)       */}
        {/* ================================================================= */}
        <div className="border-t border-white/10">
          <SingleCareerApplySection career={career} />
        </div>
      </article>
    </>
  );
}
