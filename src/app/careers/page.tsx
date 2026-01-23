import { PageHeader } from "@/components/PageHeader";
import { Briefcase, Heart, Rocket, Users, ChevronRight, Brain, Code, Palette, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";
import { getPageContent } from "@/lib/content";
import { isFeatureEnabled } from "@/lib/settings";
import { notFound } from "next/navigation";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  Briefcase, Heart, Rocket, Users, Brain, Code, Palette, Shield, BarChart3
};

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface CultureItem {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

async function getJobs(): Promise<Job[]> {
  try {
    const jobs = await db.job.findMany({
      where: {
        status: "open",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        type: true,
      },
    });
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export default async function CareersPage() {
  // Check if careers feature is enabled
  const careersEnabled = await isFeatureEnabled("careers");
  if (!careersEnabled) {
    notFound();
  }

  const [jobs, content] = await Promise.all([
    getJobs(),
    getPageContent("careers")
  ]);

  // Extract content with types
  const headerContent = content.header as { title?: string; subtitle?: string } || {};
  const cultureContent = content.culture as { title?: string; description?: string; items?: CultureItem[] } || {};
  const benefitsContent = content.benefits as { title?: string; subtitle?: string; items?: BenefitItem[] } || {};
  const techStackContent = content.tech_stack as { title?: string; subtitle?: string; items?: string[] } || {};
  const ctaContent = content.cta as { title?: string; subtitle?: string; primaryCta?: string; primaryCtaLink?: string; secondaryCta?: string; secondaryCtaLink?: string } || {};
  const rolesContent = content.roles as { title?: string; emptyTitle?: string; emptySubtitle?: string; viewAllText?: string; emailText?: string; emailLinkText?: string; email?: string } || {};

  // Defaults
  const defaultCultureItems: CultureItem[] = [
    { icon: "Brain", title: "Cutting-Edge AI", description: "Work with GPT-4, Claude, and Gemini. Build multi-agent systems and intelligent automation.", color: "primary" },
    { icon: "Rocket", title: "High-Agency Culture", description: "We value ownership, rapid iteration, and intellectual honesty. Your ideas shape the product.", color: "accent" },
    { icon: "BarChart3", title: "Real Impact", description: "Code you write today helps organizations hire better and develop their people smarter.", color: "primary" },
    { icon: "Users", title: "Amazing Team", description: "Work alongside talented engineers, designers, and domain experts from top companies.", color: "accent" }
  ];

  const defaultBenefits: BenefitItem[] = [
    { icon: "Heart", title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage for you and your family." },
    { icon: "Rocket", title: "Growth & Learning", description: "Annual learning budget, conference attendance, and career development programs." },
    { icon: "Users", title: "Flexible Work", description: "Remote-first culture with flexible hours and unlimited PTO." },
    { icon: "Shield", title: "Equity", description: "Meaningful equity stake in a fast-growing company." }
  ];

  const defaultTechStack = ["Next.js 15", "TypeScript", "Tailwind CSS", "MySQL", "Redis", "OpenAI", "Claude", "Gemini", "Docker"];

  const cultureItems = cultureContent.items && cultureContent.items.length > 0 ? cultureContent.items : defaultCultureItems;
  const benefits = benefitsContent.items && benefitsContent.items.length > 0 ? benefitsContent.items : defaultBenefits;
  const techStack = techStackContent.items && techStackContent.items.length > 0 ? techStackContent.items : defaultTechStack;

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={headerContent.title || "Build the Future of Workforce Intelligence"} 
        description={headerContent.subtitle || "Join our team of engineers, designers, and AI specialists who are transforming how organizations assess and develop talent."}
      />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Culture Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-heading">{cultureContent.title || "Why Cognaium?"}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {cultureContent.description || "Work at the intersection of AI innovation and workforce transformation. We're building the platform that helps organizations hire better, train smarter, and develop their teams with intelligence."}
                </p>
              </div>

              <div className="space-y-8">
                {cultureItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon] || Brain;
                  const colorClass = item.color === "accent" ? "bg-accent/10" : "bg-primary/10";
                  const iconColorClass = item.color === "accent" ? "text-accent" : "text-primary";
                  return (
                    <div key={index} className="flex gap-6">
                      <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${iconColorClass}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Roles Section */}
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 h-fit">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 font-heading">
                <Briefcase className="w-6 h-6 text-primary" />
                {rolesContent.title || "Open Roles"}
              </h2>
              <div className="space-y-4">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <Link 
                      key={job.id}
                      href={`/careers/${job.id}`}
                      className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all cursor-pointer block"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{job.department}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{job.type}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{job.location}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">{rolesContent.emptyTitle || "No open positions at the moment."}</p>
                    <p className="text-sm text-muted-foreground mt-2">{rolesContent.emptySubtitle || "Check back soon or send us your resume!"}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-12 text-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all w-full"
                >
                  {rolesContent.viewAllText || "View All Openings"}
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  {rolesContent.emailText || "Don't see a role that fits?"} <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${rolesContent.email || "careers@cognaium.com"}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{rolesContent.emailLinkText || "Email us"}</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{benefitsContent.title || "Benefits & Perks"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {benefitsContent.subtitle || "We take care of our team so they can focus on building amazing products."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Heart;
              return (
                <div key={index} className="glass rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{techStackContent.title || "Our Tech Stack"}</h2>
            <p className="text-muted-foreground">
              {techStackContent.subtitle || "Modern tools and technologies that let you do your best work."}
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {techStack.map((tech, i) => (
                <div key={i} className="text-sm font-medium text-muted-foreground py-2">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{ctaContent.title || "Ready to Join Us?"}</h2>
          <p className="text-muted-foreground mb-8">
            {ctaContent.subtitle || "We're always looking for talented people who share our vision."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ctaContent.primaryCtaLink || "#positions"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {ctaContent.primaryCta || "View Open Positions"}
              </Button>
            </Link>
            <Link href={ctaContent.secondaryCtaLink || "/about"}>
              <Button size="lg" variant="outline">
                {ctaContent.secondaryCta || "Learn About Us"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
