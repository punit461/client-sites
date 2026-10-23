import type { MetadataRoute } from "next";
import { areas, isIndexable } from "@/content/areas";
import { services } from "@/content/services";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

const pages: [path: string, priority: number, freq: Freq][] = [
  ["/", 1, "monthly"],
  ["/services/", 0.9, "monthly"],
  ["/residential-plumbing/", 0.8, "monthly"],
  ["/commercial-plumbing/", 0.8, "monthly"],
  ["/emergency-plumbing/", 0.6, "yearly"],
  ["/service-areas/", 0.7, "monthly"],
  ["/projects/", 0.6, "monthly"],
  ["/about/", 0.6, "yearly"],
  ["/reviews/", 0.5, "monthly"],
  ["/faq/", 0.6, "monthly"],
  ["/contact/", 0.7, "yearly"],
  ["/request-a-quote/", 0.8, "yearly"],
  ["/privacy-policy/", 0.2, "yearly"],
  ["/terms/", 0.2, "yearly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: absolute(path), priority, changeFrequency })),
    ...services.map((s) => ({ url: absolute(`/services/${s.slug}/`), priority: 0.8, changeFrequency: "monthly" as const })),
    // Only area pages with genuinely local content; the rest are noindex.
    ...areas
      .filter(isIndexable)
      .map((a) => ({ url: absolute(`/service-areas/${a.slug}/`), priority: 0.6, changeFrequency: "monthly" as const })),
  ];
}
