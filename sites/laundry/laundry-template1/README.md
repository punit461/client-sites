# FreshFold — laundry template 1

A premium, light-themed landing page for a pickup-and-delivery laundry,
dry cleaning and ironing service.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
client to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build laundry/laundry-template1` builds it into the
shared bundle instead.

## Where to edit

Everything a client hand-over touches is data, not markup:

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Brand name, tagline, announcement strip, contact details, nav, stats, footer links |
| `src/data/services.ts` | The four service cards, the five scroll-showcase entries, the four how-it-works steps |
| `src/data/content.ts` | Why-us features, pricing plans, reviews, tracking stages, FAQ, booking slots |
| `src/lib/images.ts` | Every photograph on the page, in one map |
| `src/app/globals.css` | Colours, type scale, radii — the whole visual identity |

Sections live one-per-file in `src/components/sections/` and are composed in
`src/app/page.tsx`, in the order they appear.

## Things worth knowing

**Images are remote.** `output: "export"` ships no image optimiser, and a local
`/photo.jpg` would need `NEXT_PUBLIC_BASE_PATH` prefixed by hand at every call
site. Swap in a client's own photography by editing `src/lib/images.ts`, and add
any new hostname to `images.remotePatterns` in `next.config.ts` or `next/image`
will refuse to render it.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the client's standalone one.
`npm run check` at the repo root fails if that line is changed.

**Motion is opt-out.** Every animated component checks `useReducedMotion()` and
`globals.css` disables CSS animation under the same media query, so the two stop
together. When adding a section, follow the pattern — a user who asked for less
motion must still be able to read the page.

**The booking modal is the conversion path.** `BookingProvider` holds its state
because the "Schedule pickup" CTA appears in the header, the hero, each pricing
card, the mobile bar and the final call to action. It is a six-step form
(service, date, time, address, contact, confirm) and submits nowhere — wire
`BookingModal`'s confirm handler to a real endpoint before launch.

**The before/after slider is a range input.** Dragging, arrow keys, Home/End and
screen-reader announcement all come free from the native control; the visible
handle is drawn on top of it.
