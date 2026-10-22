import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import { TextLink } from "@/components/ui/Button";
import { Seal } from "@/components/ui/Crest";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { philosophy, trust } from "@/content/campus";
import { reviewThemes } from "@/content/people";
import { contact, school } from "@/content/school";
import { photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `About ${school.name}, a kindergarten in C V Raman Nagar, Bengaluru, run by the ${school.trust}: our aims, values and what families say.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Over twenty years of <em className="text-gold">happy first steps.</em>
          </>
        }
        lead={school.description}
        crumbs={[{ name: "About Us", href: "/about/" }]}
        photo={photos.entrance}
      />

      {/* Vision, mission, values */}
      <section aria-labelledby="purpose-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our purpose" title={<span id="purpose-title">A second home for little learners.</span>} lead={philosophy.intro} />
          </div>
          <Stagger className="grid gap-px overflow-hidden rounded-xs bg-line lg:col-span-7">
            <StaggerItem className="bg-white p-8 sm:p-10">
              <h3 className="eyebrow text-gold-ink">Vision</h3>
              <p className="mt-4 font-display text-[1.6rem] leading-snug text-ink">{philosophy.vision}</p>
            </StaggerItem>
            <StaggerItem className="bg-white p-8 sm:p-10">
              <h3 className="eyebrow text-gold-ink">Mission</h3>
              <p className="t-lead mt-4">{philosophy.mission}</p>
            </StaggerItem>
            <StaggerItem className="bg-white p-8 sm:p-10">
              <h3 className="eyebrow text-gold-ink">Values</h3>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                {philosophy.values.map((v) => (
                  <li key={v.title}>
                    <span className="block font-display text-xl text-ink">{v.title}</span>
                    <span className="mt-1 block text-[0.95rem]">{v.text}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Who runs the school */}
      <section id="trust" aria-labelledby="trust-title" className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="flex justify-center lg:col-span-5">
            <Seal className="h-64 w-64 sm:h-80 sm:w-80" title={`The seal of ${school.fullName}: a lotus and an open book, with the motto ${school.motto}`} />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Who runs the school" title={<span id="trust-title">{trust.title}</span>} />
            <Reveal className="mt-8 space-y-5 text-[1.05rem]">
              {trust.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="border-l-2 border-gold pl-5 font-display text-[1.35rem] leading-snug text-ink">{trust.priority}</p>
              <p className="text-[0.95rem]">
                <span className="block font-semibold text-ink">{school.fullName}</span>
                <span lang="kn">{school.nameKannada}</span>
              </p>
            </Reveal>
            <Reveal className="mt-8">
              <TextLink href="/admissions/">How admission works</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What families say */}
      <section id="reviews" aria-labelledby="reviews-title" className="section-y bg-navy text-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              tone="light"
              eyebrow="What families say"
              title={<span id="reviews-title">Rated {school.rating.value} on Google.</span>}
              lead={`${school.rating.count} parents and former pupils have reviewed the school. These are the themes that come up again and again.`}
            />
            <TextLink href={contact.mapsUrl} tone="light">
              Read the reviews
            </TextLink>
          </div>
          <Stagger as="ul" className="mt-16 grid gap-px overflow-hidden rounded-xs bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {reviewThemes.map((t) => (
              <StaggerItem as="li" key={t.title} className="bg-navy p-8">
                <p className="font-display text-2xl text-gold">{t.title}</p>
                <p className="mt-4 text-white/75">{t.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
