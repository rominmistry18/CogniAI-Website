import { PageHeader } from "@/components/PageHeader";
import { Shield, Lock, Database, Users, FileText, CheckCircle2, Globe, Activity, Server, Eye } from "lucide-react";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Lock, Database, Users, FileText, Globe, Activity, Server, Eye
};

interface HIPAAContent {
  title?: string;
  description?: string;
  items?: string[];
}

interface GDPRContent {
  title?: string;
  description?: string;
  items?: string[];
}

interface MultiTenantContent {
  title?: string;
  description?: string;
  items?: string[];
  stats?: Array<{ icon: string; title: string; desc: string }>;
}

interface StandardItem {
  icon: string;
  title: string;
  description: string;
}

interface StandardsContent {
  items?: StandardItem[];
  footer?: { text: string; email: string; lastUpdated: string };
}

export default async function CompliancePage() {
  const content = await getPageContent("compliance");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const hipaa = content.hipaa as HIPAAContent || {};
  const gdpr = content.gdpr as GDPRContent || {};
  const multiTenant = content.multi_tenant as MultiTenantContent || {};
  const standards = content.standards as StandardsContent || {};

  const hipaaItems = hipaa.items || [];
  const gdprItems = gdpr.items || [];
  const multiTenantItems = multiTenant.items || [];
  const multiTenantStats = multiTenant.stats || [];
  const standardItems = standards.items || [];

  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title={header.title || "Compliance & Data Protection"}
        description={header.subtitle || "Meeting the highest standards for data security, privacy, and regulatory compliance."}
      />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Compliance Areas */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="glass p-8 md:p-10 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{hipaa.title || "HIPAA Compliance"}</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {hipaa.description || "Cognaium is designed to be fully compliant with HIPAA."}
              </p>
              <ul className="space-y-3">
                {hipaaItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-8 md:p-10 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">{gdpr.title || "GDPR Compliance"}</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {gdpr.description || "We align our data processing practices with GDPR requirements."}
              </p>
              <ul className="space-y-3">
                {gdprItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Multi-Tenant Data Isolation */}
          <div className="glass p-8 md:p-12 rounded-3xl mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{multiTenant.title || "Multi-Tenant Data Isolation"}</h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {multiTenant.description || "Our multi-tenant architecture ensures complete data isolation."}
                </p>
                <ul className="space-y-3">
                  {multiTenantItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {multiTenantStats.map((item, i) => {
                  const IconComponent = iconMap[item.icon] || Lock;
                  return (
                    <div key={i} className="glass rounded-xl p-5 text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Standards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {standardItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || FileText;
              return (
                <div key={index} className="glass p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              {standards.footer?.text || "For compliance documentation, BAA requests, or security questionnaires, please contact our security team at"}{" "}
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${standards.footer?.email || "security@cognaium.com"}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {standards.footer?.email || "security@cognaium.com"}
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">Last updated: {standards.footer?.lastUpdated || "January 2026"}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
