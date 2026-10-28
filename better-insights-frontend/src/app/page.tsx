import React from "react";
import type { Metadata } from "next";
import { MergedHomepage } from "@/components/home/MergedHomepage";

export const metadata: Metadata = {
  title: "Better Insights — Better Marketing, Better ROI",
  description:
    "Better Insights delivers measurable business growth and high ROI through search engine optimization, paid advertising, web design, and digital consulting in Pune, India.",
};

export default function HomePage() {
  return <MergedHomepage />;
}
