import { ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, Eyebrow, Photo } from "@/components/ui/primitives";
import { admissions, contact, school } from "@/data/site";
import { img } from "@/lib/asset";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      {/* Soft gold halo behind the photos, echoing the crest's rim. */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-gold-soft blur-3xl"
        aria-hidden
      />
      <Container wide className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Since {school.founded} · Sadanandanagar, Bengaluru</Eyebrow>
          <h1 className="display-xl mt-5 text-navy">
            Nurturing young minds in an <span className="italic text-gold">inclusive</span> school.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Little Angels Modern High School is a not-for-profit, English-medium school offering quality education infused
            with Indian values — from Montessori through to Class 10 — where students of all abilities thrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/admissions/" size="lg" variant="gold">
              Admissions {admissions.session} <ArrowRight className="h-4 w-4" aria-hidden />
            </CtaButton>
            <CtaButton href={contact.phoneHref} size="lg" variant="ghost">
              <Phone className="h-4 w-4" aria-hidden /> Call the school
            </CtaButton>
          </div>
          <p className="mt-6 text-sm text-ink-faint">{school.recognition}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="grid grid-cols-[1.35fr_1fr] grid-rows-2 gap-3 sm:gap-4">
            <div className="relative row-span-2 min-h-[22rem] overflow-hidden rounded-[var(--radius-card)] shadow-lift sm:min-h-[30rem]">
              <Photo
                src={img.montessori}
                alt="Montessori children sitting with their teacher in a colourful classroom"
                priority
                sizes="(min-width: 1024px) 28vw, 58vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-soft">
              <Photo src={img.bharatanatyam} alt="Students in Bharatanatyam costume on stage" priority sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-soft">
              <Photo src={img.scienceFair} alt="Students explaining their science exhibition model" priority sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:-left-6 sm:px-5 sm:py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-gold-bright">
              {new Date().getFullYear() - school.founded}
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-ink">Years of Little Angels</span>
              <span className="text-ink-soft">Founded in {school.founded}</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
