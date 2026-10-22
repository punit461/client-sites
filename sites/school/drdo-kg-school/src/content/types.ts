/**
 * The shapes of everything the site says. Components only ever read these
 * types, so content can change (or move to a CMS) without touching the UI.
 */

/** A photograph: a CDN id or a local path, plus the alt text it must have. */
export type Photo = {
  /** Unsplash photo id ("1509062522246-3755977927d7") or a path in public/ ("/images/gate.jpg"). */
  src: string;
  alt: string;
};

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export type Stat = {
  value: number;
  /** Digits after the decimal point, for figures such as a 4.2 rating. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Programme = {
  slug: string;
  name: string;
  /** "Ages 3–4" or "Grades 1–5" — whatever the school uses. */
  range: string;
  summary: string;
  photo: Photo;
  intro: string;
  focus: { title: string; text: string }[];
  subjects: string[];
  dayInTheLife: { time: string; activity: string }[];
  assessment: string;
};

export type Facility = {
  slug: string;
  name: string;
  text: string;
  photo?: Photo;
  /** Lucide icon name for facilities without a photo (see lib/icons.ts). */
  icon?: IconName;
  details?: string[];
};

export type IconName =
  | "bus"
  | "shield"
  | "heart-pulse"
  | "accessibility"
  | "utensils"
  | "bed"
  | "wifi"
  | "leaf"
  | "trophy"
  | "palette"
  | "music"
  | "users"
  | "flask"
  | "cpu"
  | "globe"
  | "book"
  | "sparkles"
  | "compass";

export type LifeItem = {
  title: string;
  text: string;
  photo?: Photo;
  icon?: IconName;
};

export type LearningStep = {
  id: string;
  label: string;
  title: string;
  text: string;
  example: string;
  photo: Photo;
};

export type GalleryCategory = "Campus" | "Play areas" | "Celebrations" | "Everyday";

export type GalleryImage = Photo & {
  category: GalleryCategory;
  caption: string;
  /** Portrait images make the masonry interesting; set what the photo is. */
  orientation: "portrait" | "landscape" | "square";
};

export type Testimonial = {
  quote: string;
  name: string;
  /** "Parent, Grade 4" — only with written permission. */
  relation: string;
};

export type FaqItem = { q: string; a: string };
