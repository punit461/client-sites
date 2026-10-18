# New Pratham Public School

Redesign of [www.newprathampublicschool.in](http://www.newprathampublicschool.in/)
— a CBSE school (Affiliation No. 830770) in Dooravani Nagar, Bengaluru,
teaching Nursery to Class X.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to
the school to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build school/new-pratham-public-school` builds it
into the shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, key facts, vision/mission, about, facilities, gallery spread, achievements, admissions, map |
| `/about` | History, aims, messages from the Chairman, Managing Trustee and Principal |
| `/facilities` | The eight facilities the school lists, plus campus photographs |
| `/admissions` | Four-step process, enquiry form, link to the school's enquiry app, FAQ |
| `/gallery` | 34 albums / 61 photographs with a lightbox |
| `/gallery/videos` | 11 YouTube videos, click-to-load |
| `/achievements` | Six awards and competition results |
| `/contact` | Address, phones, WhatsApp, email, hours, map, call-back form |
| `/notices` | Notice board — starts empty with an honest empty state |
| `/mandatory-disclosure` | The CBSE disclosure PDF, embedded and downloadable |

## Where the content came from

Everything on the site comes from the school's previous website and Google
Maps listing, scraped on 2026-10-18. The scrape lives in `source/`:

| Path | What it holds |
| --- | --- |
| `source/SCRAPE-REPORT.md` | What was captured, the content gaps on the old site, and a security finding about the old hosting |
| `source/website-content/` | Every old page as markdown + JSON, raw HTML, and all original images and the disclosure PDF |
| `source/google-maps-content/` | Listing details, 36 community photos, one video, a Street View still |

Copy was lightly edited for spelling and grammar; names, claims and awards are
exactly as the school published them. Two things still need the school's
confirmation before launch:

- **Phone number.** The old website shows 080 4095 4645; Google Maps shows
  080 2272 5593. Both are in `src/data/school.ts`; the website's is shown first.
- **Pages the old site had but never filled** — Teachers, Clubs, Circulars,
  Careers, Past Students TC. They are not built here. Add them once the school
  supplies content; Notices (`src/data/content.ts` → `notices`) is ready for
  circulars.

The Google Maps photos are **not used on the site**: they were uploaded by
members of the public, not the school, so the rights are not the school's to
grant. Only images from the school's own website are in `public/images`.

## Images

`public/images/` is generated — do not edit it by hand. Drop originals into
`source/website-content/assets/` (or extend the lists in the script) and run:

```bash
node scripts/build-images.mjs
```

It writes web-sized JPEGs (1600 px, plus 640 px thumbnails for the gallery)
and `src/data/generated/images.json`, which the pages read. Every image path
goes through `asset()` in `src/lib/assets.ts` so the base path is applied.

## Where to edit

| File | What it holds |
| --- | --- |
| `src/data/school.ts` | Name, affiliation, contact details, hours, navigation, social links |
| `src/data/content.ts` | Vision/mission, about, leadership messages, facilities, admissions steps and FAQ, achievements, notices |
| `src/data/videos.ts` | YouTube video IDs and titles |
| `src/app/globals.css` | Colours, type scale, radii — the whole visual identity |

## Things worth knowing

**No backend.** The enquiry forms open WhatsApp (which the school already
answers) with the message filled in, or an email draft. Nothing is stored.

**The map and the videos load on click**, so visiting a page sets no Google or
YouTube cookies by itself.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the school's standalone one.
`npm run check` at the repo root fails if that line is changed.

**Motion is opt-out.** Every animated component checks `useReducedMotion()` and
`globals.css` disables CSS animation under the same query.
