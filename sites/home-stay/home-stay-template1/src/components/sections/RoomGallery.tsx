"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/**
 * A room's own images: one large plate with thumbnails beneath. Kept simple on
 * purpose — the room page already has a lot on it, and a carousel here would
 * compete with the gallery page.
 */
export default function RoomGallery({
  images,
  name,
}: {
  images: { src: string; alt: string }[];
  name: string;
}) {
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-ivory-2 sm:aspect-16/9">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={still ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1480px) 92vw, 1480px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto" role="tablist" aria-label={`${name} images`}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={image.alt}
              onClick={() => setActive(i)}
              className={`relative aspect-4/3 w-24 flex-none overflow-hidden rounded-xl transition-all duration-300 sm:w-32 ${
                i === active ? "ring-2 ring-forest ring-offset-2 ring-offset-ivory" : "opacity-65 hover:opacity-100"
              }`}
            >
              <Image src={image.src} alt="" fill sizes="128px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
