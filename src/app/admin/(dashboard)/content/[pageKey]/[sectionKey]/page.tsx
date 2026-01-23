"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface ContentData {
  [key: string]: unknown;
}

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const pageKey = params.pageKey as string;
  const sectionKey = params.sectionKey as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentData, setContentData] = useState<ContentData>({});
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/admin/content?pageKey=${pageKey}`);
        if (response.ok) {
          const data = await response.json();
          const section = data.content.find(
            (c: { sectionKey: string }) => c.sectionKey === sectionKey
          );
          if (section) {
            setContentData(section.contentData);
          } else {
            // Initialize with default structure based on section
            setContentData(getDefaultContent(pageKey, sectionKey));
          }
        }
      } catch (error) {
        toast.error("Failed to fetch content");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pageKey, sectionKey]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageKey,
          sectionKey,
          contentData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to save content");
        return;
      }

      // Mark this section as edited in sessionStorage
      try {
        const sectionId = `${pageKey}:${sectionKey}`;
        const stored = sessionStorage.getItem("content_edited_sections");
        const sections = stored ? JSON.parse(stored) as string[] : [];
        
        if (!sections.includes(sectionId)) {
          sections.push(sectionId);
          sessionStorage.setItem("content_edited_sections", JSON.stringify(sections));
          
          // Dispatch custom event for same-tab updates
          window.dispatchEvent(new CustomEvent("contentEdited"));
          
          // Dispatch storage event to update other tabs
          window.dispatchEvent(new StorageEvent("storage", {
            key: "content_edited_sections",
            newValue: JSON.stringify(sections),
          }));
        }
      } catch (error) {
        console.error("Failed to update sessionStorage:", error);
      }

      toast.success("Content saved successfully");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleJsonChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setContentData(parsed);
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  const updateField = (path: string, value: unknown) => {
    const keys = path.split(".");
    const newData = { ...contentData };
    let current: Record<string, unknown> = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
    setContentData(newData);
  };

  const addArrayItem = (path: string, template: unknown) => {
    const keys = path.split(".");
    const newData = { ...contentData };
    let current: Record<string, unknown> = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] as Record<string, unknown>;
    }

    const arr = (current[keys[keys.length - 1]] as unknown[]) || [];
    current[keys[keys.length - 1]] = [...arr, template];
    setContentData(newData);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split(".");
    const newData = { ...contentData };
    let current: Record<string, unknown> = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] as Record<string, unknown>;
    }

    const arr = (current[keys[keys.length - 1]] as unknown[]) || [];
    current[keys[keys.length - 1]] = arr.filter((_, i) => i !== index);
    setContentData(newData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pageLabel = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);
  const sectionLabel = sectionKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/content")}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <span>{pageLabel} Page</span>
              <span>/</span>
              <span>{sectionLabel}</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Edit {sectionLabel}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setJsonMode(!jsonMode)}
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            {jsonMode ? "Visual Editor" : "JSON Editor"}
          </Button>
          <Button
            variant="outline"
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !!jsonError}
            className="bg-primary hover:bg-primary/90"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        {jsonMode ? (
          <div className="space-y-2">
            <Label className="text-slate-300">JSON Content</Label>
            <Textarea
              value={JSON.stringify(contentData, null, 2)}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white font-mono min-h-[400px]"
            />
            {jsonError && (
              <p className="text-red-400 text-sm">{jsonError}</p>
            )}
          </div>
        ) : (
          <ContentForm
            contentData={contentData}
            pageKey={pageKey}
            sectionKey={sectionKey}
            updateField={updateField}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        )}
      </div>
    </div>
  );
}

function ContentForm({
  contentData,
  pageKey,
  sectionKey,
  updateField,
  addArrayItem,
  removeArrayItem,
}: {
  contentData: ContentData;
  pageKey: string;
  sectionKey: string;
  updateField: (path: string, value: unknown) => void;
  addArrayItem: (path: string, template: unknown) => void;
  removeArrayItem: (path: string, index: number) => void;
}) {
  // Render form based on section type
  const fields = getFieldsForSection(pageKey, sectionKey);

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <Label className="text-slate-300">{field.label}</Label>
          {field.type === "text" && (
            <Input
              value={(contentData[field.key] as string) || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
          )}
          {field.type === "textarea" && (
            <Textarea
              value={(contentData[field.key] as string) || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="bg-slate-900/50 border-slate-600 text-white min-h-[100px]"
            />
          )}
          {field.type === "array" && (
            <div className="space-y-3">
              {((contentData[field.key] as unknown[]) || []).map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Item {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem(field.key, index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {field.itemFields?.map((itemField) => (
                    <div key={itemField.key} className="space-y-1">
                      <Label className="text-slate-400 text-sm">{itemField.label}</Label>
                      {itemField.type === "text" && (
                        <Input
                          value={((item as Record<string, unknown>)[itemField.key] as string) || ""}
                          onChange={(e) => {
                            const newItem = { ...(item as Record<string, unknown>), [itemField.key]: e.target.value };
                            const arr = [...((contentData[field.key] as unknown[]) || [])];
                            arr[index] = newItem;
                            updateField(field.key, arr);
                          }}
                          placeholder={itemField.placeholder}
                          className="bg-slate-800/50 border-slate-600 text-white"
                        />
                      )}
                      {itemField.type === "textarea" && (
                        <Textarea
                          value={((item as Record<string, unknown>)[itemField.key] as string) || ""}
                          onChange={(e) => {
                            const newItem = { ...(item as Record<string, unknown>), [itemField.key]: e.target.value };
                            const arr = [...((contentData[field.key] as unknown[]) || [])];
                            arr[index] = newItem;
                            updateField(field.key, arr);
                          }}
                          placeholder={itemField.placeholder}
                          className="bg-slate-800/50 border-slate-600 text-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem(field.key, field.itemTemplate || {})}
                className="w-full bg-slate-900/50 border-slate-700 border-dashed text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {field.itemLabel || "Item"}
              </Button>
            </div>
          )}
          {field.description && (
            <p className="text-xs text-slate-500">{field.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "array";
  placeholder?: string;
  description?: string;
  itemLabel?: string;
  itemTemplate?: Record<string, unknown>;
  itemFields?: { key: string; label: string; type: "text" | "textarea"; placeholder?: string }[];
}

function getFieldsForSection(pageKey: string, sectionKey: string): FieldConfig[] {
  // Define fields for different sections
  const configs: Record<string, Record<string, FieldConfig[]>> = {
    home: {
      hero: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "e.g., AI-Powered Platform" },
        { key: "title", label: "Main Title", type: "text", placeholder: "Your headline here" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Highlighted part of title" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Supporting text" },
        { key: "primaryCta", label: "Primary CTA Text", type: "text", placeholder: "Get Started" },
        { key: "primaryCtaLink", label: "Primary CTA Link", type: "text", placeholder: "/contact" },
        { key: "secondaryCta", label: "Secondary CTA Text", type: "text", placeholder: "Learn More" },
        { key: "secondaryCtaLink", label: "Secondary CTA Link", type: "text", placeholder: "/features" },
      ],
      problems_header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "The Challenge" },
        { key: "title", label: "Title", type: "text", placeholder: "Traditional Methods" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Are Failing Organizations" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      problems: [
        {
          key: "items",
          label: "Problems",
          type: "array",
          itemLabel: "Problem",
          itemTemplate: { icon: "Users", title: "", description: "", stat: "", statLabel: "" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Users, Clock, TrendingDown" },
            { key: "title", label: "Title", type: "text", placeholder: "Problem title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Problem description" },
            { key: "stat", label: "Statistic", type: "text", placeholder: "65%" },
            { key: "statLabel", label: "Stat Label", type: "text", placeholder: "of hires fail" },
          ],
        },
      ],
      solutions_header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "The Cognaium Solution" },
        { key: "title", label: "Title", type: "text", placeholder: "AI-Powered Intelligence" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "For Every Stage" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      solutions: [
        {
          key: "items",
          label: "Solutions",
          type: "array",
          itemLabel: "Solution",
          itemTemplate: { icon: "Brain", title: "", description: "", features: [] },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Brain, Target, Zap" },
            { key: "title", label: "Title", type: "text", placeholder: "Solution title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Solution description" },
          ],
        },
      ],
      problem_solution_stats: [
        {
          key: "items",
          label: "Stats",
          type: "array",
          itemLabel: "Stat",
          itemTemplate: { value: "", label: "" },
          itemFields: [
            { key: "value", label: "Value", type: "text", placeholder: "60%" },
            { key: "label", label: "Label", type: "text", placeholder: "Faster Hiring" },
          ],
        },
      ],
      features_header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Platform Capabilities" },
        { key: "title", label: "Title", type: "text", placeholder: "Everything You Need for" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Workforce Excellence" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      features: [
        {
          key: "items",
          label: "Features",
          type: "array",
          itemLabel: "Feature",
          itemTemplate: { id: "", title: "", description: "", icon: "", color: "" },
          itemFields: [
            { key: "id", label: "ID", type: "text", placeholder: "ai-screening" },
            { key: "title", label: "Title", type: "text", placeholder: "Feature title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Feature description" },
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Brain, Eye, Briefcase" },
            { key: "color", label: "Color Gradient", type: "text", placeholder: "from-violet-500 to-purple-600" },
          ],
        },
      ],
      quick_features: [
        {
          key: "items",
          label: "Quick Features",
          type: "array",
          itemLabel: "Feature",
          itemTemplate: { icon: "", title: "", desc: "" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Shield, Settings" },
            { key: "title", label: "Title", type: "text", placeholder: "Feature title" },
            { key: "desc", label: "Description", type: "text", placeholder: "Brief description" },
          ],
        },
      ],
      journeys_header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Industry Solutions" },
        { key: "title", label: "Title", type: "text", placeholder: "Tailored for Your" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Organization" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      journeys: [
        {
          key: "items",
          label: "Industry Solutions",
          type: "array",
          itemLabel: "Solution",
          itemTemplate: { icon: "", title: "", subtitle: "", description: "", cta: "", color: "" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Building2, Users, Heart" },
            { key: "title", label: "Title", type: "text", placeholder: "For Enterprises" },
            { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Scale Your Workforce" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Solution description" },
            { key: "cta", label: "CTA Text", type: "text", placeholder: "Enterprise Solutions" },
            { key: "color", label: "Color Gradient", type: "text", placeholder: "from-violet-500 to-purple-600" },
          ],
        },
      ],
      trust_header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Enterprise Security" },
        { key: "title", label: "Title", type: "text", placeholder: "Security by Design" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Privacy by Default" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      security_features: [
        {
          key: "items",
          label: "Security Features",
          type: "array",
          itemLabel: "Feature",
          itemTemplate: { icon: "", title: "", description: "" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Database, Lock, Users" },
            { key: "title", label: "Title", type: "text", placeholder: "Feature title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Feature description" },
          ],
        },
      ],
      certifications: [
        {
          key: "items",
          label: "Certifications",
          type: "array",
          itemLabel: "Certification",
          itemTemplate: { icon: "", title: "", description: "" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Shield, CheckCircle2, Globe" },
            { key: "title", label: "Title", type: "text", placeholder: "HIPAA Ready" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Certification description" },
          ],
        },
      ],
      trust_stats: [
        {
          key: "items",
          label: "Stats",
          type: "array",
          itemLabel: "Stat",
          itemTemplate: { value: "", label: "" },
          itemFields: [
            { key: "value", label: "Value", type: "text", placeholder: "AES-256" },
            { key: "label", label: "Label", type: "text", placeholder: "Encryption" },
          ],
        },
      ],
      leadership_header: [
        { key: "title", label: "Title", type: "text", placeholder: "Visionary" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Leadership" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Description text" },
      ],
      leaders: [
        {
          key: "items",
          label: "Leaders",
          type: "array",
          itemLabel: "Leader",
          itemTemplate: { name: "", role: "", type: "", image: "", qualifications: "", experience: "" },
          itemFields: [
            { key: "name", label: "Name", type: "text", placeholder: "John Doe" },
            { key: "role", label: "Role", type: "text", placeholder: "CEO" },
            { key: "type", label: "Type", type: "text", placeholder: "Executive Leadership" },
            { key: "image", label: "Image URL", type: "text", placeholder: "https://..." },
            { key: "qualifications", label: "Qualifications", type: "text", placeholder: "MBA, PhD" },
            { key: "experience", label: "Experience", type: "text", placeholder: "20+ Years" },
          ],
        },
      ],
      cta: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Get Started Today" },
        { key: "title", label: "CTA Title", type: "text", placeholder: "Ready to get started?" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Your Workforce?" },
        { key: "subtitle", label: "CTA Subtitle", type: "textarea", placeholder: "Supporting text" },
        { key: "primaryCta", label: "Primary Button Text", type: "text", placeholder: "Start Free Trial" },
        { key: "primaryCtaLink", label: "Primary Button Link", type: "text", placeholder: "/signup" },
        { key: "secondaryCta", label: "Secondary Button Text", type: "text", placeholder: "Schedule a Demo" },
        { key: "secondaryCtaLink", label: "Secondary Button Link", type: "text", placeholder: "/contact" },
      ],
    },
    about: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "About Us" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Our mission and vision" },
      ],
      mission: [
        { key: "title", label: "Mission Title", type: "text", placeholder: "Our Mission" },
        { key: "content", label: "Mission Statement", type: "textarea", placeholder: "We believe..." },
      ],
      values: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Our Values" },
        {
          key: "items",
          label: "Values",
          type: "array",
          itemLabel: "Value",
          itemTemplate: { title: "", description: "", icon: "Brain" },
          itemFields: [
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Brain, Shield, Users, Zap" },
            { key: "title", label: "Title", type: "text", placeholder: "Value title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Value description" },
          ],
        },
      ],
      journey: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Our Journey" },
        {
          key: "items",
          label: "Milestones",
          type: "array",
          itemLabel: "Milestone",
          itemTemplate: { year: "", title: "", description: "" },
          itemFields: [
            { key: "year", label: "Year/Stage", type: "text", placeholder: "2023" },
            { key: "title", label: "Title", type: "text", placeholder: "Milestone title" },
            { key: "description", label: "Description", type: "textarea", placeholder: "What happened" },
          ],
        },
      ],
    },
    features: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Platform Features" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Discover our capabilities" },
      ],
    },
    leadership: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Our Leadership" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Meet the team" },
      ],
      team: [
        {
          key: "items",
          label: "Team Members",
          type: "array",
          itemLabel: "Member",
          itemTemplate: { name: "", role: "", bio: "", image: "", linkedin: "", twitter: "" },
          itemFields: [
            { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { key: "role", label: "Role/Title", type: "text", placeholder: "CEO" },
            { key: "bio", label: "Bio", type: "textarea", placeholder: "Brief biography" },
            { key: "image", label: "Image URL", type: "text", placeholder: "/images/team/john.jpg" },
            { key: "linkedin", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/in/..." },
            { key: "twitter", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/..." },
          ],
        },
      ],
      advisors: [
        {
          key: "items",
          label: "Advisors",
          type: "array",
          itemLabel: "Advisor",
          itemTemplate: { name: "", role: "", bio: "", image: "" },
          itemFields: [
            { key: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
            { key: "role", label: "Role/Expertise", type: "text", placeholder: "Board Advisor" },
            { key: "bio", label: "Bio", type: "textarea", placeholder: "Brief biography" },
            { key: "image", label: "Image URL", type: "text", placeholder: "/images/advisors/jane.jpg" },
          ],
        },
      ],
    },
    glossary: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Glossary" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Industry terms and definitions" },
      ],
      terms: [
        {
          key: "items",
          label: "Glossary Terms",
          type: "array",
          itemLabel: "Term",
          itemTemplate: { term: "", definition: "", category: "" },
          itemFields: [
            { key: "term", label: "Term", type: "text", placeholder: "AI Screening" },
            { key: "definition", label: "Definition", type: "textarea", placeholder: "Definition of the term" },
            { key: "category", label: "Category", type: "text", placeholder: "AI, HR, Assessment" },
          ],
        },
      ],
    },
    research: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Research" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Latest research and insights" },
      ],
      articles: [
        {
          key: "items",
          label: "Research Articles",
          type: "array",
          itemLabel: "Article",
          itemTemplate: { title: "", summary: "", link: "", date: "", category: "" },
          itemFields: [
            { key: "title", label: "Article Title", type: "text", placeholder: "Research paper title" },
            { key: "summary", label: "Summary", type: "textarea", placeholder: "Brief summary" },
            { key: "link", label: "Link/URL", type: "text", placeholder: "/research/article-slug" },
            { key: "date", label: "Publication Date", type: "text", placeholder: "2024-01-15" },
            { key: "category", label: "Category", type: "text", placeholder: "AI, Hiring, Training" },
          ],
        },
      ],
    },
    skill_library: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Skill Library" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Explore our training content" },
      ],
      categories: [
        {
          key: "items",
          label: "Skill Categories",
          type: "array",
          itemLabel: "Category",
          itemTemplate: { name: "", description: "", icon: "", skillCount: 0 },
          itemFields: [
            { key: "name", label: "Category Name", type: "text", placeholder: "Technical Skills" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Category description" },
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Code, Brain, etc." },
          ],
        },
      ],
    },
    support: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Support" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "How can we help?" },
      ],
      categories: [
        {
          key: "items",
          label: "Help Categories",
          type: "array",
          itemLabel: "Category",
          itemTemplate: { name: "", description: "", icon: "", articleCount: 0 },
          itemFields: [
            { key: "name", label: "Category Name", type: "text", placeholder: "Getting Started" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Category description" },
            { key: "icon", label: "Icon Name", type: "text", placeholder: "BookOpen, Settings" },
          ],
        },
      ],
      contact: [
        { key: "email", label: "Support Email", type: "text", placeholder: "support@cognaium.com" },
        { key: "phone", label: "Support Phone", type: "text", placeholder: "+1 (555) 123-4567" },
        { key: "hours", label: "Support Hours", type: "text", placeholder: "Mon-Fri, 9am-6pm EST" },
      ],
    },
    compliance: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Compliance" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Our certifications and standards" },
      ],
      certifications: [
        {
          key: "items",
          label: "Certifications",
          type: "array",
          itemLabel: "Certification",
          itemTemplate: { name: "", description: "", icon: "", badge: "" },
          itemFields: [
            { key: "name", label: "Certification Name", type: "text", placeholder: "SOC 2 Type II" },
            { key: "description", label: "Description", type: "textarea", placeholder: "What this certification means" },
            { key: "badge", label: "Badge Image URL", type: "text", placeholder: "/images/badges/soc2.png" },
          ],
        },
      ],
    },
    legal: {
      privacy_policy: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Privacy Policy" },
        { key: "lastUpdated", label: "Last Updated", type: "text", placeholder: "January 15, 2024" },
        { key: "content", label: "Policy Content (HTML)", type: "textarea", placeholder: "Full privacy policy text..." },
      ],
      terms_of_service: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Terms of Service" },
        { key: "lastUpdated", label: "Last Updated", type: "text", placeholder: "January 15, 2024" },
        { key: "content", label: "Terms Content (HTML)", type: "textarea", placeholder: "Full terms of service..." },
      ],
      cookie_policy: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Cookie Policy" },
        { key: "lastUpdated", label: "Last Updated", type: "text", placeholder: "January 15, 2024" },
        { key: "content", label: "Policy Content (HTML)", type: "textarea", placeholder: "Full cookie policy..." },
      ],
    },
    contact: {
      header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Get in Touch" },
        { key: "title", label: "Page Title", type: "text", placeholder: "Let's Start a" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "Conversation" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Get in touch with our team" },
      ],
      info: [
        { key: "email", label: "Contact Email", type: "text", placeholder: "hello@cognaium.com" },
        { key: "phone", label: "Phone Number", type: "text", placeholder: "+1 (555) 123-4567" },
        { key: "location", label: "Location", type: "text", placeholder: "San Francisco, CA" },
      ],
      form_settings: [
        { key: "submitButtonText", label: "Submit Button Text", type: "text", placeholder: "Send Message" },
        { key: "successMessage", label: "Success Message", type: "textarea", placeholder: "Thank you for contacting us!" },
      ],
      demo: [
        { key: "title", label: "Title", type: "text", placeholder: "Schedule a Demo" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "30-minute personalized walkthrough" },
        { key: "description", label: "Description", type: "textarea", placeholder: "See the platform in action..." },
        { key: "buttonText", label: "Button Text", type: "text", placeholder: "Book a Time" },
      ],
      chat: [
        { key: "title", label: "Title", type: "text", placeholder: "Live Chat" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Available Mon-Fri, 9am-6pm PST" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Get instant answers..." },
        { key: "buttonText", label: "Button Text", type: "text", placeholder: "Start Chat" },
      ],
    },
    faq: {
      header: [
        { key: "title", label: "Page Title", type: "text", placeholder: "Frequently Asked Questions" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Find answers to common questions" },
        { key: "lastUpdated", label: "Last Updated", type: "text", placeholder: "January 22, 2026" },
      ],
      categories: [
        {
          key: "items",
          label: "FAQ Categories",
          type: "array",
          itemLabel: "Category",
          itemTemplate: { id: "", name: "", icon: "" },
          itemFields: [
            { key: "id", label: "Category ID", type: "text", placeholder: "general" },
            { key: "name", label: "Category Name", type: "text", placeholder: "General" },
            { key: "icon", label: "Icon Name", type: "text", placeholder: "HelpCircle" },
          ],
        },
      ],
      support: [
        { key: "title", label: "Title", type: "text", placeholder: "Still Have Questions?" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Our team is here to help..." },
        { key: "primaryCta", label: "Primary CTA", type: "text", placeholder: "Contact Support" },
        { key: "primaryCtaLink", label: "Primary CTA Link", type: "text", placeholder: "/contact" },
        { key: "secondaryCta", label: "Secondary CTA", type: "text", placeholder: "Visit Help Center" },
        { key: "secondaryCtaLink", label: "Secondary CTA Link", type: "text", placeholder: "/support" },
      ],
    },
    pricing: {
      header: [
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Simple, Transparent Pricing" },
        { key: "title", label: "Page Title", type: "text", placeholder: "Plans That Scale" },
        { key: "titleHighlight", label: "Title Highlight", type: "text", placeholder: "With Your Organization" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Start free for 14 days..." },
      ],
      plans: [
        {
          key: "items",
          label: "Pricing Plans",
          type: "array",
          itemLabel: "Plan",
          itemTemplate: { name: "", description: "", highlighted: false, cta: "" },
          itemFields: [
            { key: "name", label: "Plan Name", type: "text", placeholder: "Professional" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Perfect for growing teams" },
            { key: "cta", label: "CTA Text", type: "text", placeholder: "Start Free Trial" },
          ],
        },
      ],
      addons: [
        {
          key: "items",
          label: "Add-ons",
          type: "array",
          itemLabel: "Add-on",
          itemTemplate: { name: "", price: "", description: "", icon: "" },
          itemFields: [
            { key: "name", label: "Name", type: "text", placeholder: "Additional Users" },
            { key: "price", label: "Price", type: "text", placeholder: "$15/user/month" },
            { key: "description", label: "Description", type: "textarea", placeholder: "Add more team members" },
            { key: "icon", label: "Icon Name", type: "text", placeholder: "Users" },
          ],
        },
      ],
      comparison: [
        {
          key: "items",
          label: "Comparison Rows",
          type: "array",
          itemLabel: "Row",
          itemTemplate: { feature: "", starter: "", pro: "", enterprise: "" },
          itemFields: [
            { key: "feature", label: "Feature", type: "text", placeholder: "Assessments/month" },
            { key: "starter", label: "Starter", type: "text", placeholder: "100" },
            { key: "pro", label: "Professional", type: "text", placeholder: "1,000" },
            { key: "enterprise", label: "Enterprise", type: "text", placeholder: "Unlimited" },
          ],
        },
      ],
      faq: [
        {
          key: "items",
          label: "Pricing FAQ",
          type: "array",
          itemLabel: "Question",
          itemTemplate: { q: "", a: "" },
          itemFields: [
            { key: "q", label: "Question", type: "text", placeholder: "What's included in the free trial?" },
            { key: "a", label: "Answer", type: "textarea", placeholder: "Full access to all features..." },
          ],
        },
      ],
      cta: [
        { key: "title", label: "Title", type: "text", placeholder: "Ready to Get Started?" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Start your free trial today..." },
        { key: "primaryCta", label: "Primary CTA", type: "text", placeholder: "Start Free Trial" },
        { key: "primaryCtaLink", label: "Primary CTA Link", type: "text", placeholder: "/login" },
        { key: "secondaryCta", label: "Secondary CTA", type: "text", placeholder: "Schedule Demo" },
        { key: "secondaryCtaLink", label: "Secondary CTA Link", type: "text", placeholder: "/contact" },
      ],
    },
    global: {
      footer_brand: [
        { key: "description", label: "Footer Description", type: "textarea", placeholder: "AI-powered platform for skill assessment..." },
      ],
      footer_links: [
        {
          key: "product",
          label: "Product Links",
          type: "array",
          itemLabel: "Link",
          itemTemplate: { label: "", href: "" },
          itemFields: [
            { key: "label", label: "Label", type: "text", placeholder: "Features" },
            { key: "href", label: "URL", type: "text", placeholder: "/features" },
          ],
        },
        {
          key: "company",
          label: "Company Links",
          type: "array",
          itemLabel: "Link",
          itemTemplate: { label: "", href: "" },
          itemFields: [
            { key: "label", label: "Label", type: "text", placeholder: "About" },
            { key: "href", label: "URL", type: "text", placeholder: "/about" },
          ],
        },
        {
          key: "resources",
          label: "Resources Links",
          type: "array",
          itemLabel: "Link",
          itemTemplate: { label: "", href: "" },
          itemFields: [
            { key: "label", label: "Label", type: "text", placeholder: "FAQ" },
            { key: "href", label: "URL", type: "text", placeholder: "/faq" },
          ],
        },
        {
          key: "legal",
          label: "Legal Links",
          type: "array",
          itemLabel: "Link",
          itemTemplate: { label: "", href: "" },
          itemFields: [
            { key: "label", label: "Label", type: "text", placeholder: "Privacy" },
            { key: "href", label: "URL", type: "text", placeholder: "/privacy" },
          ],
        },
      ],
    },
  };

  // Default fields for any section
  const defaultFields: FieldConfig[] = [
    { key: "title", label: "Title", type: "text", placeholder: "Section title" },
    { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Section subtitle or description" },
    { key: "content", label: "Content", type: "textarea", placeholder: "Main content" },
  ];

  return configs[pageKey]?.[sectionKey] || defaultFields;
}

function getDefaultContent(pageKey: string, sectionKey: string): ContentData {
  const defaults: Record<string, Record<string, ContentData>> = {
    home: {
      hero: {
        badge: "Enterprise-Ready AI Platform",
        title: "Intelligent Skill Assessment",
        titleHighlight: "For Modern Organizations",
        subtitle: "The complete AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development.",
        primaryCta: "Request a Demo",
        primaryCtaLink: "/contact",
        secondaryCta: "Explore Features",
        secondaryCtaLink: "/features",
      },
      problems_header: {
        badge: "The Challenge",
        title: "Traditional Methods",
        titleHighlight: "Are Failing Organizations",
        subtitle: "Manual processes, disconnected tools, and lack of AI-powered insights are costing organizations time, money, and talent.",
      },
      problems: { items: [] },
      solutions_header: {
        badge: "The Cognaium Solution",
        title: "AI-Powered Intelligence",
        titleHighlight: "For Every Stage",
        subtitle: "From hiring to development, Cognaium brings intelligent automation and actionable insights to your entire talent lifecycle.",
      },
      solutions: { items: [] },
      problem_solution_stats: { items: [] },
      features_header: {
        badge: "Platform Capabilities",
        title: "Everything You Need for",
        titleHighlight: "Workforce Excellence",
        subtitle: "A comprehensive suite of AI-powered tools for assessment, hiring, training, and employee development.",
      },
      features: { items: [] },
      quick_features: { items: [] },
      journeys_header: {
        badge: "Industry Solutions",
        title: "Tailored for Your",
        titleHighlight: "Organization",
        subtitle: "Cognaium adapts to your industry needs with specialized workflows, compliance features, and domain-specific capabilities.",
      },
      journeys: { items: [] },
      trust_header: {
        badge: "Enterprise Security",
        title: "Security by Design",
        titleHighlight: "Privacy by Default",
        subtitle: "Built on zero-trust architecture with enterprise-grade security controls and compliance frameworks.",
      },
      security_features: { items: [] },
      certifications: { items: [] },
      trust_stats: { items: [] },
      leadership_header: {
        title: "Visionary",
        titleHighlight: "Leadership",
        subtitle: "Meet the driving force behind Cognaium by MedinovAI's mission to revolutionize workforce intelligence.",
      },
      leaders: { items: [] },
      cta: {
        badge: "Get Started Today",
        title: "Ready to Transform",
        titleHighlight: "Your Workforce?",
        subtitle: "Join leading organizations using Cognaium for intelligent skill assessment, hiring, and employee development.",
        primaryCta: "Start Free Trial",
        primaryCtaLink: "/login",
        secondaryCta: "Schedule a Demo",
        secondaryCtaLink: "/contact",
      },
    },
    about: {
      header: {
        title: "Intelligent Workforce Development",
        subtitle: "Building the future of skill assessment and talent development with AI-powered intelligence.",
      },
      mission: {
        title: "Our Mission",
        content: "To revolutionize how organizations assess and develop talent through AI-powered intelligence.",
      },
      values: {
        title: "Our Values",
        items: [],
      },
      journey: {
        title: "Our Journey",
        items: [],
      },
    },
    features: {
      header: {
        title: "Platform Features",
        subtitle: "Discover the complete suite of AI-powered tools for skill assessment, hiring, training, and workforce development.",
      },
    },
    pricing: {
      header: {
        badge: "Simple, Transparent Pricing",
        title: "Plans That Scale",
        titleHighlight: "With Your Organization",
        subtitle: "Start free for 14 days. No credit card required. Upgrade as you grow.",
      },
      plans: { items: [] },
      addons: { items: [] },
      comparison: { items: [] },
      faq: { items: [] },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Start your free trial today or schedule a demo to see Cognaium in action.",
        primaryCta: "Start Free Trial",
        primaryCtaLink: "/login",
        secondaryCta: "Schedule Demo",
        secondaryCtaLink: "/contact",
      },
    },
    faq: {
      header: {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about Cognaium's AI-powered skill assessment platform.",
        lastUpdated: "January 22, 2026",
      },
      categories: { items: [] },
      support: {
        title: "Still Have Questions?",
        subtitle: "Our team is here to help. Contact us for personalized assistance.",
        primaryCta: "Contact Support",
        primaryCtaLink: "/contact",
        secondaryCta: "Visit Help Center",
        secondaryCtaLink: "/support",
      },
    },
    leadership: {
      header: {
        title: "Our Leadership",
        subtitle: "Meet the team driving innovation in workforce development.",
      },
      team: {
        items: [],
      },
      advisors: {
        items: [],
      },
    },
    glossary: {
      header: {
        title: "Glossary",
        subtitle: "Industry terms and definitions.",
      },
      terms: {
        items: [],
      },
    },
    research: {
      header: {
        title: "Research",
        subtitle: "Latest research and insights in workforce development.",
      },
      articles: {
        items: [],
      },
    },
    skill_library: {
      header: {
        title: "Skill Library",
        subtitle: "Explore our comprehensive training content.",
      },
      categories: {
        items: [],
      },
    },
    support: {
      header: {
        title: "Support",
        subtitle: "How can we help you?",
      },
      categories: {
        items: [],
      },
      contact: {
        email: "support@cognaium.com",
        phone: "",
        hours: "Mon-Fri, 9am-6pm EST",
      },
    },
    compliance: {
      header: {
        title: "Compliance",
        subtitle: "Our certifications and security standards.",
      },
      certifications: {
        items: [],
      },
    },
    legal: {
      privacy_policy: {
        title: "Privacy Policy",
        lastUpdated: "",
        content: "",
      },
      terms_of_service: {
        title: "Terms of Service",
        lastUpdated: "",
        content: "",
      },
      cookie_policy: {
        title: "Cookie Policy",
        lastUpdated: "",
        content: "",
      },
    },
    contact: {
      header: {
        badge: "Get in Touch",
        title: "Let's Start a",
        titleHighlight: "Conversation",
        subtitle: "Request a demo, ask questions, or discuss how Cognaium by MedinovAI can transform your workforce development.",
      },
      info: {
        email: "hello@cognaium.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
      },
      form_settings: {
        submitButtonText: "Send Message",
        successMessage: "Thank you for reaching out. A member of the Cognaium team will contact you shortly.",
      },
      demo: {
        title: "Schedule a Demo",
        subtitle: "30-minute personalized walkthrough",
        description: "See the platform in action with a personalized demo tailored to your organization's needs.",
        buttonText: "Book a Time",
      },
      chat: {
        title: "Live Chat",
        subtitle: "Available Mon-Fri, 9am-6pm PST",
        description: "Get instant answers from our support team through live chat.",
        buttonText: "Start Chat",
      },
    },
    global: {
      footer_brand: {
        description: "AI-powered platform for skill assessment, talent acquisition, and workforce development.",
      },
      footer_links: {
        product: [],
        company: [],
        resources: [],
        legal: [],
      },
    },
  };

  return defaults[pageKey]?.[sectionKey] || { title: "", subtitle: "", content: "" };
}
