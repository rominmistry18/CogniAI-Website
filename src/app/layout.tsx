import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchemaOrg } from "@/components/SchemaOrg";

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
  metadataBase: new URL("https://www.cogniai.us"),
  alternates: {
    canonical: "https://www.cogniai.us"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cogniai.us",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
        <body className="antialiased bg-[#FFFFFF] text-[#002F6C] font-body">
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
          <SchemaOrg />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <VisualEditsMessenger />
        </body>
      </html>
    );
}
