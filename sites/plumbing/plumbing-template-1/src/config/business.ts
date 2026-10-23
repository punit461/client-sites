/**
 * The one file to edit when this template becomes a real company's site.
 *
 * Everything the site says about the business — name, phone, hours, areas,
 * credentials — is read from here, so the pages, the footer, the structured
 * data and the quote form can never disagree with each other.
 *
 * The values below are PLACEHOLDERS, and deliberately recognisable as such:
 * 555-01xx is the reserved fictional phone range, and `.example` is a reserved
 * domain. Replace every one before launch (see the checklist in README.md).
 */

import { env } from "./env";

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type OpeningHours = {
  /** Shown to people, e.g. "Monday – Friday". */
  label: string;
  days: Weekday[];
  /** 24-hour "HH:MM" — used in structured data. */
  opens: string;
  closes: string;
};

export type Link = { label: string; href: string };

export const business = {
  /**
   * While true, the site asks search engines not to index it and shows a small
   * "template preview" note wherever placeholder details appear. Set to false
   * only once every value in this file is the company's real information.
   */
  demo: true,

  name: "AquaCraft Plumbing Co.",
  shortName: "AquaCraft",
  /** Two letters for the logo mark. */
  monogram: "AC",
  tagline: "Residential & commercial plumbing",
  description:
    "Plumbing repairs, installations and maintenance for homes and businesses — with a clear estimate before any work begins.",

  /** The live address, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: env.siteUrl || "https://www.aquacraft-plumbing.example",
  locale: "en_US",
  /** ISO 3166-1 alpha-2 — used in structured data. */
  country: "US",

  phone: {
    display: "(555) 010-2040",
    /** E.164, used for tel: links. */
    e164: "+15550102040",
  },
  email: "hello@aquacraft-plumbing.example",

  /**
   * A public street address. Leave null if the company works from vehicles and
   * customers never visit — Google treats that as a service-area business, and
   * the site will not show or publish an address it should not.
   */
  address: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  },

  hours: [
    { label: "Monday – Friday", days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "17:30" },
    { label: "Saturday", days: ["Sa"], opens: "09:00", closes: "13:00" },
  ] as OpeningHours[],
  hoursNote: "Closed Sundays and public holidays.",

  /** Only real, active profiles. An empty list renders no icons at all. */
  socials: [] as Link[],

  /**
   * Where customers can read and leave reviews (Google Business Profile, Yelp,
   * etc.). Reviews themselves live in src/content/reviews.ts.
   */
  reviewProfiles: [] as Link[],

  /**
   * Claims that need evidence. Each one stays false until the company can show
   * it — a licence certificate, an insurance policy, written warranty terms.
   * When false, the claim simply does not appear anywhere on the site.
   */
  verified: {
    /** Answers the phone for emergencies outside the hours above. */
    emergencyService: false,
    /** Holds the plumbing licence required where it works. */
    licensed: false,
    /** Carries liability insurance for the work. */
    insured: false,
    /** Offers written workmanship warranty terms. */
    workmanshipWarranty: false,
  },

  /** Shown only when the matching `verified` flag is true. */
  credentials: {
    licenseNumber: "",
    warrantySummary: "",
  },
};

/**
 * The company's working standards. These are promises about how the business
 * operates, not credentials — but they are still promises. Remove any the
 * company does not actually keep.
 */
export const standards = [
  {
    title: "A written estimate before work begins",
    body: "We assess the problem, explain what we found and give you the price for the work in writing. Nothing starts until you approve it.",
    short: "Written estimate first",
  },
  {
    title: "Clear communication throughout",
    body: "You will know who is coming, roughly when, and what they are there to do. If plans change, we call you rather than leave you waiting.",
    short: "Clear arrival windows",
  },
  {
    title: "Respect for your home or premises",
    body: "Floor protection where we walk and work, dust sheets around the job, and tools that stay in the work area.",
    short: "Your property protected",
  },
  {
    title: "Practical recommendations",
    body: "We tell you what needs doing now, what can wait, and what you can safely leave alone — so you can decide with the full picture.",
    short: "Honest repair options",
  },
  {
    title: "Workmanship we put our name to",
    body: "Proper fittings, tested joints and neat pipe runs. We check the repair under pressure before we call the job finished.",
    short: "Tested before we leave",
  },
  {
    title: "A clean finish",
    body: "Old parts removed, the work area wiped down and everything put back. You should be able to use the room as soon as we leave.",
    short: "Clean job completion",
  },
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

/** "08:00" -> "8:00 am" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function hoursLine(h: OpeningHours) {
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`;
}

/** One line for the announcement bar: "Mon–Fri 8:00 am – 5:30 pm · Sat 9:00 am – 1:00 pm" */
export function compactHours() {
  return business.hours
    .map((h) => {
      const first = h.days[0];
      const last = h.days[h.days.length - 1];
      const span = h.days.length > 1 ? `${dayNames[first].slice(0, 3)}–${dayNames[last].slice(0, 3)}` : dayNames[first].slice(0, 3);
      return `${span} ${hoursLine(h)}`;
    })
    .join(" · ");
}

export const schemaDay = (d: Weekday) => `https://schema.org/${dayNames[d]}`;
