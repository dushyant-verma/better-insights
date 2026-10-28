import { WPPost, WPPage, WPCategory, WPTag, WPCaseStudy, WPSearchResult } from "@/types/wordpress";
import { STATIC_POSTS, STATIC_CATEGORIES } from "./static-posts";

const WP_URL = (
  process.env.WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "http://localhost/betterinsights"
).replace(/\/$/, "");

const API_BASE = `${WP_URL}/wp-json/wp/v2`;

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
  timeout?: number;
}

/**
 * Universal fetch wrapper for WordPress REST API with error resilience and timeouts.
 */
async function fetchWP<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
  const { revalidate = 60, timeout = 5000 } = options;
  const url = `${API_BASE}/${endpoint.replace(/^\//, "")}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const res = await fetch(url, {
      signal: controller.signal,
      next: revalidate !== false ? { revalidate } : undefined,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[WordPress API] HTTP error ${res.status} for ${url}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[WordPress API] Fetch failed for ${url}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Fetch all published WordPress pages.
 */
export async function getPages(): Promise<WPPage[]> {
  const pages = await fetchWP<WPPage[]>("pages?per_page=100&_embed=true");
  return pages || [];
}

/**
 * Fetch a single page by its slug.
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchWP<WPPage[]>(`pages?slug=${encodeURIComponent(slug)}&_embed=true`);
  if (!pages || pages.length === 0) return null;
  return pages[0];
}

/**
 * Fetch published posts with pagination and category filtering.
 */
export async function getPosts(options: {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
} = {}): Promise<{ posts: WPPost[]; total: number }> {
  const { page = 1, perPage = 12, category, search } = options;
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: "true",
  });

  if (category) params.set("categories", String(category));
  if (search) params.set("search", search);

  const posts = await fetchWP<WPPost[]>(`posts?${params.toString()}`);
  if (posts && posts.length > 0) {
    return { posts, total: posts.length };
  }

  // Resilient fallback to statically cached posts
  let filtered = [...STATIC_POSTS];
  if (category) {
    filtered = filtered.filter((p) => p.categories && p.categories.includes(category));
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) => 
      p.title.rendered.toLowerCase().includes(q) ||
      (p.excerpt?.rendered && p.excerpt.rendered.toLowerCase().includes(q))
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  return { posts: paginated, total: filtered.length };
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(`posts?slug=${encodeURIComponent(slug)}&_embed=true`);
  if (posts && posts.length > 0) {
    return posts[0];
  }
  const fallback = STATIC_POSTS.find((p) => p.slug === slug);
  return fallback || null;
}

/**
 * Fetch all published categories.
 */
export async function getCategories(): Promise<WPCategory[]> {
  const categories = await fetchWP<WPCategory[]>("categories?per_page=100&hide_empty=false");
  if (categories && categories.length > 0) {
    return categories;
  }
  return STATIC_CATEGORIES;
}

/**
 * Fetch all published case studies (Custom Post Type: bi_case_study).
 */
export async function getCaseStudies(): Promise<WPCaseStudy[]> {
  const studies = await fetchWP<WPCaseStudy[]>("bi_case_study?per_page=100&_embed=true");
  return studies || [];
}

/**
 * Fetch a single case study by slug.
 */
export async function getCaseStudyBySlug(slug: string): Promise<WPCaseStudy | null> {
  const studies = await fetchWP<WPCaseStudy[]>(`bi_case_study?slug=${encodeURIComponent(slug)}&_embed=true`);
  if (!studies || studies.length === 0) return null;
  return studies[0];
}

/**
 * Search content across published posts, pages, and case studies.
 */
export async function searchContent(query: string): Promise<WPSearchResult[]> {
  if (!query.trim()) return [];
  const results = await fetchWP<WPSearchResult[]>(`search?search=${encodeURIComponent(query)}&per_page=20`);
  return results || [];
}
