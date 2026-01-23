"use client";

import { useState } from "react";
import { 
  Brain, 
  Video, 
  Users, 
  Award, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Briefcase,
  MessageSquare,
  FileText,
  Zap,
  Target,
  GraduationCap,
  Mic,
  Eye,
  Settings,
  CheckCircle2,
  Code,
  Upload,
  Star,
  List,
  GitCompare,
  Clock,
  Bell,
  Lock,
  Database,
  Globe,
  Layers
} from "lucide-react";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Video, Users, Award, BookOpen, BarChart3, Shield, Briefcase,
  MessageSquare, FileText, Zap, Target, GraduationCap, Mic, Eye, Settings,
  CheckCircle2, Code, Upload, Star, List, GitCompare, Clock, Bell,
  Lock, Database, Globe, Layers
};

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  features: Feature[];
}

interface FeaturesContentProps {
  featureCategories: FeatureCategory[];
}

export function FeaturesContent({ featureCategories }: FeaturesContentProps) {
  const [activeCategory, setActiveCategory] = useState(featureCategories[0]);

  if (!featureCategories || featureCategories.length === 0) {
    return null;
  }

  const ActiveCategoryIcon = iconMap[activeCategory?.icon] || Brain;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {featureCategories.map((category) => {
            const CategoryIcon = iconMap[category.icon] || Brain;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory?.id === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                <CategoryIcon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Category Header */}
        {activeCategory && (
          <>
            <div className="text-center mb-12">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center mx-auto mb-4`}>
                <ActiveCategoryIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">{activeCategory.name}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{activeCategory.description}</p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategory.features?.map((feature, index) => {
                const FeatureIcon = iconMap[feature.icon] || Brain;
                return (
                  <div key={index} className="glass rounded-2xl p-6 card-hover">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeCategory.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                      <FeatureIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
