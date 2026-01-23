import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ArticleSchema } from "@/components/SchemaOrg";
import { Brain, Users, Clock, DollarSign, CheckCircle2, XCircle, ArrowRight, Target, Shield, BarChart3, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

const pageUrl = `${PUBLIC_WEBSITE_BASE_URL}/compare/ai-vs-traditional-hiring`;

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Users, Clock, DollarSign, Target, Shield, BarChart3, Zap
};

export const metadata: Metadata = {
  title: "AI vs Traditional Hiring: Complete Comparison | Cognaium",
  description: "Compare AI-powered hiring with traditional recruitment methods. Learn the differences in speed, cost, accuracy, and candidate experience. See why organizations choose Cognaium.",
  keywords: ["AI hiring vs traditional hiring", "AI recruitment comparison", "automated hiring benefits", "AI screening advantages", "hiring technology ROI"],
  alternates: {
    canonical: pageUrl
  }
};

interface ComparisonItem {
  category: string;
  traditional: { value: string; details: string; icon: string };
  aiPowered: { value: string; details: string; icon: string };
}

interface CognaiumFeature {
  icon: string;
  title: string;
  description: string;
}

export default async function CompareAIvsTraditionalPage() {
  const content = await getPageContent("compare_ai_hiring");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const summary = content.summary as { text?: string } || {};
  const comparisonData = content.comparison as { items?: ComparisonItem[] } || {};
  const challenges = content.challenges as { items?: string[] } || {};
  const advantages = content.advantages as { items?: string[] } || {};
  const whenToUse = content.when_to_use as { aiIdeal?: string[]; traditionalSuits?: string[]; bestPractice?: string } || {};
  const cognaiumFeatures = content.cognaium_features as { items?: CognaiumFeature[] } || {};
  const meta = content.meta as { lastUpdated?: string; author?: string } || {};

  const comparisonItems = comparisonData.items || [];
  const traditionalChallenges = challenges.items || [];
  const aiAdvantages = advantages.items || [];
  const aiIdeal = whenToUse.aiIdeal || [];
  const traditionalSuits = whenToUse.traditionalSuits || [];
  const features = cognaiumFeatures.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "AI vs Traditional Hiring"}
        description={header.subtitle || "A comprehensive comparison of AI-powered and traditional recruitment approaches."}
      />

      {/* Schema Markup */}
      <ArticleSchema
        title="AI vs Traditional Hiring: Complete Comparison"
        description="Comprehensive comparison of AI-powered hiring versus traditional recruitment methods covering speed, cost, accuracy, and candidate experience."
        datePublished="2025-09-15"
        dateModified={meta.lastUpdated || "2026-01-22"}
        author={meta.author || "Cognaium by MedinovAI"}
        url={pageUrl}
      />

      {/* Quick Summary */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Summary</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {summary.text || "AI-powered hiring typically delivers 50-70% faster time-to-hire, 30-50% cost reduction, and more consistent candidate evaluation."}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Side-by-Side Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How AI-powered hiring with Cognaium compares to traditional recruitment across key metrics.
            </p>
          </div>

          <div className="space-y-6">
            {comparisonItems.map((item, index) => {
              const TraditionalIcon = iconMap[item.traditional.icon] || Clock;
              const AiIcon = iconMap[item.aiPowered.icon] || Zap;
              return (
                <div key={index} className="glass rounded-2xl overflow-hidden">
                  <div className="bg-primary/10 px-6 py-3">
                    <h3 className="font-bold text-lg">{item.category}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {/* Traditional */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <TraditionalIcon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Traditional</span>
                      </div>
                      <p className="text-xl font-bold mb-2">{item.traditional.value}</p>
                      <p className="text-sm text-muted-foreground">{item.traditional.details}</p>
                    </div>
                    {/* AI-Powered */}
                    <div className="p-6 bg-green-500/5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <AiIcon className="w-4 h-4 text-green-500" />
                        </div>
                      <span className="text-sm font-medium text-green-600">AI-Powered (Cognaium)</span>
                      </div>
                      <p className="text-xl font-bold mb-2 text-green-600">{item.aiPowered.value}</p>
                      <p className="text-sm text-muted-foreground">{item.aiPowered.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Traditional Challenges */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold">Traditional Hiring Challenges</h3>
              </div>
              <ul className="space-y-4">
                {traditionalChallenges.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Advantages */}
            <div className="glass rounded-2xl p-8 border-2 border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Hiring Advantages</h3>
              </div>
              <ul className="space-y-4">
                {aiAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Each */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">When to Use Each Approach</h2>
          
          <div className="space-y-8">
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                AI-Powered Hiring is Ideal When:
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {aiIdeal.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-muted-foreground" />
                Traditional Methods May Suit:
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {traditionalSuits.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary/5 rounded-xl">
            <p className="text-center text-muted-foreground">
              <strong className="text-foreground">Best Practice:</strong> {whenToUse.bestPractice || "Most organizations benefit from a hybrid approach."}
            </p>
          </div>
        </div>
      </section>

      {/* Cognaium Features */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Cognaium Delivers AI Hiring Advantages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built features that transform your hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const IconComponent = iconMap[item.icon] || Brain;
              return (
                <div key={i} className="glass rounded-xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how Cognaium can reduce your time-to-hire, cut costs, and improve hiring quality with AI-powered screening and assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meta Footer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-sm text-muted-foreground text-center">
          Last Updated: {meta.lastUpdated || "January 22, 2026"} | Author: {meta.author || "Cognaium Research Team"}
        </div>
      </div>

      <CTA />
    </main>
  );
}
