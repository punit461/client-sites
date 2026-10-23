import { Icon } from "@/components/ui/Icon";
import { benefits, business } from "@/config/business";

/**
 * Practical benefits the company controls. Verified credentials (licensed,
 * insured) replace the last items when they are switched on in the config.
 */
export function Benefits() {
  const { verified, credentials } = business;
  const items: { icon: Parameters<typeof Icon>[0]["name"]; title: string; body: string }[] = [
    ...(verified.licensed ? [{ icon: "shield" as const, title: "Licensed plumbers", body: credentials.licenseNumber || "Licence held where we work" }] : []),
    ...(verified.insured ? [{ icon: "shield" as const, title: "Fully insured", body: "Liability cover for our work" }] : []),
    ...benefits,
  ].slice(0, 4);

  return (
    <section aria-label="Why it's easy to work with us" className="border-b border-line-cool bg-white">
      {/* The 1px gaps over a tinted background are the thin separators, at every breakpoint. */}
      <ul className="shell grid gap-px bg-line-cool !px-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b) => (
          <li key={b.title} className="flex items-center gap-4 bg-white px-4 py-5 sm:px-6 sm:py-7">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage text-teal">
              <Icon name={b.icon} className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display font-semibold text-teal">{b.title}</span>
              <span className="block text-sm text-muted">{b.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
