import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { SchemaOrg } from "@/components/SchemaOrg";
import { headers } from "next/headers";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";
import { getSiteSettings, isMaintenanceMode } from "@/lib/settings";
import { redirect } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Get the base URL for metadata (falls back to localhost if not configured)
const siteUrl = PUBLIC_WEBSITE_BASE_URL;

export const metadata: Metadata = {
  title: "Cognaium by MedinovAI - AI-Powered Skill Assessment & Training",
  description: "Enterprise-grade AI-powered skill assessment and training platform by MedinovAI. Transform how organizations evaluate, develop, and track workforce capabilities with Cognaium.",
  keywords: [
    "AI skill assessment",
    "talent acquisition platform",
    "employee training software",
    "workforce development",
    "AI-powered hiring",
    "skills-based talent management",
    "human capital liquidity",
    "AI proctoring",
    "HR technology",
    "enterprise AI platform"
  ],
  authors: [{ name: "MedinovAI" }],
  creator: "MedinovAI",
  publisher: "Cognaium",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cognaium",
    title: "Cognaium - AI-Powered Skill Assessment & Workforce Development",
    description: "Enterprise-grade AI platform for skill assessment, talent acquisition, training, and workforce development. Powered by GPT-4, Claude, and Gemini.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cognaium Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognaium - AI-Powered Skill Assessment",
    description: "Transform workforce development with AI-powered skill assessment, training, and certification.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Check if current route is an admin route
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
    const isAdminRoute = pathname.startsWith("/admin");
    const isMaintenancePage = pathname === "/maintenance";
    const isApiRoute = pathname.startsWith("/api");

    // Dynamically import Navbar and Footer only for non-admin routes
    const { Navbar } = await import("@/components/Navbar");
    const { Footer } = await import("@/components/Footer");

    // Fetch navbar links and branding from database for non-admin routes
    let navbarMainLinks: Array<{ href: string; label: string }> = [];
    let navbarMoreLinks: Array<{ href: string; label: string }> = [];
    let branding: { logoUrl?: string; logoText?: string; logoTagline?: string } = {};
    let faviconUrl: string | undefined;
    let ogImageUrl: string | undefined;
    
    if (!isAdminRoute) {
      try {
        const [globalContent, siteSettings, maintenanceEnabled] = await Promise.all([
          getPageContent("global"),
          getSiteSettings(),
          isMaintenanceMode(),
        ]);
        
        // Check for maintenance mode (only for public pages, not maintenance page itself or API routes)
        if (maintenanceEnabled && !isMaintenancePage && !isApiRoute) {
          redirect("/maintenance");
        }
        
        const navbarMain = globalContent.navbar_main as { items?: Array<{ href: string; label: string }> } || {};
        const navbarMore = globalContent.navbar_more as { items?: Array<{ href: string; label: string }> } || {};
        navbarMainLinks = navbarMain.items || [];
        navbarMoreLinks = navbarMore.items || [];
        
        // Extract branding settings
        branding = {
          logoUrl: siteSettings.logo_url || undefined,
          logoText: siteSettings.logo_text || "Cognaium",
          logoTagline: siteSettings.logo_tagline || "by MedinovAI",
        };
        faviconUrl = siteSettings.favicon_url || undefined;
        ogImageUrl = siteSettings.og_image || undefined;
      } catch {
        // Use default links if database fetch fails
      }
    }

    return (
      <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
        <head>
          {/* Dynamic Favicon from Settings */}
          {faviconUrl && (
            <>
              <link rel="icon" href={faviconUrl} />
              <link rel="shortcut icon" href={faviconUrl} />
              <link rel="apple-touch-icon" href={faviconUrl} />
            </>
          )}
          {/* Dynamic OG Image from Settings */}
          {ogImageUrl && (
            <>
              <meta property="og:image" content={ogImageUrl} />
              <meta name="twitter:image" content={ogImageUrl} />
            </>
          )}
        </head>
        <body className={`antialiased font-body ${isAdminRoute ? 'bg-slate-950 text-white' : 'bg-[#FFFFFF] text-[#002F6C]'}`}>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="b465df00-e3e7-4e62-b617-07477a09ba7e"
          />
          <ErrorReporter />
            <Script
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
              strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          {!isAdminRoute && <SchemaOrg />}
          {!isAdminRoute && <Navbar mainLinks={navbarMainLinks} moreLinks={navbarMoreLinks} branding={branding} />}
          <main>{children}</main>
          {!isAdminRoute && <Footer />}
          <VisualEditsMessenger />
        </body>
      </html>
    );
}
