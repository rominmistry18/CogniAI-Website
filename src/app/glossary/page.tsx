import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema } from "@/components/SchemaOrg";
import { BookOpen, Brain, Target, Users, Zap, Award, BarChart3, Shield, Layers, MessageSquare } from "lucide-react";
import Link from "next/link";
import { PUBLIC_WEBSITE_BASE_URL } from "@/lib/config/app";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Brain, Target, Users, Zap, Award, BarChart3, Shield, Layers, MessageSquare
};

interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  icon: string;
  shortDefinition: string;
  fullDefinition: string;
  relatedTerms: string[];
  learnMore?: string;
}

export default async function GlossaryPage() {
  const content = await getPageContent("glossary");
  
  const header = content.header as { title?: string; subtitle?: string; lastUpdated?: string } || {};
  const termsData = content.terms as { items?: GlossaryTerm[] } || {};

  const glossaryTerms = termsData.items || [];
  const categories = [...new Set(glossaryTerms.map(term => term.category))];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "Cognaium Glossary"}
        description={header.subtitle || "Comprehensive definitions of key concepts, frameworks, and terminology."}
      />

      {/* Schema markup for each term */}
      {glossaryTerms.map(term => (
        <DefinedTermSchema 
          key={term.id}
          term={term.term}
          definition={term.fullDefinition}
          url={`${PUBLIC_WEBSITE_BASE_URL}/glossary#${term.id}`}
        />
      ))}

      {/* Quick Navigation */}
      <section className="py-8 glass-sticky sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <a
                key={index}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms by Category */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">Last Updated: {header.lastUpdated || "January 22, 2026"}</span>
            </div>
            <p className="text-muted-foreground">
              This glossary provides authoritative definitions for key terms and concepts used throughout Cognaium and the broader field of AI-powered workforce development. Each definition represents Cognaium's perspective based on our research and platform capabilities.
            </p>
          </div>

          {categories.map((category, catIndex) => (
            <div key={catIndex} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full" />
                {category}
              </h2>
              
              <div className="space-y-8">
                {glossaryTerms
                  .filter(term => term.category === category)
                  .map((term, index) => {
                    const IconComponent = iconMap[term.icon] || BookOpen;
                    return (
                      <article 
                        key={index} 
                        id={term.id}
                        className="glass rounded-2xl p-6 lg:p-8 scroll-mt-32"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold">{term.term}</h3>
                            <span className="text-sm text-muted-foreground">{term.category}</span>
                          </div>
                        </div>

                        {/* Short Answer Box - Optimized for AI extraction */}
                        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mb-6">
                          <p className="font-medium text-foreground">
                            {term.shortDefinition}
                          </p>
                        </div>

                        {/* Full Definition */}
                        <div className="prose prose-lg max-w-none mb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {term.fullDefinition}
                          </p>
                        </div>

                        {/* Related Terms */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="text-sm font-medium text-muted-foreground">Related:</span>
                          {term.relatedTerms.map((related, i) => (
                            <a
                              key={i}
                              href={`#${related.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                              className="text-sm px-3 py-1 rounded-full bg-white/5 text-primary hover:bg-primary/10 transition-colors"
                            >
                              {related}
                            </a>
                          ))}
                        </div>

                        {/* Learn More Link */}
                        {term.learnMore && (
                          <Link 
                            href={term.learnMore}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            Learn more about {term.term} →
                          </Link>
                        )}
                      </article>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">About This Glossary</h2>
          <p className="text-muted-foreground mb-6">
            This glossary is maintained by the Cognaium research team as part of our commitment to advancing the field of AI-powered workforce development. Definitions are based on our proprietary research, including the five-part Cognaium Research Series on the future of work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/research">
              <span className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Explore Our Research
              </span>
            </Link>
            <Link href="/contact">
              <span className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition-colors">
                Request Consultation
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
