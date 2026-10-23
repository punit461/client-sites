import { env } from "@/config/env";

/**
 * Photography: free-licence Unsplash photos (https://unsplash.com/license) of
 * real plumbing work and finished bathrooms and kitchens, each checked by eye.
 * They are stock images, not the company's own jobs — replace them with the
 * company's photos (in public/images/, referenced as "/images/x.jpg") as soon
 * as it has them, and never caption a stock photo as a customer project.
 *
 * The static export cannot resize images (images.unoptimized), so each photo
 * is requested from the CDN at the width its slot needs.
 */
export type Photo = { src: string; alt: string };

export const photos = {
  plumberBathroom: {
    src: "1749532125405-70950966b0e5",
    alt: "A plumber in work overalls fitting pipework behind the toilet in a modern tiled bathroom",
  },
  plumberUnderBasin: {
    src: "1676210134188-4c05dd172f89",
    alt: "A plumber tightening the waste pipe beneath a bathroom basin",
  },
  basinTrap: { src: "1676210133055-eab6ef033ce3", alt: "Hands fitting a white waste trap beneath a basin" },
  basinSupply: { src: "1676210134190-3f2c0d5cf58d", alt: "A plumber tightening the supply connection under a basin" },
  flushPlate: {
    src: "1676210134050-6f12c6898395",
    alt: "A plumber in work gloves fitting a wall-mounted flush plate on stone-effect tiles",
  },
  waterHeater: { src: "1620653713380-7a34b773fef8", alt: "Pliers on the pipe fitting at the top of a hot water tank" },
  faucetGlass: { src: "1542013936693-884638332954", alt: "A hand opening a chrome kitchen faucet as water fills a glass" },
  roughIn: {
    src: "1768321913920-d3ac011e0683",
    alt: "New supply and waste pipes roughed in to a timber stud wall during a bathroom renovation",
  },
  plantRoom: { src: "1650551182991-b07558247564", alt: "Insulated pipework, valves and pressure gauges in a plant room" },
  valveGauge: { src: "1761758674188-2b8e4c89c5e2", alt: "A red isolation valve handle above a pressure gauge" },
  bathroomBright: {
    src: "1584622650111-993a426fbf0a",
    alt: "A bright bathroom with a glass walk-in shower, white toilet and double vanity",
  },
  bathroomStone: { src: "1763485956310-55f3c0e822d5", alt: "A stone-tiled bathroom with a matte black faucet and rainfall shower" },
  bathroomWarm: { src: "1781344334947-60c704bafd51", alt: "A warm-toned bathroom with twin vessel basins and a freestanding tub" },
  bathroomWhite: { src: "1629079447777-1e605162dc8d", alt: "A white bathroom with twin vessel basins and a tiled shower" },
  commercialKitchen: {
    src: "1589109807644-924edf14ee09",
    alt: "A commercial kitchen with a stainless-steel dishwashing line and pre-rinse faucet",
  },
  brassLeak: { src: "1596394723269-b2cbca4e6313", alt: "Water running from a worn brass pipe outlet" },
  pipeRuns: { src: "1646009445351-b8192e095f3a", alt: "Parallel runs of grey pipe with elbow joints on an exterior wall" },
  kitchenSink: { src: "1775359924006-557dba8c862b", alt: "A white farmhouse sink with a matte black faucet beneath a window" },
  serviceMain: { src: "1607472586893-edb57bdc0e39", alt: "Large flanged water pipework with valves on a brick wall" },
  ceilingPipe: { src: "1639600993675-2281b2c939f0", alt: "A steel pipe with a brass drain valve hung from a commercial ceiling" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function asset(path: string) {
  return `${env.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function photoUrl(photo: Photo, width = 1200, height?: number) {
  if (photo.src.startsWith("/")) return asset(photo.src);
  return `https://images.unsplash.com/photo-${photo.src}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=70`;
}
