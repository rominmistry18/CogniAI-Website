import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  title: "CogniAI by MedinovAI - AI-Powered Skill Assessment & Training",
  description: "Enterprise-grade AI-powered skill assessment and training platform by medinovAI. Transform how organizations evaluate, develop, and track workforce capabilities with CogniAI.",
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
          <Navbar />
          <main>{children}</main>
          <Footer />
          <VisualEditsMessenger />
        </body>
      </html>
    );
}
