# ClearFlow Plumbing — plumbing template 3

A calm, modern plumbing website inspired by Scandinavian editorial layouts:
forest teal, warm sand and soft sage, arched photo frames, slow organic water
shapes, and generous white space. Built to win genuine enquiries — and to say
nothing about the business that the business hasn't confirmed.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion for React
(`motion/react`) · Lucide icons. Statically exported: 41 pages, no server.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000, with hot reload
npm run build        # -> out/  (upload to any static host)
npm run lint
```

To see it inside the repo dashboard, build it from the repo root instead:

```bash
npm run build plumbing/plumbing-template-3
```

A plain `npm run build` inside this folder builds for the site root, which the
dashboard can't serve correctly.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, benefits, services, why us, how it works, featured work, urgent help, team & story, reviews/what to expect, service area + checker, FAQ, final CTA |
| `/services` · `/services/[slug]` | Eight services: signs, scope, steps, safety advice, FAQ, related work and services |
| `/residential-plumbing` · `/commercial-plumbing` | Audience pages |
| `/emergency-plumbing` | Emergency service **or** "make it safe first" guidance, switched by `verified.emergencyService` |
| `/service-areas` · `/service-areas/[slug]` | Illustration, area list, postal-code checker, a page per area |
| `/projects` · `/projects/[slug]` | Filterable gallery; each project explains what that kind of job involves |
| `/about` · `/reviews` · `/faq` · `/contact` | Company pages |
| `/request-a-quote` | The quote form (`?service=<slug>` preselects a service) |
| `/privacy-policy` · `/terms` | Plain-language policies |

Plus `sitemap.xml`, `robots.txt`, a 404 page, an error boundary and a loading state.

## What's interactive

| Feature | How it works |
| --- | --- |
| Postal-code checker | Checks input against `src/content/areas.ts`. Four honest outcomes: covered; edge of range (contact to confirm); outside (a valid postal code that isn't listed); not recognised (contact us). It never says yes by default. |
| Project filter | Appears only when three or more categories have projects. Toggle buttons with `aria-pressed`; the result count is announced. One scrollable row on phones. |
| How-it-works timeline | Horizontal on wide screens, vertical on phones. The line flows along and the step markers fill as it scrolls into view. |
| Quote form | Validated in the browser and on the server. "Home or business?" — choosing business reveals a business-name field. Choosing "Urgent" hides date/time preferences and shows a call prompt instead. |
| Mobile menu | Slide-in drawer: focus-trapped, Escape closes, focus returns to the button. |
| Header | Sticky; sand at the top of the page, solid white once you scroll. |

## Project structure

```
src/
  config/business.ts     ← the one file to edit: name, phone, hours, verified claims, story, approach
  config/env.ts          environment variables, validated at build time
  config/navigation.ts   menus
  content/services.ts    eight services (offered: false hides one everywhere)
  content/areas.ts       areas, postal codes, coverage + the checker logic
  content/projects.ts    the gallery (case studies only for real jobs)
  content/faqs.ts        FAQ answers built from the config
  content/reviews.ts     verified reviews — empty by default
  lib/                   images, SEO + structured data, form validation rules
  components/            layout, sections, templates, forms, ui, motion
  app/                   one folder per route
integrations/quote-worker/   Cloudflare Worker that receives and emails quote requests
```

## Making it a real company's site

Everything below is in `src/config/business.ts` unless noted.

- **Brand:** `name`, `shortName`, `tagline`, `description`. Replace the mark in
  `src/components/layout/Logo.tsx` and `src/app/icon.svg`.
- **Contact:** `phone.display` (shown) and `phone.e164` (dialled), `email`.
  Leave `address` as `null` for a mobile business; the site then says "we
  come to you".
- **Hours:** `hours` (24-hour times) and `hoursNote`.
- **Claims:** each `verified` flag stays `false` until there's evidence.
  `emergencyService` switches the urgent-help section, emergency page, FAQ
  answer and announcement bar. `licensed`, `insured` and `workmanshipWarranty`
  add credentials to the benefits strip and the About section (with
  `credentials.licenseNumber` / `warrantySummary`).
- **Company story:** `story` takes the company's real history as paragraphs.
  While it's empty, the About section describes how the company works instead
  of inventing a backstory.
- **Approach, benefits, who we serve:** `approach`, `benefits`, `serves`.
  Keep only what the company actually does.
- **Services:** `src/content/services.ts`. `offered: false` removes a service
  everywhere — cards, menus, form options, FAQ, sitemap.
- **Areas:** `src/content/areas.ts`. The placeholder postal codes come from the
  unassigned 001xx range. Use `coverage: "confirm"` for edge-of-range areas.
  An area page is indexed (and in the sitemap) only once `localNotes` holds
  genuinely local content. Outside the US, change the postal-code rule in
  `checkCoverage` (it expects a 5-digit ZIP or ZIP+4).
- **Projects:** `src/content/projects.ts`. Replace stock photos with the
  company's own; add `caseStudy` (issue, work, outcome) only for a real job,
  with the customer's agreement.
- **Photos:** `src/lib/images.ts` (free-licence Unsplash today). Put the
  company's photos in `public/images/` and reference `"/images/x.jpg"`.
- **Reviews:** `src/content/reviews.ts`, word for word, with links. Add
  profile links to `reviewProfiles`. Until then the site shows "What to Expect
  When You Contact Us".
- **Socials:** real, active profiles only. An empty list renders nothing.
- **Go live:** set `demo: false`. Until then the site is `noindex` and the
  footer says it's a template preview.

## Connecting the quote form

Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_QUOTE_ENDPOINT`, and
rebuild. Without it the form says plainly that online requests aren't
connected, sends nothing, keeps what was typed, and offers phone and email.

- **Included worker (recommended):** `integrations/quote-worker` re-validates
  every field with the same rules as the browser
  (`src/lib/quote-rules.ts`), drops bots (honeypot + minimum fill time),
  rate-limits each IP, accepts posts only from your domain, and emails the
  request with photos attached via Resend. The API key stays a Worker secret.
  See [its README](integrations/quote-worker/README.md) to deploy.
- **A form service** (Formspree, Basin…): set the endpoint to the form's URL.
  Requests with photos are multipart — check your plan accepts files.
  `NEXT_PUBLIC_QUOTE_ACCESS_KEY` covers services that want a public key.
- **A CRM or webhook:** accept `name`, `email`, `phone`, `postalCode`,
  `address`, `propertyType`, `company`, `service`, `description`, `urgency`,
  `preferredDate`, `timeWindow`, `consent`, `page`, and `attachments` files.

Whatever you use must answer 2xx only when the request has really been
received — the form shows success on 2xx and nothing else. The browser also
blocks double submits and repeat sends within a minute; real rate limiting is
the worker's job.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the live domain, run `npm run build`, and upload
`out/` to any static host (Netlify, Cloudflare Pages, Vercel, S3, a web
server).

## Launch checklist

**Business facts**
- [ ] Name, phone, email and hours are real; the phone rings and the inbox is monitored
- [ ] `address` set only if customers visit
- [ ] Each `verified` flag backed by evidence (licence, policy, warranty terms, out-of-hours rota)
- [ ] `story` written by the company, or left empty
- [ ] Every item in `approach`, `benefits` and `serves` is true
- [ ] Every offered service is performed; others set `offered: false`
- [ ] Service copy, FAQs and safety advice reviewed by the company's plumber
- [ ] Areas, postal codes and `coverage` values match where the company really goes
- [ ] Postal-code checker tested with real codes: inside, edge, outside

**Content**
- [ ] Logo and favicon replaced
- [ ] Stock photos replaced where possible; none presented as a customer's job
- [ ] Case studies only for real jobs, with permission
- [ ] Reviews copied word for word and linked; names only with permission
- [ ] Social links real and active
- [ ] Privacy policy and terms reviewed for the company's location (template text is not legal advice)

**Form**
- [ ] `NEXT_PUBLIC_QUOTE_ENDPOINT` set and the site rebuilt
- [ ] Test requests arrive correctly: one with a photo, one marked "business"
- [ ] Reply-to on the email is the customer's address
- [ ] Worker `ALLOWED_ORIGINS` lists only the live domain

**SEO and launch**
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] `demo: false`; `robots.txt` allows crawling; pages no longer `noindex`
- [ ] Titles and descriptions read well on every page
- [ ] Structured data passes the [Rich Results Test](https://search.google.com/test/rich-results) with only true facts
- [ ] Sitemap submitted in Google Search Console
- [ ] Google Business Profile matches the site exactly
- [ ] Lighthouse and an accessibility checker run on the live site

## Notes for developers

- The homepage hero fills exactly one screen at every size: its height is the
  viewport minus the header, hours bar and mobile action bar, the photo flexes
  to the room left, and on short phones the photo steps aside.
- Hero entrance animations are CSS keyframes, so the headline and buttons are
  visible before JavaScript loads. Scroll reveals, the timeline, filters,
  accordion and drawer use Motion for React. Everything respects
  `prefers-reduced-motion`; a `<noscript>` rule shows reveal content without
  JavaScript.
- FAQ answers stay in the HTML when collapsed (`inert`), so FAQ structured
  data matches visible content.
- The mobile drawer is portalled to `<body>`; the header's `backdrop-filter`
  would otherwise trap its fixed positioning.
- Images are requested from the CDN at the width each slot needs, because a
  static export can't resize them (`images.unoptimized`).
