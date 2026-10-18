# D.R.D.O KG School

A one-page website for D.R.D.O KG School, a kindergarten in C V Raman Nagar,
Bengaluru.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to the
school to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build school/drdo-kg-school` builds it into the
shared bundle instead.

## Where to edit

Everything the school will ask to change is data, not markup:

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Name, contact details, address, map, hours, Google rating, navigation |
| `src/data/content.ts` | About text, highlight cards, admissions steps and classes, parent themes, gallery |
| `src/lib/images.ts` | Every image on the page, in one map |
| `src/app/globals.css` | Colours, type sizes, radii: the whole visual identity |

Sections live one per file in `src/components/sections/` and are composed in
`src/app/page.tsx`, in the order they appear.

## Content still to come from the school

The content comes from the school's Google Maps listing (captured 18 Oct 2026).
Anything the listing didn't establish is written as `pending("…")` in
`src/data/` and shows on the page as **highlighted yellow text**, so the gaps
are obvious when you review the site with the school:

- Year founded, who runs the school, teaching approach
- Age for each class (Nursery, LKG, UKG)
- Admission documents, dates and age criteria
- Whether children of DRDO employees get admission priority. This came from a
  single Google review and must be confirmed before launch
- School days, closing time and email address
- Extra facilities (transport, CCTV, day-care…)
- Parent quotes, with names, used with permission

Before handover, search `src/data/` for `pending(`. There should be no matches.

## Swapping in the school's photos

Every image is currently a labelled placeholder in `public/images/placeholders/`.
To replace one:

1. Save the photo as `public/images/<name>.jpg`. Landscape 4:3 works best,
   about 1600px wide, under 400 KB.
2. In `src/lib/images.ts`, change `placeholder("<name>")` to
   `asset("/images/<name>.jpg")`.

| Name | Where it appears | Suggested shot |
| --- | --- | --- |
| `hero` | Full-width banner | Building front or the play area |
| `about` | About section | Entrance with the signboard |
| `teachers` | "Caring teachers" card | Staff group photo |
| `play-area` | "Superb play area" card | Outdoor play equipment |
| `classroom` | "Bright classrooms" card | A classroom set up for the day |
| `gallery-1` … `gallery-6` | Gallery | Annual day, sports day, festivals, art, play, activities |

Use only photos the school owns. For any photo showing a child's face, get the
parents' written consent.

## Things worth knowing

**Images are local, unlike the templates.** `next/image` does not apply
`basePath` to a string `src`, so every path goes through `asset()` in
`src/lib/images.ts`. A bare `"/images/x.jpg"` works in `npm run dev` but breaks
once the site is built under the dashboard's sub-path.

**The logo is a stand-in.** `src/components/layout/Wordmark.tsx` draws a yellow
"KG" badge. Replace it with the school's logo once they send it.

**The map is Google's official embed.** It needs no API key. The coordinates
are in `contact.geo` in `src/data/site.ts`.

**The Google rating is a snapshot.** Update `rating` in `src/data/site.ts` at
launch, or remove the hero line and the "What parents say" heading that use it.
