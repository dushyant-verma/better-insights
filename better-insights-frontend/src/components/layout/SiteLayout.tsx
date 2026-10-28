"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MergedHeader } from "@/components/navigation/MergedHeader";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/navigation/SearchModal";
import { LeadModal } from "@/components/forms/LeadModal";
import { FloatingWhatsApp } from "@/components/navigation/FloatingWhatsApp";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setLeadModalOpen(true);
    window.addEventListener("bi:open-lead-modal", handleOpen);
    return () => window.removeEventListener("bi:open-lead-modal", handleOpen);
  }, []);

  const isCustomLayout = pathname === "/" || pathname === "/home-redesign-1";

  if (isCustomLayout) {
    return (
      <>
        {children}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} />
        <FloatingWhatsApp />
        <FloatingChatbot />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF5F0] text-[#1B1411] bi-scope">
      {/* Global Shared Header (Exact Homepage Design) */}
      <MergedHeader />

      {/* Main Page Content: starts at top edge under floating fixed header */}
      <main className="flex-1 w-full">{children}</main>

      {/* Global Shared Footer (Exact Homepage Design) */}
      <Footer onOpenLeadModal={() => setLeadModalOpen(true)} />

      {/* Accessible Search Dialog */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* "Get Marketing Plan" Lead Modal */}
      <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} />

      {/* Global Floating Contact Controls */}
      <FloatingWhatsApp />
      <FloatingChatbot />
    </div>
  );
}
