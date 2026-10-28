import type { Metadata } from "next";
import "@/styles/clientele.css";

export const metadata: Metadata = {
  title: "Our Clientele & Partners | Better Insights",
  description:
    "Explore the enterprises, healthcare networks, e-commerce brands, and educational institutions partnered with Better Insights.",
  alternates: {
    canonical: "/our-clientele",
  },
  openGraph: {
    title: "Our Clientele & Partners | Better Insights",
    description:
      "Built on collaboration. Driven by shared ambition. Explore our directory of client partnerships across healthcare, edtech, e-commerce, and enterprise services.",
    url: "/our-clientele",
    siteName: "Better Insights",
    type: "website",
  },
};

export default function OurClienteleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
