/**
 * Everything the site says about the business, in one typed file.
 *
 * Pages, menus, the footer, the estimate form, the area checker and the
 * structured data all read from here — change a value once and it changes
 * everywhere.
 *
 * The values below are Tx-Star Plumbing's public details, from its Google
 * Business Profile (October 2026): name, phone, hours, rating and reviews. The
 * licence number is the one on the company's vans in its own Google photos, and
 * "licensed and insured" is the company's own statement in its profile. The
 * business publishes no email address, so `email` is null and every email
 * link is hidden.
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
  demo: false,

  name: "Tx-Star Plumbing",
  shortName: "Tx-Star",
  /** The company's own motto. */
  tagline: "Service with a Smile",
  description:
    "Family-owned, 5th-generation Houston plumbers — drain cleaning and hydro-jetting, sewer and water line repair, water heaters and gas lines for homes and businesses.",
  /** What the company traded as before; older reviews use this name. */
  formerName: "Beacon Plumbing",
  /** From the company's own profile: "Our 23 years of experience…" */
  yearsExperience: 23,

  /** The live address, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: env.siteUrl || "https://www.tx-starplumbing.com",
  locale: "en_US",
  country: "US",

  phone: { display: "(832) 219-6222", e164: "+18322196222" },
  /** None published. Null hides every email link; the phone is used instead. */
  email: null as string | null,

  /**
   * Null: the Google profile doesn't publish a street address, so neither
   * does the site.
   */
  address: null as null | { street: string; locality: string; region: string; postalCode: string },

  hours: [
    { label: "Mon – Sat", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "05:00", closes: "18:00" },
    { label: "Sunday", days: ["Su"], opens: "07:00", closes: "18:00" },
  ] as OpeningHours[],
  hoursNote: "Open 7 days a week, from 5am most days.",

  /** Real, active profiles only. Empty renders nothing. */
  socials: [] as Link[],
  /** Where customers can read the company's reviews (Google, Yelp…). */
  reviewProfiles: [{ label: "Google", href: "https://maps.app.goo.gl/rnhZ86juSRGFhfVm6" }] as Link[],

  /** The public star rating, shown beside the reviews. Update it now and then. */
  rating: { value: 4.7, count: 156, source: "Google" } as null | { value: number; count: number; source: string },

  /**
   * Claims that need evidence. Each stays false until the company can show it;
   * while false, the claim appears nowhere on the site.
   */
  verified: {
    emergencyService: false,
    licensed: true,
    insured: true,
    workmanshipWarranty: false,
  },
  /** Texas Responsible Master Plumber licence, as shown on the company vans. */
  credentials: { licenseNumber: "Texas RMP 42130", warrantySummary: "" },
};

/**
 * "The Tx-Star standard": how the company works. Each one is something its
 * Google reviewers describe — keep only the ones the company actually keeps.
 */
export const principles = [
  {
    title: "Service with a smile",
    body: "It's our motto, and our customers notice: polite staff come up in more of our Google reviews than anything else.",
  },
  {
    title: "Every step explained",
    body: "We walk you through what we found and what we're doing — and you hear everything before any work is done.",
  },
  {
    title: "Free estimates, fair prices",
    body: "Clear, competitive pricing agreed up front, and the job finished for the price we agreed. No surprises on the invoice.",
  },
  {
    title: "The root cause, found",
    body: "We don't just clear today's blockage. Camera inspections show what's really going on, so the fix lasts.",
  },
];

/** What happens after a request is sent — the same promise everywhere. */
export const afterRequest = [
  "We review your request during opening hours — from 5am, 7 days a week.",
  "We contact you to talk it through and, if needed, arrange a visit.",
  "You get a free, clear estimate. Work starts only when you approve it.",
];

export const telHref = `tel:${business.phone.e164}`;
/** Null when the business publishes no email — callers hide the link. */
export const mailHref = business.email ? `mailto:${business.email}` : null;

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
