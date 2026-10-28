"use client";

import React, { useState } from "react";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersPhilosophy } from "@/components/careers/CareersPhilosophy";
import { CareersDisciplines } from "@/components/careers/CareersDisciplines";
import { CareersOpenPositions } from "@/components/careers/CareersOpenPositions";
import { CareersProcess } from "@/components/careers/CareersProcess";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import { CareersCTA } from "@/components/careers/CareersCTA";
import { CareerModal } from "@/components/forms/CareerModal";
import "@/styles/careers.css";

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<{
    id: string;
    title: string;
    department: string;
  } | null>(null);

  // When a user clicks "Apply Now" on any job card:
  const handleSelectRole = (role: { id: string; title: string; department: string }) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  // When user clicks "Send Your Application" from closing CTA
  const handleOpenApplicationModal = () => {
    setSelectedRole({
      id: "general-application",
      title: "General / Open Application",
      department: "Leadership & Growth",
    });
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F3F2EF] text-black">
      {/* Section 1: Careers Hero */}
      <CareersHero />

      {/* Section 2: Why Work With Us / Philosophy */}
      <CareersPhilosophy />

      {/* Section 3: Practice Disciplines */}
      <CareersDisciplines />

      {/* Section 4: Verified Open Positions */}
      <CareersOpenPositions onSelectRole={handleSelectRole} />

      {/* Section 5: Candidate Journey / Process */}
      <CareersProcess />

      {/* Section 6: On-Page Application Form */}
      <CareersApplicationForm
        selectedRole={selectedRole}
        onClearSelectedRole={() => setSelectedRole(null)}
      />

      {/* Section 7: Closing CTA */}
      <CareersCTA onOpenApplication={handleOpenApplicationModal} />

      {/* Quick Application Modal (Popup) */}
      <CareerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPosition={selectedRole?.title || ""}
        defaultDepartment={selectedRole?.department || ""}
      />
    </main>
  );
}
