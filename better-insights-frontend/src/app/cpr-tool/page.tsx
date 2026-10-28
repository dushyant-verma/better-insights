import React from "react";
import { CprHero } from "@/components/calculator/CprHero";
import { CprWorkspace } from "@/components/calculator/CprWorkspace";
import { CprFaq } from "@/components/calculator/CprFaq";
import { CprCTA } from "@/components/calculator/CprCTA";

export default function CprToolPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      {/* 1. Hero Section */}
      <CprHero />

      {/* 2. Interactive Calculator Workspace & Results Dashboard */}
      <CprWorkspace />

      {/* 3. Educational Methodology & Standards FAQ */}
      <CprFaq />

      {/* 4. Strategic Performance Audit CTA */}
      <CprCTA />
    </main>
  );
}
