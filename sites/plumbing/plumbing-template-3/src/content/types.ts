import type { IconName } from "@/components/ui/Icon";
import type { PhotoKey } from "@/lib/images";

export type Faq = { q: string; a: string };
export type Audience = "residential" | "commercial";

export type Service = {
  slug: string;
  name: string;
  /** Short label for cards, menus and the quote form. */
  short: string;
  /** False hides the service from every menu, card, form option and the sitemap. */
  offered: boolean;
  audiences: Audience[];
  icon: IconName;
  photo: PhotoKey;
  summary: string;
  intro: string;
  /** "You may need this if…" */
  signs: string[];
  includes: { title: string; body: string }[];
  /** How a visit for this service runs. */
  steps: string[];
  /** Safe things to do while waiting. Never a DIY repair. */
  meanwhile: string;
  faqs: Faq[];
  related: string[];
};

export type ProjectCategory =
  | "Residential repairs"
  | "Bathroom installations"
  | "Water heater installations"
  | "Pipe replacement"
  | "Commercial plumbing";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  photo: PhotoKey;
  service: string;
  /** What the photograph shows. */
  summary: string;
  /** What this kind of job usually involves — general, not one customer's job. */
  involves: string[];
  /** A real, verified job, with the customer's agreement. Never for stock photos. */
  caseStudy?: { issue: string; work: string; outcome: string };
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  postalCodes: string[];
  /** "covered": we work here. "confirm": edge of range — ask before booking. */
  coverage: "covered" | "confirm";
  /**
   * Notes genuinely specific to the area, from the company's experience there.
   * Area pages are indexed only when they have some.
   */
  localNotes: string[];
};

export type Review = { text: string; author?: string; source: string; href?: string; date?: string };
