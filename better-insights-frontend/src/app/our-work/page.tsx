import React from "react";
import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";
import "@/styles/portfolio.css";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Better Insights",
  description:
    "Explore how Better Insights builds scalable digital experiences, custom AI workflows, and high-converting architectures for leading enterprises.",
  alternates: {
    canonical: "/work",
  },
};

export default function OurWorkPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCTA />
    </main>
  );
}
