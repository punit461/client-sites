# AquaCraft Plumbing Co. — plumbing template 1

A premium, editorial plumbing company website: warm ivory, midnight navy and
copper, large Manrope headlines, real plumbing photography. Built to be honest
by default — nothing on it claims a licence, insurance, emergency cover, a
review or a statistic until the company confirms it in one config file.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide icons. Statically exported: 33 pages, no server required.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/  (upload this folder to any static host)
npm run lint
```

From the repo root, `npm run build plumbing/plumbing-template-1` builds it into
the shared dashboard bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, trust strip, services, standards, process, work, urgent help, reviews/standards, areas, FAQ, CTA |
| `/services` · `/services/[slug]` | Eight services, each with signs, scope, approach, safety advice, FAQs and related services |
| `/residential-plumbing` · `/commercial-plumbing` | Audience pages, each with its own copy and FAQs |
| `/emergency-plumbing` | Emergency service **or** "what to do first" guidance — switches on `verified.emergencyService` |
| `/service-areas` · `/service-areas/[slug]` | Coverage and one page per area |
| `/projects` | Work gallery with a working category filter |
| `/about` · `/reviews` · `/faq` · `/contact` | Company pages |
| `/request-a-quote` | The quote form (`?service=<slug>` preselects a service) |
| `/privacy-policy` · `/terms` | Plain-language policies |

Plus `sitemap.xml`, `robots.txt`, a 404 page and an error boundary.

## Project structure

```
src/
  config/
    business.ts        ← the one file to edit: name, phone, hours, verified claims, standards
    env.ts             environment variables, validated at build time
    navigation.ts      header and footer menus
  content/
    services.ts        the eight services (set offered: false to hide one everywhere)
    areas.ts           service areas and postal codes
    faqs.ts            general FAQ, answers built from the config
    gallery.ts         work photos (and real case studies, when there are any)
    reviews.ts         verified reviews — empty by default
  lib/
    images.ts          the photo library and CDN sizing
    seo.ts             metadata, Plumber/LocalBusiness, breadcrumb and FAQ structured data
    quote-rules.ts     form validation shared by the browser and the worker
  components/
    layout/            announcement bar, header + mobile drawer, footer, mobile action bar
    sections/          homepage sections, reused across pages
    templates/         page hero, audience page, legal page
    forms/             the quote form
    ui/  motion/       small primitives: icon, photo, accordion, reveal animations
  app/                 one folder per route
integrations/
  quote-worker/        Cloudflare Worker that receives and emails quote requests
```

## Making it a real company's site

Everything below is in `src/config/business.ts` unless noted.

**Brand name and logo.** Change `name`, `shortName`, `monogram`, `tagline` and
`description`. The logo mark is the SVG in `src/components/layout/Logo.tsx` —
replace it with the company's own (keep the link and its `aria-label`), and
replace `src/app/icon.svg` for the browser tab.

**Contact details.** `phone.display` is what people see; `phone.e164` is what
`tel:` links dial. Set `email`. Set `address` only if customers can visit — a
mobile business leaves it `null` and the site says "we come to you" instead.

**Hours.** Edit `hours` (24-hour times are used for structured data) and
`hoursNote`.

**Claims.** Each flag in `verified` stays `false` until the company can prove
it. Turning one on makes it appear across the trust strip, About page and
structured data:

| Flag | Shows | Turn on when |
| --- | --- | --- |
| `emergencyService` | Emergency callout, 24/7 note, emergency page in menus | Someone really answers the phone out of hours |
| `licensed` | "Licensed" (+ `credentials.licenseNumber`) | The licence is current where they work |
| `insured` | "Fully insured" | A liability policy is in force |
| `workmanshipWarranty` | Warranty (+ `credentials.warrantySummary`) | Written warranty terms exist |

**Working standards.** `standards` are promises about how the company works
(written estimates, arrival windows, a clean finish). Delete any it does not
keep.

**Services.** `src/content/services.ts`. Edit the copy to match how the company
works; set `offered: false` on anything it doesn't do — that removes it from
every menu, card, form option, FAQ and the sitemap.

**Service areas.** `src/content/areas.ts`. The placeholders use unassigned
postal codes so they point nowhere real. Each area has a page, but it is only
indexed by search engines (and listed in the sitemap) once you add
`localNotes` written from real experience in that area. That is deliberate:
near-identical location pages are treated as spam.

**Photos.** `src/lib/images.ts`. Today these are free-licence Unsplash
photographs of real plumbing work. Replace them with the company's own as soon
as possible: drop files in `public/images/` and use `src: "/images/x.jpg"` (the
base path is added for you). The site labels stock photos as representative,
never as customer jobs.

**Reviews.** `src/content/reviews.ts`. Paste verified reviews word for word
with a link to the original. Until there are any, the site shows the company's
service standards instead. Add review profile links to `reviewProfiles`.

**Social links.** `socials` — real, active profiles only. An empty list shows
nothing.

**Go live.** Set `demo: false`. Until then the site is `noindex` and shows a
"template preview" note in the footer.

## Connecting the quote form

The site is static, so the form posts to an endpoint set at build time:

```bash
cp .env.example .env.local
# then set NEXT_PUBLIC_QUOTE_ENDPOINT=...
npm run build
```

With no endpoint the form tells visitors plainly that online requests are not
connected, sends nothing, keeps what they typed and offers phone and email. It
never shows a false success.

**Option A — the included worker (recommended).** `integrations/quote-worker`
is a Cloudflare Worker that re-validates every field with the same rules as the
browser, drops bots (honeypot + minimum fill time), rate-limits each IP, accepts
posts only from your domain, and emails the request with photos attached via
Resend. The Resend API key is a Worker secret and never reaches the browser.
See [its README](integrations/quote-worker/README.md) to deploy.

**Option B — a form service.** Formspree, Basin or similar: set
`NEXT_PUBLIC_QUOTE_ENDPOINT` to the form's URL. The form sends JSON, or
multipart when photos are attached — check your plan accepts file uploads.
Services that want a public key in the body (Web3Forms' `access_key`) take it
from `NEXT_PUBLIC_QUOTE_ACCESS_KEY`.

**Option C — a CRM.** Point the endpoint at a webhook (Zapier, Make, your
CRM's inbound form API) that accepts the same fields: `name`, `email`, `phone`,
`postalCode`, `address`, `service`, `description`, `urgency`,
`preferredDate`, `timeWindow`, `consent`, `page`, plus `attachments` files in
multipart requests.

Every option must answer 2xx only when the request has really been received;
the form shows success on 2xx and nothing else.

## Deploying

Upload `out/` to any static host (Netlify, Cloudflare Pages, Vercel, S3, a
plain web server). Set `NEXT_PUBLIC_SITE_URL` to the live domain before
building so canonical URLs and the sitemap are right.

## Launch checklist

Work through this with the company before setting `demo: false`.

**Business facts**
- [ ] Name, phone, email and hours in `business.ts` are the company's real details
- [ ] Phone number rings the right phone; email is monitored
- [ ] `address` is set only if customers can visit; otherwise `null`
- [ ] Each `verified` flag is true only with evidence on file (licence, policy, warranty terms, out-of-hours rota)
- [ ] Every item in `standards` is something the company actually does
- [ ] Every offered service is one the company performs; unoffered ones set `offered: false`
- [ ] Service FAQs and "While you wait" advice reviewed by the company's plumber
- [ ] Service areas and postal codes are genuinely covered
- [ ] Area `localNotes` (if any) are written from real local experience

**Content**
- [ ] Logo and favicon replaced
- [ ] Stock photos replaced with the company's own where possible; no stock photo captioned as a customer job
- [ ] Any case study in `gallery.ts` is a real job, with the customer's agreement
- [ ] Reviews are copied word for word from public sources, with links; names only with permission
- [ ] Social links point to real, active profiles
- [ ] Privacy policy and terms reviewed for the company's location (the template text is a starting point, not legal advice)

**Form**
- [ ] `NEXT_PUBLIC_QUOTE_ENDPOINT` set and the site rebuilt
- [ ] A test request arrives in the right inbox, with photos
- [ ] Reply-to on the email is the customer's address
- [ ] Worker `ALLOWED_ORIGINS` lists only the live domain

**SEO and launch**
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] `demo: false` — check `robots.txt` now allows crawling and pages are no longer `noindex`
- [ ] Each page's title and description read well (view source, or share a link to preview)
- [ ] Structured data passes the [Rich Results Test](https://search.google.com/test/rich-results) with no invented facts
- [ ] `sitemap.xml` submitted in Google Search Console
- [ ] Google Business Profile details match the site exactly (name, phone, hours, areas)
- [ ] Lighthouse run on the live site (performance, accessibility, best practices, SEO)

## Notes for developers

- Hero entrance animations are CSS keyframes, not Framer Motion, so the
  headline and image animate before JavaScript loads. Scroll reveals, the
  accordion, the mobile drawer and the gallery filter use Framer Motion. All
  motion is disabled under `prefers-reduced-motion`, and a `<noscript>` rule
  shows reveal content when JavaScript is off.
- FAQ answers stay in the HTML when collapsed (marked `inert`), so search
  engines see them and the FAQ structured data matches visible content.
- The mobile drawer is portalled to `<body>`: the header's `backdrop-filter`
  would otherwise trap its fixed positioning.
- Photos are requested from the CDN at the width each slot needs, because a
  static export cannot resize images (`images.unoptimized`).
