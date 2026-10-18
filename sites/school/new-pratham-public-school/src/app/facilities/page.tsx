import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import AdmissionsCta from "@/components/sections/AdmissionsCta";
import FacilitiesGrid from "@/components/sections/FacilitiesGrid";
import { Container, PageHero, SectionHeading } from "@/components/ui/primitives";
import { school } from "@/data/school";
import { asset, campus } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Facilities",
  description: `Two play areas, a children's gymnasium, a cricket bowling machine, an indoor sports centre, a mini pool, air-conditioned classrooms and well-equipped labs at ${school.name}.`,
};

const CAMPUS_ALTS: Record<string, string> = {
  building: "The school building from the road",
  moment1: "Lighting the lamp at a school event",
  moment2: "A school event in the assembly area",
  moment3: "Students and staff at a celebration",
  moment4: "Teachers and school leaders in the hall",
  moment5: "Students at a school programme",
  moment6: "A school gathering",
};

export default function FacilitiesPage() {
  const photos = ["building", "moment2", "moment5", "moment6", "moment3", "moment4"]
    .map((key) => ({ key, picture: campus[key] }))
    .filter((p) => p.picture);

  return (
    <>
      <PageHero
        crumb="Facilities"
        eyebrow="Facilities"
        title={
          <>
            A campus built for <span className="underline-saffron">all-round development</span>.
          </>
        }
        copy="New features are regularly added to the campus. Today it includes two dedicated play areas, a children's gymnasium, a cricket bowling machine, an indoor sports activity centre, a mini pool, air-conditioned classrooms and well-equipped laboratories."
      />

      <FacilitiesGrid heading={false} />

      <section className="bg-surface py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="Around the campus" title="A look around" copy="Photographs from the school's own collection." />
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {photos.map(({ key, picture }, i) => (
              <Reveal as="li" key={key} delay={i * 0.05} className={i === 0 ? "col-span-2 lg:col-span-2" : ""}>
                <div className={`relative overflow-hidden rounded-2xl bg-surface-2 ${i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                  <Image
                    src={asset(picture.src)}
                    alt={CAMPUS_ALTS[key] ?? ""}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 92vw, 62vw" : "(max-width: 640px) 46vw, 30vw"}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <AdmissionsCta />
    </>
  );
}
