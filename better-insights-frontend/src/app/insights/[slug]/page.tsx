import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/wordpress/api";
import { resolvePostImageUrl } from "@/lib/wordpress/images";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { SingleBlogHero } from "@/components/insights/SingleBlogHero";
import { BlogTableOfContents, TOCItem } from "@/components/insights/BlogTableOfContents";
import { BlogSocialShare } from "@/components/insights/BlogSocialShare";
import { BlogArticleContent } from "@/components/insights/BlogArticleContent";
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
import { BlobButton } from "@/components/ui/BlobButton";
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
  const rawImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imageUrl = resolvePostImageUrl(rawImageUrl, "/images/blog01.webp");

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
  const rawFeaturedImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const featuredImage = resolvePostImageUrl(rawFeaturedImage, "/images/blog01.webp");

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

  const rawAuthor = post._embedded?.author?.[0];
  const authorPayload = {
    name: rawAuthor?.name || authorName,
    role: rawAuthor?.description || "",
    image: rawAuthor?.avatar_urls?.["96"] || rawAuthor?.avatar_urls?.["48"] || "",
  };

  return (
    <>
      {/* Pinned Reading Progress Bar */}
      <ReadingProgress />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-[#0E0F10] text-[#E5E5E5] select-none pb-24 relative">
        {/* Ambient Subtle Lime Glow in Background */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(203,252,107,0.06)_0%,transparent_70%)] blur-[140px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Asymmetric MadeByShape-style Hero Section with Organic Blob Cut-out */}
        <SingleBlogHero
          title={rawTitle}
          featuredImage={featuredImage}
          readTime={readTime}
          categoryName={categoryName}
          categorySlug={categorySlug}
          date={post.date}
          author={authorPayload}
          articleUrl={articleUrl}
        />

        {/* 2. Main 3-Column Editorial Content Area (Reference: MadeByShape) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16 relative">
            
            {/* Left Column: Sticky Table of Contents */}
            {tocItems.length >= 1 ? (
              <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-28 lg:self-start z-10">
                <BlogTableOfContents items={tocItems} readTime={readTime} />
              </aside>
            ) : null}

            {/* Centre Column: Main Blog Article Content */}
            <main className="w-full flex-1 max-w-3xl lg:max-w-[760px] xl:max-w-[800px]">
              <BlogArticleContent
                html={processedHtml}
                date={post.date}
                excerpt={rawExcerpt}
                author={authorPayload}
              />

              {/* Article Bottom Actions */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-[#CBFC6B] transition-colors bi-focus-ring"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Browse All Articles</span>
                </Link>

                {/* Mobile / Tablet Horizontal Social Share Bar */}
                <div className="block lg:hidden">
                  <BlogSocialShare url={articleUrl} title={displayTitle} layout="horizontal" />
                </div>
              </div>
            </main>

            {/* Right Column: Sticky Social Sharing Icons (Desktop) */}
            <aside className="hidden lg:block w-12 xl:w-16 shrink-0 lg:sticky lg:top-28 lg:self-start z-10">
              <BlogSocialShare url={articleUrl} title={displayTitle} layout="vertical" />
            </aside>

          </div>
        </div>

        {/* 3. Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#CBFC6B] text-[11px] font-semibold border border-white/10 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                  Keep Exploring
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif]">
                  Related Perspectives
                </h3>
              </div>

              <Link
                href="/insights"
                className="text-xs font-semibold text-neutral-300 hover:text-[#CBFC6B] transition-colors flex items-center gap-1"
              >
                <span>View Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => {
                const relTitle = rel.title.rendered;
                const rawRelImage = rel._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const relImage = resolvePostImageUrl(rawRelImage, "/images/blog01.webp");
                const relCat =
                  rel._embedded?.["wp:term"]?.[0]?.[0]?.name ||
                  "Perspective";

                return (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.slug}`}
                    className="bi-insight-card bg-[#141518] rounded-[1.75rem] border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#CBFC6B]/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                        <Image
                          src={relImage}
                          alt={relTitle}
                          fill
                          className="bi-card-img object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md text-[#CBFC6B] text-[10px] font-semibold rounded-full border border-white/10">
                            {relCat.replace(/&amp;/g, "&")}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="text-sm font-semibold tracking-[-0.02em] text-white [font-family:'Host_Grotesk',sans-serif] leading-snug group-hover:text-[#CBFC6B] transition-colors line-clamp-2">
                          {relTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-1 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover:text-[#CBFC6B] transition-colors">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. Bottom Conversion / Consultation CTA */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="bg-gradient-to-br from-[#16171B] to-[#0E0F10] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
            <div 
              className="absolute -top-24 -right-24 w-80 h-80 bg-[#CBFC6B]/10 rounded-full blur-3xl pointer-events-none" 
              aria-hidden="true" 
            />
            
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                Let&apos;s Build What&apos;s Next
              </span>
              <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white [font-family:'Host_Grotesk',sans-serif] leading-tight mb-4">
                Ready to translate strategic insights into measurable growth?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-8">
                Connect with our team to discuss how AI automation, modern architecture, and customer conversion strategy can transform your business.
              </p>
              
              <BlobButton
                href="/contact"
                size="md"
                icon="arrow-up-right"
              >
                Start a Conversation
              </BlobButton>
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
