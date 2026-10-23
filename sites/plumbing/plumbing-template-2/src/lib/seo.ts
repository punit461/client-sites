import type { Metadata } from "next";
import { business, schemaDay } from "@/config/business";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import type { Faq } from "@/content/types";
import { photos, photoUrl, type PhotoKey } from "./images";

/**
 * Metadata and structured data, built from the same configuration the pages
 * render, so they cannot disagree. Canonical URLs always point at the
 * company's own domain, even when this build is published under the dashboard.
 */

export const siteUrl = business.url;

/** "/about/" -> "https://www.example.com/about/" */
export function absolute(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  photo = "plumberBathroom",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  photo?: PhotoKey;
  noindex?: boolean;
}): Metadata {
  const image = photoUrl(photos[photo], 1200, 630);
  return {
    title,
    description,
    alternates: { canonical: absolute(path) },
    openGraph: {
      title: `${title} · ${business.name}`,
      description,
      url: absolute(path),
      type: "website",
      siteName: business.name,
      locale: business.locale,
      images: [{ url: image, width: 1200, height: 630, alt: photos[photo].alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Plumber is schema.org's LocalBusiness subtype for this trade. Only verified
 * facts go in: no rating, no review count, and an address only when the
 * company publishes one. A service-area business lists areaServed instead.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description: business.description,
    url: `${siteUrl}/`,
    telephone: business.phone.e164,
    email: business.email,
    image: photoUrl(photos.plumberBathroom, 1200),
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.locality,
            addressRegion: business.address.region,
            postalCode: business.address.postalCode,
            addressCountry: business.country,
          },
        }
      : {}),
    // Edge-of-range areas ("confirm") are not claimed as served.
    areaServed: areas
      .filter((a) => a.coverage === "covered")
      .map((a) => ({ "@type": "Place", name: `${a.name}, ${a.region}` })),
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map(schemaDay),
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absolute(`/services/${s.slug}/`) },
      })),
    },
    ...(business.socials.length ? { sameAs: business.socials.map((s) => s.href) } : {}),
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

/** Only for FAQs that are shown in full on the same page. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
