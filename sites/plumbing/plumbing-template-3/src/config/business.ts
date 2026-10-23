/**
 * Everything the site says about the business lives here, so the pages, menus,
 * footer, quote form, area checker and structured data can never disagree.
 *
 * All values are PLACEHOLDERS and deliberately look like it: 555-01xx is the
 * reserved fictional phone range and `.example` a reserved domain. Replace
 * every one before launch — README.md has the checklist.
 */

import { env } from "./env";

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";
export type OpeningHours = { label: string; days: Weekday[]; opens: string; closes: string };
export type Link = { label: string; href: string };

export const business = {
  /**
   * True while any value here is a placeholder: the site stays out of search
   * results and says so in the footer. Set false only when everything is real.
   */
  demo: true,

  name: "ClearFlow Plumbing",
  shortName: "ClearFlow",
  tagline: "Residential & commercial plumbing",
  description:
    "Plumbing repairs, installations and maintenance for homes and businesses — explained clearly, priced before work begins, and finished with care.",

  /** Live address, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: env.siteUrl || "https://www.clearflow-plumbing.example",
  locale: "en_US",
  country: "US",

  phone: { display: "(555) 010-4050", e164: "+15550104050" },
  email: "hello@clearflow-plumbing.example",

  /** Null for a mobile business with no customer-facing premises. */
  address: null as null | { street: string; locality: string; region: string; postalCode: string },

  hours: [
    { label: "Monday – Friday", days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "17:00" },
    { label: "Saturday", days: ["Sa"], opens: "09:00", closes: "13:00" },
  ] as OpeningHours[],
  hoursNote: "Closed Sundays and public holidays.",

  /** Real, active profiles only. An empty list renders nothing. */
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
  /** Shown only when the matching `verified` flag is true. */
  credentials: { licenseNumber: "", warrantySummary: "" },

  /**
   * The company's own history, in its own words — when it was founded, who
   * runs it, why. Leave empty rather than inventing one: the About section then
   * shows how the company works instead of a backstory.
   */
  story: [] as string[],
};

/** How the company works. Promises it controls — keep only the true ones. */
export const approach = [
  { title: "We explain the problem clearly", body: "What we found, why it happened and what it means — in plain language, with photos where they help." },
  { title: "We talk through the options", body: "Repair or replace, now or later, and the price for each — before any work begins." },
  { title: "We respect your space", body: "Covers on floors, tools kept contained, and the area left as tidy as we found it." },
  { title: "We tell you what happens next", body: "Who is coming, roughly when, and what to expect — and we call if plans change." },
  { title: "We finish what we agreed", body: "The work you approved, done properly and tested before we call it complete." },
];

/** The four short benefits in the strip under the hero. */
export const benefits = [
  { icon: "message", title: "Clear communication", body: "Plain answers, no jargon" },
  { icon: "calendar", title: "Easy to request", body: "Online or by phone" },
  { icon: "wrench", title: "Careful workmanship", body: "Tested before we leave" },
  { icon: "house", title: "Respect for your home", body: "Covered floors, tidy finish" },
] as const;

/** What happens after someone sends a request — said the same way everywhere. */
export const afterRequest = [
  "We read your request during opening hours.",
  "We get in touch to talk it through and, if a visit is needed, agree a time with you.",
  "You receive an estimate. Work begins only once you approve it.",
];

/** Who the company works for — shown in the About section. */
export const serves = ["Homeowners", "Landlords and property managers", "Shops and offices", "Restaurants and cafés"];

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
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "pm" : "am"}`;
}

export const hoursLine = (h: OpeningHours) => `${formatTime(h.opens)} – ${formatTime(h.closes)}`;

/** "Mon–Fri 8 am – 5 pm · Sat 9 am – 1 pm" */
export function compactHours() {
  return business.hours
    .map((h) => {
      const a = dayNames[h.days[0]].slice(0, 3);
      const b = dayNames[h.days[h.days.length - 1]].slice(0, 3);
      return `${h.days.length > 1 ? `${a}–${b}` : a} ${hoursLine(h)}`;
    })
    .join(" · ");
}

export const schemaDay = (d: Weekday) => `https://schema.org/${dayNames[d]}`;
