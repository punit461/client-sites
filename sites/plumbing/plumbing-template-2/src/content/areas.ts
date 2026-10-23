import type { Area } from "./types";

/**
 * Where the company works. PLACEHOLDERS: generic names, and postal codes from
 * the unassigned 001xx range so nothing points at a real place. Replace with
 * the areas the company genuinely covers.
 *
 * `coverage: "confirm"` marks the edge of the range: the area checker tells
 * people to get in touch rather than promising a visit.
 */
export const areas: Area[] = [
  { slug: "harbor-district", name: "Harbor District", region: "Example County", postalCodes: ["00111", "00112"], coverage: "covered", localNotes: [] },
  { slug: "midtown", name: "Midtown", region: "Example County", postalCodes: ["00113"], coverage: "covered", localNotes: [] },
  { slug: "northgate", name: "Northgate", region: "Example County", postalCodes: ["00114", "00115"], coverage: "covered", localNotes: [] },
  { slug: "elm-park", name: "Elm Park", region: "Example County", postalCodes: ["00116"], coverage: "covered", localNotes: [] },
  { slug: "southfield", name: "Southfield", region: "Example County", postalCodes: ["00117"], coverage: "covered", localNotes: [] },
  { slug: "cedar-hills", name: "Cedar Hills", region: "Example County", postalCodes: ["00118"], coverage: "confirm", localNotes: [] },
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
    if (!area) return { status: "outside", postalCode: postal };
    return { status: area.coverage, area };
  }

  const exact = areas.find((a) => a.name.toLowerCase() === input || a.slug === input.replace(/ /g, "-"));
  if (exact) return { status: exact.coverage, area: exact };

  const suggestions = input.length >= 2 ? areas.filter((a) => a.name.toLowerCase().includes(input)) : [];
  return { status: "unknown", suggestions };
}
