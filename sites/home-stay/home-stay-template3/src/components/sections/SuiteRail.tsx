"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Icon, Marker, Reveal, Stagger, staggerItem } from "@/components/ui";
import { rooms } from "@/data/stay";
import { numeral, rupees } from "@/lib/format";

/**
 * Five rooms is too many for a grid that still shows the photography, and too
 * few for a page of tiles. So: a rail you drag or arrow through on the home
 * page, and the same rooms as full-width rows on /suites.
 *
 * The rail is a plain scroll container with snap points — no carousel library,
 * so it keeps working with a trackpad, a touchscreen and the keyboard alike.
 */
export default function SuiteRail({ variant = "rail" }: { variant?: "rail" | "stack" }) {
  if (variant === "stack") return <SuiteStack />;
  return <Rail />;
}

function Rail() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return undefined;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // One card plus its gap, whatever the breakpoint made that.
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="suites" className="overflow-hidden py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <Marker index={numeral(2)}>Where you sleep</Marker>
            <h2 className="display-lg mt-6 text-bone">Five rooms, no two the same.</h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/suites"
              className="mr-2 hidden text-[0.86rem] text-bone-soft transition-colors hover:text-brass sm:block"
            >
              All five
            </Link>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edge.start}
              aria-label="Previous room"
              className="rounded-sm border border-line p-3 text-bone transition-colors hover:border-brass hover:text-brass disabled:opacity-30 disabled:hover:border-line disabled:hover:text-bone"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edge.end}
              aria-label="Next room"
              className="rounded-sm border border-line p-3 text-bone transition-colors hover:border-brass hover:text-brass disabled:opacity-30 disabled:hover:border-line disabled:hover:text-bone"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* Breaks the container on purpose: the rail runs off the right edge. */}
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-14"
        // A list of links is already keyboard reachable; the rail scrolls to follow focus.
      >
        {rooms.map((room, i) => (
          <li
            key={room.slug}
            className="w-[82vw] flex-none snap-start sm:w-[22rem] lg:w-[25rem] last:mr-5 sm:last:mr-8 lg:last:mr-14"
          >
            <Link href={`/suites/${room.slug}`} className="group block">
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-ink-2">
                <Image
                  src={room.images[0].src}
                  alt={room.images[0].alt}
                  fill
                  sizes="(max-width: 640px) 82vw, 25rem"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90"
                  aria-hidden
                />
                <span className="mono absolute left-5 top-5 text-[0.72rem] text-bone/80">
                  {numeral(i + 1)}
                </span>
                <span className="label absolute right-5 top-5 text-brass">{room.floor}</span>

                <div className="absolute inset-x-5 bottom-5">
                  <p className="label text-bone/70">{room.view}</p>
                  <h3 className="mt-2 font-display text-[1.8rem] leading-none text-bone">{room.name}</h3>
                  <p className="mt-3 line-clamp-2 text-[0.9rem] leading-relaxed text-bone-soft">
                    {room.blurb}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="mono text-[0.8rem] text-bone-soft">
                  {rupees(room.rate)} <span className="text-bone-faint">/ night</span>
                </p>
                <span className="inline-flex items-center gap-1.5 text-[0.82rem] text-bone-faint transition-colors group-hover:text-brass">
                  {room.guests} guests · {room.size}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The /suites page: every room as a full row, alternating side. */
function SuiteStack() {
  return (
    <Stagger className="space-y-6">
      {rooms.map((room, i) => (
        <motion.article
          key={room.slug}
          variants={staggerItem}
          className="group overflow-hidden rounded-sm border border-line bg-ink-2"
        >
          <div
            className={`grid lg:grid-cols-[1.05fr_1fr] ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-[25rem]">
              <Image
                src={room.images[0].src}
                alt={room.images[0].alt}
                fill
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <span className="mono absolute left-5 top-5 rounded-sm bg-ink/70 px-2.5 py-1.5 text-[0.72rem] text-bone backdrop-blur-sm">
                {numeral(i + 1)}
              </span>
            </div>

            <div className="flex min-w-0 flex-col justify-center p-7 sm:p-10">
              <p className="label text-brass">{room.kicker}</p>
              <h2 className="mt-4 font-display text-[2rem] leading-none text-bone">{room.name}</h2>
              <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-bone-soft">{room.blurb}</p>

              <dl className="mono mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.78rem] sm:grid-cols-4">
                {[
                  ["users", "Sleeps", String(room.guests)],
                  ["bed", "Bed", room.bed],
                  ["maximize", "Size", room.size],
                  ["waves", "View", room.view],
                ].map(([icon, term, value]) => (
                  <div key={term} className="min-w-0">
                    <dt className="flex items-center gap-1.5 text-bone-faint">
                      <Icon name={icon as "users"} className="h-3.5 w-3.5 text-brass" />
                      {term}
                    </dt>
                    <dd className="mt-1 truncate text-bone">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p>
                  <span className="font-display text-[1.7rem] text-bone">{rupees(room.rate)}</span>
                  <span className="mono ml-2 text-[0.76rem] text-bone-faint">
                    / night, all meals in
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/suites/${room.slug}`}
                    className="rounded-sm border border-line px-5 py-3 text-[0.84rem] text-bone transition-colors hover:border-brass hover:text-brass"
                  >
                    The room
                  </Link>
                  <Link
                    href={`/booking?room=${room.slug}`}
                    className="inline-flex items-center gap-2 rounded-sm bg-brass px-5 py-3 text-[0.84rem] font-medium text-ink transition-colors hover:bg-brass-deep"
                  >
                    Check dates
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </Stagger>
  );
}

/** A card used on the room page to point at the other rooms. */
export function SuiteMini({ slug }: { slug: string }) {
  const others = rooms.filter((r) => r.slug !== slug);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
      {others.map((room) => (
        <Reveal key={room.slug}>
          <Link href={`/suites/${room.slug}`} className="group block min-w-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-ink-2">
              <Image
                src={room.images[0].src}
                alt={room.images[0].alt}
                fill
                sizes="(max-width: 640px) 92vw, 24vw"
                className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-[1.25rem] text-bone transition-colors group-hover:text-brass">
              {room.name}
            </h3>
            <p className="mono mt-1.5 text-[0.76rem] text-bone-faint">
              {rupees(room.rate)} · sleeps {room.guests}
            </p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
