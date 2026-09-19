"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gallery, galleryCategories } from "@/data/stay";
import { numeral } from "@/lib/format";

/**
 * Two ways of showing the same photographs: a filmstrip that runs off the edge
 * of the page, and a filterable grid. Both open the same lightbox — Escape
 * closes it, arrows move through it, the page behind does not scroll, and
 * every tile is a button so it is reachable by keyboard.
 */
export default function GalleryStrip({
  variant = "strip",
}: {
  variant?: "strip" | "grid";
}) {
  const still = useReducedMotion();
  const [category, setCategory] = useState<string>("All");
  const [openAt, setOpenAt] = useState<number | null>(null);

  const items = useMemo(
    () => (category === "All" ? [...gallery] : gallery.filter((g) => g.category === category)),
    [category],
  );

  const step = useCallback(
    (dir: 1 | -1) => setOpenAt((i) => (i === null ? null : (i + dir + items.length) % items.length)),
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
      {variant === "grid" ? (
        <div
          className="no-scrollbar mb-10 flex gap-2 overflow-x-auto"
          role="tablist"
          aria-label="Gallery categories"
        >
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`flex-none rounded-sm border px-5 py-2.5 text-[0.82rem] tracking-wide transition-colors ${
                category === c
                  ? "border-brass bg-brass text-ink"
                  : "border-line text-bone-soft hover:border-brass/60 hover:text-bone"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      {variant === "grid" ? (
        /* CSS columns give a masonry flow without measuring anything. */
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {items.map((item, i) => (
            <Tile key={`${item.src}-${i}`} index={i} item={item} onOpen={() => setOpenAt(i)} />
          ))}
        </div>
      ) : (
        <ul className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-14">
          {items.map((item, i) => (
            <li
              key={`${item.src}-${i}`}
              className={`flex-none snap-start last:mr-5 sm:last:mr-8 lg:last:mr-14 ${
                item.tall ? "w-[62vw] sm:w-[19rem]" : "w-[78vw] sm:w-[27rem]"
              }`}
            >
              <Tile index={i} item={item} onOpen={() => setOpenAt(i)} fixedAspect />
            </li>
          ))}
        </ul>
      )}

      {/* ------------------------------------------------------- lightbox */}
      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/96 p-4"
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
              className="absolute right-4 top-4 rounded-sm border border-bone/25 p-2.5 text-bone transition-colors hover:border-brass hover:text-brass"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 rounded-sm border border-bone/25 p-3 text-bone transition-colors hover:border-brass hover:text-brass sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 rounded-sm border border-bone/25 p-3 text-bone transition-colors hover:border-brass hover:text-brass sm:right-8"
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
              <div className="relative aspect-4/3 overflow-hidden rounded-sm sm:aspect-16/10">
                <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-cover" />
              </div>
              <figcaption className="mono mt-4 text-center text-[0.76rem] text-bone-faint">
                {current.alt} · {numeral(openAt! + 1)} of {numeral(items.length)}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Tile({
  item,
  index,
  onOpen,
  fixedAspect = false,
}: {
  item: (typeof gallery)[number];
  index: number;
  onOpen: () => void;
  fixedAspect?: boolean;
}) {
  const ratio = item.tall ? "aspect-3/4" : "aspect-4/3";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.alt} in the gallery`}
      className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm bg-ink-2"
    >
      <div className={`relative w-full ${fixedAspect ? (item.tall ? "aspect-3/4" : "aspect-16/10") : ratio}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 78vw, 31vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <span
        className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25"
        aria-hidden
      />
      <span className="mono absolute left-4 top-4 text-[0.7rem] text-bone/70">{numeral(index + 1)}</span>
      <span className="label absolute bottom-4 left-4 text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {item.category}
      </span>
    </button>
  );
}
