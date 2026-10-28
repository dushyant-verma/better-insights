import React from "react";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      {/* 1. Our Work Hero Section */}
      <PortfolioHero />

      {/* 2. Featured Projects & Interactive Filter Grid */}
      <PortfolioGrid />

      {/* 3. Closing Call to Action */}
      <PortfolioCTA />
    </main>
  );
}
