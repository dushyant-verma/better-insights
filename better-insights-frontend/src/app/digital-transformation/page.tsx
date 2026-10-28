import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "Digital Transformation & Modernization | Better Insights",
  description:
    "Modernize operational workflows, legacy systems, and customer journeys to build a resilient, agile digital enterprise.",
  alternates: {
    canonical: "/services/digital-transformation",
  },
};

export default function DigitalTransformationPage() {
  const service = getServiceBySlug("digital-transformation");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
