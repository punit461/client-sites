import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Gallery from "@/components/shared/Gallery";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, PageHero, SectionHeading } from "@/components/ui/primitives";
import { whatsappLink } from "@/data/site";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Alumni — Museum of Little Angels",
  description:
    "The Museum of Little Angels: alumni stories and treasured school photographs from the 1990s onwards. Share your own LAMHS memory.",
};

const archive = [
  { src: img.alumniMarchPast, alt: "Students carrying Vijay House and Pratap House flags at a march-past", caption: "March-past, 1990s" },
  { src: img.alumniThenNow, alt: "Two photos of the same friends — as schoolchildren and as adults", caption: "Then and now" },
  { src: img.alumniMemories, alt: "Three archive photos of students and teachers on the school stage", caption: "On stage, years ago" },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        eyebrow="Museum of Little Angels"
        title="Greetings, dear alumni"
        copy="A special gallery celebrating alumni stories and cherished school memories — moments of joy, friendship and achievement that stay close to the heart."
        image={img.alumniMarchPast}
        imageAlt="A 1990s march-past with house flags"
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Our alumni" title="Every picture tells a story" />
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Filled with treasured photographs dating back to the 1990s, our museum captures laughter in classrooms,
              victories on the playground and unforgettable milestones shared with teachers and friends.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              This page honours the bond between our past and present — a place where memories are revisited, connections are
              renewed, and the Little Angels family keeps growing across generations.
            </p>
            <div className="mt-8 rounded-[var(--radius-card)] bg-gold-soft p-6">
              <h3 className="font-display text-xl text-navy">Share a fond LAMHS story</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Send us your old photos and memories — we&apos;d love to add them to the museum.
              </p>
              <CtaButton
                href={whatsappLink("Hello! I'm a Little Angels alumnus/alumna and I'd like to share a memory for the Museum of Little Angels.")}
                className="mt-5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Share on WhatsApp
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Gallery photos={archive} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
