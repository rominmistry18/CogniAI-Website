import { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ArticleSchema } from "@/components/SchemaOrg";
import { Brain, Users, Clock, DollarSign, CheckCircle2, XCircle, ArrowRight, Target, Shield, BarChart3, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI vs Traditional Hiring: Complete Comparison | CogniAI",
  description: "Compare AI-powered hiring with traditional recruitment methods. Learn the differences in speed, cost, accuracy, and candidate experience. See why organizations choose CogniAI.",
  keywords: ["AI hiring vs traditional hiring", "AI recruitment comparison", "automated hiring benefits", "AI screening advantages", "hiring technology ROI"],
  alternates: {
    canonical: "https://www.cogniai.us/compare/ai-vs-traditional-hiring"
  }
};

const comparisonData = [
  {
    category: "Time to Hire",
    traditional: {
      value: "30-45 days average",
      details: "Manual resume review, phone screens, multiple interview rounds, and manual scheduling create lengthy hiring cycles.",
      icon: Clock
    },
    aiPowered: {
      value: "50-70% faster",
      details: "AI screening, automated scheduling, and real-time scoring dramatically reduce time from application to offer.",
      icon: Zap
    }
  },
  {
    category: "Cost per Hire",
    traditional: {
      value: "$4,000-$7,000+",
      details: "High recruiter time investment, job board costs, and lengthy process increase cost per hire significantly.",
      icon: DollarSign
    },
    aiPowered: {
      value: "30-50% reduction",
      details: "Automation of screening and initial assessment reduces recruiter workload and shortens hiring cycles.",
      icon: DollarSign
    }
  },
  {
    category: "Screening Accuracy",
    traditional: {
      value: "Variable, bias-prone",
      details: "Human reviewers may inconsistently apply criteria, be influenced by unconscious bias, and miss qualified candidates.",
      icon: Target
    },
    aiPowered: {
      value: "Consistent, objective",
      details: "AI applies the same criteria to every candidate, reducing bias and ensuring no qualified candidates are overlooked.",
      icon: Target
    }
  },
  {
    category: "Volume Handling",
    traditional: {
      value: "Limited by headcount",
      details: "Each additional applicant requires proportional recruiter time, creating bottlenecks during high-volume periods.",
      icon: Users
    },
    aiPowered: {
      value: "Unlimited scale",
      details: "AI can screen thousands of candidates simultaneously without degradation in quality or speed.",
      icon: Users
    }
  },
  {
    category: "Candidate Experience",
    traditional: {
      value: "Slow, opaque process",
      details: "Candidates wait days or weeks for responses, with little visibility into where they stand in the process.",
      icon: Users
    },
    aiPowered: {
      value: "Fast, engaging",
      details: "Candidates receive immediate engagement through AI interviews, with faster feedback and a modern experience.",
      icon: Users
    }
  },
  {
    category: "Assessment Depth",
    traditional: {
      value: "Surface-level screening",
      details: "Initial resume review catches obvious qualifications but misses nuanced skill evaluation and cultural fit.",
      icon: BarChart3
    },
    aiPowered: {
      value: "Comprehensive evaluation",
      details: "AI assessments evaluate skills in depth with multiple question types, providing rich candidate profiles.",
      icon: BarChart3
    }
  }
];

const traditionalChallenges = [
  "Resume keyword matching misses qualified candidates with different terminology",
  "Unconscious bias affects which resumes get attention",
  "Phone screens consume significant recruiter time",
  "Inconsistent interview questions make comparison difficult",
  "Manual scheduling creates delays and frustration",
  "Limited data for improving hiring decisions over time"
];

const aiAdvantages = [
  "AI understands skill equivalencies and related experience",
  "Objective scoring based on job-relevant criteria only",
  "Automated AI interviews screen at scale without human bottleneck",
  "Standardized assessments enable fair candidate comparison",
  "Integrated scheduling eliminates back-and-forth",
  "Rich analytics enable continuous hiring process improvement"
];

export default function CompareAIvsTraditionalPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="AI vs Traditional Hiring" 
        description="A comprehensive comparison of AI-powered and traditional recruitment approaches to help you make informed decisions about your hiring technology."
      />

      {/* Schema Markup */}
      <ArticleSchema
        title="AI vs Traditional Hiring: Complete Comparison"
        description="Comprehensive comparison of AI-powered hiring versus traditional recruitment methods covering speed, cost, accuracy, and candidate experience."
        datePublished="2025-09-15"
        dateModified="2026-01-22"
        author="CogniAI by MedinovAI"
        url="https://www.cogniai.us/compare/ai-vs-traditional-hiring"
      />

      {/* Quick Summary */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold mb-3 text-primary">Summary</h2>
            <p className="text-lg font-medium text-foreground leading-relaxed">
              AI-powered hiring typically delivers 50-70% faster time-to-hire, 30-50% cost reduction, and more consistent candidate evaluation compared to traditional methods. Organizations using AI screening can process unlimited applications while providing better candidate experiences and reducing unconscious bias in early-stage screening.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Side-by-Side Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How AI-powered hiring with CogniAI compares to traditional recruitment across key metrics.
            </p>
          </div>

          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden">
                <div className="bg-primary/10 px-6 py-3">
                  <h3 className="font-bold text-lg">{item.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* Traditional */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <item.traditional.icon className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Traditional</span>
                    </div>
                    <p className="text-xl font-bold mb-2">{item.traditional.value}</p>
                    <p className="text-sm text-muted-foreground">{item.traditional.details}</p>
                  </div>
                  {/* AI-Powered */}
                  <div className="p-6 bg-green-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <item.aiPowered.icon className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-sm font-medium text-green-600">AI-Powered (CogniAI)</span>
                    </div>
                    <p className="text-xl font-bold mb-2 text-green-600">{item.aiPowered.value}</p>
                    <p className="text-sm text-muted-foreground">{item.aiPowered.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Traditional Challenges */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold">Traditional Hiring Challenges</h3>
              </div>
              <ul className="space-y-4">
                {traditionalChallenges.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Advantages */}
            <div className="glass rounded-2xl p-8 border-2 border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Hiring Advantages</h3>
              </div>
              <ul className="space-y-4">
                {aiAdvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Each */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">When to Use Each Approach</h2>
          
          <div className="space-y-8">
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                AI-Powered Hiring is Ideal When:
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "High application volumes (100+ per role)",
                  "Need to reduce time-to-hire",
                  "Scaling hiring across locations",
                  "Seeking to reduce bias in screening",
                  "Technical or skill-based roles",
                  "Want data-driven hiring decisions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-muted-foreground" />
                Traditional Methods May Suit:
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Executive-level positions",
                  "Very specialized niche roles",
                  "Relationship-based industries",
                  "Very low hiring volume",
                  "Roles requiring extensive reference checks",
                  "Internal promotions and succession"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary/5 rounded-xl">
            <p className="text-center text-muted-foreground">
              <strong className="text-foreground">Best Practice:</strong> Most organizations benefit from a hybrid approach—using AI for initial screening and assessment while preserving human judgment for final interviews and cultural fit evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* CogniAI Features */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How CogniAI Delivers AI Hiring Advantages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built features that transform your hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Conversational Interviews",
                description: "Adaptive AI interviews powered by GPT-4, Claude, or Gemini that evaluate candidates through natural conversation."
              },
              {
                icon: Shield,
                title: "Proctored Assessments",
                description: "Real-time AI proctoring with advanced detection ensures assessment integrity at any scale."
              },
              {
                icon: Target,
                title: "CCI Scoring",
                description: "Composite Candidate Index provides objective pre-assessment scoring based on skills, readiness, and fit."
              },
              {
                icon: BarChart3,
                title: "Bulk Analysis",
                description: "Compare hundreds of candidates side-by-side with AI-generated insights and ranking recommendations."
              },
              {
                icon: Users,
                title: "ATS Integration",
                description: "Complete applicant tracking with talent pools, bulk communications, and interview scheduling."
              },
              {
                icon: Zap,
                title: "Multiple Question Types",
                description: "Video, code, file upload, and more—assess any skill with the right question format."
              }
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how CogniAI can reduce your time-to-hire, cut costs, and improve hiring quality with AI-powered screening and assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meta Footer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-sm text-muted-foreground text-center">
          Last Updated: January 22, 2026 | Author: CogniAI Research Team
        </div>
      </div>

      <CTA />
    </main>
  );
}
