import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getPageContent } from "@/lib/content";
import { FeaturesContent } from "./FeaturesContent";
import { ArrowRight } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface FeatureCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  features: FeatureItem[];
}

export default async function FeaturesPage() {
  // Fetch content from database
  const content = await getPageContent("features");
  const headerContent = content.header as { title?: string; subtitle?: string } || {};
  const categoriesData = content.categories as { items?: FeatureCategory[] } || {};
  const ctaContent = content.cta as { 
    title?: string; 
    subtitle?: string; 
    primaryCta?: string;
    primaryCtaLink?: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
  } || {};
  
  const featureCategories = categoriesData.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={headerContent.title || "Platform Features"}
        description={headerContent.subtitle || "Discover the complete suite of AI-powered tools for skill assessment, hiring, training, and workforce development."}
      />

      <FeaturesContent featureCategories={featureCategories} />

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{ctaContent.title || "Ready to Transform Your Workforce?"}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {ctaContent.subtitle || "See how Cognaium can help you hire smarter, train better, and develop your team with AI-powered intelligence."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ctaContent.primaryCtaLink || "/contact"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                {ctaContent.primaryCta || "Request a Demo"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={ctaContent.secondaryCtaLink || "/pricing"}>
              <Button size="lg" variant="outline">
                {ctaContent.secondaryCta || "View Pricing"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
