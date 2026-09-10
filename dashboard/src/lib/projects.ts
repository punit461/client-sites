import manifest from "@/generated/projects.json";

/**
 * The dashboard is a static export, so it cannot scan the filesystem. Everything
 * it knows comes from src/generated/projects.json, written by tools/manifest.mjs
 * and committed so a fresh clone works.
 */
export type Status = "template" | "draft" | "in-review" | "approved" | "delivered";

export interface Project {
  id: string;
  category: string;
  name: string;
  title: string;
  client: string;
  status: Status;
  tags: string[];
  notes: string;
  description: string;
  /** Where the source lives, e.g. sites/car-wash/car-wash-template1. */
  relDir: string;
  /** Where it is published, relative to the base path. */
  route: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  /** Optional emoji from category.json; empty means "draw the monogram". */
  icon: string;
  /** 0-359, derived from the name so each category keeps one colour. */
  hue: number;
  monogram: string;
  projects: Project[];
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

/** Inlined by Next at build time, so this is a constant in the exported page. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const site = {
  title: manifest.title,
  tagline: manifest.tagline,
  owner: manifest.owner,
  contact: manifest.contact as Contact,
};

export const categories = manifest.categories as unknown as Category[];

export const projects = categories.flatMap((category) => category.projects);

export const findCategory = (id: string) =>
  categories.find((category) => category.id === id);

/**
 * A published site is a separate app, not a route of this one, so it needs a
 * real page load — a plain <a> with the base path applied by hand. next/link
 * would try to handle it as an internal route.
 */
export const siteUrl = (project: Project) => `${basePath}${project.route}`;

/** A category page IS a route of this app, so next/link handles the prefix. */
export const categoryPath = (category: Pick<Category, "id">) => `/${category.id}`;

export const STATUS_ORDER: Status[] = [
  "template",
  "draft",
  "in-review",
  "approved",
  "delivered",
];

export const STATUS_LABEL: Record<Status, string> = {
  template: "Template",
  draft: "Draft",
  "in-review": "With client",
  approved: "Approved",
  delivered: "Delivered",
};

export const STATUS_HELP: Record<Status, string> = {
  template: "A starting point, not built for anyone in particular.",
  draft: "Being built.",
  "in-review": "Waiting on the client's feedback.",
  approved: "Agreed, not handed over yet.",
  delivered: "Live on the client's own hosting.",
};

/** "2 projects · 1 template" — the line under each category card. */
export function summarize(category: Category) {
  const total = category.projects.length;
  if (!total) return "No projects yet";
  const templates = category.projects.filter((p) => p.status === "template").length;
  const parts = [`${total} ${total === 1 ? "project" : "projects"}`];
  if (templates) parts.push(`${templates} ${templates === 1 ? "template" : "templates"}`);
  return parts.join(" · ");
}

export const counts = {
  projects: projects.length,
  categories: categories.length,
  templates: projects.filter((p) => p.status === "template").length,
  forClients: projects.filter((p) => p.status !== "template").length,
  delivered: projects.filter((p) => p.status === "delivered").length,
};
