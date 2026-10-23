import type { IconName } from "@/components/ui/Icon";
import type { PhotoKey } from "@/lib/images";

export type Faq = { q: string; a: string };

export type Audience = "residential" | "commercial";

export type Service = {
  slug: string;
  name: string;
  /** How a customer would describe the problem — used by the service selector. */
  need: string;
  /** Set false to remove the service from every menu, card, form and the sitemap. */
  offered: boolean;
  audiences: Audience[];
  icon: IconName;
  photo: PhotoKey;
  /** Card copy. */
  summary: string;
  /** Selector panel copy: what we'd do about it, in a sentence or two. */
  selectorBlurb: string;
  intro: string;
  signs: string[];
  includes: { title: string; body: string }[];
  process: string[];
  /** Safe things to do while waiting. Never a DIY repair. */
  safety: string;
  faqs: Faq[];
  related: string[];
};

export type ProjectCategory = "Drain cleaning" | "Sewer & water lines" | "Water heaters" | "Commercial work";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  photo: PhotoKey;
  /** The service this kind of work falls under. */
  service: string;
  /** What the photograph shows. */
  summary: string;
  /** What this kind of job typically involves — general, not a claim about one customer. */
  involves: string[];
  /** A licensed stock photo rather than the company's own — labelled as such. */
  stock?: boolean;
  /**
   * A verified record of a real job. Only for the company's own work, with
   * the customer's agreement. Stock photography never gets one.
   */
  caseStudy?: { problem: string; work: string; outcome: string };
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  postalCodes: string[];
  /**
   * "covered": we work here. "confirm": edge of our range — the checker asks
   * people to contact us rather than promising a visit.
   */
  coverage: "covered" | "confirm";
  /**
   * Notes genuinely specific to the area, from the company's experience there.
   * Only areas with notes are indexed — a page with nothing local to say is a
   * doorway page.
   */
  localNotes: string[];
};

export type Review = {
  text: string;
  author?: string;
  source: string;
  href?: string;
  date?: string;
};
