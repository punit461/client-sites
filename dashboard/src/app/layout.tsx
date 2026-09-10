import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categories, site } from "@/lib/projects";

// Self-hosted at build time by next/font, so the published pages make no
// request to Google and there is no layout shift.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${site.title} — ${site.tagline}`,
    template: `%s — ${site.title}`,
  },
  description: site.tagline,
  // An index of work in progress: reachable by anyone with the link, but kept
  // out of search results. Each client site sets its own policy.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader title={site.title} categoryIds={categories.map((c) => c.id)} />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
