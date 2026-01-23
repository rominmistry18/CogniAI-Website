"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Home, 
  Info, 
  DollarSign, 
  Shield, 
  Star,
  HelpCircle,
  ChevronRight,
  Edit,
  Users,
  BookOpen,
  GraduationCap,
  Headphones,
  Scale,
  FileCheck,
  Newspaper,
  Briefcase,
  Rss
} from "lucide-react";
import { toast } from "sonner";

interface ContentSection {
  id: string;
  pageKey: string;
  sectionKey: string;
  contentData: Record<string, unknown>;
  updatedAt: string;
}

interface PageConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
  sections: { key: string; label: string }[];
}

const pages: PageConfig[] = [
  {
    key: "home",
    label: "Home Page",
    icon: Home,
    description: "Hero section, features, and call-to-action",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "problems_header", label: "Problems Header" },
      { key: "problems", label: "Problems List" },
      { key: "solutions_header", label: "Solutions Header" },
      { key: "solutions", label: "Solutions List" },
      { key: "problem_solution_stats", label: "Stats Banner" },
      { key: "features_header", label: "Features Header" },
      { key: "features", label: "Features List" },
      { key: "quick_features", label: "Quick Features" },
      { key: "journeys_header", label: "Journeys Header" },
      { key: "journeys", label: "Industry Solutions" },
      { key: "trust_header", label: "Trust & Security Header" },
      { key: "security_features", label: "Security Features" },
      { key: "certifications", label: "Compliance Certifications" },
      { key: "trust_stats", label: "Security Stats" },
      { key: "leadership_header", label: "Leadership Header" },
      { key: "leaders", label: "Leadership Team" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "about",
    label: "About Page",
    icon: Info,
    description: "Company information and mission",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "vision", label: "Vision Section" },
      { key: "capabilities", label: "Platform Capabilities" },
      { key: "values", label: "Core Values" },
      { key: "journey", label: "Company Journey" },
      { key: "journey_header", label: "Journey Header" },
    ],
  },
  {
    key: "pricing",
    label: "Pricing Page",
    icon: DollarSign,
    description: "Pricing plans and features",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "plans", label: "Pricing Plans" },
      { key: "addons", label: "Add-ons" },
      { key: "comparison", label: "Feature Comparison" },
      { key: "faq", label: "Pricing FAQ" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "features",
    label: "Features Page",
    icon: Star,
    description: "Product features and capabilities",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "categories", label: "Feature Categories" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "security",
    label: "Security Page",
    icon: Shield,
    description: "Security certifications and practices",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "layers", label: "Security Layers" },
      { key: "compliance_items", label: "Compliance Items" },
      { key: "multi_tenant", label: "Multi-Tenant Security" },
      { key: "proctoring", label: "Proctoring Security" },
    ],
  },
  {
    key: "faq",
    label: "FAQ Page",
    icon: HelpCircle,
    description: "Frequently asked questions",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "categories", label: "FAQ Categories" },
      { key: "support", label: "Support Section" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "leadership",
    label: "Leadership Page",
    icon: Users,
    description: "Team members and leadership profiles",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "team", label: "Team Members" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "glossary",
    label: "Glossary",
    icon: BookOpen,
    description: "Industry terms and definitions",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "terms", label: "Glossary Terms" },
    ],
  },
  {
    key: "research",
    label: "Research",
    icon: Newspaper,
    description: "Research articles and whitepapers",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "papers", label: "Research Papers" },
      { key: "additional_resources", label: "Additional Resources" },
    ],
  },
  {
    key: "skill_library",
    label: "Skill Library",
    icon: GraduationCap,
    description: "Training content and skill categories",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "stats", label: "Training Stats" },
      { key: "modules", label: "Training Modules" },
      { key: "custom_training", label: "Custom Training CTA" },
    ],
  },
  {
    key: "support",
    label: "Support",
    icon: Headphones,
    description: "Help articles and support resources",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "channels", label: "Support Channels" },
      { key: "resources", label: "Resources" },
      { key: "faqs", label: "FAQ Items" },
    ],
  },
  {
    key: "compliance",
    label: "Compliance",
    icon: Shield,
    description: "Compliance certifications and standards",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "hipaa", label: "HIPAA Compliance" },
      { key: "gdpr", label: "GDPR Compliance" },
      { key: "multi_tenant", label: "Multi-Tenant Isolation" },
      { key: "standards", label: "Additional Standards" },
    ],
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    icon: Scale,
    description: "Privacy policy content",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "sections", label: "Privacy Sections" },
    ],
  },
  {
    key: "terms",
    label: "Terms of Service",
    icon: Scale,
    description: "Terms of service content",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "sections", label: "Terms Sections" },
    ],
  },
  {
    key: "contact",
    label: "Contact Page",
    icon: FileCheck,
    description: "Contact information and form settings",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "info", label: "Contact Information" },
      { key: "form_settings", label: "Form Settings" },
      { key: "demo", label: "Demo Section" },
      { key: "chat", label: "Chat Section" },
    ],
  },
  {
    key: "compare_ai_hiring",
    label: "Compare: AI vs Traditional",
    icon: Star,
    description: "AI vs traditional hiring comparison",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "summary", label: "Summary" },
      { key: "comparison", label: "Comparison Data" },
      { key: "challenges", label: "Traditional Challenges" },
      { key: "advantages", label: "AI Advantages" },
      { key: "when_to_use", label: "When to Use Each" },
      { key: "cognaium_features", label: "Cognaium Features" },
      { key: "meta", label: "Page Meta" },
    ],
  },
  {
    key: "what_is_hcl",
    label: "What is Human Capital Liquidity",
    icon: BookOpen,
    description: "Educational content about HCL",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "quick_answer", label: "Quick Answer" },
      { key: "sections", label: "Content Sections" },
      { key: "related", label: "Related Concepts" },
      { key: "further_reading", label: "Further Reading" },
      { key: "meta", label: "Page Meta" },
    ],
  },
  {
    key: "what_is_sbtm",
    label: "What is Skills-Based TM",
    icon: BookOpen,
    description: "Educational content about SBTM",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "quick_answer", label: "Quick Answer" },
      { key: "sections", label: "Content Sections" },
      { key: "related", label: "Related Concepts" },
      { key: "further_reading", label: "Further Reading" },
      { key: "meta", label: "Page Meta" },
    ],
  },
  {
    key: "what_is_ai_skills_mapping",
    label: "What is AI Skills Mapping",
    icon: BookOpen,
    description: "Educational content about AI skills mapping",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "quick_answer", label: "Quick Answer" },
      { key: "how_to_steps", label: "How-To Steps" },
      { key: "sections", label: "Content Sections" },
      { key: "related", label: "Related Concepts" },
      { key: "further_reading", label: "Further Reading" },
      { key: "meta", label: "Page Meta" },
    ],
  },
  {
    key: "careers",
    label: "Careers Page",
    icon: Briefcase,
    description: "Job listings and company culture",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "culture", label: "Culture & Why Join" },
      { key: "benefits", label: "Benefits & Perks" },
      { key: "tech_stack", label: "Tech Stack" },
      { key: "roles", label: "Open Roles Config" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    key: "blog",
    label: "Blog Page",
    icon: Rss,
    description: "Blog header and empty state",
    sections: [
      { key: "header", label: "Page Header" },
      { key: "empty_state", label: "Empty State" },
    ],
  },
  {
    key: "global",
    label: "Global Settings",
    icon: FileText,
    description: "Footer, navigation, and global content",
    sections: [
      { key: "footer_brand", label: "Footer Brand" },
      { key: "footer_links", label: "Footer Links" },
      { key: "navbar_main", label: "Main Navigation" },
      { key: "navbar_more", label: "More Navigation" },
    ],
  },
];

export default function ContentPage() {
  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editedSections, setEditedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/admin/content");
        if (response.ok) {
          const data = await response.json();
          setContent(data.content);
        }
      } catch (error) {
        toast.error("Failed to fetch content");
      } finally {
        setLoading(false);
      }
    }

    // Load edited sections from sessionStorage
    const loadEditedSections = () => {
      try {
        const stored = sessionStorage.getItem("content_edited_sections");
        if (stored) {
          const sections = JSON.parse(stored) as string[];
          setEditedSections(new Set(sections));
        }
      } catch (error) {
        console.error("Failed to load edited sections from sessionStorage:", error);
      }
    };

    fetchContent();
    loadEditedSections();

    // Listen for storage events (in case content is saved in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "content_edited_sections") {
        try {
          const sections = e.newValue ? JSON.parse(e.newValue) as string[] : [];
          setEditedSections(new Set(sections));
        } catch (error) {
          console.error("Failed to parse storage event:", error);
        }
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleContentEdited = () => {
      try {
        const stored = sessionStorage.getItem("content_edited_sections");
        if (stored) {
          const sections = JSON.parse(stored) as string[];
          setEditedSections(new Set(sections));
        }
      } catch (error) {
        console.error("Failed to load edited sections:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("contentEdited", handleContentEdited);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("contentEdited", handleContentEdited);
    };
  }, []);

  const getContentStatus = (pageKey: string, sectionKey: string) => {
    return content.find(
      (c) => c.pageKey === pageKey && c.sectionKey === sectionKey
    );
  };

  const isSectionEdited = (pageKey: string, sectionKey: string): boolean => {
    const sectionId = `${pageKey}:${sectionKey}`;
    return editedSections.has(sectionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <p className="text-slate-400">Edit content across your website pages</p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div
            key={page.key}
            className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
          >
            {/* Page Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <page.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">{page.label}</h2>
                  <p className="text-sm text-slate-400 mt-1">{page.description}</p>
                </div>
              </div>
            </div>

            {/* Sections List */}
            <div className="divide-y divide-slate-700">
              {page.sections.map((section) => {
                const isEdited = isSectionEdited(page.key, section.key);

                return (
                  <Link
                    key={section.key}
                    href={`/admin/content/${page.key}/${section.key}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300">{section.label}</span>
                      {isEdited && (
                        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
                          Edited
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Edit className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">
          How Content Management Works
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Content you edit here is stored in the database and can be dynamically loaded
          on your website pages. Each section contains structured data that corresponds
          to components on your live site.
        </p>
        <ul className="text-sm text-slate-400 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Changes are saved immediately and can be previewed
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            All changes are logged for audit purposes
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Previous versions can be restored if needed
          </li>
        </ul>
      </div>
    </div>
  );
}
