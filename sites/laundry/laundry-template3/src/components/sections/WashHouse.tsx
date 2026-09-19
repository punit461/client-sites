"use client";

import Image from "next/image";
import { Reveal, Stagger, WordReveal, staggerItem } from "@/components/motion";
import { Container, Counter, Eyebrow } from "@/components/ui/primitives";
import { motion } from "framer-motion";
import { gallery } from "@/data/content";
import { stats } from "@/data/site";

/**
 * The numbers, and a rail of photographs from the floor they come off.
 *
 * The rail is a plain `overflow-x-auto` region rather than a drag-and-snap
 * carousel: native scrolling already works with a trackpad, a touch swipe, a
 * scrollbar and the arrow keys, and no custom implementation of it does.
 */
export default function WashHouse() {
  return (
    <section id="wash-house" className="relative py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <Eyebrow>Inside the wash house</Eyebrow>
            <WordReveal
              text="One building. Nothing sent out."
              className="display-lg mt-5 font-semibold text-mist"
            />
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-mist-soft">
            Everything is cleaned by us, on Residency Road. No third-party unit, no garment leaving
            the chain of custody, and a camera on the counting table.
          </p>
        </div>

        {/* ------------------------------------------------------ the numbers */}
        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.li key={stat.label} variants={staggerItem} className="bg-deep p-7">
              <p className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-mist">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </p>
              <p className="mt-3 text-[0.86rem] leading-snug text-mist-soft">{stat.label}</p>
            </motion.li>
          ))}
        </Stagger>

        {/* ------------------------------------------------------ the rail */}
        <Reveal className="mt-8">
          <ul
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
            tabIndex={0}
            aria-label="Photographs from the wash house floor"
          >
            {gallery.map((shot) => (
              <li
                key={shot.caption}
                className="w-[16rem] flex-none snap-start sm:w-[20rem] lg:w-[23rem]"
              >
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      fill
                      sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 23rem"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.82rem] text-mist-faint">
                    {shot.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
