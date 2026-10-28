"use client";

import React, { useState } from "react";
import { 
  KeywordInput, 
  CampaignTotals, 
  CurrencyConfig 
} from "@/lib/calculator/cpr";
import { 
  CheckCircle2, 
  Copy, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  BarChart3, 
  Lightbulb, 
  Share2 
} from "lucide-react";

interface CprResultsDashboardProps {
  keywords: KeywordInput[];
  totals: CampaignTotals;
  currency: CurrencyConfig;
}

export function CprResultsDashboard({
  keywords,
  totals,
  currency,
}: CprResultsDashboardProps) {
  const [copied, setCopied] = useState(false);
  const calculatedKeywords = keywords.filter((k) => k.results !== null && k.results !== undefined);

  if (calculatedKeywords.length === 0) return null;

  // Efficiency rating assessment
  let efficiencyBadge = {
    label: "Moderate Unit Economics",
    color: "bg-[#33CC7A] text-[#1B1411]",
    note: "Your CPR reflects healthy paid media efficiency with solid conversion headroom.",
  };

  if (totals.blendedConversionRate >= 10 && totals.blendedCTR >= 5) {
    efficiencyBadge = {
      label: "High Performance Campaign",
      color: "bg-[#33CC7A] text-[#1B1411]",
      note: "Exceptional CTR and conversion velocity yielding an ultra-efficient CPR.",
    };
  } else if (totals.blendedConversionRate < 4) {
    efficiencyBadge = {
      label: "Optimization Opportunity",
      color: "bg-white/10 text-white border border-white/20",
      note: "Funnel conversion rates are dampening CPR. Landing page CRO will dramatically lower acquisition costs.",
    };
  }

  // Copy summary to clipboard
  const handleCopySummary = () => {
    const summaryText = `Better Insights - CPR Campaign Analysis
Overall Blended CPR: ${currency.symbol}${totals.overallCPR.toLocaleString()} / result
Total Estimated Spend: ${currency.symbol}${totals.totalSpent.toLocaleString()}
Total Estimated Conversions: ${totals.totalConversions.toLocaleString()}
Total Clicks: ${totals.totalClicks.toLocaleString()}
Total Search Volume: ${totals.totalSearchVolume.toLocaleString()}
Blended CPC: ${currency.symbol}${totals.blendedCPC}
Blended CTR: ${totals.blendedCTR}%
Blended Conversion Rate: ${totals.blendedConversionRate}%
Calculated via Better Insights CPR Calculator: http://localhost:3000/cpr-tool`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div id="cpr-results-section" className="mt-16 space-y-12 select-none">
      
      {/* 1. Primary Highlight Hero Dashboard */}
      <div className="bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-8 sm:p-12 lg:p-14 shadow-xl border border-white/10 relative overflow-hidden">
        {/* Subtle emerald glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
              <span>Campaign Aggregate Telemetry</span>
            </span>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#33CC7A] hover:text-[#1B1411] text-white text-xs font-semibold rounded-full transition-all border border-white/15"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* CPR Primary Number */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-white/50 block">
                Overall Blended Cost Per Result (CPR)
              </span>
              <div className="text-5xl sm:text-7xl font-extrabold text-white font-mono tracking-tight">
                {currency.symbol}{totals.overallCPR.toLocaleString()}
              </div>
              <div className="pt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${efficiencyBadge.color}`}>
                  {efficiencyBadge.label}
                </span>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  {efficiencyBadge.note}
                </p>
              </div>
            </div>

            {/* 4 Supporting Metrics */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-white/50 block">Total Spend</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1">
                  {currency.symbol}{totals.totalSpent.toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-white/50 block">Conversions</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1">
                  {totals.totalConversions.toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-white/50 block">Total Clicks</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1">
                  {totals.totalClicks.toLocaleString()}
                </span>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-white/50 block">Search Volume</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1">
                  {totals.totalSearchVolume.toLocaleString()}
                </span>
              </div>
            </div>

          </div>

          {/* Secondary Telemetry Strip */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 block">Blended Cost Per Click (CPC)</span>
              <span className="text-base font-bold font-mono text-white mt-0.5 block">
                {currency.symbol}{totals.blendedCPC.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 block">Average Click-Through Rate (CTR)</span>
              <span className="text-base font-bold font-mono text-white mt-0.5 block">
                {totals.blendedCTR}%
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/50 block">Average Funnel Conversion Rate</span>
              <span className="text-base font-bold font-mono text-white mt-0.5 block">
                {totals.blendedConversionRate}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Detailed Keyword Breakdown Table */}
      <div className="bg-white rounded-[1.75rem] p-6 sm:p-10 border border-black/10 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
              Keyword Performance Breakdown
            </h3>
            <p className="text-xs text-[#1B1411]/60 mt-1">
              Itemized metrics per target keyword within your modeled campaign.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/10 text-[#1B1411]/50 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3.5 pr-4">Keyword Name</th>
                <th className="py-3.5 px-3">Search Vol.</th>
                <th className="py-3.5 px-3">CPC</th>
                <th className="py-3.5 px-3">CTR</th>
                <th className="py-3.5 px-3">Clicks</th>
                <th className="py-3.5 px-3">Conv. %</th>
                <th className="py-3.5 px-3">Conv.</th>
                <th className="py-3.5 px-3">Total Spend</th>
                <th className="py-3.5 pl-3 text-right">CPR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 font-mono">
              {calculatedKeywords.map((k, idx) => (
                <tr key={k.id} className="hover:bg-[#FAF5F0]/60 transition-colors">
                  <td className="py-4 pr-4 font-sans font-semibold text-[#1B1411] max-w-[200px] truncate">
                    {k.name || `Keyword #${idx + 1}`}
                  </td>
                  <td className="py-4 px-3 text-[#1B1411]/80">{k.searchVolume.toLocaleString()}</td>
                  <td className="py-4 px-3 text-[#1B1411]/80">{currency.symbol}{Number(k.cpc).toFixed(2)}</td>
                  <td className="py-4 px-3 text-[#1B1411]/80">{k.ctr}%</td>
                  <td className="py-4 px-3 font-semibold text-[#1B1411]">{k.results?.clicks.toLocaleString()}</td>
                  <td className="py-4 px-3 text-[#1B1411]/80">{k.conversionRate}%</td>
                  <td className="py-4 px-3 font-semibold text-[#1B1411]">{k.results?.conversions.toLocaleString()}</td>
                  <td className="py-4 px-3 text-[#1B1411]/80">{currency.symbol}{k.results?.totalSpent.toLocaleString()}</td>
                  <td className="py-4 pl-3 text-right font-bold text-[#1B1411]">
                    {currency.symbol}{k.results?.cpr.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#1B1411] font-mono font-bold text-[#1B1411] text-xs bg-[#FAF5F0]">
                <td className="py-4 pr-4 font-sans font-semibold">Campaign Totals</td>
                <td className="py-4 px-3">{totals.totalSearchVolume.toLocaleString()}</td>
                <td className="py-4 px-3">{currency.symbol}{totals.blendedCPC.toFixed(2)}</td>
                <td className="py-4 px-3">{totals.blendedCTR}%</td>
                <td className="py-4 px-3">{totals.totalClicks.toLocaleString()}</td>
                <td className="py-4 px-3">{totals.blendedConversionRate}%</td>
                <td className="py-4 px-3">{totals.totalConversions.toLocaleString()}</td>
                <td className="py-4 px-3">{currency.symbol}{totals.totalSpent.toLocaleString()}</td>
                <td className="py-4 pl-3 text-right text-sm text-[#33CC7A] font-extrabold">
                  {currency.symbol}{totals.overallCPR.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 3. Strategic Optimization Recommendations */}
      <div className="bg-white rounded-[1.75rem] p-8 sm:p-10 border border-black/10 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#1B1411] text-[#33CC7A] flex items-center justify-center shrink-0 shadow-sm">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
              Strategic Growth Analysis &amp; CRO Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#1B1411]/75 leading-relaxed font-normal">
              <div className="p-5 bg-[#FAF5F0] rounded-2xl border border-black/5 space-y-1.5">
                <strong className="text-[#1B1411] block font-semibold text-[11px]">
                  Impact of +25% Conversion Rate (CRO):
                </strong>
                <p>
                  Optimizing landing page friction and speed to lift conversion rate from {totals.blendedConversionRate}% to {(totals.blendedConversionRate * 1.25).toFixed(1)}% would generate approximately{" "}
                  <strong className="text-[#1B1411] font-semibold">
                    {Math.round(totals.totalConversions * 0.25)} additional conversions
                  </strong>{" "}
                  and reduce your blended CPR to{" "}
                  <strong className="text-[#1B1411] font-semibold font-mono">
                    {currency.symbol}{(totals.overallCPR / 1.25).toFixed(2)}
                  </strong>{" "}
                  without increasing your media budget.
                </p>
              </div>

              <div className="p-5 bg-[#FAF5F0] rounded-2xl border border-black/5 space-y-1.5">
                <strong className="text-[#1B1411] block font-semibold text-[11px]">
                  Impact of Negative Keyword Pruning:
                </strong>
                <p>
                  Refining ad copy relevance and implementing negative match lists typically trims wasted clicks by 15-20%, lowering your effective CPC to{" "}
                  <strong className="text-[#1B1411] font-semibold font-mono">
                    {currency.symbol}{(totals.blendedCPC * 0.85).toFixed(2)}
                  </strong>{" "}
                  and yielding higher acquisition efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
