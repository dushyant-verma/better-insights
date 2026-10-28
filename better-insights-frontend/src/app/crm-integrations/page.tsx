import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

export const metadata: Metadata = {
  title: "CRM & Enterprise Integrations | Better Insights",
  description:
    "Seamless implementations, automated pipelines, and custom API middleware across HubSpot, Salesforce, Zoho, and business platforms.",
  alternates: {
    canonical: "/services/crm-integrations",
  },
};

export default function CrmIntegrationsPage() {
  const service = getServiceBySlug("crm-integrations");
  if (!service) notFound();
  return <SingleServiceTemplate service={service} />;
}
