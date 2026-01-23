import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema, ArticleSchema, HowToSchema } from "@/components/SchemaOrg";
import { Brain, BarChart3, Zap, Target, CheckCircle2, ArrowRight, BookOpen, Layers, Users, TrendingUp, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

const pageUrl = `${PUBLIC_WEBSITE_BASE_URL}/what-is-ai-skills-mapping`;

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, BarChart3, Zap, Target, Layers, Users, TrendingUp, FileText, BookOpen
};

export const metadata: Metadata = {
  title: "What is AI Skills Mapping? | Cognaium",
  description: "AI Skills Mapping uses artificial intelligence to automatically identify, categorize, and validate workforce skills. Learn how AI transforms skill management with Cognaium.",
  keywords: ["AI skills mapping", "skill mapping software", "AI skill assessment", "workforce skills analysis", "automated skill identification"],
  alternates: {
    canonical: pageUrl
  }
};

interface HowToStep {
  name: string;
  text: string;
}

interface ContentSection {
  id: string;
  title: string;
  icon: string;
  content?: string;
  problems?: string[];
  components?: Array<{ title: string; icon: string; description: string }>;
  benefits?: Array<{ title: string; desc: string }>;
  features?: string[];
}

interface RelatedConcept {
  label: string;
  href: string;
}

export default async function WhatIsAISkillsMappingPage() {
  const content = await getPageContent("what_is_ai_skills_mapping");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const quickAnswer = content.quick_answer as { text?: string } || {};
  const howToStepsData = content.how_to_steps as { items?: HowToStep[] } || {};
  const sectionsData = content.sections as { items?: ContentSection[] } || {};
  const related = content.related as { items?: RelatedConcept[] } || {};
  const furtherReading = content.further_reading as { title?: string; description?: string; link?: string; buttonText?: string } || {};
  const meta = content.meta as { lastUpdated?: string; author?: string } || {};

  const howToSteps = howToStepsData.items || [];
  const sections = sectionsData.items || [];
  const relatedConcepts = related.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "What is AI Skills Mapping?"}
        description={header.subtitle || "Understanding how artificial intelligence transforms skill identification."}
      />

      {/* Schema Markup */}
      <DefinedTermSchema
        term="AI Skills Mapping"
        definition="Using artificial intelligence to automatically identify, categorize, and validate workforce skills from multiple data sources including resumes, performance data, and assessments."
        url={pageUrl}
      />
      <ArticleSchema
        title="What is AI Skills Mapping?"
        description="Comprehensive guide to AI Skills Mapping - how AI transforms skill identification and workforce planning."
        datePublished="2025-08-10"
        dateModified={meta.lastUpdated || "2026-01-22"}
        author={meta.author || "Cognaium by MedinovAI"}
        url={pageUrl}
      />
      {howToSteps.length > 0 && (
        <HowToSchema
          name="How to Implement AI Skills Mapping"
          description="Step-by-step guide to implementing AI-powered skills mapping in your organization."
          steps={howToSteps}
        />
      )}

      {/* Quick Answer Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Quick Answer</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {quickAnswer.text || "AI Skills Mapping uses artificial intelligence to automatically identify, categorize, and validate workforce skills."}
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {sections.map((section, idx) => {
              const IconComponent = iconMap[section.icon] || Brain;
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

                  {section.problems && (
                    <div className="glass rounded-xl p-6 my-6">
                      <h4 className="font-semibold mb-3">Common Problems with Manual Skills Tracking:</h4>
                      <ul className="space-y-2">
                        {section.problems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.components && (
                    <div className="space-y-6 my-6">
                      {section.components.map((comp, i) => {
                        const CompIcon = iconMap[comp.icon] || FileText;
                        return (
                          <div key={i} className="glass rounded-xl p-6">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <CompIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-bold mb-2">{comp.title}</h4>
                                <p className="text-muted-foreground text-sm">{comp.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.benefits && (
                    <div className="glass rounded-xl p-6 my-6">
                      <ul className="space-y-3">
                        {section.benefits.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{item.title}:</span>
                              <span className="text-muted-foreground"> {item.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
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

            {/* How To Section */}
            {howToSteps.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-primary" />
                  How to Implement AI Skills Mapping
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Implementing AI skills mapping in your organization involves key steps:
                </p>
                <ol className="space-y-4 my-6">
                  {howToSteps.map((step, i) => (
                    <li key={i} className="flex gap-4 glass rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
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
              <h3 className="font-bold">{furtherReading.title || "See AI Skills Mapping in Action"}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {furtherReading.description || "Request a demo to see Cognaium's AI-powered skills mapping."}
            </p>
            <Link href={furtherReading.link || "/contact"}>
              <Button className="gap-2">
                {furtherReading.buttonText || "Request a Demo"}
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
