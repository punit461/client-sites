import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { contact, fromRate, property } from "@/data/stay";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const sans = Jost({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${property.fullName} — ${property.headline}`,
    template: `%s · ${property.fullName}`,
  },
  description: property.intro,
  keywords: ["homestay", "coffee estate stay", "Chikmagalur homestay", "nature retreat", "boutique stay"],
  openGraph: {
    title: `${property.fullName} — ${property.headline}`,
    description: property.intro,
    type: "website",
    locale: "en_IN",
    siteName: property.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${property.fullName} — ${property.headline}`,
    description: property.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f3a2e",
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
    streetAddress: contact.address[0],
    addressLocality: contact.address[1],
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  priceRange: `From ₹${fromRate} per night`,
  checkinTime: "13:00",
  checkoutTime: "11:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ivory"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
