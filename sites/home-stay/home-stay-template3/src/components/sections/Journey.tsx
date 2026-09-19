"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container, Icon, Marker, Reveal, Stagger, staggerItem } from "@/components/ui";
import { contact, journey, seasonNote } from "@/data/stay";
import { numeral } from "@/lib/format";
import { img } from "@/lib/images";

/**
 * How to arrive, as four rows rather than an embedded map. No API key to
 * expire and no third-party cookies dropped before anyone has consented to
 * them — the one link out goes to the guest's own maps app when they ask for it.
 */
export default function Journey({ index = numeral(7) }: { index?: string }) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <section id="journey" className="py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 [&>*]:min-w-0">
          <div>
            <Marker index={index}>Getting here</Marker>
            <h2 className="display-lg mt-6 text-bone">
              An hour and three quarters from Kochi, and then a lane.
            </h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-bone-soft">
              {seasonNote}
            </p>

            <address className="mt-9 not-italic">
              <p className="mono text-[0.74rem] uppercase tracking-[0.2em] text-bone-faint">
                The address
              </p>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-bone">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[0.88rem] text-brass transition-colors hover:text-bone"
              >
                Open in Maps
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </address>

            <Reveal className="mt-10">
              <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-ink-2">
                <Image
                  src={img.jetty}
                  alt="The jetty at the bottom of the garden"
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />
                <p className="mono absolute bottom-4 left-5 text-[0.74rem] text-bone">
                  The jetty · arrivals by water, with a day’s notice
                </p>
              </div>
            </Reveal>
          </div>

          <Stagger className="lg:pt-6" as="ul">
            {journey.map((leg, i) => (
              <motion.li
                key={leg.mode}
                variants={staggerItem}
                className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-line py-7 last:border-b"
              >
                <span className="mono pt-1 text-[0.74rem] text-brass">{numeral(i + 1)}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="flex items-center gap-3 font-display text-[1.45rem] text-bone">
                      <Icon name={leg.icon} className="h-5 w-5 text-bone-faint" />
                      {leg.mode}
                    </h3>
                    <p className="mono ml-auto text-[0.76rem] text-bone-faint">{leg.time}</p>
                  </div>
                  <p className="mono mt-2 text-[0.78rem] text-brass">{leg.place}</p>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-bone-soft">{leg.copy}</p>
                </div>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
