"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { stainCategories, stains, type StainCategory } from "@/data/content";

type Filter = StainCategory | "all";

/**
 * A searchable stain guide: type or filter, then open one for what to do now
 * and what happens at the wash house.
 *
 * The success figures come from the data file because they are a claim about
 * the business — set them to what an operator can actually evidence, or empty
 * the list and the section disappears rather than inventing numbers.
 */
export default function StainGuide() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const searchId = useId();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(stains[0]?.id ?? null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stains.filter((stain) => {
      const matchesFilter = filter === "all" || stain.category === filter;
      const matchesQuery =
        !needle ||
        stain.name.toLowerCase().includes(needle) ||
        stain.treatment.toLowerCase().includes(needle) ||
        stain.firstAid.toLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <section id="stains" className="relative py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Stain guide</Eyebrow>
          <WordReveal
            text="Tell us what happened. We have seen it."
            className="display-lg mt-5 font-semibold text-mist"
          />
          <p className="mt-6 text-[1.02rem] leading-relaxed text-mist-soft">
            What you do in the first ten minutes decides most of it. Find the stain, follow the one
            instruction, and leave the rest in the bag.
          </p>
        </div>

        {/* ------------------------------------------------------- controls */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search stains
              </label>
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mist-faint"
                aria-hidden
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Red wine, turmeric, engine grease…"
                className="w-full rounded-full border border-line bg-surface py-4 pl-14 pr-12 text-[0.95rem] text-mist outline-none transition placeholder:text-mist-faint focus:border-ice/70"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-mist-faint transition hover:text-mist"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by kind of stain">
              {([{ id: "all", label: "Everything" }, ...stainCategories] as const).map(
                (category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFilter(category.id as Filter)}
                    aria-pressed={filter === category.id}
                    className={`rounded-full border px-4 py-2 text-[0.82rem] font-medium transition ${
                      filter === category.id
                        ? "border-ice bg-ice text-night"
                        : "border-line text-mist-soft hover:border-white/25 hover:text-mist"
                    }`}
                  >
                    {category.label}
                  </button>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-[0.8rem] text-mist-faint" role="status">
          {results.length} {results.length === 1 ? "stain" : "stains"} listed
        </p>

        {/* -------------------------------------------------------- results */}
        {results.length ? (
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-panel border border-line">
            {results.map((stain) => {
              const isOpen = stain.id === openId;
              return (
                <li key={stain.id} className={isOpen ? "bg-surface/60" : "bg-surface/20"}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : stain.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] sm:px-6"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.05rem] font-medium tracking-tight text-mist">
                          {stain.name}
                        </span>
                        <span className="mt-1 block text-[0.78rem] text-mist-faint">
                          {stainCategories.find((c) => c.id === stain.category)?.label}
                          {stain.included ? "" : " · quoted separately"}
                        </span>
                      </span>

                      <span className="flex-none text-right">
                        <span className="block font-display text-[1.15rem] font-semibold tabular-nums text-ice">
                          {stain.success}%
                        </span>
                        <span className="block text-[0.68rem] uppercase tracking-wider text-mist-faint">
                          removed
                        </span>
                      </span>

                      <span
                        className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line text-mist-soft transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={still ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 px-5 pb-6 sm:grid-cols-2 sm:px-6">
                          <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
                            <p className="eyebrow text-gold">Do this now</p>
                            <p className="mt-2 text-[0.9rem] leading-relaxed text-mist">
                              {stain.firstAid}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-line bg-night/40 p-4">
                            <p className="eyebrow text-mist-faint">Then we</p>
                            <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-soft">
                              {stain.treatment}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-4 rounded-panel border border-dashed border-line px-6 py-14 text-center">
            <p className="font-display text-[1.15rem] font-medium text-mist">
              Nothing here matches &ldquo;{query}&rdquo;
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-mist-soft">
              The list is not exhaustive and an unfamiliar stain is still worth sending. Describe it
              when you book and a specialist looks at it before anything is washed.
            </p>
            <button
              type="button"
              onClick={() => open()}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 text-[0.88rem] font-semibold text-night transition hover:bg-ice-deep"
            >
              Send it to a specialist
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
