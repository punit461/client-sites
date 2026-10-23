import type { Area } from "./types";

/**
 * Where the company works. PLACEHOLDERS: generic names, and postal codes from
 * the unassigned 001xx range so nothing points at a real place. Replace them
 * with the areas the company genuinely covers.
 *
 * `coverage: "confirm"` marks the edge of the range — the checker asks people
 * to get in touch instead of promising a visit.
 */
export const areas: Area[] = [
  { slug: "brookside", name: "Brookside", region: "Example County", postalCodes: ["00121", "00122"], coverage: "covered", localNotes: [] },
  { slug: "millbrook", name: "Millbrook", region: "Example County", postalCodes: ["00123"], coverage: "covered", localNotes: [] },
  { slug: "west-hill", name: "West Hill", region: "Example County", postalCodes: ["00124", "00125"], coverage: "covered", localNotes: [] },
  { slug: "the-harbor", name: "The Harbor", region: "Example County", postalCodes: ["00126"], coverage: "covered", localNotes: [] },
  { slug: "fernwood", name: "Fernwood", region: "Example County", postalCodes: ["00127"], coverage: "covered", localNotes: [] },
  { slug: "pine-ridge", name: "Pine Ridge", region: "Example County", postalCodes: ["00128"], coverage: "confirm", localNotes: [] },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const isIndexable = (a: Area) => a.localNotes.length > 0;
export const coveredAreas = areas.filter((a) => a.coverage === "covered");

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
 * Only a well-formed postal code that isn't on the list is "outside". A name
 * we don't recognise is "unknown" — we can't know it's outside, so the visitor
 * is asked to get in touch rather than told no (or yes).
 */
export function checkCoverage(raw: string): CoverageResult | null {
  const input = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (!input) return null;

  const digits = input.replace(/[\s-]/g, "");
  if (/^\d+$/.test(digits)) {
    // ZIP or ZIP+4; anything else is a typo we shouldn't guess at.
    if (digits.length !== 5 && digits.length !== 9) return { status: "unknown", suggestions: [] };
    const code = digits.slice(0, 5);
    const area = areas.find((a) => a.postalCodes.includes(code));
    return area ? { status: area.coverage, area } : { status: "outside", postalCode: code };
  }

  const exact = areas.find((a) => a.name.toLowerCase() === input || a.slug === input.replace(/ /g, "-"));
  if (exact) return { status: exact.coverage, area: exact };
  return { status: "unknown", suggestions: input.length >= 2 ? areas.filter((a) => a.name.toLowerCase().includes(input)) : [] };
}
