import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { Brain, Target, Users, Zap, Shield, Globe, Award, Lightbulb, Heart, Rocket } from "lucide-react";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  Brain, Target, Users, Zap, Shield, Globe, Award, Lightbulb, Heart, Rocket
};

// Interfaces for content
interface VisionItem {
  icon: string;
  title: string;
  description: string;
}

interface CapabilityItem {
  icon: string;
  title: string;
  desc: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

export default async function AboutPage() {
  // Fetch content from database with fallbacks
  const content = await getPageContent("about");
  
  const headerContent = content.header as { title?: string; subtitle?: string } || {};
  const valuesContent = content.values as { items?: Value[] } || {};
  const journeyContent = content.journey as { items?: Milestone[] } || {};
  const visionContent = content.vision as { 
    badge?: string; 
    title?: string; 
    titleHighlight?: string; 
    description?: string;
    secondaryDescription?: string;
    items?: VisionItem[];
  } || {};
  const capabilitiesContent = content.capabilities as {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: CapabilityItem[];
  } || {};
  const journeyHeaderContent = content.journey_header as { badge?: string; title?: string } || {};

  // Default values
  const defaultValues: Value[] = [
    { icon: "Brain", title: "AI-First Innovation", description: "We leverage cutting-edge AI from OpenAI, Anthropic, and Google to deliver intelligent solutions that continuously learn and improve." },
    { icon: "Shield", title: "Enterprise Security", description: "Multi-tenant architecture with complete data isolation, encryption at rest and in transit, and compliance-ready infrastructure." },
    { icon: "Users", title: "Human-Centered Design", description: "Technology that enhances human potential, making complex workflows intuitive and empowering every user role." },
    { icon: "Zap", title: "Continuous Evolution", description: "Rapid iteration based on user feedback, with new features and improvements deployed regularly." }
  ];

  const defaultMilestones: Milestone[] = [
    { year: "Foundation", title: "Platform Genesis", description: "Cognaium was born from the vision to revolutionize how organizations assess and develop talent." },
    { year: "Growth", title: "Multi-Tenant Architecture", description: "Launched enterprise-ready multi-tenant platform with white-labeling and subdomain routing." },
    { year: "Innovation", title: "AI Tutoring System", description: "Introduced multi-agent AI tutoring with voice support and personalized learning paths." },
    { year: "Scale", title: "Full HR Suite", description: "Expanded to complete HR management with ATS, certifications, and advanced analytics." }
  ];

  const defaultVisionItems: VisionItem[] = [
    { icon: "Target", title: "Our Mission", description: "To transform how organizations hire, train, and develop their workforce through AI-powered intelligence that makes better decisions possible." },
    { icon: "Lightbulb", title: "Our Approach", description: "We build comprehensive solutions that address the entire talent lifecycle—from screening to certification—in one unified platform." },
    { icon: "Globe", title: "Our Reach", description: "Serving organizations across industries—from healthcare and manufacturing to education and staffing agencies worldwide." }
  ];

  const defaultCapabilities: CapabilityItem[] = [
    { icon: "Brain", title: "AI Screening", desc: "Conversational interviews with multiple question types" },
    { icon: "Shield", title: "Proctoring", desc: "AI-powered detection and audio monitoring" },
    { icon: "Users", title: "ATS", desc: "Complete hiring pipeline with CCI scoring" },
    { icon: "Award", title: "Certifications", desc: "AI-generated programs and certificates" },
    { icon: "Rocket", title: "AI Tutoring", desc: "Multi-agent personalized learning" },
    { icon: "Heart", title: "HR Suite", desc: "Policies, team management, and KRA/KPI" }
  ];

  const values = valuesContent.items && valuesContent.items.length > 0 ? valuesContent.items : defaultValues;
  const milestones = journeyContent.items && journeyContent.items.length > 0 ? journeyContent.items : defaultMilestones;
  const visionItems = visionContent.items && visionContent.items.length > 0 ? visionContent.items : defaultVisionItems;
  const capabilities = capabilitiesContent.items && capabilitiesContent.items.length > 0 ? capabilitiesContent.items : defaultCapabilities;

  return (
    <main className="min-h-screen">
      <PageHeader 
        title={headerContent.title || "Intelligent Workforce Development"}
        description={headerContent.subtitle || "Building the future of skill assessment, talent acquisition, and employee development with AI-powered intelligence."}
      />

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                {visionContent.badge || "Our Vision"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {visionContent.title || "Empowering Organizations Through"}
                <span className="gradient-text block">{visionContent.titleHighlight || "Intelligent Assessment"}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {visionContent.description || "We believe that every organization deserves access to enterprise-grade AI tools for talent management. Cognaium democratizes intelligent workforce development, making sophisticated assessment, training, and analytics accessible to organizations of all sizes."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {visionContent.secondaryDescription || "Our platform combines the power of multiple AI providers—OpenAI GPT-4, Anthropic Claude, and Google Gemini—with robust enterprise features like multi-tenant architecture, real-time proctoring, and comprehensive analytics."}
              </p>
            </div>

            <div className="glass rounded-3xl p-8 lg:p-12">
              <div className="space-y-8">
                {visionItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon] || Target;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl ${index % 2 === 0 ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our product development and customer relationships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Brain;
              return (
                <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {capabilitiesContent.badge || "Platform Capabilities"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {capabilitiesContent.title || "Complete Workforce Solution"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {capabilitiesContent.subtitle || "A unified platform that covers the entire talent lifecycle."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Brain;
              return (
                <div key={index} className="glass rounded-xl p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              {journeyHeaderContent.badge || "Our Journey"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {journeyHeaderContent.title || "Building the Future"}
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="glass rounded-xl p-6 flex-1">
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA content={content.cta} />
    </main>
  );
}
