import { business, compactHours, isOpen24Hours, telHref } from "@/config/business";

/**
 * A slim bar with the real opening hours — never a 24/7 claim unless the
 * company has confirmed emergency cover in the config.
 */
export function AnnouncementBar() {
  return (
    <div className="on-dark hidden bg-navy text-ivory/85 md:block">
      <div className="shell flex min-h-10 items-center justify-center gap-x-6 py-2 text-center text-[0.8rem] sm:justify-between">
        <p>
          <span className="font-semibold text-ivory">Open</span> {compactHours()}
          {business.verified.emergencyService ? (
            <span className="text-copper-soft">
              {isOpen24Hours() ? " · Emergency calls answered day and night" : " · Emergency line answered outside these hours"}
            </span>
          ) : null}
        </p>
        <p className="hidden sm:block">
          Quotes by phone or online:{" "}
          <a href={telHref} className="link-underline font-semibold text-ivory">
            {business.phone.display}
          </a>
        </p>
      </div>
    </div>
  );
}
