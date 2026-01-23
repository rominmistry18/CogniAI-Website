import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Lock, Server, Shield, Activity, Database, CheckCircle2, Eye, Key, Users, Globe, Bell, Code } from "lucide-react";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Lock, Server, Shield, Activity, Database, Eye, Key, Users, Globe, Bell, Code, CheckCircle2
};

interface SecurityLayer {
  title: string;
  icon: string;
  items: string[];
}

interface ComplianceItem {
  title: string;
  description: string;
  icon: string;
}

interface MultiTenantFeature {
  icon: string;
  title: string;
  description: string;
}

interface ProctoringSecurity {
  title?: string;
  description?: string;
  features?: Array<{ icon: string; label: string }>;
  items?: string[];
}

export default async function SecurityPage() {
  const content = await getPageContent("security");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const layersData = content.layers as { items?: SecurityLayer[] } || {};
  const complianceData = content.compliance_items as { items?: ComplianceItem[] } || {};
  const multiTenantData = content.multi_tenant as { 
    title?: string; 
    description?: string; 
    features?: MultiTenantFeature[];
    stats?: Array<{ value: string; label: string }>;
  } || {};
  const proctoringData = content.proctoring as ProctoringSecurity || {};

  const securityLayers = layersData.items || [];
  const complianceItems = complianceData.items || [];
  const multiTenantFeatures = multiTenantData.features || [];
  const multiTenantStats = multiTenantData.stats || [];
  const proctoringFeatures = proctoringData.features || [];
  const proctoringItems = proctoringData.items || [];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={header.title || "Security by Design. Privacy by Default."}
        description={header.subtitle || "Enterprise-grade security with multi-tenant isolation."}
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
            {securityLayers.map((layer, index) => {
              const IconComponent = iconMap[layer.icon] || Shield;
              return (
                <div key={index} className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
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
              );
            })}
          </div>

          {/* Multi-Tenant Security */}
          <div className="glass p-8 lg:p-12 rounded-3xl mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{multiTenantData.title || "Multi-Tenant Architecture"}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {multiTenantData.description || "Cognaium operates on a true multi-tenant architecture where each organization's data is completely isolated."}
                </p>
                
                <div className="space-y-4">
                  {multiTenantFeatures.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || Server;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {multiTenantStats.map((stat, i) => (
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
            {complianceItems.map((item, index) => {
              const IconComponent = iconMap[item.icon] || ShieldCheck;
              return (
                <div key={index} className="glass p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Proctoring Security */}
          <div className="glass p-8 lg:p-12 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {proctoringFeatures.map((item, i) => {
                    const IconComponent = iconMap[item.icon] || Eye;
                    return (
                      <div key={i} className="glass rounded-xl p-4 text-center">
                        <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">{proctoringData.title || "Proctoring Security"}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {proctoringData.description || "Our proctoring system uses AI-powered person detection and audio monitoring."}
                </p>
                
                <ul className="space-y-2">
                  {proctoringItems.map((item, i) => (
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
