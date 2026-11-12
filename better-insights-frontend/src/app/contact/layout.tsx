import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Better Insights | Let's Build Something Better",
  description:
    "Have an ambitious idea? Let's make it happen. From high-performance websites and intelligent AI automation to connected CRM ecosystems, we help ambitious businesses turn complex challenges into measurable digital growth.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Better Insights | Have an ambitious idea? Let's make it happen.",
    description:
      "From high-performance websites and intelligent AI automation to connected CRM ecosystems, we help ambitious businesses turn complex challenges into measurable digital growth.",
    url: "https://betterinsights.in/contact",
    type: "website",
    siteName: "Better Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Better Insights | Let's Build Something Better",
    description:
      "From high-performance websites and intelligent AI automation to connected CRM ecosystems, we help ambitious businesses turn complex challenges into measurable digital growth.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
