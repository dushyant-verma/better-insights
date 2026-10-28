"use client";

import React, { useState } from "react";
import { 
  KeywordInput, 
  CurrencyCode, 
  CURRENCIES, 
  DEFAULT_KEYWORD, 
  SAMPLE_KEYWORDS, 
  calculateKeyword, 
  calculateTotals 
} from "@/lib/calculator/cpr";
import { CprResultsDashboard } from "./CprResultsDashboard";
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Calculator, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  HelpCircle,
  Percent,
  Coins
} from "lucide-react";

export function CprWorkspace() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [keywords, setKeywords] = useState<KeywordInput[]>([
    {
      id: "kw-1",
      name: "High-Intent Performance Campaign",
      searchVolume: 10000,
      cpc: 15.5,
      ctr: 5,
      conversionRate: 10,
      results: null,
    },
  ]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const activeCurrency = CURRENCIES[currency];

  // Add new keyword row
  const handleAddKeyword = () => {
    setErrorMessage("");
    const newId = `kw-${Date.now()}`;
    setKeywords((prev) => [
      ...prev,
      {
        ...DEFAULT_KEYWORD,
        id: newId,
        name: "",
      },
    ]);
  };

  // Remove keyword row
  const handleRemoveKeyword = (id: string) => {
    setErrorMessage("");
    if (keywords.length <= 1) return;
    setKeywords((prev) => prev.filter((k) => k.id !== id));
  };

  // Update keyword field
  const handleUpdateField = (
    id: string,
    field: keyof KeywordInput,
    value: string | number
  ) => {
    setErrorMessage("");
    setKeywords((prev) =>
      prev.map((k) => {
        if (k.id !== id) return k;
        return {
          ...k,
          [field]: value,
          // Reset results if required inputs change
          results: null,
        };
      })
    );
  };

  // Reset all
  const handleReset = () => {
    setErrorMessage("");
    setKeywords([
      {
        ...DEFAULT_KEYWORD,
        id: `kw-${Date.now()}`,
        name: "",
      },
    ]);
  };

  // Load sample dataset
  const handleLoadSample = () => {
    setErrorMessage("");
    const sample = SAMPLE_KEYWORDS.map((k, idx) => {
      const kwInput = {
        ...k,
        id: `kw-sample-${idx}-${Date.now()}`,
      };
      return {
        ...kwInput,
        results: calculateKeyword(kwInput),
      };
    });
    setKeywords(sample);

    setTimeout(() => {
      const target = document.getElementById("cpr-results-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Perform calculation
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate keywords
    for (let i = 0; i < keywords.length; i++) {
      const k = keywords[i];
      const rowName = k.name ? `"${k.name}"` : `Keyword #${i + 1}`;

      if (k.searchVolume === "" || Number(k.searchVolume) <= 0) {
        setErrorMessage(`Please provide a valid Search Volume for ${rowName}.`);
        return;
      }

      if (k.cpc === "" || Number(k.cpc) <= 0) {
        setErrorMessage(`Please provide a valid Cost Per Click (CPC) for ${rowName}.`);
        return;
      }
    }

    setIsCalculating(true);

    setTimeout(() => {
      const calculated = keywords.map((k) => ({
        ...k,
        results: calculateKeyword(k),
      }));

      setKeywords(calculated);
      setIsCalculating(false);

      setTimeout(() => {
        const target = document.getElementById("cpr-results-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }, 200);
  };

  const totals = calculateTotals(keywords);
  const hasResults = keywords.some((k) => k.results !== null);

  return (
    <section id="cpr-calculator-app" className="py-20 sm:py-28 bg-[#FAF5F0] select-none scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Top Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-black/10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1B1411] text-[11px] font-semibold border border-black/10 shadow-2xs mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
              Campaign Modeling
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
              Keyword Analysis Workspace
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center rounded-full bg-white p-1 border border-black/10 text-xs font-semibold font-mono shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  currency === "INR" ? "bg-[#1B1411] text-white shadow-sm" : "text-[#1B1411]/60 hover:text-[#1B1411]"
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  currency === "USD" ? "bg-[#1B1411] text-white shadow-sm" : "text-[#1B1411]/60 hover:text-[#1B1411]"
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Load Sample Button */}
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#1B1411] hover:text-white text-[#1B1411] text-xs font-semibold rounded-full transition-all border border-black/10 shadow-2xs cpr-focus-ring"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#33CC7A]" />
              <span>Load Sample</span>
            </button>

            {/* Reset All */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-black/5 text-[#1B1411]/70 text-xs font-semibold rounded-full transition-all border border-black/10 shadow-2xs cpr-focus-ring"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-white rounded-2xl border-2 border-black flex items-center gap-3 text-xs font-semibold text-black shadow-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-black" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Keywords Input Form */}
        <form onSubmit={handleCalculate} className="space-y-6" noValidate>
          {keywords.map((kw, index) => (
            <div
              key={kw.id}
              className="bg-white rounded-[1.75rem] p-6 sm:p-8 border border-black/10 shadow-2xs transition-all"
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-black/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#1B1411] text-white text-[11px] font-mono font-semibold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                    Keyword Parameter Group
                  </span>
                </div>

                {keywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw.id)}
                    className="text-black/40 hover:text-rose-600 transition-colors p-1"
                    title="Remove keyword row"
                    aria-label={`Remove keyword #${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
                
                {/* 1. Keyword Name */}
                <div className="lg:col-span-1">
                  <label htmlFor={`name-${kw.id}`} className="block text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/60 mb-2">
                    Keyword Name <span className="font-normal text-[#1B1411]/40">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id={`name-${kw.id}`}
                    placeholder="e.g. Brand Intent"
                    value={kw.name}
                    onChange={(e) => handleUpdateField(kw.id, "name", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs font-medium text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A] transition-colors cpr-focus-ring"
                  />
                </div>

                {/* 2. Search Volume */}
                <div className="lg:col-span-1">
                  <label htmlFor={`volume-${kw.id}`} className="block text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/60 mb-2">
                    Search Volume <span className="text-[#33CC7A] font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id={`volume-${kw.id}`}
                    min="1"
                    step="1"
                    placeholder="10,000"
                    value={kw.searchVolume}
                    onChange={(e) => handleUpdateField(kw.id, "searchVolume", e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs font-mono font-medium text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A] transition-colors cpr-focus-ring"
                  />
                </div>

                {/* 3. CPC */}
                <div className="lg:col-span-1">
                  <label htmlFor={`cpc-${kw.id}`} className="block text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/60 mb-2">
                    CPC ({activeCurrency.symbol}) <span className="text-[#33CC7A] font-bold">*</span>
                  </label>
                  <input
                    type="number"
                    id={`cpc-${kw.id}`}
                    min="0.01"
                    step="0.01"
                    placeholder="15.50"
                    value={kw.cpc}
                    onChange={(e) => handleUpdateField(kw.id, "cpc", e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs font-mono font-medium text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A] transition-colors cpr-focus-ring"
                  />
                </div>

                {/* 4. CTR (%) */}
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/60 mb-2">
                    <span>CTR (%)</span>
                    <span className="font-mono text-[#1B1411] font-bold">{kw.ctr}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.1"
                    value={kw.ctr}
                    onChange={(e) => handleUpdateField(kw.id, "ctr", Number(e.target.value))}
                    className="w-full cpr-slider cursor-pointer py-2 accent-[#33CC7A]"
                  />
                </div>

                {/* 5. Conversion Rate (%) */}
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#1B1411]/60 mb-2">
                    <span>Conv. Rate (%)</span>
                    <span className="font-mono text-[#1B1411] font-bold">{kw.conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.5"
                    value={kw.conversionRate}
                    onChange={(e) => handleUpdateField(kw.id, "conversionRate", Number(e.target.value))}
                    className="w-full cpr-slider cursor-pointer py-2 accent-[#33CC7A]"
                  />
                </div>

              </div>

              {/* Per-keyword calculated metric result pill */}
              {kw.results && (
                <div className="mt-6 pt-5 border-t border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-[#FAF5F0] rounded-xl border border-black/5">
                    <span className="text-[9px] uppercase font-bold text-black/50 block">Est. Clicks</span>
                    <span className="text-sm font-bold font-mono text-[#1B1411] mt-0.5 block">
                      {kw.results.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF5F0] rounded-xl border border-black/5">
                    <span className="text-[9px] uppercase font-bold text-black/50 block">Est. Conversions</span>
                    <span className="text-sm font-bold font-mono text-[#1B1411] mt-0.5 block">
                      {kw.results.conversions.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF5F0] rounded-xl border border-black/5">
                    <span className="text-[9px] uppercase font-bold text-black/50 block">Total Spend</span>
                    <span className="text-sm font-bold font-mono text-[#1B1411] mt-0.5 block">
                      {activeCurrency.symbol}{kw.results.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-[#1B1411] text-white rounded-xl shadow-sm">
                    <span className="text-[9px] uppercase font-bold text-white/50 block">Effective CPR</span>
                    <span className="text-sm font-bold font-mono text-[#33CC7A] mt-0.5 block">
                      {activeCurrency.symbol}{kw.results.cpr.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Form Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handleAddKeyword}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#1B1411] border border-black/15 text-xs font-semibold rounded-full hover:border-[#33CC7A] transition-all shadow-2xs cpr-focus-ring"
            >
              <Plus className="w-4 h-4" />
              <span>Add Keyword</span>
            </button>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] transition-all shadow-md hover:scale-[1.02] cpr-focus-ring disabled:opacity-50"
            >
              <Calculator className="w-4 h-4" />
              <span>{isCalculating ? "Calculating..." : "Calculate All Results"}</span>
            </button>
          </div>
        </form>

        {/* Comprehensive Results Dashboard */}
        {hasResults && (
          <CprResultsDashboard
            keywords={keywords}
            totals={totals}
            currency={activeCurrency}
          />
        )}

      </div>
    </section>
  );
}
