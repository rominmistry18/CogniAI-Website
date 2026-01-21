"use client";

import { Clock, Users, Award, BookOpen, Play, Brain, Eye, Briefcase, GraduationCap, BarChart3, Shield, Settings, MessageSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const modules = [
  {
    id: 1,
    title: "Platform Overview",
    duration: "30 minutes",
    audience: "All users",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-600",
    topics: [
      "What is CogniAI?",
      "Key features overview",
      "User roles (Admin, HR, Manager, Employee)",
      "Navigation and dashboard basics",
      "AI Director assistant",
      "Help resources and support"
    ],
    outcomes: [
      "Understand platform capabilities",
      "Navigate the user interface",
      "Use the AI Director for help"
    ]
  },
  {
    id: 2,
    title: "Admin Training",
    duration: "2 hours",
    audience: "System administrators",
    icon: Settings,
    color: "from-emerald-500 to-teal-600",
    topics: [
      "Initial setup and configuration",
      "Multi-tenant management",
      "Branding and white-labeling",
      "User management and RBAC",
      "SMTP and notification setup",
      "AI provider configuration",
      "System health monitoring"
    ],
    outcomes: [
      "Configure platform settings",
      "Manage users and permissions",
      "Set up organizational branding"
    ]
  },
  {
    id: 3,
    title: "AI Screening Mastery",
    duration: "3 hours",
    audience: "HR professionals",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    topics: [
      "Assessment types: AI Interview, Structured, Leveled",
      "8 question types deep dive",
      "AI question generation",
      "Template creation and management",
      "Proctoring configuration",
      "Candidate assignment workflows",
      "Results analysis and bulk insights"
    ],
    outcomes: [
      "Create effective AI assessments",
      "Configure proctoring settings",
      "Analyze candidate results"
    ]
  },
  {
    id: 4,
    title: "Proctoring Configuration",
    duration: "1.5 hours",
    audience: "HR & Admins",
    icon: Eye,
    color: "from-red-500 to-rose-600",
    topics: [
      "YOLOv8 person detection setup",
      "Audio monitoring with Whisper",
      "Browser security enforcement",
      "Violation thresholds and rules",
      "Auto-termination configuration",
      "Recording and playback",
      "On-premise deployment options"
    ],
    outcomes: [
      "Configure proctoring for assessments",
      "Set appropriate violation rules",
      "Review proctoring recordings"
    ]
  },
  {
    id: 5,
    title: "ATS & Hiring Pipeline",
    duration: "2.5 hours",
    audience: "HR & Recruiters",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
    topics: [
      "Job posting creation",
      "Knockout questions setup",
      "Resume parsing and skill extraction",
      "CCI (Composite Candidate Index) scoring",
      "Talent pool management",
      "Bulk email campaigns",
      "Interview scheduling"
    ],
    outcomes: [
      "Manage full hiring pipeline",
      "Use CCI for candidate ranking",
      "Build and maintain talent pools"
    ]
  },
  {
    id: 6,
    title: "Training Programs",
    duration: "2 hours",
    audience: "HR & L&D",
    icon: BookOpen,
    color: "from-cyan-500 to-blue-600",
    topics: [
      "Training program structure",
      "Content types: video, document, quiz",
      "AI video generation with D-ID/HeyGen",
      "YouTube and document import",
      "Learning paths with prerequisites",
      "Progress tracking",
      "Completion certificates"
    ],
    outcomes: [
      "Create multi-format training",
      "Generate AI video content",
      "Track learner progress"
    ]
  },
  {
    id: 7,
    title: "AI Tutoring System",
    duration: "2 hours",
    audience: "L&D & Employees",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    topics: [
      "Multi-agent orchestration overview",
      "Curriculum Planner agent",
      "Concept Explainer agent",
      "Practice Coach agent",
      "Quiz Generator agent",
      "Voice tutor features",
      "Skill gap detection and recommendations"
    ],
    outcomes: [
      "Use AI tutoring effectively",
      "Generate personalized quizzes",
      "Identify and address skill gaps"
    ]
  },
  {
    id: 8,
    title: "Certifications & Badges",
    duration: "1.5 hours",
    audience: "HR & L&D",
    icon: Award,
    color: "from-pink-500 to-rose-600",
    topics: [
      "AI-powered program generation",
      "Certification structure and modules",
      "Quiz and exam configuration",
      "Passing criteria and retakes",
      "Certificate generation and branding",
      "Public verification links",
      "Expiration and recertification"
    ],
    outcomes: [
      "Create certification programs",
      "Configure exams and passing criteria",
      "Manage certificate lifecycle"
    ]
  },
  {
    id: 9,
    title: "HR Suite & Policies",
    duration: "1.5 hours",
    audience: "HR professionals",
    icon: Shield,
    color: "from-slate-500 to-gray-600",
    topics: [
      "Policy creation and AI generation",
      "Policy assignment workflows",
      "Acknowledgment tracking",
      "Org chart management",
      "KRA/KPI configuration",
      "Employee profiles and history",
      "Compliance reporting"
    ],
    outcomes: [
      "Manage policies effectively",
      "Track acknowledgments",
      "Set up KRAs and KPIs"
    ]
  },
  {
    id: 10,
    title: "Analytics & Reporting",
    duration: "2 hours",
    audience: "Managers & HR",
    icon: BarChart3,
    color: "from-indigo-500 to-blue-600",
    topics: [
      "Dashboard customization",
      "Elasticsearch-powered search",
      "Behavioral learning analytics",
      "Team and individual reports",
      "Executive dashboards",
      "Export options: Excel, PDF, API",
      "Custom report building"
    ],
    outcomes: [
      "Create custom reports",
      "Use advanced search features",
      "Generate executive insights"
    ]
  },
  {
    id: 11,
    title: "Manager Essentials",
    duration: "1 hour",
    audience: "Team managers",
    icon: Users,
    color: "from-teal-500 to-emerald-600",
    topics: [
      "Manager dashboard overview",
      "Team member management",
      "Assessment assignment",
      "Training assignment",
      "Skill gap identification",
      "Team performance reports",
      "Quick actions and workflows"
    ],
    outcomes: [
      "Monitor team progress",
      "Assign assessments and training",
      "Generate team reports"
    ]
  },
  {
    id: 12,
    title: "Employee Journey",
    duration: "45 minutes",
    audience: "All employees",
    icon: Target,
    color: "from-purple-500 to-violet-600",
    topics: [
      "Employee dashboard navigation",
      "Taking assessments",
      "Learning path progression",
      "Skills roadmap",
      "Using AI tutor",
      "Viewing certifications",
      "Profile and preferences"
    ],
    outcomes: [
      "Complete assessments successfully",
      "Navigate learning paths",
      "Use AI tutor for development"
    ]
  }
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Training Modules
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Master the Platform
              <span className="gradient-text block">With Expert Training</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training curriculum covering every feature of CogniAI. From basic navigation to advanced AI configurations.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {[
              { value: "12", label: "Training Modules" },
              { value: "20+", label: "Hours of Content" },
              { value: "All", label: "User Roles Covered" },
              { value: "Free", label: "For Customers" }
            ].map((stat, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="glass rounded-2xl overflow-hidden card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Module {module.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {module.audience}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Topics Covered</h4>
                    <ul className="space-y-1">
                      {module.topics.slice(0, 4).map((topic, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {topic}
                        </li>
                      ))}
                      {module.topics.length > 4 && (
                        <li className="text-sm text-primary">
                          +{module.topics.length - 4} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2">Learning Outcomes</h4>
                    <ul className="space-y-1">
                      {module.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <Play className="w-4 h-4" />
                    Start Module
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Need Custom <span className="gradient-text">Training?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            We offer personalized onboarding and training sessions for enterprise customers. 
            Get hands-on guidance from our expert team tailored to your organization's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Schedule Training Session
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
