"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Zap, Shield, Users, BarChart3, Brain, Award, BookOpen, Video } from "lucide-react";

const stats = [
  { value: "8+", label: "Question Types" },
  { value: "3", label: "AI Providers" },
  { value: "Real-time", label: "Proctoring" },
  { value: "Multi-tenant", label: "Architecture" },
];

const highlights = [
  { icon: Brain, text: "AI-Powered Interviews" },
  { icon: Video, text: "Video Proctoring" },
  { icon: Award, text: "Certifications" },
  { icon: BookOpen, text: "AI Tutoring" },
  { icon: Users, text: "ATS Integration" },
  { icon: BarChart3, text: "Advanced Analytics" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="glow-dot" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Enterprise-Ready AI Platform</span>
          </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 text-[#002F6C]">
              <span className="block">Intelligent Skill Assessment</span>
              <span className="gradient-text">For Modern Organizations</span>
            </h1>


          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The complete AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development. From AI interviews to certifications, all in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border hover:bg-white/5">
                <Play className="w-4 h-4" />
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="glass rounded-2xl p-2 max-w-5xl mx-auto animate-pulse-glow">
            <div className="bg-card rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
                <p className="text-muted-foreground">Platform Demo Preview</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
