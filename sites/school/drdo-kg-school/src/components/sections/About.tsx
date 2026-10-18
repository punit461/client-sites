import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Container, Copy, SectionHeading } from "@/components/ui/primitives";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {about.body.map((paragraph, i) => (
              <p key={i}>
                <Copy value={paragraph} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
