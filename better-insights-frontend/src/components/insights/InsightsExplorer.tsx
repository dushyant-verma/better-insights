"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { WPPost, WPCategory } from "@/types/wordpress";
import { Calendar, Clock, ArrowUpRight, Filter, ChevronRight } from "lucide-react";
import { resolvePostImageUrl } from "@/lib/wordpress/images";

interface InsightsExplorerProps {
  initialPosts: WPPost[];
  categories: WPCategory[];
  initialCategorySlug?: string;
}

const POSTS_PER_PAGE = 9;

export function InsightsExplorer({
  initialPosts,
  categories,
  initialCategorySlug,
}: InsightsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || initialCategorySlug || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);

  // Synchronize when URL search param changes
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setSelectedCategory(cat);
    setVisibleCount(POSTS_PER_PAGE);
  }, [searchParams]);

  // Filter categories to only those with content > 0 (excluding uncategorized if 0)
  const activeCategories = useMemo(() => {
    return categories.filter((c) => c.count > 0 && c.slug !== "uncategorized");
  }, [categories]);

  // Handle category selection
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setVisibleCount(POSTS_PER_PAGE);

    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    const newQuery = params.toString() ? `?${params.toString()}` : "";
    window.history.pushState(null, "", `/insights${newQuery}`);
  };

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return initialPosts;
    }
    return initialPosts.filter((post) => {
      const postTerms = post._embedded?.["wp:term"]?.[0] || [];
      return postTerms.some((term) => term.slug === selectedCategory);
    });
  }, [initialPosts, selectedCategory]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  return (
    <section id="bi-insights-feed" className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#66574F] text-xs font-mono mb-2">
              <Filter className="w-3.5 h-3.5 text-[#33CC7A]" />
              <span className="uppercase tracking-widest font-semibold">Browse Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1B1411]">
              Latest insights
            </h2>
          </div>

          <div className="text-xs text-[#66574F] font-mono">
            Showing <span className="font-bold text-[#1B1411]">{visiblePosts.length}</span> of{" "}
            <span className="font-bold text-[#1B1411]">{filteredPosts.length}</span> Published Perspectives
          </div>
        </div>

        {/* Category Pills Scroller */}
        <div className="relative mb-12">
          <div className="bi-category-scroller flex items-center gap-2 overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {/* "All Topics" Pill */}
            <button
              type="button"
              onClick={() => handleSelectCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-[#1B1411] text-[#FAF5F0] shadow-sm scale-105"
                  : "bg-white text-[#66574F] hover:text-[#1B1411] border border-black/8 hover:border-black/20"
              }`}
            >
              All Topics ({initialPosts.length})
            </button>

            {/* Individual Category Pills */}
            {activeCategories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-[#1B1411] text-[#FAF5F0] shadow-sm scale-105"
                      : "bg-white text-[#66574F] hover:text-[#1B1411] border border-black/8 hover:border-black/20"
                  }`}
                >
                  {cat.name.replace(/&amp;/g, "&")} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Posts Grid */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[1.75rem] border border-black/8 p-8">
            <p className="text-sm text-[#66574F] mb-4">No articles found in this category.</p>
            <button
              type="button"
              onClick={() => handleSelectCategory("all")}
              className="px-6 py-2.5 bg-[#1B1411] text-[#FAF5F0] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-all"
            >
              View All Topics
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B1411] text-[#FAF5F0] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <span>Load More Perspectives</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const title = post.title.rendered;
  const rawExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : "";
  const excerpt = rawExcerpt.length > 135 ? rawExcerpt.slice(0, 135) + "..." : rawExcerpt;

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const rawImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const initialImage = resolvePostImageUrl(rawImage, "/images/blog01.webp");
  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  const catName =
    post._embedded?.["wp:term"]?.[0]?.[0]?.name ||
    "Perspective";

  // Reading time calculation
  const words = (post.content?.rendered || rawExcerpt).replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(2, Math.ceil(words / 190));

  return (
    <article className="bg-white rounded-[1.75rem] border border-black/8 overflow-hidden flex flex-col justify-between group shadow-sm hover:border-black/20 hover:shadow-md transition-all duration-300">
      <div>
        {/* Featured Image */}
        <Link
          href={`/insights/${post.slug}`}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF5F0] block"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgSrc("/images/blog01.webp")}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#1B1411] text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-sm">
              {catName.replace(/&amp;/g, "&")}
            </span>
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#66574F]/70 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#33CC7A]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min read</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[#1B1411] leading-snug group-hover:text-[#33CC7A] transition-colors">
            <Link href={`/insights/${post.slug}`}>
              {title}
            </Link>
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-[#66574F] leading-relaxed font-normal">
            {excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-7 pt-0 border-t border-black/5 mt-4 flex items-center justify-between">
        <Link
          href={`/insights/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors"
        >
          <span>Read Perspective</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

