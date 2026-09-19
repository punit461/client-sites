"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Icon, Marker, Reveal, Stagger, staggerItem } from "@/components/ui";
import { houseNotes, property } from "@/data/stay";
import { numeral } from "@/lib/format";
import { img } from "@/lib/images";
import { motion } from "framer-motion";

/**
 * The introduction: a tall photograph, a smaller one overlapping it, and the
 * copy in a column beside them. The overlap is what stops this reading as a
 * stock two-column block.
 */
export default function Prelude() {
  return (
    <section className="py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20 [&>*]:min-w-0">
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-ink-2">
              <Image
                src={img.houseMain}
                alt="The house seen from the garden"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 hidden aspect-square w-48 overflow-hidden rounded-sm border-4 border-ink bg-ink-2 sm:block lg:-right-10 lg:w-56">
              <Image
                src={img.houseInset}
                alt="Teak shutters and a red oxide floor"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:pt-10">
            <Marker index={numeral(1)}>The house</Marker>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-6 text-bone">
                Built for the heat,
                <br />
                and for sitting still.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-bone-soft">
                <p>
                  A coir merchant put this house up in {property.built} on land he had filled himself,
                  facing the water because in those days the water was the road. Laterite block below,
                  Malabar teak above, and a veranda deep enough that the sun never reaches the rooms.
                </p>
                <p>
                  It was empty for six years and nearly sold for the plot. Thomas bought it from a
                  cousin in 2009, spent five years putting it back, and opened two rooms to guests in{" "}
                  {property.since}. There are five now, and he still does the accounts at the hall table.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="mt-10 border-l border-brass/60 pl-6">
                <blockquote className="font-display text-[1.45rem] leading-snug text-bone">
                  “Nobody comes to Alappuzha to be busy. We are quite good at helping with that.”
                </blockquote>
                <figcaption className="mono mt-3 text-[0.74rem] text-bone-faint">
                  Thomas Varghese — who lives in the back wing
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-3 text-[0.88rem] text-bone transition-colors hover:text-brass"
              >
                <span className="rule w-8 transition-all group-hover:w-14" aria-hidden />
                The whole story
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Four plain statements about what staying here is actually like. */
export function HouseNotes() {
  return (
    <section className="border-y border-line bg-ink-2 py-20 sm:py-24">
      <Container wide>
        <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {houseNotes.map((note, i) => (
            <motion.li key={note.title} variants={staggerItem}>
              <span className="mono text-[0.72rem] text-brass">{numeral(i + 1)}</span>
              <Icon name={note.icon} className="mt-5 h-6 w-6 text-bone" strokeWidth={1.2} />
              <h3 className="mt-5 font-display text-[1.3rem] text-bone">{note.title}</h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-bone-soft">{note.copy}</p>
            </motion.li>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
