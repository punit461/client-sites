"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { contact, school } from "@/data/school";

const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&z=16&output=embed`;

/**
 * The map is loaded only after a click, so visiting the page sets no Google
 * cookies by itself. The link beneath always works, map or no map.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-line bg-surface-2 lg:aspect-auto lg:h-full lg:min-h-[30rem]">
      {loaded ? (
        <iframe
          title={`Map showing ${school.name}`}
          src={EMBED}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e6e0d3 1px, transparent 1px), linear-gradient(to bottom, #e6e0d3 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />
          <div className="absolute left-[14%] top-[32%] h-1.5 w-[58%] -rotate-12 rounded-full bg-line" aria-hidden />
          <div className="absolute left-[6%] top-[64%] h-1.5 w-[78%] rotate-6 rounded-full bg-line" aria-hidden />

          <div className="absolute left-1/2 top-1/2 flex w-[min(20rem,90%)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral text-white shadow-lg">
              <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <span className="mt-3 rounded-full bg-surface px-4 py-2 text-[0.82rem] font-semibold text-ink shadow-[var(--shadow-soft)]">
              {contact.address.line2}, {contact.address.city}
            </span>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="mt-5 rounded-full bg-ink px-5 py-3 text-[0.85rem] font-semibold text-cream transition hover:bg-ink/90"
            >
              Load the Google map
            </button>
            <p className="mt-3 text-[0.72rem] text-ink-faint">Loads content from Google Maps.</p>
          </div>
        </>
      )}
    </div>
  );
}
