"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { faqs } from "@/data/content";
import { contact } from "@/data/site";

/**
 * The accordion. One answer open at a time, and the height animates with the
 * `grid-template-rows: 0fr → 1fr` trick rather than JavaScript — no measuring,
 * and the answer stays in the document for find-on-page and for search engines
 * even while it is closed.
 */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <WordReveal
              text="The things people ask before joining."
              className="display-lg mt-5 font-semibold text-mist"
            />
            <p className="mt-6 text-[0.98rem] leading-relaxed text-mist-soft">
              Anything not here, the concierge answers in a few minutes during collection hours.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-6 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ice transition hover:text-mist"
            >
              {contact.email}
            </a>
          </div>

          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              {faqs.map((faq, index) => {
                const isOpen = index === openIndex;
                return (
                  <li key={faq.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start gap-5 py-6 text-left"
                      >
                        <span
                          className={`flex-1 font-display text-[1.05rem] font-medium leading-snug tracking-tight transition-colors sm:text-[1.15rem] ${
                            isOpen ? "text-mist" : "text-mist-soft"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-colors ${
                            isOpen
                              ? "border-ice bg-ice text-night"
                              : "border-line text-mist-soft"
                          }`}
                          aria-hidden
                        >
                          {isOpen ? (
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          ) : (
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          )}
                        </span>
                      </button>
                    </h3>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-7 pr-12 text-[0.94rem] leading-relaxed text-mist-soft">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
