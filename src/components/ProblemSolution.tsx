"use client";

import { AlertTriangle, CheckCircle2, ArrowRight, Users, Clock, TrendingDown, Brain, Target, Zap, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Inefficient Hiring Process",
    description: "Manual resume screening and unstructured interviews lead to poor hiring decisions and extended time-to-hire.",
    stat: "65%",
    statLabel: "of hires fail due to poor assessment"
  },
  {
    icon: Clock,
    title: "Skill Gap Blind Spots",
    description: "Organizations lack visibility into actual employee competencies, leading to misaligned training and performance issues.",
    stat: "40%",
    statLabel: "of skills become obsolete yearly"
  },
  {
    icon: TrendingDown,
    title: "Fragmented Training",
    description: "Disconnected LMS systems, manual tracking, and no personalization result in low engagement and wasted resources.",
    stat: "70%",
    statLabel: "of training content goes unused"
  }
];

const solutions = [
  {
    icon: Brain,
    title: "AI-Powered Screening",
    description: "Conversational AI interviews with automatic scoring, CCI ranking, and deep candidate insights—reducing time-to-hire by 60%.",
    features: ["8 Question Types", "Video Proctoring", "Auto-Scoring"]
  },
  {
    icon: Target,
    title: "Intelligent Skill Detection",
    description: "Automated skill gap analysis across your workforce with personalized learning recommendations and progress tracking.",
    features: ["Skill Gap Analysis", "Learning Paths", "Certifications"]
  },
  {
    icon: Zap,
    title: "Unified Learning Platform",
    description: "AI tutoring, training programs, and certifications in one place—with real-time analytics and completion tracking.",
    features: ["AI Tutoring", "Multi-Format Content", "Analytics"]
  }
];

export function ProblemSolution() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            The Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Traditional Methods
            <span className="gradient-text block">Are Failing Organizations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manual processes, disconnected tools, and lack of AI-powered insights are costing organizations time, money, and talent.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {problems.map((problem, index) => (
            <div key={index} className="glass rounded-2xl p-6 border-l-4 border-destructive/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="w-5 h-5 text-destructive" />
                </div>
                <AlertTriangle className="w-5 h-5 text-destructive/60" />
              </div>
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground mb-4">{problem.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-destructive">{problem.stat}</span>
                <span className="text-sm text-muted-foreground">{problem.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Arrow */}
        <div className="flex justify-center mb-20">
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Solutions Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            The CogniAI Solution
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Intelligence
            <span className="gradient-text block">For Every Stage</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From hiring to development, CogniAI brings intelligent automation and actionable insights to your entire talent lifecycle.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div key={index} className="glass rounded-2xl p-6 border-l-4 border-accent/50 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <solution.icon className="w-5 h-5 text-accent" />
                </div>
                <CheckCircle2 className="w-5 h-5 text-accent/60" />
              </div>
              <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
              <p className="text-muted-foreground mb-4">{solution.description}</p>
              <div className="flex flex-wrap gap-2">
                {solution.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "60%", label: "Faster Hiring" },
              { value: "85%", label: "Skill Visibility" },
              { value: "3x", label: "Training Engagement" },
              { value: "50%", label: "Cost Reduction" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
