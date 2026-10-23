import type { Audience, Service } from "./types";

/**
 * Every service the company offers. The cards, menus, service pages, the quote
 * form's category list and the sitemap are all generated from this array.
 *
 * Before launch: set `offered: false` on anything the company does not do,
 * and check every sentence describes how this company actually works.
 */
const all: Service[] = [
  {
    slug: "leak-detection-pipe-repair",
    name: "Leak Detection and Pipe Repair",
    short: "Leak Detection & Pipe Repair",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "droplets",
    photo: "washerBoxValves",
    summary:
      "Finding the source of a leak — including the ones you can't see — and repairing or replacing the damaged section of pipe.",
    intro:
      "A leak is rarely where the water shows up. Water travels along pipes, joists and ceilings before it appears, so the first job is tracing it back to its source. Once we have found it, we repair the joint or replace the damaged run, then test the line before we close anything up.",
    signs: [
      "A water bill higher than your usage explains",
      "Damp patches, staining or bubbling paint on walls or ceilings",
      "The sound of running water when every faucet is off",
      "A musty smell under sinks or behind appliances",
      "Low water pressure on one or more fixtures",
      "Warm spots on a floor above hot water pipes",
    ],
    scope: [
      {
        title: "Tracing the leak",
        body: "We start with the meter and the visible pipework, isolate sections of the system to narrow down where the water is going, and only open up walls or floors once we know where to look.",
      },
      {
        title: "Joint and fitting repairs",
        body: "Weeping compression fittings, failed solder joints and perished washers are often a straightforward repair once they are found.",
      },
      {
        title: "Pipe section replacement",
        body: "Corroded, split or frost-damaged pipe is cut out and replaced with a new section in a suitable material, properly supported and secured.",
      },
      {
        title: "Pressure testing",
        body: "Repaired lines are tested under pressure before access panels or flooring go back, so the problem does not reappear a week later.",
      },
    ],
    approach: [
      "Confirm the leak at the water meter and check accessible pipework first.",
      "Isolate sections to narrow down the source with as little disruption as possible.",
      "Explain what we found and give you an upfront price for the repair.",
      "Repair or replace the affected section once you approve.",
      "Pressure-test the line and check for drips before we leave.",
    ],
    meanwhile:
      "If water is actively escaping, turn off the main shutoff valve (often under the kitchen sink or where the supply enters the building). If water is near electrical fittings, switch off the power at the breaker panel only if you can reach it safely and dry-handed.",
    faqs: [
      {
        q: "Will you need to open up my walls or floors?",
        a: "Sometimes, but only once we have narrowed down the location. We explain where and why before cutting any access, and include patching — or leaving a neat access panel — in the estimate.",
      },
      {
        q: "My water bill went up but I can't see a leak. Is it worth a visit?",
        a: "Yes. Turn off every faucet and appliance and check whether your water meter is still moving. If it is, water is going somewhere, and finding it early is far cheaper than repairing the damage later.",
      },
      {
        q: "Should I repair one section or replace all the pipework?",
        a: "A single failed joint usually only needs a local repair. If the pipe is corroded along its length, or the same section keeps failing, we will show you what we found and explain the options so you can decide.",
      },
    ],
    related: ["preventive-plumbing-maintenance", "water-heater-repair-installation", "bathroom-plumbing-renovations"],
  },
  {
    slug: "drain-cleaning-blockage-removal",
    name: "Drain Cleaning and Blockage Removal",
    short: "Drain Cleaning & Blockages",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "waves",
    photo: "pvcDrainCleanout",
    summary:
      "Clearing slow and blocked sinks, showers, toilets and drain lines — and finding out why they blocked in the first place.",
    intro:
      "Most blockages build up over months: grease and food in kitchen drains, hair and soap in showers, wipes in toilets. Clearing the blockage fixes the symptom. Telling you what caused it — and whether the pipe itself has a problem — is what stops it coming back.",
    signs: [
      "Water draining slowly from a sink, bath or shower",
      "Gurgling from plugholes or the toilet when another fixture drains",
      "Unpleasant smells from drains",
      "Water backing up into a shower or bath when the toilet is flushed",
      "More than one fixture blocked at the same time",
    ],
    scope: [
      {
        title: "Fixture blockages",
        body: "Sinks, basins, baths, showers and toilets cleared at the trap or waste with the appropriate tool, not corrosive chemicals.",
      },
      {
        title: "Branch and main drain lines",
        body: "Blockages further down the line are cleared with drain rods or a powered machine sized to the pipe.",
      },
      {
        title: "Finding the cause",
        body: "If a drain keeps blocking, the cause is often in the pipe: a dip, a poor joint or root intrusion. We will recommend a camera inspection when it is worth doing.",
      },
      {
        title: "Kitchen grease build-up",
        body: "Fats, oils and grease harden inside kitchen waste pipes. We clear the build-up and explain how to stop it reforming.",
      },
    ],
    approach: [
      "Ask which fixtures are affected — one blocked fixture and several point to different problems.",
      "Clear the blockage with the least invasive method that will work.",
      "Run water through the system to confirm it drains freely.",
      "Tell you what we found and whether further investigation is worth it.",
    ],
    meanwhile:
      "Stop using the affected fixture and anything that drains into the same line. Avoid chemical drain cleaners — they rarely shift a solid blockage and make the pipe hazardous for whoever opens it next.",
    faqs: [
      {
        q: "Do you use chemical drain cleaners?",
        a: "No. They are hard on older pipes and seldom clear a solid blockage. We use mechanical methods — plungers, augers, rods and drain machines — sized to the pipe.",
      },
      {
        q: "Why does the same drain keep blocking?",
        a: "Repeated blockages usually mean something in the pipe is catching debris: a sag, a poorly made joint, or roots getting in. A camera inspection lets us see it rather than guess.",
      },
      {
        q: "Several drains in my home are slow. What does that mean?",
        a: "When more than one fixture is affected, the blockage is usually further down, in a shared branch or the main drain. Mention it when you contact us so we bring the right equipment.",
      },
    ],
    related: ["sewer-line-inspection-repair", "preventive-plumbing-maintenance", "toilet-repair-replacement"],
  },
  {
    slug: "water-heater-repair-installation",
    name: "Water Heater Repair and Installation",
    short: "Water Heaters",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "flame",
    photo: "waterHeaterWrench",
    summary:
      "Diagnosing no-hot-water, leaking tanks and noisy heaters, and replacing units that have reached the end of their life.",
    intro:
      "No hot water, lukewarm showers, a dripping relief valve or a tank that rumbles — water heater problems range from a simple part replacement to a unit that needs replacing. We diagnose the fault first, then tell you honestly whether a repair is worth it.",
    signs: [
      "No hot water, or hot water that runs out quickly",
      "Water pooling around the base of the tank",
      "Rumbling, popping or banging noises while it heats",
      "Rusty or discolored hot water",
      "Water dripping from the relief valve pipe",
    ],
    scope: [
      {
        title: "Diagnosis and repair",
        body: "Thermostats, heating elements, valves and controls tested and replaced where that is the right fix.",
      },
      {
        title: "Replacement units",
        body: "Like-for-like replacements and upgrades — tank or tankless — sized to how much hot water your household or business actually uses.",
      },
      {
        title: "Safety devices",
        body: "Temperature and pressure relief valves and discharge pipework checked, because they protect the tank and the people near it.",
      },
      {
        title: "Flushing and servicing",
        body: "Sediment flushed from the tank where the manufacturer recommends it, which keeps heaters quieter and more efficient.",
      },
    ],
    approach: [
      "Check the supply, controls and safety devices to find the actual fault.",
      "Tell you whether the unit is worth repairing, and why.",
      "Give you an upfront price for the repair or for a replacement.",
      "Carry out the work and test the heater through a full heating cycle.",
    ],
    meanwhile:
      "If the tank is leaking, turn off the cold water supply to the heater and switch off its power or fuel supply. If you smell gas, leave the building and call your gas utility's emergency line from outside — do not operate switches.",
    faqs: [
      {
        q: "Should I repair or replace my water heater?",
        a: "It depends on the age of the unit, the fault and the condition of the tank. A failed thermostat on a newer heater is usually worth repairing; a leaking tank is not. We will explain what we found so you can make the call.",
      },
      {
        q: "Do you work on gas water heaters?",
        a: "Gas work requires specific qualifications. Confirm with us when you get in touch and we will tell you whether we can carry out the work on your appliance.",
      },
      {
        q: "Why is my water heater making a rumbling noise?",
        a: "Usually sediment that has settled at the bottom of the tank and is being heated. Flushing often helps; if it has gone on for years, the tank may already be worn.",
      },
    ],
    related: ["leak-detection-pipe-repair", "preventive-plumbing-maintenance", "bathroom-plumbing-renovations"],
  },
  {
    slug: "faucet-fixture-installation",
    name: "Faucet and Fixture Installation",
    short: "Faucets & Fixtures",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "showerHead",
    photo: "doubleVanity",
    summary:
      "Installing and repairing faucets, mixers, shower valves, sinks and basins — new fixtures you supply or ones we source for you.",
    intro:
      "A dripping faucet wastes more water than most people expect, and a new fixture is only as good as its connections. We repair faulty faucets and install new kitchen, bathroom and utility fixtures with properly sealed, accessible connections and isolation valves where they belong.",
    signs: [
      "A faucet that drips, or needs to be forced closed",
      "A mixer that won't hold a steady temperature",
      "Water leaking around the base of a faucet",
      "Low flow from one fixture only",
      "New faucets, a sink or a basin you would like installed",
    ],
    scope: [
      {
        title: "Faucet and mixer repairs",
        body: "Cartridges, washers and seals replaced where a repair will last — or a straight answer when it won't.",
      },
      {
        title: "New fixture fitting",
        body: "Kitchen and bathroom faucets, mixers, basins, sinks and shower valves installed and connected.",
      },
      {
        title: "Isolation valves",
        body: "Isolation valves installed to supplies where practical, so a future repair doesn't mean shutting off the whole building.",
      },
      {
        title: "Appliance connections",
        body: "Supply and waste connections for dishwashers, washing machines and fridge water lines.",
      },
    ],
    approach: [
      "Check the fixture and its supply — the fault isn't always in the faucet.",
      "Confirm that new fixtures suit your water pressure and existing connections.",
      "Install, connect and seal the fixture, with isolation valves where possible.",
      "Run it, check every joint for leaks and leave the area clean.",
    ],
    meanwhile:
      "If a faucet won't turn off, close the isolation valve on the pipe beneath it (a small screw or lever valve) or the main shutoff valve.",
    faqs: [
      {
        q: "Can you install a faucet or fixture I have already bought?",
        a: "Yes, in most cases. Send us the make and model when you request a quote so we can check it suits your water pressure and connections before the visit.",
      },
      {
        q: "Is it worth repairing an old faucet?",
        a: "Often, if parts are available and the body is sound. If the faucet is worn out or parts are discontinued, replacement is usually better value — we will tell you which.",
      },
    ],
    related: ["bathroom-plumbing-renovations", "toilet-repair-replacement", "leak-detection-pipe-repair"],
  },
  {
    slug: "toilet-repair-replacement",
    name: "Toilet Repair and Replacement",
    short: "Toilet Repair & Replacement",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "toilet",
    photo: "subwayShower",
    summary:
      "Fixing running, leaking, weak-flushing and rocking toilets, and replacing toilets and in-wall tank systems.",
    intro:
      "A toilet that keeps running can waste a remarkable amount of water without anyone noticing. Most toilet faults come down to a handful of parts — fill valves, flush valves, seals — and are a quick repair. When the toilet itself is cracked or worn out, we remove it and fit the replacement properly.",
    signs: [
      "The tank keeps refilling or you can hear water running",
      "A weak flush, or needing to flush twice",
      "Water on the floor around the base",
      "The toilet rocks or moves when used",
      "A cracked bowl or tank",
    ],
    scope: [
      {
        title: "Running and weak flushes",
        body: "Fill valves, flush valves, siphons and buttons repaired or replaced.",
      },
      {
        title: "Leaks at the base",
        body: "Wax rings, flanges and seals replaced, and the toilet re-seated and secured so it stops moving.",
      },
      {
        title: "Toilet replacement",
        body: "Old toilets removed and disposed of, new toilets installed, connected and sealed.",
      },
      {
        title: "In-wall tank systems",
        body: "Wall-hung toilets with in-wall tanks serviced through their access panels, with flush plates installed.",
      },
    ],
    approach: [
      "Find which part is failing — most faults are inside the tank.",
      "Repair with matching parts, or explain why replacement makes more sense.",
      "Check the flush, refill and seals before we leave.",
    ],
    meanwhile:
      "If a toilet is overflowing, close the isolation valve on the supply pipe to the tank (usually behind or beside it) and stop flushing.",
    faqs: [
      {
        q: "Is a constantly running toilet urgent?",
        a: "It is not dangerous, but it can waste a lot of water and add to your bill. Close the isolation valve between uses and get it repaired soon.",
      },
      {
        q: "Can you install a toilet I have bought?",
        a: "Yes. Tell us the model when you request a quote — we will check the outlet position matches your drain line before the visit.",
      },
    ],
    related: ["bathroom-plumbing-renovations", "drain-cleaning-blockage-removal", "faucet-fixture-installation"],
  },
  {
    slug: "bathroom-plumbing-renovations",
    name: "Bathroom Plumbing and Renovations",
    short: "Bathroom Plumbing",
    offered: true,
    audiences: ["residential"],
    icon: "bath",
    photo: "showerPanRoughIn",
    summary:
      "Rough-in pipework and finish plumbing for new and renovated bathrooms, primary suites and powder rooms.",
    intro:
      "Everything you will see in a finished bathroom depends on pipework that disappears behind the walls. We plan the supply and waste routes with you or your builder, install and pressure-test the rough-in before walls are closed, then return to install and connect the fixtures.",
    signs: [
      "You are planning a new or renovated bathroom",
      "You want to move a toilet, shower or basin to a new position",
      "You are converting a bath to a walk-in shower",
      "Your builder needs a plumber for rough-in and finish plumbing",
    ],
    scope: [
      {
        title: "Planning the layout",
        body: "Checking that waste falls, pipe sizes and water pressure will work for the layout you want, before anything is ordered.",
      },
      {
        title: "Rough-in",
        body: "Supply and waste pipework routed, secured and pressure-tested before walls and floors are closed.",
      },
      {
        title: "Finish plumbing",
        body: "Toilets, basins, baths, shower valves and trays installed and connected once tiling and decorating are done.",
      },
      {
        title: "Working with your builder",
        body: "We coordinate with your builder or tiler so plumbing stages fit the wider project timeline.",
      },
    ],
    approach: [
      "Visit to look at the room, the existing pipework and your plans.",
      "Agree the scope and give you an upfront price for each stage.",
      "Complete and test the rough-in before the room is closed up.",
      "Return for finish plumbing and test every fixture.",
    ],
    meanwhile: "Share any drawings, photos or product lists you already have — it makes the estimate more accurate.",
    faqs: [
      {
        q: "Do you do the tiling and building work as well?",
        a: "We handle the plumbing. If you don't already have a builder or tiler, tell us when you request a quote and we will explain how we can coordinate with one.",
      },
      {
        q: "Can I move my toilet to another wall?",
        a: "Often, but it depends on where the drain line can run and whether it can keep the fall it needs. We check this on the first visit.",
      },
      {
        q: "How long does bathroom plumbing take?",
        a: "It depends on the scope and on the other trades. We give you an estimate of time for each plumbing stage once we have seen the room.",
      },
    ],
    related: ["faucet-fixture-installation", "toilet-repair-replacement", "water-heater-repair-installation"],
  },
  {
    slug: "sewer-line-inspection-repair",
    name: "Sewer Line Inspection and Repair",
    short: "Sewer Line Inspection",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "scan",
    photo: "yardExcavation",
    summary:
      "Camera inspections of underground drain and sewer lines, and repairs to cracked, displaced or root-damaged pipe.",
    intro:
      "When drains keep blocking or several fixtures back up at once, the problem is often underground. A camera inspection shows the inside of the line — cracks, displaced joints, sags, root intrusion — so repairs are based on what is actually there rather than on guesswork.",
    signs: [
      "Several fixtures blocking or draining slowly at once",
      "Sewage smells inside or outside the building",
      "Damp, sunken or unusually green patches over the drain run",
      "Recurring blockages that come back after clearing",
      "Before buying an older property",
    ],
    scope: [
      {
        title: "Camera inspection",
        body: "A waterproof camera run through the line to locate and record defects.",
      },
      {
        title: "Findings explained",
        body: "We show you the footage and explain what it means, in plain terms.",
      },
      {
        title: "Repairs",
        body: "Localized repairs or section replacement, depending on what the inspection finds.",
      },
      {
        title: "Root intrusion",
        body: "Roots cut back from inside the pipe, and advice on stopping them returning.",
      },
    ],
    approach: [
      "Clear any blockage so the camera can pass.",
      "Inspect the line and record the findings.",
      "Walk you through what we found and the repair options.",
      "Give you an upfront price for the recommended work.",
    ],
    meanwhile: "If sewage is backing up, stop using water in the building — every flush and faucet adds to the problem.",
    faqs: [
      {
        q: "Who is responsible for the sewer line — me or the utility?",
        a: "It depends on where the defect is and on local rules. The pipe on your property is usually your responsibility; the shared or public sewer often is not. Our inspection will show where the problem is so you know who to call.",
      },
      {
        q: "Do I get to see the inspection footage?",
        a: "Yes. We show you what the camera found and explain it.",
      },
    ],
    related: ["drain-cleaning-blockage-removal", "preventive-plumbing-maintenance", "leak-detection-pipe-repair"],
  },
  {
    slug: "preventive-plumbing-maintenance",
    name: "Preventive Plumbing Maintenance",
    short: "Preventive Maintenance",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "clipboard",
    photo: "valveGauge",
    summary:
      "Scheduled checks of valves, water heaters, fixtures and drains — so small faults are found before they become leaks.",
    intro:
      "Most plumbing emergencies start as something small: a shutoff valve that has seized, a weeping joint, a heater relief valve that has stopped working. A planned inspection catches these early, when the repair is simple and the timing is yours.",
    signs: [
      "You don't know when your plumbing was last checked",
      "You have recently bought an older property",
      "You manage premises where downtime is expensive",
      "Your shutoff valve is stiff or you don't know where it is",
    ],
    scope: [
      {
        title: "Valves and shut-offs",
        body: "Main shutoff valve and isolation valves located, labeled and tested so they work when you need them.",
      },
      {
        title: "Visible pipework and joints",
        body: "Accessible pipework checked for corrosion, weeping joints and poor support.",
      },
      {
        title: "Water heater check",
        body: "Relief valve, discharge pipe, controls and visible connections checked.",
      },
      {
        title: "Fixtures and drains",
        body: "Taps, toilets and drains checked for drips, running water and slow drainage.",
      },
    ],
    approach: [
      "Agree what the inspection covers before the visit.",
      "Work through the system and note anything that needs attention.",
      "Give you a written summary with recommendations in order of priority.",
      "Quote separately for any repairs — there is no obligation.",
    ],
    meanwhile: "Find your main shutoff valve now, before you need it, and check it turns.",
    faqs: [
      {
        q: "How often should plumbing be inspected?",
        a: "It depends on the age of the system and how heavily it is used. We will suggest an interval after the first inspection, based on what we find.",
      },
      {
        q: "Do I have to have the repairs done straight away?",
        a: "No. The summary puts recommendations in order of priority so you can plan. We will tell you clearly if anything is urgent.",
      },
    ],
    related: ["leak-detection-pipe-repair", "water-heater-repair-installation", "sewer-line-inspection-repair"],
  },
];

export const services = all.filter((s) => s.offered);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesFor(audience: Audience) {
  return services.filter((s) => s.audiences.includes(audience));
}

export function relatedServices(service: Service) {
  return service.related.map(getService).filter((s): s is Service => Boolean(s));
}

/** The quote form's "type of work" choices. */
export const serviceOptions = [...services.map((s) => s.short), "Something else / not sure"];
