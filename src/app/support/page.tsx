import { PageHeader } from "@/components/PageHeader";
import { Mail, MessageSquare, Phone, BookOpen, Video, FileText, Users, Zap, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "For general inquiries and technical assistance, reach out to our support team.",
      action: "Email Us",
      href: "mailto:support@cogniai.us",
      color: "primary"
    },
    {
      icon: MessageSquare,
      title: "Request a Demo",
      description: "See Cognaium in action with a personalized walkthrough tailored to your needs.",
      action: "Book Demo",
      href: "/contact",
      color: "accent"
    },
    {
      icon: Phone,
      title: "Enterprise Sales",
      description: "Speak with our sales team about custom solutions and enterprise deployments.",
      action: "Contact Sales",
      href: "/contact",
      color: "primary"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides for platform setup, configuration, and usage."
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks and advanced features."
    },
    {
      icon: FileText,
      title: "API Reference",
      description: "Complete API documentation for integrations and custom development."
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other Cognaium users to share tips and best practices."
    }
  ];

  const faqs = [
    {
      q: "How do I get started with Cognaium?",
      a: "The best way to start is by requesting a demo. Our team will guide you through the platform, help set up your organization, and configure initial assessments."
    },
    {
      q: "What AI providers does Cognaium support?",
      a: "Cognaium supports multiple AI providers including OpenAI GPT-4, Anthropic Claude, and Google Gemini. Enterprise customers can also integrate custom or fine-tuned models."
    },
    {
      q: "Is Cognaium HIPAA compliant?",
      a: "Yes, Cognaium is designed with HIPAA compliance at its core. We offer Business Associate Agreements (BAA) for healthcare organizations handling PHI."
    },
    {
      q: "Can I use Cognaium for my existing employees?",
      a: "Absolutely! Cognaium supports both candidate assessment and employee development. You can use it for skill assessments, training programs, certifications, and performance tracking."
    },
    {
      q: "How does the proctoring system work?",
      a: "Our proctoring system uses AI-powered person detection and audio monitoring. It can detect multiple persons, track faces, monitor for suspicious sounds, and enforce browser security. Settings are fully configurable per assessment."
    },
    {
      q: "Can Cognaium integrate with my existing systems?",
      a: "Yes, we offer REST APIs for integration with HRIS, LMS, and other enterprise systems. Enterprise customers can also get custom integrations built by our team."
    },
    {
      q: "What's the difference between AI Screening and AI Tutoring?",
      a: "AI Screening is for assessment—evaluating candidates or employees through structured interviews and tests. AI Tutoring is for learning—providing personalized instruction, practice exercises, and skill development with multi-agent AI tutors."
    },
    {
      q: "How does multi-tenant work?",
      a: "Each organization gets complete data isolation with their own subdomain, branding, and configuration. Data never crosses organizational boundaries, and each tenant can customize their experience."
    }
  ];

  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title="Support Center" 
        description="We're here to help you get the most out of Cognaium. Find answers, resources, and ways to connect with our team."
      />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {supportChannels.map((channel, index) => (
              <div key={index} className="glass p-8 rounded-3xl border border-white/10 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-${channel.color}/10 flex items-center justify-center mx-auto mb-6`}>
                  <channel.icon className={`w-8 h-8 text-${channel.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{channel.title}</h3>
                <p className="text-muted-foreground mb-8">{channel.description}</p>
                <Link href={channel.href}>
                  <Button 
                    variant={channel.color === "accent" ? "default" : "outline"} 
                    className={channel.color === "accent" ? "w-full bg-primary hover:bg-primary/90" : "w-full"}
                  >
                    {channel.action}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to get the most out of Cognaium.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="glass p-6 rounded-2xl text-center card-hover cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="glass rounded-xl p-6">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is ready to help you find the right solution for your organization.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
