"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Icon, Label, Stagger, staggerItem } from "@/components/ui";
import { rupees } from "@/lib/format";
import { rooms } from "@/data/stay";

/**
 * An editorial grid rather than four equal cards: the first room takes two
 * columns and sets the tone, the rest sit under it.
 */
export default function RoomsShowcase({ limit }: { limit?: number }) {
  const shown = limit ? rooms.slice(0, limit) : rooms;

  return (
    <section id="rooms" className="py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Label>Rooms &amp; stays</Label>
            <h2 className="display-lg mt-5 text-charcoal">Six rooms, no two alike.</h2>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-[0.88rem] tracking-wide text-charcoal-soft underline-offset-8 transition hover:text-charcoal hover:underline"
          >
            All rooms
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-2">
          {shown.map((room, i) => (
            <motion.article
              key={room.slug}
              variants={staggerItem}
              className={`group min-w-0 ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <Link href={`/rooms/${room.slug}`} className="block">
                <div
                  className={`relative overflow-hidden rounded-[26px] bg-ivory-2 ${
                    i === 0 ? "aspect-4/3 lg:aspect-21/9" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={room.images[0].src}
                    alt={room.images[0].alt}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 92vw, 92vw" : "(max-width: 1024px) 92vw, 46vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

                  <span className="absolute right-5 top-5 rounded-full bg-ivory/92 px-3.5 py-1.5 text-[0.76rem] font-medium text-charcoal backdrop-blur">
                    {rupees(room.rate)} / night
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 max-w-lg">
                    <h3 className="font-display text-[1.7rem] text-charcoal">{room.name}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal-soft">
                      {room.blurb}
                    </p>

                    <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem] text-charcoal-faint">
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="users" className="h-3.5 w-3.5" />
                        {room.guests} guests
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="bed" className="h-3.5 w-3.5" />
                        {room.bed}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="maximize" className="h-3.5 w-3.5" />
                        {room.size}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Icon name="eye" className="h-3.5 w-3.5" />
                        {room.view}
                      </li>
                    </ul>
                  </div>

                  <span className="inline-flex flex-none items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.84rem] tracking-wide text-charcoal transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-ivory">
                    View room
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
