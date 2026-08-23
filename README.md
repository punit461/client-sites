# client-sites

Public repo. Static demo sites for local businesses, deployed to GitHub Pages by
Actions on every push to `main`.

**Nothing in here may contain a lead's email, phone note, or any prospecting
data.** That lives in the private ops repo. What ships here is what a business
owner would be comfortable seeing.

## Commands

```bash
npm run dev            # build + serve on http://localhost:4321
npm run build          # -> _site/
npm run check          # validate every site.json, write nothing
node tools/build.mjs <slug>   # build just one
```

No dependencies, no install step. Node 20+ and the standard library.

## Adding a site

Normally: `hustle handoff <slug>` from the ops repo writes the folder for you.
By hand, copy `sites/_template/`:

```
sites/<slug>/
  site.json        rendered by tools/template.mjs      <- the normal path
  assets/*.jpg     referenced from site.json as "assets/<name>"
  index.html       OPTIONAL: a hand-built page, copied verbatim instead
```

If both `site.json` and `index.html` exist, `index.html` wins — a hand edit is
never silently overwritten by a regenerated template.

`sites/_template/README.md` documents the fields.

## The build

`tools/build.mjs` renders each folder into `_site/<slug>/` and writes a
portfolio index at the root. It **fails the build** when:

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
