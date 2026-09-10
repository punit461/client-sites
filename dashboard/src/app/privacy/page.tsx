import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects, which is almost nothing.",
};

/**
 * Written to describe what these pages actually do: static files, no
 * analytics, no cookies, no forms. It is accurate for the site as built — if
 * analytics, a contact form or an embed is ever added, this page has to change
 * with it. Not reviewed by a lawyer; check it before relying on it anywhere it
 * matters.
 */
export default function Privacy() {
  const { email } = site.contact;

  return (
    <div className="wrap prose">
      <h1>Privacy</h1>
      <p className="lede">
        This site is a set of static pages. It has no accounts, no forms and no
        tracking, so there is very little to say — but here it is in full.
      </p>

      <h2>What this site does not do</h2>
      <ul className="facts">
        <li>No analytics, and no third-party tracking scripts of any kind.</li>
        <li>
          No cookies are set. Nothing is stored in your browser beyond the
          ordinary cache.
        </li>
        <li>No advertising, and no data sold or shared with anyone.</li>
        <li>
          No sign-up, no login, no contact form — nothing here asks you to type
          anything.
        </li>
      </ul>

      <h2>What the host sees</h2>
      <p>
        These pages are served by a static hosting provider. Like every web
        server, it receives the ordinary technical details of a request — your IP
        address, the page asked for, the time, your browser&apos;s user agent —
        and may keep them briefly in its own server logs for security and
        reliability. That data is the host&apos;s, handled under its own privacy
        policy, and is not read, exported or analysed here.
      </p>

      <h2>Fonts and images</h2>
      <p>
        Typefaces are served from this site itself, not from a font service, so
        loading a page makes no request to a third party for them. Individual
        client sites listed on this dashboard are separate pages and may load
        their own images from elsewhere; each one is built for the business it
        belongs to.
      </p>

      <h2>If you email</h2>
      <p>
        {email ? (
          <>
            Anything you send to <a href={`mailto:${email}`}>{email}</a> is kept
            only to reply and to do the work discussed, and is not added to any
            mailing list.
          </>
        ) : (
          <>
            Anything you send by email is kept only to reply and to do the work
            discussed, and is not added to any mailing list.
          </>
        )}
      </p>

      <h2>Sample sites</h2>
      <p>
        Some pages here are samples built to show what a website for a particular
        kind of business could look like. A sample is not affiliated with any
        business unless that business has agreed to it, and is kept out of search
        results until then. If a sample refers to your business and you want it
        gone, <Link href="/contact">ask</Link> and it will be removed.
      </p>

      <h2>Changes</h2>
      <p>
        If this site ever starts doing something that involves your data —
        analytics, a contact form, an embedded map — this page will say so before
        it does.
      </p>
    </div>
  );
}
