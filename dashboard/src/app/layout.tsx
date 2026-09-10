import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.tagline,
  // An internal index of work in progress: findable by the people with the
  // link, not by search engines. Each client site sets its own policy.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="masthead">
          <div className="wrap masthead-inner">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden>
                CS
              </span>
              {site.title}
            </Link>
            <nav>
              <Link href="/">Projects</Link>
              <Link href="/about">How this works</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
