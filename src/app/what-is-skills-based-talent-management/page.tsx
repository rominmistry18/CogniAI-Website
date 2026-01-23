import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema, ArticleSchema } from "@/components/SchemaOrg";
import { Award, Users, TrendingUp, Target, CheckCircle2, ArrowRight, BookOpen, Brain, Layers, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

const pageUrl = `${PUBLIC_WEBSITE_BASE_URL}/what-is-skills-based-talent-management`;

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Users, TrendingUp, Target, Brain, Layers, Briefcase, BookOpen
};

export const metadata: Metadata = {
  title: "What is Skills-Based Talent Management? | Cognaium",
  description: "Skills-Based Talent Management prioritizes skills over job titles. Learn how this approach transforms hiring, development, and workforce planning with Cognaium.",
  keywords: ["skills-based talent management", "skills-based hiring", "skills-based organization", "competency management", "skill-first approach"],
  alternates: {
    canonical: pageUrl
  }
};

interface ContentSection {
  id: string;
  title: string;
  icon: string;
  content?: string;
  comparison?: { traditional: string[]; skillsBased: string[] };
  components?: Array<{ title: string; icon: string; description: string }>;
  benefits?: Array<{ title: string; desc: string }>;
  steps?: Array<{ step: string; title: string; desc: string }>;
}

interface RelatedConcept {
  label: string;
  href: string;
}

export default async function WhatIsSkillsBasedTalentManagementPage() {
  const content = await getPageContent("what_is_sbtm");
  
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
        title={header.title || "What is Skills-Based Talent Management?"}
        description={header.subtitle || "Understanding the methodology that prioritizes capabilities over credentials."}
      />

      {/* Schema Markup */}
      <DefinedTermSchema
        term="Skills-Based Talent Management"
        definition="An approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials."
        url={pageUrl}
      />
      <ArticleSchema
        title="What is Skills-Based Talent Management?"
        description="Comprehensive guide to Skills-Based Talent Management - the methodology prioritizing capabilities over credentials in workforce management."
        datePublished="2025-07-20"
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
              {quickAnswer.text || "Skills-Based Talent Management prioritizes skills, competencies, and capabilities over traditional job titles."}
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {sections.map((section, idx) => {
              const IconComponent = iconMap[section.icon] || Award;
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

                  {section.comparison && (
                    <div className="glass rounded-xl p-6 my-6">
                      <h4 className="font-semibold mb-4">Traditional vs. Skills-Based Approach</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-500/5 rounded-lg">
                          <h5 className="font-medium text-red-600 mb-2">Traditional (Job-Based)</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {section.comparison.traditional.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-green-500/5 rounded-lg">
                          <h5 className="font-medium text-green-600 mb-2">Skills-Based</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {section.comparison.skillsBased.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.components && (
                    <div className="space-y-6 my-6">
                      {section.components.map((comp, i) => {
                        const CompIcon = iconMap[comp.icon] || Layers;
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

                  {section.steps && (
                    <ol className="space-y-4 my-6">
                      {section.steps.map((item, i) => (
                        <li key={i} className="flex gap-4 glass rounded-xl p-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
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
