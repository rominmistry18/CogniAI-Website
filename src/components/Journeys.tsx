"use client";

import { Building2, GraduationCap, Briefcase, Users, Heart, Factory, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Icon mapping for dynamic icons from database
const iconMap: Record<string, React.ElementType> = {
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  Factory,
};

export interface Journey {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  color: string;
}

export interface JourneysProps {
  header?: {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
  journeys?: Journey[];
}

// Default content
const defaultJourneys: Journey[] = [
  {
    icon: "Building2",
    title: "For Enterprises",
    subtitle: "Scale Your Workforce Intelligence",
    description: "Multi-tenant architecture with white-labeling, custom branding, and complete data isolation. Deploy Cognaium across departments with role-based access control.",
    features: [
      "Multi-tenant deployment with subdomain routing",
      "White-label branding and custom themes",
      "Executive dashboards and org-wide analytics",
      "SSO integration and enterprise security",
      "Dedicated support and SLA"
    ],
    cta: "Enterprise Solutions",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: "Users",
    title: "For HR Teams",
    subtitle: "Streamline Talent Operations",
    description: "Complete HR toolkit from recruitment to development. AI-powered screening, applicant tracking, policy management, and employee development in one platform.",
    features: [
      "AI Screening with multiple question types",
      "Full ATS with CCI scoring",
      "Policy management and acknowledgments",
      "Training programs and certifications",
      "KRA/KPI tracking and reviews"
    ],
    cta: "HR Solutions",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: "GraduationCap",
    title: "For Education & Training",
    subtitle: "Transform Learning Experiences",
    description: "AI tutoring with multi-agent orchestration, personalized learning paths, and certification programs. Create engaging content with AI video generation.",
    features: [
      "AI Tutoring with voice support",
      "Personalized learning paths",
      "AI-generated training content",
      "Certification programs with exams",
      "Progress tracking and analytics"
    ],
    cta: "Education Solutions",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: "Heart",
    title: "For Healthcare",
    subtitle: "Ensure Clinical Excellence",
    description: "HIPAA-compliant skill assessment for healthcare organizations. Verify staff competencies, manage credentials, and ensure regulatory compliance.",
    features: [
      "HIPAA-compliant infrastructure",
      "Clinical competency assessments",
      "Credential tracking and alerts",
      "Compliance audit trails",
      "Proctored examinations"
    ],
    cta: "Healthcare Solutions",
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: "Factory",
    title: "For Manufacturing",
    subtitle: "Upskill Your Workforce",
    description: "Skills-based training and certification for manufacturing teams. Track competencies, ensure safety compliance, and reduce skill gaps.",
    features: [
      "Safety certification programs",
      "Equipment operation assessments",
      "Compliance tracking",
      "Skill matrix visualization",
      "On-the-job training modules"
    ],
    cta: "Manufacturing Solutions",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: "Briefcase",
    title: "For Staffing Agencies",
    subtitle: "Accelerate Placements",
    description: "Pre-screen candidates at scale with AI assessments. Build talent pools, match skills to requirements, and reduce time-to-placement.",
    features: [
      "Bulk candidate screening",
      "Talent pool management",
      "Skill-based matching",
      "Client-ready reports",
      "White-label assessments"
    ],
    cta: "Staffing Solutions",
    color: "from-indigo-500 to-violet-600"
  }
];

const defaultHeader = {
  badge: "Industry Solutions",
  title: "Tailored for Your",
  titleHighlight: "Organization",
  subtitle: "Cognaium adapts to your industry needs with specialized workflows, compliance features, and domain-specific capabilities.",
};

export function Journeys({ header, journeys }: JourneysProps = {}) {
  // Merge with defaults
  const headerData = { ...defaultHeader, ...header };
  const journeysData = journeys && journeys.length > 0 ? journeys : defaultJourneys;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            {headerData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {headerData.title}
            <span className="gradient-text block">{headerData.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {headerData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeysData.map((journey, index) => {
            const IconComponent = iconMap[journey.icon] || Building2;
            return (
              <div 
                key={index} 
                className="glass rounded-2xl overflow-hidden card-hover group"
              >
                <div className={`h-2 bg-gradient-to-r ${journey.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${journey.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{journey.title}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{journey.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-4">{journey.description}</p>

                  <ul className="space-y-2 mb-6">
                    {journey.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${journey.color}`} />
                        {feature}
                      </li>
                    ))}
                    {journey.features.length > 4 && (
                      <li className="text-sm text-primary">+{journey.features.length - 4} more</li>
                    )}
                  </ul>

                  <Link href="/contact">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {journey.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
