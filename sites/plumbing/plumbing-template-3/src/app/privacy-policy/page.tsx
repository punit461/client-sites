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
      <p>When you send a quote request, we collect only what we need to respond:</p>
      <ul>
        <li>your name, email address and phone number;</li>
        <li>whether the work is for a home or a business, and the business name if you give one;</li>
        <li>the postal code and, if you give it, the address where the work is needed;</li>
        <li>the type of work, your description, how urgent it is, and your preferred date and time;</li>
        <li>any photos you choose to attach.</li>
      </ul>
      <p>When you call or email us, we keep the details you share so we can respond and carry out the work.</p>

      <h2>How we use it</h2>
      <p>
        Only to respond to your request, arrange and carry out work you approve, send estimates and invoices, and keep the
        records the law requires. We don&apos;t sell your information, and we don&apos;t add you to marketing lists.
      </p>

      <h2>Who else handles it</h2>
      <p>
        Quote requests reach us through an email or form-handling service that processes the data on our behalf. We share
        details with others only when needed for work you&apos;ve asked for (for example, a supplier delivering a part to your
        address) or when the law requires it.
      </p>

      <h2>Cookies</h2>
      <p>This website doesn&apos;t use advertising or analytics cookies. If that changes, we&apos;ll update this policy and ask for your consent where required.</p>

      <h2>How long we keep it</h2>
      <p>
        Requests that don&apos;t lead to work are deleted within 12 months. Records of completed work are kept as long as we
        need them for warranty, tax and legal purposes.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask what information we hold about you, ask us to correct it, or ask us to delete it where we&apos;re not
        required to keep it. Contact us at <a href={mailHref}>{business.email}</a> or <a href={telHref}>{business.phone.display}</a>.
      </p>
    </LegalPage>
  );
}
