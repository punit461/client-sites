# Crisp & Co. — laundry template 3

A dark, aurora-lit landing page for a members' laundry and dry-cleaning
concierge: a membership instead of a price list, an expanding service strip, a
plan recommender and a searchable stain guide.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
client to host on their own domain.

Deliberately a third design language next to `laundry-template1` (light,
editorial, serif) and `laundry-template2` (warm paper, high contrast,
per-garment pricing) — the three are alternatives to show a client, not
variations of one layout.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build laundry/laundry-template3` builds it into the
shared bundle instead.

## Where to edit

Everything a client hand-over touches is data, not markup:

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Brand, contact, nav, pickup windows, collection frequencies, headline stats, **service areas** |
| `src/data/plans.ts` | The three memberships, the yearly discount and the quote arithmetic |
| `src/data/content.ts` | Ticker promises, services, the standard, process, stain guide, tracking stages, gallery, stories, FAQ |
| `src/lib/images.ts` | Every photograph on the page, in one map |
| `src/app/globals.css` | Colours, type scale, the panel treatment, radii — the whole visual identity |

Sections live one-per-file in `src/components/sections/`, with the booking flow
kept separate in `src/components/booking/`, and they are composed in
`src/app/page.tsx` in the order they appear.

## Things worth knowing

**The palette is two accents on near-black.** Ice is the interactive colour and
gold is the membership one, and both are only ever used as fills behind
near-black text — neither passes contrast as text on this background. Panels
are separated by a one-pixel light edge rather than a shadow, because a shadow
is invisible against `#05070f`.

**Prices are derived, never typed twice.** `priceFor()` in `src/data/plans.ts`
turns a monthly rate into the yearly one, and `recommendFor()` picks the plan
for a given number of bags. Change a rate there and the cards, the slider and
the booking drawer all follow; there is nowhere for them to disagree.

**Claims are configuration.** `serviceAreas`, the stain success rates and the
headline stats are all in data files precisely because they are statements
about a real business. Set them to what an operator can evidence — the footer
says only what the list says, and the page never suggests we collect anywhere
that is not named.

**Images are remote.** `output: "export"` ships no image optimiser, and a local
`/photo.jpg` would need `NEXT_PUBLIC_BASE_PATH` prefixed by hand at every call
site. Swap in a client's own photography by editing `src/lib/images.ts`, and add
any new hostname to `images.remotePatterns` in `next.config.ts` or `next/image`
will refuse to render it.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the client's standalone one.
`npm run check` at the repo root fails if that line is changed.

**Motion is opt-out.** Every animated component checks `useReducedMotion()` and
`globals.css` disables CSS animation under the same media query, so the two
stop together. Two of them need naming:

- The marquee has its own `animation: none` rule. Left to the blanket
  `animation-duration: 0.001ms` override it would finish its travel instantly
  rather than standing still.
- The process rail draws itself full instead of disappearing. The line joining
  the five stages is information, not decoration; without it the section is
  five disconnected cards.

**The service strip is two controls per panel, not one.** A stretched button
opens the panel and the booking button sits above it. Nesting the second inside
the first would be invalid HTML and would put the CTA out of reach of the
keyboard — hover is a shortcut into the panel, never the only way in.

**Two accordions animate with CSS grid.** `grid-template-rows: 0fr → 1fr` on
the standard list and the FAQ animates to a height nobody measured, and the
text stays in the document while closed, so find-on-page and search engines
still see it.

**Nothing submits anywhere.** The booking drawer, the tracking lookup and the
stain search are all local state; `demoOrders` in `src/data/content.ts` stands
in for the tracking API. Wire them to real endpoints before launch.
