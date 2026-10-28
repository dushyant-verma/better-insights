import React from "react";
import { ClienteleHero } from "@/components/clientele/ClienteleHero";
import { ClienteleMarquee } from "@/components/clientele/ClienteleMarquee";
import { ClienteleDirectory } from "@/components/clientele/ClienteleDirectory";
import { ClienteleStories } from "@/components/clientele/ClienteleStories";
import { ClienteleApproach } from "@/components/clientele/ClienteleApproach";
import { ClienteleCTA } from "@/components/clientele/ClienteleCTA";

export default function OurClientelePage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      {/* 1. Hero Section */}
      <ClienteleHero />

      {/* 2. Client Logo Marquee Strip */}
      <ClienteleMarquee />

      {/* 3. Industry Directory with Interactive Filtering */}
      <ClienteleDirectory />

      {/* 4. Selected Client Stories & Case Study Links */}
      <ClienteleStories />

      {/* 5. Our Approach to Client Partnerships */}
      <ClienteleApproach />

      {/* 6. Closing Call to Action */}
      <ClienteleCTA />
    </main>
  );
}
