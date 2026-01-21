import { PageHeader } from "@/components/PageHeader";
import { Shield, Lock, Database, Users, FileText, CheckCircle2, Globe, Activity, Server, Eye } from "lucide-react";

export default function CompliancePage() {
  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title="Compliance & Data Protection" 
        description="Meeting the highest standards for data security, privacy, and regulatory compliance across industries."
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
                <h2 className="text-2xl font-bold">HIPAA Compliance</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                CogniAI is designed to be fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). We implement all necessary administrative, physical, and technical safeguards to protect Protected Health Information (PHI).
              </p>
              <ul className="space-y-3">
                {[
                  "Strict access controls and identity management",
                  "Comprehensive audit logs for all data access",
                  "Encrypted data at rest and in transit",
                  "Business Associate Agreements (BAA) available",
                  "Regular security assessments and training"
                ].map((item, i) => (
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
                <h2 className="text-2xl font-bold">GDPR Compliance</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For our European customers and global CRO partners, we align our data processing practices with the General Data Protection Regulation (GDPR) requirements.
              </p>
              <ul className="space-y-3">
                {[
                  "Right to be forgotten and data portability",
                  "Consent management and preference centers",
                  "Data minimization and purpose limitation",
                  "Transparent data processing documentation",
                  "Data Protection Impact Assessments (DPIA)"
                ].map((item, i) => (
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
                  <h2 className="text-2xl font-bold">Multi-Tenant Data Isolation</h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our multi-tenant architecture ensures complete data isolation between organizations. Each tenant's data is segregated at the database level with tenant-specific identifiers enforced on every query.
                </p>
                <ul className="space-y-3">
                  {[
                    "Tenant ID validation on all API requests",
                    "Subdomain-based routing and validation",
                    "Separate encryption contexts per tenant",
                    "Isolated file storage and media assets",
                    "Cross-tenant access prevention at middleware level"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Lock, title: "Encryption", desc: "AES-256 at rest" },
                  { icon: Server, title: "Isolation", desc: "Per-tenant databases" },
                  { icon: Eye, title: "Audit", desc: "Complete logging" },
                  { icon: Users, title: "RBAC", desc: "Granular permissions" }
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-5 text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Standards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">SOC 2 Type II Aligned</h3>
              <p className="text-sm text-muted-foreground">
                Our infrastructure is built to audit-ready standards for security, availability, processing integrity, and confidentiality.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">CCPA Compliance</h3>
              <p className="text-sm text-muted-foreground">
                California Consumer Privacy Act compliance with data access, deletion, and opt-out capabilities for California residents.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Industry Standards</h3>
              <p className="text-sm text-muted-foreground">
                Following OWASP security guidelines, NIST frameworks, and industry best practices for secure software development.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              For compliance documentation, BAA requests, or security questionnaires, please contact our security team at{" "}
              <a href="mailto:security@cogniai.us" className="text-primary hover:underline">security@cogniai.us</a>
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">Last updated: January 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
