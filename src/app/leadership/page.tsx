import { Leadership, Leader } from "@/components/Leadership";
import { CTA } from "@/components/CTA";
import { getPageContent } from "@/lib/content";

export const metadata = {
  title: "Leadership - Cognaium by MedinovAI",
  description: "Meet the visionary leaders driving innovation at Cognaium.",
};

export default async function LeadershipPage() {
  // Fetch all leadership page content from database with fallbacks
  const content = await getPageContent("leadership");

  // Extract sections with proper typing
  const headerContent = content.header as {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  } | undefined;

  const teamContent = content.team as {
    items?: Leader[];
  } | undefined;

  const ctaContent = content.cta as Record<string, unknown> | undefined;

  return (
    <div className="pt-16">
      <Leadership 
        header={headerContent}
        leaders={teamContent?.items}
      />
      <CTA content={ctaContent} />
    </div>
  );
}
