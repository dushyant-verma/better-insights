import React from "react";
import type { Metadata } from "next";
import { getPosts, getCategories } from "@/lib/wordpress/api";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { FeaturedInsight } from "@/components/insights/FeaturedInsight";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { InsightsCTA } from "@/components/insights/InsightsCTA";
import "@/styles/insights.css";

export const metadata: Metadata = {
  title: "Insights & Perspectives | Better Insights",
  description:
    "Explore strategic perspectives, practical guidance, and emerging ideas across digital growth, marketing, AI, technology, and business transformation.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Perspectives | Better Insights",
    description:
      "Explore strategic perspectives, practical guidance, and emerging ideas across digital growth, marketing, AI, technology, and business transformation.",
    url: "https://betterinsights.in/insights",
    type: "website",
    siteName: "Better Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Perspectives | Better Insights",
    description:
      "Explore strategic perspectives, practical guidance, and emerging ideas across digital growth, marketing, AI, technology, and business transformation.",
  },
};

export const revalidate = 60;

export default async function InsightsLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;

  // Fetch full list of posts and published categories
  const [{ posts }, categories] = await Promise.all([
    getPosts({ perPage: 100 }),
    getCategories(),
  ]);

  // Designate the flagship / featured post (prefer agentic AI post or the first post)
  const featuredPost =
    posts.find((p) => p.slug === "agentic-ai-workflow-automation-productivity") ||
    posts[0];

  // Pass remaining posts to explorer
  const explorerPosts = posts;

  return (
    <main className="min-h-screen bg-[#FAF5F0] text-[#1B1411]">
      {/* Section A — Insights Hero */}
      <InsightsHero />

      {/* Section B — Featured Insight Spotlight */}
      {featuredPost && <FeaturedInsight post={featuredPost} />}

      {/* Section C & D — Browse by Category & Latest Insights Grid */}
      <InsightsExplorer
        initialPosts={explorerPosts}
        categories={categories}
        initialCategorySlug={categorySlug}
      />

      {/* Section E — Newsletter / Consultation CTA */}
      <InsightsCTA />
    </main>
  );
}
