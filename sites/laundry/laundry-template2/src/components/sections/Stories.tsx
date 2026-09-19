"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { stories } from "@/data/content";

/**
 * Editorial stories on a native scroll-snap rail: swipe, trackpad, arrow keys
 * and the scrollbar all work without being reimplemented in JavaScript.
 */
export default function Stories() {
  const rail = useRef<HTMLDivElement>(null);

  const step = useCallback((dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const width = card ? card.clientWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  }, []);

  return (
    <section aria-label="Customer stories" className="overflow-hidden bg-paper-2/60 py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Stories</Label>
            <TextReveal text="Why people switched." className="type-xl mt-5 max-w-[11ch] text-ink" />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-ink hover:text-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-ink hover:text-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <Reveal>
        <div
          ref={rail}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(3rem,calc((100vw-1560px)/2+3rem))]"
        >
          {stories.map((story) => (
            <article
              key={story.name}
              className="flex w-[85vw] flex-none snap-start flex-col sm:w-[30rem]"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-paper">
                <Image
                  src={story.image}
                  alt={`${story.name}, ${story.city}`}
                  fill
                  sizes="(max-width: 640px) 85vw, 30rem"
                  className="object-cover"
                />
              </div>

              <blockquote className="mt-7 flex flex-1 flex-col">
                <p className="font-display text-[clamp(1.35rem,2vw,1.75rem)] font-bold uppercase leading-[1.06] tracking-tight text-ink">
                  &ldquo;{story.headline}&rdquo;
                </p>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {story.body}
                </p>

                <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="text-[0.95rem] font-bold text-ink">{story.name}</span>
                  <span className="text-ink-faint" aria-hidden>
                    ·
                  </span>
                  <span className="text-[0.88rem] text-ink-soft">{story.city}</span>
                  <span className="label ml-auto rounded-full bg-lime px-3 py-1 text-ink">
                    {story.service}
                  </span>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
