import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import LearningTabs from "@/components/sections/LearningTabs";
import ProgrammeCards from "@/components/sections/ProgrammeCards";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { school } from "@/content/school";
import { photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Classes",
  description: `Nursery, LKG and UKG at ${school.name}, C V Raman Nagar: how little ones learn through play, stories and making things.`,
  path: "/academics/",
});

/** What the three years build towards. Aims, not promises about any one child. */
const readiness = [
  { title: "Confidence", text: "Happy to come to school, to speak up in class and to try something new." },
  { title: "Early reading and writing", text: "Letter sounds, first words and a pencil held with control." },
  { title: "Numbers", text: "Counting, comparing, shapes and patterns, with real objects first." },
  { title: "Getting along", text: "Sharing, taking turns, following instructions and looking after their own things." },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our classes"
        title={
          <>
            Learning through play, <em className="text-gold">one step at a time.</em>
          </>
        }
        lead={`${school.name} is a kindergarten with three classes, Nursery, LKG and UKG, taking children from their first day at school to the day they are ready for Class 1.`}
        crumbs={[{ name: "Classes", href: "/academics/" }]}
        photo={photos.slideGarden}
      />

      <section aria-labelledby="stages-title" className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Nursery · LKG · UKG"
            title={<span id="stages-title">Choose a class to see what a day looks like.</span>}
            lead="Each year has its own rhythm, and the same care, play and patience throughout."
          />
          <div className="mt-16">
            <ProgrammeCards />
          </div>
        </div>
      </section>

      <section aria-labelledby="learning-title" className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="How children learn here" title={<span id="learning-title">Four things you will see every week.</span>} />
          <div className="mt-14">
            <LearningTabs />
          </div>
        </div>
      </section>

      <section aria-labelledby="ready-title" className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Ready for Class 1"
              title={<span id="ready-title">What three years of kindergarten build.</span>}
              lead="By the end of UKG, we aim for every child to leave with these."
            />
          </div>
          <Stagger as="ul" className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {readiness.map((s) => (
              <StaggerItem as="li" key={s.title} className="border-t border-gold pt-6">
                <h3 className="t-h3">{s.title}</h3>
                <p className="mt-3">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
