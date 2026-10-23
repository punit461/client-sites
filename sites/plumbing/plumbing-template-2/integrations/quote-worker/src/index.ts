/**
 * Quote request handler — a Cloudflare Worker.
 *
 * The website is a static export with no server of its own, so this is the
 * server side of the quote form: it re-validates every field with the same
 * rules the browser uses (src/lib/quote-rules.ts), rejects bots, rate-limits
 * per IP, and emails the request to the company through Resend. The Resend API
 * key lives here as a Worker secret and never reaches the browser.
 *
 * Deploy instructions: integrations/quote-worker/README.md.
 */
import {
  ATTACHMENTS,
  validateAttachments,
  validateQuote,
  type AttachmentInfo,
  type QuoteFields,
} from "../../../src/lib/quote-rules";

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  /** Secret: `wrangler secret put RESEND_API_KEY` */
  RESEND_API_KEY: string;
  /** Where requests are delivered, e.g. "office@yourcompany.com" */
  QUOTE_TO: string;
  /** A sender on a domain verified in Resend, e.g. "Website <quotes@yourcompany.com>" */
  QUOTE_FROM: string;
  /** Comma-separated origins allowed to post, e.g. "https://www.yourcompany.com" */
  ALLOWED_ORIGINS: string;
  /** Rate limiting binding (wrangler.toml [[ratelimits]]). */
  QUOTE_LIMITER?: RateLimit;
}

const MIN_FILL_MS = 3000;

const json = (body: unknown, status: number, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });

function corsHeaders(request: Request, env: Env): Record<string, string> | null {
  const origin = request.headers.get("origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean);
  if (!allowed.includes(origin)) return null;
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    if (!cors) return json({ error: "Origin not allowed" }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);

    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    if (env.QUOTE_LIMITER) {
      const { success } = await env.QUOTE_LIMITER.limit({ key: ip });
      if (!success) return json({ error: "Too many requests" }, 429, cors);
    }

    // Accept JSON (no photos) or multipart (with photos).
    let data: Record<string, unknown> = {};
    const files: File[] = [];
    const type = request.headers.get("content-type") ?? "";
    try {
      if (type.includes("multipart/form-data")) {
        const form = await request.formData();
        for (const [key, value] of form.entries()) {
          if (typeof value === "string") data[key] = value;
          else if (key === "attachments") files.push(value);
        }
      } else {
        data = (await request.json()) as Record<string, unknown>;
      }
    } catch {
      return json({ error: "Unreadable request" }, 400, cors);
    }

    // Bots: a filled honeypot or an instant submission. Answer 200 so they
    // learn nothing, and send nothing.
    if (str(data.website) || Number(str(data.elapsedMs) || 0) < MIN_FILL_MS) return json({ ok: true }, 200, cors);

    const fields: QuoteFields = {
      name: str(data.name),
      email: str(data.email),
      phone: str(data.phone),
      postalCode: str(data.postalCode),
      address: str(data.address),
      service: str(data.service),
      description: str(data.description),
      urgency: str(data.urgency),
      preferredDate: str(data.preferredDate),
      timeWindow: str(data.timeWindow),
      consent: str(data.consent) === "yes" || data.consent === true,
    };
    const errors = validateQuote(fields);
    const info: AttachmentInfo[] = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    const fileError = validateAttachments(info);
    if (fileError) errors.attachments = fileError;
    if (Object.values(errors).some(Boolean)) return json({ error: "Invalid request", fields: errors }, 422, cors);

    const attachments = await Promise.all(
      files.slice(0, ATTACHMENTS.maxFiles).map(async (f) => ({
        filename: f.name.replace(/[^\w.\- ]+/g, "_").slice(0, 100),
        content: toBase64(new Uint8Array(await f.arrayBuffer())),
      })),
    );

    const text = [
      `New quote request from the website`,
      ``,
      `Name:      ${fields.name}`,
      str(data.company) ? `Business:  ${str(data.company).slice(0, 120)}` : "",
      `Email:     ${fields.email}`,
      `Phone:     ${fields.phone}`,
      `Postal:    ${fields.postalCode}`,
      fields.address ? `Address:   ${fields.address}` : "",
      `Service:   ${fields.service}`,
      `Urgency:   ${fields.urgency}`,
      fields.preferredDate ? `Preferred: ${fields.preferredDate} (${fields.timeWindow})` : `Preferred: ${fields.timeWindow}`,
      ``,
      fields.description,
      ``,
      attachments.length ? `${attachments.length} photo(s) attached.` : "No photos attached.",
      `Sent from ${str(data.page) || "the website"}. The customer agreed to be contacted about this request.`,
    ]
      .filter((l) => l !== "")
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: env.QUOTE_FROM,
        to: env.QUOTE_TO.split(",").map((s) => s.trim()),
        reply_to: fields.email,
        subject: `Quote request: ${fields.service} (${fields.urgency}) — ${fields.name}`,
        text,
        attachments,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return json({ error: "Delivery failed" }, 502, cors);
    }
    return json({ ok: true }, 200, cors);
  },
};

export default worker;

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}
