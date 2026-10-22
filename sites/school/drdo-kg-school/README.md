# D.R.D.O KG School — website

A multi-page website for **D.R.D.O KG School** (DRDO Kindergarten School,
C.V. Raman Nagar, Bengaluru), a kindergarten run by the DRDO Employees
Educational Trust.

Next.js 16 (App Router, static export) · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · React Three Fiber · React Hook Form + Zod · Lucide.

## Where the content came from

Captured 22 Oct 2026 from the school's
[Google Maps listing](https://maps.app.goo.gl/p5nMM6NV36uq6svAA) and from the
signboard over its gate (visible in one of the listing's photos):

- **Listing:** name, address, plus code, phone (080 2524 2042), hours
  (Mon–Fri 8 am–3 pm, closed weekends), wheelchair-accessible entrance and
  car park, rating 4.2 from 38 reviews, and the domain drdokgblr.com (which
  did not resolve on that date).
- **Signboard:** full name, the DRDO Employees Educational Trust (DEET), the
  motto "Knowledge is Power", and the lotus seal the logo is based on.
- **Reviews:** themes only (caring teachers, play area, classrooms, a strong
  foundation), summarised in our words. One review says DRDO employees'
  children get admission priority; another recalls the school in 2003, which
  is the basis for "20+ years".
- **Photos:** 10 photos posted publicly on the listing, resized and stripped
  of metadata, in `public/images/`.

The logo (`src/components/ui/Crest.tsx`, `src/app/icon.svg`) redraws the
school's seal with an open book at the centre in place of the official DRDO
emblem, which is restricted and should not be reproduced.

## Before launch: confirm with the school

Search the source for `CONFIRM` to find each of these.

1. **Photos.** They were posted on Google by parents and visitors, so they
   belong to those people. Get the school's permission (or its own photos),
   and families' consent for any child who can be recognised.
2. **Classes and ages.** Nursery, LKG and UKG at 3+, 4+ and 5+ are assumed
   from "kindergarten" and Karnataka's entry rules. The day-in-the-life lists
   have no times on purpose.
3. **DRDO admission priority.** From a single review.
4. **Documents list** on the admissions page.
5. **Vision, mission and values** (`src/content/campus.ts`). Drafted for
   approval; the motto is real.
6. **Activities** beyond play and Annual Day (stories, art, music).
7. **Email, WhatsApp, social links, website domain.** None were found. Add
   them in `src/content/school.ts` and they appear across the site; the
   enquiry forms fall back to the phone number until then.
8. **Fees.** Not published; the page asks families to call. Add rows to
   `fees.rows` to publish them.
9. **Rating figures** on the home page: update or remove at launch.
10. **Privacy policy:** have the school review it.
11. **Enquiry form backend:** set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (see below).

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/  (static files, upload anywhere)
npm run lint
```

From the repo root, `npm run build school/drdo-kg-school` builds it into the
dashboard bundle instead.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, figures, about and the trust, classes, campus, activities, gallery, what families say, admission steps, visit |
| `/about/` | Purpose, vision, mission, values, who runs the school (`#trust`), review themes (`#reviews`) |
| `/academics/` | The three classes, how children learn, what kindergarten builds |
| `/academics/<class>/` | Nursery, LKG, UKG: one page per entry in `programmes.ts` |
| `/admissions/` | Steps, ages, priority, documents, how to apply, fees (`#fees`), FAQ (`#faq`), enquiry form (`#enquire`) |
| `/facilities/` | Campus collage and per-facility details |
| `/student-life/` | Play and activities, photos |
| `/gallery/` | Filterable gallery with lightbox |
| `/contact/` | Phone, directions, hours, map, general enquiry form |
| `/privacy-policy/` | Privacy policy |

Plus `sitemap.xml`, `robots.txt` and a 404 page.

## Where to edit

Content is separate from presentation; routine updates touch only these files.

| File | What it holds |
| --- | --- |
| `src/content/school.ts` | **Start here.** Name, trust, motto, phone, email, address, map, hours, socials, navigation, headline figures |
| `src/content/programmes.ts` | The classes. Delete one and its page goes with it |
| `src/content/campus.ts` | Facilities, activities, how children learn, philosophy, who runs the school |
| `src/content/admissions.ts` | Steps, ages, documents, fees, FAQ, classes offered in the form |
| `src/content/people.ts` | Review themes, and approved testimonials (empty until a parent agrees in writing) |
| `src/content/gallery.ts` | Gallery photos and captions |
| `src/lib/images.ts` | The photo catalogue (`photos`) |
| `src/app/globals.css` | Colours (from the school's blue-and-gold signboard), type scale, radii, shadows |
| `src/components/ui/Crest.tsx` | The logo mark and the full seal |

To add a photo, put it in `public/images/` and reference it as
`{ src: "/images/name.jpg", alt: "…" }`. Every photo needs real alt text.

## Environment variables

Copy `.env.example` to `.env.local`. All optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, no trailing slash. Canonical URLs, Open Graph, sitemap, robots |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | URL the enquiry forms POST JSON to |
| `NEXT_PUBLIC_ENQUIRY_ACCESS_KEY` | Public key some services want in the body (sent as `access_key`) |
| `NEXT_PUBLIC_BASE_PATH` | Set by the repo build only. Leave unset for the school's own hosting |

They are read at **build time**; rebuild after changing them.

## The enquiry forms

The site is a static export, so the forms post to an external form backend.
The browser validates with Zod first; the form shows success **only** when the
backend answers 2xx. Failure says "not sent" and gives the phone number. With no
endpoint configured, it says online enquiries are not connected and offers the
phone number (and "Email this enquiry" once the school has an email address) —
it never pretends.

Collected: name, email, phone, class (admissions), message, consent. Nothing else.

Any service that accepts JSON and returns 2xx works — Formspree, Web3Forms
(plus `NEXT_PUBLIC_ENQUIRY_ACCESS_KEY`), Basin, a Google Apps Script web app,
or your own endpoint. It must validate on the server, filter spam (the form
adds a honeypot and refuses submissions within 3 seconds of page load), and
allow CORS from the school's domain.

## Deployment

`npm run build` writes a self-contained static site to `out/`. Upload it to
any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, cPanel).
From the repo root, `npm run release -- school/drdo-kg-school` produces a
clean hand-over copy.

## Design and behaviour notes

- **Type:** Newsreader (display serif) and Manrope (sans), via `next/font`.
- **Colour:** royal navy and gold, taken from the school's signboard; ivory
  for editorial sections; `gold-ink` where gold text sits on a light background.
- **Motion:** one entrance animation (`Reveal`/`Stagger`), count-up figures,
  clip-reveal images, gentle parallax. All of it honours `prefers-reduced-motion`.
- **3D:** the hero's armillary sphere (`components/three/`) loads only on wide
  screens with WebGL, 4+ CPU cores, no reduced-motion or data-saver preference,
  and only once the browser is idle. Everyone else sees a static SVG of it.
- **Accessibility:** skip link, landmark headings, one `h1` per page, visible
  focus, native `<dialog>` for the mobile menu and lightbox, ARIA tabs with
  arrow keys, `<details>` accordions, labelled form fields with linked errors.
- **SEO:** per-page metadata with canonical URLs and Open Graph, breadcrumbs,
  `Preschool` and `FAQPage` structured data, sitemap and robots.
