import { Icon, type IconName } from "@/components/ui/Icon";
import { business, standards } from "@/config/business";

/**
 * Credentials appear only when verified in the config; the rest of the strip
 * is the company's working standards, which are promises it controls.
 */
export function trustItems(): { icon: IconName; label: string }[] {
  const { verified, credentials } = business;
  const items: { icon: IconName; label: string }[] = [];
  if (verified.licensed)
    items.push({ icon: "shield", label: credentials.licenseNumber ? `Licensed · ${credentials.licenseNumber}` : "Licensed plumbers" });
  if (verified.insured) items.push({ icon: "shield", label: "Fully insured" });
  if (verified.workmanshipWarranty) items.push({ icon: "check", label: "Written workmanship warranty" });

  const standardIcons: IconName[] = ["file", "calendar", "house", "message", "check", "sparkles"];
  standards.forEach((s, i) => items.push({ icon: standardIcons[i % standardIcons.length], label: s.short }));
  // Verified credentials first, topped up with standards to fill four slots.
  return items.slice(0, 4);
}

export function TrustStrip() {
  const items = trustItems();
  return (
    <section aria-label="How we work" className="border-y border-line bg-white">
      <ul className="shell grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-4 py-5 sm:py-7 lg:justify-center lg:px-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ivory text-copper-ink">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span className="font-display text-[1rem] font-semibold text-navy">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
