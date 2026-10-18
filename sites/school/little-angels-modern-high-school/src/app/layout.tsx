import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import Navbar from "@/components/layout/Navbar";
import { contact, school, socials } from "@/data/site";

/** A warm editorial serif for headings, a clean grotesk for everything else. */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${school.name} — Montessori to Class 10, Sadanandanagar, Bengaluru`,
    template: `%s · ${school.name}`,
  },
  description: school.description,
  keywords: [
    "Little Angels Modern High School",
    "LAMHS",
    "school in Sadanandanagar",
    "school near Indiranagar",
    "NGEF Layout school",
    "inclusive school Bengaluru",
    "Montessori Bengaluru",
    "English medium school Bengaluru",
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
    title: school.name,
    description: school.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1c2a5e",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data for a school. Search engines read this for the address,
 * phone and hours, so it is generated from the same data the pages render.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: school.name,
  alternateName: school.shortName,
  description: school.description,
  foundingDate: String(school.founded),
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.addressLines[0]}, ${contact.addressLines[1]}`,
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
  openingHours: ["Mo-Fr 09:00-16:00", "Sa 09:00-13:00"],
  sameAs: socials.map((s) => s.href),
  hasMap: contact.mapsUrl,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
