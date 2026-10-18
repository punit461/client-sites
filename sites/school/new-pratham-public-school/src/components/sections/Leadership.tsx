import { Quote } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { leadership } from "@/data/content";
import { asset, personImage } from "@/lib/assets";

export default function Leadership() {
  return (
    <section id="leadership" className="bg-surface py-20 sm:py-28">
      <Container wide>
        <Reveal>
          <SectionHeading eyebrow="Leadership" title="Messages from the people who run the school" align="center" />
        </Reveal>

        <div className="mt-14 space-y-16">
          {leadership.map((person, i) => {
            const portrait = personImage(person.slug);
            const flip = i % 2 === 1;
            return (
              <Reveal key={person.slug} as="article">
                <div className={`grid items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative mx-auto w-full max-w-sm">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[var(--shadow-lift)]">
                      {portrait ? (
                        <Image
                          src={asset(portrait.src)}
                          alt={`${person.name}, ${person.role}`}
                          fill
                          sizes="(max-width: 1024px) 80vw, 32vw"
                          className="object-cover object-top"
                        />
                      ) : null}
                    </div>
                    <div className="glass absolute -bottom-5 left-5 rounded-2xl px-4 py-3">
                      <p className="font-display text-[1.05rem] font-semibold leading-tight text-ink">{person.name}</p>
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral-deep">{person.role}</p>
                    </div>
                  </div>

                  <div>
                    <Quote className="h-8 w-8 text-saffron" strokeWidth={1.6} aria-hidden />
                    {person.message.map((para) => (
                      <p key={para} className="mt-4 font-display text-[1.25rem] font-medium leading-relaxed text-ink sm:text-[1.4rem]">
                        {para}
                      </p>
                    ))}
                    {person.bio ? (
                      <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">{person.bio}</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
