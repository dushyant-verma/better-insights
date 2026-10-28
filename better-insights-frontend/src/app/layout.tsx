import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Better Insights | AI & Digital Transformation Consultancy",
    template: "%s | Better Insights",
  },
  description:
    "Better Insights combines artificial intelligence, digital growth strategy, CRM integrations, and engineering to build what comes next. Transform your business with measurable ROI.",
  keywords: [
    "AI Solutions",
    "Digital Transformation",
    "Digital Growth",
    "Website Development",
    "CRM Integrations",
    "Performance Marketing",
    "Better Insights",
  ],
  authors: [{ name: "Better Insights" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://betterinsights.in",
    siteName: "Better Insights",
    title: "Better Insights | AI & Digital Transformation Consultancy",
    description: "Technology that drives what's next. AI, digital engineering, and growth strategies for enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Insights | AI & Digital Transformation Consultancy",
    description: "Technology that drives what's next.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/cropped-BI-Favicon-32x32.webp?v=2", sizes: "32x32", type: "image/webp" },
      { url: "/images/cropped-BI-Favicon-192x192.webp?v=2", sizes: "192x192", type: "image/webp" },
      { url: "/images/cropped-BI-Favicon.webp?v=2", type: "image/webp" },
    ],
    apple: [
      { url: "/images/cropped-BI-Favicon-180x180.webp?v=2", sizes: "180x180", type: "image/webp" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${notoSans.variable} font-sans antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/gabarito/v9/QGYtz_0dZAGKJJ4t3HtoW4U.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/onest/v11/gNMKW3F-SZuj7xmf-HY.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/hostgrotesk/v5/co3BmWBnlCJ3U42vbbfdwMjZpFjm.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/images/cropped-BI-Favicon-32x32.webp?v=2" sizes="32x32" type="image/webp" />
        <link rel="icon" href="/images/cropped-BI-Favicon-192x192.webp?v=2" sizes="192x192" type="image/webp" />
        <link rel="icon" href="/images/cropped-BI-Favicon.webp?v=2" sizes="any" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/cropped-BI-Favicon-180x180.webp?v=2" />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#F3F2EF] text-black">
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js" strategy="beforeInteractive" />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
