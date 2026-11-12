"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WPPost } from "@/types/wordpress";
import { STATIC_POSTS } from "@/lib/wordpress/static-posts";
import { resolvePostImageUrl } from "@/lib/wordpress/images";
import { getGSAP } from "@/lib/gsap";

interface CultureBlogSliderProps {
  initialPosts?: WPPost[];
}

function cleanHtmlText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .trim();
}

function calculateReadTime(post: WPPost): number {
  const content = post.content?.rendered || post.excerpt?.rendered || "";
  const words = cleanHtmlText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 190));
}

function BlogCard({ post }: { post: WPPost }) {
  const title = cleanHtmlText(post.title?.rendered || "Untitled Post");
  const rawExcerpt = cleanHtmlText(post.excerpt?.rendered || "");
  const excerpt = rawExcerpt.length > 150 ? rawExcerpt.slice(0, 150) + "..." : rawExcerpt;
  const readTime = calculateReadTime(post);

  const rawImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const initialImage = resolvePostImageUrl(rawImage, "/images/blog01.webp");
  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  return (
    <article className="w-[82vw] max-w-[340px] sm:w-[360px] md:w-[380px] lg:w-[400px] xl:w-[420px] shrink-0 flex flex-col group select-none">
      <Link
        href={`/insights/${post.slug}`}
        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5FF68] rounded-[22px]"
      >
        {/* 1. Featured Image (16:9 Landscape with Rounded Corners) */}
        <div className="relative aspect-[16/9] w-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#16161D] mb-4 sm:mb-5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)]">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 420px"
            className="object-cover object-center transition-transform duration-600 ease-out group-hover:scale-105"
            onError={() => setImgSrc("/images/blog01.webp")}
          />
        </div>

        {/* 2. Blog Metadata (Grey bullet + estimated reading time) */}
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5 text-xs sm:text-[13px] text-white/50 [font-family:'Host_Grotesk',sans-serif]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" aria-hidden="true" />
          <span>{readTime} min read</span>
        </div>

        {/* 3. Blog Title (White, Medium weight, 2-line clamp) */}
        <h3 className="text-xl sm:text-2xl lg:text-[26px] xl:text-[27px] font-normal sm:font-medium text-white leading-[1.22] tracking-tight group-hover:text-[#C5FF68] transition-colors duration-300 [font-family:'Host_Grotesk',sans-serif] line-clamp-2 mb-2">
          {title}
        </h3>

        {/* 4. Blog Excerpt (Muted grey, 2-line clamp with ellipsis) */}
        <p className="text-sm sm:text-[15px] lg:text-[16px] text-white/60 font-light leading-relaxed line-clamp-2 [font-family:'Host_Grotesk',sans-serif]">
          {excerpt}
        </p>
      </Link>
    </article>
  );
}

export function CultureBlogSlider({ initialPosts }: CultureBlogSliderProps) {
  // Use dynamically supplied posts or robust static posts fallback
  const posts = (initialPosts && initialPosts.length > 0
    ? initialPosts
    : STATIC_POSTS
  ).slice(0, 8);

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Check scroll boundary to update disabled button states
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Programmatic smooth scroll for circular navigation arrows
  const handleScroll = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.firstElementChild
      ? (trackRef.current.firstElementChild as HTMLElement).offsetWidth + 32
      : 420;

    const scrollOffset = direction === "next" ? cardWidth : -cardWidth;
    trackRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  // GSAP scroll entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (trackRef.current) {
        gsap.from(trackRef.current, {
          opacity: 0,
          x: 40,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-blog-slider"
      className="py-20 sm:py-28 lg:py-32 bg-[#0B0B0D] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="A bit about our culture blog slider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14 xl:gap-16">
          {/* =============================================================== */}
          {/* 1. Left Column: Fixed Content Area (~25-26% width on desktop)  */}
          {/* =============================================================== */}
          <div
            ref={leftColRef}
            className="w-full lg:w-[26%] xl:w-[25%] shrink-0 flex flex-col justify-between"
          >
            {/* Top Area: Eyebrow + Heading + CTA */}
            <div>
              {/* Eyebrow label */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
                  Blog
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-normal tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif] text-balance mb-6 sm:mb-8">
                A bit about<br />our culture
              </h2>

              {/* Lime-Green Pill CTA with External Arrow */}
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5FF68] text-[#101112] font-medium text-sm tracking-tight hover:bg-[#b5f54e] transition-all duration-300 w-fit group/btn shadow-[0_4px_16px_rgba(197,255,104,0.18)]"
              >
                <span>View the Blog</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>

            {/* Bottom Area: Circular Navigation Buttons (← / →) */}
            <div className="flex items-center gap-3 mt-8 lg:mt-auto pt-6 lg:pt-8">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                disabled={!canScrollPrev}
                aria-label="Previous blog cards"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 ${
                  canScrollPrev
                    ? "bg-white/5 hover:bg-white/15 text-white hover:border-white/30 cursor-pointer active:scale-95"
                    : "bg-white/[0.02] text-white/20 border-white/8 cursor-not-allowed"
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handleScroll("next")}
                disabled={!canScrollNext}
                aria-label="Next blog cards"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 ${
                  canScrollNext
                    ? "bg-white/5 hover:bg-white/15 text-white hover:border-white/30 cursor-pointer active:scale-95"
                    : "bg-white/[0.02] text-white/20 border-white/8 cursor-not-allowed"
                }`}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 2. Right Column: Horizontal Blog Slider Track                    */}
          {/* =============================================================== */}
          <div className="flex-1 min-w-0 relative">
            <div
              ref={trackRef}
              className="flex flex-nowrap items-stretch gap-7 sm:gap-8 overflow-x-auto scrollbar-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth touch-pan-x"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
              role="region"
              aria-label="Blog posts carousel"
            >
              {posts.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
