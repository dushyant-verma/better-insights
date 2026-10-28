"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WPPost } from "@/types/wordpress";
import { ArrowUpRight, Calendar, Clock, Sparkles } from "lucide-react";

interface FeaturedInsightProps {
  post: WPPost;
}

export function FeaturedInsight({ post }: FeaturedInsightProps) {
  if (!post) return null;

  const title = post.title.rendered;
  const rawExcerpt = post.excerpt?.rendered 
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : "";
  const excerpt = rawExcerpt.length > 220 ? rawExcerpt.slice(0, 220) + "..." : rawExcerpt;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Strategic Perspective";
  const featuredImage = 
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 
    "/images/blog02.webp";

  // Calculate approximate reading time
  const contentText = (post.content?.rendered || post.excerpt?.rendered || "").replace(/<[^>]*>/g, "");
  const words = contentText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(2, Math.ceil(words / 180));

  return (
    <section className="py-14 sm:py-20 bg-[#FAF5F0] border-b border-black/8 select-none" aria-label="Featured Insight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#33CC7A]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F]">
            Featured Perspective
          </span>
        </div>

        {/* Editorial Feature Card */}
        <div className="bg-white rounded-[1.75rem] border border-black/8 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] bg-[#FAF5F0] overflow-hidden">
              <Link href={`/insights/${post.slug}`} className="block h-full w-full relative" tabIndex={-1} aria-hidden="true">
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-[#1B1411]/90 text-[#FAF5F0] backdrop-blur-md text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    Featured
                  </span>
                </div>
              </Link>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div>
                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-5">
                  <span className="px-3.5 py-1 bg-[#EEE5DC] text-[#1B1411] text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {categoryName}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#66574F] font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1411] leading-tight group-hover:text-[#33CC7A] transition-colors">
                  <Link href={`/insights/${post.slug}`}>
                    {title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-4 text-sm sm:text-base text-[#66574F] leading-relaxed font-normal">
                  {excerpt}
                </p>

                {/* Date */}
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#66574F]/70">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-6 border-t border-black/8 flex items-center justify-between">
                <Link
                  href={`/insights/${post.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#2BB86D] transition-all shadow-sm"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span className="text-[11px] font-semibold text-[#66574F] uppercase tracking-wider">
                  Full Analysis &rarr;
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
