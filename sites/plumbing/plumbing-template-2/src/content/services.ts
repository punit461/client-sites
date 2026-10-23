import type { Audience, Service } from "./types";

/**
 * The services. Cards, the "What do you need help with?" selector, service
 * pages, the estimate form's categories and the sitemap all come from here.
 *
 * Before launch: set `offered: false` on anything the company doesn't do, and
 * check every sentence matches how the company actually works.
 */
const all: Service[] = [
  {
    slug: "leaking-pipes",
    name: "Leaking Pipe Repair",
    need: "Leaking pipes",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "droplets",
    photo: "brassLeak",
    summary: "Drips, damp patches and hidden leaks traced to the source and repaired — then pressure-tested.",
    selectorBlurb:
      "We trace the leak back to where it starts — which is often not where the water shows — repair or replace the failed section, and test the line before closing anything up.",
    intro:
      "Water is good at hiding where it comes from. A stain on the ceiling can start two rooms away. We find the actual source first, fix it properly, and pressure-test the repair so it stays fixed.",
    signs: [
      "Damp patches or stains on walls and ceilings",
      "Water meter moving with everything turned off",
      "Running-water sounds when nothing's on",
      "A sudden jump in your water bill",
      "Musty smells under sinks or behind appliances",
    ],
    includes: [
      { title: "Leak tracing", body: "Meter checks and section-by-section isolation to find the source before opening anything up." },
      { title: "Joint and fitting repair", body: "Weeping fittings, failed joints and perished washers repaired or replaced." },
      { title: "Section replacement", body: "Corroded or split pipe cut out and replaced with properly supported new pipe." },
      { title: "Pressure testing", body: "Every repair tested under pressure before walls, floors or panels go back." },
    ],
    process: [
      "Confirm the leak at the meter and check visible pipework",
      "Isolate sections to pinpoint the source",
      "Explain the fix and give you a clear written estimate",
      "Repair once you approve, then pressure-test",
    ],
    safety:
      "If water is escaping, turn off the main shutoff valve. Keep clear of water near outlets or light fittings, and only switch off power at the breaker panel if you can reach it safely and dry-handed.",
    faqs: [
      {
        q: "Will you have to cut into my walls?",
        a: "Only once we know where the leak is. We tell you where and why before opening anything, and include patching or a neat access panel in the estimate.",
      },
      {
        q: "How do I know if I have a hidden leak?",
        a: "Turn off every faucet and appliance and watch your water meter. If it keeps moving, water is going somewhere — worth getting checked before it causes damage.",
      },
    ],
    related: ["general-maintenance", "water-heaters", "bathroom-plumbing"],
  },
  {
    slug: "blocked-drains",
    name: "Blocked Drain Clearing",
    need: "Blocked drains",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "waves",
    photo: "kitchenSink",
    summary: "Slow sinks, backed-up showers and blocked toilets cleared — and the cause explained so it doesn't come back.",
    selectorBlurb:
      "We clear the blockage mechanically — no harsh chemicals — then tell you what caused it and whether the pipe itself needs a closer look.",
    intro:
      "Clearing a blockage fixes today's problem. Knowing why it happened fixes next month's. We clear it properly, then tell you what we found — grease, wipes, a sagging pipe or roots.",
    signs: [
      "Water draining slowly or not at all",
      "Gurgling from plugholes or the toilet",
      "Bad smells coming from drains",
      "Several fixtures blocked at the same time",
      "Water backing up into the shower when you flush",
    ],
    includes: [
      { title: "Fixture blockages", body: "Sinks, basins, showers, tubs and toilets cleared at the trap or waste." },
      { title: "Drain line clearing", body: "Deeper blockages cleared with rods or a powered machine sized to the pipe." },
      { title: "Grease build-up", body: "Kitchen waste lines cleared of hardened fats, oils and grease." },
      { title: "Root-cause advice", body: "If it keeps happening, we'll say whether a camera inspection is worth it." },
    ],
    process: [
      "Ask which fixtures are affected — it tells us where to look",
      "Clear the blockage with the least invasive method that works",
      "Flush the line and confirm it drains freely",
      "Explain the cause and anything worth watching",
    ],
    safety: "Stop using the blocked fixture and anything on the same line. Skip chemical drain cleaners — they rarely shift solid blockages and make the pipe hazardous to work on.",
    faqs: [
      {
        q: "Do you use chemical drain cleaners?",
        a: "No. We use mechanical tools sized to the pipe. Chemicals are hard on older pipes and seldom clear a solid blockage.",
      },
      {
        q: "Why does my drain keep blocking?",
        a: "Repeat blockages usually mean something in the pipe catches debris — a sag, a bad joint or roots. We'll tell you if an inspection is worth doing.",
      },
    ],
    related: ["general-maintenance", "toilet-faucet-repairs", "commercial-plumbing"],
  },
  {
    slug: "water-heaters",
    name: "Water Heater Repair & Replacement",
    need: "Water heater problems",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "flame",
    photo: "waterHeaterWrench",
    summary: "No hot water, leaking tanks and noisy heaters diagnosed — with an honest answer on repair versus replace.",
    selectorBlurb:
      "We diagnose the fault, check the safety valves, and tell you straight whether a repair makes sense or the unit has had its day.",
    intro:
      "Water heater trouble ranges from a five-minute part swap to a unit at the end of its life. We find out which, explain it plainly, and give you a written estimate for the option that makes sense.",
    signs: [
      "No hot water, or it runs out fast",
      "Water around the base of the tank",
      "Popping or rumbling while it heats",
      "Rusty or discolored hot water",
      "Water dripping from the relief valve pipe",
    ],
    includes: [
      { title: "Diagnosis", body: "Controls, elements, thermostats and valves tested to find the real fault." },
      { title: "Repairs", body: "Failed parts replaced when the unit is otherwise sound." },
      { title: "Replacement", body: "New units sized to how much hot water you actually use." },
      { title: "Safety checks", body: "Relief valves and discharge pipework checked every time." },
    ],
    process: [
      "Check supply, controls and safety devices",
      "Tell you whether repair is worth it — and why",
      "Give you a written estimate for repair or replacement",
      "Do the work and run the heater through a full cycle",
    ],
    safety:
      "If the tank is leaking, turn off its cold supply and its power or fuel. If you smell gas, leave the building and call your gas utility's emergency line from outside.",
    faqs: [
      {
        q: "Repair or replace — how do you decide?",
        a: "Age, the fault and the tank's condition. A failed thermostat on a newer unit is usually worth repairing; a leaking tank isn't. We'll show you what we found.",
      },
      {
        q: "Do you work on gas water heaters?",
        a: "Gas work needs specific qualifications. Ask when you request an estimate and we'll confirm whether we can work on your appliance.",
      },
    ],
    related: ["leaking-pipes", "general-maintenance", "plumbing-installation"],
  },
  {
    slug: "toilet-faucet-repairs",
    name: "Toilet & Faucet Repairs",
    need: "Toilet and faucet repairs",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "toilet",
    photo: "flushPlateInstall",
    summary: "Running toilets, weak flushes, dripping faucets and leaking bases — fixed with the right parts.",
    selectorBlurb:
      "Most toilet and faucet faults come down to a handful of worn parts. We find the one that's failed and replace it — or tell you when replacing the fixture is better value.",
    intro:
      "A running toilet or dripping faucet seems minor until you see the water bill. Most fixes are quick once the failed part is found. When the fixture itself is worn out, we'll tell you — and fit the replacement properly.",
    signs: [
      "A toilet that keeps running or refilling",
      "Weak flush or needing to flush twice",
      "A faucet that drips or has to be forced closed",
      "Water around the base of the toilet or faucet",
      "A toilet that rocks when used",
    ],
    includes: [
      { title: "Toilet repairs", body: "Fill valves, flush valves, seals and buttons repaired or replaced." },
      { title: "Faucet repairs", body: "Cartridges, washers and seals replaced where a repair will last." },
      { title: "Re-seating", body: "Leaking or rocking toilets re-sealed and secured to the floor." },
      { title: "Fixture replacement", body: "New toilets and faucets fitted when repair isn't worth it." },
    ],
    process: [
      "Identify the failing part",
      "Repair with matching parts — or explain why replacement is better",
      "Test the flush, refill and seals",
    ],
    safety: "Close the small isolation valve on the supply pipe beneath the fixture. If there isn't one, use the main shutoff valve.",
    faqs: [
      {
        q: "Can you install a toilet or faucet I've already bought?",
        a: "Usually, yes. Include the make and model in your request so we can check it suits your connections before the visit.",
      },
      {
        q: "Is a running toilet urgent?",
        a: "Not dangerous, but it can waste a lot of water. Close its isolation valve between uses and get it fixed soon.",
      },
    ],
    related: ["bathroom-plumbing", "blocked-drains", "plumbing-installation"],
  },
  {
    slug: "plumbing-installation",
    name: "New Plumbing Installation",
    need: "New plumbing installation",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "wrench",
    photo: "bathroomRoughIn",
    summary: "New supply and waste lines, relocated fixtures and appliance connections — planned, installed and tested.",
    selectorBlurb:
      "Moving a sink, adding a utility room or connecting new appliances? We plan the pipe routes, install them properly and test everything before it's closed in.",
    intro:
      "New plumbing is only as good as what's hidden behind the wall. We plan routes, sizes and falls before anything is ordered, then install, support and pressure-test every line.",
    signs: [
      "You're adding a kitchen, utility room or bathroom",
      "You want to move a sink, toilet or appliance",
      "New appliances need water or waste connections",
      "Your builder needs a plumber on the project",
    ],
    includes: [
      { title: "Planning", body: "Pipe routes, sizes and drain falls checked against your layout." },
      { title: "Rough-in", body: "Supply and waste lines installed and tested before walls close." },
      { title: "Finish plumbing", body: "Fixtures and appliances connected once finishes are done." },
      { title: "Coordination", body: "Plumbing stages scheduled around your builder or other trades." },
    ],
    process: [
      "Visit to see the space and your plans",
      "Agree the scope and give you a written estimate",
      "Install and pressure-test the rough-in",
      "Return for finish plumbing and final tests",
    ],
    safety: "Share drawings, photos or product lists in your request — it makes the estimate more accurate.",
    faqs: [
      {
        q: "Do you handle the building work too?",
        a: "We handle the plumbing. If you don't have a builder yet, tell us and we'll explain how we can work alongside one.",
      },
    ],
    related: ["bathroom-plumbing", "toilet-faucet-repairs", "water-heaters"],
  },
  {
    slug: "bathroom-plumbing",
    name: "Bathroom Plumbing",
    need: "Bathroom plumbing",
    offered: true,
    audiences: ["residential"],
    icon: "bath",
    photo: "bathroomStone",
    summary: "Plumbing for bathroom renovations — showers, tubs, vanities and toilets, rough-in to finish.",
    selectorBlurb:
      "Renovating a bathroom? We check your layout works for drainage and pressure, install the rough-in before tiling, and connect every fixture at the end.",
    intro:
      "A great-looking bathroom depends on plumbing you'll never see. We make sure your layout works — drain falls, pipe sizes, water pressure — before the tiles go up, then come back to connect every fixture.",
    signs: [
      "You're planning a bathroom renovation",
      "You want a walk-in shower instead of a tub",
      "You're moving the toilet, shower or vanity",
      "Your contractor needs a plumber for rough-in and finish",
    ],
    includes: [
      { title: "Layout check", body: "Drain falls, pipe sizes and pressure checked against your design." },
      { title: "Rough-in", body: "Supply and waste routed and pressure-tested before walls close." },
      { title: "Fixture install", body: "Showers, tubs, vanities, faucets and toilets connected and sealed." },
      { title: "Final testing", body: "Every fixture run and checked for leaks before handover." },
    ],
    process: [
      "Review your design and the existing pipework",
      "Written estimate for each plumbing stage",
      "Rough-in and pressure test",
      "Finish plumbing and final checks",
    ],
    safety: "Send us your plans or product list with your request — we'll flag anything that won't work before you order.",
    faqs: [
      {
        q: "Can I move my toilet to a different wall?",
        a: "Often — it depends on whether the drain line can keep the fall it needs. We check this on the first visit.",
      },
    ],
    related: ["plumbing-installation", "toilet-faucet-repairs", "water-heaters"],
  },
  {
    slug: "commercial-plumbing",
    name: "Commercial Plumbing",
    need: "Commercial plumbing",
    offered: true,
    audiences: ["commercial"],
    icon: "building",
    photo: "commercialKitchen",
    summary: "Repairs and planned maintenance for restaurants, shops, offices and managed buildings.",
    selectorBlurb:
      "For businesses, plumbing downtime costs trading time. We plan visits around your operation, keep you updated, and leave a written record of the work.",
    intro:
      "When a business's plumbing fails, the cost isn't just the repair — it's the closed washroom or the kitchen that can't run. We schedule around your operation and document everything we do.",
    signs: [
      "Recurring drain problems in a kitchen or washroom",
      "Leaks affecting tenants or customers",
      "Fixtures that need upgrading or replacing",
      "No planned maintenance in place",
    ],
    includes: [
      { title: "Reactive repairs", body: "Leaks, blockages and failed fixtures repaired with minimal disruption." },
      { title: "Commercial kitchens", body: "Sinks, pre-rinse faucets, dishwasher connections and grease-heavy waste lines." },
      { title: "Planned maintenance", body: "Scheduled checks with written reports and prioritized recommendations." },
      { title: "Documentation", body: "Written records of all work, for your files, landlord or insurer." },
    ],
    process: [
      "Agree access and timing that suit your business",
      "Assess and give a written estimate",
      "Carry out the work with minimal disruption",
      "Provide a written summary of what was done",
    ],
    safety: "If a leak affects customers or tenants, isolate the water to that area and keep people clear until we arrive.",
    faqs: [
      {
        q: "Can you work around our trading hours?",
        a: "We schedule within our published opening hours and pick the quietest times for your business where possible. Tell us your constraints when you get in touch.",
      },
    ],
    related: ["general-maintenance", "blocked-drains", "leaking-pipes"],
  },
  {
    slug: "general-maintenance",
    name: "Plumbing Inspections & Maintenance",
    need: "General maintenance",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "clipboard",
    photo: "valveGauge",
    summary: "A planned check of valves, pipework, water heater, fixtures and drains — small problems found early.",
    selectorBlurb:
      "A planned inspection catches seized valves, weeping joints and tired water heaters while they're still small, cheap fixes — on your schedule, not in an emergency.",
    intro:
      "Most plumbing emergencies start small: a valve that won't turn, a joint that weeps, a relief valve that's stopped working. An inspection finds them while the fix is simple and the timing is yours.",
    signs: [
      "You don't know when your plumbing was last checked",
      "You've just moved into an older property",
      "Your main shutoff valve is stiff — or you can't find it",
      "You manage premises where downtime is costly",
    ],
    includes: [
      { title: "Valves", body: "Main shutoff and isolation valves found, tested and labeled." },
      { title: "Pipework", body: "Visible pipes and joints checked for corrosion, weeping and support." },
      { title: "Water heater", body: "Relief valve, discharge pipe, controls and connections checked." },
      { title: "Fixtures and drains", body: "Faucets, toilets and drains checked for drips and slow draining." },
    ],
    process: [
      "Agree what the inspection covers",
      "Work through the system and note anything that needs attention",
      "Written summary with recommendations in priority order",
      "Separate quote for any repairs — no obligation",
    ],
    safety: "Locate your main shutoff valve today and check it turns. It's the most useful thing you can know in a plumbing emergency.",
    faqs: [
      {
        q: "Do I have to get the repairs done right away?",
        a: "No. Recommendations come in priority order so you can plan. We'll tell you clearly if anything is urgent.",
      },
    ],
    related: ["leaking-pipes", "water-heaters", "commercial-plumbing"],
  },
];

export const services = all.filter((s) => s.offered);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesFor = (a: Audience) => services.filter((s) => s.audiences.includes(a));

export const relatedServices = (s: { related: string[] }) =>
  s.related.map(getService).filter((x): x is Service => Boolean(x));

/** The estimate form's category list, in the customer's own words. */
export const serviceOptions = [...services.map((s) => s.need), "Something else"];
