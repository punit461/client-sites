import type { PhotoKey } from "@/lib/images";
import type { IconName } from "@/components/ui/Icon";

export type Faq = { q: string; a: string };

export type Audience = "residential" | "commercial";

export type Service = {
  slug: string;
  /** Full name, used for page titles. */
  name: string;
  /** Short name for cards, menus and the form's service list. */
  short: string;
  /**
   * Set to false to hide a service the company does not offer: it disappears
   * from every list, menu, form option and the sitemap, and its page is not
   * built.
   */
  offered: boolean;
  audiences: Audience[];
  icon: IconName;
  photo: PhotoKey;
  /** One or two sentences for cards. */
  summary: string;
  /** The opening paragraph of the service page. */
  intro: string;
  /** "Signs you may need this" — symptoms a customer will recognise. */
  signs: string[];
  /** What the service covers. */
  scope: { title: string; body: string }[];
  /** How a visit for this service usually runs. */
  approach: string[];
  /** Safety-minded advice for while you wait. Never a DIY repair. */
  meanwhile: string;
  faqs: Faq[];
  related: string[];
};

export type Area = {
  slug: string;
  name: string;
  /** County, district or region, shown beside the name. */
  region: string;
  /** Postal codes covered. Used by the quote form hint and the area page. */
  postalCodes: string[];
  /**
   * Notes that are genuinely specific to this area, written from the company's
   * own experience there. An area page is built only when this has content —
   * a page that says nothing local is a doorway page, which search engines
   * penalise and customers find useless.
   */
  localNotes: string[];
  /** Service slugs NOT offered in this area, if any. */
  excludedServices?: string[];
};

export type Review = {
  /** Exactly as the customer wrote it. Never edited beyond trimming. */
  text: string;
  /** Only with the customer's permission; otherwise an initial or omit. */
  author?: string;
  /** e.g. "Google" */
  source: string;
  /** Link to the original review. */
  href?: string;
  /** ISO date the review was posted. */
  date?: string;
};

export type GalleryItem = {
  photo: PhotoKey;
  category: "Residential repairs" | "Bathroom installations" | "Water heaters" | "Commercial";
  title: string;
  /** What the photo shows. Not a claim about a specific customer job. */
  caption: string;
  service: string;
  /**
   * A real, verified job record. Only fill this in for the company's own
   * work, with the customer's agreement. Stock photos must leave it empty.
   */
  caseStudy?: { problem: string; work: string; outcome: string };
};
