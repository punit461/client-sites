# client-sites

Public repo. Static demo sites for local businesses, deployed to GitHub Pages by
Actions on every push to `main`.

**Nothing in here may contain a lead's email, phone note, or any prospecting
data.** That lives in the private ops repo. What ships here is what a business
owner would be comfortable seeing.

## Commands

```bash
npm run dev            # dashboard + every project on http://localhost:4321
npm run build          # -> _site/
npm run check          # validate every site.json, write nothing
node tools/build.mjs <slug>           # build just one
node tools/build.mjs <slug> --force   # rebuild it even if the export looks current
```

No dependencies, no install step for the tooling itself — Node 20+ and the
standard library. (The Next.js projects install their own dependencies the
first time they are built.)

## The dashboard

`npm run dev` opens a dashboard at `http://localhost:4321` listing every
project. Clicking one **builds it on demand and opens it in its own tab**, with
the build log streaming into the console drawer while you wait.

Every project is served from that one origin as `/<slug>/`. Nothing here runs
`next dev` or claims a port per project, so opening four projects costs one
port, and there is no set of dev servers to keep alive or to clash with
whatever else you have running.

Two consequences worth knowing:

- A Next.js project is only rebuilt when you ask for it (a card click, the
  rebuild button, or `npm run build`) — compiling on every page request would
  make the preview unusable. The card says *Source changed* when its export is
  older than the sources.
- A `site.json` project is cheap to render, so it still rebuilds on refresh:
  edit the JSON, reload the page, see the change.

The dashboard also works on GitHub Pages, where there is no server to build
anything: `tools/projects.mjs` bakes the project list into the page at build
time, and the cards simply link to what was published.

## Adding a site

Normally: `hustle handoff <slug>` from the ops repo writes the folder for you.
By hand, copy `sites/car-wash/_template/`:

```
sites/car-wash/<slug>/
  site.json        rendered by tools/template.mjs      <- the normal path
  assets/*.jpg     referenced from site.json as "assets/<name>"
  index.html       OPTIONAL: a hand-built page, copied verbatim instead
  next.config.ts   OPTIONAL: a full Next.js app, statically exported
```

Those three are checked in reverse order: a Next config wins over an
`index.html`, which wins over a `site.json` — a hand edit is never silently
overwritten by a regenerated template.

A Next.js project needs `output: 'export'` and `basePath: '/<slug>'` in its
next config so its export lands correctly under the shared origin. Its
`package.json` `description` becomes the card's subtitle on the dashboard.

`sites/car-wash/_template/README.md` documents the `site.json` fields.

## The build

`tools/build.mjs` renders each folder into `_site/<slug>/` and writes the
dashboard at the root. `tools/projects.mjs` is the single place that decides
what counts as a project, shared by the builder, the dev server's API and the
dashboard page. It **fails the build** when:

- `business.name` is missing
- `site.json` isn't valid JSON
- any `TODO:` placeholder survived from the brief

That last one is the important one: CI runs on pull requests, so a half-filled
brief fails the PR instead of reaching a client's inbox. Missing WhatsApp
number, phone, tagline or images are warnings, not errors — you'll see them in
the build log.

## What every rendered page has

Single HTML file, ~15 KB, no JS framework, no CDN except Google Fonts. Sticky
nav, hero with the business's own photo, services grid, gallery, Google reviews,
opening hours, contact block, `LocalBusiness` JSON-LD, light and dark themes.

And three WhatsApp entry points, because for local businesses that's the channel
customers actually use: the hero CTA, the contact block, and a floating button
that follows you down the page. `whatsapp.number` is digits only with the country
code and no `+`; get it wrong and all three disappear.

## Demo safety

Demo pages default to `meta.noindex: true` (robots meta + a `robots.txt`
disallow) and `meta.demo_banner: true` (a "sample site, not affiliated" strip
linking back to the portfolio index).

Turn both off **only after the business has agreed the site is theirs**. Before
that, an unrequested copy of a real business ranking against them in search is a
genuine problem, and the banner is what makes the outreach honest.

## GitHub Pages setup

See [.github/workflows/README.md](.github/workflows/README.md). Short version:
public repo, Settings → Pages → Source: GitHub Actions, push to `main`. Sites
land at `https://<owner>.github.io/client-sites/<slug>/`.
