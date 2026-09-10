import type { Metadata } from "next";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to get in touch about a website.",
};

/**
 * Details come from client-sites.config.json — deliberately not hardcoded, so
 * nobody has to edit a page to change an email address, and so this page never
 * shows one that was invented rather than chosen.
 */
export default function Contact() {
  const { email, phone, location } = site.contact;
  const configured = Boolean(email || phone || location);

  return (
    <div className="wrap prose">
      <h1>Contact</h1>
      <p className="lede">
        Want a website for your business, or a change to one already built?
      </p>

      {configured ? (
        <dl>
          {email ? (
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
          ) : null}
          {phone ? (
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
              </dd>
            </div>
          ) : null}
          {location ? (
            <div>
              <dt>Where</dt>
              <dd>{location}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <div className="notice">
          <strong>No contact details published yet.</strong>
          <span>
            Add them once and every page picks them up — this one, and the
            privacy and terms pages:
          </span>
          <pre>
            <code>{`// client-sites.config.json
"contact": {
  "email": "you@example.com",
  "phone": "+91 00000 00000",
  "location": "City, Country"
}`}</code>
          </pre>
        </div>
      )}

      <h2>What helps in a first message</h2>
      <ul className="facts">
        <li>What the business does, and where it is.</li>
        <li>Whether there is a website already, and what is wrong with it.</li>
        <li>What you want a visitor to do — call, message, book, or come in.</li>
        <li>Photos, if you have them. Real ones of the real place.</li>
      </ul>

      <h2>Taking a page down</h2>
      <p>
        If a sample site here refers to your business and you would rather it did
        not exist, say so and it will be removed. No explanation needed.
      </p>
    </div>
  );
}
