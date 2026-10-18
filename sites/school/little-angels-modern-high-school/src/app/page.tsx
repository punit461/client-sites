import AlumniBand from "@/components/home/AlumniBand";
import Differentiators from "@/components/home/Differentiators";
import FacilitiesPreview from "@/components/home/FacilitiesPreview";
import Hero from "@/components/home/Hero";
import LifePreview from "@/components/home/LifePreview";
import Stages from "@/components/home/Stages";
import StatsStrip from "@/components/home/StatsStrip";
import StoryIntro from "@/components/home/StoryIntro";
import AdmissionsBand from "@/components/shared/AdmissionsBand";
import VisitUs from "@/components/shared/VisitUs";

/** The home page: a tour of the school in the order a parent asks the questions. */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <StoryIntro />
      <Differentiators />
      <Stages />
      <FacilitiesPreview />
      <LifePreview />
      <AlumniBand />
      <AdmissionsBand />
      <VisitUs />
    </>
  );
}
