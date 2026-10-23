import { FinalCta } from "@/components/sections/FinalCta";
import { Journey } from "@/components/sections/Journey";
import { TeamStory } from "@/components/sections/TeamStory";
import { WhyUs } from "@/components/sections/WhyUs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `How ${business.name} works: clear explanations, the price agreed before any work, and respect for your home or premises.`,
  path: "/about/",
  photo: "plumberUnderBasin",
});

export default function AboutPage() {
  return (
    <>
      <div className="bg-white pt-6">
        <div className="shell">
          <Breadcrumbs crumbs={[{ name: "About Us", href: "/about/" }]} />
        </div>
      </div>
      <TeamStory headingLevel="h1" />
      <WhyUs />
      <Journey />
      <FinalCta />
    </>
  );
}
