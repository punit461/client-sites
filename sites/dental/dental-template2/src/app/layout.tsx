import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import Navbar from "@/components/layout/Navbar";
import { contact, group } from "@/data/group";
import { locations } from "@/data/locations";

const display = Outfit({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${group.fullName} — ${group.tagline}`,
    template: `%s · ${group.fullName}`,
  },
  description: group.description,
  keywords: ["clinic", "doctors", "book appointment", "dental care", "physiotherapy", "dermatology"],
  openGraph: {
    title: `${group.fullName} — ${group.tagline}`,
    description: group.description,
    type: "website",
    locale: "en_IN",
    siteName: group.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${group.fullName} — ${group.tagline}`,
    description: group.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#153c36",
  width: "device-width",
  initialScale: 1,
};

/**
 * One MedicalClinic entry per site, generated from the same data the pages
 * render. Deliberately no aggregateRating — publishing one needs a rating that
 * can be evidenced from a verified source.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": locations.map((l) => ({
    "@type": "MedicalClinic",
    name: l.name,
    description: group.description,
    telephone: l.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address[0],
      addressLocality: l.address[1],
      postalCode: l.address[2]?.split(" ").pop(),
      addressCountry: "IN",
    },
    openingHoursSpecification: l.hours
      .filter((h) => h.time !== "Closed")
      .map((h) => ({ "@type": "OpeningHoursSpecification", description: `${h.days}: ${h.time}` })),
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
