"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WPPost } from "@/types/wordpress";
import { STATIC_POSTS } from "@/lib/wordpress/static-posts";
import { resolvePostImageUrl } from "@/lib/wordpress/images";
import { getGSAP } from "@/lib/gsap";
import { BlobButton } from "@/components/ui/BlobButton";
import { ReusableBlogCard } from "@/components/blog/ReusableBlogCard";

export interface CultureBlogSliderProps {
  initialPosts?: WPPost[];
  className?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  currentSlug?: string;
}





export function CultureBlogSlider({
  initialPosts,
  className = "",
  eyebrow = "Blog",
  heading = (
    <>
      A bit about<br />our culture
    </>
  ),
  ctaText = "View the Blog",
  ctaHref = "/insights",
  currentSlug,
}: CultureBlogSliderProps) {
  // Use dynamically supplied posts or robust static posts fallback
  const rawPosts = initialPosts && initialPosts.length > 0 ? initialPosts : STATIC_POSTS;
  
  // Filter out current post if rendering on single blog page
  const posts = (currentSlug ? rawPosts.filter((p) => p.slug !== currentSlug) : rawPosts).slice(
    0,
    8
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Check scroll boundary to update disabled button states and active index
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 8);

    const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 32 : 420;
    const currentIdx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(posts.length - 1, currentIdx)));
  }, [posts.length]);

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
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-blog-slider"
      className={`py-20 sm:py-28 lg:py-32 bg-[#0E0F10] text-white relative overflow-hidden select-none ${className}`}
      aria-label="Blog posts showcase slider"
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
                  {eyebrow}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-semibold tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif] text-balance mb-6 sm:mb-8">
                {heading}
              </h2>

              {/* Lime Green Pill CTA with External Arrow */}
              <BlobButton
                href={ctaHref}
                size="md"
                icon="arrow-up-right"
              >
                {ctaText}
              </BlobButton>
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
              {posts.map((post, idx) => (
                <ReusableBlogCard
                  key={post.id || post.slug}
                  post={post}
                  isActive={idx === activeIndex}
                  index={idx}
                  className="w-[82vw] max-w-[340px] sm:w-[360px] md:w-[380px] lg:w-[400px] xl:w-[420px] shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named alias export for flexibility
export const BlogSlider = CultureBlogSlider;
