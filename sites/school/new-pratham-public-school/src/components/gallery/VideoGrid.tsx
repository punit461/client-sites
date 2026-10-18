"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/primitives";
import { videos, type Video } from "@/data/videos";
import { asset, videoThumb } from "@/lib/assets";

/**
 * A YouTube video that costs nothing until it is played: the thumbnail is a
 * local file, and the iframe (with YouTube's cookies) is created on click.
 */
function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const thumb = videoThumb(video.id);

  return (
    <li className="card overflow-hidden">
      <div className="relative aspect-video bg-ink">
        {playing ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${video.title}`}
          >
            {thumb ? (
              <Image
                src={asset(thumb.src)}
                alt=""
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="object-cover opacity-90 transition group-hover:opacity-100"
              />
            ) : null}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-coral text-white shadow-[var(--shadow-lift)] transition group-hover:scale-105">
              <Play className="ml-1 h-6 w-6 fill-current" strokeWidth={1.5} aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-ink">{video.title}</h3>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${video.title} on YouTube`}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink/30 hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        </a>
      </div>
    </li>
  );
}

export default function VideoGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container wide>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
