import { Clock, Users, Award, BookOpen, Play, Brain, Eye, Briefcase, GraduationCap, BarChart3, Shield, Settings, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageContent } from "@/lib/content";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Users, Award, BookOpen, Play, Brain, Eye, Briefcase, GraduationCap, BarChart3, Shield, Settings, Target
};

interface TrainingModule {
  id: number;
  title: string;
  duration: string;
  audience: string;
  icon: string;
  color: string;
  topics: string[];
  outcomes: string[];
}

interface Stat {
  value: string;
  label: string;
}

export default async function TrainingPage() {
  const content = await getPageContent("skill_library");
  
  const header = content.header as { badge?: string; title?: string; titleHighlight?: string; subtitle?: string } || {};
  const statsData = content.stats as { items?: Stat[] } || {};
  const modulesData = content.modules as { items?: TrainingModule[] } || {};
  const customTraining = content.custom_training as { title?: string; subtitle?: string } || {};

  const stats = statsData.items || [];
  const modules = modulesData.items || [];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              {header.badge || "Training Modules"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {header.title || "Master the Platform"}
              <span className="gradient-text block">{header.titleHighlight || "With Expert Training"}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {header.subtitle || "Comprehensive training curriculum covering every feature of Cognaium."}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = iconMap[module.icon] || BookOpen;
              return (
                <div
                  key={module.id}
                  className="glass rounded-2xl overflow-hidden card-hover"
                >
                  <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        Module {module.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {module.audience}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Topics Covered</h4>
                      <ul className="space-y-1">
                        {module.topics.slice(0, 4).map((topic, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {topic}
                          </li>
                        ))}
                        {module.topics.length > 4 && (
                          <li className="text-sm text-primary">
                            +{module.topics.length - 4} more topics
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Learning Outcomes</h4>
                      <ul className="space-y-1">
                        {module.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full gap-2">
                      <Play className="w-4 h-4" />
                      Start Module
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {customTraining.title?.split(" ").map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i} className="gradient-text">{word}</span> : `${word} `
            ) || <>Need Custom <span className="gradient-text">Training?</span></>}
          </h2>
          <p className="text-muted-foreground mb-8">
            {customTraining.subtitle || "We offer personalized onboarding and training sessions for enterprise customers."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Schedule Training Session
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
