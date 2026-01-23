import { PageHeader } from "@/components/PageHeader";
import { Mail, MessageSquare, Phone, BookOpen, Video, FileText, Users, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, MessageSquare, Phone, BookOpen, Video, FileText, Users
};

interface SupportChannel {
  icon: string;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
}

interface Resource {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  q: string;
  a: string;
}

export default async function SupportPage() {
  const content = await getPageContent("support");
  
  const header = content.header as { title?: string; subtitle?: string } || {};
  const channelsData = content.channels as { items?: SupportChannel[] } || {};
  const resourcesData = content.resources as { items?: Resource[] } || {};
  const faqsData = content.faqs as { items?: FAQ[] } || {};

  const supportChannels = channelsData.items || [];
  const resources = resourcesData.items || [];
  const faqs = faqsData.items || [];

  return (
    <main className="min-h-screen pt-20">
      <PageHeader 
        title={header.title || "Support Center"}
        description={header.subtitle || "We're here to help you get the most out of Cognaium."}
      />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {supportChannels.map((channel, index) => {
              const IconComponent = iconMap[channel.icon] || Mail;
              return (
                <div key={index} className="glass p-8 rounded-3xl border border-white/10 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-${channel.color}/10 flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`w-8 h-8 text-${channel.color}`} />
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
              );
            })}
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
              {resources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon] || BookOpen;
                return (
                  <div key={index} className="glass p-6 rounded-2xl text-center card-hover cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                );
              })}
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
