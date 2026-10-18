import type { Metadata } from "next";
import AdmissionsBand from "@/components/shared/AdmissionsBand";
import EventCard from "@/components/shared/EventCard";
import Gallery from "@/components/shared/Gallery";
import VideoCard from "@/components/shared/VideoCard";
import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Icon, PageHero, SectionHeading } from "@/components/ui/primitives";
import { events, gallery, traditions, videos } from "@/data/content";
import { socials } from "@/data/site";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Life at LAMHS — events & activities",
  description:
    "Grandparents' Day, Independence Day, the Investiture Ceremony, Yoga Day, World Environment Day and more — events, photos and videos from Little Angels.",
};

export default function LifePage() {
  const youtube = socials.find((s) => s.label === "YouTube")!;
  return (
    <>
      <PageHero
        eyebrow="Events & activities"
        title="Life at Little Angels"
        copy="Fun is as important as academics. Celebrations, service and stage performances are where our students discover talents they didn't know they had."
        image={img.culturalProgramme}
        imageAlt="Students performing a cultural programme on stage"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="This year" title="Recent events" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <StaggerItem key={e.title}>
                <EventCard event={e} priority={i < 3} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Every year" title="Traditions our students look forward to" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {traditions.map((t) => (
              <StaggerItem key={t.title} className="flex gap-4 rounded-2xl bg-surface p-6 shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <span>
                  <h3 className="font-display text-lg text-ink">{t.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{t.copy}</p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Photo gallery" title="Moments from around the school" copy="Tap any photo to see it full size." />
          <div className="mt-12">
            <Gallery photos={gallery} />
          </div>
        </Container>
      </section>

      <section className="bg-navy-dark py-20 text-white sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading onDark eyebrow="Videos" title="Watch Little Angels in action" />
            <a href={youtube.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-bright hover:underline">
              More on our YouTube channel →
            </a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </Container>
      </section>

      <AdmissionsBand />
    </>
  );
}
