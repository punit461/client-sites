import PageHero from "@/components/ui/PageHero";
import { contact, school } from "@/content/school";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${school.name} collects, uses and protects the personal information families share through this website.`,
  path: "/privacy-policy/",
});

/** Have the school (and its advisers) review this before launch. */
const updated = "22 October 2026";

/** How to reach the office about this policy: by email when the school has an address, otherwise by phone. */
function ContactLine() {
  return contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <a href={contact.phoneHref}>{contact.phone}</a>;
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title="How we look after your information."
        lead={`Last updated ${updated}. This policy covers this website only; the school's policies on student records are shared with families on admission.`}
        crumbs={[{ name: "Privacy Policy", href: "/privacy-policy/" }]}
      />
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div className="prose-school mx-auto max-w-2xl text-[1.04rem]">
            <h2>Who we are</h2>
            <p>
              This website is published by {school.name}, {contact.address.street}, {contact.address.locality}, {contact.address.city}. For questions
              about this policy, contact the school office on <ContactLine />.
            </p>

            <h2>What we collect</h2>
            <p>We collect only what you choose to send us through the enquiry and contact forms:</p>
            <ul>
              <li>your name, email address and phone number;</li>
              <li>for admission enquiries, the class you are interested in;</li>
              <li>anything you write in the message box.</li>
            </ul>
            <p>
              We do not ask for your child&apos;s date of birth, address, documents or any other sensitive information through this website. Those are
              collected, if needed, during the formal application.
            </p>

            <h2>How we use it</h2>
            <p>
              We use your details only to reply to your enquiry and, if you go on to apply, to manage your application. We do not sell or share your
              details with anyone for marketing.
            </p>

            <h2>Where it is stored</h2>
            <p>
              Form submissions are delivered to the school office through a form-handling service, which stores them on our behalf. Enquiries are kept
              for up to two years and then deleted, unless they become part of an application.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website does not set advertising cookies. Embedded maps are provided by Google and are subject to Google&apos;s own privacy policy.
              If we add visitor analytics in future, we will update this page first.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. Contact the school
              office on <ContactLine /> and we will respond within thirty days.
            </p>

            <h2>Changes</h2>
            <p>If we change this policy we will update the date at the top of this page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
