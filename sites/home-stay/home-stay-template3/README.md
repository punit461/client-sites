# Kayal House — home-stay template 3

A dark, heritage waterfront site for a five-room house on the Kerala
backwaters: a full-height hero, a suite rail you drag through, the day at the
house as a timeline, a numbered index of things to do, and a three-step
enquiry.

The third of three takes on the same brief. Template 1 is the light, editorial
boutique retreat; template 2 is the warm travel journal; this one is read at
dusk — ink green, brass and bone, a classical serif, and mono for every number
on the site.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
property to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build home-stay/home-stay-template3` builds it
into the shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero and date bar, the house, rooms, the table, experiences, gallery, guests, getting here, FAQ |
| `/suites` · `/suites/[slug]` | All five rooms, plus a page per room (pre-rendered) |
| `/experiences` | The numbered index, with what is in the rate and what is arranged |
| `/dining` | The five sittings, and what the kitchen wants you to know |
| `/gallery` | Filterable gallery with a lightbox |
| `/about` | The house, the family and the chronology |
| `/contact` | Phone, WhatsApp, email, directions and the FAQ |
| `/booking` | The three-step enquiry |

## Where to edit

Almost everything is in one file — `src/data/stay.ts`:

| Export | What it holds |
| --- | --- |
| `property`, `contact`, `nav` | Name, headline, address, phone, WhatsApp, navigation |
| `facts` | The four items on the rail across the bottom of the hero |
| `rooms` | The five rooms: rates, beds, views, amenities, images, long copy |
| `houseNotes`, `chronology` | The four statements about staying here, and the house's dates |
| `experiences` | What there is to do, and whether it is included |
| `theDay`, `kitchenNotes` | The five sittings, and the kitchen's caveats |
| `gallery` | Every gallery image and its category |
| `voices` | Guest reviews — **illustrative, replace before launch** |
| `journey`, `seasonNote` | How to arrive, and when to come |
| `faqs` | The accordion |

`src/lib/images.ts` holds every photograph, `src/lib/format.ts` the rupee and
numeral formatters, and `src/app/globals.css` the palette and the type scale.

## Things worth knowing

**It is an enquiry, not a booking.** Five rooms means the calendar is checked
by a person, so the form collects dates and a party and says someone will reply
within a day. The summary shows an *indicative* total and states that it is
confirmed in writing before anything is owed. If a channel manager is connected
later, that wording is the first thing to revisit — do not present availability
as live until it is.

**No card details are collected.** The form says so, under the submit button.

**The date bar seeds the enquiry, it does not book.** It collects an arrival
and a number of nights — one fewer picker to fight with on a phone — derives
the departure date, and pushes to `/booking?from=…&to=…&guests=…`, which the
form reads. The room pages link with `?room=<slug>` the same way.

**The site is dark at every viewport and does not follow the system theme.**
`color-scheme: dark` is set in `globals.css` so form controls and scrollbars
come up dark too. The photography, the scrims over it and the brass are all
built for one ground; a light variant would be a different template.

**Sections are numbered by hand.** The mono markers (`01`, `02`, …) are passed
in where each section is used, not derived. Move a section on the home page and
renumber it there.

**The experience index needs a pointer, so phones get something else.** Hovering
or tabbing a row changes the photograph in the panel beside it. Below `lg` there
is no panel: each row carries its own image instead.

**Photography is remote stock.** A stay is sold on its rooms and its view —
replace `src/lib/images.ts` with the property's own photographs before launch,
or guests will arrive expecting somewhere else. The reviews in `voices` are
written examples for the same reason, and a line under the section says so.

**There is no embedded map.** Getting here is four rows of real distances and
one link out to the guest's own maps app. No API key to expire, and no
third-party cookies dropped before anyone has consented to them.

**`rupees()` and `numeral()` live in `src/lib/format.ts`, not in
`components/ui`.** That module is `"use client"`, and a server component cannot
call a function exported from a client module — the suite pages are server
components and format both.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the property's standalone one.

**Motion is opt-out, and opting out must not hide anything.** Every animated
component checks `useReducedMotion()`. The reduced-motion branch sets
`initial={false}` and names the resting values rather than dropping the motion
props: the export bakes the entrance `opacity: 0` into the HTML, so a bare tag
would leave a reader who asked for less motion looking at invisible text.
