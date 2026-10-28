import type { Metadata } from "next";
import "@/styles/cpr-tool.css";

export const metadata: Metadata = {
  title: "Cost Per Result (CPR) Calculator | Better Insights",
  description:
    "Benchmark and calculate your marketing Cost Per Result (CPR), click-through rate, and acquisition ROI across paid search and social campaigns with mathematical precision.",
  alternates: {
    canonical: "/cpr-tool",
  },
  openGraph: {
    title: "Cost Per Result (CPR) Calculator | Better Insights",
    description:
      "Benchmark and evaluate the efficiency of your marketing campaigns. Calculate your true Cost Per Result across paid media, search ads, and conversion funnels.",
    url: "/cpr-tool",
    siteName: "Better Insights",
    type: "website",
  },
};

export default function CprToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
