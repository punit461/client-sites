import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/config/business";
import { businessJsonLd, siteUrl } from "@/lib/seo";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${business.name} | ${business.tagline}`, template: `%s | ${business.name}` },
  description: business.description,
  applicationName: business.name,
  robots: business.demo ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#164E4A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        {/* Scroll reveals start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        {/* Room below the footer for the fixed mobile action bar. */}
        <div className="bg-charcoal pb-[4.6rem] md:pb-0">
          <Footer />
        </div>
        <MobileBar />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
