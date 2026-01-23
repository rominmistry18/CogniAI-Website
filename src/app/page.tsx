import { Hero } from "@/components/Hero";
import { ProblemSolution, Problem, Solution } from "@/components/ProblemSolution";
import { FeatureShowcase, Feature, QuickFeature } from "@/components/FeatureShowcase";
import { Journeys, Journey } from "@/components/Journeys";
import { TrustSecurity, SecurityFeature, Certification } from "@/components/TrustSecurity";
import { Leadership, Leader } from "@/components/Leadership";
import { CTA } from "@/components/CTA";
import { getPageContent } from "@/lib/content";

export default async function Home() {
  // Fetch all home page content from database with fallbacks
  const content = await getPageContent("home");

  // Extract sections with proper typing
  const problemSolutionContent = {
    problemsHeader: content.problems_header as {
      badge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    problems: (content.problems as { items?: Problem[] })?.items,
    solutionsHeader: content.solutions_header as {
      badge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    solutions: (content.solutions as { items?: Solution[] })?.items,
    stats: (content.problem_solution_stats as { items?: Array<{ value: string; label: string }> })?.items,
  };

  const featureShowcaseContent = {
    header: content.features_header as {
      badge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    features: (content.features as { items?: Feature[] })?.items,
    quickFeatures: (content.quick_features as { items?: QuickFeature[] })?.items,
  };

  const journeysContent = {
    header: content.journeys_header as {
      badge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    journeys: (content.journeys as { items?: Journey[] })?.items,
  };

  const trustSecurityContent = {
    header: content.trust_header as {
      badge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    securityFeatures: (content.security_features as { items?: SecurityFeature[] })?.items,
    certifications: (content.certifications as { items?: Certification[] })?.items,
    stats: (content.trust_stats as { items?: Array<{ value: string; label: string }> })?.items,
  };

  const leadershipContent = {
    header: content.leadership_header as {
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
    } | undefined,
    leaders: (content.leaders as { items?: Leader[] })?.items,
  };

  return (
    <>
      <Hero content={content.hero} />
      <ProblemSolution 
        problemsHeader={problemSolutionContent.problemsHeader}
        problems={problemSolutionContent.problems}
        solutionsHeader={problemSolutionContent.solutionsHeader}
        solutions={problemSolutionContent.solutions}
        stats={problemSolutionContent.stats}
      />
      <FeatureShowcase 
        header={featureShowcaseContent.header}
        features={featureShowcaseContent.features}
        quickFeatures={featureShowcaseContent.quickFeatures}
      />
      <Journeys 
        header={journeysContent.header}
        journeys={journeysContent.journeys}
      />
      <TrustSecurity 
        header={trustSecurityContent.header}
        securityFeatures={trustSecurityContent.securityFeatures}
        certifications={trustSecurityContent.certifications}
        stats={trustSecurityContent.stats}
      />
      <Leadership 
        header={leadershipContent.header}
        leaders={leadershipContent.leaders}
      />
      <CTA content={content.cta} />
    </>
  );
}
