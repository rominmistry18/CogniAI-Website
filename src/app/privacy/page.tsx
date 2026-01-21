import { PageHeader } from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Your Data. Your Trust. Our Responsibility." 
        description="Transparency for the Employee & the Enterprise. Last Updated: January 2026"
      />
      
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 md:p-12 rounded-3xl space-y-12">
            <div className="prose prose-invert max-w-none">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground font-heading">1. What We Collect</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We collect professional competency data (assessment scores, skill gaps, certification dates) and professional identity information. We <span className="text-foreground font-semibold">do not</span> collect personal patient health records or unrelated personal financial data.
                </p>
              </section>

              <section className="space-y-6 pt-8 border-t border-white/5">
                <h2 className="text-2xl font-bold text-foreground font-heading">2. How AI Uses Your Data</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  CogniAI uses anonymized, aggregated performance data to train our "Clinical Skill Models." <span className="text-foreground font-semibold">Your specific institutional data is never used to train the public model without your explicit consent.</span>
                </p>
              </section>

              <section className="space-y-6 pt-8 border-t border-white/5">
                <h2 className="text-2xl font-bold text-foreground font-heading">3. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  You retain ownership of your institutional workforce data. Upon contract termination, all specific workforce maps are either returned or cryptographically shredded.
                </p>
              </section>

              <section className="space-y-6 pt-8 border-t border-white/5">
                <h2 className="text-2xl font-bold text-foreground font-heading">4. Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We implement military-grade encryption and rigorous access controls to ensure your data remains secure. Our systems are audited regularly to maintain compliance with global standards.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
