import { business, compactHours } from "@/config/business";
import { areas, listNames } from "./areas";
import { services } from "./services";
import type { Faq } from "./types";

/**
 * The homepage and /faq questions. Answers that depend on the business are
 * built from the config, so they always match what the company really offers.
 */
export function faqs(): Faq[] {
  const emergency = business.verified.emergencyService;
  const covered = areas.filter((a) => a.coverage === "covered").map((a) => a.name);
  const edge = areas.filter((a) => a.coverage === "confirm").map((a) => a.name);

  return [
    {
      q: "What types of plumbing issues do you handle?",
      a: `${listNames(services.map((s) => s.need))} — for homes and businesses. Not sure where your problem fits? Describe it in an estimate request and we'll tell you.`,
    },
    {
      q: "How do I request an estimate?",
      a: `Fill in the estimate form or call ${business.phone.display}. Tell us what's happening, where, and how urgent it is — photos help. We'll get back to you to talk it through. Sending a request doesn't book an appointment; we confirm any visit with you directly.`,
    },
    {
      q: "Which areas do you serve?",
      a: `${listNames(covered)}${edge.length ? `, and ${listNames(edge)} by arrangement` : ""}. Use the area checker on our homepage to check your postal code.`,
    },
    {
      q: "Can you inspect my sewer line with a camera?",
      a: "Yes. If your drains keep blocking or several back up at once, we run a camera through the line to find the real cause — roots, a crack or a sag — and explain what we see before recommending any repair.",
    },
    {
      q: "What information should I provide when requesting service?",
      a: "Your postal code, what's happening and where in the building, when it started, and how urgent it is. Photos of the problem — and of any fixture you've already bought — make the estimate more accurate.",
    },
    {
      q: "Do you provide emergency assistance?",
      a: emergency
        ? `Yes — for burst pipes, active leaks and other urgent problems, call ${business.phone.display} at any time. Turn off your main shutoff valve first if it's safe to.`
        : `We don't run an out-of-hours emergency service. During opening hours (${compactHours()}) we prioritize urgent problems — call rather than using the form. Outside those hours, turn off your main shutoff valve and contact your water utility or emergency services for anything dangerous.`,
    },
    {
      q: "What affects the cost of plumbing work?",
      a: "Mainly the time the job takes, access to the pipework, the parts needed and whether anything unexpected turns up once work starts. That's why we assess first and agree the price with you up front — and if something changes mid-job, we stop and talk to you before going further.",
    },
    {
      q: "Do you give free estimates?",
      a: `Yes. Call ${business.phone.display} or send an estimate request, and we'll talk the job through and give you a clear price before any work starts.`,
    },
    {
      q: "How can I prepare for a scheduled visit?",
      a: "Clear the area around the problem (the cupboard under the sink, access to the water heater), know where your main shutoff valve is, and keep pets out of the work area. If you've bought a fixture for us to install, have it on site.",
    },
  ];
}
