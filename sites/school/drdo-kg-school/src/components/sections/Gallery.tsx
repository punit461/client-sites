"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Img from "@/components/ui/Img";
import { gallery, galleryCategories } from "@/content/gallery";
import type { GalleryCategory, GalleryImage } from "@/content/types";
import { photoUrl } from "@/lib/images";

const ratio: Record<GalleryImage["orientation"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * Masonry gallery with category filters and a lightbox. The lightbox is a
 * native modal <dialog> (focus is trapped and restored, Escape closes), with
 * arrow keys, visible previous/next/close buttons and a live caption.
 */
export default function Gallery({ limit, filters = true }: { limit?: number; filters?: boolean }) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const items = useMemo(() => {
    const list = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const current = open === null ? null : items[open];

  return (
    <div>
      {filters ? (
        <div role="group" aria-label="Filter photographs" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {(["All", ...galleryCategories] as const).map((c) => {
            const count = c === "All" ? gallery.length : gallery.filter((g) => g.category === c).length;
            if (!count) return null;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className="min-h-11 shrink-0 rounded-xs border border-line px-4 text-[0.86rem] font-semibold text-slate transition hover:border-navy hover:text-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white"
              >
                {c} <span className="ml-1 font-normal opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {items.length} photographs{filter === "All" ? "" : ` in ${filter}`}.
      </p>

      {items.length === 0 ? (
        <p className="mt-10 rounded-xs border border-dashed border-line p-10 text-center">No photographs in this category yet.</p>
      ) : (
        <ul className={`columns-1 gap-4 sm:columns-2 lg:columns-3 ${filters ? "mt-8" : ""}`}>
          {items.map((g, i) => (
            <li key={`${g.src}-${g.category}`} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden rounded-xs bg-navy ${ratio[g.orientation]}`}
              >
                <Img photo={g} width={440} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy-deep/85 to-transparent p-4 pt-12 text-left text-white">
                  <span>
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">{g.category}</span>
                    <span className="mt-1 block text-[0.9rem]">{g.caption}</span>
                  </span>
                  <Expand className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                </span>
                <span className="sr-only">— open larger view</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label="Photograph viewer"
        className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-sm text-white/70" aria-live="polite">
                {open! + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex h-11 items-center gap-2 rounded-xs border border-white/30 px-4 text-sm font-semibold hover:bg-white hover:text-navy"
              >
                <X className="h-4 w-4" aria-hidden /> Close
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-20">
              <div className="relative h-full max-h-[78vh] w-full">
                <Image src={photoUrl(current, 1800)} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 pb-6 text-center text-[0.95rem]">
                <span className="mr-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">{current.category}</span>
                {current.caption}
              </figcaption>
            </figure>
            {items.length > 1 ? (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xs bg-white/10 hover:bg-white hover:text-navy sm:left-5">
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                  <span className="sr-only">Previous photograph</span>
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xs bg-white/10 hover:bg-white hover:text-navy sm:right-5">
                  <ChevronRight className="h-6 w-6" aria-hidden />
                  <span className="sr-only">Next photograph</span>
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
