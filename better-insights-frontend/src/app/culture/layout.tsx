import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture & Life at Better Insights | People, Values & Atmosphere",
  description:
    "Explore the culture, people, and creative environment behind Better Insights. Discover our core values, continuous learning philosophy, and team stories.",
  openGraph: {
    title: "Culture & Life at Better Insights | People, Values & Atmosphere",
    description:
      "Explore the culture, people, and creative environment behind Better Insights. Discover our core values, continuous learning philosophy, and team stories.",
    url: "https://betterinsights.com/culture",
    siteName: "Better Insights",
    images: [
      {
        url: "/images/culture/hero-marketing-team.jpg",
        width: 1200,
        height: 630,
        alt: "Better Insights Team Culture & Atmosphere",
      },
    ],
    type: "website",
  },
};

export default function CultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

