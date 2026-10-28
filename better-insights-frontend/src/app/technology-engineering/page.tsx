import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "Technology & Software Engineering | Better Insights",
  description:
    "Enterprise web development, cloud architecture, and custom API systems built for speed, reliability, and scale.",
  alternates: {
    canonical: "/services/technology-engineering",
  },
};

export default function TechnologyEngineeringPage() {
  const service = getServiceBySlug("technology-engineering");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
