/**
 * Every environment variable the site reads, validated once.
 *
 * The site is a static export, so these are all build-time values. Each is
 * referenced as a literal `process.env.NEXT_PUBLIC_*` so Next can inline it
 * into the browser bundle. None of them is secret: the form endpoint is a
 * public URL by design, and real secrets (email API keys) belong to the
 * service behind it — see integrations/quote-worker/.
 *
 * A malformed value fails the build with a readable message instead of
 * producing a site whose form posts to nowhere.
 */

function optionalUrl(name: string, value: string | undefined) {
  const v = value?.trim();
  if (!v) return "";
  try {
    const url = new URL(v);
    if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      throw new Error("must use https");
    }
    return v.replace(/\/$/, "");
  } catch (err) {
    throw new Error(`${name} is not a valid URL (${v}): ${(err as Error).message}`);
  }
}

export const env = {
  siteUrl: optionalUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
  /** Where the quote form POSTs. Empty means "not connected yet". */
  quoteEndpoint: optionalUrl("NEXT_PUBLIC_QUOTE_ENDPOINT", process.env.NEXT_PUBLIC_QUOTE_ENDPOINT),
  /** For providers that take a public key in the body (Web3Forms: access_key). */
  quoteAccessKey: (process.env.NEXT_PUBLIC_QUOTE_ACCESS_KEY || "").trim(),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};
