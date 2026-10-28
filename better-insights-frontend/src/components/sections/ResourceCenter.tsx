"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { WPPost } from "@/types/wordpress";

interface ResourceCenterProps {
  posts?: WPPost[];
}

const FALLBACK_ARTICLES = [
  {
    title: "The Future of Enterprise AI: Beyond Automation to Intelligent Workflows",
    slug: "future-of-enterprise-ai",
    date: "OCTOBER 6, 2026",
    category: "AI & AUTOMATION",
    excerpt: "Discover how modern enterprises are integrating custom AI models and automated workflows to accelerate decision-making and eliminate operational friction.",
    image: "/images/blog01.webp",
  },
  {
    title: "Architecting Modern Digital Experiences for Measurable Growth",
    slug: "digital-experiences-growth",
    date: "OCTOBER 3, 2026",
    category: "DIGITAL GROWTH",
    excerpt: "How aligning design systems, user experience strategy, and scalable technology infrastructure drives higher conversion and audience retention.",
    image: "/images/blog02.webp",
  },
  {
    title: "Building Scalable Cloud Infrastructure for Modern Applications",
    slug: "scalable-cloud-infrastructure",
    date: "SEPTEMBER 28, 2026",
    category: "TECHNOLOGY & ENGINEERING",
    excerpt: "Key architectural principles for engineering resilient, cloud-native platforms that move business forward without sacrificing performance.",
    image: "/images/blog03.webp",
  },
];

export function ResourceCenter({ posts }: ResourceCenterProps) {
  // If posts are passed from WordPress, map them
  const articles = posts && posts.length >= 3
    ? posts.slice(0, 3).map((p, i) => ({
        title: p.title.rendered,
        slug: p.slug,
        date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase(),
        category: p._embedded?.["wp:term"]?.[0]?.[0]?.name || "INSIGHT",
        excerpt: p.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 140) + "...",
        image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || FALLBACK_ARTICLES[i % 3].image,
      }))
    : FALLBACK_ARTICLES;

  return (
    <section className="py-24 sm:py-32 bg-[#F3F2EF] text-black border-b border-black/10 select-none" aria-label="Resource Center & Insights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
              Resource Center
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
              More to explore.
            </h2>
          </div>

          <div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all hover:scale-105 shadow-md"
            >
              <span>Explore All Insights</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <Link
              key={item.slug}
              href={`/insights/${item.slug}`}
              className="bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-black/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-black/40 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-black leading-snug group-hover:text-black/80 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-black/60 leading-relaxed font-normal">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black group-hover:underline">
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
