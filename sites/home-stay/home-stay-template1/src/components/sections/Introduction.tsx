"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Icon, Label, Reveal, Stagger, staggerItem } from "@/components/ui";
import { property, reasons } from "@/data/stay";
import { img } from "@/lib/images";

/** Asymmetric on purpose: copy left, a tall plate right with a small inset. */
export function Introduction() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container wide>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <Label>The experience</Label>
            <h2 className="display-lg mt-5 max-w-lg text-charcoal">
              A working estate that happens to have rooms.
            </h2>

            <div className="mt-7 max-w-lg space-y-5 text-[1.02rem] leading-relaxed text-charcoal-soft">
              <p>
                Ridgeline has been in the same family since {property.since}. The coffee came
                first, and the rooms were added slowly, one at a time, in the parts of the house
                that were no longer needed.
              </p>
              <p>
                That shows in how the place works. There is no reception desk and no check-in
                queue. Meals happen at a long table when they are ready, and if you would rather
                eat on your balcony instead, that is fine too.
              </p>
              <p>
                What you get is forty acres, six rooms, and whatever pace you feel like keeping.
              </p>
            </div>

            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.84rem] text-charcoal-soft">
              <Icon name="mapPin" className="h-4 w-4 text-olive" />
              {property.region}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-[28px] bg-ivory-2">
                <Image
                  src={img.introMain}
                  alt="The main house among the trees"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>

              {/* small overlapping plate */}
              <div className="absolute -bottom-8 -left-6 hidden w-48 overflow-hidden rounded-[20px] border-4 border-ivory bg-ivory-2 sm:block lg:-left-10 lg:w-56">
                <div className="relative aspect-square">
                  <Image
                    src={img.introInset}
                    alt="Mist over the valley at dawn"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function Reasons() {
  return (
    <section className="border-y border-line bg-ivory-2/60 py-24 sm:py-32">
      <Container wide>
        <div className="max-w-2xl">
          <Label>Why stay</Label>
          <h2 className="display-lg mt-5 text-charcoal">Small things, done properly.</h2>
        </div>

        <Stagger className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={staggerItem} className="group">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-olive transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory">
                <Icon name={reason.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.4rem] text-charcoal">{reason.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal-soft">{reason.copy}</p>
            </motion.div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
