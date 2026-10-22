import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import Gallery from "@/components/sections/Gallery";
import LifeMosaic from "@/components/sections/LifeMosaic";
import { TextLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { school } from "@/content/school";
import { photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Play & Activities",
  description: `Outdoor play, stories and rhymes, art, music and Annual Day at ${school.name}, a kindergarten in C V Raman Nagar.`,
  path: "/student-life/",
});

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Play & activities"
        title={
          <>
            Busy days, <em className="text-gold">happy children.</em>
          </>
        }
        lead="Play outdoors every day, stories and songs, art and music, and Annual Day on the stage. At this age, this is how children learn."
        crumbs={[{ name: "Activities", href: "/student-life/" }]}
        photo={photos.annualDay}
      />

      <section aria-labelledby="life-title" className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Every week" title={<span id="life-title">Five ways little ones grow.</span>} />
          <div className="mt-14">
            <LifeMosaic tone="light" />
          </div>
        </div>
      </section>

      <section aria-labelledby="pictures-title" className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="In pictures" title={<span id="pictures-title">Moments from {school.shortName}.</span>} />
            <Reveal className="shrink-0">
              <TextLink href="/gallery/">Open the gallery</TextLink>
            </Reveal>
          </div>
          <div className="mt-12">
            <Gallery limit={6} filters={false} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
