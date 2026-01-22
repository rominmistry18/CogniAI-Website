"use client";

import { useState } from "react";
import { 
  Brain, 
  Video, 
  Users, 
  Award, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Briefcase,
  MessageSquare,
  FileText,
  Zap,
  Target,
  GraduationCap,
  Mic,
  Eye,
  Settings
} from "lucide-react";

const features = [
  {
    id: "ai-screening",
    title: "AI-Powered Screening",
    description: "Intelligent candidate assessment with conversational AI interviews and structured evaluations.",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    details: [
      "Conversational AI interviews with natural language processing",
      "Multiple question types: Multiple Choice, Text, Video, Code, File Upload, Rating",
      "AI-generated questions based on job requirements",
      "Automatic scoring and feedback generation",
      "Bulk candidate analysis with comparative insights"
    ]
  },
  {
    id: "proctoring",
    title: "Advanced Proctoring",
    description: "Real-time monitoring with AI-powered person detection and audio analysis for assessment integrity.",
    icon: Eye,
    color: "from-red-500 to-rose-600",
    details: [
      "AI-powered person detection and tracking",
      "Audio monitoring for suspicious sounds",
      "Browser tab switching detection",
      "Full-screen enforcement with violation logging",
      "Configurable violation thresholds and auto-termination"
    ]
  },
  {
    id: "ats",
    title: "Applicant Tracking System",
    description: "Complete hiring pipeline from job posting to offer management with AI-powered CCI scoring.",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
    details: [
      "Job postings with knockout questions",
      "Resume parsing with skill extraction",
      "CCI (Composite Candidate Index) pre-assessment scoring",
      "Talent pool management and bulk email",
      "Interview scheduling and offer management"
    ]
  },
  {
    id: "training",
    title: "Training & Learning",
    description: "Create and deliver training programs with AI-generated content and progress tracking.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
    details: [
      "Multi-format content: Video, Documents, Quizzes",
      "YouTube and document content import",
      "Learning paths with prerequisites",
      "Progress tracking and completion certificates",
      "Customizable training templates"
    ]
  },
  {
    id: "tutoring",
    title: "AI Tutoring System",
    description: "Personalized learning with multi-agent AI tutors for concept explanation and practice.",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    details: [
      "Multi-agent orchestration: Curriculum Planner, Concept Explainer, Practice Coach",
      "Quiz Generator and Project Mentor agents",
      "Voice tutor with speech-to-text support",
      "Personalized learning recommendations",
      "Skill gap analysis and targeted content"
    ]
  },
  {
    id: "certifications",
    title: "Certification Programs",
    description: "AI-generated certification programs with quizzes, exams, and verifiable certificates.",
    icon: Award,
    color: "from-pink-500 to-rose-600",
    details: [
      "AI-powered program generation from topics",
      "Structured quizzes and final exams",
      "Automated certificate generation",
      "Skill validation and endorsements",
      "Public verification links"
    ]
  },
  {
    id: "hr-suite",
    title: "HR Management Suite",
    description: "Complete HR toolkit with policy management and employee development.",
    icon: Users,
    color: "from-indigo-500 to-violet-600",
    details: [
      "Policy creation and acknowledgment tracking",
      "KRA/KPI management",
      "Employee performance tracking",
      "Executive dashboard with insights",
      "Team management and reporting"
    ]
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description: "Comprehensive insights with behavioral learning analytics and custom reports.",
    icon: BarChart3,
    color: "from-cyan-500 to-blue-600",
    details: [
      "Real-time dashboards and KPIs",
      "Advanced search and analytics",
      "Behavioral learning patterns",
      "Custom report builder",
      "Export to Excel, PDF, and API access"
    ]
  }
];

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need for
            <span className="gradient-text block">Workforce Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of AI-powered tools for assessment, hiring, training, and employee development.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFeature.id === feature.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <feature.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeFeature.color} flex items-center justify-center mb-6`}>
                <activeFeature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{activeFeature.title}</h3>
              <p className="text-lg text-muted-foreground mb-8">{activeFeature.description}</p>
              
              <ul className="space-y-4">
                {activeFeature.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${activeFeature.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeFeature.color} opacity-10 rounded-2xl blur-2xl`} />
              <div className="relative bg-card rounded-2xl p-8 border border-white/10">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <activeFeature.icon className={`w-24 h-24 mx-auto mb-4 text-transparent bg-clip-text bg-gradient-to-br ${activeFeature.color}`} style={{ fill: 'url(#gradient)' }} />
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${activeFeature.color} flex items-center justify-center`}>
                      <activeFeature.icon className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">{activeFeature.title} Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Multi-Tenant Security", desc: "Complete data isolation per organization" },
            { icon: Settings, title: "White-Label Ready", desc: "Custom branding and subdomain routing" },
            { icon: MessageSquare, title: "AI Director", desc: "Intelligent assistant for platform navigation" },
            { icon: Target, title: "Skill Gap Detection", desc: "Automated skill analysis and recommendations" }
          ].map((item, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
