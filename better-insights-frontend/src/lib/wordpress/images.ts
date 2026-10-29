/**
 * Utility functions for resolving, normalizing, and safeguarding blog post image URLs.
 */

/**
 * Normalizes an image URL from WordPress or local static files.
 * Transforms remote localhost / WordPress upload URLs into local public static routes
 * (/uploads/...) to enable reliable, high-performance Next.js image optimization
 * and eliminate 400 INVALID_IMAGE_OPTIMIZE_REQUEST errors.
 */
export function resolvePostImageUrl(rawUrl?: string | null, fallback = "/images/blog01.webp"): string {
  if (!rawUrl || typeof rawUrl !== "string") {
    return fallback;
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return fallback;
  }

  // 1. If it is already a clean local path in public/
  if (trimmed.startsWith("/images/") || trimmed.startsWith("/uploads/") || trimmed.startsWith("/logos/")) {
    return trimmed;
  }

  // 2. Normalize WordPress upload URLs (both localhost and live production domains)
  // Example matches:
  // - http://localhost/betterinsights/wp-content/uploads/2026/10/blog03.webp -> /uploads/2026/10/blog03.webp
  // - https://www.betterinsights.in/wp-content/uploads/2026/09/AI-Tools.webp -> /uploads/2026/09/AI-Tools.webp
  // - /wp-content/uploads/2026/10/blog03.webp -> /uploads/2026/10/blog03.webp
  const wpUploadRegex = /^(?:https?:\/\/[^\/]+)?(?:\/betterinsights)?\/wp-content\/uploads\/(.+)$/i;
  const uploadMatch = trimmed.match(wpUploadRegex);
  if (uploadMatch && uploadMatch[1]) {
    return `/uploads/${uploadMatch[1]}`;
  }

  // 3. Fallback for valid external/relative URLs
  return trimmed;
}
