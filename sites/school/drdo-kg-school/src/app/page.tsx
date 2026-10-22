import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Reveal from "@/components/motion/Reveal";
import ArmillaryStatic from "@/components/three/ArmillaryStatic";
import AdmissionSteps from "@/components/sections/AdmissionSteps";
import FacilityCollage from "@/components/sections/FacilityCollage";
import Gallery from "@/components/sections/Gallery";
import LifeMosaic from "@/components/sections/LifeMosaic";
import ProgrammeCards from "@/components/sections/ProgrammeCards";
import StatsBand from "@/components/sections/StatsBand";
import VisitSection from "@/components/sections/VisitSection";
import Voices from "@/components/sections/Voices";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { atAGlance } from "@/content/admissions";
import { school } from "@/content/school";

export default function Home() {
  return (
    <>
      {/* A */}
      <Hero />
      {/* B */}
      <StatsBand />
      {/* C */}
      <Philosophy />

      {/* D — Classes */}
      <section aria-labelledby="programmes-title" className="section-y border-t border-line bg-white">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our classes"
              title={<span id="programmes-title">Three years, one happy start.</span>}
              lead="From a child's first morning in Nursery to the day they leave UKG ready for Class 1, each year builds gently on the one before."
            />
            <Reveal className="shrink-0">
              <TextLink href="/academics/">How children learn here</TextLink>
            </Reveal>
          </div>
          <div className="mt-16">
            <ProgrammeCards />
          </div>
        </div>
      </section>

      {/* E — Campus */}
      <section aria-labelledby="campus-title" className="section-y bg-ivory">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our campus"
              title={<span id="campus-title">Room to run, play and grow.</span>}
              lead="A green, gated campus with play areas, a wide courtyard, an open-air stage and bright classrooms."
            />
            <Reveal className="shrink-0">
              <TextLink href="/facilities/">Explore the campus</TextLink>
            </Reveal>
          </div>
          <div className="mt-16">
            <FacilityCollage />
          </div>
        </div>
      </section>

      {/* F — Activities */}
      <section aria-labelledby="life-title" className="section-y relative overflow-hidden bg-navy text-white">
        <ArmillaryStatic className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-20 lg:h-[28rem] lg:w-[28rem]" />
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                tone="light"
                eyebrow="Play & activities"
                title={<span id="life-title">Little ones learn by playing, singing and making things.</span>}
              />
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="text-white/75">
                Outdoor play every day, stories and rhymes, art and music, and Annual Day on the stage: the things that make children want to come
                back each morning.
              </p>
              <TextLink href="/student-life/" tone="light" className="mt-6">
                Activities at {school.shortName}
              </TextLink>
            </Reveal>
          </div>
          <div className="mt-16">
            <LifeMosaic />
          </div>
        </div>
      </section>

      {/* G — Gallery */}
      <section aria-labelledby="gallery-title" className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="In pictures" title={<span id="gallery-title">A look around the school.</span>} />
            <Reveal className="shrink-0">
              <TextLink href="/gallery/">View the full gallery</TextLink>
            </Reveal>
          </div>
          <div className="mt-12">
            <Gallery limit={6} />
          </div>
        </div>
      </section>

      {/* H */}
      <Voices />

      {/* I — Admissions journey */}
      <section aria-labelledby="journey-title" className="section-y bg-navy text-white">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                tone="light"
                eyebrow="Admissions"
                title={<span id="journey-title">Joining {school.shortName}.</span>}
                lead="Four simple steps, starting with a phone call or a visit to the school office."
              />
            </div>
            <Reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <ButtonLink href="/admissions/#enquire" variant="gold">
                Make an Enquiry
              </ButtonLink>
              <ButtonLink href="/admissions/" variant="outlineLight">
                Admissions Guide
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-16">
            <AdmissionSteps />
          </div>
          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-xs bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((d) => (
              <div key={d.label} className="bg-navy p-6">
                <p className="font-display text-xl text-gold">{d.value}</p>
                <p className="mt-1 text-[0.9rem] text-white/70">{d.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* J */}
      <VisitSection />
    </>
  );
}
