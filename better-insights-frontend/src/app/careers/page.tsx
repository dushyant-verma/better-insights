"use client";

import React, { useState } from "react";
import { CareersHero } from "@/components/careers/CareersHero";
import { CultureTeamSlider } from "@/components/culture/CultureTeamSlider";
import { CultureAtmosphere } from "@/components/culture/CultureAtmosphere";
import { CareersOpenPositions } from "@/components/careers/CareersOpenPositions";
import { CareersBenefits } from "@/components/careers/CareersBenefits";
import { TeamSlider } from "@/components/about/TeamSlider";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import { TEAM_MEMBERS } from "@/data/teamData";
import { CultureBlogSlider } from "@/components/culture/CultureBlogSlider";
import { CareerModal } from "@/components/forms/CareerModal";
import "@/styles/culture-page.css";
import "@/styles/careers.css";

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<{
    id: string;
    title: string;
    department: string;
  } | null>(null);

  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  // When a user clicks any open position:
  const handleSelectRole = (role: { id: string; title: string; department: string }) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0E0F10] text-white">
      {/* 1. Careers Hero & 2. Horizontally Scrolling Team Gallery */}
      <CareersHero />

      {/* 3. Our Team – Testimonials with Two-Column Intro */}
      <CultureTeamSlider showLifeIntro={true} />

      {/* 4. Feel the Atmosphere – Flagship Visual Scrapbook Gallery */}
      <CultureAtmosphere />

      {/* 5. Open Positions – Job Listings & Stay on the Boss's Radar Promotional Card */}
      <CareersOpenPositions onSelectRole={handleSelectRole} />

      {/* 6. Benefits Section – A little more than just a workplace */}
      <CareersBenefits />

      {/* 7. Our Team – Multiple personalities, No egos Interactive Showcase */}
      <TeamSlider
        members={TEAM_MEMBERS}
        onSelectMember={(member) => setSelectedMember(member)}
        ctaHref="#open-positions"
      />

      {/* 8. Blog Showcase – A bit about our culture Carousel */}
      <CultureBlogSlider />

      {/* Quick Application Modal (Popup for applying to open roles) */}
      <CareerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPosition={selectedRole?.title || ""}
        defaultDepartment={selectedRole?.department || ""}
      />

      {/* Team Member Details Modal Dialog */}
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </main>
  );
}
