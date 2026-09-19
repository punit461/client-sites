"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Icon, Label, Stagger, staggerItem } from "@/components/ui";
import { ACCENT } from "@/lib/accents";
import { rupees } from "@/lib/format";
import { rooms } from "@/data/stay";

/**
 * Horizontal panels on desktop — image one side, everything else the other,
 * alternating. On phones each panel folds into a card. Deliberately not a card
 * grid: four rooms deserve more room than a tile each.
 */
export default function StayPanels({ limit }: { limit?: number }) {
  const shown = limit ? rooms.slice(0, limit) : rooms;

  return (
    <section id="stay" className="bg-cream-2/50 py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Label>Stay with us</Label>
            <h2 className="display-lg mt-5 text-brown">
              Four rooms, and <span className="hand text-terracotta">a cabin</span>.
            </h2>
          </div>
          {limit ? (
            <Link
              href="/stay"
              className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-terracotta hover:text-terracotta-deep"
            >
              See all rooms
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <Stagger className="mt-14 space-y-6">
          {shown.map((room, i) => {
            const accent = ACCENT[room.accent];
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={room.slug}
                variants={staggerItem}
                className="group overflow-hidden rounded-[32px] border border-line bg-surface"
              >
                <div
                  className={`grid gap-0 lg:grid-cols-[1.1fr_1fr] ${
                    flipped ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
                    <Image
                      src={room.images[0].src}
                      alt={room.images[0].alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 52vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[0.74rem] font-bold text-cream ${accent.bg}`}
                    >
                      {room.tagline}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9">
                    <h3 className="font-display text-[1.9rem] font-bold tracking-tight text-brown">
                      {room.name}
                    </h3>
                    <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-brown-soft">
                      {room.blurb}
                    </p>

                    <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.84rem] text-brown-faint">
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="users" className="h-4 w-4" />
                        {room.guests} guests
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="bed" className="h-4 w-4" />
                        {room.bed}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="maximize" className="h-4 w-4" />
                        {room.size}
                      </li>
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((a) => (
                        <li
                          key={a}
                          className="rounded-full bg-cream-2 px-3 py-1.5 text-[0.76rem] text-brown-soft"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                      <p>
                        <span className="font-display text-[1.7rem] font-bold text-brown">
                          {rupees(room.rate)}
                        </span>
                        <span className="ml-1.5 text-[0.82rem] text-brown-faint">
                          / night, meals included
                        </span>
                      </p>
                      <Link
                        href={`/stay/${room.slug}`}
                        className={`inline-flex flex-none items-center gap-2 rounded-full px-6 py-3 text-[0.86rem] font-semibold text-cream transition hover:opacity-90 ${accent.bg}`}
                      >
                        View room
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
