# FlowForce Plumbing — plumbing template 2

A bold, high-contrast plumbing website: charcoal and off-white sections,
electric-blue panels, lime calls to action, oversized Space Grotesk headlines
and technical line patterns. Built to generate genuine enquiries — and to say
nothing about the business that the business hasn't confirmed.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide icons. Statically exported: 42 pages, no server required.

A deliberately different product from `plumbing-template-1` (AquaCraft, a calm
editorial look). Same honesty rules; different design, components and copy.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/  (upload to any static host)
npm run lint
```

From the repo root, `npm run build plumbing/plumbing-template-2` builds it into
the shared dashboard bundle.

## What's interactive

| Feature | Where | How it works |
| --- | --- | --- |
| Service selector | Home, `/services` | A real radio group (keyboard and screen-reader friendly). Picking a problem updates the panel and links to the service page or the estimate form with that service preselected. |
| Area checker | Home, `/service-areas` | Checks a postal code or neighborhood against `src/content/areas.ts`. Four honest outcomes: covered, edge-of-range (contact to confirm), outside the area (well-formed postal code not on the list), or not recognised (contact us). It never says yes by default. |
| Project filters | Home, `/projects` | Toggle buttons with `aria-pressed`; the result count is announced. |
| Estimate form | Home, `/request-a-quote` | Validated in the browser and on the server. A business-name field appears only for commercial work; date/time preferences are hidden for urgent jobs, which get a call prompt instead. `?service=<slug>` preselects the category. |
| Mobile menu | Every page under 1280px | Full-screen, focus-trapped, Escape closes, focus returns to the button. |
| Reading progress | Header | A thin lime bar along the header's bottom edge. |

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, selector, services, the FlowForce standard, urgent help, how it works, projects, feedback/expectations, area checker, estimate form, FAQ, CTA |
| `/services` · `/services/[slug]` | Eight services with signs, scope, process, safety advice, FAQs, related work |
| `/residential-plumbing` · `/commercial-plumbing` | Audience pages |
| `/emergency-plumbing` | Emergency service **or** "make it safe first" guidance, switched by `verified.emergencyService` |
| `/service-areas` · `/service-areas/[slug]` | Checker, area list, a page per area |
| `/projects` · `/projects/[slug]` | Filterable showcase; each project explains what that kind of job involves |
| `/about` · `/reviews` · `/faq` · `/contact` | Company pages |
| `/request-a-quote` | The estimate form |
| `/privacy-policy` · `/terms` | Plain-language policies |

## Project structure

```
src/
  config/business.ts     ← the one file to edit: name, phone, hours, verified claims, principles
  config/env.ts          environment variables, validated at build time
  config/navigation.ts   menus
  content/services.ts    eight services (offered: false hides one everywhere)
  content/areas.ts       areas, postal codes, coverage + the checker logic
  content/projects.ts    the showcase (case studies only for real jobs)
  content/faqs.ts        FAQ answers built from the config
  content/reviews.ts     verified reviews — empty by default
  lib/                   images, SEO + structured data, form validation rules
  components/            layout, sections, templates, forms, ui, motion
  app/                   one folder per route
integrations/quote-worker/   Cloudflare Worker that receives and emails estimate requests
```

## Making it a real company's site

All in `src/config/business.ts` unless noted.

- **Brand:** `name`, `shortName`, `tagline`, `description`. Replace the mark in
  `src/components/layout/Logo.tsx` and `src/app/icon.svg`.
- **Contact:** `phone.display` (shown) and `phone.e164` (dialled), `email`.
  `address` stays `null` for a mobile business.
- **Hours:** `hours` (24-hour times) and `hoursNote`.
- **Claims:** each `verified` flag stays `false` until there's evidence.
  `emergencyService` switches the emergency banner, page and FAQ answer;
  `licensed`, `insured` and `workmanshipWarranty` add credentials to the About
  page (with `credentials.licenseNumber` / `warrantySummary`).
- **Principles:** the four "FlowForce standard" promises. Keep only true ones.
- **Services:** `src/content/services.ts`. `need` is how a customer describes
  the problem (used by the selector and the form); `offered: false` removes a
  service everywhere.
- **Areas:** `src/content/areas.ts`. Placeholder postal codes are from the
  unassigned 001xx range. Use `coverage: "confirm"` for edge-of-range areas.
  Area pages are indexed only once `localNotes` holds genuinely local content.
  If the company isn't in the US, change the postal-code rule in
  `checkCoverage` (it expects 5-digit ZIP or ZIP+4).
- **Projects:** `src/content/projects.ts`. Swap stock photos for the
  company's own; add `caseStudy` only for real jobs, with permission.
- **Photos:** `src/lib/images.ts` (free-licence Unsplash today). Put the
  company's photos in `public/images/` and reference `"/images/x.jpg"`.
- **Reviews:** `src/content/reviews.ts`, word for word with links. Profile
  links go in `reviewProfiles`. Until then the site shows "What to expect".
- **Socials:** real, active profiles only.
- **Go live:** set `demo: false` (until then: `noindex`, plus a footer note).

## Connecting the estimate form

Set `NEXT_PUBLIC_QUOTE_ENDPOINT` in `.env.local` (see `.env.example`) and
rebuild. Without it the form says plainly that online requests aren't
connected, sends nothing, keeps what was typed, and offers phone and email.

- **Included worker (recommended):** `integrations/quote-worker` re-validates
  every field with the same rules as the browser, drops bots, rate-limits per
  IP, accepts only your domain, and emails the request (photos attached) via
  Resend. The API key stays a Worker secret. Deploy steps are in
  [its README](integrations/quote-worker/README.md).
- **A form service** (Formspree, Basin…): set the endpoint to the form URL.
  Requests with photos are multipart — check your plan accepts files.
  `NEXT_PUBLIC_QUOTE_ACCESS_KEY` covers services that want a public key.
- **A CRM or webhook:** accept `name`, `email`, `phone`, `postalCode`,
  `address`, `service`, `company` (commercial only), `description`, `urgency`,
  `preferredDate`, `timeWindow`, `consent`, `page`, and `attachments` files.

Whatever you use must answer 2xx only when the request has really been
received — the form shows success on 2xx and nothing else.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the live domain, build, and upload `out/` to any
static host (Netlify, Cloudflare Pages, Vercel, S3, a web server).

## Launch checklist

**Business facts**
- [ ] Name, phone, email and hours are real; the phone rings and the inbox is monitored
- [ ] `address` set only if customers visit
- [ ] Each `verified` flag backed by evidence (licence, policy, warranty terms, out-of-hours rota)
- [ ] All four principles are true of how the company works
- [ ] Every offered service is performed; others set `offered: false`
- [ ] Service copy, FAQs and safety advice reviewed by the company's plumber
- [ ] Areas, postal codes and `coverage` values match where the company really goes
- [ ] Area checker tested with real postal codes: inside, edge, outside

**Content**
- [ ] Logo and favicon replaced
- [ ] Stock photos replaced where possible; none presented as a customer job
- [ ] Case studies only for real jobs, with permission
- [ ] Reviews copied word for word, linked to the source; names only with permission
- [ ] Social links real and active
- [ ] Privacy policy and terms reviewed for the company's location (template text is not legal advice)

**Form**
- [ ] `NEXT_PUBLIC_QUOTE_ENDPOINT` set and the site rebuilt
- [ ] A test request (with a photo, and one marked commercial) arrives correctly
- [ ] Worker `ALLOWED_ORIGINS` lists only the live domain

**SEO and launch**
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] `demo: false`; `robots.txt` allows crawling; pages no longer `noindex`
- [ ] Titles and descriptions read well on every page
- [ ] Structured data passes the [Rich Results Test](https://search.google.com/test/rich-results) with only true facts
- [ ] Sitemap submitted in Google Search Console
- [ ] Google Business Profile matches the site exactly
- [ ] Lighthouse run on the live site

## Notes for developers

- Hero entrance is CSS keyframes, so the headline and calls to action are
  visible before JavaScript loads. Section reveals, the selector, filters,
  accordion and menu use Framer Motion with 150–400 ms transitions.
  Everything respects `prefers-reduced-motion`; a `<noscript>` rule shows
  reveal content without JavaScript.
- FAQ answers stay in the HTML when collapsed (`inert`), so FAQ structured
  data matches visible content.
- The mobile menu is portalled to `<body>` so no ancestor can trap its fixed
  positioning.
- Images are requested from the CDN at the width each slot needs, because a
  static export can't resize them (`images.unoptimized`).
