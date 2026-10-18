import type { Metadata } from "next";
import Stages from "@/components/home/Stages";
import AdmissionsBand from "@/components/shared/AdmissionsBand";
import Reveal from "@/components/ui/Reveal";
import { Container, Icon, PageHero, Photo } from "@/components/ui/primitives";
import { academics } from "@/data/content";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Academics — Nursery to Class 10",
  description:
    "A low student-teacher ratio, drama-integrated and AV lessons, project-based learning, art & culture and an Interact Club — how Little Angels teaches from Nursery to Class 10.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nursery – Class 10"
        title="Learning that sparks curiosity"
        copy="Innovative teaching and a low student-teacher ratio mean every child gets personal attention — and a front-row seat to discovery."
        image={img.newsInEducation}
        imageAlt="Young students holding up their project charts"
      />

      <Stages />

      <section className="bg-surface-2 py-20 sm:py-28">
        <Container className="space-y-16 sm:space-y-24">
          {academics.map((a, i) => (
            <Reveal key={a.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-lift ${i % 2 ? "lg:order-2" : ""}`}>
                <Photo src={a.image} alt="" />
              </div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-bright text-navy-dark">
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <h2 className="display-md mt-5 text-ink">{a.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{a.copy}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <AdmissionsBand />
    </>
  );
}
