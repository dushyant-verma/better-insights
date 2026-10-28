import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Services & Strategic Solutions | Better Insights",
  description:
    "Explore Better Insights enterprise capabilities spanning website development, CRM integrations, AI automation, digital growth, digital transformation, and software engineering.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Services & Strategic Solutions | Better Insights",
    description:
      "Digital solutions built around your next big move. Strategy, creativity, and technology together to help businesses move forward.",
    url: "/services",
    siteName: "Better Insights",
    images: [
      {
        url: "/images/Technology-That-Moves-Business-Forward.webp",
        width: 1200,
        height: 630,
        alt: "Better Insights Digital Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Services & Strategic Solutions | Better Insights",
    description:
      "Digital solutions built around your next big move. Enterprise capabilities spanning web development, CRM, AI, and digital growth.",
    images: ["/images/Technology-That-Moves-Business-Forward.webp"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
