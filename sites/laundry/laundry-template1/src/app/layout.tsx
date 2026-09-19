import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { brand, contact } from "@/data/site";

/** Editorial serif for headings, a clean grotesk for everything else. */
// No `weight`: that loads the variable font, so headings can use any weight
// without pulling a separate file for each one.
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
    default: `${brand.name} — Laundry, Dry Cleaning & Ironing, Picked Up and Delivered`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "laundry pickup and delivery",
    "dry cleaning",
    "steam ironing",
    "wash and fold",
    "laundry service Bengaluru",
  ],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1b2a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data for a local service business. Search engines read this to
 * show hours and a phone number; it is also the quickest thing to get wrong,
 * so it is generated from the same data the page renders.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.name,
  description: brand.description,
  telephone: contact.phone,
  email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "IN" },
  openingHours: "Mo-Sa 07:00-21:00",
  priceRange: "₹₹",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
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
