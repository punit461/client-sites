"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import type { GalleryItem } from "@/content/types";
import { WorkTile } from "./FeaturedWork";

/**
 * Category filter for the work gallery. Buttons use aria-pressed (a toggle
 * group, not tabs: the content is one list, filtered), and the result count is
 * announced politely so screen-reader users know the list changed.
 */
export function GalleryFilter({ items, categories }: { items: GalleryItem[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const still = useReducedMotion();
  const shown = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className="min-h-11 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-navy transition-colors hover:border-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-ivory"
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "photo" : "photos"}
        {active === "All" ? "" : ` in ${active}`}.
      </p>

      <motion.ul layout={!still} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item) => (
            <motion.li
              key={item.title}
              layout={!still}
              initial={still ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <WorkTile item={item} className="aspect-[4/3] h-full" width={800} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
