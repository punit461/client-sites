import type { Audience, Service } from "./types";

/**
 * The services. Cards, menus, service pages, the quote form's categories and
 * the sitemap all come from this list. Before launch: set `offered: false` on
 * anything the company doesn't do, and check every sentence matches how it
 * actually works.
 */
const all: Service[] = [
  {
    slug: "leak-detection-pipe-repair",
    name: "Leak Detection and Pipe Repair",
    short: "Leak Detection & Pipe Repair",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "droplets",
    photo: "brassLeak",
    summary: "Tracing leaks to their source — including hidden ones — and repairing the joint or pipe that failed.",
    intro:
      "Where water appears is rarely where it starts. We trace a leak back along the pipework to its source, explain what failed and why, then repair it and test the line under pressure before anything is closed up.",
    signs: [
      "A water bill higher than your usage explains",
      "Stains or bubbling paint on a wall or ceiling",
      "The sound of running water when nothing is on",
      "A damp, musty smell under a sink",
      "Pressure dropping at one fixture",
    ],
    includes: [
      { title: "Finding the source", body: "Meter checks and isolating sections of pipe, so walls are opened only where they need to be." },
      { title: "Joint repairs", body: "Weeping fittings, failed joints and worn washers repaired or replaced." },
      { title: "Pipe sections", body: "Corroded or split pipe cut out and replaced, then properly supported." },
      { title: "Pressure testing", body: "Every repair tested before panels, floors or drywall go back." },
    ],
    steps: [
      "Confirm the leak at your water meter",
      "Narrow down the source with the least disruption",
      "Explain the repair and give you an estimate",
      "Repair once you approve, then test the line",
    ],
    meanwhile:
      "If water is escaping, close the main shutoff valve — often under the kitchen sink or where the supply enters the building. Keep clear of water near outlets or light fittings.",
    faqs: [
      {
        q: "Will you need to open up a wall?",
        a: "Only once we've narrowed down where the leak is. We'll tell you where and why before cutting anything, and include patching or an access panel in the estimate.",
      },
      {
        q: "How can I tell if I have a hidden leak?",
        a: "Turn off every faucet and appliance, then watch your water meter for a few minutes. If it still moves, water is going somewhere.",
      },
    ],
    related: ["pipe-installation-replacement", "preventive-maintenance", "water-heater-services"],
  },
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    short: "Drain Cleaning",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "waves",
    photo: "kitchenSink",
    summary: "Clearing slow and blocked sinks, showers, toilets and drain lines — and finding out why they blocked.",
    intro:
      "A cleared drain fixes today. Knowing why it blocked helps it stay clear. We clear the blockage mechanically, without harsh chemicals, then tell you what we found and whether the pipe itself needs a closer look.",
    signs: [
      "Water draining slowly from a sink, tub or shower",
      "Gurgling from a plughole or toilet",
      "Unpleasant smells from a drain",
      "More than one fixture blocked at once",
      "Water rising in the shower when the toilet is flushed",
    ],
    includes: [
      { title: "Fixture drains", body: "Sinks, basins, tubs, showers and toilets cleared at the trap or waste." },
      { title: "Drain lines", body: "Blockages further down cleared with tools sized to the pipe." },
      { title: "Kitchen grease", body: "Hardened fats and grease cleared from kitchen waste lines." },
      { title: "The reason why", body: "If a drain keeps blocking, we'll say whether a camera inspection is worth it." },
    ],
    steps: [
      "Ask which fixtures are affected",
      "Clear the blockage with the least invasive method",
      "Run water to confirm it drains freely",
      "Explain the cause and how to avoid a repeat",
    ],
    meanwhile: "Stop using the blocked fixture and anything that drains into the same line. Skip chemical drain cleaners — they rarely shift a solid blockage.",
    faqs: [
      {
        q: "Do you use chemical cleaners?",
        a: "No. Mechanical tools sized to the pipe clear blockages without damaging older pipework.",
      },
      {
        q: "Why does my drain keep blocking?",
        a: "Usually something in the pipe catches debris — a sag, a poor joint, or roots. We'll tell you if an inspection would show it.",
      },
    ],
    related: ["sewer-line-services", "toilet-faucet-repair", "preventive-maintenance"],
  },
  {
    slug: "water-heater-services",
    name: "Water Heater Services",
    short: "Water Heater Services",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "flame",
    photo: "waterHeater",
    summary: "Diagnosing and repairing water heaters, and replacing units that have reached the end of their life.",
    intro:
      "No hot water, a leaking tank or a heater that rumbles — the fix can be a single part or a new unit. We find the fault first, then give you an honest view of whether a repair is worth it.",
    signs: [
      "No hot water, or it runs out quickly",
      "Water around the base of the tank",
      "Popping or rumbling as it heats",
      "Discolored hot water",
      "Water dripping from the relief valve pipe",
    ],
    includes: [
      { title: "Diagnosis", body: "Controls, elements and valves tested to find the actual fault." },
      { title: "Repairs", body: "Failed parts replaced when the rest of the unit is sound." },
      { title: "Replacement", body: "New units sized to how much hot water you really use." },
      { title: "Safety checks", body: "Relief valve and discharge pipe checked on every visit." },
    ],
    steps: [
      "Check supply, controls and safety devices",
      "Explain whether repair or replacement makes sense",
      "Give you an estimate for the option you choose",
      "Complete the work and run a full heating cycle",
    ],
    meanwhile:
      "If the tank is leaking, turn off its cold supply and its power or fuel. If you smell gas, leave the building and call your gas utility's emergency line from outside.",
    faqs: [
      {
        q: "How do you decide between repair and replacement?",
        a: "The unit's age, the fault and the condition of the tank. A failed part on a newer heater is usually worth repairing; a leaking tank isn't.",
      },
      {
        q: "Do you work on gas water heaters?",
        a: "Gas work needs specific qualifications. Ask when you request a quote and we'll confirm whether we can work on your appliance.",
      },
    ],
    related: ["leak-detection-pipe-repair", "preventive-maintenance", "pipe-installation-replacement"],
  },
  {
    slug: "toilet-faucet-repair",
    name: "Toilet and Faucet Repair",
    short: "Toilet & Faucet Repair",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "toilet",
    photo: "flushPlate",
    summary: "Fixing running toilets, weak flushes, dripping faucets and leaking bases — or fitting a replacement.",
    intro:
      "A running toilet or dripping faucet wastes more water than most people expect. Most faults come down to a worn part. We find it and replace it — or tell you plainly when a new fixture is better value.",
    signs: [
      "A toilet that keeps running or refilling",
      "A weak flush, or flushing twice",
      "A faucet that drips or needs forcing shut",
      "Water around the base of a toilet or faucet",
      "A toilet that rocks when used",
    ],
    includes: [
      { title: "Toilet parts", body: "Fill valves, flush valves, seals and buttons repaired or replaced." },
      { title: "Faucet parts", body: "Cartridges, washers and seals replaced where a repair will last." },
      { title: "Re-seating", body: "Leaking or rocking toilets re-sealed and fixed firmly to the floor." },
      { title: "New fixtures", body: "Replacement toilets and faucets installed when repair isn't worth it." },
    ],
    steps: ["Find the failing part", "Repair with matching parts, or explain why to replace", "Test the flush, refill and seals"],
    meanwhile: "Close the small isolation valve on the supply pipe beneath the fixture. If there isn't one, use the main shutoff valve.",
    faqs: [
      {
        q: "Can you install a fixture I've already bought?",
        a: "Usually. Add the make and model to your request so we can check it suits your connections before we visit.",
      },
      {
        q: "Is a running toilet urgent?",
        a: "It isn't dangerous, but it can waste a lot of water. Close its isolation valve between uses and have it fixed soon.",
      },
    ],
    related: ["bathroom-plumbing", "drain-cleaning", "leak-detection-pipe-repair"],
  },
  {
    slug: "bathroom-plumbing",
    name: "Bathroom Plumbing",
    short: "Bathroom Plumbing",
    offered: true,
    audiences: ["residential"],
    icon: "bath",
    photo: "bathroomStone",
    summary: "Plumbing for new and renovated bathrooms — from rough-in behind the walls to the final fixtures.",
    intro:
      "Every finished bathroom depends on pipework you'll never see. We check that your layout works for drainage and water pressure, install and test the rough-in before walls close, then return to connect every fixture.",
    signs: [
      "You're planning a bathroom renovation",
      "You'd like a walk-in shower instead of a tub",
      "You want to move the toilet, shower or vanity",
      "Your builder needs a plumber for the project",
    ],
    includes: [
      { title: "Layout check", body: "Drain falls, pipe sizes and pressure checked against your design." },
      { title: "Rough-in", body: "Supply and waste pipework installed and pressure-tested before walls close." },
      { title: "Fixtures", body: "Showers, tubs, vanities, faucets and toilets connected and sealed." },
      { title: "Coordination", body: "Plumbing stages scheduled around your builder or tiler." },
    ],
    steps: ["Review your plans and existing pipework", "Estimate each plumbing stage", "Install and test the rough-in", "Connect and test every fixture"],
    meanwhile: "Share drawings, photos or a product list with your request — it makes the estimate more accurate.",
    faqs: [
      {
        q: "Can the toilet move to another wall?",
        a: "Often. It depends on whether the drain line can keep the slope it needs, which we check on the first visit.",
      },
      {
        q: "Do you do the tiling as well?",
        a: "We handle the plumbing. If you don't have a builder or tiler yet, tell us and we'll explain how we work alongside one.",
      },
    ],
    related: ["toilet-faucet-repair", "pipe-installation-replacement", "water-heater-services"],
  },
  {
    slug: "pipe-installation-replacement",
    name: "Pipe Installation and Replacement",
    short: "Pipe Installation & Replacement",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "pipe",
    photo: "roughIn",
    summary: "New supply and waste lines, and replacing corroded or failing pipework — planned and pressure-tested.",
    intro:
      "Ageing pipework fails a little at a time: a pinhole here, low pressure there. We assess what's worth replacing, plan routes that keep disruption down, and install new lines that are properly supported and tested.",
    signs: [
      "Repeated leaks on the same run of pipe",
      "Discolored water or falling pressure",
      "Visible corrosion on exposed pipes",
      "New fixtures or appliances that need connecting",
    ],
    includes: [
      { title: "Assessment", body: "Which sections need replacing now, and which can wait." },
      { title: "Planning", body: "Routes chosen to limit opened walls and floors." },
      { title: "Installation", body: "New supply and waste lines, secured and insulated where needed." },
      { title: "Testing", body: "Every new line pressure-tested before it's closed in." },
    ],
    steps: ["Inspect the existing pipework", "Agree which sections to replace", "Install, support and test", "Patch or provide access as agreed"],
    meanwhile: "Note which fixtures are affected and since when — patterns help us find where the pipe is failing.",
    faqs: [
      {
        q: "Do I need to replace all my pipes?",
        a: "Not always. If one section keeps failing we'll show you whether it's local damage or a sign the whole run is near the end of its life.",
      },
    ],
    related: ["leak-detection-pipe-repair", "bathroom-plumbing", "sewer-line-services"],
  },
  {
    slug: "sewer-line-services",
    name: "Sewer Line Services",
    short: "Sewer Line Services",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "scan",
    photo: "pipeRuns",
    summary: "Camera inspections and repairs for underground drain and sewer lines.",
    intro:
      "When several drains back up at once, the problem is usually underground. A camera inspection shows us the inside of the line — cracks, sags, roots — so the repair is based on what's actually there.",
    signs: [
      "Several fixtures blocked at the same time",
      "Sewage smells inside or outside",
      "Damp or sunken patches over the drain route",
      "Blockages that come back after clearing",
    ],
    includes: [
      { title: "Camera inspection", body: "A waterproof camera run through the line to find defects." },
      { title: "Findings explained", body: "We show you the footage and what it means." },
      { title: "Repairs", body: "Local repairs or section replacement, depending on what we find." },
      { title: "Root intrusion", body: "Roots cleared from inside the pipe, with advice on stopping them returning." },
    ],
    steps: ["Clear the line so the camera can pass", "Inspect and record", "Talk you through the footage", "Estimate the recommended repair"],
    meanwhile: "If sewage is backing up, stop using water in the building until the line is cleared.",
    faqs: [
      {
        q: "Who is responsible for the sewer line?",
        a: "It depends on where the problem is and local rules. The inspection shows where it is, so you know whether it's yours or the utility's.",
      },
    ],
    related: ["drain-cleaning", "pipe-installation-replacement", "preventive-maintenance"],
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Maintenance",
    short: "Preventive Maintenance",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "clipboard",
    photo: "valveGauge",
    summary: "Planned checks of valves, pipework, water heaters, fixtures and drains — small issues found early.",
    intro:
      "Most plumbing emergencies start small: a valve that won't turn, a joint that weeps. A planned check finds them while the fix is simple and the timing is yours.",
    signs: [
      "You don't know when your plumbing was last checked",
      "You've moved into an older property",
      "You can't find — or can't turn — your main shutoff valve",
      "You manage premises where downtime is costly",
    ],
    includes: [
      { title: "Valves", body: "Main shutoff and isolation valves located, tested and labeled." },
      { title: "Pipework", body: "Visible pipes and joints checked for corrosion and weeping." },
      { title: "Water heater", body: "Relief valve, controls and connections checked." },
      { title: "Fixtures and drains", body: "Faucets, toilets and drains checked for drips and slow draining." },
    ],
    steps: ["Agree what the check covers", "Work through the system", "Written summary, most important first", "Separate quote for any repairs"],
    meanwhile: "Find your main shutoff valve today and check that it turns — it's the most useful thing to know in a leak.",
    faqs: [
      {
        q: "Do I have to do the repairs straight away?",
        a: "No. Recommendations are listed most important first, so you can plan. We'll tell you clearly if anything is urgent.",
      },
    ],
    related: ["leak-detection-pipe-repair", "water-heater-services", "sewer-line-services"],
  },
];

export const services = all.filter((s) => s.offered);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesFor = (a: Audience) => services.filter((s) => s.audiences.includes(a));
export const relatedServices = (s: { related: string[] }) =>
  s.related.map(getService).filter((x): x is Service => Boolean(x));

/** The quote form's service categories. */
export const serviceOptions = [...services.map((s) => s.short), "Something else / not sure"];
