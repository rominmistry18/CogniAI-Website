"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { FAQSchema } from "@/components/SchemaOrg";
import { ChevronDown, Search, Brain, Shield, Users, Award, BookOpen, Settings, CreditCard, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: HelpCircle,
    faqs: [
      {
        question: "What is CogniAI?",
        answer: "CogniAI is an enterprise-grade AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development. Built by MedinovAI, CogniAI combines advanced AI capabilities from OpenAI GPT-4, Anthropic Claude, and Google Gemini to transform how organizations evaluate, develop, and track workforce capabilities. The platform includes AI screening, real-time proctoring, applicant tracking, training programs, AI tutoring, certifications, and comprehensive HR management tools."
      },
      {
        question: "Who is CogniAI designed for?",
        answer: "CogniAI is designed for organizations of all sizes that want to modernize their talent management practices. Primary users include HR professionals, talent acquisition teams, learning & development managers, team managers, and employees. Industries we serve include healthcare, manufacturing, technology, education, staffing agencies, and professional services. Our multi-tenant architecture supports both single organizations and staffing agencies managing multiple client companies."
      },
      {
        question: "What makes CogniAI different from other HR platforms?",
        answer: "CogniAI differentiates itself through three key capabilities: (1) Multi-AI Integration - we support multiple AI providers (GPT-4, Claude, Gemini) allowing organizations to choose the best model for each use case; (2) Complete Lifecycle Coverage - from AI-powered screening through certification and ongoing development, we cover the entire talent journey in one platform; (3) Enterprise Architecture - our multi-tenant design with complete data isolation, white-labeling, and advanced security meets the most demanding enterprise requirements."
      },
      {
        question: "How does CogniAI use artificial intelligence?",
        answer: "CogniAI uses AI across the entire platform: AI-powered conversational interviews that adapt based on candidate responses, AI question generation from job descriptions, automated resume parsing and skill extraction, AI-driven candidate scoring (CCI - Composite Candidate Index), multi-agent AI tutoring with specialized agents for different learning needs, AI-generated certification programs, and the AI Director platform assistant for contextual help and automation."
      }
    ]
  },
  {
    id: "ai-screening",
    name: "AI Screening",
    icon: Brain,
    faqs: [
      {
        question: "What types of assessments can I create with CogniAI?",
        answer: "CogniAI supports three assessment types: (1) AI Interview - conversational assessments where AI adapts questions based on responses, (2) Structured Assessment - traditional fixed-question assessments with various question types, and (3) Leveled Assessment - progressive assessments that increase in difficulty based on performance. Supported formats include: Multiple Choice, Text Response, Video Recording, Code Editor, File Upload, and Rating Scale."
      },
      {
        question: "How does AI question generation work?",
        answer: "CogniAI can automatically generate role-specific assessment questions from job descriptions. Simply paste a job description or provide key requirements, and our AI (powered by GPT-4, Claude, or Gemini) will generate relevant questions with appropriate difficulty levels. You can customize the number of questions, focus areas, and difficulty distribution. Generated questions can be edited before use and saved to your template library for future assessments."
      },
      {
        question: "What is the Composite Candidate Index (CCI)?",
        answer: "The Composite Candidate Index (CCI) is CogniAI's proprietary pre-assessment scoring algorithm that evaluates candidates before formal interviews. CCI analyzes three dimensions: Resume-Job Match (how well skills and experience align with requirements), Role Readiness (indicators of immediate contribution potential), and Risk Factors (potential concerns or gaps). CCI scores help recruiters prioritize candidates efficiently, reducing time-to-hire while improving quality of hire."
      },
      {
        question: "Can I customize the AI interview experience?",
        answer: "Yes, CogniAI offers extensive customization for AI interviews. You can set the AI personality and tone, define specific competencies to assess, configure follow-up question depth, set time limits per question and overall assessment, add company-specific context and scenarios, choose which AI provider to use (GPT-4, Claude, or Gemini), and customize the candidate-facing interface with your branding."
      }
    ]
  },
  {
    id: "proctoring",
    name: "Proctoring & Security",
    icon: Shield,
    faqs: [
      {
        question: "How does real-time proctoring work in CogniAI?",
        answer: "CogniAI's proctoring system uses multiple AI technologies working together: AI-powered computer vision for person detection (identifies multiple people, tracks face position, detects suspicious movements), audio monitoring (detects speech, background voices, and suspicious sounds), and browser security (tab switching detection, copy-paste blocking, full-screen enforcement). All violations are logged with timestamps, screenshots, and severity levels for later review."
      },
      {
        question: "What happens when a proctoring violation is detected?",
        answer: "When a violation is detected, CogniAI logs the incident with a timestamp, screenshot, and severity level. Based on your configuration, the system can: display a warning to the candidate, increment a violation counter, pause the assessment pending review, or automatically terminate the assessment if thresholds are exceeded. All sessions are recorded for later playback, with violations marked on a searchable timeline for efficient review."
      },
      {
        question: "Can proctoring thresholds be customized?",
        answer: "Yes, CogniAI provides granular control over proctoring thresholds per assessment. You can configure: maximum violations before warning/termination, sensitivity levels for person detection and audio monitoring, which security features to enable (tab switching, copy-paste, full-screen), whether to allow camera-off periods, grace periods for technical issues, and auto-termination rules. This flexibility allows you to balance security with candidate experience based on assessment stakes."
      },
      {
        question: "Is CogniAI proctoring available for on-premise deployment?",
        answer: "Yes, for organizations with strict data residency or security requirements, CogniAI offers on-premise proctoring deployment. This keeps all video, audio, and biometric data within your infrastructure while still leveraging our AI detection capabilities. Contact our sales team for on-premise deployment options and requirements."
      }
    ]
  },
  {
    id: "training",
    name: "Training & Development",
    icon: BookOpen,
    faqs: [
      {
        question: "What types of training content does CogniAI support?",
        answer: "CogniAI supports multi-format training content including: video content (uploaded or YouTube imports), documents (PDFs, Word files, presentations), interactive quizzes with various question types, SCORM packages from other LMS systems, and external URL links to third-party resources. All content types can be combined in structured learning paths with prerequisites and completion tracking."
      },
      {
        question: "How do learning paths work?",
        answer: "CogniAI learning paths let you create structured training journeys with prerequisites and completion requirements. You can combine multiple content types (videos, documents, quizzes) into a guided sequence, track learner progress in real-time, and award completion certificates. Learning paths can be assigned to individuals, teams, or entire departments."
      },
      {
        question: "What is Multi-Agent AI Tutoring?",
        answer: "Multi-Agent AI Tutoring is CogniAI's approach to personalized learning where multiple specialized AI agents collaborate: Curriculum Planner (designs personalized learning paths), Concept Explainer (breaks down complex topics in understandable terms), Practice Coach (guides hands-on exercises and provides feedback), and Quiz Generator (creates adaptive assessments). The agents coordinate to adapt to individual learning styles, pace, and knowledge gaps, providing a truly personalized learning experience with optional voice interaction."
      },
      {
        question: "How does skill gap analysis work?",
        answer: "CogniAI automatically identifies skill gaps by comparing employee skills (from assessments, certifications, and manager endorsements) against role requirements and organizational capability needs. The system then recommends targeted training, suggests internal mobility opportunities, and tracks progress over time. Managers receive dashboards showing team skill distributions and development priorities, while employees see personalized development recommendations."
      }
    ]
  },
  {
    id: "certifications",
    name: "Certifications",
    icon: Award,
    faqs: [
      {
        question: "How do I create a certification program in CogniAI?",
        answer: "CogniAI offers two approaches to certification creation: (1) AI-Generated Programs - provide a topic or skill area and CogniAI's AI generates a complete certification program with modules, learning content, and assessments; (2) Manual Creation - build programs from scratch using your own content, structuring modules, adding assessments, and defining passing criteria. Both approaches support proctored exams, retry policies, certificate customization, and expiration/recertification settings."
      },
      {
        question: "Can certifications be verified by third parties?",
        answer: "Yes, every CogniAI certificate includes a unique verification ID and QR code linking to a public verification page. Third parties (employers, clients, regulators) can verify certificate authenticity, issue date, expiration status, and holder details without needing a CogniAI account. Verification pages are branded with your organization's identity and can include additional details about the certification program and requirements met."
      },
      {
        question: "How does certificate expiration and recertification work?",
        answer: "CogniAI supports configurable certificate lifecycles. You can set certificates to: never expire, expire after a fixed period (e.g., 1 year), or require periodic recertification assessments. The system automatically sends renewal reminders to certificate holders and their managers before expiration. Recertification can require the full exam or a shorter refresher assessment based on your configuration. Expired certificates are clearly marked as such on verification pages."
      }
    ]
  },
  {
    id: "platform",
    name: "Platform & Security",
    icon: Settings,
    faqs: [
      {
        question: "What is multi-tenant architecture and why does it matter?",
        answer: "CogniAI's multi-tenant architecture means each organization (tenant) has completely isolated data, configurations, and user bases while sharing the underlying platform infrastructure. This provides enterprise-grade security (no data leakage between tenants), customization (each tenant can have its own branding, workflows, and settings), and efficiency (updates and improvements benefit all tenants simultaneously). For staffing agencies, multi-tenancy enables managing multiple client companies from a single platform."
      },
      {
        question: "What security certifications does CogniAI have?",
        answer: "CogniAI is built with enterprise security at its core: AES-256 encryption for data at rest and in transit, role-based access control (RBAC) with granular permissions, comprehensive audit logging of all actions, SSO/SAML integration for enterprise identity management, and regular third-party security assessments. We maintain SOC 2 Type II compliance and support GDPR, CCPA, and industry-specific requirements. Contact us for our detailed security documentation and compliance reports."
      },
      {
        question: "Can I use my own branding with CogniAI?",
        answer: "Yes, CogniAI offers comprehensive white-labeling capabilities. You can customize: logos and brand colors throughout the platform, email templates and notification branding, certificate designs with your visual identity, candidate-facing assessment interfaces, custom domain mapping (assessments.yourcompany.com), and login page branding. Enterprise plans include full white-labeling with no CogniAI branding visible to end users."
      },
      {
        question: "Does CogniAI integrate with other HR systems?",
        answer: "Yes, CogniAI provides RESTful APIs for integration with existing HR systems. Common integrations include: HRIS systems (Workday, SAP SuccessFactors, BambooHR), ATS platforms for bi-directional candidate sync, SSO providers (Okta, Azure AD, OneLogin), calendar systems for interview scheduling, and custom integrations via webhooks. Our API documentation is available to customers, and our professional services team can assist with complex integration requirements."
      }
    ]
  },
  {
    id: "pricing",
    name: "Pricing & Plans",
    icon: CreditCard,
    faqs: [
      {
        question: "How is CogniAI priced?",
        answer: "CogniAI offers tiered pricing based on organization size and feature requirements. Plans typically include: Starter (for small teams starting with AI assessments), Professional (full platform with advanced features), and Enterprise (custom solutions with dedicated support and SLAs). Pricing is based on active users per month with volume discounts available. Contact our sales team for detailed pricing based on your specific requirements."
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, CogniAI offers a 14-day free trial with full access to core platform features. The trial includes AI screening, basic proctoring, training creation, and limited AI usage credits. No credit card is required to start. Enterprise evaluations with extended trials and proof-of-concept support are available upon request."
      },
      {
        question: "What support is included with CogniAI?",
        answer: "All CogniAI plans include: comprehensive documentation and knowledge base, in-platform AI Director assistance, email support with response time SLAs, and access to our training library. Professional plans add live chat support, while Enterprise plans include dedicated customer success managers, priority support queues, custom onboarding programs, and quarterly business reviews."
      }
    ]
  }
];

// Flatten FAQs for schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs);

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      (activeCategory === "all" || activeCategory === category.id) &&
      (searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.faqs.length > 0);

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about CogniAI's AI-powered skill assessment, training, and workforce development platform."
      />

      {/* FAQ Schema for AI systems */}
      <FAQSchema faqs={allFaqs} />

      {/* Search and Filter */}
      <section className="py-8 bg-card/30 sticky top-16 z-40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              All Topics
            </button>
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Last Updated: January 22, 2026</p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No questions match your search. Try different keywords.</p>
            </div>
          ) : (
            filteredCategories.map(category => (
              <div key={category.id} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{category.name}</h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, index) => {
                    const itemId = `${category.id}-${index}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <article 
                        key={index}
                        className="glass rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <h3 className="font-medium pr-4">{faq.question}</h3>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6">
                            {/* Answer Box - Optimized for AI extraction */}
                            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help. Contact us for personalized assistance or schedule a demo to see CogniAI in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <span className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-block">
                Contact Support
              </span>
            </Link>
            <Link href="/support">
              <span className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition-colors inline-block">
                Visit Help Center
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
