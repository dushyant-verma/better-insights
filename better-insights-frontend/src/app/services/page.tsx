import React from "react";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesOverview } from "@/components/services/ServicesOverview";
import { ServicesApproach } from "@/components/services/ServicesApproach";
import { ServicesSynergy } from "@/components/services/ServicesSynergy";
import { ServicesWork } from "@/components/services/ServicesWork";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesCTA } from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <ServicesHero />

      {/* Section 2: Services Overview */}
      <ServicesOverview id="services-overview" />

      {/* Section 3: Our Approach */}
      <ServicesApproach />

      {/* Section 4: How Our Services Work Together */}
      <ServicesSynergy />

      {/* Section 5: Relevant Work */}
      <ServicesWork />

      {/* Section 6: Frequently Asked Questions */}
      <ServicesFaq />

      {/* Section 7: Closing CTA */}
      <ServicesCTA />
    </main>
  );
}
