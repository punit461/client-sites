"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { SNAP } from "@/components/motion/Motion";
import { ArrowLink, Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { Label } from "@/components/ui/SectionHead";
import type { Service } from "@/content/types";

/**
 * "What do you need help with?" — a real radio group, so arrow keys, Tab and
 * screen readers all work without custom keyboard code. Choosing a problem
 * updates the panel (announced politely) with what we'd do and two next
 * steps: the service page, or the estimate form with that service preselected.
 */
export function ServiceSelector({ services }: { services: Service[] }) {
  const [slug, setSlug] = useState(services[0]?.slug);
  const id = useId();
  const still = useReducedMotion();
  const current = services.find((s) => s.slug === slug) ?? services[0];

  return (
    <section aria-labelledby={`${id}-title`} className="section-y bg-off">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Label>Start here</Label>
            <h2 id={`${id}-title`} className="t-h2 mt-4">
              What do you need help with?
            </h2>
            <fieldset className="mt-8">
              <legend className="sr-only">Choose the problem closest to yours</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <label
                    key={s.slug}
                    className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white px-4 py-3 font-display font-semibold transition-colors duration-150 hover:border-charcoal has-[:checked]:border-charcoal has-[:checked]:bg-charcoal has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue"
                  >
                    <input
                      type="radio"
                      name={`${id}-need`}
                      value={s.slug}
                      checked={slug === s.slug}
                      onChange={() => setSlug(s.slug)}
                      className="sr-only"
                    />
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[4px] bg-off text-blue transition-colors group-has-[:checked]:bg-lime group-has-[:checked]:text-charcoal">
                      <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                    </span>
                    {s.need}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-5">
            <div aria-live="polite" className="dark relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius-box)] bg-blue p-7 text-white sm:p-9">
              <div aria-hidden="true" className="hatch absolute inset-y-0 right-0 w-1/3 opacity-60" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={still ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={still ? { opacity: 0 } : { opacity: 0, x: -18 }}
                  transition={{ duration: 0.22, ease: SNAP }}
                  className="relative flex h-full flex-col"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-[var(--radius-box)] bg-lime text-charcoal">
                    <Icon name={current.icon} className="h-7 w-7" strokeWidth={1.8} />
                  </span>
                  <p className="t-label mt-7 text-white">{current.need}</p>
                  <h3 className="t-h3 mt-2 text-2xl sm:text-3xl">{current.name}</h3>
                  <p className="mt-4 flex-1 text-white">{current.selectorBlurb}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button href={`/request-a-quote/?service=${current.slug}`} variant="lime">
                      Get an estimate
                    </Button>
                    <ArrowLink href={`/services/${current.slug}/`} className="text-white">
                      How we handle it
                    </ArrowLink>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
