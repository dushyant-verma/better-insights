import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Better Insights | Build What's Next",
  description:
    "Do meaningful work. Join a team exploring the intersection of creativity, technology, marketing, and AI to solve meaningful business challenges.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Better Insights | Build What's Next",
    description:
      "Do meaningful work. Join a team exploring the intersection of creativity, technology, marketing, and AI to solve meaningful business challenges.",
    url: "https://betterinsights.in/careers",
    type: "website",
    siteName: "Better Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Better Insights | Build What's Next",
    description:
      "Do meaningful work. Join a team exploring the intersection of creativity, technology, marketing, and AI.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
