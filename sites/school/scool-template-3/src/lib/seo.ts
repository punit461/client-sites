import type { Metadata } from "next";
import { contact, demo, fullAddress, school, socials } from "@/content/school";
import { photoUrl, photos } from "./images";

/**
 * Metadata and structured data, built from the same content the pages render
 * so the two can never disagree. Canonical URLs always point at the school's
 * own domain, even when this build is published under the dashboard.
 */

export const siteUrl = school.url.replace(/\/$/, "");

/** "/about/" -> "https://www.school.example/about/" */
export function absolute(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = photoUrl(photos.entrance, 1200),
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${school.name}`,
      description,
      url: path,
      type,
      siteName: school.name,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 800, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const robotsMetadata: Metadata["robots"] = demo
  ? { index: false, follow: false }
  : { index: true, follow: true };

export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Preschool",
    "@id": `${siteUrl}/#school`,
    name: school.name,
    alternateName: [school.shortName, school.fullName, school.nameKannada],
    description: school.description,
    url: `${siteUrl}/`,
    telephone: "+91 80 2524 2042",
    ...(contact.email ? { email: contact.email } : {}),
    image: photoUrl(photos.entrance, 1200),
    slogan: school.motto,
    parentOrganization: { "@type": "Organization", name: school.trust },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "15:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.street}, ${contact.address.locality}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
    hasMap: contact.mapsUrl,
    sameAs: socials.map((s) => s.href),
    areaServed: contact.address.city,
    contactPoint: [{ "@type": "ContactPoint", contactType: "admissions", telephone: "+91 80 2524 2042", ...(contact.email ? { email: contact.email } : {}) }],
    keywords: `kindergarten in ${contact.address.locality}, preschool in ${contact.address.city}, ${fullAddress}`,
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.href),
    })),
  };
}
