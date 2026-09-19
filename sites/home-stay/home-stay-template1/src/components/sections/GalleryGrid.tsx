"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gallery, galleryCategories } from "@/data/stay";

/**
 * A masonry-ish gallery with a real lightbox: Escape closes, arrows move, the
 * page behind does not scroll, and every tile is a button so it is reachable
 * by keyboard.
 */
export default function GalleryGrid({
  limit,
  filterable = false,
}: {
  limit?: number;
  filterable?: boolean;
}) {
  const still = useReducedMotion();
  const [category, setCategory] = useState<string>("All");
  const [openAt, setOpenAt] = useState<number | null>(null);

  const items = useMemo(() => {
    const filtered =
      category === "All" ? [...gallery] : gallery.filter((g) => g.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [category, limit]);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenAt((i) => (i === null ? null : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openAt === null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [openAt, step]);

  const current = openAt === null ? null : items[openAt];

  return (
    <>
      {filterable ? (
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Gallery categories">
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`flex-none rounded-full border px-5 py-2.5 text-[0.84rem] tracking-wide transition ${
                category === c
                  ? "border-forest bg-forest text-ivory"
                  : "border-line bg-surface text-charcoal hover:border-charcoal/35"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      {/* CSS columns give a true masonry flow without measuring anything. */}
      <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setOpenAt(i)}
            aria-label={`Open ${item.alt} in the gallery`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[18px] bg-ivory-2"
          >
            <div className={`relative w-full ${item.tall ? "aspect-3/4" : "aspect-4/3"}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 46vw, 31vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
              />
            </div>
            <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/15" />
            <span className="label absolute bottom-3 left-4 text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------ lightbox */}
      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/94 p-4"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.alt} — gallery`}
          >
            <button
              type="button"
              onClick={() => setOpenAt(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 rounded-full border border-ivory/25 p-2.5 text-ivory transition hover:bg-ivory hover:text-charcoal"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 rounded-full border border-ivory/25 p-3 text-ivory transition hover:bg-ivory hover:text-charcoal sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 rounded-full border border-ivory/25 p-3 text-ivory transition hover:bg-ivory hover:text-charcoal sm:right-8"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <motion.figure
              key={current.src}
              className="w-full max-w-5xl"
              initial={still ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-[20px] sm:aspect-16/10">
                <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 text-center text-[0.86rem] text-ivory/65">
                {current.alt} · {openAt! + 1} of {items.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
