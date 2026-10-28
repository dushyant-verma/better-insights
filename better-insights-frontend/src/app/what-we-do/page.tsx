import React from "react";
import type { Metadata } from "next";
import ServicesPage from "@/app/services/page";

export const metadata: Metadata = {
  title: "Services & Strategic Solutions | Better Insights",
  description:
    "Explore Better Insights enterprise capabilities spanning website development, CRM integrations, AI automation, digital growth, digital transformation, and software engineering.",
  alternates: {
    canonical: "/services",
  },
};

export default function WhatWeDoPage() {
  return <ServicesPage />;
}
