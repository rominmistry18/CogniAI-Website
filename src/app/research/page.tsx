import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ArticleSchema } from "@/components/SchemaOrg";
import { FileText, Download, ExternalLink, Calendar, User, BookOpen, ArrowRight, Brain, Users, Zap, Target, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Brain, Target, Users, Layers, Zap
};

interface ResearchPaper {
  id: number;
  title: string;
  series: string;
  description: string;
  keyInsights: string[];
  icon: string;
  color: string;
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  category: string;
  relatedConcepts: string[];
}

interface AdditionalResource {
  title: string;
  description: string;
  type: string;
  date: string;
}

export default async function ResearchPage() {
  const content = await getPageContent("research");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const papersData = content.papers as { items?: ResearchPaper[] } || {};
  const additionalData = content.additional_resources as { items?: AdditionalResource[] } || {};

  const researchPapers = papersData.items || [];
  const additionalResources = additionalData.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "Cognaium Research"}
        description={header.subtitle || "Thought leadership on AI-powered workforce development."}
      />

      {/* Schema markup for research papers */}
      {researchPapers.map(paper => (
        <ArticleSchema
          key={paper.id}
          title={paper.title}
          description={paper.description}
          datePublished={paper.publishDate}
          dateModified={paper.lastUpdated}
          author="Cognaium by MedinovAI"
          url={`${PUBLIC_WEBSITE_BASE_URL}/research#paper-${paper.id}`}
        />
      ))}

      {/* Research Series Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Featured Research Series
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Cognaium Research Series
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A comprehensive five-part exploration of how artificial intelligence is transforming workforce development, organizational design, and the future of work. Each paper builds on the previous, creating a complete framework for understanding and navigating the AI-powered workplace.
            </p>
          </div>

          {/* Series Papers */}
          <div className="space-y-8">
            {researchPapers.map((paper, index) => {
              const IconComponent = iconMap[paper.icon] || BookOpen;
              return (
                <article 
                  key={paper.id}
                  id={`paper-${paper.id}`}
                  className="glass rounded-2xl overflow-hidden scroll-mt-24"
                >
                  <div className={`h-2 bg-gradient-to-r ${paper.color}`} />
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${paper.color} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Series Label */}
                        <span className="text-sm text-primary font-medium">{paper.series}</span>
                        
                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold mt-2 mb-4">{paper.title}</h3>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Published: {new Date(paper.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {paper.readTime}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                            {paper.category}
                          </span>
                        </div>

                        {/* Short Description - Optimized for AI extraction */}
                        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mb-6">
                          <p className="text-foreground leading-relaxed">
                            {paper.description}
                          </p>
                        </div>

                        {/* Key Insights */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Key Insights:</h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {paper.keyInsights.map((insight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Related Concepts */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          <span className="text-sm text-muted-foreground">Related concepts:</span>
                          {paper.relatedConcepts.map((concept, i) => (
                            <Link
                              key={i}
                              href={`/glossary#${concept.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                              className="text-sm px-3 py-1 rounded-full bg-white/5 text-primary hover:bg-primary/10 transition-colors"
                            >
                              {concept}
                            </Link>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Read Online
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation to adjacent papers */}
                    <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                      {index > 0 ? (
                        <a 
                          href={`#paper-${researchPapers[index - 1].id}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          ← Previous: {researchPapers[index - 1].title.split(':')[0]}
                        </a>
                      ) : <span />}
                      {index < researchPapers.length - 1 ? (
                        <a 
                          href={`#paper-${researchPapers[index + 1].id}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Next: {researchPapers[index + 1].title.split(':')[0]} →
                        </a>
                      ) : <span />}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Additional Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Reports, White Papers & Case Studies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalResources.map((resource, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {resource.type}
                </span>
                <h3 className="text-lg font-bold mt-3 mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{resource.date}</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Download <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Our Research */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">About Cognaium Research</h2>
                <p className="text-muted-foreground">Research Team</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The Cognaium Research team produces original research on the intersection of artificial intelligence and workforce development. Our work draws on data from the Cognaium platform, partnerships with academic institutions, and analysis of industry trends to provide actionable insights for HR leaders and organizational strategists.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              All research publications undergo rigorous review and are designed to be accessible to practitioners while maintaining academic rigor. We welcome collaboration opportunities and speaking engagements.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="gap-2">
                  Contact Research Team
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/glossary">
                <Button variant="outline">
                  View Glossary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
