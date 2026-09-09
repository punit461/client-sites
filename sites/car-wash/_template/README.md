# Site folder shape

    sites/<slug>/
      site.json          rendered by tools/template.mjs   <- the normal path
      assets/*.jpg       referenced as "assets/<name>"
      index.html         OPTIONAL: a hand-built page, copied verbatim instead

`_template/` is skipped by the build (leading underscore). Copy it to start a
site by hand; `hustle handoff <slug>` writes the same shape automatically.

## Fields worth getting right

- **business.tagline** — the sentence the owner would say out loud. Not "Your
  trusted partner in excellence".
- **whatsapp.number** — digits only, country code included, no `+`. Without it
  the floating button and the main CTA both disappear.
- **meta.noindex** — leave `true` for demos. Set it to `false` only after the
  business has agreed to the site being theirs, otherwise you are publishing a
  duplicate of their business that competes with them in search.
- **meta.demo_banner** — the "sample site, not affiliated" strip. Keep it on
  until the deal closes; it is the thing that makes the cold outreach honest.

## Themes

`theme.font` is one of `inter`, `manrope`, `playfair`, `cormorant`.
`theme.primary` and `theme.accent` are hex; text colour on them is picked
automatically for contrast.
