import { ArrowRight } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/shared/EventCard";
import VideoCard from "@/components/shared/VideoCard";
import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { events, videos } from "@/data/content";

export default function LifePreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Life at LAMHS"
            title="Celebrations, service and a lot of joy"
            copy="Yoga Day, quizzes, spelling bees, national celebrations, Teachers' Day and community service through our Interact Club — there's always something happening."
          />
          <Link href="/life-at-lamhs/" className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy hover:underline">
            All events & photos <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => (
            <StaggerItem key={e.title}>
              <EventCard event={e} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20">
          <h3 className="font-display text-2xl text-ink sm:text-3xl">Watch: our school in motion</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
