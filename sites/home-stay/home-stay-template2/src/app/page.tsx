import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import StayPanels from "@/components/sections/StayPanels";
import ExperienceBento from "@/components/sections/ExperienceBento";
import ExploreMap from "@/components/sections/ExploreMap";
import { Food, GuestStories, PhotoJournal, Seasons } from "@/components/sections/Journal";
import { Faq, FinalCta, TravelMoments } from "@/components/sections/Closing";

/** The home page. Announcement, nav, footer and mobile bar live in layout.tsx. */
export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <StayPanels limit={3} />
      <ExperienceBento />
      <ExploreMap />
      <Food />
      <GuestStories />
      <PhotoJournal />
      <Seasons />
      <TravelMoments />
      <Faq />
      <FinalCta />
    </>
  );
}
