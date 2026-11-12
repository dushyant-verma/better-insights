"use client";

import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactProcess } from "@/components/contact/ContactProcess";
import { ContactCTA } from "@/components/contact/ContactCTA";
import "@/styles/contact.css";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0] text-[#1B1411]">
      {/* 1. Premium Editorial Hero Banner */}
      <ContactHero />

      {/* 2. Direct Two-Column Enquiry Form & Contact Information Section */}
      <ContactFormSection />

      {/* 3. Workflow & Discovery Process (What Happens Next) */}
      <ContactProcess />

      {/* 4. Closing Action Banner */}
      <ContactCTA />
    </main>
  );
}
