import { business, compactHours, standards } from "@/config/business";
import { areaNames, listNames } from "./areas";
import { services } from "./services";
import type { Faq } from "./types";

/**
 * The general FAQ. Answers that depend on the business — emergency cover,
 * areas, services — are built from the configuration, so changing a flag in
 * src/config/business.ts changes the answer everywhere it appears.
 */
export function generalFaqs(): Faq[] {
  const emergency = business.verified.emergencyService;
  const writtenEstimate = standards.some((s) => /estimate/i.test(s.title));

  return [
    {
      q: "What plumbing services do you provide?",
      a: `We handle ${listNames(services.map((s) => s.short.toLowerCase()))} for homes and businesses. If your problem isn't on that list, get in touch and we will tell you straight away whether we can help.`,
    },
    {
      q: "How do I request an estimate?",
      a: `Use the quote request form or call us on ${business.phone.display}. Tell us what is happening, where, and how urgent it feels — photos help. We will get back to you to talk it through and, where needed, arrange a visit to assess the work. A request is not a booking: we confirm any appointment with you directly.`,
    },
    {
      q: "Do you offer emergency plumbing?",
      a: emergency
        ? `Yes. For burst pipes, active leaks and other urgent problems, call ${business.phone.display} at any time. Turn off your main shutoff valve first if you can do so safely.`
        : `We do not run an out-of-hours emergency service. During our opening hours (${compactHours()}) urgent problems are prioritized — call us on ${business.phone.display}. Outside those hours, turn off your main shutoff valve, and for anything involving gas or electrical danger, contact your utility or emergency services.`,
    },
    {
      q: "Which areas do you cover?",
      a: `We currently work in ${listNames(areaNames)}. If you are just outside these areas, ask — we will tell you honestly whether we can reach you.`,
    },
    {
      q: "Can I schedule a plumbing inspection?",
      a: "Yes. A planned inspection checks your shutoff valves, visible pipework, water heater, fixtures and drains, and you receive a written summary with recommendations in order of priority. There is no obligation to have any repairs done.",
    },
    {
      q: "What should I do if a pipe starts leaking?",
      a: "Turn off the water at the main shutoff valve — often under the kitchen sink or where the supply pipe enters the building. If water is near electrical outlets or fixtures, keep clear, and switch off power at the breaker panel only if you can reach it safely with dry hands. Move valuables away from the water, then call us.",
    },
    {
      q: "How is a plumbing repair estimate prepared?",
      a: writtenEstimate
        ? "We assess the problem in person (or from your photos for simple jobs), explain what we found and what we recommend, and give you the price in writing. It lists the work and the parts. If we find something unexpected once work begins, we stop and talk to you before going further."
        : "We assess the problem, explain what we found and what we recommend, and give you a price before any work begins.",
    },
  ];
}
