import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Better Insights",
  description: "The requested page could not be found. Explore our solutions, case studies, and insights.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 bg-[linear-gradient(135deg,#FAF7F4_0%,#F5EFFB_45%,#FAF5F0_85%,#EFE6F7_100%)] text-[#1B1411] select-none relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(108,60,255,0.07)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div className="max-w-lg w-full text-center p-8 sm:p-12 bg-white rounded-[1.75rem] border border-black/10 shadow-2xs space-y-6 relative z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
          Error 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#1B1411]/60 leading-relaxed font-normal">
          The page you are looking for has been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] transition-all hover:scale-105 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/insights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#1B1411] text-xs font-semibold rounded-full hover:bg-black/5 transition-colors border border-black/10 shadow-2xs"
          >
            <span>Explore Insights</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
