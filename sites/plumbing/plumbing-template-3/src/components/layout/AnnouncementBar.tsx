import { business, compactHours, telHref } from "@/config/business";

/** Real opening hours — never a 24/7 claim unless emergency cover is verified. Hidden on phones. */
export function AnnouncementBar() {
  return (
    <div className="hidden bg-teal-deep text-sand md:block">
      <div className="shell flex h-9 items-center justify-between gap-6 text-[0.8rem]">
        <p>
          <span className="font-semibold text-white">Open</span> {compactHours()}
          {business.verified.emergencyService ? " · Emergency line answered outside these hours" : ""}
        </p>
        <p>
          Questions? Call{" "}
          <a href={telHref} className="underline-draw font-semibold text-white">
            {business.phone.display}
          </a>
        </p>
      </div>
    </div>
  );
}
