import { business, compactHours } from "@/config/business";
import { areas, coveredAreas, listNames } from "./areas";
import { services } from "./services";
import type { Faq } from "./types";

/** The general FAQ. Answers that depend on the business come from the config. */
export function faqs(): Faq[] {
  const emergency = business.verified.emergencyService;
  const edge = areas.filter((a) => a.coverage === "confirm").map((a) => a.name);
  return [
    {
      q: "What plumbing services do you provide?",
      a: `${listNames(services.map((s) => s.short))}, for homes and businesses. If your problem isn't listed, describe it in a quote request and we'll tell you whether we can help.`,
    },
    {
      q: "How do I request a quote?",
      a: `Use the quote request form, or call ${business.phone.display}. Tell us what's happening, where, and how urgent it is — photos help. We'll get back to you to talk it through. Sending a request doesn't book an appointment; we confirm any visit with you directly.`,
    },
    {
      q: "Do you provide emergency plumbing?",
      a: emergency
        ? `Yes. For burst pipes, active leaks and other urgent problems, call ${business.phone.display} at any time. Close your main shutoff valve first if it's safe to.`
        : `We don't offer an out-of-hours emergency service. During opening hours (${compactHours()}) urgent problems are prioritized — please call rather than using the form. Outside those hours, close your main shutoff valve and contact your water utility or emergency services if anyone is at risk.`,
    },
    {
      q: "Which areas do you serve?",
      a: `${listNames(coveredAreas.map((a) => a.name))}${edge.length ? `, and ${listNames(edge)} by arrangement` : ""}. You can check your postal code on our service areas page.`,
    },
    {
      q: "How should I prepare for a plumbing appointment?",
      a: "Clear the space around the problem — under the sink, around the water heater — and make sure we can reach your main shutoff valve. Keep pets in another room, and have any fixture you've bought for us to install on site.",
    },
    {
      q: "What information helps you estimate a plumbing job?",
      a: "Your postal code, what's happening and where in the building, when it started, and how urgent it feels. Photos of the problem — and of the surrounding pipework — make a first estimate much more accurate.",
    },
    {
      q: "Can I request routine maintenance?",
      a: "Yes. A planned check covers your valves, visible pipework, water heater, fixtures and drains, with a written summary listing anything that needs attention, most important first.",
    },
    {
      q: "What should I do when I notice a water leak?",
      a: "Close the nearest isolation valve, or the main shutoff valve if water is escaping fast. Keep clear of water near outlets and light fittings, move valuables away, and take photos. Then call us.",
    },
  ];
}
