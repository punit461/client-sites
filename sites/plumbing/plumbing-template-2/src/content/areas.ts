import type { Area } from "./types";

/**
 * Where the company works. Tx-Star is a Houston plumber based in Spring Branch;
 * its reviews and photos show work there and in downtown Houston. Other Houston
 * neighborhoods are "confirm": the area checker asks people to call rather
 * than promising a visit. Add areas only once the company confirms it covers
 * them.
 *
 * `coverage: "confirm"` marks the edge of the range: the area checker tells
 * people to get in touch rather than promising a visit.
 */
export const areas: Area[] = [
  {
    slug: "spring-branch",
    name: "Spring Branch",
    region: "Houston, TX",
    postalCodes: ["77080", "77055", "77043"],
    coverage: "covered",
    localNotes: [
      "Spring Branch is home turf — our office is here, so it's usually the quickest area for us to reach.",
      "Older Spring Branch homes can have concrete or clay sewer pipe that roots break into. One homeowner here had a year of drain stoppages before our camera showed roots growing through the pipe; we replaced the line for the price we quoted.",
    ],
  },
  {
    slug: "downtown-houston",
    name: "Downtown Houston",
    region: "Houston, TX",
    postalCodes: ["77002", "77010"],
    coverage: "covered",
    localNotes: [
      "We've taken calls in downtown Houston since our days as Beacon Plumbing — our vans are pictured on Main Street in our project photos.",
    ],
  },
  {
    slug: "greater-houston",
    name: "Greater Houston",
    region: "Harris County, TX",
    postalCodes: [],
    coverage: "confirm",
    localNotes: [],
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);

export const isIndexable = (a: Area) => a.localNotes.length > 0;

export function listNames(names: string[]) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export type CoverageResult =
  | { status: "covered"; area: Area }
  | { status: "confirm"; area: Area }
  | { status: "outside"; postalCode: string }
  | { status: "unknown"; suggestions: Area[] };

/** Houston-area ZIP codes (770xx–775xx) we may reach — asked to confirm by phone. */
const isHoustonZip = (zip: string) => /^77[0-5]\d\d$/.test(zip);

/**
 * Checks a postal code or place name against the configured areas.
 *
 * Only a well-formed postal code that is not on the list is reported as
 * outside the area. A place name we don't recognise is "unknown" — we can't
 * know it's outside, so we ask the visitor to contact us rather than guess.
 */
export function checkCoverage(raw: string): CoverageResult | null {
  const input = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (!input) return null;

  const digits = input.replace(/[\s-]/g, "");
  if (/^\d+$/.test(digits)) {
    // ZIP or ZIP+4; anything else is a typo we shouldn't guess at.
    if (digits.length !== 5 && digits.length !== 9) return { status: "unknown", suggestions: [] };
    const postal = digits.slice(0, 5);
    const area = areas.find((a) => a.postalCodes.includes(postal));
    if (area) return { status: area.coverage, area };
    // Elsewhere in Houston: not promised, but worth a call.
    const greater = areas.find((a) => a.slug === "greater-houston");
    if (greater && isHoustonZip(postal)) return { status: "confirm", area: greater };
    return { status: "outside", postalCode: postal };
  }

  const exact = areas.find((a) => a.name.toLowerCase() === input || a.slug === input.replace(/ /g, "-"));
  if (exact) return { status: exact.coverage, area: exact };

  const suggestions = input.length >= 2 ? areas.filter((a) => a.name.toLowerCase().includes(input)) : [];
  return { status: "unknown", suggestions };
}
