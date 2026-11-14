"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ShareButtons } from "@/components/insights/ShareButtons";

export interface SingleBlogHeroAuthor {
  name: string;
  role?: string;
  image?: string;
  avatar_urls?: Record<string, string>;
}

export interface SingleBlogHeroProps {
  title: string;
  featuredImage: string;
  readTime?: number | string;
  categoryName?: string;
  categorySlug?: string;
  date?: string;
  author?: SingleBlogHeroAuthor;
  articleUrl?: string;
}

/**
 * Resolves author details with intelligent mapping to verified Better Insights team members.
 */
export function resolveAuthorProfile(rawAuthor?: SingleBlogHeroAuthor): {
  name: string;
  role: string;
  image: string;
} {
  const name = rawAuthor?.name?.trim() || "Gautam Koli";
  let role = rawAuthor?.role?.trim() || "";
  let image = rawAuthor?.image || rawAuthor?.avatar_urls?.["96"] || rawAuthor?.avatar_urls?.["48"] || "";

  const lower = name.toLowerCase();

  if (lower.includes("gautam") || lower.includes("koli")) {
    image = image || "/team/photos/gautam-koli-photo.jpg";
    role = role || "Founder & Director";
  } else if (lower.includes("dushyant")) {
    image = image || "/team/photos/dushyant-verma-photo-v2.webp";
    role = role || "Web Developer";
  } else if (lower.includes("kanika")) {
    image = image || "/team/photos/kanika-sohal-photo.png";
    role = role || "HR Manager";
  } else if (lower.includes("dinkey")) {
    image = image || "/team/photos/dinkey-lekhwani-photo.png";
    role = role || "Business Development Manager";
  } else if (lower.includes("jasika")) {
    image = image || "/team/photos/jasika-saini-photo.png";
    role = role || "SEO Analyst";
  } else if (lower.includes("priyanka")) {
    image = image || "/team/photos/priyanka-raghuvanshi-photo.png";
    role = role || "Marketing Operations Associate";
  } else {
    // Dynamic or CMS author fallback
    image = image || "/team/photos/gautam-koli-photo.jpg";
    role = role || "Strategy & Digital Architecture";
  }

  return { name, role, image };
}

/**
 * SingleBlogHero
 * 
 * Recreates the iconic MadeByShape single blog post hero section for Better Insights.
 * Features an asymmetric editorial layout with a custom organic blob cut-out overlapping
 * the right-hand featured image with mathematical concave fillet SVGs.
 */
export function SingleBlogHero({
  title,
  featuredImage,
  readTime = 4,
  categoryName = "Strategy",
  categorySlug = "",
  date,
  author,
  articleUrl,
}: SingleBlogHeroProps) {
  const authorData = resolveAuthorProfile(author);
  const cleanTitle = title.replace(/&amp;/g, "&").replace(/&#8217;/g, "'");

  return (
    <section className="w-full bg-[#0E0F10] text-white pt-24 sm:pt-28 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 relative overflow-hidden select-none single-blog-hero">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              {categorySlug && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
                  </li>
                  <li>
                    <Link
                      href={`/insights?category=${categorySlug}`}
                      className="hover:text-[#CBFC6B] transition-colors"
                    >
                      {categoryName.replace(/&amp;/g, "&")}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[#CBFC6B] text-[11px] font-semibold border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
              {categoryName.replace(/&amp;/g, "&")}
            </span>

            {articleUrl && (
              <div className="hidden sm:block">
                <ShareButtons url={articleUrl} title={cleanTitle} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Hero Container with Signature Asymmetric Blob Overlap - Edge-to-Edge Right Viewport */}
      <div className="w-full relative overflow-hidden">
        <div className="w-full relative flex flex-col md:flex-row justify-between min-h-[460px] md:min-h-[500px] lg:min-h-[550px] xl:min-h-[600px]">

          {/* Left Content Area (layered on top with z-20) */}
          <div className="w-full inline-flex flex-col justify-between items-start relative z-20 order-2 md:order-1 h-full py-4 md:py-8 lg:py-10">

            {/* Middle Protruding Title Box with Signature Concave Fillets */}
            <div className="w-full relative my-auto mt-6 mb-8 md:mt-12 md:mb-10">

              {/* Top concave fillet SVG: seamlessly joins vertical edge of image down to horizontal top edge of title box */}
              <svg
                className="w-10 h-10 lg:w-12 lg:h-12 text-[#0E0F10] fill-current single-blog-hero__fillet-top hidden md:block"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path d="M 0 0 A 100 100 0 0 0 100 100 L 0 100 Z" />
              </svg>

              {/* Bottom concave fillet SVG: seamlessly joins horizontal bottom edge of title box down to vertical edge of image */}
              <svg
                className="w-10 h-10 lg:w-12 lg:h-12 text-[#0E0F10] fill-current single-blog-hero__fillet-bottom hidden md:block"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path d="M 0 100 A 100 100 0 0 1 100 0 L 0 0 Z" />
              </svg>

              {/* Protruding Title Panel */}
              <div
                className="single-blog-hero__title-panel w-full py-4 md:py-8 lg:py-10 pr-4 md:pr-10"
                style={{ paddingLeft: "var(--hero-content-pad, 2rem)" }}
              >
                <div className="relative">

                  {/* Reading Time Badge */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-3 md:mb-0 md:absolute md:top-1.5 md:left-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                    <span className="font-light">{readTime} min read</span>
                  </div>

                  {/* Blog Title (H1) with editorial first-line indent */}
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-sans font-semibold tracking-[-0.03em] text-white leading-[1.08] text-balance md:indent-28 lg:indent-32 xl:indent-36 [font-family:'Host_Grotesk',sans-serif]"
                    dangerouslySetInnerHTML={{ __html: cleanTitle }}
                  />
                </div>
              </div>
            </div>

            {/* Author Information (Bottom-Left) */}
            <div
              className="relative z-20 pt-2"
              style={{ paddingLeft: "var(--hero-content-pad, 2rem)" }}
            >
              <div className="flex items-end gap-3.5 lg:gap-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden relative shrink-0 bg-neutral-900 border border-white/10 shadow-lg">
                  <Image
                    src={authorData.image}
                    alt={authorData.name}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="leading-tight tracking-tight">
                  <div className="text-xs text-neutral-400 font-light mb-1">
                    Written by
                  </div>
                  <div className="text-white font-medium text-sm lg:text-base">
                    {authorData.name}
                  </div>
                  <div className="text-xs lg:text-sm text-neutral-400 font-light mt-0.5">
                    {authorData.role}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Featured Image Container - Extends all the way to extreme right viewport edge */}
          <div className="w-full h-64 sm:h-80 md:h-full relative order-1 md:order-2 px-4 sm:px-6 md:px-0 single-blog-hero__image-wrap z-0">
            <div className="w-full h-full relative overflow-hidden rounded-2xl md:rounded-none md:rounded-l-[32px] lg:rounded-l-[36px] bg-neutral-900">
              <Image
                src={featuredImage}
                alt={cleanTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 68vw"
                className="object-cover object-center single-blog-hero__image"
              />
              {/* Subtle top & bottom shadow gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

