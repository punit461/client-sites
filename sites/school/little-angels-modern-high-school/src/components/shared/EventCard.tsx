import { Calendar } from "lucide-react";
import { Photo } from "@/components/ui/primitives";
import type { SchoolEvent } from "@/data/content";

export default function EventCard({ event, priority = false }: { event: SchoolEvent; priority?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
      <div className="relative aspect-square">
        <Photo src={event.image} alt={`Photo collage from ${event.title}`} priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
          <Calendar className="h-3.5 w-3.5" aria-hidden /> {event.date}
        </p>
        <h3 className="mt-3 font-display text-xl text-ink">{event.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{event.summary}</p>
      </div>
    </article>
  );
}
