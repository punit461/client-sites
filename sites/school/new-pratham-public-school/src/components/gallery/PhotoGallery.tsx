"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { albums, asset, type GalleryImage } from "@/lib/assets";

type Flat = GalleryImage & { album: string; albumSlug: string };

/**
 * Every album the school published, each as a row of photographs, with a
 * keyboard-navigable lightbox. Albums with one photo are shown as a single
 * wide card so the page does not become a column of thumbnails.
 */
export default function PhotoGallery() {
  const still = useReducedMotion();
  const flat = useMemo<Flat[]>(
    () => albums.flatMap((a) => a.images.map((img) => ({ ...img, album: a.title, albumSlug: a.slug }))),
    [],
  );
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? null : (i + delta + flat.length) % flat.length)),
    [flat.length],
  );

  useEffect(() => {
    if (index === null) return undefined;
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

  const current = index === null ? null : flat[index];

  return (
    <section className="py-16 sm:py-24">
      <Container wide>
        <div className="space-y-14">
          {albums.map((album) => {
            const start = flat.findIndex((f) => f.albumSlug === album.slug);
            const single = album.images.length === 1;
            return (
              <article key={album.slug} id={album.slug} className="scroll-mt-28">
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-4">
                  <h2 className="font-display text-[1.3rem] font-semibold leading-snug text-ink sm:text-[1.5rem]">{album.title}</h2>
                  <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {album.images.length} {album.images.length === 1 ? "photo" : "photos"}
                  </span>
                </header>
                <ul className={`mt-5 grid gap-3 sm:gap-4 ${single ? "grid-cols-1 sm:grid-cols-[minmax(0,32rem)]" : "grid-cols-2 md:grid-cols-4"}`}>
                  {album.images.map((image, i) => (
                    <li key={image.src}>
                      <button
                        type="button"
                        onClick={() => setIndex(start + i)}
                        className={`group relative block w-full overflow-hidden rounded-2xl bg-surface-2 ${single ? "aspect-[4/3]" : "aspect-square"}`}
                        aria-label={`Open photo ${i + 1} of ${album.images.length} from ${album.title}`}
                      >
                        <Image
                          src={asset(image.thumb)}
                          alt=""
                          fill
                          sizes={single ? "(max-width: 640px) 92vw, 32rem" : "(max-width: 768px) 46vw, 24vw"}
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>

      {/* ------------------------------------------------------ lightbox */}
      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-cream"
            role="dialog"
            aria-modal="true"
            aria-label={`${current.album} — photo ${index! + 1} of ${flat.length}`}
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="min-w-0 truncate text-[0.85rem]">
                <span className="font-semibold">{current.album}</span>
                <span className="text-cream/60">
                  {" "}
                  · {index! + 1} / {flat.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-cream/20 transition hover:bg-cream/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 px-2 pb-4 sm:px-16">
              <button type="button" onClick={close} className="absolute inset-0 cursor-default" aria-label="Close" tabIndex={-1} />
              <motion.div
                key={current.src}
                className="relative mx-auto h-full w-full max-w-6xl"
                initial={still ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={asset(current.src)} alt={current.album} fill sizes="100vw" className="object-contain" priority />
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 backdrop-blur transition hover:bg-cream/20 sm:left-4"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 backdrop-blur transition hover:bg-cream/20 sm:right-4"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
