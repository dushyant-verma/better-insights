"use client";

import React, { useState } from "react";
import { CultureHero } from "@/components/culture/CultureHero";
import { CultureWorkplace } from "@/components/culture/CultureWorkplace";
import { CultureEthos } from "@/components/culture/CultureEthos";
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

      {/* 2. Our People & Workplace Culture */}
      <CultureWorkplace />

      {/* 3. Our Culture & Ethos (Editorial Layout & Brand Quote) */}
      <CultureEthos />

      {/* 4. Culture by the Numbers */}
      <CultureStats />

      {/* 5. Our Philosophy */}
      <CulturePhilosophy />

      {/* 6. Meet the People */}
      <CulturePeople onSelectMember={(member) => setSelectedMember(member)} />

      {/* 7. Feel the Atmosphere (Flagship Visual Scrapbook Gallery) */}
      <CultureAtmosphere />

      {/* 8. What Matters to Us (Core Values) */}
      <CultureValues />

      {/* 9. Join Our Team Closing CTA */}
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

