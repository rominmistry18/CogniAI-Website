"use client";

import Script from "next/script";

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CogniAI",
  "alternateName": "CogniAI by MedinovAI",
  "url": "https://www.cogniai.us",
  "logo": "https://www.cogniai.us/logo.png",
  "description": "Enterprise-grade AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development.",
  "parentOrganization": {
    "@type": "Organization",
    "name": "MedinovAI"
  },
  "foundingDate": "2024",
  "sameAs": [
    "https://www.linkedin.com/company/cogniai",
    "https://twitter.com/cogniai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@cogniai.us",
    "url": "https://www.cogniai.us/contact"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
};

// Software Application Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CogniAI",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Human Resources Software",
  "operatingSystem": "Web-based",
  "description": "AI-powered platform for skill assessment, talent acquisition, employee training, and workforce development. Features include AI screening, real-time proctoring, ATS, training programs, AI tutoring, and certifications.",
  "url": "https://www.cogniai.us",
  "provider": {
    "@type": "Organization",
    "name": "MedinovAI"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.cogniai.us/pricing"
  },
  "featureList": [
    "AI-Powered Screening with GPT-4, Claude, and Gemini",
    "Real-time Proctoring with YOLOv8 Detection",
    "Applicant Tracking System (ATS)",
    "AI Video Generation for Training",
    "Multi-Agent AI Tutoring",
    "Certification Program Management",
    "HR Policy Management",
    "Advanced Analytics Dashboard"
  ],
  "screenshot": "https://www.cogniai.us/screenshots/platform.png"
};

// WebSite Schema for sitelinks search
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CogniAI",
  "alternateName": "CogniAI by MedinovAI",
  "url": "https://www.cogniai.us",
  "description": "AI-powered platform for skill assessment, talent acquisition, and workforce development",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.cogniai.us/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function SchemaOrg() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

// FAQ Schema Component for FAQ pages
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

// Article Schema for research/blog pages
export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "CogniAI by MedinovAI",
      "url": "https://www.cogniai.us"
    },
    "url": url
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// HowTo Schema for guide pages
export function HowToSchema({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  );
}

// DefinedTerm Schema for glossary terms
export function DefinedTermSchema({
  term,
  definition,
  url
}: {
  term: string;
  definition: string;
  url: string;
}) {
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term,
    "description": definition,
    "url": url,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "CogniAI Glossary",
      "url": "https://www.cogniai.us/glossary"
    }
  };

  return (
    <Script
      id={`term-schema-${term.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
    />
  );
}
