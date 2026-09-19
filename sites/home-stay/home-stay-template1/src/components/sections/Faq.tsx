"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Container, Label, Reveal } from "@/components/ui";
import { faqs } from "@/data/stay";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const still = useReducedMotion();

  return (
    <section id="faq" className="border-t border-line py-24 sm:py-32">
      <Container narrow>
        <Label>Good to know</Label>
        <h2 className="display-lg mt-5 text-charcoal">Questions guests ask</h2>

        <Reveal>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-forest"
                    >
                      <span className="font-display text-[1.25rem] text-charcoal">{faq.q}</span>
                      <motion.span
                        className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line text-charcoal-soft"
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
                        <p className="max-w-2xl pb-7 pr-10 text-[0.98rem] leading-relaxed text-charcoal-soft">
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
