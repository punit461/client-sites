import { env } from "@/config/env";

/**
 * The photography library.
 *
 * Most photos are Tx-Star Plumbing's own, downloaded from its Google Business
 * Profile into public/images/ — some date from when the company traded as
 * Beacon Plumbing, and show that name on vans and shirts. The four Unsplash
 * photos at the end (https://unsplash.com/license) cover work the profile has
 * no photo of. Replace them as the company photographs those jobs, and never
 * caption a stock photo as a customer job.
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
  teamAndVans: {
    src: "/images/team-and-vans.jpg",
    alt: "Three Tx-Star Plumbing technicians in uniform standing beside three white Tx-Star vans marked RMP 42130",
  },
  nightDrainCall: {
    src: "/images/night-drain-call.jpg",
    alt: "A drain-cleaning machine set up at a business's back door, with a Tx-Star van listing its services parked outside",
  },
  drainMachineYard: {
    src: "/images/drain-machine-yard-cleanout.jpg",
    alt: "A Spartan drain-cleaning machine on the lawn beside an open yard cleanout in a flower bed",
  },
  floorDrainCabling: {
    src: "/images/floor-drain-cabling.jpg",
    alt: "A technician in work gloves feeding a drain cable into a floor drain on a tiled commercial floor",
  },
  sewerPipeRepair: {
    src: "/images/sewer-pipe-repair.jpg",
    alt: "Two plumbers in a deep trench fitting new white PVC sewer pipe to the existing line",
  },
  waterLineTrench: {
    src: "/images/water-line-trench.jpg",
    alt: "A plumber working in a long trench beside an apartment parking lot to replace a buried water line",
  },
  gasWaterHeater: {
    src: "/images/gas-water-heater-install.jpg",
    alt: "A newly installed Rheem gas water heater on a stand and drain pan, with new flexible supply lines and gas connection",
  },
  officeDispatch: {
    src: "/images/office-dispatch.jpg",
    alt: "Two members of the office team taking customer calls at their desks",
  },
  vansDowntown: {
    src: "/images/vans-downtown-houston.jpg",
    alt: "Two company vans, in their earlier Beacon Plumbing livery and marked M42130, parked on Main Street in downtown Houston",
  },

  // Licensed stock photos, for work the company has no photo of yet.
  flushPlateInstall: {
    src: "1676210134050-6f12c6898395",
    alt: "A plumber in work gloves fitting a wall-mounted flush plate on marble-effect tiles",
  },
  bathroomStone: {
    src: "1763485956310-55f3c0e822d5",
    alt: "A stone-tiled bathroom with a matte black wall-mounted tap and rainfall shower",
  },
  pipeRuns: {
    src: "1646009445351-b8192e095f3a",
    alt: "Parallel runs of grey pipe with elbow joints on an exterior wall",
  },
  valveGauge: {
    src: "1761758674188-2b8e4c89c5e2",
    alt: "A red isolation valve handle above a pressure gauge on a water line",
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
