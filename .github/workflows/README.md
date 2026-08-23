# One-time GitHub Pages setup

1. Push this repo to GitHub as a **public** repo (Pages is free only on public repos
   for free accounts — that is why the lead data lives in the separate private repo).
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The first run publishes to
   `https://<owner>.github.io/<repo>/`, and each site to `.../<slug>/`.

Pull requests run the build as a check but do not deploy — so a broken `site.json`
fails the PR instead of reaching a client.
