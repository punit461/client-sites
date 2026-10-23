import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { business, mailHref, telHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that apply to using the ${business.name} website and requesting a quote.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" updated="October 2026">
      <p>
        These terms cover your use of this website. The terms for any plumbing work are set out in the written estimate we
        give you before that work begins.
      </p>

      <h2>Quote requests are not bookings</h2>
      <p>
        Sending a quote request does not create an appointment or a contract. We will contact you to discuss your request,
        and a visit is booked only when we confirm a time with you directly. Work begins only after you approve a written
        estimate.
      </p>

      <h2>Information on this website</h2>
      <p>
        We aim to keep the information here accurate, but it is general guidance, not advice about your particular
        plumbing. Safety tips — such as turning off your water — are about limiting damage until a qualified person can
        help; please do not attempt repairs to pressurized pipework, gas appliances or electrics yourself.
      </p>

      <h2>Photographs</h2>
      <p>
        Most photographs on this website are of our own work. A few service pages use licensed images that show
        representative work rather than jobs we have completed.
      </p>

      <h2>Using the website</h2>
      <p>
        Please do not misuse the quote form — for example by sending automated or abusive submissions. We may block
        requests that appear to be spam.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle the information you send us is explained in our <Link href="/privacy-policy/">privacy policy</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        {mailHref ? (
          <>
            Contact us at <a href={mailHref}>{business.email}</a>.
          </>
        ) : (
          <>
            Call us on <a href={telHref}>{business.phone.display}</a>.
          </>
        )}
      </p>
    </LegalPage>
  );
}
