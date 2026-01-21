"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
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
  Settings,
  CheckCircle2,
  ArrowRight,
  Code,
  Upload,
  Star,
  List,
  GitCompare,
  Clock,
  Bell,
  Lock,
  Database,
  Globe,
  Layers
} from "lucide-react";

const featureCategories = [
  {
    id: "ai-screening",
    name: "AI Screening",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    description: "Intelligent candidate assessment with conversational AI interviews",
    features: [
      {
        title: "Conversational AI Interviews",
        description: "Natural language interviews powered by GPT-4, Claude, and Gemini with adaptive questioning based on responses.",
        icon: MessageSquare
      },
      {
        title: "8 Question Types",
        description: "Multiple Choice, Text Response, Video Recording, Code Editor, File Upload, Rating Scale, Ranking, and Matching questions.",
        icon: List
      },
      {
        title: "AI Question Generation",
        description: "Generate role-specific questions from job descriptions with customizable difficulty and focus areas.",
        icon: Zap
      },
      {
        title: "Automatic Scoring",
        description: "AI-powered evaluation with detailed feedback, competency mapping, and comparative analysis.",
        icon: Target
      },
      {
        title: "Bulk Analysis",
        description: "Compare candidates side-by-side with AI-generated insights and ranking recommendations.",
        icon: BarChart3
      },
      {
        title: "Template Library",
        description: "Pre-built assessment templates for common roles with customization options.",
        icon: FileText
      }
    ]
  },
  {
    id: "proctoring",
    name: "Proctoring",
    icon: Eye,
    color: "from-red-500 to-rose-600",
    description: "Real-time monitoring for assessment integrity",
    features: [
      {
        title: "YOLOv8 Person Detection",
        description: "AI-powered detection of multiple persons, face tracking, and suspicious behavior monitoring.",
        icon: Eye
      },
      {
        title: "Audio Monitoring",
        description: "Whisper-based audio analysis to detect speech, background voices, and suspicious sounds.",
        icon: Mic
      },
      {
        title: "Browser Security",
        description: "Tab switching detection, copy-paste blocking, and full-screen enforcement.",
        icon: Shield
      },
      {
        title: "Violation Logging",
        description: "Detailed violation logs with timestamps, screenshots, and severity levels.",
        icon: Bell
      },
      {
        title: "Configurable Thresholds",
        description: "Set custom violation limits and auto-termination rules per assessment.",
        icon: Settings
      },
      {
        title: "Recording & Playback",
        description: "Session recording with searchable timeline and violation markers.",
        icon: Video
      }
    ]
  },
  {
    id: "ats",
    name: "ATS & Hiring",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
    description: "Complete applicant tracking and hiring pipeline",
    features: [
      {
        title: "Job Posting Management",
        description: "Create and publish job postings with knockout questions and application forms.",
        icon: FileText
      },
      {
        title: "Resume Parsing",
        description: "AI-powered resume analysis with skill extraction, experience mapping, and education verification.",
        icon: Upload
      },
      {
        title: "CCI Scoring",
        description: "Composite Candidate Index pre-assessment scoring based on resume match, role readiness, and risk factors.",
        icon: Target
      },
      {
        title: "Talent Pool",
        description: "Build and manage candidate databases with tagging, filtering, and bulk actions.",
        icon: Users
      },
      {
        title: "Bulk Email",
        description: "Send personalized bulk emails to candidates with tracking and templates.",
        icon: MessageSquare
      },
      {
        title: "Interview Scheduling",
        description: "Calendar integration with automated scheduling and reminder notifications.",
        icon: Clock
      }
    ]
  },
  {
    id: "training",
    name: "Training Programs",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
    description: "Create and deliver comprehensive training content",
    features: [
      {
        title: "Multi-Format Content",
        description: "Support for videos, documents, quizzes, and interactive modules in a single program.",
        icon: Layers
      },
      {
        title: "AI Video Generation",
        description: "Create training videos from text using D-ID and HeyGen with AI avatars.",
        icon: Video
      },
      {
        title: "Content Import",
        description: "Import content from YouTube, PDFs, Word documents, and external URLs.",
        icon: Upload
      },
      {
        title: "Learning Paths",
        description: "Create structured learning paths with prerequisites and completion requirements.",
        icon: GitCompare
      },
      {
        title: "Progress Tracking",
        description: "Real-time progress monitoring with completion rates and time spent.",
        icon: BarChart3
      },
      {
        title: "Completion Certificates",
        description: "Auto-generated certificates with verification links and expiration dates.",
        icon: Award
      }
    ]
  },
  {
    id: "tutoring",
    name: "AI Tutoring",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    description: "Personalized learning with multi-agent AI tutors",
    features: [
      {
        title: "Multi-Agent Orchestration",
        description: "Specialized agents for curriculum planning, concept explanation, practice coaching, and project mentoring.",
        icon: Brain
      },
      {
        title: "Voice Tutor",
        description: "Speech-to-text enabled tutoring with natural conversation and voice responses.",
        icon: Mic
      },
      {
        title: "Quiz Generator",
        description: "AI-generated quizzes based on learning content with instant feedback.",
        icon: List
      },
      {
        title: "Skill Gap Analysis",
        description: "Automated identification of knowledge gaps with targeted recommendations.",
        icon: Target
      },
      {
        title: "Personalized Learning",
        description: "Adaptive content recommendations based on learning style and progress.",
        icon: Star
      },
      {
        title: "Practice Exercises",
        description: "Hands-on exercises and coding challenges with AI evaluation.",
        icon: Code
      }
    ]
  },
  {
    id: "certifications",
    name: "Certifications",
    icon: Award,
    color: "from-pink-500 to-rose-600",
    description: "Create and manage certification programs",
    features: [
      {
        title: "AI Program Generation",
        description: "Generate complete certification programs from topics with structured modules.",
        icon: Zap
      },
      {
        title: "Structured Exams",
        description: "Create proctored exams with passing criteria and retry policies.",
        icon: FileText
      },
      {
        title: "Certificate Generation",
        description: "Auto-generate branded certificates with unique IDs and verification QR codes.",
        icon: Award
      },
      {
        title: "Skill Validation",
        description: "Map certifications to skills with endorsement tracking.",
        icon: CheckCircle2
      },
      {
        title: "Expiration Management",
        description: "Track certificate validity with renewal reminders and recertification.",
        icon: Clock
      },
      {
        title: "Public Verification",
        description: "Public verification pages for credential validation by third parties.",
        icon: Globe
      }
    ]
  },
  {
    id: "hr-suite",
    name: "HR Management",
    icon: Users,
    color: "from-indigo-500 to-violet-600",
    description: "Complete HR toolkit for workforce management",
    features: [
      {
        title: "Policy Management",
        description: "Create, distribute, and track policy acknowledgments with version control.",
        icon: FileText
      },
      {
        title: "Org Chart",
        description: "Visual organization structure with reporting relationships and team views.",
        icon: Users
      },
      {
        title: "KRA/KPI Tracking",
        description: "Define and track key result areas and performance indicators per role.",
        icon: Target
      },
      {
        title: "Employee Profiles",
        description: "Comprehensive employee records with skills, certifications, and history.",
        icon: Users
      },
      {
        title: "Executive Dashboard",
        description: "High-level insights for leadership with drill-down capabilities.",
        icon: BarChart3
      },
      {
        title: "Activity Tracking",
        description: "Monitor platform usage and engagement across the organization.",
        icon: Clock
      }
    ]
  },
  {
    id: "platform",
    name: "Platform",
    icon: Settings,
    color: "from-gray-500 to-slate-600",
    description: "Enterprise-grade infrastructure and security",
    features: [
      {
        title: "Multi-Tenant Architecture",
        description: "Complete data isolation with subdomain routing and per-tenant configuration.",
        icon: Database
      },
      {
        title: "White-Label Branding",
        description: "Custom logos, colors, themes, and domain mapping per organization.",
        icon: Layers
      },
      {
        title: "Role-Based Access",
        description: "Granular permissions for Admin, HR, Manager, and Employee roles.",
        icon: Lock
      },
      {
        title: "Multi-AI Support",
        description: "Choose between OpenAI GPT-4, Anthropic Claude, and Google Gemini.",
        icon: Brain
      },
      {
        title: "AI Director",
        description: "Intelligent platform assistant for navigation, help, and automation.",
        icon: MessageSquare
      },
      {
        title: "API Access",
        description: "RESTful APIs for integration with existing systems and workflows.",
        icon: Code
      }
    ]
  }
];

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState(featureCategories[0]);

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Platform Features" 
        description="Discover the complete suite of AI-powered tools for skill assessment, hiring, training, and workforce development."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory.id === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Header */}
          <div className="text-center mb-12">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center mx-auto mb-4`}>
              <activeCategory.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{activeCategory.name}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{activeCategory.description}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.features.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-6 card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeCategory.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Technology Stack
            </span>
            <h2 className="text-3xl font-bold mb-4">Built on Modern Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade infrastructure with cutting-edge AI and robust security.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Multi-AI Providers", desc: "OpenAI GPT-4, Anthropic Claude, Google Gemini", icon: Brain },
              { title: "Real-time Proctoring", desc: "YOLOv8 detection, Whisper audio, WebSocket", icon: Eye },
              { title: "Elasticsearch Analytics", desc: "Fast search, behavioral insights, custom reports", icon: BarChart3 },
              { title: "Enterprise Security", desc: "AES-256 encryption, RBAC, audit logging", icon: Shield }
            ].map((item, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workforce?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how CogniAI can help you hire smarter, train better, and develop your team with AI-powered intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
