import React from "react";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress/api";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "Page Not Found | Better Insights" };
  }

  const title = page.title.rendered;
  const excerpt = page.excerpt?.rendered ? page.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160) : "";

  return {
    title: `${title} | Better Insights`,
    description: excerpt,
  };
}

export default async function GenericWordPressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const title = page.title.rendered;
  const content = page.content.rendered;

  return (
    <>
      <InnerPageHero
        title={title}
        variant="light"
        breadcrumb={[{ label: title }]}
      />

      <section className="py-20 sm:py-28 bg-[#F3F2EF] select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="bg-white rounded-3xl p-8 sm:p-14 border border-black/10 shadow-xl leading-relaxed text-sm sm:text-base text-black/80 font-normal space-y-6 [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:text-black [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&_a]:text-black [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </>
  );
}
