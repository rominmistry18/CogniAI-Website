"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Users, BookOpen, BarChart3, Eye } from "lucide-react";

// Icon mapping for dynamic icons from database
const iconMap: Record<string, React.ElementType> = {
  Users,
  BarChart3,
  BookOpen,
  Eye,
  Zap,
};

export interface PricingPlan {
  name: string;
  description: string;
  price: { monthly: number | string; annual: number | string };
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface PricingAddon {
  name: string;
  price: string;
  description: string;
  icon: string;
}

export interface PricingComparison {
  feature: string;
  starter: string;
  pro: string;
  enterprise: string;
}

export interface PricingFAQ {
  q: string;
  a: string;
}

export interface PricingContentProps {
  header?: {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
  plans?: PricingPlan[];
  addons?: PricingAddon[];
  comparison?: PricingComparison[];
  faq?: PricingFAQ[];
  cta?: {
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    primaryCtaLink?: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
  };
}

// Default content - used when no database content is provided
const defaultContent: Required<PricingContentProps> = {
  header: {
    badge: "Simple, Transparent Pricing",
    title: "Plans That Scale",
    titleHighlight: "With Your Organization",
    subtitle: "Start free for 14 days. No credit card required. Upgrade as you grow.",
  },
  plans: [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with AI assessments",
      price: { monthly: 99, annual: 79 },
      features: [
        "Up to 100 assessments/month",
        "10 active users",
        "AI-powered interviews (GPT-4)",
        "5 question types",
        "Basic proctoring",
        "Email support",
        "Basic analytics dashboard",
        "5 assessment templates"
      ],
      highlighted: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "For growing organizations with advanced needs",
      price: { monthly: 299, annual: 239 },
      features: [
        "Up to 1,000 assessments/month",
        "50 active users",
        "Multi-AI support (GPT-4, Claude, Gemini)",
        "All question types",
        "Full proctoring with AI detection",
        "Priority support",
        "Advanced analytics dashboard",
        "Unlimited templates",
        "Learning paths & training",
        "Basic certifications",
        "CCI scoring for ATS",
        "API access"
      ],
      highlighted: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom requirements",
      price: { monthly: "Custom", annual: "Custom" },
      features: [
        "Unlimited assessments",
        "Unlimited users",
        "Full AI suite with custom models",
        "Advanced proctoring + on-premise option",
        "Dedicated support + SLA",
        "Executive dashboards",
        "Custom integrations",
        "Multi-tenant deployment",
        "White-labeling & custom branding",
        "Subdomain routing",
        "AI Tutoring system",
        "Full HR suite",
        "Custom SLA & BAA available"
      ],
      highlighted: false,
      cta: "Contact Sales"
    }
  ],
  addons: [
    { 
      name: "Additional Users", 
      price: "$15/user/month", 
      description: "Add more team members to your plan",
      icon: "Users"
    },
    { 
      name: "Extra Storage", 
      price: "$10/100GB/month", 
      description: "For video recordings and document storage",
      icon: "BarChart3"
    },
    { 
      name: "AI Tutoring", 
      price: "$99/month", 
      description: "Multi-agent tutoring with voice support",
      icon: "BookOpen"
    },
    { 
      name: "On-Premise Proctoring", 
      price: "Custom", 
      description: "Deploy proctoring server on your infrastructure",
      icon: "Eye"
    },
    { 
      name: "Custom AI Model", 
      price: "Custom", 
      description: "Fine-tuned AI models for your domain",
      icon: "Zap"
    }
  ],
  comparison: [
    { feature: "Assessments/month", starter: "100", pro: "1,000", enterprise: "Unlimited" },
    { feature: "Active users", starter: "10", pro: "50", enterprise: "Unlimited" },
    { feature: "Question types", starter: "5", pro: "All", enterprise: "All + Custom" },
    { feature: "AI Providers", starter: "GPT-4", pro: "GPT-4, Claude, Gemini", enterprise: "All + Custom" },
    { feature: "Proctoring", starter: "Basic", pro: "Full (AI Detection)", enterprise: "Full + On-premise" },
    { feature: "ATS & CCI Scoring", starter: "—", pro: "✓", enterprise: "✓" },
    { feature: "Training Programs", starter: "—", pro: "✓", enterprise: "✓" },
    { feature: "Certifications", starter: "—", pro: "Basic", enterprise: "Full" },
    { feature: "AI Tutoring", starter: "—", pro: "—", enterprise: "✓" },
    { feature: "Multi-tenant", starter: "—", pro: "—", enterprise: "✓" },
    { feature: "White-labeling", starter: "—", pro: "—", enterprise: "✓" },
    { feature: "API Access", starter: "—", pro: "✓", enterprise: "Full" },
    { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated + SLA" }
  ],
  faq: [
    {
      q: "What's included in the free trial?",
      a: "Full access to all Professional plan features for 14 days. No credit card required. You can invite team members, create assessments, and test all features."
    },
    {
      q: "Can I change plans later?",
      a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate your billing accordingly."
    },
    {
      q: "What AI providers are supported?",
      a: "We support OpenAI GPT-4, Anthropic Claude, and Google Gemini. Enterprise plans can also integrate custom or fine-tuned models."
    },
    {
      q: "Is there a discount for non-profits or education?",
      a: "Yes, we offer 50% off for qualified non-profit organizations and educational institutions. Contact our sales team for details."
    },
    {
      q: "Do you offer HIPAA compliance?",
      a: "Yes, our Enterprise plan includes HIPAA-compliant infrastructure. We can provide a Business Associate Agreement (BAA) upon request."
    },
    {
      q: "Can I deploy on-premise?",
      a: "Enterprise customers can deploy the proctoring service on-premise. Full on-premise deployment is available for select enterprise agreements."
    }
  ],
  cta: {
    title: "Ready to Get Started?",
    subtitle: "Start your free trial today or schedule a demo to see Cognaium in action.",
    primaryCta: "Start Free Trial",
    primaryCtaLink: "/login",
    secondaryCta: "Schedule Demo",
    secondaryCtaLink: "/contact",
  },
};

export function PricingContent({ 
  header,
  plans,
  addons,
  comparison,
  faq,
  cta,
}: PricingContentProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  // Merge with defaults
  const headerData = { ...defaultContent.header, ...header };
  const plansData = plans && plans.length > 0 ? plans : defaultContent.plans;
  const addonsData = addons && addons.length > 0 ? addons : defaultContent.addons;
  const comparisonData = comparison && comparison.length > 0 ? comparison : defaultContent.comparison;
  const faqData = faq && faq.length > 0 ? faq : defaultContent.faq;
  const ctaData = { ...defaultContent.cta, ...cta };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {headerData.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {headerData.title}
              <span className="gradient-text block">{headerData.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {headerData.subtitle}
            </p>

            <div className="inline-flex items-center p-1 rounded-full glass">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Annual
                <span className="ml-2 text-xs text-accent">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plansData.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 relative ${
                  plan.highlighted
                    ? "glass border-primary/30 ring-2 ring-primary/20"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {typeof plan.price.monthly === "number" ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">Custom</div>
                  )}
                  {isAnnual && typeof plan.price.monthly === "number" && typeof plan.price.annual === "number" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.name === "Enterprise" ? "/contact" : "/login"}>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 bg-card/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Feature <span className="gradient-text">Comparison</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare plans to find the right fit for your organization.
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold bg-primary/5">Professional</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{row.starter}</td>
                      <td className="p-4 text-center text-sm text-muted-foreground bg-primary/5">{row.pro}</td>
                      <td className="p-4 text-center text-sm text-muted-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Optional <span className="gradient-text">Add-ons</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Extend your plan with additional features and capacity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addonsData.map((addon, index) => {
              const IconComponent = iconMap[addon.icon] || Zap;
              return (
                <div key={index} className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{addon.name}</h3>
                      <p className="text-sm font-bold text-primary">{addon.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faqItem, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">{faqItem.q}</h3>
                <p className="text-sm text-muted-foreground">{faqItem.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {ctaData.title}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {ctaData.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ctaData.primaryCtaLink || "/login"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                {ctaData.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={ctaData.secondaryCtaLink || "/contact"}>
              <Button size="lg" variant="outline">
                {ctaData.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
