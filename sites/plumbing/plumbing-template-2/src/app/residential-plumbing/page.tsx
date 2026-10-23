import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const c: AudienceContent = {
  audience: "residential",
  path: "/residential-plumbing/",
  crumb: "Residential",
  label: "For homeowners",
  title: "Home plumbing, minus the hassle.",
  lead: "Leaks, blockages, water heaters, new fixtures and bathroom projects — handled by a team that shows up when agreed, explains everything, and leaves your home tidy.",
  photo: "drainMachineYard",
  sidePhoto: "gasWaterHeater",
  pointsTitle: "Built around life at home.",
  points: [
    { title: "A heads-up before we arrive", body: "We let you know before we arrive, and call if anything changes." },
    { title: "Free estimates", body: "A clear price agreed before work starts. No surprises on the invoice." },
    { title: "Home protected", body: "Floor protection down, work area contained, everything cleaned up after." },
    { title: "Straight advice", body: "Fix now, fix later, or leave it — we'll tell you honestly which." },
  ],
  forTitle: "Plumbing for every kind of home.",
  forList: ["Homeowners", "Landlords and property managers", "Renters (with landlord approval)", "Home buyers checking a property", "Families planning a renovation"],
  faqs: [
    {
      q: "Do I need to be home for the visit?",
      a: "Usually, yes — or another adult who can let us in and approve the work. If that's tricky, mention it in your request and we'll work something out.",
    },
    {
      q: "I'm renting. Can I request a repair?",
      a: "Most repairs need your landlord's approval. Include their details in your request and we're happy to talk to them directly.",
    },
    {
      q: "Can you work around kids and pets?",
      a: "Yes. We keep the work area contained and tools out of reach — just let us know what to expect when you book.",
    },
  ],
  cta: "Plumbing problem at home? Let's fix it.",
};

export const metadata = pageMetadata({
  title: "Residential Plumbing",
  description:
    "Home plumbing repairs, water heaters, fixtures and bathroom plumbing — agreed arrival times, free estimates, and every step explained.",
  path: c.path,
  photo: c.photo,
});

export default function Page() {
  return <AudiencePage c={c} />;
}
