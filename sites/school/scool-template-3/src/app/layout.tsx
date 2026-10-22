import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/layout/DemoBanner";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/ui/JsonLd";
import { contact, school } from "@/content/school";
import { robotsMetadata, schoolJsonLd, siteUrl } from "@/lib/seo";

/** An editorial serif with optical sizes for headlines; a calm grotesk for everything else. */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${school.name} — Kindergarten in ${contact.address.locality}, ${contact.address.city}`,
    template: `%s · ${school.name}`,
  },
  description: school.description,
  applicationName: school.name,
  keywords: [
    school.name,
    school.fullName,
    `kindergarten in ${contact.address.locality}`,
    `preschool in ${contact.address.city}`,
    "DRDO KG School",
    "nursery LKG UKG admissions",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: school.name,
    description: school.description,
    type: "website",
    locale: "en_IN",
    siteName: school.name,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: school.name, description: school.description },
  robots: robotsMetadata,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2a5e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <span id="top" tabIndex={-1} className="sr-only">
          Top of page
        </span>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy-deep"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <DemoBanner />
        <FloatingActions />
        <JsonLd data={schoolJsonLd()} />
      </body>
    </html>
  );
}
