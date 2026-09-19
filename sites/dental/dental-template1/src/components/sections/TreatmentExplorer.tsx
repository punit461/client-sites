"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Info } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { treatments } from "@/data/treatments";

const EXPLORER = treatments.filter((t) => t.featuredInExplorer);

/**
 * A tablist, not a set of buttons: arrow keys move between treatments and the
 * panel is associated with its tab, so a screen reader announces the change.
 */
export default function TreatmentExplorer() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const baseId = useId();
  const treatment = EXPLORER[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + EXPLORER.length) % EXPLORER.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const facts = [
    ["What it is", treatment.whatItIs],
    ["Who it may be for", treatment.whoItMayBeFor],
    ["Recovery and aftercare", treatment.aftercare],
  ] as const;

  return (
    <section className="bg-surface-2/60 py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="In detail"
          title="What treatment actually involves"
          copy="Plain-English summaries of the treatments patients ask about most."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-12">
          {/* ------------------------------------------- tab rail */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Treatments"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:self-start lg:px-0"
          >
            {EXPLORER.map((t, i) => (
              <button
                key={t.slug}
                id={`${baseId}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex flex-none items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 lg:w-full ${
                  i === active
                    ? "border-sage-deep bg-surface shadow-[var(--shadow-soft)]"
                    : "border-transparent bg-transparent hover:bg-surface"
                }`}
              >
                <span
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg transition-colors ${
                    i === active ? "bg-sage-deep text-white" : "bg-sage-wash text-sage-deep"
                  }`}
                >
                  <Icon name={t.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="whitespace-nowrap text-[0.92rem] font-semibold text-ink lg:whitespace-normal">
                  {t.name}
                </span>
              </button>
            ))}
          </div>

          {/* ------------------------------------------- panel */}
          <Reveal>
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${active}`}
              className="overflow-hidden rounded-[24px] border border-line bg-surface"
            >
              <div className="relative aspect-16/7 w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={treatment.slug}
                    className="absolute inset-0"
                    initial={still ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={still ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={treatment.image}
                      alt={treatment.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 60vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={treatment.slug}
                  className="p-6 sm:p-8"
                  initial={still ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="display-md text-ink">{treatment.name}</h3>
                  <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft">
                    {treatment.intro}
                  </p>

                  <dl className="mt-7 space-y-5 border-t border-line pt-6">
                    {facts.map(([term, value]) => (
                      <div key={term}>
                        <dt className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                          {term}
                        </dt>
                        <dd className="mt-1.5 max-w-2xl text-[0.92rem] leading-relaxed text-ink-soft">
                          {value}
                        </dd>
                      </div>
                    ))}

                    <div>
                      <dt className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                        What to expect
                      </dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {treatment.whatToExpect.map((point) => (
                            <li key={point} className="flex gap-2.5 text-[0.92rem] text-ink-soft">
                              <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-sage" aria-hidden />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                    <p className="inline-flex items-center gap-2 text-[0.88rem] text-ink-soft">
                      <Clock className="h-4 w-4 text-sage-deep" strokeWidth={1.8} aria-hidden />
                      {treatment.appointmentLength}
                    </p>
                    <button
                      type="button"
                      onClick={() => open({ treatment: treatment.slug })}
                      className="ml-auto rounded-full bg-terracotta px-6 py-3 text-[0.88rem] font-semibold text-white transition hover:bg-terracotta-deep"
                    >
                      Book consultation
                    </button>
                  </div>

                  <p className="mt-5 flex items-start gap-2 text-[0.8rem] leading-relaxed text-ink-faint">
                    <Info className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden />
                    General information only. Whether a treatment is right for you can only be
                    decided after an examination — discuss your options with our clinical team.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
