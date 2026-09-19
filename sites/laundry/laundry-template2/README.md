# LOOP — laundry template 2

A high-contrast, editorial landing page for a laundry-tech brand: oversized
type on warm paper, one lime accent, a sticky horizontal "journey", an
interactive fabric guide and a working per-garment pricing calculator.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
client to host on their own domain.

Deliberately a different design language from `laundry-template1` — the two are
alternatives to show a client, not variations of one layout.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build laundry/laundry-template2` builds it into the
shared bundle instead.

## Where to edit

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Brand, contact, nav, pickup windows, **service areas and served PIN codes** |
| `src/data/content.ts` | Bento services, journey stages, fabric guide, stories, sustainability, FAQ |
| `src/data/pricing.ts` | The rate card, fees, discount thresholds and the quote arithmetic |
| `src/lib/images.ts` | Every photograph on the page, in one map |
| `src/app/globals.css` | Colours, type scale, grain, radii — the whole visual identity |

Sections live in `src/components/sections/`, with the three interactive ones
kept separate (`pricing/`, `tracking/`, `booking/`) and composed in
`src/app/page.tsx`.

## Things worth knowing

**Claims are configuration, not copy.** `serviceAreas`, `servedPincodes` and the
`sustainability` figures are all in data files precisely because they are
statements about a real business. Set them to what an operator can evidence; a
sustainability stat left at `0` drops out of the page rather than rendering.
The location section says only what the list says, and marks everything else
"opening soon".

**The pricing calculator is real.** `quote()` in `src/data/pricing.ts` is the
single source of the arithmetic, so the summary card and the CTA can never
disagree. Change a rate, a fee or a threshold there and the whole section
follows.

**Images are remote.** `output: "export"` ships no image optimiser, and a local
`/photo.jpg` would need `NEXT_PUBLIC_BASE_PATH` prefixed by hand. Swap in a
client's photography in `src/lib/images.ts` and add any new hostname to
`images.remotePatterns` in `next.config.ts`.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the client's standalone one.
`npm run check` at the repo root fails if that line is changed.

**The horizontal journey has three modes.** Below `lg` it is a stack of cards.
At `lg` and up it is a sticky pane whose rail translates as the page scrolls —
the tall outer element is the scroll budget. Under `prefers-reduced-motion`
both the budget and the sticky pane are dropped and the rail becomes an
ordinary horizontally-scrollable region, because otherwise stages 2–6 would sit
off-screen with no way to reach them.

**Grid columns holding inputs carry `min-w-0`.** A grid item's automatic minimum
is its content's min-content, and a text input's intrinsic width is wide enough
to push the whole page sideways on a 320px phone without it.

**Nothing submits anywhere.** The booking modal, the tracking lookup, the PIN
check and the newsletter are all local state. Wire them to real endpoints
before launch.
