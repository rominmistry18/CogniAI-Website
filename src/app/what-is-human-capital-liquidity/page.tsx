import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema, ArticleSchema } from "@/components/SchemaOrg";
import { Users, TrendingUp, Zap, BarChart3, CheckCircle2, ArrowRight, BookOpen, Target, Layers, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What is Human Capital Liquidity? | CogniAI",
  description: "Human Capital Liquidity is a framework measuring how fluidly skills and talent can flow within organizations. Learn how to measure and improve workforce agility with CogniAI.",
  keywords: ["human capital liquidity", "workforce agility", "talent mobility", "skills-based talent management", "skill transferability"],
  alternates: {
    canonical: "https://www.cogniai.us/what-is-human-capital-liquidity"
  }
};

export default function WhatIsHumanCapitalLiquidityPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="What is Human Capital Liquidity?" 
        description="Understanding the framework that measures workforce agility and talent mobility in modern organizations."
      />

      {/* Schema Markup */}
      <DefinedTermSchema
        term="Human Capital Liquidity"
        definition="A quantitative framework measuring how fluidly skills and talent can flow within and across organizations, assessing skill transferability, role adaptability, and workforce agility."
        url="https://www.cogniai.us/what-is-human-capital-liquidity"
      />
      <ArticleSchema
        title="What is Human Capital Liquidity?"
        description="Comprehensive guide to Human Capital Liquidity - the framework measuring workforce agility and talent mobility in organizations."
        datePublished="2025-06-15"
        dateModified="2026-01-22"
        author="CogniAI by MedinovAI"
        url="https://www.cogniai.us/what-is-human-capital-liquidity"
      />

      {/* Quick Answer Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Quick Answer</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              Human Capital Liquidity is a quantitative framework developed by CogniAI that measures how fluidly skills and talent can flow within and across organizations. It assesses skill transferability, role adaptability, and workforce agility to enable dynamic talent allocation. Organizations with high human capital liquidity can rapidly redeploy talent to meet changing business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            
            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-primary" />
                Why Human Capital Liquidity Matters
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In traditional workforce models, employees are hired for specific roles and often remain locked into those positions until they leave or are promoted. This creates rigid organizational structures that struggle to adapt when business needs change, skills become obsolete, or new opportunities emerge.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Human Capital Liquidity addresses this challenge by treating workforce capabilities as a dynamic resource that can flow to where it's needed most—much like financial liquidity allows capital to be deployed efficiently across an organization.
              </p>
              <div className="glass rounded-xl p-6 my-6">
                <h4 className="font-semibold mb-3">Organizations with High Human Capital Liquidity Can:</h4>
                <ul className="space-y-2">
                  {[
                    "Rapidly redeploy talent when priorities shift",
                    "Reduce external hiring costs by maximizing internal mobility",
                    "Respond faster to market changes and competitive threats",
                    "Improve employee retention by enabling career growth",
                    "Build resilience against skill obsolescence"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-primary" />
                How is Human Capital Liquidity Measured?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CogniAI's Human Capital Liquidity framework measures three core dimensions that together determine how fluidly talent can move within an organization:
              </p>
              
              <div className="grid gap-6 my-6">
                {[
                  {
                    title: "Skill Transferability",
                    description: "How readily an employee's skills can be applied across different roles, teams, or business units. Higher transferability means greater liquidity potential.",
                    icon: Layers
                  },
                  {
                    title: "Role Adaptability",
                    description: "The speed and ease with which employees can transition between roles, including learning curve, support requirements, and time to productivity.",
                    icon: Zap
                  },
                  {
                    title: "Organizational Enablement",
                    description: "How well the organization's structure, culture, and systems support internal mobility—including visibility into opportunities, manager support, and development resources.",
                    icon: Target
                  }
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                How to Improve Human Capital Liquidity
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Organizations can improve their human capital liquidity through several strategies:
              </p>

              <div className="space-y-6 my-6">
                <div className="glass rounded-xl p-6">
                  <h4 className="font-bold mb-2">1. Implement Skills-Based Talent Management</h4>
                  <p className="text-muted-foreground text-sm">
                    Move beyond job titles to understand and track the actual skills your workforce possesses. This creates visibility into hidden capabilities and enables skill-based matching.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-bold mb-2">2. Create Internal Talent Marketplaces</h4>
                  <p className="text-muted-foreground text-sm">
                    Make internal opportunities visible to all employees and enable skill-based matching between people and projects, gigs, or permanent roles.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-bold mb-2">3. Invest in Continuous Learning</h4>
                  <p className="text-muted-foreground text-sm">
                    Build development programs that help employees acquire adjacent skills, increasing their transferability across the organization.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h4 className="font-bold mb-2">4. Use AI-Powered Skill Mapping</h4>
                  <p className="text-muted-foreground text-sm">
                    Deploy AI tools like CogniAI to automatically identify, validate, and track skills across your workforce, maintaining real-time visibility into organizational capabilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                Human Capital Liquidity and CogniAI
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CogniAI's platform is designed to help organizations measure and improve their human capital liquidity through:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  "AI-powered skills mapping that identifies capabilities across your workforce",
                  "Skill gap analysis that highlights development priorities",
                  "AI tutoring that accelerates skill acquisition",
                  "Certification programs that validate transferable capabilities",
                  "Analytics dashboards that track liquidity metrics over time"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Related Concepts */}
          <div className="border-t border-border pt-8 mt-12">
            <h3 className="font-bold mb-4">Related Concepts</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Skills-Based Talent Management", href: "/what-is-skills-based-talent-management" },
                { label: "AI Skills Mapping", href: "/what-is-ai-skills-mapping" },
                { label: "Workforce Agility", href: "/glossary#workforce-agility" },
                { label: "Skill Taxonomy", href: "/glossary#skill-taxonomy" }
              ].map((concept, i) => (
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
              <h3 className="font-bold">Further Reading</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              The Human Capital Liquidity framework is explored in depth in our research paper "The Skills-Based Economy" — Part 1 of the CogniAI Research Series.
            </p>
            <Link href="/research#paper-1">
              <Button variant="outline" className="gap-2">
                Read the Research Paper
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Meta Footer */}
          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
            <p>Last Updated: January 22, 2026 | Author: CogniAI Research Team</p>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
