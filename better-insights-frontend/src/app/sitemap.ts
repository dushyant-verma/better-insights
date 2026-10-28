import { MetadataRoute } from "next";
import { getPosts, getCaseStudies } from "@/lib/wordpress/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Public production URL - strictly exclude localhost
  const siteUrl = "https://betterinsights.in";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/services/website-development`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/crm-integrations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/ai-automation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/digital-growth`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/digital-transformation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/technology-engineering`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/our-work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/insights`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/our-clientele`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/clientele`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/cpr-tool`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/write-for-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/sitemap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // Dynamic posts
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getPosts({ perPage: 100 });
    postRoutes = posts.map((post) => ({
      url: `${siteUrl}/insights/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Graceful fallback if WP is offline
  }

  // Dynamic case studies
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await getCaseStudies();
    caseStudyRoutes = caseStudies.map((cs) => ({
      url: `${siteUrl}/work/${cs.slug}`,
      lastModified: new Date(cs.modified || cs.date),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch {
    // Graceful fallback
  }

  return [...staticRoutes, ...postRoutes, ...caseStudyRoutes];
}
