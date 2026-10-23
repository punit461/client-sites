import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { PageHero } from "@/components/templates/PageHero";
import { business } from "@/config/business";
import { coveredAreas, listNames } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service Areas",
  description: `${business.name} works in ${listNames(coveredAreas.map((a) => a.name))}. Check your postal code to see if we cover you.`,
  path: "/service-areas/",
  photo: "pipeRuns",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Service Areas", href: "/service-areas/" }]}
        eyebrow="Service areas"
        title="The places we work."
        lead={`We serve ${listNames(coveredAreas.map((a) => a.name))}${
          business.address ? "." : ", and come to you — there's no walk-in office."
        } Use the checker below, or pick your area for details.`}
      />
      <ServiceArea />
      <FinalCta title="In our area? Tell us what's happening." />
    </>
  );
}
