import { PageHeader } from "@/components/PageHeader";
import { getPageContent } from "@/lib/content";

interface TermsSection {
  title: string;
  content: string;
}

export default async function TermsPage() {
  const content = await getPageContent("terms");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const sectionsData = content.sections as { items?: TermsSection[]; lastUpdated?: string } || {};

  const sections = sectionsData.items || [];

  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title={header.title || "Terms of Service"}
        description={header.subtitle || "The rules and guidelines for using the Cognaium platform."}
      />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
            <div className="pt-8 border-t border-border">
              <p className="text-sm italic">Last updated: {sectionsData.lastUpdated || "January 2026"}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
