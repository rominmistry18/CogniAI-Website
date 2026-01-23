import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to upsert content
async function upsertContent(pageKey: string, sectionKey: string, contentData: Record<string, unknown>) {
  const existing = await prisma.content.findFirst({
    where: { pageKey, sectionKey },
  });

  if (existing) {
    await prisma.content.update({
      where: { id: existing.id },
      data: { contentData: JSON.stringify(contentData) },
    });
    console.log(`Updated: ${pageKey}/${sectionKey}`);
  } else {
    await prisma.content.create({
      data: {
        pageKey,
        sectionKey,
        contentData: JSON.stringify(contentData),
      },
    });
    console.log(`Created: ${pageKey}/${sectionKey}`);
  }
}

async function seedHomeContent() {
  console.log("\n--- Seeding Home Page Content ---");

  // Hero Section
  await upsertContent("home", "hero", {
    badge: "Enterprise-Ready AI Platform",
    title: "Intelligent Skill Assessment",
    titleHighlight: "For Modern Organizations",
    subtitle: "The complete AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development. From AI interviews to certifications, all in one place.",
    primaryCta: "Request a Demo",
    primaryCtaLink: "/contact",
    secondaryCta: "Explore Features",
    secondaryCtaLink: "/features",
    highlights: [
      "AI-Powered Interviews",
      "Video Proctoring",
      "Certifications",
      "AI Tutoring",
      "ATS Integration",
      "Advanced Analytics",
    ],
    questionTypes: [
      "Multiple Choice",
      "Text Response",
      "Video Answer",
      "Code Challenge",
      "File Upload",
      "Rating Scale",
    ],
  });

  // CTA Section
  await upsertContent("home", "cta", {
    badge: "Get Started Today",
    title: "Ready to Transform",
    titleHighlight: "Your Workforce?",
    subtitle: "Join leading organizations using Cognaium for intelligent skill assessment, hiring, and employee development. Start your free trial or schedule a demo.",
    primaryCta: "Start Free Trial",
    primaryCtaLink: "/login",
    secondaryCta: "Schedule a Demo",
    secondaryCtaLink: "/contact",
    benefits: [
      "Multi-AI Support",
      "Real-time Proctoring",
      "Full ATS Suite",
      "Enterprise Security"
    ],
  });

  // Problem Solution Headers
  await upsertContent("home", "problems_header", {
    badge: "The Challenge",
    title: "Traditional Methods",
    titleHighlight: "Are Failing Organizations",
    subtitle: "Manual processes, disconnected tools, and lack of AI-powered insights are costing organizations time, money, and talent.",
  });

  await upsertContent("home", "solutions_header", {
    badge: "The Cognaium Solution",
    title: "AI-Powered Intelligence",
    titleHighlight: "For Every Stage",
    subtitle: "From hiring to development, Cognaium brings intelligent automation and actionable insights to your entire talent lifecycle.",
  });

  // Problems
  await upsertContent("home", "problems", {
    items: [
      {
        icon: "Users",
        title: "Inefficient Hiring Process",
        description: "Manual resume screening and unstructured interviews lead to poor hiring decisions and extended time-to-hire.",
        stat: "65%",
        statLabel: "of hires fail due to poor assessment"
      },
      {
        icon: "Clock",
        title: "Skill Gap Blind Spots",
        description: "Organizations lack visibility into actual employee competencies, leading to misaligned training and performance issues.",
        stat: "40%",
        statLabel: "of skills become obsolete yearly"
      },
      {
        icon: "TrendingDown",
        title: "Fragmented Training",
        description: "Disconnected LMS systems, manual tracking, and no personalization result in low engagement and wasted resources.",
        stat: "70%",
        statLabel: "of training content goes unused"
      }
    ]
  });

  // Solutions
  await upsertContent("home", "solutions", {
    items: [
      {
        icon: "Brain",
        title: "AI-Powered Screening",
        description: "Conversational AI interviews with automatic scoring, CCI ranking, and deep candidate insights—reducing time-to-hire by 60%.",
        features: ["Multiple Question Types", "Video Proctoring", "Auto-Scoring"]
      },
      {
        icon: "Target",
        title: "Intelligent Skill Detection",
        description: "Automated skill gap analysis across your workforce with personalized learning recommendations and progress tracking.",
        features: ["Skill Gap Analysis", "Learning Paths", "Certifications"]
      },
      {
        icon: "Zap",
        title: "Unified Learning Platform",
        description: "AI tutoring, training programs, and certifications in one place—with real-time analytics and completion tracking.",
        features: ["AI Tutoring", "Multi-Format Content", "Analytics"]
      }
    ]
  });

  // Stats
  await upsertContent("home", "problem_solution_stats", {
    items: [
      { value: "60%", label: "Faster Hiring" },
      { value: "85%", label: "Skill Visibility" },
      { value: "3x", label: "Training Engagement" },
      { value: "50%", label: "Cost Reduction" }
    ]
  });

  // Features Header
  await upsertContent("home", "features_header", {
    badge: "Platform Capabilities",
    title: "Everything You Need for",
    titleHighlight: "Workforce Excellence",
    subtitle: "A comprehensive suite of AI-powered tools for assessment, hiring, training, and employee development.",
  });

  // Journeys Header
  await upsertContent("home", "journeys_header", {
    badge: "Industry Solutions",
    title: "Tailored for Your",
    titleHighlight: "Organization",
    subtitle: "Cognaium adapts to your industry needs with specialized workflows, compliance features, and domain-specific capabilities.",
  });

  // Trust & Security Header
  await upsertContent("home", "trust_header", {
    badge: "Enterprise Security",
    title: "Security by Design",
    titleHighlight: "Privacy by Default",
    subtitle: "Built on zero-trust architecture with enterprise-grade security controls and compliance frameworks.",
  });

  // Leadership Header
  await upsertContent("home", "leadership_header", {
    title: "Visionary",
    titleHighlight: "Leadership",
    subtitle: "Meet the driving force behind Cognaium by MedinovAI's mission to revolutionize workforce intelligence.",
  });
}

async function seedPricingContent() {
  console.log("\n--- Seeding Pricing Page Content ---");

  await upsertContent("pricing", "header", {
    badge: "Simple, Transparent Pricing",
    title: "Plans That Scale",
    titleHighlight: "With Your Organization",
    subtitle: "Start free for 14 days. No credit card required. Upgrade as you grow.",
  });

  await upsertContent("pricing", "plans", {
    items: [
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
    ]
  });

  await upsertContent("pricing", "addons", {
    items: [
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
    ]
  });

  await upsertContent("pricing", "comparison", {
    items: [
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
    ]
  });

  await upsertContent("pricing", "faq", {
    items: [
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
    ]
  });

  await upsertContent("pricing", "cta", {
    title: "Ready to Get Started?",
    subtitle: "Start your free trial today or schedule a demo to see Cognaium in action.",
    primaryCta: "Start Free Trial",
    primaryCtaLink: "/login",
    secondaryCta: "Schedule Demo",
    secondaryCtaLink: "/contact",
  });
}

async function seedLeadershipContent() {
  console.log("\n--- Seeding Leadership Page Content ---");

  await upsertContent("leadership", "header", {
    title: "Visionary",
    titleHighlight: "Leadership",
    subtitle: "Meet the driving force behind Cognaium by MedinovAI's mission to revolutionize workforce intelligence.",
  });

  await upsertContent("leadership", "team", {
    items: [
      {
        name: "Mayank Trivedi",
        role: "Executive Chairman",
        type: "Executive Leadership",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Mayank-Trivedi-resized-1767669788661.jpeg?width=8000&height=8000&resize=contain",
        qualifications: "B.E. Mechanical Engineering",
        experience: "20+ Years Experience",
        bio: [
          "Mayank Trivedi is a seasoned technocrat and visionary leader with over two decades of experience in the healthcare information technology sector.",
          "A Mechanical Engineering graduate from Maharaja Sayajirao University of Baroda, Mayank founded Sysware Healthcare Systems, which grew into a global leader in Laboratory Information Systems.",
          "Currently serving as the CEO of myOnsite Healthcare, Mayank leads the strategic integration of Cognaium within the broader MedinovAI ecosystem."
        ],
        highlights: [
          { icon: "Target", label: "Strategic Vision" },
          { icon: "Award", label: "Healthcare IT Pioneer" }
        ]
      },
      {
        name: "Harita Oza",
        role: "Chief Executive Officer",
        type: "Executive Leadership",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Harita-1767623824543.jpg?width=8000&height=8000&resize=contain",
        qualifications: "M.Com, MBA",
        experience: "8+ Years Experience",
        bio: [
          "Harita Oza, our Chief Executive Officer, is a distinguished leader with both an M.Com and an MBA.",
          "With over 8 years of high-impact experience managing multi-national operations across diverse markets.",
          "Under her visionary leadership, Cognaium is pioneering the next generation of AI-driven workforce intelligence."
        ],
        highlights: [
          { icon: "Globe", label: "Global Operations" },
          { icon: "TrendingUp", label: "Strategic Expansion" }
        ]
      },
      {
        name: "Bharat Mehta",
        role: "Board Member (Director)",
        type: "Board of Directors",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Bharat-Mehta-1767667978259.jpeg?width=8000&height=8000&resize=contain",
        qualifications: "HR, Law & Commerce",
        experience: "40+ Years Experience",
        bio: [
          "Mr. Bharat Mehta is a seasoned HR leader with over four decades of experience across leading Indian and multinational organizations.",
          "His career includes senior leadership roles at Allscripts India, Medtronic, and Mafatlal Industries.",
          "Beyond corporate leadership, Mr. Mehta is deeply committed to societal well-being."
        ],
        highlights: [
          { icon: "Shield", label: "Governance & Ethics" },
          { icon: "Award", label: "HR Transformation" }
        ]
      }
    ]
  });

  await upsertContent("leadership", "cta", {
    badge: "Join Our Team",
    title: "Work With",
    titleHighlight: "Visionary Leaders",
    subtitle: "Be part of a team that's transforming how organizations develop their workforce with AI-powered intelligence.",
    primaryCta: "View Open Positions",
    primaryCtaLink: "/careers",
    secondaryCta: "Contact Us",
    secondaryCtaLink: "/contact",
    benefits: ["Remote-First Culture", "Equity Stake", "Growth Opportunities", "Cutting-Edge AI"]
  });
}

async function seedContactContent() {
  console.log("\n--- Seeding Contact Page Content ---");

  await upsertContent("contact", "header", {
    badge: "Get in Touch",
    title: "Let's Start a",
    titleHighlight: "Conversation",
    subtitle: "Request a demo, ask questions, or discuss how Cognaium by MedinovAI can transform your workforce development.",
  });

  await upsertContent("contact", "info", {
    email: "hello@cogniai.us",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  await upsertContent("contact", "form_settings", {
    submitButtonText: "Send Message",
    successMessage: "Thank you for reaching out. A member of the Cognaium team will contact you shortly to discuss your request.",
  });

  await upsertContent("contact", "demo", {
    title: "Schedule a Demo",
    subtitle: "30-minute personalized walkthrough",
    description: "See the platform in action with a personalized demo tailored to your organization's needs.",
    buttonText: "Book a Time",
  });

  await upsertContent("contact", "chat", {
    title: "Live Chat",
    subtitle: "Available Mon-Fri, 9am-6pm PST",
    description: "Get instant answers from our support team through live chat.",
    buttonText: "Start Chat",
  });
}

async function seedAboutContent() {
  console.log("\n--- Seeding About Page Content ---");

  await upsertContent("about", "header", {
    title: "Intelligent Workforce Development",
    subtitle: "Building the future of skill assessment and talent development with AI-powered intelligence.",
  });

  await upsertContent("about", "values", {
    items: [
      {
        icon: "Brain",
        title: "AI-First Innovation",
        description: "We leverage cutting-edge AI from OpenAI, Anthropic, and Google to deliver intelligent solutions that continuously learn and improve."
      },
      {
        icon: "Shield",
        title: "Enterprise Security",
        description: "Multi-tenant architecture with complete data isolation, encryption at rest and in transit, and compliance-ready infrastructure."
      },
      {
        icon: "Users",
        title: "Human-Centered Design",
        description: "Technology that enhances human potential, making complex workflows intuitive and empowering every user role."
      },
      {
        icon: "Zap",
        title: "Continuous Evolution",
        description: "Rapid iteration based on user feedback, with new features and improvements deployed regularly."
      }
    ]
  });

  await upsertContent("about", "journey", {
    items: [
      { year: "Foundation", title: "Platform Genesis", description: "Cognaium was born from the vision to revolutionize how organizations assess and develop talent." },
      { year: "Growth", title: "Multi-Tenant Architecture", description: "Launched enterprise-ready multi-tenant platform with white-labeling and subdomain routing." },
      { year: "Innovation", title: "AI Tutoring System", description: "Introduced multi-agent AI tutoring with voice support and personalized learning paths." },
      { year: "Scale", title: "Full HR Suite", description: "Expanded to complete HR management with ATS, certifications, and advanced analytics." }
    ]
  });
}

async function seedGlobalContent() {
  console.log("\n--- Seeding Global Content ---");

  await upsertContent("global", "footer_brand", {
    description: "AI-powered platform for skill assessment, talent acquisition, and workforce development.",
  });

  await upsertContent("global", "footer_links", {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Training", href: "/skill-library" },
      { label: "Support", href: "/support" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Research", href: "/research" },
      { label: "Glossary", href: "/glossary" },
      { label: "FAQ", href: "/faq" },
      { label: "Compare", href: "/compare/ai-vs-traditional-hiring" },
    ],
    legal: [
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/compliance" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  });
}

async function seedFAQContent() {
  console.log("\n--- Seeding FAQ Page Content ---");

  await upsertContent("faq", "header", {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about Cognaium's AI-powered skill assessment, training, and workforce development platform.",
    lastUpdated: "January 22, 2026",
  });

  await upsertContent("faq", "support", {
    title: "Still Have Questions?",
    subtitle: "Our team is here to help. Contact us for personalized assistance or schedule a demo to see Cognaium in action.",
    primaryCta: "Contact Support",
    primaryCtaLink: "/contact",
    secondaryCta: "Visit Help Center",
    secondaryCtaLink: "/support",
  });

  await upsertContent("faq", "cta", {
    badge: "Get Started Today",
    title: "Ready to Transform",
    titleHighlight: "Your Workforce?",
    subtitle: "Join leading organizations using Cognaium for intelligent skill assessment, hiring, and employee development.",
    primaryCta: "Start Free Trial",
    primaryCtaLink: "/login",
    secondaryCta: "Schedule a Demo",
    secondaryCtaLink: "/contact",
    benefits: ["Multi-AI Support", "Real-time Proctoring", "Full ATS Suite", "Enterprise Security"]
  });
}

async function seedFeaturesContent() {
  console.log("\n--- Seeding Features Page Content ---");

  await upsertContent("features", "header", {
    title: "Platform Features",
    subtitle: "Discover the complete suite of AI-powered tools for skill assessment, hiring, training, and workforce development.",
  });

  await upsertContent("features", "categories", {
    items: [
      {
        id: "ai-screening",
        name: "AI Screening",
        icon: "Brain",
        color: "from-violet-500 to-purple-600",
        description: "Intelligent candidate assessment with conversational AI interviews",
        features: [
          { title: "Conversational AI Interviews", description: "Natural language interviews powered by GPT-4, Claude, and Gemini with adaptive questioning based on responses.", icon: "MessageSquare" },
          { title: "Multiple Question Types", description: "Multiple Choice, Text Response, Video Recording, Code Editor, File Upload, and Rating Scale questions.", icon: "List" },
          { title: "AI Question Generation", description: "Generate role-specific questions from job descriptions with customizable difficulty and focus areas.", icon: "Zap" },
          { title: "Automatic Scoring", description: "AI-powered evaluation with detailed feedback, competency mapping, and comparative analysis.", icon: "Target" },
          { title: "Bulk Analysis", description: "Compare candidates side-by-side with AI-generated insights and ranking recommendations.", icon: "BarChart3" },
          { title: "Template Library", description: "Pre-built assessment templates for common roles with customization options.", icon: "FileText" }
        ]
      },
      {
        id: "proctoring",
        name: "Proctoring",
        icon: "Eye",
        color: "from-red-500 to-rose-600",
        description: "Real-time monitoring for assessment integrity",
        features: [
          { title: "AI Person Detection", description: "AI-powered detection of multiple persons, face tracking, and suspicious behavior monitoring.", icon: "Eye" },
          { title: "Audio Monitoring", description: "AI-powered audio analysis to detect speech, background voices, and suspicious sounds.", icon: "Mic" },
          { title: "Browser Security", description: "Tab switching detection, copy-paste blocking, and full-screen enforcement.", icon: "Shield" },
          { title: "Violation Logging", description: "Detailed violation logs with timestamps, screenshots, and severity levels.", icon: "Bell" },
          { title: "Configurable Thresholds", description: "Set custom violation limits and auto-termination rules per assessment.", icon: "Settings" },
          { title: "Recording & Playback", description: "Session recording with searchable timeline and violation markers.", icon: "Video" }
        ]
      },
      {
        id: "ats",
        name: "ATS & Hiring",
        icon: "Briefcase",
        color: "from-blue-500 to-cyan-600",
        description: "Complete applicant tracking and hiring pipeline",
        features: [
          { title: "Job Posting Management", description: "Create and publish job postings with knockout questions and application forms.", icon: "FileText" },
          { title: "Resume Parsing", description: "AI-powered resume analysis with skill extraction, experience mapping, and education verification.", icon: "Upload" },
          { title: "CCI Scoring", description: "Composite Candidate Index pre-assessment scoring based on resume match, role readiness, and risk factors.", icon: "Target" },
          { title: "Talent Pool", description: "Build and manage candidate databases with tagging, filtering, and bulk actions.", icon: "Users" },
          { title: "Bulk Email", description: "Send personalized bulk emails to candidates with tracking and templates.", icon: "MessageSquare" },
          { title: "Interview Scheduling", description: "Calendar integration with automated scheduling and reminder notifications.", icon: "Clock" }
        ]
      },
      {
        id: "training",
        name: "Training Programs",
        icon: "BookOpen",
        color: "from-emerald-500 to-teal-600",
        description: "Create and deliver comprehensive training content",
        features: [
          { title: "Multi-Format Content", description: "Support for videos, documents, quizzes, and interactive modules in a single program.", icon: "Layers" },
          { title: "Video Content", description: "Create and deliver engaging video-based training content with tracking.", icon: "Video" },
          { title: "Content Import", description: "Import content from YouTube, PDFs, Word documents, and external URLs.", icon: "Upload" },
          { title: "Learning Paths", description: "Create structured learning paths with prerequisites and completion requirements.", icon: "GitCompare" },
          { title: "Progress Tracking", description: "Real-time progress monitoring with completion rates and time spent.", icon: "BarChart3" },
          { title: "Completion Certificates", description: "Auto-generated certificates with verification links and expiration dates.", icon: "Award" }
        ]
      },
      {
        id: "tutoring",
        name: "AI Tutoring",
        icon: "GraduationCap",
        color: "from-amber-500 to-orange-600",
        description: "Personalized learning with multi-agent AI tutors",
        features: [
          { title: "Multi-Agent Orchestration", description: "Specialized agents for curriculum planning, concept explanation, practice coaching, and project mentoring.", icon: "Brain" },
          { title: "Voice Tutor", description: "Speech-to-text enabled tutoring with natural conversation and voice responses.", icon: "Mic" },
          { title: "Quiz Generator", description: "AI-generated quizzes based on learning content with instant feedback.", icon: "List" },
          { title: "Skill Gap Analysis", description: "Automated identification of knowledge gaps with targeted recommendations.", icon: "Target" },
          { title: "Personalized Learning", description: "Adaptive content recommendations based on learning style and progress.", icon: "Star" },
          { title: "Practice Exercises", description: "Hands-on exercises and coding challenges with AI evaluation.", icon: "Code" }
        ]
      },
      {
        id: "certifications",
        name: "Certifications",
        icon: "Award",
        color: "from-pink-500 to-rose-600",
        description: "Create and manage certification programs",
        features: [
          { title: "AI Program Generation", description: "Generate complete certification programs from topics with structured modules.", icon: "Zap" },
          { title: "Structured Exams", description: "Create proctored exams with passing criteria and retry policies.", icon: "FileText" },
          { title: "Certificate Generation", description: "Auto-generate branded certificates with unique IDs and verification QR codes.", icon: "Award" },
          { title: "Skill Validation", description: "Map certifications to skills with endorsement tracking.", icon: "CheckCircle2" },
          { title: "Expiration Management", description: "Track certificate validity with renewal reminders and recertification.", icon: "Clock" },
          { title: "Public Verification", description: "Public verification pages for credential validation by third parties.", icon: "Globe" }
        ]
      },
      {
        id: "hr-suite",
        name: "HR Management",
        icon: "Users",
        color: "from-indigo-500 to-violet-600",
        description: "Complete HR toolkit for workforce management",
        features: [
          { title: "Policy Management", description: "Create, distribute, and track policy acknowledgments with version control.", icon: "FileText" },
          { title: "Team Management", description: "Manage teams with reporting relationships and department views.", icon: "Users" },
          { title: "KRA/KPI Tracking", description: "Define and track key result areas and performance indicators per role.", icon: "Target" },
          { title: "Employee Profiles", description: "Comprehensive employee records with skills, certifications, and history.", icon: "Users" },
          { title: "Executive Dashboard", description: "High-level insights for leadership with drill-down capabilities.", icon: "BarChart3" },
          { title: "Activity Tracking", description: "Monitor platform usage and engagement across the organization.", icon: "Clock" }
        ]
      },
      {
        id: "platform",
        name: "Platform",
        icon: "Settings",
        color: "from-gray-500 to-slate-600",
        description: "Enterprise-grade infrastructure and security",
        features: [
          { title: "Multi-Tenant Architecture", description: "Complete data isolation with subdomain routing and per-tenant configuration.", icon: "Database" },
          { title: "White-Label Branding", description: "Custom logos, colors, themes, and domain mapping per organization.", icon: "Layers" },
          { title: "Role-Based Access", description: "Granular permissions for Admin, HR, Manager, and Employee roles.", icon: "Lock" },
          { title: "Multi-AI Support", description: "Choose between OpenAI GPT-4, Anthropic Claude, and Google Gemini.", icon: "Brain" },
          { title: "AI Director", description: "Intelligent platform assistant for navigation, help, and automation.", icon: "MessageSquare" },
          { title: "API Access", description: "RESTful APIs for integration with existing systems and workflows.", icon: "Code" }
        ]
      }
    ]
  });

  await upsertContent("features", "cta", {
    title: "Ready to Transform Your Workforce?",
    subtitle: "See how Cognaium can help you hire smarter, train better, and develop your team with AI-powered intelligence.",
    primaryCta: "Request a Demo",
    primaryCtaLink: "/contact",
    secondaryCta: "View Pricing",
    secondaryCtaLink: "/pricing"
  });
}

async function seedSupportContent() {
  console.log("\n--- Seeding Support Page Content ---");

  await upsertContent("support", "header", {
    title: "Support Center",
    subtitle: "We're here to help you get the most out of Cognaium. Find answers, resources, and ways to connect with our team.",
  });

  await upsertContent("support", "channels", {
    items: [
      {
        icon: "Mail",
        title: "Email Support",
        description: "For general inquiries and technical assistance, reach out to our support team.",
        action: "Email Us",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=support@cognaium.com",
        color: "primary"
      },
      {
        icon: "MessageSquare",
        title: "Request a Demo",
        description: "See Cognaium in action with a personalized walkthrough tailored to your needs.",
        action: "Book Demo",
        href: "/contact",
        color: "accent"
      },
      {
        icon: "Phone",
        title: "Enterprise Sales",
        description: "Speak with our sales team about custom solutions and enterprise deployments.",
        action: "Contact Sales",
        href: "/contact",
        color: "primary"
      }
    ]
  });

  await upsertContent("support", "resources", {
    items: [
      { icon: "BookOpen", title: "Documentation", description: "Comprehensive guides for platform setup, configuration, and usage." },
      { icon: "Video", title: "Video Tutorials", description: "Step-by-step video guides for common tasks and advanced features." },
      { icon: "FileText", title: "API Reference", description: "Complete API documentation for integrations and custom development." },
      { icon: "Users", title: "Community", description: "Connect with other Cognaium users to share tips and best practices." }
    ]
  });

  await upsertContent("support", "faqs", {
    items: [
      { q: "How do I get started with Cognaium?", a: "The best way to start is by requesting a demo. Our team will guide you through the platform, help set up your organization, and configure initial assessments." },
      { q: "What AI providers does Cognaium support?", a: "Cognaium supports multiple AI providers including OpenAI GPT-4, Anthropic Claude, and Google Gemini. Enterprise customers can also integrate custom or fine-tuned models." },
      { q: "Is Cognaium HIPAA compliant?", a: "Yes, Cognaium is designed with HIPAA compliance at its core. We offer Business Associate Agreements (BAA) for healthcare organizations handling PHI." },
      { q: "Can I use Cognaium for my existing employees?", a: "Absolutely! Cognaium supports both candidate assessment and employee development. You can use it for skill assessments, training programs, certifications, and performance tracking." },
      { q: "How does the proctoring system work?", a: "Our proctoring system uses AI-powered person detection and audio monitoring. It can detect multiple persons, track faces, monitor for suspicious sounds, and enforce browser security. Settings are fully configurable per assessment." },
      { q: "Can Cognaium integrate with my existing systems?", a: "Yes, we offer REST APIs for integration with HRIS, LMS, and other enterprise systems. Enterprise customers can also get custom integrations built by our team." },
      { q: "What's the difference between AI Screening and AI Tutoring?", a: "AI Screening is for assessment—evaluating candidates or employees through structured interviews and tests. AI Tutoring is for learning—providing personalized instruction, practice exercises, and skill development with multi-agent AI tutors." },
      { q: "How does multi-tenant work?", a: "Each organization gets complete data isolation with their own subdomain, branding, and configuration. Data never crosses organizational boundaries, and each tenant can customize their experience." }
    ]
  });
}

async function seedResearchContent() {
  console.log("\n--- Seeding Research Page Content ---");

  await upsertContent("research", "header", {
    title: "Cognaium Research",
    subtitle: "Thought leadership on AI-powered workforce development, skills-based organizations, and the future of work.",
  });

  await upsertContent("research", "papers", {
    items: [
      {
        id: 1,
        title: "The Skills-Based Economy: Redefining Work in the Age of AI",
        series: "Part 1 of 5 in the Cognaium Research Series",
        description: "This foundational paper explores how the traditional job-based economy is giving way to a skills-based model where capabilities matter more than credentials. We examine the forces driving this transformation—AI automation, gig economy growth, and accelerating skill obsolescence—and present a framework for organizations to navigate the transition.",
        keyInsights: [
          "Why traditional job architectures are becoming obsolete",
          "The emergence of skill-based organizational design",
          "Measuring and managing human capital liquidity",
          "Case studies from early adopters of skills-based practices"
        ],
        icon: "BookOpen",
        color: "from-blue-500 to-cyan-600",
        publishDate: "2025-06-15",
        lastUpdated: "2026-01-15",
        readTime: "25 min read",
        category: "Workforce Transformation",
        relatedConcepts: ["Human Capital Liquidity", "Skills-Based Talent Management", "Skill Taxonomy"]
      },
      {
        id: 2,
        title: "The Algorithmic CHRO: AI-Augmented Human Resources Leadership",
        series: "Part 2 of 5 in the Cognaium Research Series",
        description: "As AI capabilities expand, the role of HR leadership is fundamentally changing. This paper examines how CHROs can leverage algorithmic intelligence to make better strategic decisions about talent acquisition, development, and deployment—while maintaining the human judgment essential for ethical and effective people management.",
        keyInsights: [
          "The evolution from data-driven to AI-augmented HR",
          "Decision frameworks for algorithmic HR recommendations",
          "Balancing efficiency with employee experience",
          "Building AI literacy in HR organizations"
        ],
        icon: "Brain",
        color: "from-violet-500 to-purple-600",
        publishDate: "2025-08-20",
        lastUpdated: "2026-01-15",
        readTime: "30 min read",
        category: "HR Leadership",
        relatedConcepts: ["Algorithmic CHRO", "Sentient Organization Architecture", "AI Director"]
      },
      {
        id: 3,
        title: "The Algorithmic Mandate: Why Organizations Must Embrace AI-Powered Talent Management",
        series: "Part 3 of 5 in the Cognaium Research Series",
        description: "This paper makes the business case for AI adoption in talent management, presenting evidence that organizations delaying AI implementation face growing competitive disadvantages. We analyze the costs of inaction, identify critical adoption thresholds, and provide a roadmap for responsible AI integration in workforce practices.",
        keyInsights: [
          "Competitive dynamics forcing AI adoption in HR",
          "ROI analysis of AI-powered talent management",
          "Risk assessment: adoption vs. delay",
          "Implementation roadmap and success metrics"
        ],
        icon: "Target",
        color: "from-emerald-500 to-teal-600",
        publishDate: "2025-10-10",
        lastUpdated: "2026-01-15",
        readTime: "28 min read",
        category: "Strategy",
        relatedConcepts: ["Composite Candidate Index", "AI Screening", "Workforce Analytics"]
      },
      {
        id: 4,
        title: "The Co-Evolution of Mind and Machine: Human-AI Collaboration in the Workplace",
        series: "Part 4 of 5 in the Cognaium Research Series",
        description: "Human-AI collaboration is reshaping how work gets done. This paper explores the dynamics of cognitive partnership between humans and AI systems, examining how each enhances the other's capabilities. We present models for effective human-AI teaming and address the psychological and organizational factors that enable productive collaboration.",
        keyInsights: [
          "Cognitive complementarity: human and AI strengths",
          "Designing effective human-AI workflows",
          "Trust calibration in AI-assisted decisions",
          "Skill development for human-AI collaboration"
        ],
        icon: "Users",
        color: "from-amber-500 to-orange-600",
        publishDate: "2025-11-25",
        lastUpdated: "2026-01-15",
        readTime: "32 min read",
        category: "Future of Work",
        relatedConcepts: ["Multi-Agent AI Orchestration", "AI Tutoring", "Personalized Learning"]
      },
      {
        id: 5,
        title: "The Symbiotic Enterprise: Organizational Design for the AI Era",
        series: "Part 5 of 5 in the Cognaium Research Series",
        description: "The concluding paper in our series envisions the symbiotic enterprise—an organizational model where humans and AI systems work in mutually beneficial partnership. We explore how organizational structures, culture, and governance must evolve to support this symbiosis, creating value greater than either humans or AI could achieve independently.",
        keyInsights: [
          "Characteristics of symbiotic organizations",
          "Redesigning organizational structures for human-AI integration",
          "Governance frameworks for AI in the enterprise",
          "Creating cultures that embrace symbiotic work"
        ],
        icon: "Layers",
        color: "from-pink-500 to-rose-600",
        publishDate: "2026-01-10",
        lastUpdated: "2026-01-15",
        readTime: "35 min read",
        category: "Organizational Design",
        relatedConcepts: ["Symbiotic Enterprise", "Sentient Organization Architecture", "Workforce Agility"]
      }
    ]
  });

  await upsertContent("research", "additional_resources", {
    items: [
      { title: "2025 State of Skills-Based Organizations Report", description: "Annual benchmark study analyzing adoption of skills-based practices across 500+ organizations.", type: "Report", date: "2025-12" },
      { title: "AI Ethics in Talent Management: A Practical Guide", description: "Frameworks for implementing AI in hiring and development while maintaining fairness and transparency.", type: "White Paper", date: "2025-09" },
      { title: "The ROI of AI-Powered Skill Assessment", description: "Data-driven analysis of cost savings and quality improvements from AI screening implementation.", type: "Case Study", date: "2025-07" }
    ]
  });
}

async function seedGlossaryContent() {
  console.log("\n--- Seeding Glossary Page Content ---");

  await upsertContent("glossary", "header", {
    title: "Cognaium Glossary",
    subtitle: "Comprehensive definitions of key concepts, frameworks, and terminology in AI-powered workforce development.",
    lastUpdated: "January 22, 2026",
  });

  await upsertContent("glossary", "terms", {
    items: [
      {
        id: "human-capital-liquidity",
        term: "Human Capital Liquidity",
        category: "Framework",
        icon: "Users",
        shortDefinition: "A quantitative framework measuring how fluidly skills and talent can flow within and across organizations.",
        fullDefinition: "Human Capital Liquidity is a quantitative framework developed by Cognaium that measures how fluidly skills and talent can flow within and across organizations. It assesses skill transferability, role adaptability, and workforce agility to enable dynamic talent allocation. Organizations with high human capital liquidity can rapidly redeploy talent to meet changing business needs, reduce hiring costs, and maintain competitive advantage in fast-moving markets.",
        relatedTerms: ["Skills-Based Talent Management", "Skill Taxonomy", "Workforce Agility"],
        learnMore: "/what-is-human-capital-liquidity"
      },
      {
        id: "sentient-organization-architecture",
        term: "Sentient Organization Architecture",
        category: "Framework",
        icon: "Brain",
        shortDefinition: "An AI-augmented organizational design where enterprise systems continuously learn, adapt, and evolve.",
        fullDefinition: "Sentient Organization Architecture (SOA) is an AI-augmented organizational design paradigm where enterprise systems continuously learn, adapt, and evolve based on workforce data, performance patterns, and strategic objectives. Unlike traditional static org structures, a sentient organization uses AI to dynamically optimize team compositions, identify emerging skill gaps, predict talent needs, and recommend organizational changes in real-time.",
        relatedTerms: ["AI Director", "Algorithmic CHRO", "Symbiotic Enterprise"],
        learnMore: "/research"
      },
      {
        id: "composite-candidate-index",
        term: "Composite Candidate Index (CCI)",
        category: "Scoring",
        icon: "Target",
        shortDefinition: "Cognaium's proprietary pre-assessment scoring algorithm for evaluating candidates before interviews.",
        fullDefinition: "The Composite Candidate Index (CCI) is Cognaium's proprietary pre-assessment scoring algorithm that evaluates candidates based on three key dimensions: resume-job match percentage (how well skills and experience align with requirements), role readiness indicators (indicators of immediate contribution potential), and risk factor analysis (potential concerns or gaps). CCI helps recruiters prioritize candidates before investing time in formal interviews.",
        relatedTerms: ["AI Screening", "Resume Parsing", "Talent Pool"],
        learnMore: "/features"
      },
      {
        id: "multi-agent-orchestration",
        term: "Multi-Agent AI Orchestration",
        category: "Technology",
        icon: "Layers",
        shortDefinition: "Cognaium's approach to AI tutoring using specialized AI agents that collaborate for personalized learning.",
        fullDefinition: "Multi-Agent AI Orchestration is Cognaium's approach to AI-powered tutoring where multiple specialized AI agents work together to deliver personalized learning experiences. The system includes: Curriculum Planner (designs learning paths), Concept Explainer (breaks down complex topics), Practice Coach (guides hands-on exercises), and Quiz Generator (creates assessments). Each agent specializes in a specific aspect of learning, coordinating seamlessly to adapt to individual learning styles and pace.",
        relatedTerms: ["AI Tutoring", "Personalized Learning", "Skill Gap Analysis"],
        learnMore: "/features"
      },
      {
        id: "ai-director",
        term: "AI Director",
        category: "Product Feature",
        icon: "MessageSquare",
        shortDefinition: "Cognaium's intelligent platform assistant providing contextual navigation, help, and automation.",
        fullDefinition: "The AI Director is Cognaium's intelligent platform assistant that provides contextual navigation, help, and automation across the entire platform experience. It understands user intent, answers questions about platform features, guides users through complex workflows, and can automate repetitive tasks. The AI Director learns from usage patterns to provide increasingly personalized assistance over time.",
        relatedTerms: ["Platform Navigation", "User Experience", "AI Automation"],
        learnMore: "/features"
      },
      {
        id: "skills-based-talent-management",
        term: "Skills-Based Talent Management",
        category: "Methodology",
        icon: "Award",
        shortDefinition: "An approach to workforce management that prioritizes skills over traditional job titles and credentials.",
        fullDefinition: "Skills-Based Talent Management is an approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials. This methodology enables organizations to: identify hidden talent within their workforce, create more inclusive hiring practices, build flexible career pathways, and respond faster to changing skill demands. Cognaium's platform is built on skills-based principles throughout.",
        relatedTerms: ["Human Capital Liquidity", "Skill Taxonomy", "Career Pathways"],
        learnMore: "/what-is-skills-based-talent-management"
      },
      {
        id: "ai-skills-mapping",
        term: "AI Skills Mapping",
        category: "Technology",
        icon: "BarChart3",
        shortDefinition: "Using artificial intelligence to automatically identify, categorize, and validate workforce skills.",
        fullDefinition: "AI Skills Mapping uses artificial intelligence to automatically identify, categorize, and validate workforce skills from multiple data sources including resumes, performance data, learning completions, and self-assessments. Unlike manual skills inventories, AI-powered mapping provides real-time accuracy, identifies skill adjacencies (related skills), predicts skill decay, and recommends development priorities based on business objectives.",
        relatedTerms: ["Skill Taxonomy", "Resume Parsing", "Skills-Based Talent Management"],
        learnMore: "/what-is-ai-skills-mapping"
      },
      {
        id: "skill-taxonomy",
        term: "Skill Taxonomy",
        category: "Framework",
        icon: "Layers",
        shortDefinition: "A hierarchical classification system that organizes skills into categories, subcategories, and proficiency levels.",
        fullDefinition: "A Skill Taxonomy is a hierarchical classification system that organizes skills into categories, subcategories, and proficiency levels. Cognaium uses industry-standard taxonomies enhanced with AI to provide consistent skill language across the organization, enable meaningful skill comparisons, support career path planning, and align individual skills with organizational capabilities. The taxonomy continuously evolves as new skills emerge.",
        relatedTerms: ["AI Skills Mapping", "Skills-Based Talent Management", "Career Pathways"],
        learnMore: "/features"
      },
      {
        id: "algorithmic-chro",
        term: "Algorithmic CHRO",
        category: "Concept",
        icon: "Brain",
        shortDefinition: "The concept of AI-augmented HR leadership where data and algorithms inform strategic workforce decisions.",
        fullDefinition: "The Algorithmic CHRO represents the evolution of HR leadership where artificial intelligence and data analytics augment human decision-making at the strategic level. Rather than replacing HR leaders, the algorithmic approach provides CHROs with predictive insights, scenario modeling, and real-time workforce intelligence to make better decisions about talent strategy, organizational design, and workforce planning.",
        relatedTerms: ["Sentient Organization Architecture", "Workforce Analytics", "Strategic HR"],
        learnMore: "/research"
      },
      {
        id: "symbiotic-enterprise",
        term: "Symbiotic Enterprise",
        category: "Concept",
        icon: "Zap",
        shortDefinition: "Future organizational model where humans and AI systems work in mutually beneficial partnership.",
        fullDefinition: "The Symbiotic Enterprise is a future organizational model where humans and AI systems work in mutually beneficial partnership. In this model, AI handles routine decisions, pattern recognition, and optimization while humans focus on creativity, relationship building, and ethical judgment. The symbiosis creates value greater than either humans or AI could achieve independently, with continuous learning flowing in both directions.",
        relatedTerms: ["Sentient Organization Architecture", "Human-AI Collaboration", "Algorithmic CHRO"],
        learnMore: "/research"
      },
      {
        id: "proctoring",
        term: "AI Proctoring",
        category: "Product Feature",
        icon: "Shield",
        shortDefinition: "Real-time monitoring of assessments using AI to ensure integrity and prevent cheating.",
        fullDefinition: "AI Proctoring in Cognaium uses advanced computer vision and audio analysis to ensure assessment integrity. The system includes AI-powered person detection (identifies multiple people), audio monitoring (detects speech and suspicious sounds), browser security enforcement (prevents tab switching and copy-paste), and violation logging with severity levels. Configurable thresholds allow organizations to balance security with candidate experience.",
        relatedTerms: ["AI Screening", "Assessment Integrity", "Violation Detection"],
        learnMore: "/features"
      },
      {
        id: "workforce-agility",
        term: "Workforce Agility",
        category: "Concept",
        icon: "Zap",
        shortDefinition: "An organization's ability to rapidly adapt its workforce to changing business needs and market conditions.",
        fullDefinition: "Workforce Agility measures an organization's ability to rapidly adapt its workforce to changing business needs and market conditions. High workforce agility requires: clear visibility into current skills, ability to quickly redeploy talent, efficient reskilling programs, and flexible organizational structures. Cognaium enhances workforce agility through AI-powered skills mapping, personalized learning paths, and dynamic talent recommendations.",
        relatedTerms: ["Human Capital Liquidity", "Skills-Based Talent Management", "Organizational Design"],
        learnMore: "/about"
      }
    ]
  });
}

async function seedComplianceContent() {
  console.log("\n--- Seeding Compliance Page Content ---");

  await upsertContent("compliance", "header", {
    title: "Compliance & Data Protection",
    subtitle: "Meeting the highest standards for data security, privacy, and regulatory compliance across industries.",
  });

  await upsertContent("compliance", "hipaa", {
    title: "HIPAA Compliance",
    description: "Cognaium is designed to be fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). We implement all necessary administrative, physical, and technical safeguards to protect Protected Health Information (PHI).",
    items: [
      "Strict access controls and identity management",
      "Comprehensive audit logs for all data access",
      "Encrypted data at rest and in transit",
      "Business Associate Agreements (BAA) available",
      "Regular security assessments and training"
    ]
  });

  await upsertContent("compliance", "gdpr", {
    title: "GDPR Compliance",
    description: "For our European customers and global CRO partners, we align our data processing practices with the General Data Protection Regulation (GDPR) requirements.",
    items: [
      "Right to be forgotten and data portability",
      "Consent management and preference centers",
      "Data minimization and purpose limitation",
      "Transparent data processing documentation",
      "Data Protection Impact Assessments (DPIA)"
    ]
  });

  await upsertContent("compliance", "multi_tenant", {
    title: "Multi-Tenant Data Isolation",
    description: "Our multi-tenant architecture ensures complete data isolation between organizations. Each tenant's data is segregated at the database level with tenant-specific identifiers enforced on every query.",
    items: [
      "Tenant ID validation on all API requests",
      "Subdomain-based routing and validation",
      "Separate encryption contexts per tenant",
      "Isolated file storage and media assets",
      "Cross-tenant access prevention at middleware level"
    ],
    stats: [
      { icon: "Lock", title: "Encryption", desc: "AES-256 at rest" },
      { icon: "Server", title: "Isolation", desc: "Per-tenant databases" },
      { icon: "Eye", title: "Audit", desc: "Complete logging" },
      { icon: "Users", title: "RBAC", desc: "Granular permissions" }
    ]
  });

  await upsertContent("compliance", "standards", {
    items: [
      { icon: "FileText", title: "SOC 2 Type II Aligned", description: "Our infrastructure is built to audit-ready standards for security, availability, processing integrity, and confidentiality." },
      { icon: "Activity", title: "CCPA Compliance", description: "California Consumer Privacy Act compliance with data access, deletion, and opt-out capabilities for California residents." },
      { icon: "Shield", title: "Industry Standards", description: "Following OWASP security guidelines, NIST frameworks, and industry best practices for secure software development." }
    ],
    footer: {
      text: "For compliance documentation, BAA requests, or security questionnaires, please contact our security team.",
      email: "security@cognaium.com",
      lastUpdated: "January 2026"
    }
  });
}

async function seedSecurityContent() {
  console.log("\n--- Seeding Security Page Content ---");

  await upsertContent("security", "header", {
    title: "Security by Design. Privacy by Default.",
    subtitle: "Enterprise-grade security with multi-tenant isolation, encryption, and compliance frameworks to protect your most sensitive data.",
  });

  await upsertContent("security", "layers", {
    items: [
      {
        title: "Application Security",
        icon: "Code",
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
        icon: "Database",
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
        icon: "Key",
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
        icon: "Activity",
        items: [
          "Comprehensive audit logging",
          "Real-time security monitoring",
          "Automated threat detection",
          "Activity tracking per user",
          "Advanced log analysis"
        ]
      }
    ]
  });

  await upsertContent("security", "compliance_items", {
    items: [
      { title: "HIPAA (Healthcare)", description: "Full compliance for Protected Health Information (PHI) with administrative, physical, and technical safeguards. BAA available for enterprise customers.", icon: "ShieldCheck" },
      { title: "GDPR (Europe)", description: "Data protection and privacy controls including right to erasure, data portability, and consent management for EU operations.", icon: "Globe" },
      { title: "SOC 2 Type II Aligned", description: "Infrastructure built to audit-ready standards for security, availability, processing integrity, and confidentiality.", icon: "CheckCircle2" }
    ]
  });

  await upsertContent("security", "multi_tenant", {
    title: "Multi-Tenant Architecture",
    description: "Cognaium operates on a true multi-tenant architecture where each organization's data is completely isolated. We use tenant-specific identifiers at every layer of the stack to ensure data never crosses organizational boundaries.",
    features: [
      { icon: "Server", title: "Subdomain Routing", description: "Each organization gets a dedicated subdomain with automatic request routing and validation." },
      { icon: "Database", title: "Data Isolation", description: "Tenant ID validation on every database query ensures complete data segregation." },
      { icon: "Lock", title: "Credential Isolation", description: "Per-tenant encryption keys and authentication contexts prevent cross-tenant access." }
    ],
    stats: [
      { value: "100%", label: "Data Isolation" },
      { value: "0", label: "Cross-Tenant Access" },
      { value: "Real-time", label: "Validation" },
      { value: "Automatic", label: "Routing" }
    ]
  });

  await upsertContent("security", "proctoring", {
    title: "Proctoring Security",
    description: "Our proctoring system uses AI-powered person detection and audio monitoring, ensuring assessment integrity while respecting privacy. All proctoring data is encrypted and can be deployed on-premise for enterprise customers.",
    features: [
      { icon: "Eye", label: "AI Detection" },
      { icon: "Bell", label: "Audio Monitoring" },
      { icon: "Shield", label: "Browser Security" },
      { icon: "Activity", label: "Violation Logging" }
    ],
    items: [
      "Local processing option for sensitive environments",
      "Encrypted WebSocket connections",
      "Configurable data retention policies",
      "GDPR-compliant consent workflows"
    ]
  });
}

async function seedPrivacyContent() {
  console.log("\n--- Seeding Privacy Page Content ---");

  await upsertContent("privacy", "header", {
    title: "Your Data. Your Trust. Our Responsibility.",
    subtitle: "Transparency for the Employee & the Enterprise. Last Updated: January 2026",
  });

  await upsertContent("privacy", "sections", {
    items: [
      {
        title: "1. What We Collect",
        content: "We collect professional competency data (assessment scores, skill gaps, certification dates) and professional identity information. We do not collect personal patient health records or unrelated personal financial data."
      },
      {
        title: "2. How AI Uses Your Data",
        content: "Cognaium uses anonymized, aggregated performance data to train our \"Clinical Skill Models.\" Your specific institutional data is never used to train the public model without your explicit consent."
      },
      {
        title: "3. Your Rights",
        content: "You retain ownership of your institutional workforce data. Upon contract termination, all specific workforce maps are either returned or cryptographically shredded."
      },
      {
        title: "4. Data Protection",
        content: "We implement military-grade encryption and rigorous access controls to ensure your data remains secure. Our systems are audited regularly to maintain compliance with global standards."
      }
    ]
  });
}

async function seedTermsContent() {
  console.log("\n--- Seeding Terms Page Content ---");

  await upsertContent("terms", "header", {
    title: "Terms of Service",
    subtitle: "The rules and guidelines for using the Cognaium platform.",
  });

  await upsertContent("terms", "sections", {
    items: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing or using Cognaium, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
      },
      {
        title: "2. Use License",
        content: "Permission is granted to temporarily use the Cognaium platform for personal, non-commercial transitory viewing or as part of an authorized enterprise subscription. This is the grant of a license, not a transfer of title."
      },
      {
        title: "3. Disclaimer",
        content: "The materials on Cognaium are provided on an 'as is' basis. Cognaium makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
      },
      {
        title: "4. Limitations",
        content: "In no event shall Cognaium or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cognaium."
      }
    ],
    lastUpdated: "January 2026"
  });
}

async function seedSkillLibraryContent() {
  console.log("\n--- Seeding Skill Library Page Content ---");

  await upsertContent("skill_library", "header", {
    badge: "Training Modules",
    title: "Master the Platform",
    titleHighlight: "With Expert Training",
    subtitle: "Comprehensive training curriculum covering every feature of Cognaium. From basic navigation to advanced AI configurations.",
  });

  await upsertContent("skill_library", "stats", {
    items: [
      { value: "12", label: "Training Modules" },
      { value: "20+", label: "Hours of Content" },
      { value: "All", label: "User Roles Covered" },
      { value: "Free", label: "For Customers" }
    ]
  });

  await upsertContent("skill_library", "modules", {
    items: [
      { id: 1, title: "Platform Overview", duration: "30 minutes", audience: "All users", icon: "BookOpen", color: "from-indigo-500 to-purple-600", topics: ["What is Cognaium?", "Key features overview", "User roles (Admin, HR, Manager, Employee)", "Navigation and dashboard basics", "AI Director assistant", "Help resources and support"], outcomes: ["Understand platform capabilities", "Navigate the user interface", "Use the AI Director for help"] },
      { id: 2, title: "Admin Training", duration: "2 hours", audience: "System administrators", icon: "Settings", color: "from-emerald-500 to-teal-600", topics: ["Initial setup and configuration", "Multi-tenant management", "Branding and white-labeling", "User management and RBAC", "SMTP and notification setup", "AI provider configuration", "System health monitoring"], outcomes: ["Configure platform settings", "Manage users and permissions", "Set up organizational branding"] },
      { id: 3, title: "AI Screening Mastery", duration: "3 hours", audience: "HR professionals", icon: "Brain", color: "from-violet-500 to-purple-600", topics: ["Assessment types: AI Interview, Structured, Leveled", "Multiple question types deep dive", "AI question generation", "Template creation and management", "Proctoring configuration", "Candidate assignment workflows", "Results analysis and bulk insights"], outcomes: ["Create effective AI assessments", "Configure proctoring settings", "Analyze candidate results"] },
      { id: 4, title: "Proctoring Configuration", duration: "1.5 hours", audience: "HR & Admins", icon: "Eye", color: "from-red-500 to-rose-600", topics: ["AI person detection setup", "Audio monitoring configuration", "Browser security enforcement", "Violation thresholds and rules", "Auto-termination configuration", "Recording and playback", "On-premise deployment options"], outcomes: ["Configure proctoring for assessments", "Set appropriate violation rules", "Review proctoring recordings"] },
      { id: 5, title: "ATS & Hiring Pipeline", duration: "2.5 hours", audience: "HR & Recruiters", icon: "Briefcase", color: "from-blue-500 to-cyan-600", topics: ["Job posting creation", "Knockout questions setup", "Resume parsing and skill extraction", "CCI (Composite Candidate Index) scoring", "Talent pool management", "Bulk email campaigns", "Interview scheduling"], outcomes: ["Manage full hiring pipeline", "Use CCI for candidate ranking", "Build and maintain talent pools"] },
      { id: 6, title: "Training Programs", duration: "2 hours", audience: "HR & L&D", icon: "BookOpen", color: "from-cyan-500 to-blue-600", topics: ["Training program structure", "Content types: video, document, quiz", "YouTube and document import", "Learning paths with prerequisites", "Progress tracking", "Completion certificates", "Training assignment workflows"], outcomes: ["Create multi-format training", "Build learning paths", "Track learner progress"] },
      { id: 7, title: "AI Tutoring System", duration: "2 hours", audience: "L&D & Employees", icon: "GraduationCap", color: "from-amber-500 to-orange-600", topics: ["Multi-agent orchestration overview", "Curriculum Planner agent", "Concept Explainer agent", "Practice Coach agent", "Quiz Generator agent", "Voice tutor features", "Skill gap detection and recommendations"], outcomes: ["Use AI tutoring effectively", "Generate personalized quizzes", "Identify and address skill gaps"] },
      { id: 8, title: "Certifications & Badges", duration: "1.5 hours", audience: "HR & L&D", icon: "Award", color: "from-pink-500 to-rose-600", topics: ["AI-powered program generation", "Certification structure and modules", "Quiz and exam configuration", "Passing criteria and retakes", "Certificate generation and branding", "Public verification links", "Expiration and recertification"], outcomes: ["Create certification programs", "Configure exams and passing criteria", "Manage certificate lifecycle"] },
      { id: 9, title: "HR Suite & Policies", duration: "1.5 hours", audience: "HR professionals", icon: "Shield", color: "from-slate-500 to-gray-600", topics: ["Policy creation and AI generation", "Policy assignment workflows", "Acknowledgment tracking", "Team management", "KRA/KPI configuration", "Employee profiles and history", "Compliance reporting"], outcomes: ["Manage policies effectively", "Track acknowledgments", "Set up KRAs and KPIs"] },
      { id: 10, title: "Analytics & Reporting", duration: "2 hours", audience: "Managers & HR", icon: "BarChart3", color: "from-indigo-500 to-blue-600", topics: ["Dashboard customization", "Advanced search features", "Behavioral learning analytics", "Team and individual reports", "Executive dashboards", "Export options: Excel, PDF, API", "Custom report building"], outcomes: ["Create custom reports", "Use advanced search features", "Generate executive insights"] },
      { id: 11, title: "Manager Essentials", duration: "1 hour", audience: "Team managers", icon: "Users", color: "from-teal-500 to-emerald-600", topics: ["Manager dashboard overview", "Team member management", "Assessment assignment", "Training assignment", "Skill gap identification", "Team performance reports", "Quick actions and workflows"], outcomes: ["Monitor team progress", "Assign assessments and training", "Generate team reports"] },
      { id: 12, title: "Employee Journey", duration: "45 minutes", audience: "All employees", icon: "Target", color: "from-purple-500 to-violet-600", topics: ["Employee dashboard navigation", "Taking assessments", "Learning path progression", "Skills roadmap", "Using AI tutor", "Viewing certifications", "Profile and preferences"], outcomes: ["Complete assessments successfully", "Navigate learning paths", "Use AI tutor for development"] }
    ]
  });

  await upsertContent("skill_library", "custom_training", {
    title: "Need Custom Training?",
    subtitle: "We offer personalized onboarding and training sessions for enterprise customers. Get hands-on guidance from our expert team tailored to your organization's needs."
  });
}

async function seedCompareContent() {
  console.log("\n--- Seeding Compare Page Content ---");

  await upsertContent("compare_ai_hiring", "header", {
    title: "AI vs Traditional Hiring",
    subtitle: "A comprehensive comparison of AI-powered and traditional recruitment approaches to help you make informed decisions about your hiring technology.",
  });

  await upsertContent("compare_ai_hiring", "summary", {
    text: "AI-powered hiring typically delivers 50-70% faster time-to-hire, 30-50% cost reduction, and more consistent candidate evaluation compared to traditional methods. Organizations using AI screening can process unlimited applications while providing better candidate experiences and reducing unconscious bias in early-stage screening."
  });

  await upsertContent("compare_ai_hiring", "comparison", {
    items: [
      { category: "Time to Hire", traditional: { value: "30-45 days average", details: "Manual resume review, phone screens, multiple interview rounds, and manual scheduling create lengthy hiring cycles.", icon: "Clock" }, aiPowered: { value: "50-70% faster", details: "AI screening, automated scheduling, and real-time scoring dramatically reduce time from application to offer.", icon: "Zap" } },
      { category: "Cost per Hire", traditional: { value: "$4,000-$7,000+", details: "High recruiter time investment, job board costs, and lengthy process increase cost per hire significantly.", icon: "DollarSign" }, aiPowered: { value: "30-50% reduction", details: "Automation of screening and initial assessment reduces recruiter workload and shortens hiring cycles.", icon: "DollarSign" } },
      { category: "Screening Accuracy", traditional: { value: "Variable, bias-prone", details: "Human reviewers may inconsistently apply criteria, be influenced by unconscious bias, and miss qualified candidates.", icon: "Target" }, aiPowered: { value: "Consistent, objective", details: "AI applies the same criteria to every candidate, reducing bias and ensuring no qualified candidates are overlooked.", icon: "Target" } },
      { category: "Volume Handling", traditional: { value: "Limited by headcount", details: "Each additional applicant requires proportional recruiter time, creating bottlenecks during high-volume periods.", icon: "Users" }, aiPowered: { value: "Unlimited scale", details: "AI can screen thousands of candidates simultaneously without degradation in quality or speed.", icon: "Users" } },
      { category: "Candidate Experience", traditional: { value: "Slow, opaque process", details: "Candidates wait days or weeks for responses, with little visibility into where they stand in the process.", icon: "Users" }, aiPowered: { value: "Fast, engaging", details: "Candidates receive immediate engagement through AI interviews, with faster feedback and a modern experience.", icon: "Users" } },
      { category: "Assessment Depth", traditional: { value: "Surface-level screening", details: "Initial resume review catches obvious qualifications but misses nuanced skill evaluation and cultural fit.", icon: "BarChart3" }, aiPowered: { value: "Comprehensive evaluation", details: "AI assessments evaluate skills in depth with multiple question types, providing rich candidate profiles.", icon: "BarChart3" } }
    ]
  });

  await upsertContent("compare_ai_hiring", "challenges", {
    items: [
      "Resume keyword matching misses qualified candidates with different terminology",
      "Unconscious bias affects which resumes get attention",
      "Phone screens consume significant recruiter time",
      "Inconsistent interview questions make comparison difficult",
      "Manual scheduling creates delays and frustration",
      "Limited data for improving hiring decisions over time"
    ]
  });

  await upsertContent("compare_ai_hiring", "advantages", {
    items: [
      "AI understands skill equivalencies and related experience",
      "Objective scoring based on job-relevant criteria only",
      "Automated AI interviews screen at scale without human bottleneck",
      "Standardized assessments enable fair candidate comparison",
      "Integrated scheduling eliminates back-and-forth",
      "Rich analytics enable continuous hiring process improvement"
    ]
  });

  await upsertContent("compare_ai_hiring", "when_to_use", {
    aiIdeal: [
      "High application volumes (100+ per role)",
      "Need to reduce time-to-hire",
      "Scaling hiring across locations",
      "Seeking to reduce bias in screening",
      "Technical or skill-based roles",
      "Want data-driven hiring decisions"
    ],
    traditionalSuits: [
      "Executive-level positions",
      "Very specialized niche roles",
      "Relationship-based industries",
      "Very low hiring volume",
      "Roles requiring extensive reference checks",
      "Internal promotions and succession"
    ],
    bestPractice: "Most organizations benefit from a hybrid approach—using AI for initial screening and assessment while preserving human judgment for final interviews and cultural fit evaluation."
  });

  await upsertContent("compare_ai_hiring", "cognaium_features", {
    items: [
      { icon: "Brain", title: "AI Conversational Interviews", description: "Adaptive AI interviews powered by GPT-4, Claude, or Gemini that evaluate candidates through natural conversation." },
      { icon: "Shield", title: "Proctored Assessments", description: "Real-time AI proctoring with advanced detection ensures assessment integrity at any scale." },
      { icon: "Target", title: "CCI Scoring", description: "Composite Candidate Index provides objective pre-assessment scoring based on skills, readiness, and fit." },
      { icon: "BarChart3", title: "Bulk Analysis", description: "Compare hundreds of candidates side-by-side with AI-generated insights and ranking recommendations." },
      { icon: "Users", title: "ATS Integration", description: "Complete applicant tracking with talent pools, bulk communications, and interview scheduling." },
      { icon: "Zap", title: "Multiple Question Types", description: "Video, code, file upload, and more—assess any skill with the right question format." }
    ]
  });

  await upsertContent("compare_ai_hiring", "meta", {
    lastUpdated: "January 22, 2026",
    author: "Cognaium Research Team"
  });
}

async function seedEducationalContent() {
  console.log("\n--- Seeding Educational Pages Content ---");

  // Human Capital Liquidity
  await upsertContent("what_is_hcl", "header", {
    title: "What is Human Capital Liquidity?",
    subtitle: "Understanding the framework that measures workforce agility and talent mobility in modern organizations.",
  });

  await upsertContent("what_is_hcl", "quick_answer", {
    text: "Human Capital Liquidity is a quantitative framework developed by Cognaium that measures how fluidly skills and talent can flow within and across organizations. It assesses skill transferability, role adaptability, and workforce agility to enable dynamic talent allocation. Organizations with high human capital liquidity can rapidly redeploy talent to meet changing business needs."
  });

  await upsertContent("what_is_hcl", "sections", {
    items: [
      {
        id: "why-matters",
        title: "Why Human Capital Liquidity Matters",
        icon: "Users",
        content: "In traditional workforce models, employees are hired for specific roles and often remain locked into those positions until they leave or are promoted. This creates rigid organizational structures that struggle to adapt when business needs change, skills become obsolete, or new opportunities emerge.",
        benefits: [
          "Rapidly redeploy talent when priorities shift",
          "Reduce external hiring costs by maximizing internal mobility",
          "Respond faster to market changes and competitive threats",
          "Improve employee retention by enabling career growth",
          "Build resilience against skill obsolescence"
        ]
      },
      {
        id: "how-measured",
        title: "How is Human Capital Liquidity Measured?",
        icon: "BarChart3",
        content: "Cognaium's Human Capital Liquidity framework measures three core dimensions that together determine how fluidly talent can move within an organization.",
        dimensions: [
          { title: "Skill Transferability", icon: "Layers", description: "How readily an employee's skills can be applied across different roles, teams, or business units. Higher transferability means greater liquidity potential." },
          { title: "Role Adaptability", icon: "Zap", description: "The speed and ease with which employees can transition between roles, including learning curve, support requirements, and time to productivity." },
          { title: "Organizational Enablement", icon: "Target", description: "How well the organization's structure, culture, and systems support internal mobility—including visibility into opportunities, manager support, and development resources." }
        ]
      },
      {
        id: "how-improve",
        title: "How to Improve Human Capital Liquidity",
        icon: "TrendingUp",
        content: "Organizations can improve their human capital liquidity through several strategies.",
        strategies: [
          { title: "Implement Skills-Based Talent Management", description: "Move beyond job titles to understand and track the actual skills your workforce possesses. This creates visibility into hidden capabilities and enables skill-based matching." },
          { title: "Create Internal Talent Marketplaces", description: "Make internal opportunities visible to all employees and enable skill-based matching between people and projects, gigs, or permanent roles." },
          { title: "Invest in Continuous Learning", description: "Build development programs that help employees acquire adjacent skills, increasing their transferability across the organization." },
          { title: "Use AI-Powered Skill Mapping", description: "Deploy AI tools like Cognaium to automatically identify, validate, and track skills across your workforce, maintaining real-time visibility into organizational capabilities." }
        ]
      },
      {
        id: "cognaium",
        title: "Human Capital Liquidity and Cognaium",
        icon: "Brain",
        content: "Cognaium's platform is designed to help organizations measure and improve their human capital liquidity.",
        features: [
          "AI-powered skills mapping that identifies capabilities across your workforce",
          "Skill gap analysis that highlights development priorities",
          "AI tutoring that accelerates skill acquisition",
          "Certification programs that validate transferable capabilities",
          "Analytics dashboards that track liquidity metrics over time"
        ]
      }
    ]
  });

  await upsertContent("what_is_hcl", "related", {
    items: [
      { label: "Skills-Based Talent Management", href: "/what-is-skills-based-talent-management" },
      { label: "AI Skills Mapping", href: "/what-is-ai-skills-mapping" },
      { label: "Workforce Agility", href: "/glossary#workforce-agility" },
      { label: "Skill Taxonomy", href: "/glossary#skill-taxonomy" }
    ]
  });

  await upsertContent("what_is_hcl", "further_reading", {
    title: "Further Reading",
    description: "The Human Capital Liquidity framework is explored in depth in our research paper \"The Skills-Based Economy\" — Part 1 of the Cognaium Research Series.",
    link: "/research#paper-1",
    buttonText: "Read the Research Paper"
  });

  await upsertContent("what_is_hcl", "meta", {
    lastUpdated: "January 22, 2026",
    author: "Cognaium Research Team"
  });

  // Skills-Based Talent Management
  await upsertContent("what_is_sbtm", "header", {
    title: "What is Skills-Based Talent Management?",
    subtitle: "Understanding the methodology that prioritizes capabilities over credentials in modern workforce management.",
  });

  await upsertContent("what_is_sbtm", "quick_answer", {
    text: "Skills-Based Talent Management is an approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials. This methodology enables organizations to identify hidden talent, create more inclusive hiring practices, build flexible career pathways, and respond faster to changing skill demands."
  });

  await upsertContent("what_is_sbtm", "sections", {
    items: [
      {
        id: "shift",
        title: "The Shift from Jobs to Skills",
        icon: "Award",
        content: "Traditional talent management focuses on jobs—predefined bundles of tasks organized into roles with specific titles, required degrees, and years of experience. This approach made sense when work was stable and predictable, but today's rapid pace of change makes it increasingly obsolete.",
        comparison: {
          traditional: ["Hire for job titles", "Require specific degrees", "Rigid career ladders", "Siloed talent pools", "Slow to adapt"],
          skillsBased: ["Hire for capabilities", "Value demonstrated skills", "Flexible career lattices", "Connected talent pools", "Rapid redeployment"]
        }
      },
      {
        id: "components",
        title: "Key Components of Skills-Based Talent Management",
        icon: "Target",
        components: [
          { title: "Skill Taxonomy", icon: "Layers", description: "A comprehensive, standardized vocabulary for describing skills across the organization. This creates a common language that enables skill-based matching, development planning, and workforce analytics." },
          { title: "Skill Assessment & Validation", icon: "Brain", description: "Methods to identify and verify skills including AI-powered assessments, manager endorsements, certifications, and project-based evidence. Cognaium's AI screening platform provides robust skill validation." },
          { title: "Skills-Based Hiring", icon: "Users", description: "Recruiting practices that evaluate candidates on demonstrated skills rather than credentials, expanding talent pools and reducing bias. Includes AI-powered screening and skill-based job matching." },
          { title: "Skill-Based Development", icon: "TrendingUp", description: "Learning programs aligned to skill gaps and career aspirations rather than generic training catalogs. AI tutoring enables personalized skill development paths." }
        ]
      },
      {
        id: "benefits",
        title: "Benefits of Skills-Based Talent Management",
        icon: "TrendingUp",
        benefits: [
          { title: "Expanded Talent Pools", desc: "By focusing on skills rather than credentials, organizations access candidates previously filtered out by degree requirements or job title matching." },
          { title: "Reduced Bias", desc: "Skill-based evaluation provides more objective criteria than traditional proxies like school prestige or previous employer brand." },
          { title: "Improved Internal Mobility", desc: "Employees can move based on skill adjacencies rather than climbing narrow career ladders, improving retention and engagement." },
          { title: "Faster Reskilling", desc: "Understanding skill gaps enables targeted development rather than generic training, accelerating capability building." },
          { title: "Better Workforce Planning", desc: "Skill-level visibility enables strategic planning around capability needs rather than headcount." }
        ]
      },
      {
        id: "implementing",
        title: "Implementing Skills-Based Talent Management",
        icon: "Briefcase",
        content: "Transitioning to skills-based practices requires systematic change across HR processes.",
        steps: [
          { step: "1", title: "Build Your Skill Taxonomy", desc: "Define the skills that matter for your organization, creating a common vocabulary for all talent processes." },
          { step: "2", title: "Map Current Skills", desc: "Use AI-powered tools to identify existing skills across your workforce through assessments, resume parsing, and manager input." },
          { step: "3", title: "Redesign Job Architectures", desc: "Express roles in terms of required skills rather than traditional job descriptions." },
          { step: "4", title: "Transform Hiring Practices", desc: "Implement skill-based screening that evaluates candidates on demonstrated capabilities." },
          { step: "5", title: "Enable Continuous Development", desc: "Create personalized learning paths based on skill gaps and career aspirations." }
        ]
      }
    ]
  });

  await upsertContent("what_is_sbtm", "related", {
    items: [
      { label: "Human Capital Liquidity", href: "/what-is-human-capital-liquidity" },
      { label: "AI Skills Mapping", href: "/what-is-ai-skills-mapping" },
      { label: "Skill Taxonomy", href: "/glossary#skill-taxonomy" },
      { label: "Composite Candidate Index", href: "/glossary#composite-candidate-index" }
    ]
  });

  await upsertContent("what_is_sbtm", "further_reading", {
    title: "Further Reading",
    description: "Learn more about skills-based practices in our research paper \"The Skills-Based Economy\" — Part 1 of the Cognaium Research Series.",
    link: "/research#paper-1",
    buttonText: "Read the Research Paper"
  });

  await upsertContent("what_is_sbtm", "meta", {
    lastUpdated: "January 22, 2026",
    author: "Cognaium Research Team"
  });

  // AI Skills Mapping
  await upsertContent("what_is_ai_skills_mapping", "header", {
    title: "What is AI Skills Mapping?",
    subtitle: "Understanding how artificial intelligence transforms skill identification, validation, and workforce planning.",
  });

  await upsertContent("what_is_ai_skills_mapping", "quick_answer", {
    text: "AI Skills Mapping uses artificial intelligence to automatically identify, categorize, and validate workforce skills from multiple data sources including resumes, performance data, learning completions, and self-assessments. Unlike manual skills inventories, AI-powered mapping provides real-time accuracy, identifies skill adjacencies, predicts skill decay, and recommends development priorities."
  });

  await upsertContent("what_is_ai_skills_mapping", "how_to_steps", {
    items: [
      { name: "Connect Data Sources", text: "Integrate resumes, HRIS data, performance records, and learning completions into the AI skills mapping platform." },
      { name: "Run AI Analysis", text: "The AI processes documents and data to identify skills using natural language processing and skills ontologies." },
      { name: "Validate and Refine", text: "Review AI-identified skills, add manager endorsements, and verify through assessments." },
      { name: "Maintain Continuously", text: "Keep skill data current through ongoing assessment, learning tracking, and periodic validation." }
    ]
  });

  await upsertContent("what_is_ai_skills_mapping", "sections", {
    items: [
      {
        id: "why-fall-short",
        title: "Why Traditional Skills Inventories Fall Short",
        icon: "Brain",
        content: "Most organizations rely on manual processes for skill tracking: employees self-report skills in HR systems, managers occasionally update records, and skills data quickly becomes stale and inconsistent.",
        problems: [
          "Data becomes outdated within months of collection",
          "Inconsistent terminology makes comparison impossible",
          "Self-reported skills lack validation",
          "Hidden skills remain undiscovered",
          "Time-consuming to maintain at scale"
        ]
      },
      {
        id: "how-works",
        title: "How AI Skills Mapping Works",
        icon: "Zap",
        content: "AI Skills Mapping uses natural language processing (NLP), machine learning, and skills ontologies to extract, standardize, and validate skills from various data sources.",
        components: [
          { title: "Document Analysis", icon: "FileText", description: "AI parses resumes, job descriptions, project documentation, and performance reviews to identify mentioned skills. NLP extracts not just explicit skill mentions but also implied capabilities from described experiences." },
          { title: "Skills Ontology Mapping", icon: "Layers", description: "Identified skills are mapped to a standardized skills taxonomy, resolving synonyms (e.g., \"Python programming\" and \"Python development\") and establishing relationships between related skills." },
          { title: "Proficiency Inference", icon: "Target", description: "AI infers skill proficiency levels based on years of experience, complexity of described work, certifications, and assessment results, providing nuanced skill profiles rather than simple yes/no skill lists." },
          { title: "Continuous Learning", icon: "TrendingUp", description: "The AI model improves over time, learning from validation feedback, assessment results, and new data to increase accuracy and discover emerging skill patterns." }
        ]
      },
      {
        id: "benefits",
        title: "Benefits of AI Skills Mapping",
        icon: "Users",
        benefits: [
          { title: "Real-Time Accuracy", desc: "Skills data stays current as AI continuously processes new information from assessments, learning, and performance data." },
          { title: "Skill Adjacency Discovery", desc: "AI identifies related skills and logical skill progressions, enabling better development planning and career pathing." },
          { title: "Skill Decay Prediction", desc: "Based on industry trends and usage patterns, AI predicts when skills may become obsolete or need refreshing." },
          { title: "Hidden Talent Discovery", desc: "AI surfaces skills that employees may not have self-reported, revealing untapped capabilities across the workforce." },
          { title: "Scalable Accuracy", desc: "AI maintains consistency and accuracy across thousands of employees where manual processes would break down." }
        ]
      },
      {
        id: "cognaium",
        title: "AI Skills Mapping with Cognaium",
        icon: "Brain",
        content: "Cognaium's platform includes comprehensive AI skills mapping capabilities.",
        features: [
          "Resume parsing that extracts and standardizes skills from candidate documents",
          "AI-powered assessments that validate skill proficiency levels",
          "Multi-agent AI tutoring that tracks skill development over time",
          "Certification programs that formally validate acquired skills",
          "Analytics dashboards showing skill distributions and gaps across teams"
        ]
      }
    ]
  });

  await upsertContent("what_is_ai_skills_mapping", "related", {
    items: [
      { label: "Skills-Based Talent Management", href: "/what-is-skills-based-talent-management" },
      { label: "Human Capital Liquidity", href: "/what-is-human-capital-liquidity" },
      { label: "Skill Taxonomy", href: "/glossary#skill-taxonomy" },
      { label: "AI Screening", href: "/features" }
    ]
  });

  await upsertContent("what_is_ai_skills_mapping", "further_reading", {
    title: "See AI Skills Mapping in Action",
    description: "Request a demo to see how Cognaium's AI-powered skills mapping can transform your workforce visibility.",
    link: "/contact",
    buttonText: "Request a Demo"
  });

  await upsertContent("what_is_ai_skills_mapping", "meta", {
    lastUpdated: "January 22, 2026",
    author: "Cognaium Research Team"
  });
}

async function seedHomeCompleteContent() {
  console.log("\n--- Seeding Complete Home Page Content ---");

  // Features list for FeatureShowcase
  await upsertContent("home", "features", {
    items: [
      { id: "ai-screening", title: "AI-Powered Screening", description: "Intelligent candidate assessment with conversational AI interviews and structured evaluations.", icon: "Brain", color: "from-violet-500 to-purple-600", details: ["Conversational AI interviews with natural language processing", "Multiple question types: Multiple Choice, Text, Video, Code, File Upload, Rating", "AI-generated questions based on job requirements", "Automatic scoring and feedback generation", "Bulk candidate analysis with comparative insights"] },
      { id: "proctoring", title: "Advanced Proctoring", description: "Real-time monitoring with AI-powered person detection and audio analysis for assessment integrity.", icon: "Eye", color: "from-red-500 to-rose-600", details: ["AI-powered person detection and tracking", "Audio monitoring for suspicious sounds", "Browser tab switching detection", "Full-screen enforcement with violation logging", "Configurable violation thresholds and auto-termination"] },
      { id: "ats", title: "Applicant Tracking System", description: "Complete hiring pipeline from job posting to offer management with AI-powered CCI scoring.", icon: "Briefcase", color: "from-blue-500 to-cyan-600", details: ["Job postings with knockout questions", "Resume parsing with skill extraction", "CCI (Composite Candidate Index) pre-assessment scoring", "Talent pool management and bulk email", "Interview scheduling and offer management"] },
      { id: "training", title: "Training & Learning", description: "Create and deliver training programs with AI-generated content and progress tracking.", icon: "BookOpen", color: "from-emerald-500 to-teal-600", details: ["Multi-format content: Video, Documents, Quizzes", "YouTube and document content import", "Learning paths with prerequisites", "Progress tracking and completion certificates", "Customizable training templates"] },
      { id: "tutoring", title: "AI Tutoring System", description: "Personalized learning with multi-agent AI tutors for concept explanation and practice.", icon: "GraduationCap", color: "from-amber-500 to-orange-600", details: ["Multi-agent orchestration: Curriculum Planner, Concept Explainer, Practice Coach", "Quiz Generator and Project Mentor agents", "Voice tutor with speech-to-text support", "Personalized learning recommendations", "Skill gap analysis and targeted content"] },
      { id: "certifications", title: "Certification Programs", description: "AI-generated certification programs with quizzes, exams, and verifiable certificates.", icon: "Award", color: "from-pink-500 to-rose-600", details: ["AI-powered program generation from topics", "Structured quizzes and final exams", "Automated certificate generation", "Skill validation and endorsements", "Public verification links"] },
      { id: "hr-suite", title: "HR Management Suite", description: "Complete HR toolkit with policy management and employee development.", icon: "Users", color: "from-indigo-500 to-violet-600", details: ["Policy creation and acknowledgment tracking", "KRA/KPI management", "Employee performance tracking", "Executive dashboard with insights", "Team management and reporting"] },
      { id: "analytics", title: "Advanced Analytics", description: "Comprehensive insights with behavioral learning analytics and custom reports.", icon: "BarChart3", color: "from-cyan-500 to-blue-600", details: ["Real-time dashboards and KPIs", "Advanced search and analytics", "Behavioral learning patterns", "Custom report builder", "Export to Excel, PDF, and API access"] }
    ]
  });

  // Quick features
  await upsertContent("home", "quick_features", {
    items: [
      { icon: "Shield", title: "Multi-Tenant Security", desc: "Complete data isolation per organization" },
      { icon: "Settings", title: "White-Label Ready", desc: "Custom branding and subdomain routing" },
      { icon: "MessageSquare", title: "AI Director", desc: "Intelligent assistant for platform navigation" },
      { icon: "Target", title: "Skill Gap Detection", desc: "Automated skill analysis and recommendations" }
    ]
  });

  // Journeys (Industry Solutions)
  await upsertContent("home", "journeys", {
    items: [
      { icon: "Building2", title: "For Enterprises", subtitle: "Scale Your Workforce Intelligence", description: "Multi-tenant architecture with white-labeling, custom branding, and complete data isolation. Deploy Cognaium across departments with role-based access control.", features: ["Multi-tenant deployment with subdomain routing", "White-label branding and custom themes", "Executive dashboards and org-wide analytics", "SSO integration and enterprise security", "Dedicated support and SLA"], cta: "Enterprise Solutions", color: "from-violet-500 to-purple-600" },
      { icon: "Users", title: "For HR Teams", subtitle: "Streamline Talent Operations", description: "Complete HR toolkit from recruitment to development. AI-powered screening, applicant tracking, policy management, and employee development in one platform.", features: ["AI Screening with multiple question types", "Full ATS with CCI scoring", "Policy management and acknowledgments", "Training programs and certifications", "KRA/KPI tracking and reviews"], cta: "HR Solutions", color: "from-blue-500 to-cyan-600" },
      { icon: "GraduationCap", title: "For Education & Training", subtitle: "Transform Learning Experiences", description: "AI tutoring with multi-agent orchestration, personalized learning paths, and certification programs. Create engaging content with AI video generation.", features: ["AI Tutoring with voice support", "Personalized learning paths", "AI-generated training content", "Certification programs with exams", "Progress tracking and analytics"], cta: "Education Solutions", color: "from-emerald-500 to-teal-600" },
      { icon: "Heart", title: "For Healthcare", subtitle: "Ensure Clinical Excellence", description: "HIPAA-compliant skill assessment for healthcare organizations. Verify staff competencies, manage credentials, and ensure regulatory compliance.", features: ["HIPAA-compliant infrastructure", "Clinical competency assessments", "Credential tracking and alerts", "Compliance audit trails", "Proctored examinations"], cta: "Healthcare Solutions", color: "from-pink-500 to-rose-600" },
      { icon: "Factory", title: "For Manufacturing", subtitle: "Upskill Your Workforce", description: "Skills-based training and certification for manufacturing teams. Track competencies, ensure safety compliance, and reduce skill gaps.", features: ["Safety certification programs", "Equipment operation assessments", "Compliance tracking", "Skill matrix visualization", "On-the-job training modules"], cta: "Manufacturing Solutions", color: "from-amber-500 to-orange-600" },
      { icon: "Briefcase", title: "For Staffing Agencies", subtitle: "Accelerate Placements", description: "Pre-screen candidates at scale with AI assessments. Build talent pools, match skills to requirements, and reduce time-to-placement.", features: ["Bulk candidate screening", "Talent pool management", "Skill-based matching", "Client-ready reports", "White-label assessments"], cta: "Staffing Solutions", color: "from-indigo-500 to-violet-600" }
    ]
  });

  // Security features
  await upsertContent("home", "security_features", {
    items: [
      { icon: "Database", title: "Multi-Tenant Isolation", description: "Complete data segregation with tenant-specific databases, subdomain routing, and isolated storage." },
      { icon: "Lock", title: "Encryption", description: "AES-256 encryption at rest and TLS 1.3 in transit. All sensitive data is encrypted by default." },
      { icon: "Users", title: "Role-Based Access", description: "Granular RBAC with Admin, HR, Manager, and Employee roles. Custom permissions per tenant." },
      { icon: "Eye", title: "Audit Logging", description: "Comprehensive audit trails for all user actions, data access, and system changes." },
      { icon: "Key", title: "Authentication", description: "NextAuth.js with JWT tokens, SSO integration, password hashing with bcrypt, and session management." },
      { icon: "Activity", title: "Monitoring", description: "Real-time health checks, performance monitoring, and automated alerts for anomalies." }
    ]
  });

  // Certifications
  await upsertContent("home", "certifications", {
    items: [
      { title: "HIPAA Ready", description: "Designed for healthcare with PHI protection and BAA availability.", icon: "Shield" },
      { title: "SOC 2 Aligned", description: "Infrastructure built to audit-ready standards for security and availability.", icon: "CheckCircle2" },
      { title: "GDPR Compliant", description: "Data protection and privacy controls for EU requirements.", icon: "Globe" }
    ]
  });

  // Trust stats
  await upsertContent("home", "trust_stats", {
    items: [
      { value: "AES-256", label: "Encryption" },
      { value: "TLS 1.3", label: "In Transit" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "24/7", label: "Monitoring" }
    ]
  });

  // Leaders
  await upsertContent("home", "leaders", {
    items: [
      {
        name: "Mayank Trivedi",
        role: "Executive Chairman",
        type: "Executive Leadership",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Mayank-Trivedi-resized-1767669788661.jpeg?width=8000&height=8000&resize=contain",
        qualifications: "B.E. Mechanical Engineering",
        experience: "20+ Years Experience",
        bio: [
          "Mayank Trivedi is a seasoned technocrat and visionary leader with over two decades of experience in the healthcare information technology sector. As the Executive Chairman of Cognaium, he brings a proven track record of scaling multinational organizations and delivering mission-critical healthcare solutions globally.",
          "A Mechanical Engineering graduate from Maharaja Sayajirao University of Baroda, Mayank founded Sysware Healthcare Systems, which grew into a global leader in Laboratory Information Systems and was acquired by Eclipsys Corporation (now part of Allscripts). He subsequently served as President of Eclipsys India, where he led the expansion of operations to over 700 professionals.",
          "Currently serving as the CEO of myOnsite Healthcare, Mayank leads the strategic integration of Cognaium within the broader MedinovAI ecosystem, focusing on pioneering AI-driven workforce intelligence for clinical environments. His unique blend of engineering excellence and deep healthcare domain expertise ensures Cognaium remains at the forefront of technological innovation."
        ],
        highlights: [
          { icon: "Target", label: "Strategic Vision" },
          { icon: "Award", label: "Healthcare IT Pioneer" }
        ]
      },
      {
        name: "Harita Oza",
        role: "Chief Executive Officer",
        type: "Executive Leadership",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Harita-1767623824543.jpg?width=8000&height=8000&resize=contain",
        qualifications: "M.Com, MBA",
        experience: "8+ Years Experience",
        bio: [
          "Harita Oza, our Chief Executive Officer, is a distinguished leader whose academic prowess—holding both an M.Com and an MBA—is matched by her formidable track record in the corporate world. With over 8 years of high-impact experience managing multi-national operations across diverse markets, she has become a master architect of organizational scaling and operational efficiency.",
          "Her professional journey is marked by a unique fusion of financial acumen and strategic foresight. Harita has successfully navigated complex global landscapes, spearheading financial transformations and strategic expansion initiatives that have consistently delivered sustainable growth.",
          "A specialist in driving strategic expansion and fostering cross-functional excellence, Harita is dedicated to building robust frameworks that bridge the gap between technological innovation and financial stability. Under her visionary leadership, Cognaium is pioneering the next generation of AI-driven workforce intelligence."
        ],
        highlights: [
          { icon: "Globe", label: "Global Operations" },
          { icon: "TrendingUp", label: "Strategic Expansion" }
        ]
      },
      {
        name: "Bharat Mehta",
        role: "Board Member (Director)",
        type: "Board of Directors",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Bharat-Mehta-1767667978259.jpeg?width=8000&height=8000&resize=contain",
        qualifications: "HR, Law & Commerce",
        experience: "40+ Years Experience",
        bio: [
          "Mr. Bharat Mehta is a seasoned HR leader with over four decades of experience across leading Indian and multinational organizations. With academic qualifications in HR & Social Sciences, Law, and Commerce from MS University, he brings a rare blend of strategic people leadership, general management, and social commitment to Cognaium.",
          "His illustrious career includes senior leadership roles such as Director–HR at Allscripts India, Head–HR at Medtronic (Southeast Asia), GM–Corporate HR at Mafatlal Industries, and COO at Talent Anywhere. He is widely respected for CXO-level talent acquisition, organizational structuring, and HR transformation.",
          "Beyond corporate leadership, Mr. Mehta is deeply committed to societal well-being, serving as Chairperson of Friends Society and leading impactful CSR initiatives like rebuilding schools and supporting community health. His people-centric leadership and extensive professional network continue to inspire our commitment to organizational excellence and social responsibility."
        ],
        highlights: [
          { icon: "Shield", label: "Governance & Ethics" },
          { icon: "Award", label: "HR Transformation" }
        ]
      }
    ]
  });
}

async function seedNavbarContent() {
  console.log("\n--- Seeding Navbar Content ---");

  await upsertContent("global", "navbar_main", {
    items: [
      { href: "/", label: "Home" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/skill-library", label: "Training" },
      { href: "/contact", label: "Contact" }
    ]
  });

  await upsertContent("global", "navbar_more", {
    items: [
      { href: "/research", label: "Research" },
      { href: "/glossary", label: "Glossary" },
      { href: "/faq", label: "FAQ" },
      { href: "/security", label: "Security" },
      { href: "/support", label: "Support" },
      { href: "/careers", label: "Careers" }
    ]
  });
}

async function seedFAQCategoriesContent() {
  console.log("\n--- Seeding FAQ Categories Content ---");

  await upsertContent("faq", "categories", {
    items: [
      {
        id: "general",
        name: "General",
        icon: "HelpCircle",
        faqs: [
          { question: "What is Cognaium?", answer: "Cognaium is an enterprise-grade AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development. Built by MedinovAI, Cognaium combines advanced AI capabilities from OpenAI GPT-4, Anthropic Claude, and Google Gemini to transform how organizations evaluate, develop, and track workforce capabilities. The platform includes AI screening, real-time proctoring, applicant tracking, training programs, AI tutoring, certifications, and comprehensive HR management tools." },
          { question: "Who is Cognaium designed for?", answer: "Cognaium is designed for organizations of all sizes that want to modernize their talent management practices. Primary users include HR professionals, talent acquisition teams, learning & development managers, team managers, and employees. Industries we serve include healthcare, manufacturing, technology, education, staffing agencies, and professional services. Our multi-tenant architecture supports both single organizations and staffing agencies managing multiple client companies." },
          { question: "What makes Cognaium different from other HR platforms?", answer: "Cognaium differentiates itself through three key capabilities: (1) Multi-AI Integration - we support multiple AI providers (GPT-4, Claude, Gemini) allowing organizations to choose the best model for each use case; (2) Complete Lifecycle Coverage - from AI-powered screening through certification and ongoing development, we cover the entire talent journey in one platform; (3) Enterprise Architecture - our multi-tenant design with complete data isolation, white-labeling, and advanced security meets the most demanding enterprise requirements." },
          { question: "How does Cognaium use artificial intelligence?", answer: "Cognaium uses AI across the entire platform: AI-powered conversational interviews that adapt based on candidate responses, AI question generation from job descriptions, automated resume parsing and skill extraction, AI-driven candidate scoring (CCI - Composite Candidate Index), multi-agent AI tutoring with specialized agents for different learning needs, AI-generated certification programs, and the AI Director platform assistant for contextual help and automation." }
        ]
      },
      {
        id: "ai-screening",
        name: "AI Screening",
        icon: "Brain",
        faqs: [
          { question: "What types of assessments can I create with Cognaium?", answer: "Cognaium supports three assessment types: (1) AI Interview - conversational assessments where AI adapts questions based on responses, (2) Structured Assessment - traditional fixed-question assessments with various question types, and (3) Leveled Assessment - progressive assessments that increase in difficulty based on performance. Supported formats include: Multiple Choice, Text Response, Video Recording, Code Editor, File Upload, and Rating Scale." },
          { question: "How does AI question generation work?", answer: "Cognaium can automatically generate role-specific assessment questions from job descriptions. Simply paste a job description or provide key requirements, and our AI (powered by GPT-4, Claude, or Gemini) will generate relevant questions with appropriate difficulty levels. You can customize the number of questions, focus areas, and difficulty distribution. Generated questions can be edited before use and saved to your template library for future assessments." },
          { question: "What is the Composite Candidate Index (CCI)?", answer: "The Composite Candidate Index (CCI) is Cognaium's proprietary pre-assessment scoring algorithm that evaluates candidates before formal interviews. CCI analyzes three dimensions: Resume-Job Match (how well skills and experience align with requirements), Role Readiness (indicators of immediate contribution potential), and Risk Factors (potential concerns or gaps). CCI scores help recruiters prioritize candidates efficiently, reducing time-to-hire while improving quality of hire." },
          { question: "Can I customize the AI interview experience?", answer: "Yes, Cognaium offers extensive customization for AI interviews. You can set the AI personality and tone, define specific competencies to assess, configure follow-up question depth, set time limits per question and overall assessment, add company-specific context and scenarios, choose which AI provider to use (GPT-4, Claude, or Gemini), and customize the candidate-facing interface with your branding." }
        ]
      },
      {
        id: "proctoring",
        name: "Proctoring & Security",
        icon: "Shield",
        faqs: [
          { question: "How does real-time proctoring work in Cognaium?", answer: "Cognaium's proctoring system uses multiple AI technologies working together: AI-powered computer vision for person detection (identifies multiple people, tracks face position, detects suspicious movements), audio monitoring (detects speech, background voices, and suspicious sounds), and browser security (tab switching detection, copy-paste blocking, full-screen enforcement). All violations are logged with timestamps, screenshots, and severity levels for later review." },
          { question: "What happens when a proctoring violation is detected?", answer: "When a violation is detected, Cognaium logs the incident with a timestamp, screenshot, and severity level. Based on your configuration, the system can: display a warning to the candidate, increment a violation counter, pause the assessment pending review, or automatically terminate the assessment if thresholds are exceeded. All sessions are recorded for later playback, with violations marked on a searchable timeline for efficient review." },
          { question: "Can proctoring thresholds be customized?", answer: "Yes, Cognaium provides granular control over proctoring thresholds per assessment. You can configure: maximum violations before warning/termination, sensitivity levels for person detection and audio monitoring, which security features to enable (tab switching, copy-paste, full-screen), whether to allow camera-off periods, grace periods for technical issues, and auto-termination rules. This flexibility allows you to balance security with candidate experience based on assessment stakes." },
          { question: "Is Cognaium proctoring available for on-premise deployment?", answer: "Yes, for organizations with strict data residency or security requirements, Cognaium offers on-premise proctoring deployment. This keeps all video, audio, and biometric data within your infrastructure while still leveraging our AI detection capabilities. Contact our sales team for on-premise deployment options and requirements." }
        ]
      },
      {
        id: "training",
        name: "Training & Development",
        icon: "BookOpen",
        faqs: [
          { question: "What types of training content does Cognaium support?", answer: "Cognaium supports multi-format training content including: video content (uploaded or YouTube imports), documents (PDFs, Word files, presentations), interactive quizzes with various question types, SCORM packages from other LMS systems, and external URL links to third-party resources. All content types can be combined in structured learning paths with prerequisites and completion tracking." },
          { question: "How do learning paths work?", answer: "Cognaium learning paths let you create structured training journeys with prerequisites and completion requirements. You can combine multiple content types (videos, documents, quizzes) into a guided sequence, track learner progress in real-time, and award completion certificates. Learning paths can be assigned to individuals, teams, or entire departments." },
          { question: "What is Multi-Agent AI Tutoring?", answer: "Multi-Agent AI Tutoring is Cognaium's approach to personalized learning where multiple specialized AI agents collaborate: Curriculum Planner (designs personalized learning paths), Concept Explainer (breaks down complex topics in understandable terms), Practice Coach (guides hands-on exercises and provides feedback), and Quiz Generator (creates adaptive assessments). The agents coordinate to adapt to individual learning styles, pace, and knowledge gaps, providing a truly personalized learning experience with optional voice interaction." },
          { question: "How does skill gap analysis work?", answer: "Cognaium automatically identifies skill gaps by comparing employee skills (from assessments, certifications, and manager endorsements) against role requirements and organizational capability needs. The system then recommends targeted training, suggests internal mobility opportunities, and tracks progress over time. Managers receive dashboards showing team skill distributions and development priorities, while employees see personalized development recommendations." }
        ]
      },
      {
        id: "certifications",
        name: "Certifications",
        icon: "Award",
        faqs: [
          { question: "How do I create a certification program in Cognaium?", answer: "Cognaium offers two approaches to certification creation: (1) AI-Generated Programs - provide a topic or skill area and Cognaium's AI generates a complete certification program with modules, learning content, and assessments; (2) Manual Creation - build programs from scratch using your own content, structuring modules, adding assessments, and defining passing criteria. Both approaches support proctored exams, retry policies, certificate customization, and expiration/recertification settings." },
          { question: "Can certifications be verified by third parties?", answer: "Yes, every Cognaium certificate includes a unique verification ID and QR code linking to a public verification page. Third parties (employers, clients, regulators) can verify certificate authenticity, issue date, expiration status, and holder details without needing a Cognaium account. Verification pages are branded with your organization's identity and can include additional details about the certification program and requirements met." },
          { question: "How does certificate expiration and recertification work?", answer: "Cognaium supports configurable certificate lifecycles. You can set certificates to: never expire, expire after a fixed period (e.g., 1 year), or require periodic recertification assessments. The system automatically sends renewal reminders to certificate holders and their managers before expiration. Recertification can require the full exam or a shorter refresher assessment based on your configuration. Expired certificates are clearly marked as such on verification pages." }
        ]
      },
      {
        id: "platform",
        name: "Platform & Security",
        icon: "Settings",
        faqs: [
          { question: "What is multi-tenant architecture and why does it matter?", answer: "Cognaium's multi-tenant architecture means each organization (tenant) has completely isolated data, configurations, and user bases while sharing the underlying platform infrastructure. This provides enterprise-grade security (no data leakage between tenants), customization (each tenant can have its own branding, workflows, and settings), and efficiency (updates and improvements benefit all tenants simultaneously). For staffing agencies, multi-tenancy enables managing multiple client companies from a single platform." },
          { question: "What security certifications does Cognaium have?", answer: "Cognaium is built with enterprise security at its core: AES-256 encryption for data at rest and in transit, role-based access control (RBAC) with granular permissions, comprehensive audit logging of all actions, SSO/SAML integration for enterprise identity management, and regular third-party security assessments. We maintain SOC 2 Type II compliance and support GDPR, CCPA, and industry-specific requirements. Contact us for our detailed security documentation and compliance reports." },
          { question: "Can I use my own branding with Cognaium?", answer: "Yes, Cognaium offers comprehensive white-labeling capabilities. You can customize: logos and brand colors throughout the platform, email templates and notification branding, certificate designs with your visual identity, candidate-facing assessment interfaces, custom domain mapping (assessments.yourcompany.com), and login page branding. Enterprise plans include full white-labeling with no Cognaium branding visible to end users." },
          { question: "Does Cognaium integrate with other HR systems?", answer: "Yes, Cognaium provides RESTful APIs for integration with existing HR systems. Common integrations include: HRIS systems (Workday, SAP SuccessFactors, BambooHR), ATS platforms for bi-directional candidate sync, SSO providers (Okta, Azure AD, OneLogin), calendar systems for interview scheduling, and custom integrations via webhooks. Our API documentation is available to customers, and our professional services team can assist with complex integration requirements." }
        ]
      },
      {
        id: "pricing",
        name: "Pricing & Plans",
        icon: "CreditCard",
        faqs: [
          { question: "How is Cognaium priced?", answer: "Cognaium offers tiered pricing based on organization size and feature requirements. Plans typically include: Starter (for small teams starting with AI assessments), Professional (full platform with advanced features), and Enterprise (custom solutions with dedicated support and SLAs). Pricing is based on active users per month with volume discounts available. Contact our sales team for detailed pricing based on your specific requirements." },
          { question: "Is there a free trial available?", answer: "Yes, Cognaium offers a 14-day free trial with full access to core platform features. The trial includes AI screening, basic proctoring, training creation, and limited AI usage credits. No credit card is required to start. Enterprise evaluations with extended trials and proof-of-concept support are available upon request." },
          { question: "What support is included with Cognaium?", answer: "All Cognaium plans include: comprehensive documentation and knowledge base, in-platform AI Director assistance, email support with response time SLAs, and access to our training library. Professional plans add live chat support, while Enterprise plans include dedicated customer success managers, priority support queues, custom onboarding programs, and quarterly business reviews." }
        ]
      }
    ]
  });
}

async function seedAboutCompleteContent() {
  console.log("\n--- Seeding About Page Complete Content ---");

  // Vision Section
  await upsertContent("about", "vision", {
    badge: "Our Vision",
    title: "Empowering Organizations Through",
    titleHighlight: "Intelligent Assessment",
    description: "We believe that every organization deserves access to enterprise-grade AI tools for talent management. Cognaium democratizes intelligent workforce development, making sophisticated assessment, training, and analytics accessible to organizations of all sizes.",
    secondaryDescription: "Our platform combines the power of multiple AI providers—OpenAI GPT-4, Anthropic Claude, and Google Gemini—with robust enterprise features like multi-tenant architecture, real-time proctoring, and comprehensive analytics.",
    items: [
      {
        icon: "Target",
        title: "Our Mission",
        description: "To transform how organizations hire, train, and develop their workforce through AI-powered intelligence that makes better decisions possible."
      },
      {
        icon: "Lightbulb",
        title: "Our Approach",
        description: "We build comprehensive solutions that address the entire talent lifecycle—from screening to certification—in one unified platform."
      },
      {
        icon: "Globe",
        title: "Our Reach",
        description: "Serving organizations across industries—from healthcare and manufacturing to education and staffing agencies worldwide."
      }
    ]
  });

  // Platform Capabilities Section
  await upsertContent("about", "capabilities", {
    badge: "Platform Capabilities",
    title: "Complete Workforce Solution",
    subtitle: "A unified platform that covers the entire talent lifecycle.",
    items: [
      { icon: "Brain", title: "AI Screening", desc: "Conversational interviews with multiple question types" },
      { icon: "Shield", title: "Proctoring", desc: "AI-powered detection and audio monitoring" },
      { icon: "Users", title: "ATS", desc: "Complete hiring pipeline with CCI scoring" },
      { icon: "Award", title: "Certifications", desc: "AI-generated programs and certificates" },
      { icon: "Rocket", title: "AI Tutoring", desc: "Multi-agent personalized learning" },
      { icon: "Heart", title: "HR Suite", desc: "Policies, team management, and KRA/KPI" }
    ]
  });

  // Journey Section Header
  await upsertContent("about", "journey_header", {
    badge: "Our Journey",
    title: "Building the Future"
  });
}

async function seedCareersContent() {
  console.log("\n--- Seeding Careers Page Content ---");

  // Header
  await upsertContent("careers", "header", {
    title: "Build the Future of Workforce Intelligence",
    subtitle: "Join our team of engineers, designers, and AI specialists who are transforming how organizations assess and develop talent."
  });

  // Why Cognaium / Culture Section
  await upsertContent("careers", "culture", {
    title: "Why Cognaium?",
    description: "Work at the intersection of AI innovation and workforce transformation. We're building the platform that helps organizations hire better, train smarter, and develop their teams with intelligence.",
    items: [
      {
        icon: "Brain",
        title: "Cutting-Edge AI",
        description: "Work with GPT-4, Claude, and Gemini. Build multi-agent systems and intelligent automation.",
        color: "primary"
      },
      {
        icon: "Rocket",
        title: "High-Agency Culture",
        description: "We value ownership, rapid iteration, and intellectual honesty. Your ideas shape the product.",
        color: "accent"
      },
      {
        icon: "BarChart3",
        title: "Real Impact",
        description: "Code you write today helps organizations hire better and develop their people smarter.",
        color: "primary"
      },
      {
        icon: "Users",
        title: "Amazing Team",
        description: "Work alongside talented engineers, designers, and domain experts from top companies.",
        color: "accent"
      }
    ]
  });

  // Benefits Section
  await upsertContent("careers", "benefits", {
    title: "Benefits & Perks",
    subtitle: "We take care of our team so they can focus on building amazing products.",
    items: [
      { icon: "Heart", title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage for you and your family." },
      { icon: "Rocket", title: "Growth & Learning", description: "Annual learning budget, conference attendance, and career development programs." },
      { icon: "Users", title: "Flexible Work", description: "Remote-first culture with flexible hours and unlimited PTO." },
      { icon: "Shield", title: "Equity", description: "Meaningful equity stake in a fast-growing company." }
    ]
  });

  // Tech Stack Section
  await upsertContent("careers", "tech_stack", {
    title: "Our Tech Stack",
    subtitle: "Modern tools and technologies that let you do your best work.",
    items: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "Redis",
      "OpenAI",
      "Claude",
      "Gemini",
      "Docker"
    ]
  });

  // CTA Section
  await upsertContent("careers", "cta", {
    title: "Ready to Join Us?",
    subtitle: "We're always looking for talented people who share our vision.",
    primaryCta: "View Open Positions",
    primaryCtaLink: "#positions",
    secondaryCta: "Learn About Us",
    secondaryCtaLink: "/about"
  });

  // Open Roles Section
  await upsertContent("careers", "roles", {
    title: "Open Roles",
    emptyTitle: "No open positions at the moment.",
    emptySubtitle: "Check back soon or send us your resume!",
    viewAllText: "View All Openings",
    emailText: "Don't see a role that fits?",
    emailLinkText: "Email us",
    email: "careers@cognaium.com"
  });
}

async function seedBlogContent() {
  console.log("\n--- Seeding Blog Page Content ---");

  // Header
  await upsertContent("blog", "header", {
    title: "Insights & Resources",
    subtitle: "Expert perspectives on AI, talent management, and the future of work."
  });

  // Empty State
  await upsertContent("blog", "empty_state", {
    title: "No Posts Yet",
    subtitle: "We're working on creating valuable content. Check back soon for insights on AI and talent management.",
    buttonText: "Back to Home",
    buttonLink: "/"
  });
}

async function main() {
  console.log("Starting content seeding...\n");

  try {
    await seedHomeContent();
    await seedHomeCompleteContent();
    await seedPricingContent();
    await seedLeadershipContent();
    await seedContactContent();
    await seedAboutContent();
    await seedAboutCompleteContent();
    await seedGlobalContent();
    await seedNavbarContent();
    await seedFAQContent();
    await seedFAQCategoriesContent();
    await seedFeaturesContent();
    await seedSupportContent();
    await seedResearchContent();
    await seedGlossaryContent();
    await seedComplianceContent();
    await seedSecurityContent();
    await seedPrivacyContent();
    await seedTermsContent();
    await seedSkillLibraryContent();
    await seedCompareContent();
    await seedEducationalContent();
    await seedCareersContent();
    await seedBlogContent();

    console.log("\n✅ Content seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding content:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
