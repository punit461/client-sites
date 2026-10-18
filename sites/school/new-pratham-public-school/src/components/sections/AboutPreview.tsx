import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { about, leadership } from "@/data/content";
import { school } from "@/data/school";
import { asset, campus, personImage } from "@/lib/assets";

export default function AboutPreview() {
  const moment = campus.moment1;
  const butterfly = campus.butterfly;

  return (
    <section id="about" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Container wide className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[26px] shadow-[var(--shadow-lift)]">
                <Image
                  src={asset(moment.src)}
                  alt="Guests and school leaders lighting the ceremonial lamp at a school event"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
              {butterfly ? (
                <Image
                  src={asset(butterfly.src)}
                  alt=""
                  width={butterfly.width}
                  height={butterfly.height}
                  className="absolute -bottom-8 -left-4 w-32 drop-shadow-xl sm:w-40"
                  aria-hidden
                />
              ) : null}
              <div className="glass absolute -right-3 top-6 max-w-[14rem] rounded-2xl p-4 sm:right-6">
                <Award className="h-5 w-5 text-saffron-deep" strokeWidth={1.9} aria-hidden />
                <p className="mt-2 text-[0.8rem] font-semibold leading-snug text-ink">
                  Best CBSE School, three consecutive years
                </p>
                <p className="mt-1 text-[0.72rem] leading-snug text-ink-soft">
                  for Outstanding All-Round Excellence in Making Education a Priority
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading eyebrow="A few words about us" title={`Welcome to ${school.name}`} />
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-soft">{about.intro}</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{about.history[0]}</p>

            <ul className="mt-8 flex flex-wrap gap-4">
              {leadership.map((person) => {
                const portrait = personImage(person.slug);
                return (
                  <li key={person.slug} className="flex items-center gap-3">
                    {portrait ? (
                      <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-saffron">
                        <Image src={asset(portrait.src)} alt="" fill sizes="48px" className="object-cover object-top" />
                      </span>
                    ) : null}
                    <span className="leading-tight">
                      <span className="block text-[0.86rem] font-semibold text-ink">{person.name}</span>
                      <span className="block text-[0.74rem] text-ink-faint">{person.role}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-semibold text-cream transition hover:bg-ink/90"
            >
              Our story and leadership
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
