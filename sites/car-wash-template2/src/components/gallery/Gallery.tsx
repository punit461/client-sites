"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems, galleryCategories } from "@/data/gallery";
import { GalleryItem } from "@/types";
import { fadeUp } from "@/utils/animations";

const categoryGradients: Record<string, string> = {
  exterior: "from-blue-100 to-blue-200",
  interior: "from-amber-50 to-amber-100",
  detailing: "from-primary-light to-primary/20",
  ceramic: "from-purple-50 to-purple-100",
};

const categoryEmojis: Record<string, string> = {
  exterior: "🚗",
  interior: "🪑",
  detailing: "✨",
  ceramic: "🛡️",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter(
          (item: GalleryItem) => item.category === activeFilter,
        );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1,
    );
  }, [filteredItems.length]);

  const nextItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1,
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, prevItem, nextItem]);

  const currentItem = filteredItems[lightboxIndex];

  return (
    <section id="gallery" className="bg-primary-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Gallery
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Our{" "}
            <span className="text-gradient-orange">Work</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 flex gap-3 overflow-x-auto pb-2"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                activeFilter === cat.id
                  ? "bg-primary text-white"
                  : "bg-white text-text-primary hover:bg-primary/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[item.category]}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-40">
                    {categoryEmojis[item.category]}
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-primary/80 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    View
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <div
              className="relative max-h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`flex h-full min-h-[300px] w-full items-center justify-center rounded-2xl bg-gradient-to-br ${categoryGradients[currentItem.category]}`}
              >
                <p className="px-8 text-center text-xl font-semibold text-text-primary md:text-2xl">
                  {currentItem.alt}
                </p>
              </div>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={prevItem}
                className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextItem}
                className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
