/**
 * Quote request validation, shared by the browser form and the server-side
 * handler in integrations/quote-worker/ — so both sides enforce exactly the
 * same rules. Keep this file free of imports: the worker bundles it directly.
 */

export const URGENCY = [
  { value: "urgent", label: "Urgent", hint: "Active leak, no water, or a fixture out of use" },
  { value: "soon", label: "Within a few days", hint: "A problem that needs attention but is under control" },
  { value: "flexible", label: "Flexible", hint: "Planned work, upgrades or an inspection" },
] as const;

export const TIME_WINDOWS = ["No preference", "Morning", "Midday", "Afternoon"] as const;

export const ATTACHMENTS = {
  maxFiles: 3,
  maxBytes: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  accept: ".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif",
};

export const LIMITS = { name: 80, email: 120, phone: 24, postalCode: 12, address: 160, service: 100, description: 2000 };

export type QuoteFields = {
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  service: string;
  description: string;
  urgency: string;
  preferredDate: string;
  timeWindow: string;
  consent: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "attachments", string>>;

export type AttachmentInfo = { name: string; size: number; type: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,24}$/;
const POSTAL = /^[A-Za-z0-9][A-Za-z0-9 -]{1,10}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Today's date as YYYY-MM-DD in the visitor's (or server's) local time. */
export function todayIso(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function validateAttachments(files: AttachmentInfo[]): string | undefined {
  if (files.length > ATTACHMENTS.maxFiles) return `Please attach no more than ${ATTACHMENTS.maxFiles} photos.`;
  for (const f of files) {
    if (!ATTACHMENTS.types.includes(f.type.toLowerCase()))
      return `"${f.name}" isn't a supported image. Please use JPG, PNG, WebP or HEIC.`;
    if (f.size > ATTACHMENTS.maxBytes)
      return `"${f.name}" is larger than ${ATTACHMENTS.maxBytes / 1024 / 1024} MB. Please attach a smaller photo.`;
  }
  return undefined;
}

/**
 * Returns a message per invalid field; an empty object means valid.
 * `services` is the list of accepted service labels (the server may pass
 * undefined to accept any non-empty value).
 */
export function validateQuote(v: QuoteFields, services?: readonly string[]): QuoteErrors {
  const e: QuoteErrors = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your name.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  const email = v.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL.test(email) || email.length > LIMITS.email) e.email = "Please enter a valid email address, like name@example.com.";

  const phone = v.phone.trim();
  if (!phone) e.phone = "Please enter a phone number so we can discuss the job.";
  else if (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";

  const postal = v.postalCode.trim();
  if (!postal) e.postalCode = "Please enter the postal code where the work is needed.";
  else if (!POSTAL.test(postal)) e.postalCode = "Please enter a valid postal code.";

  if (v.address.trim().length > LIMITS.address) e.address = `Please keep the address under ${LIMITS.address} characters.`;

  if (!v.service) e.service = "Please choose the type of plumbing work.";
  else if (v.service.length > LIMITS.service || (services && !services.includes(v.service)))
    e.service = "Please choose an option from the list.";

  const description = v.description.trim();
  if (description.length < 20) e.description = "Please describe the problem in a sentence or two (at least 20 characters).";
  else if (description.length > LIMITS.description)
    e.description = `Please keep the description under ${LIMITS.description.toLocaleString("en-US")} characters.`;

  if (!URGENCY.some((u) => u.value === v.urgency)) e.urgency = "Please tell us how urgent this is.";

  if (v.preferredDate) {
    if (!ISO_DATE.test(v.preferredDate)) e.preferredDate = "Please choose a valid date.";
    // A day of slack: the visitor's "today" may be the server's yesterday.
    else if (v.preferredDate < todayIso(new Date(Date.now() - 86_400_000)))
      e.preferredDate = "Please choose today or a later date.";
  }
  if (v.timeWindow && !(TIME_WINDOWS as readonly string[]).includes(v.timeWindow))
    e.timeWindow = "Please choose a time window from the list.";

  if (!v.consent) e.consent = "Please confirm we may use these details to respond to your request.";
  return e;
}
