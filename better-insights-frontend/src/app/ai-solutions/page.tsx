import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "AI Solutions & Automation | Better Insights",
  description:
    "Practical AI tools, intelligent workflows, and custom LLM agent integrations designed to eliminate operational friction and boost enterprise productivity.",
  alternates: {
    canonical: "/services/ai-automation",
  },
};

export default function AiSolutionsPage() {
  const service = getServiceBySlug("ai-automation");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
