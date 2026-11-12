"use client";

import React, { useState } from "react";
import { CultureHero } from "@/components/culture/CultureHero";
import { CultureIntro } from "@/components/culture/CultureIntro";
import { CultureStats } from "@/components/culture/CultureStats";
import { CulturePhilosophy } from "@/components/culture/CulturePhilosophy";
import { CulturePeople } from "@/components/culture/CulturePeople";
import { CultureAtmosphere } from "@/components/culture/CultureAtmosphere";
import { CultureValues } from "@/components/culture/CultureValues";
import { CultureJoinCTA } from "@/components/culture/CultureJoinCTA";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import "@/styles/culture-page.css";

export default function CulturePage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  return (
    <div className="bi-culture-page">
      {/* 1. Immersive Hero */}
      <CultureHero />

      {/* 2. Culture Introduction */}
      <CultureIntro />

      {/* 3. Culture by the Numbers */}
      <CultureStats />

      {/* 4. Our Philosophy */}
      <CulturePhilosophy />

      {/* 5. Meet the People */}
      <CulturePeople onSelectMember={(member) => setSelectedMember(member)} />

      {/* 6. Feel the Atmosphere (Flagship Visual Scrapbook Gallery) */}
      <CultureAtmosphere />

      {/* 7. What Matters to Us (Core Values) */}
      <CultureValues />

      {/* 8. Join Our Team Closing CTA */}
      <CultureJoinCTA />

      {/* Interactive Team Member Details Modal Dialog */}
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

