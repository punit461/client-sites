"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal, { Stagger, staggerItem } from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { videos } from "@/data/videos";
import { albums, allGalleryImages, asset } from "@/lib/assets";

/** A hand-picked spread: one photo from each of the first albums. */
function pick(count: number) {
  const out: (typeof allGalleryImages)[number][] = [];
  const seen = new Set<string>();
  for (const image of allGalleryImages) {
    if (seen.has(image.albumSlug)) continue;
    seen.add(image.albumSlug);
    out.push(image);
    if (out.length === count) break;
  }
  return out;
}

export default function GalleryPreview() {
  // Ten photos, two of them two rows tall, fill a 4 x 3 grid with no gaps.
  const spread = pick(10);
  const tall = new Set([0, 3]);

  return (
    <section id="gallery" className="bg-ink py-20 text-cream sm:py-28">
      <Container wide>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              light
              eyebrow="Gallery"
              title="School life, in pictures."
              copy={`${allGalleryImages.length} photographs across ${albums.length} albums, and ${videos.length} videos of celebrations and school days.`}
            />
            <div className="flex flex-none flex-wrap gap-3">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-3 text-[0.88rem] font-semibold text-ink transition hover:bg-saffron-deep"
              >
                <Camera className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Photo gallery
              </Link>
              <Link
                href="/gallery/videos"
                className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-3 text-[0.88rem] font-semibold text-cream transition hover:bg-cream/10"
              >
                <Play className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Videos
              </Link>
            </div>
          </div>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {spread.map((image, i) => (
            <motion.li
              key={image.src}
              variants={staggerItem}
              className={`relative overflow-hidden rounded-2xl bg-cream/5 ${tall.has(i) ? "row-span-2 aspect-[3/4] sm:aspect-auto" : "aspect-square"}`}
            >
              <Link href={`/gallery#${image.albumSlug}`} className="group block h-full w-full">
                <Image
                  src={asset(image.thumb)}
                  alt={image.album}
                  fill
                  sizes="(max-width: 640px) 46vw, 24vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-3 pt-10 text-[0.72rem] font-semibold leading-snug text-cream opacity-0 transition group-hover:opacity-100">
                  {image.album}
                </span>
              </Link>
            </motion.li>
          ))}
        </Stagger>

        <Reveal className="mt-8 text-center">
          <Link href="/gallery" className="group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-saffron hover:text-cream">
            See every album
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
