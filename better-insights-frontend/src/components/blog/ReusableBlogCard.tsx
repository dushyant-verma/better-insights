"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WPPost } from "@/types/wordpress";
import { resolvePostImageUrl } from "@/lib/wordpress/images";

export interface ReusableBlogCardProps {
  post: WPPost;
  className?: string;
  isActive?: boolean;
  index?: number;
  showExcerpt?: boolean;
  aspectRatio?: "16/9" | "16/10";
  theme?: "dark" | "light";
  pocketBg?: string;
}

export const TEAM_AUTHORS = [
  { name: "Dushyant Verma", role: "Web Developer", image: "/team/photos/dushyant-verma-photo-v2.webp" },
  { name: "Jasika Saini", role: "SEO Analyst", image: "/team/photos/jasika-saini-photo.png" },
  { name: "Gautam Koli", role: "Founder & Director", image: "/team/photos/gautam-koli-photo.jpg" },
  { name: "Riya Balyan", role: "HR & Culture Manager", image: "/team/photos/riya-balyan-photo.png" },
  { name: "Priyanka Raghuvanshi", role: "Marketing Associate", image: "/team/photos/priyanka-raghuvanshi-photo.png" },
  { name: "Dinkey Lekhwani", role: "Business Development", image: "/team/photos/dinkey-lekhwani-photo.png" },
];

export function resolvePostAuthor(post: WPPost, index: number = 0) {
  const rawAuthor = post._embedded?.author?.[0];
  if (rawAuthor) {
    const name = rawAuthor.name;
    const avatar = rawAuthor.avatar_urls?.["96"] || rawAuthor.avatar_urls?.["48"];
    if (avatar) {
      return { name, role: rawAuthor.description || "Better Insights Team", image: avatar };
    }
  }

  const authorIndex = Math.abs((post.id || index) % TEAM_AUTHORS.length);
  return TEAM_AUTHORS[authorIndex];
}

export function cleanHtmlText(text: string): string {
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

export function calculateReadTime(post: WPPost): number {
  const content = post.content?.rendered || post.excerpt?.rendered || "";
  const words = cleanHtmlText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 190));
}

export function ReusableBlogCard({
  post,
  className = "",
  isActive = false,
  index = 0,
  showExcerpt = true,
  aspectRatio = "16/9",
  theme = "dark",
  pocketBg,
}: ReusableBlogCardProps) {
  const isDark = theme === "dark";
  const title = cleanHtmlText(post.title?.rendered || "Untitled Post");
  const rawExcerpt = cleanHtmlText(post.excerpt?.rendered || "");
  const excerpt = rawExcerpt.length > 140 ? rawExcerpt.slice(0, 140) + "..." : rawExcerpt;
  const readTime = calculateReadTime(post);
  const author = resolvePostAuthor(post, index);

  const rawImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const initialImage = resolvePostImageUrl(rawImage, "/images/blog01.webp");
  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  // Determine pocket and text colors
  const pocketBgClass = pocketBg
    ? ""
    : isDark
    ? "bg-[#0E0F10] text-[#0E0F10]"
    : "bg-[#FAF5F0] text-[#FAF5F0]";
  const pocketStyle = pocketBg ? { backgroundColor: pocketBg, color: pocketBg } : undefined;

  return (
    <article className={`flex flex-col group select-none ${className}`}>
      <Link
        href={`/insights/${post.slug}`}
        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBFC6B] rounded-[24px]"
      >
        {/* =============================================================== */}
        {/* 1. Interactive Thumbnail with Organic Corner Pocket & Global Custom Cursor */}
        {/* =============================================================== */}
        <div
          data-cursor-image="true"
          className={`blog-slider-thumb relative w-full rounded-2xl rounded-bl-lg lg:rounded-bl-2xl lg:rounded-3xl overflow-hidden ${
            isDark ? "bg-[#16161D]" : "bg-[#EDE6DD]"
          } mb-4 sm:mb-5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] ${
            aspectRatio === "16/10" ? "aspect-[16/10]" : "aspect-[16/9]"
          }`}
        >
          {/* Main Featured Image with Subtle Zoom Transition */}
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
            onError={() => setImgSrc("/images/blog01.webp")}
          />

          {/* ============================================================= */}
          {/* 1A. Author Avatar + Organic Corner Pocket (Exact MadeByShape Geometry) */}
          {/* Concave fillet SVGs seamlessly connect pocket to image boundaries */}
          {/* ============================================================= */}
          <div
            style={pocketStyle}
            className={`absolute bottom-0 left-0 z-20 ${pocketBgClass} rounded-tr-2xl lg:rounded-tr-3xl flex items-center justify-center pr-2 pt-2 lg:pr-3 lg:pt-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-full -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-events-none`}
            aria-hidden="true"
          >
            {/* Top Concave Fillet SVG */}
            <svg
              className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute top-px -left-px transform -translate-y-full rotate-180 pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
            </svg>

            {/* Right Concave Fillet SVG */}
            <svg
              className="w-10 h-10 lg:w-12 lg:h-12 fill-current absolute -bottom-px right-px transform translate-x-full rotate-180 pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z" />
            </svg>

            {/* Author Portrait Avatar Card */}
            <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl overflow-hidden bg-white shadow-md border border-white/10 shrink-0">
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* 2. Metadata (Bullet + Reading time)                             */}
        {/* =============================================================== */}
        <div
          className={`flex items-center gap-2 mb-2 sm:mb-2.5 text-xs sm:text-[13px] [font-family:'Host_Grotesk',sans-serif] ${
            isDark ? "text-white/50" : "text-[#66574F]/80"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isDark ? "bg-white/40" : "bg-[#1B1411]/50"
            }`}
            aria-hidden="true"
          />
          <span>{readTime} min read</span>
        </div>

        {/* =============================================================== */}
        {/* 3. Blog Title (Interactive highlight)                            */}
        {/* =============================================================== */}
        <h3
          className={`text-xl sm:text-2xl lg:text-[25px] font-semibold leading-[1.22] tracking-tight transition-colors duration-300 [font-family:'Host_Grotesk',sans-serif] line-clamp-2 mb-2 ${
            isActive
              ? "text-[#CBFC6B]"
              : isDark
              ? "text-white group-hover:text-[#CBFC6B]"
              : "text-[#1B1411] group-hover:text-[#0E0F10] group-hover:underline"
          }`}
        >
          {title}
        </h3>

        {/* =============================================================== */}
        {/* 4. Blog Excerpt (Optional 2-line clamp)                         */}
        {/* =============================================================== */}
        {showExcerpt && excerpt && (
          <p
            className={`text-sm sm:text-[15px] lg:text-[16px] font-light leading-relaxed line-clamp-2 [font-family:'Host_Grotesk',sans-serif] ${
              isDark ? "text-white/60" : "text-[#66574F]"
            }`}
          >
            {excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}

// Named alias for backward compatibility and drop-in replacement
export const BlogCard = ReusableBlogCard;
