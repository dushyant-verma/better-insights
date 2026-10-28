import test from "node:test";
import assert from "node:assert/strict";
import { 
  calculateKeyword, 
  calculateTotals, 
  SAMPLE_KEYWORDS 
} from "../src/lib/calculator/cpr.ts";

test("1. Single keyword calculation accuracy matches reference formulas", () => {
  const input = {
    id: "test-1",
    name: "Commercial Intent",
    searchVolume: 10000,
    cpc: 15.50,
    ctr: 5.0,
    conversionRate: 10.0,
  };

  const results = calculateKeyword(input);

  // clicks = Math.round(10000 * 0.05) = 500
  assert.equal(results.clicks, 500, "Clicks must equal 500");
  // conversions = Math.round(500 * 0.10) = 50
  assert.equal(results.conversions, 50, "Conversions must equal 50");
  // totalSpent = 500 * 15.50 = 7750.00
  assert.equal(results.totalSpent, 7750.00, "Total spend must equal 7750.00");
  // cpr = 7750.00 / 50 = 155.00
  assert.equal(results.cpr, 155.00, "CPR must equal 155.00");
});

test("2. Zero, empty, and boundary inputs are handled safely without NaN or Infinity", () => {
  // Case A: Zero search volume
  const zeroVol = calculateKeyword({
    id: "zero-vol",
    name: "Zero Volume",
    searchVolume: 0,
    cpc: 20,
    ctr: 5,
    conversionRate: 10,
  });
  assert.equal(zeroVol.clicks, 0);
  assert.equal(zeroVol.conversions, 0);
  assert.equal(zeroVol.totalSpent, 0);
  assert.equal(zeroVol.cpr, 0);
  assert.equal(Number.isNaN(zeroVol.cpr), false);

  // Case B: Zero CPC
  const zeroCpc = calculateKeyword({
    id: "zero-cpc",
    name: "Free Traffic",
    searchVolume: 5000,
    cpc: 0,
    ctr: 4,
    conversionRate: 5,
  });
  assert.equal(zeroCpc.clicks, 200);
  assert.equal(zeroCpc.conversions, 10);
  assert.equal(zeroCpc.totalSpent, 0);
  assert.equal(zeroCpc.cpr, 0);

  // Case C: Zero conversion rate
  const zeroConv = calculateKeyword({
    id: "zero-conv",
    name: "Zero Conversion",
    searchVolume: 5000,
    cpc: 10,
    ctr: 5,
    conversionRate: 0,
  });
  assert.equal(zeroConv.clicks, 250);
  assert.equal(zeroConv.conversions, 0);
  assert.equal(zeroConv.totalSpent, 2500);
  assert.equal(zeroConv.cpr, 0, "Zero conversions must safely yield 0 CPR without Infinity");
  assert.equal(Number.isFinite(zeroConv.cpr), true);
});

test("3. Campaign aggregation correctly computes blended CPR and totals", () => {
  const kw1 = {
    id: "k-1",
    name: "Keyword A",
    searchVolume: 10000,
    cpc: 20,
    ctr: 5,
    conversionRate: 10,
    results: calculateKeyword({
      id: "k-1",
      name: "Keyword A",
      searchVolume: 10000,
      cpc: 20,
      ctr: 5,
      conversionRate: 10,
    }),
  };

  const kw2 = {
    id: "k-2",
    name: "Keyword B",
    searchVolume: 20000,
    cpc: 10,
    ctr: 4,
    conversionRate: 5,
    results: calculateKeyword({
      id: "k-2",
      name: "Keyword B",
      searchVolume: 20000,
      cpc: 10,
      ctr: 4,
      conversionRate: 5,
    }),
  };

  // kw1: clicks=500, conv=50, spend=10000, cpr=200
  // kw2: clicks=800, conv=40, spend=8000, cpr=200
  const totals = calculateTotals([kw1, kw2]);

  assert.equal(totals.totalSearchVolume, 30000);
  assert.equal(totals.totalClicks, 1300);
  assert.equal(totals.totalSpent, 18000.00);
  assert.equal(totals.totalConversions, 90);
  // overallCPR = 18000 / 90 = 200.00
  assert.equal(totals.overallCPR, 200.00);
  // blendedCPC = 18000 / 1300 = 13.85
  assert.equal(totals.blendedCPC, 13.85);
  // blendedCTR = (1300 / 30000) * 100 = 4.33%
  assert.equal(totals.blendedCTR, 4.33);
  // blendedConversionRate = (90 / 1300) * 100 = 6.92%
  assert.equal(totals.blendedConversionRate, 6.92);
});

test("4. Sample dataset calculates all presets cleanly", () => {
  const populated = SAMPLE_KEYWORDS.map((k, idx) => ({
    ...k,
    id: `sample-${idx}`,
    results: calculateKeyword({ ...k, id: `sample-${idx}` }),
  }));

  const totals = calculateTotals(populated);

  assert.equal(totals.totalSearchVolume > 0, true);
  assert.equal(totals.totalClicks > 0, true);
  assert.equal(totals.totalSpent > 0, true);
  assert.equal(totals.totalConversions > 0, true);
  assert.equal(totals.overallCPR > 0, true);
  assert.equal(Number.isFinite(totals.overallCPR), true);
});
