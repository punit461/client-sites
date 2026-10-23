# Quote request worker

The website is a static export, so it has no server to receive form posts.
This Cloudflare Worker is that server. It:

- re-validates every field with the **same rules** as the browser form
  (`../../src/lib/quote-rules.ts` is bundled in, not copied);
- drops bot submissions (filled honeypot, or sent within 3 seconds of the
  form appearing) without telling the bot;
- rate-limits each IP address to 5 requests a minute (answers `429`, which
  the form explains to the visitor);
- accepts posts only from the origins you list;
- emails the request — photos attached — through [Resend](https://resend.com),
  with the customer's address as reply-to. The Resend key is a Worker secret
  and never reaches the browser.

## Deploy

You need a Cloudflare account and a Resend account with your sending domain
verified.

```bash
cd integrations/quote-worker
# 1. Edit wrangler.toml: ALLOWED_ORIGINS, QUOTE_TO, QUOTE_FROM
# 2. Store the API key as a secret (prompts for the value)
npx wrangler secret put RESEND_API_KEY
# 3. Deploy
npx wrangler deploy
```

Wrangler prints the worker's URL, e.g. `https://aquacraft-quote.<you>.workers.dev`.
Put it in the site's `.env.local` (or your host's build settings) and rebuild:

```bash
NEXT_PUBLIC_QUOTE_ENDPOINT=https://aquacraft-quote.<you>.workers.dev
```

## Check it

```bash
npx tsc -p .          # type-checks the worker and the shared rules
npx wrangler dev      # runs it locally on http://localhost:8787
```

To test locally, add `http://localhost:3000` to `ALLOWED_ORIGINS` and point
`NEXT_PUBLIC_QUOTE_ENDPOINT` at `http://localhost:8787`. Remove it again
before deploying.

## Using something else

Any endpoint that accepts JSON (or multipart when photos are attached) and
answers 2xx on success works with the form — Formspree, Basin, a CRM webhook.
See the main README.
