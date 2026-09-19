"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { faqs } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const still = useReducedMotion();

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Label>FAQ</Label>
            <TextReveal
              text="Questions? We've got you."
              className="type-xl mt-5 max-w-[10ch] text-ink"
            />
          </div>

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
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-[1.05rem] font-bold tracking-tight text-ink sm:text-[1.15rem]">
                        {faq.q}
                      </span>
                      <motion.span
                        className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors ${
                          isOpen ? "bg-lime text-ink" : "border border-line text-ink"
                        }`}
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: still ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.4} />
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
                        <p className="max-w-2xl pb-7 pr-12 text-[0.95rem] leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
