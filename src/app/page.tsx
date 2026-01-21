import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { Journeys } from "@/components/Journeys";
import { TrustSecurity } from "@/components/TrustSecurity";
import { Leadership } from "@/components/Leadership";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <FeatureShowcase />
      <Journeys />
      <TrustSecurity />
      <Leadership />
      <CTA />
    </>
  );
}
