"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/content";
import { asset } from "@/lib/asset";

/**
 * A masonry-style grid of photos with a full-screen viewer. The viewer is a
 * real modal dialog: focus moves into it, arrow keys step through photos,
 * Escape closes it and focus returns to the photo that opened it.
 */
export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const still = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (by: number) => setIndex((i) => (i === null ? i : (i + by + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return undefined;
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl bg-surface-2 text-left"
              aria-label={`View photo: ${p.caption}`}
            >
              <span className={`relative block ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={asset(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/80 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold text-white sm:text-sm">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            className="fixed inset-0 z-[90] flex flex-col bg-navy-dark/95 backdrop-blur"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <p className="text-sm font-semibold">
                {current.caption}
                <span className="ml-2 font-normal text-white/50">
                  {index! + 1} / {photos.length}
                </span>
              </p>
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Close photo viewer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative flex-1" onClick={close}>
              <Image src={asset(current.src)} alt={current.alt} fill sizes="100vw" className="object-contain p-2 sm:p-8" />
            </div>
            <div className="flex justify-center gap-3 pb-6 pt-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-full border border-white/25 p-3 text-white transition hover:bg-white/10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-full border border-white/25 p-3 text-white transition hover:bg-white/10"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
