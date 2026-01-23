import { getPageContent } from "@/lib/content";
import { PricingContent, PricingPlan, PricingAddon, PricingComparison, PricingFAQ } from "./PricingContent";

export const metadata = {
  title: "Pricing - Cognaium by MedinovAI",
  description: "Simple, transparent pricing plans that scale with your organization. Start free for 14 days.",
};

export default async function PricingPage() {
  // Fetch all pricing page content from database with fallbacks
  const content = await getPageContent("pricing");

  // Extract sections with proper typing
  const headerContent = content.header as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  } | undefined;

  const plansContent = content.plans as {
    items?: PricingPlan[];
  } | undefined;

  const addonsContent = content.addons as {
    items?: PricingAddon[];
  } | undefined;

  const comparisonContent = content.comparison as {
    items?: PricingComparison[];
  } | undefined;

  const faqContent = content.faq as {
    items?: PricingFAQ[];
  } | undefined;

  const ctaContent = content.cta as {
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    primaryCtaLink?: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
  } | undefined;

  return (
    <PricingContent
      header={headerContent}
      plans={plansContent?.items}
      addons={addonsContent?.items}
      comparison={comparisonContent?.items}
      faq={faqContent?.items}
      cta={ctaContent}
    />
  );
}
