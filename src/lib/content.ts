import { db } from "@/db";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ContentSection {
  pageKey: string;
  sectionKey: string;
  contentData: Record<string, unknown>;
  updatedAt?: Date;
}

export interface HeroContent {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  primaryCtaLink?: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  highlights?: Array<{ icon: string; text: string }>;
  questionTypes?: string[];
}

export interface CTAContent {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface FeaturesContent {
  title?: string;
  subtitle?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface FAQContent {
  title?: string;
  items?: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
}

export interface AboutContent {
  title?: string;
  subtitle?: string;
  content?: string;
  mission?: string;
  vision?: string;
  values?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  milestones?: Array<{
    year: string;
    title: string;
    description: string;
  }>;
}

export interface PricingContent {
  title?: string;
  subtitle?: string;
  plans?: Array<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    ctaText?: string;
    ctaLink?: string;
  }>;
}

export interface LeadershipContent {
  title?: string;
  subtitle?: string;
  team?: Array<{
    name: string;
    role: string;
    bio?: string;
    image?: string;
    linkedin?: string;
    twitter?: string;
  }>;
}

// ============================================
// DEFAULT CONTENT
// ============================================

const defaultContent: Record<string, Record<string, Record<string, unknown>>> = {
  home: {
    hero: {
      badge: "Enterprise-Ready AI Platform",
      title: "Intelligent Skill Assessment For Modern Organizations",
      subtitle: "The complete AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development.",
      primaryCta: "Request a Demo",
      primaryCtaLink: "/contact",
      secondaryCta: "Explore Features",
      secondaryCtaLink: "/features",
    },
    cta: {
      title: "Ready to Transform Your Organization?",
      subtitle: "Join forward-thinking companies using AI to unlock workforce potential.",
      buttonText: "Get Started Today",
      buttonLink: "/contact",
    },
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to assess, develop, and grow your workforce.",
      items: [],
    },
  },
  about: {
    header: {
      title: "Intelligent Workforce Development",
      subtitle: "Building the future of skill assessment and talent development with AI-powered intelligence.",
    },
    mission: {
      title: "Our Mission",
      content: "To revolutionize how organizations assess and develop talent.",
    },
    values: {
      title: "Our Values",
      items: [],
    },
  },
  pricing: {
    header: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the plan that fits your organization's needs.",
    },
    plans: {
      items: [],
    },
  },
  features: {
    header: {
      title: "Powerful Features",
      subtitle: "Everything you need to transform your talent management.",
    },
  },
  faq: {
    header: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about Cognaium.",
    },
    questions: {
      items: [],
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
  },
};

// ============================================
// CONTENT FETCHING FUNCTIONS
// ============================================

/**
 * Fetch all content sections for a specific page
 */
export async function getPageContent(pageKey: string): Promise<Record<string, Record<string, unknown>>> {
  try {
    const content = await db.content.findMany({
      where: { pageKey },
    });

    // Start with defaults for this page
    const result: Record<string, Record<string, unknown>> = {
      ...(defaultContent[pageKey] || {}),
    };

    // Override with database content
    for (const section of content) {
      try {
        result[section.sectionKey] = JSON.parse(section.contentData);
      } catch {
        console.error(`Failed to parse content for ${pageKey}/${section.sectionKey}`);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error fetching page content for ${pageKey}:`, error);
    return defaultContent[pageKey] || {};
  }
}

/**
 * Fetch a specific section's content
 */
export async function getSectionContent<T = Record<string, unknown>>(
  pageKey: string,
  sectionKey: string
): Promise<T> {
  try {
    const content = await db.content.findFirst({
      where: { pageKey, sectionKey },
    });

    if (content) {
      try {
        return JSON.parse(content.contentData) as T;
      } catch {
        console.error(`Failed to parse content for ${pageKey}/${sectionKey}`);
      }
    }

    // Return default content
    const defaultSection = defaultContent[pageKey]?.[sectionKey] || {};
    return defaultSection as T;
  } catch (error) {
    console.error(`Error fetching section content for ${pageKey}/${sectionKey}:`, error);
    return (defaultContent[pageKey]?.[sectionKey] || {}) as T;
  }
}

/**
 * Check if content exists in database (useful for conditional rendering)
 */
export async function hasContent(pageKey: string, sectionKey?: string): Promise<boolean> {
  try {
    const count = await db.content.count({
      where: sectionKey ? { pageKey, sectionKey } : { pageKey },
    });
    return count > 0;
  } catch {
    return false;
  }
}

/**
 * Get content with merged defaults - ensures all expected fields exist
 */
export async function getContentWithDefaults<T extends Record<string, unknown>>(
  pageKey: string,
  sectionKey: string,
  additionalDefaults?: Partial<T>
): Promise<T> {
  const defaults = {
    ...(defaultContent[pageKey]?.[sectionKey] || {}),
    ...(additionalDefaults || {}),
  } as T;

  try {
    const content = await db.content.findFirst({
      where: { pageKey, sectionKey },
    });

    if (content) {
      try {
        const parsed = JSON.parse(content.contentData);
        return { ...defaults, ...parsed } as T;
      } catch {
        console.error(`Failed to parse content for ${pageKey}/${sectionKey}`);
      }
    }

    return defaults;
  } catch (error) {
    console.error(`Error fetching content for ${pageKey}/${sectionKey}:`, error);
    return defaults;
  }
}
