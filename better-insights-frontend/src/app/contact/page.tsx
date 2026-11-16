"use client";

import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactWays } from "@/components/contact/ContactWays";
import { ContactProcess } from "@/components/contact/ContactProcess";
import { ContactCTA } from "@/components/contact/ContactCTA";
import "@/styles/contact.css";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white selection:bg-[#CBFC6B] selection:text-[#111113]">
      {/* 1. MadeByShape-Inspired Contact Hero (Preserved) */}
      <ContactHero />

      {/* 2. Direct Two-Column Enquiry Form Section (Preserved) */}
      <ContactFormSection />

      {/* 3. Direct Communication & Contact Ways (Restored) */}
      <ContactWays />

      {/* 4. Workflow & Discovery Process - What Happens Next (Restored) */}
      <ContactProcess />

      {/* 5. Closing Action Banner (Restored) */}
      <ContactCTA />
    </div>
  );
}
