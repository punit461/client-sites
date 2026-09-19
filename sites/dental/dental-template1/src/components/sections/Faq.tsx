"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const still = useReducedMotion();

  return (
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <Container narrow>
        <SectionHeading eyebrow="FAQ" title="Questions patients ask" align="center" className="mb-12" />

        <Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-sage-deep"
                    >
                      <span className="text-[1.02rem] font-semibold text-ink">{faq.q}</span>
                      <motion.span
                        className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line text-ink-soft"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: still ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="panel"
                        initial={still ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-8 text-[0.95rem] leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
