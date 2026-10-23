import { LegalPage } from "@/components/templates/LegalPage";
import { business, mailHref, telHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${business.name} collects, uses and protects the information you share with us.`,
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="October 2026">
      <p>
        This policy explains what information {business.name} collects when you use this website or contact us, why we
        collect it, and what you can ask us to do with it.
      </p>

      <h2>What we collect</h2>
      <p>When you send a quote request, we collect the details you enter:</p>
      <ul>
        <li>your name, email address and phone number;</li>
        <li>the postal code and, if you give it, the address where work is needed;</li>
        <li>the type of work, your description of the problem, its urgency and your preferred date and time;</li>
        <li>any photos you choose to attach.</li>
      </ul>
      <p>When you call or email us, we keep the details you share so we can respond and carry out the work.</p>

      <h2>How we use it</h2>
      <p>
        We use your information only to respond to your request, arrange and carry out work you approve, send you
        estimates and invoices, and keep the records the law requires. We do not sell it, and we do not add you to
        marketing lists.
      </p>

      <h2>Who else handles it</h2>
      <p>
        Quote requests are delivered to us through a form-handling or email service that processes the data on our behalf.
        Photos you attach travel with your request. We share details with others only when needed to do the work you have
        asked for (for example, a supplier delivering a part to your address) or when the law requires it.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        This website does not use advertising or analytics cookies. If that changes, we will update this policy and ask
        for your consent where required.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Requests that do not lead to work are deleted within 12 months. Records of completed work are kept for as long as
        we need them for warranty, tax and legal purposes.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct it, or ask us to delete it where we are not
        required to keep it. Contact us at <a href={mailHref}>{business.email}</a> or{" "}
        <a href={telHref}>{business.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
