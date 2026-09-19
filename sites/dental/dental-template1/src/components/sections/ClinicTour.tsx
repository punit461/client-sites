"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { tour } from "@/data/content";

export default function ClinicTour() {
  const still = useReducedMotion();
  const [openAt, setOpenAt] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setOpenAt((i) => (i === null ? null : (i + dir + tour.length) % tour.length)),
    [],
  );

  // Escape closes; arrows move between images; the page must not scroll behind.
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

  const current = openAt === null ? null : tour[openAt];

  return (
    <section className="py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="The practice"
          title="Take a look inside"
          copy="The rooms you will actually be in. Replace these with the practice's own photography before launch."
        />

        <Reveal>
          {/* A masonry-ish grid: the first tile spans two columns and two rows. */}
          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:grid-cols-4">
            {tour.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setOpenAt(i)}
                className={`group relative overflow-hidden rounded-[18px] bg-surface-2 ${
                  item.span === "wide" ? "col-span-2 row-span-2" : ""
                }`}
                aria-label={`Open ${item.label} in the gallery`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={item.span === "wide" ? "(max-width: 1024px) 92vw, 46vw" : "(max-width: 1024px) 46vw, 23vw"}
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[0.82rem] font-semibold text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* ---------------------------------------------------- lightbox */}
      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/92 p-4"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.label} — clinic gallery`}
          >
            <button
              type="button"
              onClick={() => setOpenAt(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 rounded-full border border-ivory/20 p-2.5 text-ivory transition hover:bg-ivory hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 rounded-full border border-ivory/20 p-3 text-ivory transition hover:bg-ivory hover:text-ink sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 rounded-full border border-ivory/20 p-3 text-ivory transition hover:bg-ivory hover:text-ink sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={current.label}
              className="w-full max-w-4xl"
              initial={still ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-[20px]">
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-[0.88rem] text-ivory/70">
                {current.label} · {openAt! + 1} of {tour.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
