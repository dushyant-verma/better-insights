import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "Digital Growth & Performance Marketing | Better Insights",
  description:
    "Data-driven search strategy, high-velocity PPC acquisition, and conversion rate optimization engineered to turn attention into profitable revenue.",
  alternates: {
    canonical: "/services/digital-growth",
  },
};

export default function DigitalGrowthPage() {
  const service = getServiceBySlug("digital-growth");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
