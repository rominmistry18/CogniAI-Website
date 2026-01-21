import { Leadership } from "@/components/Leadership";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Leadership - CogniAI by medinovAI",
  description: "Meet the visionary leaders driving innovation at CogniAI.",
};

export default function LeadershipPage() {
  return (
    <div className="pt-16">
      <Leadership />
      <CTA />
    </div>
  );
}
