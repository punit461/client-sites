import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Inter } from "next/font/google";
import "./globals.css";
import { Announcement, Footer, MobileBookBar, Navbar } from "@/components/layout/Chrome";
import { contact, fromRate, property } from "@/data/stay";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
/** The handwritten accent — captions and one-word marks only. */
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${property.fullName} — ${property.headline.join(" ")}`,
    template: `%s · ${property.fullName}`,
  },
  description: property.intro,
  keywords: ["homestay", "Coorg homestay", "coffee estate stay", "travel", "boutique stay"],
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
  themeColor: "#3b2b22",
  width: "device-width",
  initialScale: 1,
};

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
    addressLocality: "Madikeri",
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
      <body className={`${display.variable} ${sans.variable} ${hand.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-terracotta focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <Announcement />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
