import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { getPageContent } from "@/lib/content";
import { FAQContent, FAQCategory } from "./FAQContent";

export const metadata = {
  title: "FAQ - Cognaium by MedinovAI",
  description: "Find answers to common questions about Cognaium's AI-powered skill assessment, training, and workforce development platform.",
};

export default async function FAQPage() {
  // Fetch all FAQ page content from database with fallbacks
  const content = await getPageContent("faq");

  // Extract sections with proper typing
  const headerContent = content.header as {
    title?: string;
    subtitle?: string;
    lastUpdated?: string;
  } | undefined;

  const categoriesContent = content.categories as {
    items?: FAQCategory[];
  } | undefined;

  const supportContent = content.support as {
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    primaryCtaLink?: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
  } | undefined;

  const ctaContent = content.cta as Record<string, unknown> | undefined;

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={headerContent?.title || "Frequently Asked Questions"}
        description={headerContent?.subtitle || "Find answers to common questions about Cognaium's AI-powered skill assessment, training, and workforce development platform."}
      />

      <FAQContent
        header={headerContent}
        categories={categoriesContent?.items}
        support={supportContent}
      />

      <CTA content={ctaContent} />
    </main>
  );
}
