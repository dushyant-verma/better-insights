"use client";

import React, { useState } from "react";
import { TeamSlider } from "@/components/about/TeamSlider";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import { TEAM_MEMBERS } from "@/data/teamData";

export function SingleCareerTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  return (
    <div className="relative w-full">
      <TeamSlider
        members={TEAM_MEMBERS}
        onSelectMember={(member) => setSelectedMember(member)}
        ctaHref="#apply"
      />

      {/* Team Member Details Modal Dialog */}
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

