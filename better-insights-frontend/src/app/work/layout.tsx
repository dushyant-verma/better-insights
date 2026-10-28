import type { Metadata } from "next";
import "@/styles/portfolio.css";

export const metadata: Metadata = {
  title: "Our Work & Case Studies | Better Insights",
  description:
    "Explore how Better Insights partners with ambitious brands to solve complex problems through AI, modern engineering, and digital growth systems.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work & Case Studies | Better Insights",
    description:
      "Ideas brought to life. Experiences built to perform. Explore our portfolio of enterprise transformations and digital platforms.",
    url: "/work",
    siteName: "Better Insights",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
