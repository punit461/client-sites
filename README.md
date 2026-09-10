# client-sites

A dashboard and one folder per client site. **Every folder is a standalone
Next.js app**, statically exported — which is what makes both halves of the plan
work: they can all be published together as one site, and any single one can be
lifted out and delivered to a client on its own.

```
client-sites/
  dashboard/                        the main project — lists everything
  sites/
    car-wash/                       a category
      category.json                 its display name
      car-wash-template1/           a project (Next.js app)
      car-wash-template2/
    laundry/                        add a category by creating the folder
  tools/                            build, preview, scaffold, release
  client-sites.config.json          title, tagline, base path
```

Exactly two levels under `sites/`: **category, then project**. Nothing else is
built, and nothing needs registering — a folder that is a Next.js app is a
project, and a folder containing one is a category.

## Commands

Run these from the repo root.

```bash
npm run build                                   # everything into _site/
```

```bash
npm run preview                                 # serve _site/ exactly as it will be published
```

```bash
npm run list                                    # what exists, and what would fail a build
```

```bash
npm run new -- car-wash/shine-auto-spa --from car-wash/car-wash-template1
```

```bash
npm run release -- car-wash/shine-auto-spa      # standalone build to hand over
```

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the dashboard and every project into `_site/`. Reuses a project's export if nothing changed. |
| `npm run build car-wash/x` | Builds one project, leaving the rest of `_site/` alone. |
| `npm run build -- --force` | Rebuilds even when the exports look current. |
| `npm run preview` | Serves `_site/` at the same base path it will be published under. Static only — no compiling. |
| `npm run dev` | The dashboard with hot reload. For working on the dashboard itself. |
| `npm run list` | Every category and project, with status and any structural problems. |
| `npm run check` | The same checks, as a pass/fail — this is what CI runs. |
| `npm run new` | Starts a project by copying an existing one. |
| `npm run release` | Copies one project out and builds it for the client's own hosting. |

There is no `npm install` at the root: the tooling is plain Node with no
dependencies. Each project installs its own.

## The workflow

**1 — Start a project by copying a template.**

```bash
npm run new -- car-wash/shine-auto-spa --from car-wash/car-wash-template1
```

A copy, not a reference. Editing it can never change a site that is already
live. The new project gets a `project.json` holding its title, client and
status.

**2 — Build the page.** Work in the project itself, with hot reload:

```bash
cd sites/car-wash/shine-auto-spa && npm install && npm run dev
```

**3 — Show the client.** Build the bundle and serve it:

```bash
npm run build && npm run preview
```

The preview serves the built files, so what the client sees is exactly what
will be live. Push to `main` and the same bundle is published to GitHub Pages,
which is usually the easier thing to send them a link to.

**4 — Deliver it once they agree.**

```bash
npm run release -- car-wash/shine-auto-spa
```

That copies the folder to `releases/shine-auto-spa/`, installs it, and builds
it **with no path prefix** — so `releases/shine-auto-spa/out/` can be uploaded
to the root of any host. A `HANDOVER.md` is written beside it with the steps for
Netlify, cPanel, S3 and GitHub Pages. The copy is frozen: later work in
`sites/` cannot change what the client was given.

If the client wants it in a sub-folder of their domain instead:

```bash
npm run release -- car-wash/shine-auto-spa --base-path /washes
```

## The one rule that makes this work

**Never hardcode `basePath` in a project's `next.config.ts`.** Read it from the
environment:

```ts
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
```

The same source folder then produces two different, correct builds:

| Built by | `NEXT_PUBLIC_BASE_PATH` | Result |
| --- | --- | --- |
| `npm run build` in the project | *(unset)* | Every URL root-relative — a client's own domain. |
| `npm run build` at the root | `/client-sites/car-wash/x` | Lands beside the other projects on Pages. |
| `npm run release` | *(unset, or `--base-path`)* | The handover build. |

`npm run check` fails the build if a project hardcodes `basePath`, because that
mistake is invisible until a client's site loads with no CSS.

A project's export is stamped with the base path it was built for
(`.build-stamp.json`, gitignored), so an export made for one path is never
silently republished under another.

## Where things end up

With `basePrefix: "/client-sites"` in `client-sites.config.json`:

```
_site/                                    ->  /client-sites/
_site/about/                              ->  /client-sites/about/
_site/car-wash/car-wash-template1/        ->  /client-sites/car-wash/car-wash-template1/
_site/car-wash/car-wash-template2/        ->  /client-sites/car-wash/car-wash-template2/
```

`/client-sites` is the repo name, because GitHub Pages serves a project repo
under it. Set `basePrefix` to `""` for a custom domain or a `<user>.github.io`
repo. CI overrides it from the repo name, so renaming the repo needs no edit.

## The dashboard

`dashboard/` is a normal Next.js app — App Router, `src/app/`. It has a project
list and an `/about` page; adding `/privacy` means adding
`dashboard/src/app/privacy/page.tsx`.

It cannot read the filesystem, because it is a static export, so the project
list is baked in at build time as `dashboard/src/generated/projects.json`
(written by `tools/manifest.mjs`, and committed so a fresh clone works). Search
and filtering then run in the browser.

One constraint: a category folder must not share its name with a dashboard
route. A category called `about` would collide with `/about`. The build stops
and says so rather than overwriting anything.

## Project metadata

Optional, and only used by the dashboard.

`sites/<category>/<project>/project.json`

```json
{
  "title": "Shine Auto Spa",
  "client": "Shine Auto Spa, Pune",
  "status": "in-review",
  "tags": ["booking form", "dark"],
  "notes": "Waiting on their gallery photos."
}
```

`status` is one of `template`, `draft`, `in-review`, `approved`, `delivered`.
The card subtitle comes from the project's `package.json` `description`.

`sites/<category>/category.json`

```json
{ "name": "Car Wash", "description": "Landing pages for car wash businesses." }
```

## GitHub Pages

Settings → Pages → Build and deployment → **Source: GitHub Actions**, then push
to `main`. `.github/workflows/deploy.yml` builds every project and publishes
`_site/`. Pull requests build without deploying, so a broken project fails the
PR instead of the live site.

The first CI run installs every project's dependencies and compiles every one of
them, so expect a few minutes.

## Adding a category

Create `sites/<category>/` and put a project in it — or just name it, and the
scaffolder creates both:

```bash
npm run new -- dental/bright-smile --from car-wash/car-wash-template1
```

Category names become URL segments, so keep them lowercase with dashes.
