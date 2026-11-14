"use client";

import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white selection:bg-[#CBFC6B] selection:text-[#111113]">
      {/* 1. MadeByShape-Inspired Contact Hero */}
      <ContactHero />

      {/* 2. Direct Two-Column Enquiry Form Section */}
      <ContactFormSection />
    </div>
  );
}
