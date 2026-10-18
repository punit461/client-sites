# Little Angels Modern High School

The website for Little Angels Modern High School (LAMHS), Sadanandanagar,
Bengaluru — a not-for-profit, inclusive school from Montessori to Class 10.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to
the school to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build school/little-angels-modern-high-school`
builds it into the shared bundle instead.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, at-a-glance stats, story, what makes us different, stages, facilities, events, videos, alumni, admissions, map |
| `/about/` | Founders, timeline, mission and values |
| `/academics/` | Nursery to Class 10 and how the school teaches |
| `/facilities/` | Playground, science labs, library, computer lab |
| `/life-at-lamhs/` | Events, yearly traditions, photo gallery, videos |
| `/alumni/` | Museum of Little Angels |
| `/admissions/` | Steps, WhatsApp enquiry form, registration link, FAQ, map and hours |

## Where to edit

Everything the school might ask to change is data, not markup:

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Name, phones, WhatsApp number, address, hours, socials, nav, admissions banner |
| `src/data/content.ts` | Every section's wording: story, differentiators, academics, facilities, events, gallery, videos, FAQ |
| `src/lib/asset.ts` | The photo map (`img`) and the `asset()` helper |
| `src/app/globals.css` | Colours (from the crest: navy, olive gold, white), type scale, radii |

## Things worth knowing

**Photos are local, so they go through `asset()`.** They live in
`public/images/`, resized from the school's own uploads (lamhs.in and the
owner's Google Maps photos). `next/image` does not add `basePath` to local
files, so every `src` is wrapped in `asset()` — skip it and the photos vanish
when the site is published under the dashboard. Photos posted to Maps by the
public were left out on purpose: they belong to whoever posted them.

**The enquiry form submits to WhatsApp.** A static export has no server, so the
form composes the enquiry as a WhatsApp message to the school office and opens
it — the parent sees it and presses send. The full registration still goes
through the school's existing JotForm (`contact.registrationForm`).

**Videos load nothing until played.** `VideoCard` shows a poster image and only
swaps in the youtube-nocookie player on click.

**Motion is opt-out.** Animated components check `useReducedMotion()` and
`globals.css` disables CSS animation under the same media query.

## Before launch — confirm with the school

- PIN code: 560038 on their old site, 560043 on Google Maps (the site uses 560038).
- The full text of each event write-up (the old site cut them off).
- A transparent PNG or SVG of the crest — the current file has a white ground.
- Original, full-resolution photos; several are compressed WhatsApp images.
