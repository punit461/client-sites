import { env } from "@/config/env";

/**
 * The photography library. Every image is a free-licence Unsplash photo
 * (https://unsplash.com/license) chosen because it shows real plumbing work or
 * finished bathrooms and kitchens — no generic office scenes.
 *
 * These are stock photographs, not the company's own jobs. Replace them with
 * the company's photographs as soon as it has them, and never caption a stock
 * photo as a customer project.
 *
 * The static export cannot resize images (images.unoptimized), so each photo is
 * requested from the CDN at the width it is shown, in AVIF/WebP where the
 * browser supports it.
 */

export type Photo = {
  /** Unsplash photo id ("1676210134188-4c05dd172f89") or a path in public/. */
  src: string;
  alt: string;
};

export const photos = {
  plumberUnderBasin: {
    src: "1676210134188-4c05dd172f89",
    alt: "A plumber in a red shirt tightening the waste pipe under a bathroom basin",
  },
  plumberBathroom: {
    src: "1749532125405-70950966b0e5",
    alt: "A plumber in work overalls fitting pipework behind the toilet in a tiled bathroom, toolbox beside him",
  },
  basinTrapCloseUp: {
    src: "1676210133055-eab6ef033ce3",
    alt: "Close-up of hands fitting a white waste trap beneath a basin",
  },
  basinConnection: {
    src: "1676210134190-3f2c0d5cf58d",
    alt: "A plumber reaching up to tighten the tap connection under a basin",
  },
  flushPlateInstall: {
    src: "1676210134050-6f12c6898395",
    alt: "A plumber in work gloves fitting a wall-mounted flush plate on marble-effect tiles",
  },
  waterHeaterWrench: {
    src: "1620653713380-7a34b773fef8",
    alt: "Adjustable pliers on the pipe fitting at the top of a hot water cylinder",
  },
  kitchenTapRunning: {
    src: "1542013936693-884638332954",
    alt: "A hand opening a chrome kitchen tap as water fills a glass",
  },
  bathroomRoughIn: {
    src: "1768321913920-d3ac011e0683",
    alt: "New insulated supply and waste pipes roughed in to a timber stud wall during a bathroom renovation",
  },
  plantRoom: {
    src: "1650551182991-b07558247564",
    alt: "A plant room with insulated pipework, valves, pressure gauges and a circulation pump",
  },
  valveGauge: {
    src: "1761758674188-2b8e4c89c5e2",
    alt: "A red isolation valve handle above a pressure gauge on a water line",
  },
  bathroomBright: {
    src: "1584622650111-993a426fbf0a",
    alt: "A bright bathroom with a glass walk-in shower, white toilet and a double vanity",
  },
  bathroomStone: {
    src: "1763485956310-55f3c0e822d5",
    alt: "A stone-tiled bathroom with a matte black wall-mounted tap and rainfall shower",
  },
  bathroomWarm: {
    src: "1781344334947-60c704bafd51",
    alt: "A warm-toned bathroom with twin vessel basins and a freestanding bathtub",
  },
  bathroomWhite: {
    src: "1629079447777-1e605162dc8d",
    alt: "A white bathroom with twin vessel basins, wall-mounted taps and a tiled shower",
  },
  commercialKitchen: {
    src: "1589109807644-924edf14ee09",
    alt: "A commercial kitchen with a stainless-steel dishwashing line and pre-rinse spray tap",
  },
  brassLeak: {
    src: "1596394723269-b2cbca4e6313",
    alt: "Water running from a worn brass pipe outlet",
  },
  pipeRuns: {
    src: "1646009445351-b8192e095f3a",
    alt: "Parallel runs of grey pipe with elbow joints on an exterior wall",
  },
  kitchenSink: {
    src: "1775359924006-557dba8c862b",
    alt: "A white farmhouse kitchen sink with a matte black pull-down tap beneath a window",
  },
  serviceMain: {
    src: "1607472586893-edb57bdc0e39",
    alt: "Large flanged water pipework with valves mounted against a brick wall",
  },
  ceilingPipework: {
    src: "1639600993675-2281b2c939f0",
    alt: "A steel pipe with a brass drain valve hung from the ceiling of a commercial building",
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
