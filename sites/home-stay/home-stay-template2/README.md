# Wander & Pine — home-stay template 2

A travel-journal site for a four-room hillside homestay: handwritten accents,
polaroids, a drawn map of what is nearby and an enquiry flow. Warmer and more
personal than template 1, which is the editorial, hotel-like take on the same
brief.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
property to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build home-stay/home-stay-template2` builds it into
the shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero and booking widget, story, rooms, experiences, map, journal, FAQ |
| `/stay` · `/stay/[slug]` | All four rooms, plus a page per room (pre-rendered) |
| `/experiences` | Walks, estate tours and evenings |
| `/explore` | The drawn map and everything worth the drive |
| `/gallery` | The photo journal |
| `/story` | The house and the people who run it |
| `/contact` | Phone, email, WhatsApp, directions |
| `/booking` | The enquiry form |

## Where to edit

Almost everything is in one file — `src/data/stay.ts`:

| Export | What it holds |
| --- | --- |
| `property`, `contact`, `nav` | Name, headline, address, phone, WhatsApp, navigation |
| `rooms` | The four rooms: rates, beds, sizes, amenities, images, long copy |
| `heroCards` | The three cards floating over the hero plate |
| `experiences` | What there is to do, and what is included |
| `places` | Map pins — name, kind, distance and the `x`/`y` percentage of each |
| `journal` | The photo journal and the polaroids |
| `faqs` | The accordion |

`src/lib/images.ts` holds every photograph, `src/lib/accents.ts` the per-room
accent colours, `src/lib/format.ts` the rupee formatter, and
`src/app/globals.css` the palette, the type scale and the `.polaroid` / `.hand`
classes that carry the journal look.

## Things worth knowing

**It is an enquiry, not a booking.** Four rooms means the calendar is checked by
a person, so the form collects dates and a party and says someone will reply
within a day. The summary shows an *indicative* total and states it is confirmed
in writing before anything is owed. If a channel manager is connected later,
that wording is the first thing to revisit — do not present availability as live
until it actually is.

**No card details are collected.** The form says so, under the submit button.

**The hero widget seeds the enquiry, it does not book.** It submits to
`/booking?from=…&to=…&guests=…&room=…` and the form reads those params, so the
dates a guest picked on the home page survive the jump.

**The map is drawn, not embedded.** Pin positions are hand-set `x`/`y`
percentages in `places`, and the caption says so: *"Illustrative map — distances
are real, positions are not to scale."* The distances are the real numbers; move
a pin and you change only where the dot sits. No API key to expire, and no
third-party cookies dropped before anyone has consented to them.

**Photography is remote stock.** A stay is sold on its rooms and its view —
replace `src/lib/images.ts` with the property's own photographs before launch,
or guests will arrive expecting somewhere else. The guest stories in `journal`
are written examples for the same reason: replace them with ones the property
has actually received.

**`rupees()` and `ACCENT` live in `src/lib/`, not in `components/ui`.** That
module is `"use client"`, and a server component cannot read a value exported
from a client module — the room pages are server components and use both.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the property's standalone one.

**Motion is opt-out, and opting out must not hide anything.** Every animated
component checks `useReducedMotion()`. The reduced-motion branch sets
`initial={false}` and the resting values rather than dropping the motion props:
the export bakes the entrance `opacity: 0` into the HTML, so a bare tag would
leave a reader who asked for less motion looking at invisible text.
