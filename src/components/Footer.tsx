import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { APP_VERSION } from "@/lib/version";
import { getSiteSettings } from "@/lib/settings";
import { getSectionContent } from "@/lib/content";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinks {
  product?: FooterLink[];
  company?: FooterLink[];
  resources?: FooterLink[];
  legal?: FooterLink[];
}

interface FooterBrand {
  description?: string;
}

// Default footer links - used when no database content is provided
const defaultFooterLinks: FooterLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Training", href: "/skill-library" },
    { label: "Support", href: "/support" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Research", href: "/research" },
    { label: "Glossary", href: "/glossary" },
    { label: "FAQ", href: "/faq" },
    { label: "Compare", href: "/compare/ai-vs-traditional-hiring" },
  ],
  legal: [
    { label: "Security", href: "/security" },
    { label: "Compliance", href: "/compliance" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const defaultBrand: FooterBrand = {
  description: "AI-powered platform for skill assessment, talent acquisition, and workforce development.",
};

export async function Footer() {
  // Fetch settings and footer content from database
  const [settings, linksContent, brandContent] = await Promise.all([
    getSiteSettings(),
    getSectionContent<FooterLinks>("global", "footer_links"),
    getSectionContent<FooterBrand>("global", "footer_brand"),
  ]);

  // Extract branding settings
  const branding = {
    logoUrl: settings.logo_url || undefined,
    logoText: settings.logo_text || "Cognaium",
    logoTagline: settings.logo_tagline || "by MedinovAI",
  };

  // Merge with defaults
  const footerLinks: FooterLinks = {
    product: linksContent?.product && linksContent.product.length > 0 ? linksContent.product : defaultFooterLinks.product,
    company: linksContent?.company && linksContent.company.length > 0 ? linksContent.company : defaultFooterLinks.company,
    resources: linksContent?.resources && linksContent.resources.length > 0 ? linksContent.resources : defaultFooterLinks.resources,
    legal: linksContent?.legal && linksContent.legal.length > 0 ? linksContent.legal : defaultFooterLinks.legal,
  };

  const brand = { ...defaultBrand, ...brandContent };
  
  // Build social links from settings
  const socialLinks = [
    settings.social_twitter && { icon: Twitter, href: settings.social_twitter, label: "Twitter" },
    settings.social_linkedin && { icon: Linkedin, href: settings.social_linkedin, label: "LinkedIn" },
    settings.company_email && { icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${settings.company_email}`, label: "Email" },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[];

  // If no social links are set, show default email
  if (socialLinks.length === 0) {
    socialLinks.push({ icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${settings.company_email || "hello@cognaium.com"}`, label: "Email" });
  }

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Logo 
                logoUrl={branding.logoUrl}
                logoText={branding.logoText}
                logoTagline={branding.logoTagline}
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              {brand.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings.company_name || "Cognaium"} by MedinovAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              v{APP_VERSION}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
