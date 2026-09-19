# Ridgeline Retreat — home-stay template 1

A calm, editorial site for a small boutique homestay: cinematic hero, room
pages, experiences, a gallery with a lightbox and an enquiry flow.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
property to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build home-stay/home-stay-template1` builds it
into the shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero, story, rooms, experiences, gallery, nearby, reviews, location |
| `/rooms` · `/rooms/[slug]` | All rooms, plus a page per room (pre-rendered) |
| `/experiences` | What there is to do, and what is included |
| `/gallery` | Filterable masonry gallery with a lightbox |
| `/location` | Getting here, and what is worth the drive |
| `/about` | The estate and the people |
| `/contact` | Phone, email, WhatsApp, map and FAQ |
| `/booking` | The enquiry form |

## Where to edit

Almost everything is in one file — `src/data/stay.ts`:

| Export | What it holds |
| --- | --- |
| `property`, `contact`, `nav` | Name, tagline, address, phone, WhatsApp, navigation |
| `rooms` | The four rooms: rates, sizes, beds, amenities, images, long copy |
| `reasons` | The "why stay" cards |
| `experiences` | Walks, tours and evenings, with what is included |
| `nearby` | Places worth the drive, with distances |
| `gallery` | Every gallery image and its category |
| `reviews` | Guest reviews — **illustrative, replace before launch** |
| `faqs` | The accordion |

`src/lib/images.ts` holds every photograph, and `src/app/globals.css` holds the
colours and type scale.

## Things worth knowing

**It is an enquiry, not a booking.** At six rooms there is no live inventory, so
the form collects dates and a party and says a person will reply within a day.
The summary card shows an *indicative* total and states that it is confirmed in
writing before anything is owed. If you connect a real channel manager later,
that wording is the thing to revisit first — do not present availability as
live until it is.

**No card details are collected.** The form says so, under the submit button.

**Reviews are illustrative.** The four in `stay.ts` are written examples, and a
line under the section says so. Replace them with reviews the property has
actually received.

**Photography is remote stock.** A stay is sold on its rooms and its view —
replace `src/lib/images.ts` with the property's own photographs before launch,
or guests will arrive expecting somewhere else.

**The map is drawn, not embedded.** No API key to expire and no third-party
cookies dropped before anyone has consented to them. Swap in a real provider if
you want interactivity.

**`rupees()` lives in `src/lib/format.ts`, not in `components/ui`.** That module
is `"use client"`, and a server component cannot call a function exported from
a client module — the room pages are server components and format prices.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the property's standalone one.

**Motion is opt-out.** Every animated component checks `useReducedMotion()` and
`globals.css` disables CSS animation under the same query, so the two stop
together.
