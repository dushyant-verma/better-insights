import React from "react";
import type { Metadata } from "next";
import { ClienteleHero } from "@/components/clientele/ClienteleHero";
import { ClienteleMarquee } from "@/components/clientele/ClienteleMarquee";
import { ClienteleDirectory } from "@/components/clientele/ClienteleDirectory";
import { ClienteleStories } from "@/components/clientele/ClienteleStories";
import { ClienteleApproach } from "@/components/clientele/ClienteleApproach";
import { ClienteleCTA } from "@/components/clientele/ClienteleCTA";
import "@/styles/clientele.css";

export const metadata: Metadata = {
  title: "Our Clientele & Partners | Better Insights",
  description:
    "Explore the enterprises, healthcare networks, e-commerce brands, and educational institutions partnered with Better Insights.",
  alternates: {
    canonical: "/our-clientele",
  },
};

export default function ClientelePage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      <ClienteleHero />
      <ClienteleMarquee />
      <ClienteleDirectory />
      <ClienteleStories />
      <ClienteleApproach />
      <ClienteleCTA />
    </main>
  );
}
