import type { Metadata } from "next";
import { Award, BookOpen, HandCoins, Sparkles } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import AdmissionsCta from "@/components/sections/AdmissionsCta";
import Highlights from "@/components/sections/Highlights";
import Leadership from "@/components/sections/Leadership";
import Pillars from "@/components/sections/Pillars";
import { Container, PageHero, SectionHeading } from "@/components/ui/primitives";
import { about } from "@/data/content";
import { school } from "@/data/school";
import { asset, campus } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About the school",
  description: `${school.name} was established in ${school.established} and is affiliated to CBSE, New Delhi. Our story, our aims and messages from the Chairman, Managing Trustee and Principal.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        title={
          <>
            Teaching in Dooravani Nagar since {school.established}, with the{" "}
            <span className="underline-saffron">all-round development</span> of every child in mind.
          </>
        }
        copy={about.intro}
      />

      <Highlights />

      {/* --------------------------------------------------------- story */}
      <section className="py-20 sm:py-28">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Our story" title={`About ${school.name}`} />
              <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
                {about.history.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-saffron/50 bg-saffron-wash p-5">
                <Award className="mt-0.5 h-6 w-6 flex-none text-saffron-deep" strokeWidth={1.8} aria-hidden />
                <p className="text-[0.95rem] leading-relaxed text-ink">{about.award}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[var(--shadow-lift)]">
                  <Image
                    src={asset(campus.moment3.src)}
                    alt="A school celebration at New Pratham Public School"
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-cover"
                  />
                </div>
                <div className="glass absolute -bottom-6 -left-3 max-w-[16rem] rounded-2xl p-4 sm:left-6">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink-faint">Managed by</p>
                  <p className="mt-1 text-[0.9rem] font-semibold leading-snug text-ink">{school.trust}</p>
                  <p className="mt-1 text-[0.76rem] leading-snug text-ink-soft">{school.group}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- aims */}
      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container wide>
          <Reveal>
            <SectionHeading light eyebrow="Our aims" title={about.aims.title} />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {about.aims.copy.map((para, i) => {
              const Glyph = [HandCoins, BookOpen, Sparkles][i];
              return (
                <Reveal key={para} delay={i * 0.08}>
                  <div className="h-full rounded-[22px] border border-cream/10 bg-cream/5 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron text-ink">
                      <Glyph className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/85">{para}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Pillars />
      <Leadership />
      <AdmissionsCta />
    </>
  );
}
