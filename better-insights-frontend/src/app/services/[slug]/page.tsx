import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllServices, getServiceBySlug } from "@/lib/data/services";
import { SingleServiceTemplate } from "@/components/services/SingleServiceTemplate";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getAllServices();
  const staticParams: Array<{ slug: string }> = [];

  services.forEach((service) => {
    staticParams.push({ slug: service.slug });
    service.aliases.forEach((alias) => {
      staticParams.push({ slug: alias });
    });
  });

  return staticParams;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Better Insights",
      description: "The requested service could not be found.",
    };
  }

  const pageTitle = `${service.title} & Architecture | Better Insights`;
  const pageDesc = service.shortDesc;
  const canonicalUrl = `/services/${service.slug}`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: "Better Insights",
      images: [
        {
          url: service.heroPoster,
          width: 1200,
          height: 630,
          alt: `${service.title} - Better Insights`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [service.heroPoster],
    },
  };
}

export default async function SingleServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <SingleServiceTemplate service={service} />;
}
