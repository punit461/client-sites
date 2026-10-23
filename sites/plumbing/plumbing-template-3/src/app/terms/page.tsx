import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { business, mailHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply to using the ${business.name} website and requesting a quote.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms/" updated="October 2026">
      <p>
        These terms cover your use of this website. The terms for any plumbing work are set out in the estimate we give you
        before that work begins.
      </p>

      <h2>A quote request is not a booking</h2>
      <p>
        Sending a quote request doesn&apos;t create an appointment or a contract. We&apos;ll contact you to discuss it, and a
        visit is booked only when we confirm a time with you directly. Work begins only after you approve the estimate.
      </p>

      <h2>Information on this website</h2>
      <p>
        We aim to keep this website accurate, but it offers general guidance, not advice about your particular plumbing.
        Safety tips — such as closing your shutoff valve — are about limiting damage until a qualified person can help.
        Please don&apos;t attempt repairs to pressurized pipework, gas appliances or electrics yourself.
      </p>

      <h2>Photographs</h2>
      <p>Photographs on this website are licensed images showing representative plumbing work, not specific jobs we have completed.</p>

      <h2>Using the website</h2>
      <p>Please don&apos;t misuse the quote form — for example with automated or abusive submissions. We may block requests that appear to be spam.</p>

      <h2>Privacy</h2>
      <p>
        How we handle the information you send us is explained in our <Link href="/privacy-policy/">privacy policy</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        Contact us at <a href={mailHref}>{business.email}</a>.
      </p>
    </LegalPage>
  );
}
