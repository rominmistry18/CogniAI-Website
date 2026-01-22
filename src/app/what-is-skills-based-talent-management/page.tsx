import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema, ArticleSchema } from "@/components/SchemaOrg";
import { Award, Users, TrendingUp, Target, CheckCircle2, ArrowRight, BookOpen, Brain, Layers, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What is Skills-Based Talent Management? | Cognaium",
  description: "Skills-Based Talent Management prioritizes skills over job titles. Learn how this approach transforms hiring, development, and workforce planning with Cognaium.",
  keywords: ["skills-based talent management", "skills-based hiring", "skills-based organization", "competency management", "skill-first approach"],
  alternates: {
    canonical: "https://www.cogniai.us/what-is-skills-based-talent-management"
  }
};

export default function WhatIsSkillsBasedTalentManagementPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="What is Skills-Based Talent Management?" 
        description="Understanding the methodology that prioritizes capabilities over credentials in modern workforce management."
      />

      {/* Schema Markup */}
      <DefinedTermSchema
        term="Skills-Based Talent Management"
        definition="An approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials."
        url="https://www.cogniai.us/what-is-skills-based-talent-management"
      />
      <ArticleSchema
        title="What is Skills-Based Talent Management?"
        description="Comprehensive guide to Skills-Based Talent Management - the methodology prioritizing capabilities over credentials in workforce management."
        datePublished="2025-07-20"
        dateModified="2026-01-22"
        author="Cognaium by MedinovAI"
        url="https://www.cogniai.us/what-is-skills-based-talent-management"
      />

      {/* Quick Answer Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Quick Answer</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              Skills-Based Talent Management is an approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials. This methodology enables organizations to identify hidden talent, create more inclusive hiring practices, build flexible career pathways, and respond faster to changing skill demands.
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
                <Award className="w-7 h-7 text-primary" />
                The Shift from Jobs to Skills
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditional talent management focuses on jobs—predefined bundles of tasks organized into roles with specific titles, required degrees, and years of experience. This approach made sense when work was stable and predictable, but today's rapid pace of change makes it increasingly obsolete.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Skills-Based Talent Management shifts focus from jobs to skills—the actual capabilities people possess and apply in their work. This enables organizations to be more precise about what they need, more inclusive about who can provide it, and more agile in how they deploy talent.
              </p>
              
              <div className="glass rounded-xl p-6 my-6">
                <h4 className="font-semibold mb-4">Traditional vs. Skills-Based Approach</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-500/5 rounded-lg">
                    <h5 className="font-medium text-red-600 mb-2">Traditional (Job-Based)</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Hire for job titles</li>
                      <li>• Require specific degrees</li>
                      <li>• Rigid career ladders</li>
                      <li>• Siloed talent pools</li>
                      <li>• Slow to adapt</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-500/5 rounded-lg">
                    <h5 className="font-medium text-green-600 mb-2">Skills-Based</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Hire for capabilities</li>
                      <li>• Value demonstrated skills</li>
                      <li>• Flexible career lattices</li>
                      <li>• Connected talent pools</li>
                      <li>• Rapid redeployment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="w-7 h-7 text-primary" />
                Key Components of Skills-Based Talent Management
              </h2>
              
              <div className="space-y-6 my-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Skill Taxonomy</h4>
                      <p className="text-muted-foreground text-sm">
                        A comprehensive, standardized vocabulary for describing skills across the organization. This creates a common language that enables skill-based matching, development planning, and workforce analytics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Skill Assessment & Validation</h4>
                      <p className="text-muted-foreground text-sm">
                        Methods to identify and verify skills including AI-powered assessments, manager endorsements, certifications, and project-based evidence. Cognaium's AI screening platform provides robust skill validation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Skills-Based Hiring</h4>
                      <p className="text-muted-foreground text-sm">
                        Recruiting practices that evaluate candidates on demonstrated skills rather than credentials, expanding talent pools and reducing bias. Includes AI-powered screening and skill-based job matching.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Skill-Based Development</h4>
                      <p className="text-muted-foreground text-sm">
                        Learning programs aligned to skill gaps and career aspirations rather than generic training catalogs. AI tutoring enables personalized skill development paths.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                Benefits of Skills-Based Talent Management
              </h2>
              
              <div className="glass rounded-xl p-6 my-6">
                <ul className="space-y-3">
                  {[
                    { title: "Expanded Talent Pools", desc: "By focusing on skills rather than credentials, organizations access candidates previously filtered out by degree requirements or job title matching." },
                    { title: "Reduced Bias", desc: "Skill-based evaluation provides more objective criteria than traditional proxies like school prestige or previous employer brand." },
                    { title: "Improved Internal Mobility", desc: "Employees can move based on skill adjacencies rather than climbing narrow career ladders, improving retention and engagement." },
                    { title: "Faster Reskilling", desc: "Understanding skill gaps enables targeted development rather than generic training, accelerating capability building." },
                    { title: "Better Workforce Planning", desc: "Skill-level visibility enables strategic planning around capability needs rather than headcount." }
                  ].map((item, i) => (
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
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-primary" />
                Implementing Skills-Based Talent Management
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Transitioning to skills-based practices requires systematic change across HR processes:
              </p>

              <ol className="space-y-4 my-6">
                {[
                  { step: "1", title: "Build Your Skill Taxonomy", desc: "Define the skills that matter for your organization, creating a common vocabulary for all talent processes." },
                  { step: "2", title: "Map Current Skills", desc: "Use AI-powered tools to identify existing skills across your workforce through assessments, resume parsing, and manager input." },
                  { step: "3", title: "Redesign Job Architectures", desc: "Express roles in terms of required skills rather than traditional job descriptions." },
                  { step: "4", title: "Transform Hiring Practices", desc: "Implement skill-based screening that evaluates candidates on demonstrated capabilities." },
                  { step: "5", title: "Enable Continuous Development", desc: "Create personalized learning paths based on skill gaps and career aspirations." }
                ].map((item, i) => (
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
            </div>
          </article>

          {/* Related Concepts */}
          <div className="border-t border-border pt-8 mt-12">
            <h3 className="font-bold mb-4">Related Concepts</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Human Capital Liquidity", href: "/what-is-human-capital-liquidity" },
                { label: "AI Skills Mapping", href: "/what-is-ai-skills-mapping" },
                { label: "Skill Taxonomy", href: "/glossary#skill-taxonomy" },
                { label: "Composite Candidate Index", href: "/glossary#composite-candidate-index" }
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
              Learn more about skills-based practices in our research paper "The Skills-Based Economy" — Part 1 of the Cognaium Research Series.
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
            <p>Last Updated: January 22, 2026 | Author: Cognaium Research Team</p>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
