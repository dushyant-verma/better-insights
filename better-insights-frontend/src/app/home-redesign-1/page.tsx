import React from "react";
import type { Metadata } from "next";
import { HomeRedesign1 } from "@/components/home/HomeRedesign1";

export const metadata: Metadata = {
  title: "Home Redesign 1 — Better Insights",
  description:
    "Better Insights Home Redesign 1: Independent homepage variant showcasing high-performance digital marketing, web engineering, and brand consulting.",
  alternates: {
    canonical: "/home-redesign-1",
  },
};

export default function HomeRedesign1Page() {
  return <HomeRedesign1 />;
}
