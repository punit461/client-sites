"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container, Icon, Marker } from "@/components/ui";
import { experiences } from "@/data/stay";
import { numeral } from "@/lib/format";

/**
 * A numbered index rather than a grid of cards. Pointing at a row — or tabbing
 * to it — changes the photograph in the panel beside it, which is the whole
 * interaction. Phones get a thumbnail inside each row instead, because there is
 * no hover and no room for a panel.
 */
export default function ExperienceList({
  limit,
  detailed = false,
}: {
  limit?: number;
  detailed?: boolean;
}) {
  const still = useReducedMotion();
  const shown = limit ? experiences.slice(0, limit) : experiences;
  const [active, setActive] = useState(0);
  const current = shown[Math.min(active, shown.length - 1)];

  return (
    <section id="experiences" className={detailed ? "" : "py-24 sm:py-32"}>
      <Container wide>
        {detailed ? null : (
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <Marker index={numeral(4)}>What there is to do</Marker>
              <h2 className="display-lg mt-6 text-bone">Mostly water, and one very good lunch.</h2>
            </div>
            <Link
              href="/experiences"
              className="group inline-flex items-center gap-3 text-[0.88rem] text-bone transition-colors hover:text-brass"
            >
              <span className="rule w-8 transition-all group-hover:w-14" aria-hidden />
              All {experiences.length}
            </Link>
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16 [&>*]:min-w-0">
          <ol>
            {shown.map((item, i) => (
              <li key={item.slug}>
                <div
                  className="group border-t border-line py-7 last:border-b"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`mono text-[0.74rem] transition-colors ${
                        active === i ? "text-brass" : "text-bone-faint"
                      }`}
                    >
                      {numeral(i + 1)}
                    </span>
                    <h3 className="min-w-0 flex-1">
                      <Link
                        href="/booking"
                        className="font-display text-[1.7rem] leading-tight text-bone transition-colors hover:text-brass focus-visible:text-brass"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    {item.included ? (
                      <span className="label flex-none text-brass">Included</span>
                    ) : (
                      <span className="label flex-none text-bone-faint">Arranged</span>
                    )}
                  </div>

                  <div className="mt-4 pl-0 sm:pl-10">
                    {/* No panel on a phone, so the photograph comes inline. */}
                    <div className="relative mb-4 aspect-16/9 overflow-hidden rounded-sm bg-ink-2 lg:hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="92vw"
                        className="object-cover"
                      />
                    </div>

                    <p className="max-w-xl text-[0.96rem] leading-relaxed text-bone-soft">
                      {item.blurb}
                    </p>
                    {detailed ? (
                      <p className="mt-3 max-w-xl text-[0.93rem] leading-relaxed text-bone-faint">
                        {item.detail}
                      </p>
                    ) : null}

                    <p className="mono mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.74rem] text-bone-faint">
                      <span className="inline-flex items-center gap-2">
                        <Icon name="clock" className="h-3.5 w-3.5 text-brass" />
                        {item.duration}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Icon name={item.icon} className="h-3.5 w-3.5 text-brass" />
                        {item.when}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* ------------------------------------------------- preview panel */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-ink-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={still ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="label text-brass">{current.included ? "In the rate" : "We arrange it"}</p>
                  <p className="mt-2 font-display text-[1.5rem] text-bone">{current.name}</p>
                </div>
              </div>

              <p className="mono mt-4 text-[0.74rem] leading-relaxed text-bone-faint">
                Everything marked <span className="text-brass">included</span> is already in the room
                rate. The rest is arranged for you at cost, with nothing added on top.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
