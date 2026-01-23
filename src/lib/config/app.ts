/**
 * Application Configuration
 * Centralized configuration that reads from environment variables
 */

// Website URL (public-facing site)
export const WEBSITE_URL = process.env.WEBSITE_URL || process.env.WEBSITE || "http://localhost:3000";

// Admin URL (admin panel)
export const ADMIN_URL = process.env.ADMIN_URL || process.env.ADMIN_PORT || "http://localhost:3001";

// Public Website URL for SEO/metadata (use NEXT_PUBLIC_ for client-side access if needed)
// This should be the production URL for SEO purposes
export const PUBLIC_WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.WEBSITE_URL || process.env.WEBSITE || "http://localhost:3000";

// Extract ports from URLs for middleware compatibility
export function getWebsitePort(): string {
  const url = new URL(WEBSITE_URL);
  return url.port || (url.protocol === "https:" ? "443" : "80");
}

export function getAdminPort(): string {
  const url = new URL(ADMIN_URL);
  return url.port || (url.protocol === "https:" ? "443" : "80");
}

// Base URLs (without trailing slash)
export const WEBSITE_BASE_URL = WEBSITE_URL.replace(/\/$/, "");
export const ADMIN_BASE_URL = ADMIN_URL.replace(/\/$/, "");
export const PUBLIC_WEBSITE_BASE_URL = PUBLIC_WEBSITE_URL.replace(/\/$/, "");
