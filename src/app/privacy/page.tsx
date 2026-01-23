import { PageHeader } from "@/components/PageHeader";
import { getPageContent } from "@/lib/content";

interface PrivacySection {
  title: string;
  content: string;
}

export default async function PrivacyPage() {
  const content = await getPageContent("privacy");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const sectionsData = content.sections as { items?: PrivacySection[] } || {};

  const sections = sectionsData.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "Your Data. Your Trust. Our Responsibility."}
        description={header.subtitle || "Transparency for the Employee & the Enterprise. Last Updated: January 2026"}
      />
      
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 md:p-12 rounded-3xl space-y-12">
            <div className="prose prose-invert max-w-none">
              {sections.map((section, index) => (
                <section key={index} className={`space-y-6 ${index > 0 ? 'pt-8 border-t border-white/5' : ''}`}>
                  <h2 className="text-2xl font-bold text-foreground font-heading">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
