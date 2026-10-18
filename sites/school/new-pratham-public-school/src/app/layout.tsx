import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import MobileActionBar from "@/components/layout/MobileActionBar";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { contact, hours, school } from "@/data/school";

/**
 * A warm serif with character for headlines; a friendly grotesk for everything
 * else. No `weight`: that loads each as a variable font, so any weight is
 * available without a separate file per weight (and Turbopack rejects a
 * multi-weight request for Fraunces).
 */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${school.name} — CBSE School, Dooravani Nagar, Bengaluru`,
    template: `%s · ${school.name}`,
  },
  description: school.description,
  keywords: [
    "New Pratham Public School",
    "NPPS",
    "CBSE school Bengaluru",
    "CBSE school Dooravani Nagar",
    "school Pai Layout",
    "school admissions Bengaluru",
    "Nursery to Class X",
  ],
  openGraph: {
    title: `${school.name} — ${school.tagline}`,
    description: school.description,
    type: "website",
    locale: "en_IN",
    siteName: school.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${school.name} — ${school.tagline}`,
    description: school.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1d2433",
  width: "device-width",
  initialScale: 1,
};

/** School structured data, generated from the same values the pages render. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: school.name,
  alternateName: [school.short, school.nameKannada],
  description: school.description,
  foundingDate: String(school.established),
  telephone: contact.phoneDial,
  email: contact.email,
  url: "https://www.newprathampublicschool.in/",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.postcode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.coordinates.lat,
    longitude: contact.coordinates.lng,
  },
  openingHoursSpecification: hours
    .filter((h) => h.time !== "Closed")
    .map((h) => ({ "@type": "OpeningHoursSpecification", description: `${h.days}: ${h.time}` })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-coral focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
