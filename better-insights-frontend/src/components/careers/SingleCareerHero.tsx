"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowDownRight } from "lucide-react";
import { BlobButton } from "@/components/ui/BlobButton";
import type { CareerDetail } from "@/data/careersData";

interface SingleCareerHeroProps {
  career: CareerDetail;
}

export function SingleCareerHero({ career }: SingleCareerHeroProps) {
  const scrollToDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("career-details");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Determine the prefix and title for the 2-line visual balance
  const fullHeading = career.displayHeading || `We're looking for a ${career.title}`;
  let prefix = "We're looking for a";
  let titlePart = career.title;

  if (fullHeading.toLowerCase().includes("looking for an")) {
    prefix = "We’re looking for an";
    const parts = fullHeading.split(/looking for an/i);
    if (parts[1]) titlePart = parts[1].replace(/\.$/, "").trim();
  } else if (fullHeading.toLowerCase().includes("looking for a")) {
    prefix = "We’re looking for a";
    const parts = fullHeading.split(/looking for a/i);
    if (parts[1]) titlePart = parts[1].replace(/\.$/, "").trim();
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#0D0D0D] text-white select-none">
      {/* =================================================================== */}
      {/* 1. Full-Bleed Viewport Canvas (90–95vh Desktop Edge-to-Edge Banner) */}
      {/* =================================================================== */}
      <div className="relative w-full h-[86vh] sm:h-[88vh] md:h-[90vh] lg:h-[92vh] min-h-[580px] max-h-[960px] overflow-hidden">
        
        {/* Full-Width Background Team Photograph */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={career.heroImage}
            alt={career.heroImageAlt || `Better Insights ${career.title} team working together`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_32%] pointer-events-none"
          />

          {/* Contrast & Depth Overlays for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ================================================================= */}
        {/* 2. Floating Breadcrumb Navigation Pill (Top-Left)                 */}
        {/* ================================================================= */}
        <div className="absolute top-24 sm:top-28 lg:top-28 left-4 sm:left-8 lg:left-12 xl:left-16 z-20">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-neutral-300 font-mono shadow-lg">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              </li>
              <li className="text-[#CBFC6B] font-medium truncate max-w-[140px] sm:max-w-[200px]">
                {career.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* ================================================================= */}
        {/* 3. Left Organic Stepped Title Container (MadeByShape Reference)   */}
        {/* ================================================================= */}
        <div className="absolute bottom-0 left-0 sm:left-6 lg:left-12 xl:left-16 z-20 max-w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-[760px] xl:max-w-[820px]">
          
          {/* 3A. Upper Metadata Tab (Notch at top-left) */}
          <div className="relative inline-flex items-center">
            {/* The Tab Pill Body */}
            <div className="bg-[#0D0D0D] text-white/80 text-xs sm:text-sm font-light px-4 sm:px-6 pt-2.5 sm:pt-3 pb-2 rounded-t-xl sm:rounded-t-2xl flex items-center gap-2 sm:gap-2.5 [font-family:'Host_Grotesk',sans-serif]">
              <span className="text-white/95 font-medium">{career.employmentType}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" aria-hidden="true" />
              <span>{career.workplaceType}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[140px] sm:max-w-none">{career.location}</span>
            </div>

            {/* Concave fillet SVG joining vertical right edge of metadata tab to horizontal top edge of heading box */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D0D0D] fill-current absolute bottom-0 right-0 transform translate-x-full pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M 0 0 A 100 100 0 0 0 100 100 L 0 100 Z" />
            </svg>
          </div>

          {/* 3B. Main Heading Container */}
          <div className="relative bg-[#0D0D0D] px-5 sm:px-8 lg:px-10 pt-4 sm:pt-6 pb-6 sm:pb-8 lg:pb-10 rounded-tr-2xl sm:rounded-tr-3xl lg:rounded-tr-[36px] rounded-tl-none rounded-b-none shadow-2xl">
            
            {/* Left concave fillet joining left edge to bottom baseline */}
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-[#0D0D0D] fill-current absolute bottom-0 -left-6 sm:-left-8 pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M 100 0 A 100 100 0 0 1 0 100 L 100 100 Z" />
            </svg>

            {/* Right concave fillet joining right edge of heading box to bottom baseline */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#0D0D0D] fill-current absolute bottom-0 right-0 transform translate-x-full pointer-events-none hidden sm:block"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M 0 0 A 100 100 0 0 0 100 100 L 0 100 Z" />
            </svg>

            {/* Role Title Heading (2-Line Editorial Composition) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-sans font-semibold tracking-[-0.035em] text-white leading-[1.06] text-balance [font-family:'Host_Grotesk',sans-serif]">
              <span className="block text-white/90 font-medium">
                {prefix}
              </span>
              <span className="block text-white font-semibold mt-0.5 sm:mt-1">
                {titlePart}
              </span>
            </h1>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. Bottom Baseline Bar                                            */}
        {/* Integrates title blob, photo bottom, and CTA blob into #0D0D0D     */}
        {/* ================================================================= */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#0D0D0D] z-10 pointer-events-none" />

        {/* ================================================================= */}
        {/* 5. Floating Bottom-Right Organic Blob CTA                         */}
        {/* "Tell me more about this role" with diagonal arrow icon           */}
        {/* ================================================================= */}
        <div className="absolute bottom-0 right-0 z-20">
          
          {/* Concave fillet SVG joining vertical left edge of CTA container to bottom baseline */}
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-[#0D0D0D] fill-current absolute bottom-0 -left-8 sm:-left-10 pointer-events-none hidden sm:block"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <path d="M 100 0 A 100 100 0 0 1 0 100 L 100 100 Z" />
          </svg>

          {/* CTA Container with signature rounded top-left corner */}
          <div className="bg-[#0D0D0D] rounded-tl-2xl sm:rounded-tl-3xl lg:rounded-tl-[36px] pl-4 sm:pl-7 pr-4 sm:pr-8 pt-3.5 sm:pt-5 pb-3.5 sm:pb-5 shadow-2xl">
            <BlobButton
              href="#career-details"
              onClick={scrollToDetails}
              size="sm"
              variant="dark"
              icon="arrow-down"
              ariaLabel="Scroll to role details"
            >
              Tell me more about this role
            </BlobButton>
          </div>
        </div>

      </div>
    </section>
  );
}
