"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Loader2, FileText, Briefcase, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  title: string;
  url: string;
  type: string;
  desc?: string;
}

const STATIC_SEARCH_INDEX: SearchItem[] = [
  { title: "AI Solutions & Automation", url: "/ai-solutions", type: "Service", desc: "Intelligent agents, workflows, and automation systems" },
  { title: "Digital Growth & Performance", url: "/digital-growth", type: "Service", desc: "SEO, conversion optimization, and paid media" },
  { title: "Technology & Engineering", url: "/technology-engineering", type: "Service", desc: "Full-stack apps, APIs, cloud systems" },
  { title: "Digital Transformation", url: "/digital-transformation", type: "Service", desc: "Modernize platforms, customer journeys and workflows" },
  { title: "CRM & Integrations", url: "/crm-integrations", type: "Service", desc: "HubSpot, Salesforce, Zoho and custom API middleware" },
  { title: "Website Development", url: "/website-development", type: "Service", desc: "High-performance enterprise Next.js and WordPress websites" },
  { title: "CPR Calculator Tool", url: "/cpr-tool", type: "Tool", desc: "Calculate your customer acquisition cost, conversion rate, and marketing ROI" },
  { title: "Our Work & Case Studies", url: "/our-work", type: "Showcase", desc: "Client success stories and measurable enterprise impact" },
  { title: "About Better Insights", url: "/about", type: "Company", desc: "Our story, mission, and leadership team" },
  { title: "Executive Team", url: "/team", type: "Company", desc: "The strategists, engineers, and digital innovators behind Better Insights" },
  { title: "Our Clientele", url: "/clientele", type: "Company", desc: "Enterprises and high-growth brands we partner with" },
  { title: "Careers", url: "/careers", type: "Company", desc: "Explore open positions and join our engineering teams" },
  { title: "Insights & Articles", url: "/insights", type: "Articles", desc: "Latest research on AI, digital growth, and software engineering" },
  { title: "Contact Us", url: "/contact", type: "Action", desc: "Start a conversation with our technology and growth partners" },
  { title: "Write For Us", url: "/write-for-us", type: "Editorial", desc: "Submission guidelines for guest contributors" },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bi:cursor-reset"));
    }
    onClose();
  };

  // Global Esc key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
        else {
          // Trigger open
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle instant search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const q = query.toLowerCase().trim();

    // Search static index first
    const matched = STATIC_SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        item.type.toLowerCase().includes(q)
    );

    setResults(matched);
    setLoading(false);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bi-search-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F3F2EF] rounded-2xl shadow-2xl border border-black/10 overflow-hidden z-10 animate-scale-up">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-5 border-b border-black/10 bg-white">
          <Search className="w-5 h-5 text-black/50 mr-4 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions, case studies, insights, or services..."
            className="w-full bg-transparent text-lg text-black placeholder-black/40 focus:outline-none"
            aria-label="Search site content"
          />
          {loading && <Loader2 className="w-5 h-5 text-black/40 animate-spin mr-3 shrink-0" />}
          <button
            type="button"
            data-magnetic
            onClick={handleClose}
            className="p-1.5 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors"
            aria-label="Close search dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {query.trim() === "" ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-black/40 font-semibold mb-3" id="bi-search-title">
                Trending Searches
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STATIC_SEARCH_INDEX.slice(0, 6).map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={onClose}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-black/5 hover:border-black/25 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-black group-hover:text-black/80">{item.title}</div>
                      <span className="text-[11px] text-black/50 uppercase tracking-wider">{item.type}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-black/40 font-semibold mb-3">
                Results ({results.length})
              </p>
              <div className="space-y-2">
                {results.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={onClose}
                    className="flex items-start justify-between p-4 bg-white rounded-xl border border-black/5 hover:border-black/25 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-black group-hover:text-black/80">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#F3F2EF] text-black/70 rounded-full font-medium">
                          {item.type}
                        </span>
                      </div>
                      {item.desc && <p className="text-xs text-black/60 line-clamp-1">{item.desc}</p>}
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-black/60 font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-black/40 mt-1">Try searching for &quot;AI&quot;, &quot;Development&quot;, &quot;Growth&quot;, or &quot;Careers&quot;</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 bg-black/[0.03] border-t border-black/5 flex items-center justify-between text-[11px] text-black/40">
          <span>Navigate with mouse or keyboard</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
