import React from "react";
import type { Metadata } from "next";
import { HomeRedesign1 } from "@/components/home/HomeRedesign1";

export const metadata: Metadata = {
  title: "Better Insights — Better Marketing, Better ROI",
  description:
    "Better Insights delivers measurable business growth and high ROI through search engine optimization, paid advertising, web design, and digital consulting in Pune, India.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeRedesign1 />;
}

