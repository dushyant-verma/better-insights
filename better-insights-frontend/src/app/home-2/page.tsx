import React from "react";
import type { Metadata } from "next";
import { MergedHomepage } from "@/components/home/MergedHomepage";

export const metadata: Metadata = {
  title: "Home 2 — Better Insights",
  description:
    "Better Insights Home 2: Independent design studio homepage variant showcasing creative digital marketing, brand consulting, and web engineering.",
  alternates: {
    canonical: "/home-2",
  },
};

export default function Home2Page() {
  return <MergedHomepage />;
}

