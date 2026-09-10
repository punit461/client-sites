import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Terms",
  description: "Who owns what, and what these pages are and are not.",
};

/**
 * A plain-language statement of how the work is handled. It claims no
 * jurisdiction and no company details, because inventing either would be
 * worse than leaving them out. Not reviewed by a lawyer; read it before
 * relying on it, and add the specifics that apply to you.
 */
export default function Terms() {
  return (
    <div className="wrap prose">
      <h1>Terms</h1>
      <p className="lede">
        What the pages on this site are, and who owns what once a website is
        handed over.
      </p>

      <h2>What this site is</h2>
      <p>
        An index of websites built by {site.owner}. Some are finished sites for
        real businesses; others are templates and works in progress. Nothing here
        is an offer, a quote or a contract, and the pages change as work
        continues.
      </p>

      <h2>Samples and demonstrations</h2>
      <p>
        Pages marked as templates, or still in progress, exist to show what a
        website could look like. They may contain placeholder text, stock
        photography and invented prices, opening hours and reviews. Nothing on
        such a page should be treated as a statement about a real business, and
        no template implies any relationship with a business whose category it
        happens to match.
      </p>

      <h2>Who owns what</h2>
      <dl>
        <div>
          <dt>Your content</dt>
          <dd>
            The text, photographs, logo and business details you provide stay
            yours throughout, and they leave with you.
          </dd>
        </div>
        <div>
          <dt>Your finished site</dt>
          <dd>
            On handover, the built website and its source are yours to host,
            change and keep, on whatever hosting you choose. There is no lock-in
            and nothing to keep paying for here.
          </dd>
        </div>
        <div>
          <dt>The templates</dt>
          <dd>
            The underlying templates and tooling remain {site.owner}&apos;s, and
            are reused for other businesses. Your copy is yours; the template it
            started from is not exclusive to you.
          </dd>
        </div>
        <div>
          <dt>Third-party material</dt>
          <dd>
            Fonts, icons and stock images stay under their own licences, which
            travel with the site.
          </dd>
        </div>
      </dl>

      <h2>What is not promised</h2>
      <ul className="facts">
        <li>
          No particular search ranking, traffic, or number of enquiries. Those
          depend on far more than a website.
        </li>
        <li>
          Hosting, domains and email are the business&apos;s own arrangements
          with its own providers; their uptime is not under our control.
        </li>
        <li>
          A handed-over site is a snapshot. It keeps working as built, but it
          does not update itself, and later changes are separate work.
        </li>
      </ul>

      <h2>Accuracy of a live site</h2>
      <p>
        Once a site is handed over, keeping its prices, services and opening
        hours correct is the business&apos;s responsibility.
      </p>

      <h2>Takedown</h2>
      <p>
        Any page here is removed on request from the business it refers to. No
        reason required — <Link href="/contact">contact</Link> is enough.
      </p>
    </div>
  );
}
