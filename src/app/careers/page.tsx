import { PageHeader } from "@/components/PageHeader";
import { Briefcase, Heart, Rocket, Users, ChevronRight, Brain, Code, Palette, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
  const roles = [
    { title: "Senior Full-Stack Engineer", type: "Full-time", location: "Remote / Hybrid", team: "Engineering" },
    { title: "AI/ML Engineer", type: "Full-time", location: "Remote", team: "AI Platform" },
    { title: "Lead Product Designer (UX/UI)", type: "Full-time", location: "Hybrid", team: "Product" },
    { title: "Enterprise Account Executive", type: "Full-time", location: "Remote", team: "Sales" },
    { title: "Customer Success Manager", type: "Full-time", location: "Remote", team: "Customer Success" },
    { title: "DevOps Engineer", type: "Full-time", location: "Remote", team: "Infrastructure" },
  ];

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage for you and your family." },
    { icon: Rocket, title: "Growth & Learning", description: "Annual learning budget, conference attendance, and career development programs." },
    { icon: Users, title: "Flexible Work", description: "Remote-first culture with flexible hours and unlimited PTO." },
    { icon: Shield, title: "Equity", description: "Meaningful equity stake in a fast-growing company." },
  ];

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Build the Future of Workforce Intelligence" 
        description="Join our team of engineers, designers, and AI specialists who are transforming how organizations assess and develop talent."
      />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Culture Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-heading">Why CogniAI?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Work at the intersection of AI innovation and workforce transformation. We're building the platform that helps organizations hire better, train smarter, and develop their teams with intelligence.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Cutting-Edge AI</h3>
                    <p className="text-muted-foreground leading-relaxed">Work with GPT-4, Claude, and Gemini. Build multi-agent systems and intelligent automation.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">High-Agency Culture</h3>
                    <p className="text-muted-foreground leading-relaxed">We value ownership, rapid iteration, and intellectual honesty. Your ideas shape the product.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Real Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">Code you write today helps organizations hire better and develop their people smarter.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Amazing Team</h3>
                    <p className="text-muted-foreground leading-relaxed">Work alongside talented engineers, designers, and domain experts from top companies.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles Section */}
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 h-fit">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 font-heading">
                <Briefcase className="w-6 h-6 text-primary" />
                Open Roles
              </h2>
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div 
                    key={index}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{role.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{role.team}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{role.type}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{role.location}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all w-full"
                >
                  View All Openings
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  Don't see a role that fits? <a href="mailto:careers@cogniai.us" className="text-primary hover:underline">Email us</a>.
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
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take care of our team so they can focus on building amazing products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-muted-foreground">
              Modern tools and technologies that let you do your best work.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "MySQL",
                "Redis",
                "OpenAI",
                "Claude",
                "Gemini",
                "Docker"
              ].map((tech, i) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented people who share our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Open Positions
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
