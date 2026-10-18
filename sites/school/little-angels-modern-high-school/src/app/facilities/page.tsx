import type { Metadata } from "next";
import AdmissionsBand from "@/components/shared/AdmissionsBand";
import Reveal from "@/components/ui/Reveal";
import { Container, Icon, PageHero, Photo, SectionHeading } from "@/components/ui/primitives";
import { facilities } from "@/data/content";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Science labs, a computer lab, a library of over 4,000 books, spacious classrooms and a playground that has produced cluster-level champions.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our campus"
        title="Spaces to discover, create and play"
        copy="Advanced computer labs to innovate, a well-stocked library to discover, spacious classrooms to find your voice — and a large, green campus with a playground."
        image={img.activityHall}
        imageAlt="Students presenting in a bright activity hall"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Designed for your ambition" title="Everything a growing mind needs" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.08} as="article" className="overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
                <div className="relative aspect-[16/10]">
                  <Photo src={f.image} alt="" sizes="(min-width: 768px) 50vw, 100vw" />
                  {f.highlight ? (
                    <span className="absolute left-4 top-4 rounded-full bg-gold-bright px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-dark">
                      {f.highlight}
                    </span>
                  ) : null}
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-soft text-navy">
                      <Icon name={f.icon} className="h-5 w-5" />
                    </span>
                    <h2 className="font-display text-2xl text-ink">{f.title}</h2>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-soft">{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AdmissionsBand />
    </>
  );
}
