import manifest from "@/generated/projects.json";

/** Written by tools/manifest.mjs — the dashboard is static and cannot scan the disk. */
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
  /** Where the source lives in the repo, e.g. sites/car-wash/car-wash-template1. */
  relDir: string;
  /** Where it is published, relative to the base path, e.g. /car-wash/x/. */
  route: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  projects: Project[];
}

/** Inlined at build time by Next, so this is a constant in the exported page. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const site = { title: manifest.title, tagline: manifest.tagline };

export const categories = manifest.categories as unknown as Category[];

export const projects = categories.flatMap((category) => category.projects);

/**
 * A site is a separate app, not a route of this one — so it needs a real
 * navigation, not a client-side transition. next/link would try to handle it.
 */
export const urlFor = (project: Project) => `${basePath}${project.route}`;

export const STATUS_ORDER: Status[] = ["template", "draft", "in-review", "approved", "delivered"];

export const STATUS_LABEL: Record<Status, string> = {
  template: "Template",
  draft: "Draft",
  "in-review": "With client",
  approved: "Approved",
  delivered: "Delivered",
};
