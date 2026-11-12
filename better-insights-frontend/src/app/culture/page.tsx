import React from "react";
import { CultureHero } from "@/components/culture/CultureHero";
import { CultureWorkplace } from "@/components/culture/CultureWorkplace";
import { CultureEthos } from "@/components/culture/CultureEthos";
import { CultureStackedCards } from "@/components/culture/CultureStackedCards";
import { CultureTeamSlider } from "@/components/culture/CultureTeamSlider";
import { CultureBlogSlider } from "@/components/culture/CultureBlogSlider";
import { CultureAtmosphere } from "@/components/culture/CultureAtmosphere";
import { CultureJoinCTA } from "@/components/culture/CultureJoinCTA";
import { getPosts } from "@/lib/wordpress/api";
import "@/styles/culture-page.css";

export const revalidate = 60;

export default async function CulturePage() {
  // Dynamically fetch WordPress blog posts (with resilient fallback to STATIC_POSTS)
  const { posts } = await getPosts({ perPage: 8 });

  return (
    <div className="bi-culture-page w-full max-w-full overflow-x-hidden bg-[#0D0D10] select-none">
      {/* 1. Immersive Hero */}
      <CultureHero />

      {/* 2. Our People & Workplace Culture */}
      <CultureWorkplace />

      {/* 3. Our Culture & Ethos (Editorial Layout & Brand Quote) */}
      <CultureEthos />

      {/* 4. What's Important to Us (Sticky Left + Stacked Cards Scroll Animation) */}
      <CultureStackedCards />

      {/* 5. Our Team Testimonials Slider (Interactive Avatar Switcher) */}
      <CultureTeamSlider />

      {/* 6. Blog Slider – A bit about our culture */}
      <CultureBlogSlider initialPosts={posts} />

      {/* 7. Feel the Atmosphere (Flagship Visual Scrapbook Gallery) */}
      <CultureAtmosphere />

      {/* 8. Join Our Team Closing CTA */}
      <CultureJoinCTA />
    </div>
  );
}
