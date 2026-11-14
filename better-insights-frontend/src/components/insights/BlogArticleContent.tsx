"use client";

import React from "react";
import Image from "next/image";
import { resolveAuthorProfile, SingleBlogHeroAuthor } from "./SingleBlogHero";

interface BlogArticleContentProps {
  html: string;
  date?: string;
  excerpt?: string;
  author?: SingleBlogHeroAuthor;
}

export function BlogArticleContent({
  html,
  date,
  excerpt,
  author,
}: BlogArticleContentProps) {
  const authorData = resolveAuthorProfile(author);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently Updated";

  return (
    <div className="w-full">
      {/* Date Pill Badge (matching reference: "Updated on 23 Oct 2026") */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-light tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
          Updated on {formattedDate}
        </span>
      </div>

      {/* Optional Editorial Lead Excerpt */}
      {excerpt && (
        <div className="mb-8 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed border-l-2 border-[#CBFC6B] pl-4">
          {excerpt}
        </div>
      )}

      {/* Main Prose Content */}
      <div
        className="bi-prose-dark w-full max-w-none text-[#D4D4D8] leading-relaxed select-text"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Author Profile Footer Card */}
      <div className="mt-16 p-8 bg-[#141518] rounded-[24px] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 select-none">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden relative shrink-0 shadow-md">
          <Image
            src={authorData.image}
            alt={authorData.name}
            fill
            sizes="64px"
            className="object-cover object-center"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#CBFC6B]">
              Author Profile
            </span>
          </div>
          <h4 className="text-base font-semibold tracking-tight text-white [font-family:'Host_Grotesk',sans-serif]">
            Published by {authorData.name}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
            Better Insights is an artificial intelligence, digital growth strategy, and engineering consultancy helping forward-thinking enterprises design and scale what&apos;s next.
          </p>
        </div>
      </div>
    </div>
  );
}

