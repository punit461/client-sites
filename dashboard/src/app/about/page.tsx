import type { Metadata } from "next";
import Link from "next/link";
import { STATUS_HELP, STATUS_LABEL, STATUS_ORDER, site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description: "How these websites are organised, previewed and handed over.",
};

export default function About() {
  return (
    <div className="wrap prose">
      <h1>About</h1>
      <p className="lede">
        {site.owner} builds websites for local businesses — one category at a
        time, one folder per client.
      </p>

      <h2>How the work is organised</h2>
      <p>
        Every site here is a self-contained project. It has its own code, its own
        dependencies and its own build, and it shares nothing with the others.
        That sounds like extra work, and it is — but it means a change made for
        one business can never alter another business&apos;s live website.
      </p>
      <p>
        Projects are grouped into categories: car wash, laundry, dental, and
        whatever comes next. Each category holds the sites built for that kind of
        business, including the templates that new ones start from.
      </p>

      <h2>How a site gets built</h2>
      <ol>
        <li>
          <strong>Start from a template.</strong> A finished layout for that kind
          of business, copied so it can be changed freely.
        </li>
        <li>
          <strong>Make it theirs.</strong> Real services, real prices, real
          photos, real opening hours.
        </li>
        <li>
          <strong>Show the owner.</strong> They get a link and can look at the
          real thing on a phone, not a picture of it.
        </li>
        <li>
          <strong>Change what they ask for.</strong> Usually a few rounds.
        </li>
        <li>
          <strong>Hand it over.</strong> Once they are happy, the site is built
          as plain files and put on whichever hosting they prefer.
        </li>
      </ol>

      <h2>What the labels mean</h2>
      <dl>
        {STATUS_ORDER.map((status) => (
          <div key={status}>
            <dt>{STATUS_LABEL[status]}</dt>
            <dd>{STATUS_HELP[status]}</dd>
          </div>
        ))}
      </dl>

      <h2>What a finished site is</h2>
      <ul className="facts">
        <li>
          Plain HTML, CSS and JavaScript — no database, no server to keep
          running, nothing to renew but the domain and the hosting.
        </li>
        <li>
          Fast on a phone, because that is where nearly every local search
          happens.
        </li>
        <li>
          Hostable anywhere: the business&apos;s own hosting, or a free static
          host. The files belong to them.
        </li>
        <li>
          Editable later — the source comes with the handover, along with the two
          commands needed to rebuild it.
        </li>
      </ul>

      <h2>The sites listed here</h2>
      <p>
        Anything marked <em>Template</em> is a starting point, not a real
        business. Sites still in progress use placeholder content, and their
        pages are kept out of search results until the business agrees the site
        is theirs.
      </p>

      <p>
        <Link href="/projects">Browse every project</Link> or{" "}
        <Link href="/contact">get in touch</Link>.
      </p>
    </div>
  );
}
