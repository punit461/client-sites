/**
 * Everything the site says about the business, in one typed file.
 *
 * Pages, menus, the footer, the estimate form, the area checker and the
 * structured data all read from here — change a value once and it changes
 * everywhere.
 *
 * The values below are PLACEHOLDERS and deliberately look like it: 555-01xx is
 * the reserved fictional phone range and `.example` is a reserved domain.
 * Replace every one before launch (README.md has the checklist).
 */

import { env } from "./env";

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type OpeningHours = {
  label: string;
  days: Weekday[];
  /** 24-hour "HH:MM" */
  opens: string;
  closes: string;
};

export type Link = { label: string; href: string };

export const business = {
  /**
   * True while any value here is a placeholder: the site is kept out of search
   * results and says so in the footer. Set false only when everything is real.
   */
  demo: true,

  name: "FlowForce Plumbing",
  shortName: "FlowForce",
  tagline: "Residential & commercial plumbing",
  description:
    "Practical plumbing repairs, installations and maintenance — from a team that puts clear communication first.",

  /** The live address, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: env.siteUrl || "https://www.flowforce-plumbing.example",
  locale: "en_US",
  country: "US",

  phone: { display: "(555) 010-3070", e164: "+15550103070" },
  email: "hello@flowforce-plumbing.example",

  /** Null for a mobile business with no customer-facing premises. */
  address: null as null | { street: string; locality: string; region: string; postalCode: string },

  hours: [
    { label: "Mon – Fri", days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "07:30", closes: "17:00" },
    { label: "Saturday", days: ["Sa"], opens: "08:00", closes: "12:00" },
  ] as OpeningHours[],
  hoursNote: "Closed Sundays and public holidays.",

  /** Real, active profiles only. Empty renders nothing. */
  socials: [] as Link[],
  /** Where customers can read the company's reviews (Google, Yelp…). */
  reviewProfiles: [] as Link[],

  /**
   * Claims that need evidence. Each stays false until the company can show it;
   * while false, the claim appears nowhere on the site.
   */
  verified: {
    emergencyService: false,
    licensed: false,
    insured: false,
    workmanshipWarranty: false,
  },
  credentials: { licenseNumber: "", warrantySummary: "" },
};

/**
 * "The FlowForce standard": how the company works. Promises, not credentials —
 * keep only the ones the company actually keeps.
 */
export const principles = [
  {
    title: "Straightforward communication",
    body: "You'll know who's coming, when, and why. If anything changes, we call — no chasing us for updates.",
  },
  {
    title: "Clear estimates before approved work",
    body: "We explain what we found and put the price in writing. Work starts when you say yes, not before.",
  },
  {
    title: "Respect for homes and workspaces",
    body: "Floors covered, work area contained, mess removed. Your space looks the way we found it — minus the problem.",
  },
  {
    title: "Practical recommendations",
    body: "What needs fixing now, what can wait, and what doesn't need doing at all. Honest options, not upsells.",
  },
];

/** What happens after a request is sent — the same promise everywhere. */
export const afterRequest = [
  "We review your request during opening hours.",
  "We contact you to talk it through and, if needed, arrange a visit.",
  "You get a clear estimate. Work starts only when you approve it.",
];

export const telHref = `tel:${business.phone.e164}`;
export const mailHref = `mailto:${business.email}`;

const dayNames: Record<Weekday, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")}${h >= 12 ? "pm" : "am"}`;
}

export const hoursLine = (h: OpeningHours) => `${formatTime(h.opens)}–${formatTime(h.closes)}`;

/** "Mon–Fri 7:30am–5:00pm · Sat 8:00am–12:00pm" */
export function compactHours() {
  return business.hours
    .map((h) => {
      const first = dayNames[h.days[0]].slice(0, 3);
      const last = dayNames[h.days[h.days.length - 1]].slice(0, 3);
      return `${h.days.length > 1 ? `${first}–${last}` : first} ${hoursLine(h)}`;
    })
    .join(" · ");
}

export const schemaDay = (d: Weekday) => `https://schema.org/${dayNames[d]}`;
