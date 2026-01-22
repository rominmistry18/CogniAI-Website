"use client";

import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { Brain, Target, Users, Zap, Shield, Globe, Award, Lightbulb, Heart, Rocket } from "lucide-react";

const values = [
  {
    icon: Brain,
    title: "AI-First Innovation",
    description: "We leverage cutting-edge AI from OpenAI, Anthropic, and Google to deliver intelligent solutions that continuously learn and improve."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Multi-tenant architecture with complete data isolation, encryption at rest and in transit, and compliance-ready infrastructure."
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description: "Technology that enhances human potential, making complex workflows intuitive and empowering every user role."
  },
  {
    icon: Zap,
    title: "Continuous Evolution",
    description: "Rapid iteration based on user feedback, with new features and improvements deployed regularly."
  }
];

const milestones = [
  { year: "Foundation", title: "Platform Genesis", description: "CogniAI was born from the vision to revolutionize how organizations assess and develop talent." },
  { year: "Growth", title: "Multi-Tenant Architecture", description: "Launched enterprise-ready multi-tenant platform with white-labeling and subdomain routing." },
  { year: "Innovation", title: "AI Tutoring System", description: "Introduced multi-agent AI tutoring with voice support and personalized learning paths." },
  { year: "Scale", title: "Full HR Suite", description: "Expanded to complete HR management with ATS, certifications, and advanced analytics." }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Intelligent Workforce Development" 
        description="Building the future of skill assessment, talent acquisition, and employee development with AI-powered intelligence."
      />

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                Our Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Empowering Organizations Through
                <span className="gradient-text block">Intelligent Assessment</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that every organization deserves access to enterprise-grade AI tools for talent management. CogniAI democratizes intelligent workforce development, making sophisticated assessment, training, and analytics accessible to organizations of all sizes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform combines the power of multiple AI providers—OpenAI GPT-4, Anthropic Claude, and Google Gemini—with robust enterprise features like multi-tenant architecture, real-time proctoring, and comprehensive analytics.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 lg:p-12">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To transform how organizations hire, train, and develop their workforce through AI-powered intelligence that makes better decisions possible.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Our Approach</h3>
                    <p className="text-muted-foreground">
                      We build comprehensive solutions that address the entire talent lifecycle—from screening to certification—in one unified platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Our Reach</h3>
                    <p className="text-muted-foreground">
                      Serving organizations across industries—from healthcare and manufacturing to education and staffing agencies worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our product development and customer relationships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete Workforce Solution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A unified platform that covers the entire talent lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Screening", desc: "Conversational interviews with multiple question types" },
              { icon: Shield, title: "Proctoring", desc: "AI-powered detection and audio monitoring" },
              { icon: Users, title: "ATS", desc: "Complete hiring pipeline with CCI scoring" },
              { icon: Award, title: "Certifications", desc: "AI-generated programs and certificates" },
              { icon: Rocket, title: "AI Tutoring", desc: "Multi-agent personalized learning" },
              { icon: Heart, title: "HR Suite", desc: "Policies, team management, and KRA/KPI" }
            ].map((item, index) => (
              <div key={index} className="glass rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Building the Future
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="glass rounded-xl p-6 flex-1">
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
