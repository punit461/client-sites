"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { faqGroups } from "@/data/content";

const ALL = "All";

/** Category tabs plus a search across every question and answer. */
export default function Faq() {
  const still = useReducedMotion();
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const categories = [ALL, ...faqGroups.map((g) => g.category)];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqGroups
      .filter((g) => category === ALL || g.category === category)
      .map((g) => ({
        category: g.category,
        items: g.items.filter((i) => !q || `${i.q} ${i.a}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length);
  }, [category, query]);

  const total = results.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container>
        <SectionHeading label="FAQ" title="Questions patients ask" align="center" />

        <div className="mx-auto mt-9 max-w-2xl">
          <label className="relative block">
            <span className="sr-only">Search the FAQ</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-faint"
              strokeWidth={1.8}
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions"
              className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 text-[0.92rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-forest"
            />
          </label>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="FAQ categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`flex-none rounded-full border px-4 py-2 text-[0.84rem] font-medium transition ${
                  category === c
                    ? "border-forest bg-forest text-paper"
                    : "border-line bg-surface text-ink hover:border-forest/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-[0.85rem] text-ink-soft" role="status" aria-live="polite">
          {total} {total === 1 ? "question" : "questions"}
        </p>

        <div className="mx-auto mt-6 max-w-3xl space-y-8">
          {results.map((groupItem) => (
            <div key={groupItem.category}>
              {category === ALL ? (
                <h3 className="label mb-2 text-forest">{groupItem.category}</h3>
              ) : null}
              <ul className="divide-y divide-line border-y border-line">
                {groupItem.items.map((faq) => {
                  const key = `${groupItem.category}-${faq.q}`;
                  const isOpen = open === key;
                  return (
                    <li key={key}>
                      <h4>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          aria-controls={`panel-${key}`}
                          className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-forest"
                        >
                          <span className="text-[1rem] font-semibold text-ink">{faq.q}</span>
                          <motion.span
                            className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line text-ink-soft"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: still ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                            aria-hidden
                          >
                            <Plus className="h-4 w-4" strokeWidth={2} />
                          </motion.span>
                        </button>
                      </h4>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={`panel-${key}`}
                            key="panel"
                            initial={still ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-2xl pb-6 pr-8 text-[0.94rem] leading-relaxed text-ink-soft">
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
          ))}

          {!total ? (
            <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-[0.92rem] text-ink-soft">
              Nothing matched that search. Call the clinic and someone will answer directly.
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
