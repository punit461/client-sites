"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

/**
 * A YouTube video that loads nothing from YouTube until it is played: the
 * poster is a single image, and the player (with its scripts and cookies) only
 * arrives on click. Uses youtube-nocookie.com for the same reason.
 */
export default function VideoCard({ id, title, length }: { id: string; title: string; length: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
      <div className="relative aspect-video bg-navy-dark">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" aria-hidden />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-lift transition group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
            </span>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
              {length}
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-4 font-display text-lg font-semibold text-ink">{title}</figcaption>
    </figure>
  );
}
