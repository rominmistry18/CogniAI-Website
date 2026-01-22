import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Lock, Server, Shield, Activity, Database, CheckCircle2, Eye, Key, Users, Globe, Bell, Code } from "lucide-react";

export default function SecurityPage() {
  const securityLayers = [
    {
      title: "Application Security",
      icon: <Code className="w-6 h-6 text-primary" />,
      items: [
        "SQL injection protection with parameterized queries",
        "XSS prevention and input sanitization",
        "CSRF token validation",
        "Rate limiting on all API endpoints",
        "Secure session management with JWT"
      ]
    },
    {
      title: "Data Protection",
      icon: <Database className="w-6 h-6 text-accent" />,
      items: [
        "AES-256 encryption at rest",
        "TLS 1.3 encryption in transit",
        "Multi-tenant data isolation",
        "Encrypted backups with point-in-time recovery",
        "Secure file upload validation"
      ]
    },
    {
      title: "Access Control",
      icon: <Key className="w-6 h-6 text-primary" />,
      items: [
        "Role-Based Access Control (RBAC)",
        "Granular permissions per role",
        "Password hashing with bcrypt",
        "Session timeout and invalidation",
        "SSO and OAuth2 integration support"
      ]
    },
    {
      title: "Monitoring & Audit",
      icon: <Activity className="w-6 h-6 text-accent" />,
      items: [
        "Comprehensive audit logging",
        "Real-time security monitoring",
        "Automated threat detection",
        "Activity tracking per user",
        "Advanced log analysis"
      ]
    }
  ];

  const complianceItems = [
    {
      title: "HIPAA (Healthcare)",
      description: "Full compliance for Protected Health Information (PHI) with administrative, physical, and technical safeguards. BAA available for enterprise customers.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "GDPR (Europe)",
      description: "Data protection and privacy controls including right to erasure, data portability, and consent management for EU operations.",
      icon: <Globe className="w-6 h-6 text-accent" />,
    },
    {
      title: "SOC 2 Type II Aligned",
      description: "Infrastructure built to audit-ready standards for security, availability, processing integrity, and confidentiality.",
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Security by Design. Privacy by Default." 
        description="Enterprise-grade security with multi-tenant isolation, encryption, and compliance frameworks to protect your most sensitive data."
      />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Security Architecture */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Defense in Depth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple layers of security controls protect your data at every level of the stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {securityLayers.map((layer, index) => (
              <div key={index} className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {layer.icon}
                  </div>
                  <h3 className="text-xl font-bold">{layer.title}</h3>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Multi-Tenant Security */}
          <div className="glass p-8 lg:p-12 rounded-3xl mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Multi-Tenant Architecture</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Cognaium operates on a true multi-tenant architecture where each organization's data is completely isolated. We use tenant-specific identifiers at every layer of the stack to ensure data never crosses organizational boundaries.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Server className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Subdomain Routing</h4>
                      <p className="text-sm text-muted-foreground">Each organization gets a dedicated subdomain with automatic request routing and validation.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Data Isolation</h4>
                      <p className="text-sm text-muted-foreground">Tenant ID validation on every database query ensures complete data segregation.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Credential Isolation</h4>
                      <p className="text-sm text-muted-foreground">Per-tenant encryption keys and authentication contexts prevent cross-tenant access.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100%", label: "Data Isolation" },
                  { value: "0", label: "Cross-Tenant Access" },
                  { value: "Real-time", label: "Validation" },
                  { value: "Automatic", label: "Routing" }
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compliance & Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built to meet the most stringent regulatory requirements across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {complianceItems.map((item, index) => (
              <div key={index} className="glass p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Proctoring Security */}
          <div className="glass p-8 lg:p-12 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Eye, label: "AI Detection" },
                    { icon: Bell, label: "Audio Monitoring" },
                    { icon: Shield, label: "Browser Security" },
                    { icon: Activity, label: "Violation Logging" }
                  ].map((item, i) => (
                    <div key={i} className="glass rounded-xl p-4 text-center">
                      <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">Proctoring Security</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our proctoring system uses AI-powered person detection and audio monitoring, ensuring assessment integrity while respecting privacy. All proctoring data is encrypted and can be deployed on-premise for enterprise customers.
                </p>
                
                <ul className="space-y-2">
                  {[
                    "Local processing option for sensitive environments",
                    "Encrypted WebSocket connections",
                    "Configurable data retention policies",
                    "GDPR-compliant consent workflows"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
