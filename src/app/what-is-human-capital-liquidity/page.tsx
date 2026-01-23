import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema, ArticleSchema } from "@/components/SchemaOrg";
import { Users, TrendingUp, Zap, BarChart3, CheckCircle2, ArrowRight, BookOpen, Target, Layers, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

const pageUrl = `${PUBLIC_WEBSITE_BASE_URL}/what-is-human-capital-liquidity`;

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, TrendingUp, Zap, BarChart3, Target, Layers, Brain, BookOpen
};

export const metadata: Metadata = {
  title: "What is Human Capital Liquidity? | Cognaium",
  description: "Human Capital Liquidity is a framework measuring how fluidly skills and talent can flow within organizations. Learn how to measure and improve workforce agility with Cognaium.",
  keywords: ["human capital liquidity", "workforce agility", "talent mobility", "skills-based talent management", "skill transferability"],
  alternates: {
    canonical: pageUrl
  }
};

interface ContentSection {
  id: string;
  title: string;
  icon: string;
  content?: string;
  benefits?: string[];
  dimensions?: Array<{ title: string; icon: string; description: string }>;
  strategies?: Array<{ title: string; description: string }>;
  features?: string[];
}

interface RelatedConcept {
  label: string;
  href: string;
}

export default async function WhatIsHumanCapitalLiquidityPage() {
  const content = await getPageContent("what_is_hcl");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const quickAnswer = content.quick_answer as { text?: string } || {};
  const sectionsData = content.sections as { items?: ContentSection[] } || {};
  const related = content.related as { items?: RelatedConcept[] } || {};
  const furtherReading = content.further_reading as { title?: string; description?: string; link?: string; buttonText?: string } || {};
  const meta = content.meta as { lastUpdated?: string; author?: string } || {};

  const sections = sectionsData.items || [];
  const relatedConcepts = related.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "What is Human Capital Liquidity?"}
        description={header.subtitle || "Understanding the framework that measures workforce agility and talent mobility."}
      />

      {/* Schema Markup */}
      <DefinedTermSchema
        term="Human Capital Liquidity"
        definition="A quantitative framework measuring how fluidly skills and talent can flow within and across organizations, assessing skill transferability, role adaptability, and workforce agility."
        url={pageUrl}
      />
      <ArticleSchema
        title="What is Human Capital Liquidity?"
        description="Comprehensive guide to Human Capital Liquidity - the framework measuring workforce agility and talent mobility in organizations."
        datePublished="2025-06-15"
        dateModified={meta.lastUpdated || "2026-01-22"}
        author={meta.author || "Cognaium by MedinovAI"}
        url={pageUrl}
      />

      {/* Quick Answer Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Quick Answer</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {quickAnswer.text || "Human Capital Liquidity is a quantitative framework that measures how fluidly skills and talent can flow within and across organizations."}
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {sections.map((section, idx) => {
              const IconComponent = iconMap[section.icon] || Users;
              return (
                <div key={idx} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <IconComponent className="w-7 h-7 text-primary" />
                    {section.title}
                  </h2>
                  
                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {section.content}
                    </p>
                  )}

                  {section.benefits && (
                    <div className="glass rounded-xl p-6 my-6">
                      <h4 className="font-semibold mb-3">Organizations with High Human Capital Liquidity Can:</h4>
                      <ul className="space-y-2">
                        {section.benefits.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.dimensions && (
                    <div className="grid gap-6 my-6">
                      {section.dimensions.map((dim, i) => {
                        const DimIcon = iconMap[dim.icon] || Layers;
                        return (
                          <div key={i} className="glass rounded-xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <DimIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-bold mb-1">{dim.title}</h4>
                              <p className="text-sm text-muted-foreground">{dim.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.strategies && (
                    <div className="space-y-6 my-6">
                      {section.strategies.map((strategy, i) => (
                        <div key={i} className="glass rounded-xl p-6">
                          <h4 className="font-bold mb-2">{i + 1}. {strategy.title}</h4>
                          <p className="text-muted-foreground text-sm">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.features && (
                    <ul className="space-y-3 my-6">
                      {section.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </article>

          {/* Related Concepts */}
          <div className="border-t border-border pt-8 mt-12">
            <h3 className="font-bold mb-4">Related Concepts</h3>
            <div className="flex flex-wrap gap-3">
              {relatedConcepts.map((concept, i) => (
                <Link 
                  key={i}
                  href={concept.href}
                  className="px-4 py-2 rounded-full bg-white/5 text-primary hover:bg-primary/10 transition-colors text-sm"
                >
                  {concept.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Further Reading */}
          <div className="glass rounded-xl p-6 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <h3 className="font-bold">{furtherReading.title || "Further Reading"}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {furtherReading.description || "Learn more in our research paper."}
            </p>
            <Link href={furtherReading.link || "/research#paper-1"}>
              <Button variant="outline" className="gap-2">
                {furtherReading.buttonText || "Read the Research Paper"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Meta Footer */}
          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
            <p>Last Updated: {meta.lastUpdated || "January 22, 2026"} | Author: {meta.author || "Cognaium Research Team"}</p>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
