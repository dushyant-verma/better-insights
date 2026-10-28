import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "Website Development & Headless Architecture | Better Insights",
  description:
    "Fast, scalable digital experiences designed for growth. Headless WordPress, Next.js, and high-converting e-commerce engineered for maximum performance.",
  alternates: {
    canonical: "/services/website-development",
  },
};

export default function WebsiteDevelopmentPage() {
  const service = getServiceBySlug("website-development");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
