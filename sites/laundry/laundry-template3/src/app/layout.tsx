import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import { brand, contact } from "@/data/site";

/** A geometric display face for headings, DM Sans for everything read at length. */
// No `weight`: that loads the variable font, so headings can use any weight
// without pulling a separate file for each one.
const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.fullName} — ${brand.tagline}`,
    template: `%s · ${brand.fullName}`,
  },
  description: brand.description,
  keywords: [
    "laundry membership",
    "dry cleaning pickup and delivery",
    "shirt pressing service",
    "couture garment care",
    "laundry service Bengaluru",
  ],
  openGraph: {
    title: `${brand.fullName} — ${brand.tagline}`,
    description: brand.description,
    type: "website",
    locale: "en_IN",
    siteName: brand.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.fullName} — ${brand.tagline}`,
    description: brand.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
  width: "device-width",
  initialScale: 1,
};

/** Structured data, generated from the same values the page renders. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  name: brand.fullName,
  description: brand.description,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address,
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 07:00-22:00",
  priceRange: "₹₹₹",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* `starfield` paints the fixed dot grid defined in globals.css. */}
      <body className={`${display.variable} ${sans.variable} starfield antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ice focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
