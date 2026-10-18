import type { Metadata } from "next";
import AdmissionsBand from "@/components/shared/AdmissionsBand";
import Reveal, { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Icon, PageHero, Photo, SectionHeading } from "@/components/ui/primitives";
import { differentiators, story, timeline } from "@/data/content";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Founded in 1981 by Wing Cdr V K S Rao, Lakshmi and Prema, Little Angels is a not-for-profit, inclusive school in Sadanandanagar, Bengaluru.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About our school"
        title="Knowledge worth spreading, since 1981"
        copy="Little Angels began as one family's dream: a full school for middle- and lower-income families, where every child is welcomed."
        image={img.campusBus}
        imageAlt="The Little Angels school building"
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our founders" title="A family of educators" />
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                {p}
              </p>
            ))}
            <blockquote className="mt-10 border-l-4 border-gold pl-6 font-display text-xl leading-snug text-navy sm:text-2xl">
              “We don&apos;t just teach — we foster an inclusive environment that nurtures curious minds, critical thinkers and
              well-rounded individuals.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-lift">
            <Photo src={img.schoolGate} alt="The school gate with the Little Angels Modern High School nameboard" className="object-cover object-[30%_50%]" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Our journey" title="From a dream to a full school" />
          <ol className="relative mx-auto mt-14 max-w-3xl border-l-2 border-gold/40 pl-8 sm:pl-12">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 0.05} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full border-4 border-surface-2 bg-gold sm:-left-[3.6rem]" aria-hidden />
                <p className="font-display text-3xl font-semibold text-gold">{t.year}</p>
                <h3 className="mt-1 font-display text-2xl text-ink">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{t.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Quality education, infused with Indian values" copy={story.mission} />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <StaggerItem key={d.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-soft text-navy">
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{d.copy}</p>
              </StaggerItem>
            ))}
            <StaggerItem className="flex flex-col justify-center rounded-[var(--radius-card)] bg-navy p-7 text-white">
              <p className="eyebrow !text-gold-bright">Life here</p>
              <p className="mt-3 leading-relaxed text-white/80">
                We celebrate Yoga Day, quizzes, spelling bees, creative writing, national celebrations and Teachers&apos; Day, and
                serve the community through our Interact Club.
              </p>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      <AdmissionsBand />
    </>
  );
}
