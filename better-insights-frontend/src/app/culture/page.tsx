import React from "react";
import { CultureHero } from "@/components/culture/CultureHero";
import { CultureWorkplace } from "@/components/culture/CultureWorkplace";
import { CultureEthos } from "@/components/culture/CultureEthos";
import { CultureStackedCards } from "@/components/culture/CultureStackedCards";
import { CultureTeamSlider } from "@/components/culture/CultureTeamSlider";
import { CultureAtmosphere } from "@/components/culture/CultureAtmosphere";
import { CultureJoinCTA } from "@/components/culture/CultureJoinCTA";
import "@/styles/culture-page.css";

export default function CulturePage() {
  return (
    <div className="bi-culture-page">
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

      {/* 6. Feel the Atmosphere (Flagship Visual Scrapbook Gallery) */}
      <CultureAtmosphere />

      {/* 7. Join Our Team Closing CTA */}
      <CultureJoinCTA />
    </div>
  );
}
