"use client";

import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { DefinedTermSchema } from "@/components/SchemaOrg";
import { BookOpen, Brain, Target, Users, Zap, Award, BarChart3, Shield, Layers, MessageSquare } from "lucide-react";
import Link from "next/link";

const glossaryTerms = [
  {
    id: "human-capital-liquidity",
    term: "Human Capital Liquidity",
    category: "Framework",
    icon: Users,
    shortDefinition: "A quantitative framework measuring how fluidly skills and talent can flow within and across organizations.",
    fullDefinition: "Human Capital Liquidity is a quantitative framework developed by Cognaium that measures how fluidly skills and talent can flow within and across organizations. It assesses skill transferability, role adaptability, and workforce agility to enable dynamic talent allocation. Organizations with high human capital liquidity can rapidly redeploy talent to meet changing business needs, reduce hiring costs, and maintain competitive advantage in fast-moving markets.",
    relatedTerms: ["Skills-Based Talent Management", "Skill Taxonomy", "Workforce Agility"],
    learnMore: "/what-is-human-capital-liquidity"
  },
  {
    id: "sentient-organization-architecture",
    term: "Sentient Organization Architecture",
    category: "Framework",
    icon: Brain,
    shortDefinition: "An AI-augmented organizational design where enterprise systems continuously learn, adapt, and evolve.",
    fullDefinition: "Sentient Organization Architecture (SOA) is an AI-augmented organizational design paradigm where enterprise systems continuously learn, adapt, and evolve based on workforce data, performance patterns, and strategic objectives. Unlike traditional static org structures, a sentient organization uses AI to dynamically optimize team compositions, identify emerging skill gaps, predict talent needs, and recommend organizational changes in real-time.",
    relatedTerms: ["AI Director", "Algorithmic CHRO", "Symbiotic Enterprise"],
    learnMore: "/research"
  },
  {
    id: "composite-candidate-index",
    term: "Composite Candidate Index (CCI)",
    category: "Scoring",
    icon: Target,
    shortDefinition: "Cognaium's proprietary pre-assessment scoring algorithm for evaluating candidates before interviews.",
    fullDefinition: "The Composite Candidate Index (CCI) is Cognaium's proprietary pre-assessment scoring algorithm that evaluates candidates based on three key dimensions: resume-job match percentage (how well skills and experience align with requirements), role readiness indicators (indicators of immediate contribution potential), and risk factor analysis (potential concerns or gaps). CCI helps recruiters prioritize candidates before investing time in formal interviews.",
    relatedTerms: ["AI Screening", "Resume Parsing", "Talent Pool"],
    learnMore: "/features"
  },
  {
    id: "multi-agent-orchestration",
    term: "Multi-Agent AI Orchestration",
    category: "Technology",
    icon: Layers,
    shortDefinition: "Cognaium's approach to AI tutoring using specialized AI agents that collaborate for personalized learning.",
    fullDefinition: "Multi-Agent AI Orchestration is Cognaium's approach to AI-powered tutoring where multiple specialized AI agents work together to deliver personalized learning experiences. The system includes: Curriculum Planner (designs learning paths), Concept Explainer (breaks down complex topics), Practice Coach (guides hands-on exercises), and Quiz Generator (creates assessments). Each agent specializes in a specific aspect of learning, coordinating seamlessly to adapt to individual learning styles and pace.",
    relatedTerms: ["AI Tutoring", "Personalized Learning", "Skill Gap Analysis"],
    learnMore: "/features"
  },
  {
    id: "ai-director",
    term: "AI Director",
    category: "Product Feature",
    icon: MessageSquare,
    shortDefinition: "Cognaium's intelligent platform assistant providing contextual navigation, help, and automation.",
    fullDefinition: "The AI Director is Cognaium's intelligent platform assistant that provides contextual navigation, help, and automation across the entire platform experience. It understands user intent, answers questions about platform features, guides users through complex workflows, and can automate repetitive tasks. The AI Director learns from usage patterns to provide increasingly personalized assistance over time.",
    relatedTerms: ["Platform Navigation", "User Experience", "AI Automation"],
    learnMore: "/features"
  },
  {
    id: "skills-based-talent-management",
    term: "Skills-Based Talent Management",
    category: "Methodology",
    icon: Award,
    shortDefinition: "An approach to workforce management that prioritizes skills over traditional job titles and credentials.",
    fullDefinition: "Skills-Based Talent Management is an approach to workforce management that prioritizes skills, competencies, and capabilities over traditional job titles, degrees, and credentials. This methodology enables organizations to: identify hidden talent within their workforce, create more inclusive hiring practices, build flexible career pathways, and respond faster to changing skill demands. Cognaium's platform is built on skills-based principles throughout.",
    relatedTerms: ["Human Capital Liquidity", "Skill Taxonomy", "Career Pathways"],
    learnMore: "/what-is-skills-based-talent-management"
  },
  {
    id: "ai-skills-mapping",
    term: "AI Skills Mapping",
    category: "Technology",
    icon: BarChart3,
    shortDefinition: "Using artificial intelligence to automatically identify, categorize, and validate workforce skills.",
    fullDefinition: "AI Skills Mapping uses artificial intelligence to automatically identify, categorize, and validate workforce skills from multiple data sources including resumes, performance data, learning completions, and self-assessments. Unlike manual skills inventories, AI-powered mapping provides real-time accuracy, identifies skill adjacencies (related skills), predicts skill decay, and recommends development priorities based on business objectives.",
    relatedTerms: ["Skill Taxonomy", "Resume Parsing", "Skills-Based Talent Management"],
    learnMore: "/what-is-ai-skills-mapping"
  },
  {
    id: "skill-taxonomy",
    term: "Skill Taxonomy",
    category: "Framework",
    icon: Layers,
    shortDefinition: "A hierarchical classification system that organizes skills into categories, subcategories, and proficiency levels.",
    fullDefinition: "A Skill Taxonomy is a hierarchical classification system that organizes skills into categories, subcategories, and proficiency levels. Cognaium uses industry-standard taxonomies enhanced with AI to provide consistent skill language across the organization, enable meaningful skill comparisons, support career path planning, and align individual skills with organizational capabilities. The taxonomy continuously evolves as new skills emerge.",
    relatedTerms: ["AI Skills Mapping", "Skills-Based Talent Management", "Career Pathways"],
    learnMore: "/features"
  },
  {
    id: "algorithmic-chro",
    term: "Algorithmic CHRO",
    category: "Concept",
    icon: Brain,
    shortDefinition: "The concept of AI-augmented HR leadership where data and algorithms inform strategic workforce decisions.",
    fullDefinition: "The Algorithmic CHRO represents the evolution of HR leadership where artificial intelligence and data analytics augment human decision-making at the strategic level. Rather than replacing HR leaders, the algorithmic approach provides CHROs with predictive insights, scenario modeling, and real-time workforce intelligence to make better decisions about talent strategy, organizational design, and workforce planning.",
    relatedTerms: ["Sentient Organization Architecture", "Workforce Analytics", "Strategic HR"],
    learnMore: "/research"
  },
  {
    id: "symbiotic-enterprise",
    term: "Symbiotic Enterprise",
    category: "Concept",
    icon: Zap,
    shortDefinition: "Future organizational model where humans and AI systems work in mutually beneficial partnership.",
    fullDefinition: "The Symbiotic Enterprise is a future organizational model where humans and AI systems work in mutually beneficial partnership. In this model, AI handles routine decisions, pattern recognition, and optimization while humans focus on creativity, relationship building, and ethical judgment. The symbiosis creates value greater than either humans or AI could achieve independently, with continuous learning flowing in both directions.",
    relatedTerms: ["Sentient Organization Architecture", "Human-AI Collaboration", "Algorithmic CHRO"],
    learnMore: "/research"
  },
  {
    id: "proctoring",
    term: "AI Proctoring",
    category: "Product Feature",
    icon: Shield,
    shortDefinition: "Real-time monitoring of assessments using AI to ensure integrity and prevent cheating.",
    fullDefinition: "AI Proctoring in Cognaium uses advanced computer vision and audio analysis to ensure assessment integrity. The system includes AI-powered person detection (identifies multiple people), audio monitoring (detects speech and suspicious sounds), browser security enforcement (prevents tab switching and copy-paste), and violation logging with severity levels. Configurable thresholds allow organizations to balance security with candidate experience.",
    relatedTerms: ["AI Screening", "Assessment Integrity", "Violation Detection"],
    learnMore: "/features"
  },
  {
    id: "workforce-agility",
    term: "Workforce Agility",
    category: "Concept",
    icon: Zap,
    shortDefinition: "An organization's ability to rapidly adapt its workforce to changing business needs and market conditions.",
    fullDefinition: "Workforce Agility measures an organization's ability to rapidly adapt its workforce to changing business needs and market conditions. High workforce agility requires: clear visibility into current skills, ability to quickly redeploy talent, efficient reskilling programs, and flexible organizational structures. Cognaium enhances workforce agility through AI-powered skills mapping, personalized learning paths, and dynamic talent recommendations.",
    relatedTerms: ["Human Capital Liquidity", "Skills-Based Talent Management", "Organizational Design"],
    learnMore: "/about"
  }
];

const categories = [...new Set(glossaryTerms.map(term => term.category))];

export default function GlossaryPage() {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Cognaium Glossary" 
        description="Comprehensive definitions of key concepts, frameworks, and terminology in AI-powered workforce development."
      />

      {/* Schema markup for each term */}
      {glossaryTerms.map(term => (
        <DefinedTermSchema 
          key={term.id}
          term={term.term}
          definition={term.fullDefinition}
          url={`https://www.cogniai.us/glossary#${term.id}`}
        />
      ))}

      {/* Quick Navigation */}
      <section className="py-8 bg-card/30 sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <a
                key={index}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms by Category */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">Last Updated: January 22, 2026</span>
            </div>
            <p className="text-muted-foreground">
              This glossary provides authoritative definitions for key terms and concepts used throughout Cognaium and the broader field of AI-powered workforce development. Each definition represents Cognaium's perspective based on our research and platform capabilities.
            </p>
          </div>

          {categories.map((category, catIndex) => (
            <div key={catIndex} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full" />
                {category}
              </h2>
              
              <div className="space-y-8">
                {glossaryTerms
                  .filter(term => term.category === category)
                  .map((term, index) => (
                    <article 
                      key={index} 
                      id={term.id}
                      className="glass rounded-2xl p-6 lg:p-8 scroll-mt-32"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <term.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold">{term.term}</h3>
                          <span className="text-sm text-muted-foreground">{term.category}</span>
                        </div>
                      </div>

                      {/* Short Answer Box - Optimized for AI extraction */}
                      <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mb-6">
                        <p className="font-medium text-foreground">
                          {term.shortDefinition}
                        </p>
                      </div>

                      {/* Full Definition */}
                      <div className="prose prose-lg max-w-none mb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {term.fullDefinition}
                        </p>
                      </div>

                      {/* Related Terms */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-muted-foreground">Related:</span>
                        {term.relatedTerms.map((related, i) => (
                          <a
                            key={i}
                            href={`#${related.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                            className="text-sm px-3 py-1 rounded-full bg-white/5 text-primary hover:bg-primary/10 transition-colors"
                          >
                            {related}
                          </a>
                        ))}
                      </div>

                      {/* Learn More Link */}
                      {term.learnMore && (
                        <Link 
                          href={term.learnMore}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          Learn more about {term.term} →
                        </Link>
                      )}
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">About This Glossary</h2>
          <p className="text-muted-foreground mb-6">
            This glossary is maintained by the Cognaium research team as part of our commitment to advancing the field of AI-powered workforce development. Definitions are based on our proprietary research, including the five-part Cognaium Research Series on the future of work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/research">
              <span className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Explore Our Research
              </span>
            </Link>
            <Link href="/contact">
              <span className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition-colors">
                Request Consultation
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
