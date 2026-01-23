import { getPageContent } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";
import { ContactContent } from "./ContactContent";

export const metadata = {
  title: "Contact - Cognaium by MedinovAI",
  description: "Get in touch with the Cognaium team. Request a demo, ask questions, or discuss your workforce development needs.",
};

export default async function ContactPage() {
  // Fetch contact page content and site settings from database
  const [content, settings] = await Promise.all([
    getPageContent("contact"),
    getSiteSettings(),
  ]);

  // Extract sections with proper typing
  const headerContent = content.header as {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  } | undefined;

  const infoContent = content.info as {
    email?: string;
    phone?: string;
    location?: string;
  } | undefined;

  const formContent = content.form_settings as {
    submitButtonText?: string;
    successMessage?: string;
  } | undefined;

  const demoContent = content.demo as {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
  } | undefined;

  const chatContent = content.chat as {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
  } | undefined;

  // Merge content with site settings for contact info
  const contactInfo = {
    email: infoContent?.email || settings.company_email,
    phone: infoContent?.phone || settings.company_phone,
    location: infoContent?.location || settings.company_address,
  };

  return (
    <ContactContent
      header={headerContent}
      info={contactInfo}
      form={formContent}
      demo={demoContent}
      chat={chatContent}
    />
  );
}
