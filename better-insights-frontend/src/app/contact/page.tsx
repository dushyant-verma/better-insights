"use client";

import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactWays } from "@/components/contact/ContactWays";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactProcess } from "@/components/contact/ContactProcess";
import { ContactCTA } from "@/components/contact/ContactCTA";
import "@/styles/contact.css";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0] text-[#1B1411]">
      {/* Section 1: Contact Hero */}
      <ContactHero />

      {/* Section 2: Contact Information (contact__ways with 18px typography) */}
      <ContactWays />

      {/* Section 3: Fully Functional Contact Form */}
      <ContactFormSection />

      {/* Section 4: What Happens Next? (Discovery Process) */}
      <ContactProcess />

      {/* Section 5: Closing CTA */}
      <ContactCTA />
    </main>
  );
}
