import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** While the site holds placeholder details, nothing should be indexed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: business.demo ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
