import { PageHeader } from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title="Terms of Service" 
        description="The rules and guidelines for using the CogniAI platform."
      />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using CogniAI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily use the CogniAI platform for personal, non-commercial transitory viewing or as part of an authorized enterprise subscription. This is the grant of a license, not a transfer of title.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p>The materials on CogniAI are provided on an 'as is' basis. CogniAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p>In no event shall CogniAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CogniAI.</p>
            </div>
            <div className="pt-8 border-t border-border">
              <p className="text-sm italic">Last updated: January 2026</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
