"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container, Icon, Marker, Reveal } from "@/components/ui";
import { chronology, contact, faqs, fromRate, property } from "@/data/stay";
import { numeral, rupees } from "@/lib/format";
import { img } from "@/lib/images";

/** The accordion. One panel open at a time, first one open on arrival. */
export function Faq({ index }: { index?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const still = useReducedMotion();

  return (
    <section id="faq" className="border-t border-line py-24 sm:py-32">
      <Container narrow>
        <Marker index={index}>Before you book</Marker>
        <h2 className="display-lg mt-6 text-bone">Questions guests ask.</h2>

        <ul className="mt-12 border-t border-line">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-start gap-5 py-6 text-left transition-colors hover:text-brass"
                  >
                    <span className="mono pt-1.5 text-[0.72rem] text-bone-faint">{numeral(i + 1)}</span>
                    <span className="flex-1 font-display text-[1.25rem] text-bone">{faq.q}</span>
                    <motion.span
                      className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-sm border border-line text-bone-soft"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: still ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.6} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-${i}`}
                      key="panel"
                      initial={still ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-10 pr-10 text-[0.96rem] leading-relaxed text-bone-soft">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** The last thing on every page: a photograph, a rate and one way forward. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={img.finalCta} alt="" fill sizes="100vw" className="object-cover" />
        <span className="absolute inset-0 bg-ink/78" aria-hidden />
      </div>

      <Container wide className="py-28 text-center sm:py-36">
        <Reveal>
          <p className="label text-brass">{property.region}</p>
          <h2 className="display-lg mx-auto mt-6 max-w-3xl text-bone">
            The lake is doing something worth watching about four times a day.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-bone-soft">
            Send us your dates and one of us will write back — usually the same evening, always
            within a day. Nothing is charged until we have agreed it in writing.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2.5 rounded-sm bg-brass px-8 py-4 text-[0.88rem] font-medium tracking-wide text-ink transition-colors hover:bg-brass-deep"
            >
              Check dates
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${contact.phoneDial}`}
              className="inline-flex items-center gap-2.5 rounded-sm border border-bone/25 px-8 py-4 text-[0.88rem] tracking-wide text-bone transition-colors hover:border-brass hover:text-brass"
            >
              <Icon name="phone" className="h-4 w-4" />
              {contact.phone}
            </a>
          </div>

          <p className="mono mt-8 text-[0.76rem] text-bone-faint">
            From {rupees(fromRate)} a night · all meals included · free cancellation up to 7 days before
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/** The house, decade by decade — the About page's spine. */
export function Chronology() {
  return (
    <ol className="border-t border-line">
      {chronology.map((entry, i) => (
        <Reveal as="li" key={entry.year} className="grid gap-4 border-b border-line py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
          <p className="mono text-[1.05rem] text-brass">{entry.year}</p>
          <div className="min-w-0">
            <h3 className="flex items-baseline gap-4 font-display text-[1.4rem] text-bone">
              <span className="mono text-[0.7rem] text-bone-faint">{numeral(i + 1)}</span>
              {entry.title}
            </h3>
            <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-bone-soft">{entry.copy}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
