import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Marcellus } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar, { ReserveBar } from "@/components/layout/Navbar";
import { contact, fromRate, property } from "@/data/stay";

/** A classical serif, a quiet grotesque, and mono for every number on the site. */
const display = Marcellus({ variable: "--font-display", subsets: ["latin"], weight: "400", display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${property.fullName} — ${property.headline.join(" ")}`,
    template: `%s · ${property.fullName}`,
  },
  description: property.intro,
  keywords: [
    "homestay",
    "Alleppey homestay",
    "Kerala backwaters",
    "heritage stay",
    "Vembanad lake",
    "boutique stay",
  ],
  openGraph: {
    title: `${property.fullName} — ${property.eyebrow}`,
    description: property.intro,
    type: "website",
    locale: "en_IN",
    siteName: property.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${property.fullName} — ${property.eyebrow}`,
    description: property.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d1411",
  width: "device-width",
  initialScale: 1,
};

/** Structured data, generated from the same values the pages render. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: property.fullName,
  description: property.intro,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address[1],
    addressLocality: "Alappuzha",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  priceRange: `From ₹${fromRate} per night`,
  checkinTime: "13:00",
  checkoutTime: "11:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ReserveBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
