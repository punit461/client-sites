import type { Area, Service } from "./types";
import { services } from "./services";

/**
 * Where the company works. PLACEHOLDERS: the names are generic and the postal
 * codes are from the unassigned 001xx range, so nothing here points at a real
 * place. Replace them with the towns, neighborhoods or postal codes the
 * company genuinely covers — and nowhere it does not.
 *
 * Every area gets a page, but only areas with `localNotes` are indexed and
 * listed in the sitemap. Write those notes from real experience in the area
 * (housing age, common problems, access, water hardness) — never generic
 * filler with the place name swapped in.
 */
export const areas: Area[] = [
  { slug: "northside", name: "Northside", region: "Example County", postalCodes: ["00101", "00102"], localNotes: [] },
  { slug: "riverside", name: "Riverside", region: "Example County", postalCodes: ["00103"], localNotes: [] },
  { slug: "old-town", name: "Old Town", region: "Example County", postalCodes: ["00104", "00105"], localNotes: [] },
  { slug: "westbrook", name: "Westbrook", region: "Example County", postalCodes: ["00106"], localNotes: [] },
  {
    slug: "lakeview",
    name: "Lakeview",
    region: "Example County",
    postalCodes: ["00107"],
    localNotes: [],
    excludedServices: ["sewer-line-inspection-repair"],
  },
  { slug: "eastgate", name: "Eastgate", region: "Example County", postalCodes: ["00108", "00109"], localNotes: [] },
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
