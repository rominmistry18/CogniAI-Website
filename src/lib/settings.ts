import { db } from "@/db";

export interface SiteSettings {
  // Branding
  logo_url: string;
  logo_text: string;
  logo_tagline: string;
  favicon_url: string;
  admin_logo_url: string;
  og_image: string;
  
  // SEO
  site_title: string;
  site_description: string;
  site_keywords: string;
  
  // Company Info
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  
  // Social
  social_twitter: string;
  social_linkedin: string;
  social_facebook: string;
  social_instagram: string;
  
  // Features
  enable_blog: string;
  enable_careers: string;
  enable_contact_form: string;
  maintenance_mode: string;
}

const defaultSettings: SiteSettings = {
  // Branding
  logo_url: "",
  logo_text: "Cognaium",
  logo_tagline: "by MedinovAI",
  favicon_url: "",
  admin_logo_url: "",
  og_image: "",
  
  // SEO
  site_title: "Cognaium - AI-Powered Talent Management",
  site_description: "Transform your workforce with AI-powered skills mapping and talent management.",
  site_keywords: "AI, talent management, skills mapping, HR tech",
  
  // Company Info
  company_name: "Cognaium",
  company_email: "hello@cognaium.com",
  company_phone: "",
  company_address: "",
  
  // Social
  social_twitter: "",
  social_linkedin: "",
  social_facebook: "",
  social_instagram: "",
  
  // Features
  enable_blog: "true",
  enable_careers: "true",
  enable_contact_form: "true",
  maintenance_mode: "false",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await db.setting.findMany({
      where: {
        key: {
          in: Object.keys(defaultSettings),
        },
      },
    });

    // Merge database settings with defaults
    const settingsObject = { ...defaultSettings };
    
    for (const setting of settings) {
      if (setting.key in settingsObject) {
        // Parse JSON-stringified values from database
        try {
          const parsedValue = JSON.parse(setting.value);
          settingsObject[setting.key as keyof SiteSettings] = String(parsedValue);
        } catch {
          // If parsing fails, use raw value
          settingsObject[setting.key as keyof SiteSettings] = setting.value;
        }
      }
    }

    return settingsObject;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return defaultSettings;
  }
}

export async function getSetting(key: keyof SiteSettings): Promise<string> {
  try {
    const setting = await db.setting.findUnique({
      where: { key },
    });
    if (setting?.value) {
      // Parse JSON-stringified values from database
      try {
        const parsedValue = JSON.parse(setting.value);
        return String(parsedValue);
      } catch {
        return setting.value;
      }
    }
    return defaultSettings[key];
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return defaultSettings[key];
  }
}

// Check if a feature is enabled
export async function isFeatureEnabled(feature: "blog" | "careers" | "contact_form"): Promise<boolean> {
  const key = `enable_${feature}` as keyof SiteSettings;
  const value = await getSetting(key);
  return value === "true";
}

// Check if maintenance mode is enabled
export async function isMaintenanceMode(): Promise<boolean> {
  const value = await getSetting("maintenance_mode");
  return value === "true";
}
