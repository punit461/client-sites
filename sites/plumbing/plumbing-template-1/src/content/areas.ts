import type { Area, Service } from "./types";
import { services } from "./services";

/**
 * Where the company works. Blue Diamond is based in North Fort Worth (76137),
 * and its Google reviews and owner replies place its work there and in Keller.
 * Add other towns only once the company confirms it covers them.
 *
 * Every area gets a page, but only areas with `localNotes` are indexed and
 * listed in the sitemap. Write those notes from real experience in the area
 * (housing age, common problems, access, water hardness) — never generic
 * filler with the place name swapped in.
 */
export const areas: Area[] = [
  {
    slug: "north-fort-worth",
    name: "North Fort Worth",
    region: "Fort Worth, TX",
    postalCodes: ["76137", "76131", "76244"],
    localNotes: [
      "Our base is on Eastwedge Drive in 76137, so homes across North Fort Worth are usually the quickest for us to reach — late at night and on holidays included.",
      "Customers here recommend us on Google “for any plumbing need in the North Fort Worth area” — from frozen pipes to water heater replacements.",
    ],
  },
  {
    slug: "keller",
    name: "Keller",
    region: "Tarrant County, TX",
    postalCodes: ["76248"],
    localNotes: [
      "Keller is a short drive up from our North Fort Worth base. One Keller customer called us last-minute about a broken faucet and had the water back on the same day.",
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export function servicesIn(area: Area): Service[] {
  return services.filter((s) => !area.excludedServices?.includes(s.slug));
}

/** An area page is worth indexing only when it says something local. */
export const isIndexable = (area: Area) => area.localNotes.length > 0;

export const areaNames = areas.map((a) => a.name);

/** "Northside, Riverside and Old Town" */
export function listNames(names: string[]) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
