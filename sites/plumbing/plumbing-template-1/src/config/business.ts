/**
 * The one file to edit when this template becomes a real company's site.
 *
 * Everything the site says about the business — name, phone, hours, areas,
 * credentials — is read from here, so the pages, the footer, the structured
 * data and the quote form can never disagree with each other.
 *
 * The values below are Blue Diamond Plumbing of Texas's public details, taken
 * from its Google Business Profile (October 2026). The licence number is the
 * one painted on the company van in its own Google photos. The business lists
 * no email address, so `email` is null and every email link is hidden.
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
  demo: false,

  name: "Blue Diamond Plumbing of Texas",
  shortName: "Blue Diamond",
  /** Two letters for the logo mark. */
  monogram: "BD",
  tagline: "Plumber in Fort Worth, TX",
  description:
    "Owner-led plumbing in North Fort Worth and Keller — leak detection, pipe and faucet repairs, water heaters, drains and bathroom remodels. Open 24 hours.",

  /** The live address, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: env.siteUrl || "https://bluediamondplumbingoftexas.com",
  locale: "en_US",
  /** ISO 3166-1 alpha-2 — used in structured data. */
  country: "US",

  phone: {
    display: "(817) 852-9498",
    /** E.164, used for tel: links. */
    e164: "+18178529498",
  },
  /** None published. Null hides every email link; the phone is used instead. */
  email: null as string | null,

  /**
   * A public street address. Leave null if the company works from vehicles and
   * customers never visit — Google treats that as a service-area business, and
   * the site will not show or publish an address it should not.
   */
  address: {
    street: "5508 Eastwedge Dr",
    locality: "Fort Worth",
    region: "TX",
    postalCode: "76137",
  } as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  },

  /** 00:00–23:59 every day is how structured data spells "open 24 hours". */
  hours: [
    { label: "Monday – Sunday", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], opens: "00:00", closes: "23:59" },
  ] as OpeningHours[],
  hoursNote: "Open 24 hours, 7 days a week — weekends and holidays included.",

  /** Only real, active profiles. An empty list renders no icons at all. */
  socials: [{ label: "Facebook", href: "https://www.facebook.com/bluediamondplumbingoftexas/" }] as Link[],

  /**
   * Where customers can read and leave reviews (Google Business Profile, Yelp,
   * etc.). Reviews themselves live in src/content/reviews.ts.
   */
  reviewProfiles: [{ label: "Google", href: "https://maps.app.goo.gl/a99nfdgpsXcT7mNv8" }] as Link[],

  /** The public star rating, shown beside the reviews. Update it now and then. */
  rating: { value: 4.7, count: 29, source: "Google" } as null | { value: number; count: number; source: string },

  /**
   * Claims that need evidence. Each one stays false until the company can show
   * it — a licence certificate, an insurance policy, written warranty terms.
   * When false, the claim simply does not appear anywhere on the site.
   */
  verified: {
    /** Answers the phone for emergencies outside the hours above. */
    emergencyService: true,
    /** Holds the plumbing licence required where it works. */
    licensed: true,
    /** Carries liability insurance for the work. */
    insured: false,
    /** Offers written workmanship warranty terms. */
    workmanshipWarranty: false,
  },

  /** Shown only when the matching `verified` flag is true. */
  credentials: {
    /** Texas Responsible Master Plumber licence, as shown on the company van. */
    licenseNumber: "Texas RMP 15647",
    warrantySummary: "",
  },
};

/**
 * The company's working standards. These are promises about how the business
 * operates, not credentials — but they are still promises. Each one below is
 * something the company's Google reviewers describe it doing.
 */
export const standards = [
  {
    title: "Fast response, day or night",
    body: "The phone is answered around the clock. When one customer's pipe froze on Christmas Eve, Cameron was at the door within 20 minutes of the call.",
    short: "Open 24 hours",
  },
  {
    title: "Honest, upfront pricing",
    body: "You hear what the job involves and what it costs before anything starts. Customers describe us as fair, honest and upfront — and we intend to keep it that way.",
    short: "Upfront pricing",
  },
  {
    title: "Every detail explained",
    body: "We walk you through what we found and what the repair involves, so you understand every part of the work before you agree to it.",
    short: "Full explanations",
  },
  {
    title: "Clear communication throughout",
    body: "You will know who is coming and when. We keep in touch on the way to you, and if anything changes we call rather than leave you waiting.",
    short: "We keep you posted",
  },
  {
    title: "Flexible around your schedule",
    body: "Repairs are arranged around your work day, not ours — including last-minute and same-day calls when your water is off.",
    short: "Flexible scheduling",
  },
  {
    title: "The owner on the job",
    body: "Cameron, the owner, comes out to do the work with the team, so the person you speak to is usually the person who fixes it.",
    short: "Owner-led service",
  },
];

export const telHref = `tel:${business.phone.e164}`;
/** Null when the business publishes no email — callers hide the link. */
export const mailHref = business.email ? `mailto:${business.email}` : null;

/** True when every day runs 00:00–23:59: the business never closes. */
export const isOpen24Hours = () =>
  business.hours.length > 0 &&
  business.hours.reduce((n, h) => n + h.days.length, 0) === 7 &&
  business.hours.every((h) => h.opens === "00:00" && h.closes === "23:59");

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
  if (h.opens === "00:00" && h.closes === "23:59") return "Open 24 hours";
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`;
}

/** One line for the announcement bar: "Mon–Fri 8:00 am – 5:30 pm · Sat 9:00 am – 1:00 pm" */
export function compactHours() {
  if (isOpen24Hours()) return "24 hours, 7 days a week";
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
