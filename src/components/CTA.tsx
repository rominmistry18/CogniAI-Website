"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Multi-AI Support",
  "Real-time Proctoring",
  "Full ATS Suite",
  "Enterprise Security"
];

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 uppercase tracking-widest">
          Get Started Today
        </span>
        
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 text-[#002F6C]">
            Ready to Transform
            <span className="gradient-text block">Your Workforce?</span>
          </h2>
          
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join leading organizations using Cognaium for intelligent skill assessment, hiring, and employee development. Start your free trial or schedule a demo.
            </p>


        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border hover:bg-white/5">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
