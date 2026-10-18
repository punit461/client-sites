import type { Metadata } from "next";
import AchievementsGrid from "@/components/sections/AchievementsGrid";
import AdmissionsCta from "@/components/sections/AdmissionsCta";
import { PageHero } from "@/components/ui/primitives";
import { achievements } from "@/data/content";
import { school } from "@/data/school";

export const metadata: Metadata = {
  title: "Achievements",
  description: `Awards and competition wins at ${school.name}: the India K-12 Award 2025, an “Excellent” EduconnectLN rating, inter-school kho-kho victories and more.`,
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        crumb="Achievements"
        eyebrow="Achievements"
        title="Recognition for the school, and for the students who earn it."
        copy={`${achievements.length} recent awards and results, from national recognition for the school to our kho-kho girls' championship wins.`}
      />
      <AchievementsGrid heading={false} />
      <AdmissionsCta />
    </>
  );
}
