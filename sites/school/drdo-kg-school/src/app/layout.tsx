import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { brand, contact } from "@/data/site";

/** A rounded, friendly display face for headings and a soft sans for reading. */
const display = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.kind} in ${brand.area}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "kindergarten C V Raman Nagar",
    "KG school Bengaluru",
    "nursery LKG UKG Bengaluru",
    "DRDO KG School",
    "preschool Kaggadasapura",
  ],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f7a70",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data for the school, generated from the same data the page
 * renders. Hours and email are left out until the school confirms them.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: brand.name,
  alternateName: brand.nameKannada,
  description: brand.description,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: `${contact.locality}, ${contact.city}`,
    addressRegion: contact.region,
    postalCode: contact.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
