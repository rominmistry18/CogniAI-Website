"use client";

import { Shield, Lock, Server, Database, Eye, Users, CheckCircle2, Globe, Key, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const securityFeatures = [
  {
    icon: Database,
    title: "Multi-Tenant Isolation",
    description: "Complete data segregation with tenant-specific databases, subdomain routing, and isolated storage."
  },
  {
    icon: Lock,
    title: "Encryption",
    description: "AES-256 encryption at rest and TLS 1.3 in transit. All sensitive data is encrypted by default."
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular RBAC with Admin, HR, Manager, and Employee roles. Custom permissions per tenant."
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description: "Comprehensive audit trails for all user actions, data access, and system changes."
  },
  {
    icon: Key,
    title: "Authentication",
    description: "NextAuth.js with JWT tokens, SSO integration, password hashing with bcrypt, and session management."
  },
  {
    icon: Activity,
    title: "Monitoring",
    description: "Real-time health checks, performance monitoring, and automated alerts for anomalies."
  }
];

const certifications = [
  {
    title: "HIPAA Ready",
    description: "Designed for healthcare with PHI protection and BAA availability.",
    icon: Shield
  },
  {
    title: "SOC 2 Aligned",
    description: "Infrastructure built to audit-ready standards for security and availability.",
    icon: CheckCircle2
  },
  {
    title: "GDPR Compliant",
    description: "Data protection and privacy controls for EU requirements.",
    icon: Globe
  }
];

export function TrustSecurity() {
  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Security by Design
            <span className="gradient-text block">Privacy by Default</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on zero-trust architecture with enterprise-grade security controls and compliance frameworks.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="glass rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Compliance & Certifications</h3>
              <p className="text-muted-foreground mb-8">
                Cognaium is designed to meet the most stringent compliance requirements across industries. Our infrastructure supports healthcare, finance, and government deployments.
              </p>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <cert.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/security">
                  <Button variant="outline">
                    Learn More About Security
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "AES-256", label: "Encryption" },
                { value: "TLS 1.3", label: "In Transit" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "24/7", label: "Monitoring" }
              ].map((stat, index) => (
                <div key={index} className="glass rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
