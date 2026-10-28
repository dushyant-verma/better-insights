import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/wordpress/api";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { TableOfContents, TOCItem } from "@/components/insights/TableOfContents";
import { ShareButtons } from "@/components/insights/ShareButtons";
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from "lucide-react";
import type { Metadata } from "next";
import "@/styles/insights.css";

export const revalidate = 60;

/**
 * Generate SEO metadata including OpenGraph, canonical URLs, and article tags.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | Better Insights" };
  }

  const title = post.title.rendered.replace(/&amp;/g, "&").replace(/&#8217;/g, "'");
  const excerpt = post.excerpt?.rendered 
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 160) 
    : "";
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/blog01.webp";

  return {
    title: `${title} | Better Insights`,
    description: excerpt,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      title,
      description: excerpt,
      url: `https://betterinsights.in/insights/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: ["Better Insights Research Team"],
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: [imageUrl],
    },
  };
}

/**
 * Helper to extract H2/H3 headings and inject matching IDs into the HTML for TOC navigation.
 */
function processArticleContent(rawHtml: string): { processedHtml: string; tocItems: TOCItem[] } {
  const tocItems: TOCItem[] = [];
  const headingRegex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;

  const processedHtml = rawHtml.replace(headingRegex, (match, levelStr, attrs, innerText) => {
    const level = parseInt(levelStr, 10);
    // Strip inner HTML tags from heading text
    const cleanText = innerText.replace(/<[^>]*>/g, "").trim();
    if (!cleanText) return match;

    // Create a URL-safe anchor ID
    const slugId = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50);

    tocItems.push({
      id: slugId,
      text: cleanText.replace(/&amp;/g, "&").replace(/&#8217;/g, "'"),
      level,
    });

    // Check if an ID already exists in attributes
    if (/id=["'][^"']+["']/i.test(attrs)) {
      return match;
    }

    return `<h${level} id="${slugId}"${attrs}>${innerText}</h${level}>`;
  });

  return { processedHtml, tocItems };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rawTitle = post.title.rendered;
  const displayTitle = rawTitle.replace(/&amp;/g, "&").replace(/&#8217;/g, "'");

  const rawExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : "";

  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName = post._embedded?.author?.[0]?.name || "Better Insights Research Team";
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Strategy";
  const categorySlug = post._embedded?.["wp:term"]?.[0]?.[0]?.slug || "";
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/blog01.webp";

  // Calculate accurate reading time (190 words/min)
  const contentPlainText = (post.content?.rendered || "").replace(/<[^>]*>/g, "");
  const wordCount = contentPlainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(2, Math.ceil(wordCount / 190));

  // Process Headings & Table of Contents
  const { processedHtml, tocItems } = processArticleContent(post.content?.rendered || "");

  // Fetch 3 related posts
  const { posts: allPosts } = await getPosts({ perPage: 12 });
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Article Structured Data (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayTitle,
    description: rawExcerpt,
    image: featuredImage,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://betterinsights.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Better Insights",
      logo: {
        "@type": "ImageObject",
        url: "https://betterinsights.in/logos/better-insights-logo-6.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://betterinsights.in/insights/${slug}`,
    },
  };

  const articleUrl = `https://betterinsights.in/insights/${slug}`;

  return (
    <>
      {/* Pinned Reading Progress Bar */}
      <ReadingProgress />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-[linear-gradient(180deg,#F5EFFB_0%,#FAF8F5_28%,#FAF5F0_100%)] text-[#1B1411] select-none pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        {/* Ambient Subtle Radial Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(108,60,255,0.07)_0%,transparent_70%)] blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        
        {/* Breadcrumb Navigation & Top Metadata */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#1B1411]/50 font-mono">
              <li>
                <Link href="/" className="hover:text-[#1B1411] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#1B1411] transition-colors">
                  Insights
                </Link>
              </li>
              {categorySlug && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li>
                    <Link
                      href={`/insights?category=${categorySlug}`}
                      className="hover:text-[#1B1411] transition-colors"
                    >
                      {categoryName.replace(/&amp;/g, "&")}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B1411]/70 hover:text-[#1B1411] transition-colors bi-focus-ring"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Insights</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1B1411] text-[11px] font-semibold border border-black/10 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                {categoryName.replace(/&amp;/g, "&")}
              </span>
              <ShareButtons url={articleUrl} title={displayTitle} />
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-[1.08] mb-6"
            dangerouslySetInnerHTML={{ __html: rawTitle }}
          />

          {rawExcerpt && (
            <p className="text-base sm:text-xl text-[#1B1411]/70 font-normal leading-relaxed mb-8 max-w-3xl border-l-2 border-[#33CC7A] pl-4">
              {rawExcerpt}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#1B1411]/60 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1B1411] text-white text-[10px] font-semibold flex items-center justify-center">
                BI
              </div>
              <span className="font-semibold text-[#1B1411]/80">{authorName}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-black/40" />
              <time dateTime={post.date}>{dateFormatted}</time>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-black/40" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="relative aspect-[16/9] w-full rounded-[1.75rem] overflow-hidden bg-black/5 border border-black/10 shadow-xl">
            <Image
              src={featuredImage}
              alt={displayTitle}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>
        </div>

        {/* Main Content Area with Table of Contents Layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            
            {/* Left Column: Sticky Table of Contents */}
            {tocItems.length >= 2 && <TableOfContents items={tocItems} />}

            {/* Right Column: Article Prose */}
            <div className="flex-1 w-full max-w-3xl">
              <div
                className="bg-white rounded-[1.75rem] p-7 sm:p-12 lg:p-14 border border-black/10 shadow-2xs bi-prose"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              {/* Author / Consultancy Footer Card */}
              <div className="mt-12 p-8 bg-white rounded-[1.75rem] border border-black/10 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-[#1B1411] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  BI
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B1411]/40">
                      Author Profile
                    </span>
                  </div>
                  <h4 className="text-base font-semibold tracking-tight text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                    Published by {authorName}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1B1411]/60 mt-2 leading-relaxed">
                    Better Insights is an artificial intelligence, digital growth strategy, and engineering consultancy helping forward-thinking enterprises design and scale what&apos;s next.
                  </p>
                </div>
              </div>

              {/* Article Bottom Actions */}
              <div className="mt-8 flex items-center justify-between pb-8 border-b border-black/10">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B1411] hover:text-[#33CC7A] transition-colors bi-focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Browse All Articles</span>
                </Link>

                <ShareButtons url={articleUrl} title={displayTitle} />
              </div>
            </div>

          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-black/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1B1411] text-[11px] font-semibold border border-black/10 shadow-2xs mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                  Keep Exploring
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  Related Perspectives
                </h3>
              </div>

              <Link
                href="/insights"
                className="text-xs font-semibold text-[#1B1411] hover:text-[#33CC7A] transition-colors flex items-center gap-1"
              >
                <span>View Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => {
                const relTitle = rel.title.rendered;
                const relImage =
                  rel._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/images/blog01.webp";
                const relCat =
                  rel._embedded?.["wp:term"]?.[0]?.[0]?.name ||
                  "Perspective";

                return (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.slug}`}
                    className="bi-insight-card bg-white rounded-[1.75rem] border border-black/10 overflow-hidden shadow-2xs hover:shadow-xl hover:border-black/20 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-black/5 overflow-hidden">
                        <Image
                          src={relImage}
                          alt={relTitle}
                          fill
                          className="bi-card-img object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-0.5 bg-white/95 text-[#1B1411] text-[9px] font-semibold rounded-full shadow-sm">
                            {relCat.replace(/&amp;/g, "&")}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="text-sm font-semibold tracking-[-0.02em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] leading-snug group-hover:text-[#33CC7A] transition-colors line-clamp-2">
                          {relTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-1 flex items-center justify-between text-[11px] font-semibold text-[#1B1411] group-hover:text-[#33CC7A] transition-colors">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Conversion / Consultation CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-8 sm:p-12 lg:p-16 border border-white/10 shadow-xl relative overflow-hidden">
            <div 
              className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                Let&apos;s Build What&apos;s Next
              </span>
              <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif] leading-tight mb-4">
                Ready to translate strategic insights into measurable growth?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-8">
                Connect with our team to discuss how AI automation, modern architecture, and customer conversion strategy can transform your business.
              </p>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] hover:gap-3 transition-all shadow-md bi-focus-ring"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
