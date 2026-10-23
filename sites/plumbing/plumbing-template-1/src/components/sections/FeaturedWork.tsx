import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/ArrowLink";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/content/gallery";
import type { GalleryItem } from "@/content/types";

/** Spans for an art-directed, asymmetric grid on wide screens. */
const layout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function WorkTile({ item, className = "", width = 900 }: { item: GalleryItem; className?: string; width?: number }) {
  return (
    <Link
      href={`/services/${item.service}/`}
      className={`group on-dark relative block overflow-hidden rounded-[1.1rem] bg-navy ${className}`}
    >
      <figure>
        <div className="zoom-img absolute inset-0">
          <Photo name={item.photo} width={width} sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <span className="t-eyebrow block text-copper-soft">{item.category}</span>
          <span className="mt-2 block font-display text-lg font-semibold text-ivory">{item.title}</span>
          <span className="mt-1 block max-w-md text-sm text-ivory/80">{item.caption}</span>
        </figcaption>
      </figure>
    </Link>
  );
}

export function FeaturedWork() {
  const items = gallery.slice(0, layout.length);
  return (
    <section aria-labelledby="work-title" className="section-y bg-white">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title="Repairs, remodels and everything between."
            lead="Recent work around Fort Worth — from a leaking washer valve to a full bathroom remodel and underground line replacement."
          />
          <TextLink href="/projects/" className="shrink-0 text-navy">
            See the full gallery
          </TextLink>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[15.5rem] lg:grid-cols-12 lg:gap-5">
          {items.map((item, i) => (
            <StaggerItem key={item.title} className={`${layout[i]} ${i === 0 ? "sm:col-span-2" : ""}`}>
              <WorkTile item={item} className="h-full min-h-[17rem]" width={i === 0 ? 1300 : 800} />
            </StaggerItem>
          ))}
        </Stagger>
        {items.some((i) => i.stock) ? (
          <p className="mt-6 text-sm text-slate">Some photographs show representative work and are not specific customer projects.</p>
        ) : (
          <p className="mt-6 text-sm text-slate">Photographs of our own work, from our Google Business Profile.</p>
        )}
      </div>
    </section>
  );
}
