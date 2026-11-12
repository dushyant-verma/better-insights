import React from "react";
import { CultureHero } from "@/components/culture/CultureHero";
import { CultureWorkplace } from "@/components/culture/CultureWorkplace";
import { CultureEthos } from "@/components/culture/CultureEthos";
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

      {/* 4. Feel the Atmosphere (Flagship Visual Scrapbook Gallery) */}
      <CultureAtmosphere />

      {/* 5. Join Our Team Closing CTA */}
      <CultureJoinCTA />
    </div>
  );
}
