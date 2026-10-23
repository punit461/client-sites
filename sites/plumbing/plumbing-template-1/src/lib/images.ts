import { env } from "@/config/env";

/**
 * The photography library.
 *
 * Most photos are Blue Diamond Plumbing's own, downloaded from its Google
 * Business Profile into public/images/. The four Unsplash photos at the end
 * (https://unsplash.com/license) cover work the profile has no photo of —
 * water heaters, commercial premises and valves. Replace them as the company
 * photographs those jobs, and never caption a stock photo as a customer job.
 *
 * The static export cannot resize images (images.unoptimized), so each remote
 * photo is requested from the CDN at the width it is shown, in AVIF/WebP where
 * the browser supports it.
 */

export type Photo = {
  /** Unsplash photo id ("1676210134188-4c05dd172f89") or a path in public/. */
  src: string;
  alt: string;
};

export const photos = {
  // The company's own photos (Google Business Profile).
  bathroomTub: {
    src: "/images/bathroom-freestanding-tub.jpg",
    alt: "A finished bathroom with a curbless walk-in shower, marble-look tile, a linear drain and a freestanding soaking tub",
  },
  subwayShower: {
    src: "/images/subway-tile-shower.jpg",
    alt: "A walk-in shower in white subway tile with matte black fixtures and a linear drain, beside a newly fitted toilet",
  },
  clawfootShower: {
    src: "/images/clawfoot-tub-glass-shower.jpg",
    alt: "A primary bathroom with a clawfoot tub and a frameless glass shower enclosure",
  },
  showerPanRoughIn: {
    src: "/images/shower-pan-rough-in.jpg",
    alt: "A new mortar shower base and drain set inside open stud walls, with insulated supply pipes ready for the valve",
  },
  doubleVanity: {
    src: "/images/double-vanity-faucets.jpg",
    alt: "Matte black widespread faucets installed on a double vanity with a granite top",
  },
  yardExcavation: {
    src: "/images/yard-line-excavation.jpg",
    alt: "The Blue Diamond crew working in a trench dug across a front yard to reach an underground line",
  },
  pvcDrainCleanout: {
    src: "/images/pvc-drain-cleanout.jpg",
    alt: "A new section of 3-inch PVC drain line with a cleanout fitting, coupled to the existing pipe",
  },
  washerBoxValves: {
    src: "/images/washer-box-valves.jpg",
    alt: "Worn washing-machine supply valves dripping into a cup inside the wall outlet box",
  },
  barSinkFaucet: {
    src: "/images/bar-sink-faucet.jpg",
    alt: "A worn, corroded gooseneck faucet on a small stainless-steel bar sink",
  },
  serviceVan: {
    src: "/images/service-van.jpg",
    alt: "The white Blue Diamond Plumbing service van with the blue diamond logo, phone number and Texas RMP licence number",
  },

  // Licensed stock photos, for work the company has no photo of yet.
  waterHeaterWrench: {
    src: "1620653713380-7a34b773fef8",
    alt: "Adjustable pliers on the pipe fitting at the top of a hot water cylinder",
  },
  plantRoom: {
    src: "1650551182991-b07558247564",
    alt: "A plant room with insulated pipework, valves, pressure gauges and a circulation pump",
  },
  valveGauge: {
    src: "1761758674188-2b8e4c89c5e2",
    alt: "A red isolation valve handle above a pressure gauge on a water line",
  },
  commercialKitchen: {
    src: "1589109807644-924edf14ee09",
    alt: "A commercial kitchen with a stainless-steel dishwashing line and pre-rinse spray tap",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function asset(path: string) {
  return `${env.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function photoUrl(photo: Photo, width = 1200, height?: number) {
  if (photo.src.startsWith("/")) return asset(photo.src);
  const crop = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/photo-${photo.src}?auto=format&fit=crop&w=${width}${crop}&q=70`;
}
