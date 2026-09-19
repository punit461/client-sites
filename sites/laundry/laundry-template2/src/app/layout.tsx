import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { brand, contact } from "@/data/site";

/** A geometric grotesk for the oversized display type, Inter for reading. */
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
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
    "laundry pickup and delivery",
    "dry cleaning",
    "steam ironing",
    "shoe cleaning",
    "laundry app",
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
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/** Structured data, generated from the same values the page renders. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.fullName,
  description: brand.description,
  telephone: contact.phone,
  email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "IN" },
  priceRange: "₹₹",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* `grain` paints the fixed noise overlay defined in globals.css. */}
      <body className={`${display.variable} ${sans.variable} grain antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
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
