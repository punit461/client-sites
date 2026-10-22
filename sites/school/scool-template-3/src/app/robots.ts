import type { MetadataRoute } from "next";
import { demo } from "@/content/school";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** While the site holds template content, nothing should be indexed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: demo ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
