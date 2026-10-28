import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Better Insights | Start a Conversation",
  description:
    "Let's make something meaningful happen. Tell us about your business, your challenges, or the opportunities you're exploring. We'll help you identify the right next step.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Better Insights | Start a Conversation",
    description:
      "Let's make something meaningful happen. Tell us about your business, your challenges, or the opportunities you're exploring.",
    url: "https://betterinsights.in/contact",
    type: "website",
    siteName: "Better Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Better Insights | Start a Conversation",
    description:
      "Let's make something meaningful happen. Connect with our engineering and growth leadership.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
