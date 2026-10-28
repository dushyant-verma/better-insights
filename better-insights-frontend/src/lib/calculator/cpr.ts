export type CurrencyCode = "INR" | "USD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
};

export interface KeywordInput {
  id: string;
  name: string;
  searchVolume: number | "";
  cpc: number | "";
  ctr: number; // percentage, e.g. 5 for 5%
  conversionRate: number; // percentage, e.g. 10 for 10%
  results?: KeywordResults | null;
}

export interface KeywordResults {
  clicks: number;
  conversions: number;
  totalSpent: number;
  cpr: number;
}

export interface CampaignTotals {
  totalSearchVolume: number;
  totalClicks: number;
  totalSpent: number;
  totalConversions: number;
  overallCPR: number;
  blendedCPC: number;
  blendedCTR: number;
  blendedConversionRate: number;
}

export const DEFAULT_KEYWORD: Omit<KeywordInput, "id"> = {
  name: "",
  searchVolume: "",
  cpc: "",
  ctr: 5,
  conversionRate: 10,
  results: null,
};

export const SAMPLE_KEYWORDS: Omit<KeywordInput, "id">[] = [
  {
    name: "Enterprise Cloud Migration",
    searchVolume: 12500,
    cpc: 45,
    ctr: 5.5,
    conversionRate: 8.5,
    results: null,
  },
  {
    name: "AI Workflow Automation",
    searchVolume: 18000,
    cpc: 35,
    ctr: 6.2,
    conversionRate: 11.0,
    results: null,
  },
  {
    name: "CRM Telemetry Platform",
    searchVolume: 8400,
    cpc: 28,
    ctr: 4.8,
    conversionRate: 9.5,
    results: null,
  },
];

/**
 * Calculates metrics for a single keyword with boundary checks.
 */
export function calculateKeyword(input: KeywordInput): KeywordResults {
  const volume = typeof input.searchVolume === "number" && input.searchVolume > 0 ? input.searchVolume : 0;
  const cpc = typeof input.cpc === "number" && input.cpc > 0 ? input.cpc : 0;
  const ctrRatio = (typeof input.ctr === "number" && input.ctr > 0 ? input.ctr : 0) / 100;
  const convRatio = (typeof input.conversionRate === "number" && input.conversionRate > 0 ? input.conversionRate : 0) / 100;

  const clicks = Math.round(volume * ctrRatio);
  const conversions = Math.round(clicks * convRatio);
  const totalSpent = Number((clicks * cpc).toFixed(2));
  const cpr = conversions > 0 ? Number((totalSpent / conversions).toFixed(2)) : 0;

  return {
    clicks,
    conversions,
    totalSpent,
    cpr,
  };
}

/**
 * Calculates aggregate metrics across all calculated keywords in campaign.
 */
export function calculateTotals(keywords: KeywordInput[]): CampaignTotals {
  const calculated = keywords.filter((k) => k.results !== null && k.results !== undefined);

  if (calculated.length === 0) {
    return {
      totalSearchVolume: 0,
      totalClicks: 0,
      totalSpent: 0,
      totalConversions: 0,
      overallCPR: 0,
      blendedCPC: 0,
      blendedCTR: 0,
      blendedConversionRate: 0,
    };
  }

  let totalSearchVolume = 0;
  let totalClicks = 0;
  let totalSpent = 0;
  let totalConversions = 0;

  for (const k of calculated) {
    totalSearchVolume += typeof k.searchVolume === "number" ? k.searchVolume : 0;
    if (k.results) {
      totalClicks += k.results.clicks;
      totalSpent += k.results.totalSpent;
      totalConversions += k.results.conversions;
    }
  }

  totalSpent = Number(totalSpent.toFixed(2));
  const overallCPR = totalConversions > 0 ? Number((totalSpent / totalConversions).toFixed(2)) : 0;
  const blendedCPC = totalClicks > 0 ? Number((totalSpent / totalClicks).toFixed(2)) : 0;
  const blendedCTR = totalSearchVolume > 0 ? Number(((totalClicks / totalSearchVolume) * 100).toFixed(2)) : 0;
  const blendedConversionRate = totalClicks > 0 ? Number(((totalConversions / totalClicks) * 100).toFixed(2)) : 0;

  return {
    totalSearchVolume,
    totalClicks,
    totalSpent,
    totalConversions,
    overallCPR,
    blendedCPC,
    blendedCTR,
    blendedConversionRate,
  };
}
