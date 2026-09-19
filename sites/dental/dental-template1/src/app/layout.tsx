import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import BookingDialog from "@/components/booking/BookingDialog";
import { BookingProvider } from "@/components/booking/BookingProvider";
import MobileActionBar from "@/components/layout/MobileActionBar";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { clinic, contact, hours } from "@/data/clinic";

/** An elegant serif for headlines only; a clean grotesk for everything else. */
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${clinic.fullName} — ${clinic.tagline}`,
    template: `%s · ${clinic.fullName}`,
  },
  description: clinic.description,
  keywords: [
    "dentist",
    "dental clinic",
    "dental implants",
    "teeth whitening",
    "braces and aligners",
    `dentist ${clinic.city}`,
  ],
  openGraph: {
    title: `${clinic.fullName} — ${clinic.tagline}`,
    description: clinic.description,
    type: "website",
    locale: "en_IN",
    siteName: clinic.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.fullName} — ${clinic.tagline}`,
    description: clinic.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#172121",
  width: "device-width",
  initialScale: 1,
};

/**
 * Dentist structured data, generated from the same values the pages render so
 * the two cannot drift. Deliberately omits aggregateRating: publishing a rating
 * requires one that can be evidenced from a verified source.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.fullName,
  description: clinic.description,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
    addressLocality: contact.address.city,
    postalCode: contact.address.postcode,
    addressCountry: "IN",
  },
  openingHoursSpecification: hours
    .filter((h) => h.time !== "Closed")
    .map((h) => ({ "@type": "OpeningHoursSpecification", description: `${h.days}: ${h.time}` })),
  priceRange: "₹₹",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-terracotta focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <BookingProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileActionBar />
          <BookingDialog />
        </BookingProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
