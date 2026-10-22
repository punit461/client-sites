import type { MetadataRoute } from "next";
import { programmes } from "@/content/programmes";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

const pages: [path: string, priority: number, freq: "weekly" | "monthly" | "yearly"][] = [
  ["/", 1, "monthly"],
  ["/admissions/", 0.9, "monthly"],
  ["/about/", 0.8, "yearly"],
  ["/academics/", 0.8, "yearly"],
  ["/facilities/", 0.7, "yearly"],
  ["/student-life/", 0.7, "yearly"],
  ["/gallery/", 0.5, "monthly"],
  ["/contact/", 0.8, "yearly"],
  ["/privacy-policy/", 0.2, "yearly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: absolute(path), priority, changeFrequency })),
    ...programmes.map((p) => ({ url: absolute(`/academics/${p.slug}/`), priority: 0.7, changeFrequency: "yearly" as const })),
  ];
}
