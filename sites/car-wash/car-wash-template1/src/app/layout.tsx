import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShinePro — Premium Car Wash & Detailing",
  description:
    "Premium car wash, detailing, ceramic coating and vehicle care services. Experience the difference of professional care.",
  keywords: [
    "car wash",
    "car detailing",
    "ceramic coating",
    "paint protection",
    "premium car care",
  ],
  openGraph: {
    title: "ShinePro — Premium Car Wash & Detailing",
    description:
      "Premium car wash, detailing, ceramic coating and vehicle care services.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
