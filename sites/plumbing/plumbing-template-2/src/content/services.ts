import type { Audience, Service } from "./types";

/**
 * The services. Cards, the "What do you need help with?" selector, service
 * pages, the estimate form's categories and the sitemap all come from here.
 *
 * These follow what Tx-Star Plumbing lists on its vans — drain cleaning, sewer
 * and plumbing repairs, water heater installs and repairs, gas line repair or
 * replacement, and jetter service — plus the work its Google reviews describe
 * (water main replacement, camera inspections, under-slab drain repairs).
 * Set `offered: false` on anything the company stops doing.
 */
const all: Service[] = [
  {
    slug: "drain-cleaning-hydro-jetting",
    name: "Drain Cleaning & Hydro-Jetting",
    need: "Blocked or slow drains",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "waves",
    photo: "nightDrainCall",
    summary: "Slow sinks, backed-up tubs and blocked main lines cleared with drain machines or a high-pressure jetter.",
    selectorBlurb:
      "We clear the blockage with a cable machine or our jetter — no harsh chemicals — then tell you what caused it and whether the line needs a camera inspection.",
    intro:
      "Drain unclogging is the job our customers mention most. Clearing a blockage fixes today's problem; knowing why it happened fixes next month's. We clear it properly — by cable machine or hydro-jetting — then tell you what we found: grease, wipes, a sagging pipe or roots.",
    signs: [
      "Water draining slowly or not at all",
      "Gurgling from plugholes or the toilet",
      "Bad smells coming from drains",
      "Several fixtures blocked at the same time",
      "Water backing up into the tub when you flush",
    ],
    includes: [
      { title: "Fixture blockages", body: "Sinks, tubs, showers and toilets cleared at the trap or through the drain." },
      { title: "Main line clearing", body: "Deeper blockages cleared from the yard cleanout with a powered drain machine." },
      { title: "Hydro-jetting", body: "High-pressure water scours grease, scale and roots from the pipe walls, not just a hole through the blockage." },
      { title: "Camera follow-up", body: "If it keeps happening, a camera inspection shows exactly what's catching the debris." },
    ],
    process: [
      "Ask which fixtures are affected — it tells us where to look",
      "Clear the line from the fixture or the cleanout",
      "Flush the line and confirm it drains freely",
      "Explain the cause and whether a camera inspection is worth it",
    ],
    safety: "Stop using the blocked fixture and anything on the same line. Skip chemical drain cleaners — they rarely shift solid blockages and make the pipe hazardous to work on.",
    faqs: [
      {
        q: "What is hydro-jetting?",
        a: "A jetter sends water through the line at very high pressure, scouring grease, scale and roots off the pipe walls. Where a cable machine punches a hole through a blockage, jetting cleans the whole pipe — useful for kitchen lines and drains that keep blocking.",
      },
      {
        q: "Do you use chemical drain cleaners?",
        a: "No. We use cable machines and jetters sized to the pipe. Chemicals are hard on older pipes and seldom clear a solid blockage.",
      },
      {
        q: "Why does my drain keep blocking?",
        a: "Repeat blockages usually mean something in the pipe catches debris — a sag, a broken joint or roots. A camera inspection shows which, so you fix the cause instead of paying for the same clearing again.",
      },
    ],
    related: ["sewer-line-repair", "commercial-plumbing", "leak-water-line-repair"],
  },
  {
    slug: "sewer-line-repair",
    name: "Sewer Line Inspection & Repair",
    need: "Sewer line problems",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "scan",
    photo: "sewerPipeRepair",
    summary: "Camera inspections that find the real cause, then repair or replacement of cracked, root-damaged or broken sewer pipe.",
    selectorBlurb:
      "If drains keep backing up, the problem is often underground. We run a camera through the line, show you what's there, and replace the damaged section.",
    intro:
      "When several drains back up or the same blockage keeps returning, the sewer line itself is usually the problem. Older Houston homes often have clay or concrete pipe that roots grow straight through. We put a camera down the line to find the cause, then repair or replace the damaged section — and finish it for the price we agreed.",
    signs: [
      "Several drains slow or backing up at once",
      "The same blockage coming back after clearing",
      "Sewage smells inside or in the yard",
      "Soggy or sunken patches over the sewer line",
      "Gurgling toilets when other fixtures drain",
    ],
    includes: [
      { title: "Camera inspection", body: "A waterproof camera run through the line to find cracks, sags, offsets and root intrusion." },
      { title: "Root damage", body: "Roots cut out and root-damaged pipe replaced, so they can't keep breaking back in." },
      { title: "Section replacement", body: "Broken clay, cast-iron or concrete pipe dug out and replaced with new PVC." },
      { title: "Under-slab drains", body: "Drains beneath a slab rerouted, resized or reconnected when the original work was done wrong." },
    ],
    process: [
      "Clear the line if needed so the camera can pass",
      "Inspect the line and explain what the camera shows",
      "Give you a clear price for the repair or replacement",
      "Excavate, replace the damaged section and test the line",
    ],
    safety: "If sewage is backing up, stop using water in the building — every flush and faucet adds to the problem.",
    faqs: [
      {
        q: "Can roots really break a sewer pipe?",
        a: "Yes. Roots find the smallest crack or joint in clay and concrete pipe, grow inside and keep expanding. Clearing them helps for a while; replacing the damaged section stops it.",
      },
      {
        q: "Who is responsible for the sewer line — me or the city?",
        a: "Usually the pipe on your property is yours and the public sewer isn't. The camera inspection shows where the problem is, so you know who to call.",
      },
    ],
    related: ["drain-cleaning-hydro-jetting", "leak-water-line-repair", "bathroom-plumbing"],
  },
  {
    slug: "leak-water-line-repair",
    name: "Leak & Water Line Repair",
    need: "Leaks or water line problems",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "droplets",
    photo: "waterLineTrench",
    summary: "Leaks traced to the source and repaired, and failing water mains between the meter and the building replaced.",
    selectorBlurb:
      "We trace the leak to where it starts — often not where the water shows — then repair the pipe, or replace the water line from the meter if it has had its day.",
    intro:
      "Water is good at hiding where it comes from. A wet patch in the yard can be a split water main; a stain on the ceiling can start two rooms away. We find the actual source, fix it properly, and when the line from the street meter to your house is failing, we replace it.",
    signs: [
      "A water bill higher than your usage explains",
      "The meter moving with every faucet off",
      "Wet or soggy spots in the yard that never dry",
      "Damp patches or stains on walls and ceilings",
      "Low water pressure throughout the building",
    ],
    includes: [
      { title: "Leak tracing", body: "Meter checks and section-by-section isolation to find the source before digging or opening walls." },
      { title: "Pipe repairs", body: "Failed joints, split pipe and corroded sections repaired or replaced." },
      { title: "Water main replacement", body: "The line between the street meter and the building dug out and replaced." },
      { title: "Testing", body: "Every repair tested under pressure before trenches are backfilled or walls closed." },
    ],
    process: [
      "Confirm the leak at the meter and check visible pipework",
      "Isolate sections to pinpoint the source",
      "Explain the fix and give you a clear price",
      "Repair or replace the line once you approve, then test it",
    ],
    safety:
      "If water is escaping, turn off the main shutoff valve. Keep clear of water near outlets or light fittings, and only switch off power at the breaker panel if you can reach it safely and dry-handed.",
    faqs: [
      {
        q: "How do I know if my water main is leaking?",
        a: "Turn off every faucet and appliance and watch your water meter. If it keeps moving, water is going somewhere. A soggy patch between the meter and the house is a strong clue it's the main.",
      },
      {
        q: "Will you keep me informed during a water line replacement?",
        a: "Yes. We tell you before we arrive, explain everything before any work is done, and keep you updated from estimate to completion.",
      },
    ],
    related: ["sewer-line-repair", "water-heaters", "gas-line-repair"],
  },
  {
    slug: "water-heaters",
    name: "Water Heater Installs & Repairs",
    need: "Water heater problems",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "flame",
    photo: "gasWaterHeater",
    summary: "Gas and electric water heaters repaired or replaced — with an honest answer on which makes sense.",
    selectorBlurb:
      "We diagnose the fault, check the safety valves, and tell you straight whether a repair makes sense or it's time for a new heater — then install it properly.",
    intro:
      "Water heater trouble ranges from a quick part swap to a tank at the end of its life. We find out which, explain it plainly, and give you a clear price for the option that makes sense. New heaters go in on a proper stand and drain pan, with new supply and gas connections.",
    signs: [
      "No hot water, or it runs out fast",
      "Water around the base of the tank",
      "Popping or rumbling while it heats",
      "Rusty or discolored hot water",
      "Water dripping from the relief valve pipe",
    ],
    includes: [
      { title: "Diagnosis", body: "Burners, elements, thermostats and valves tested to find the real fault." },
      { title: "Repairs", body: "Failed parts replaced when the unit is otherwise sound." },
      { title: "Installation", body: "New gas or electric heaters installed with new connections, stand and drain pan." },
      { title: "Safety checks", body: "Relief valves, venting and gas connections checked every time." },
    ],
    process: [
      "Check supply, controls and safety devices",
      "Tell you whether repair is worth it — and why",
      "Give you a clear price for repair or replacement",
      "Do the work and run the heater through a full cycle",
    ],
    safety:
      "If the tank is leaking, turn off its cold supply and its power or gas. If you smell gas, leave the building and call your gas utility's emergency line from outside.",
    faqs: [
      {
        q: "Repair or replace — how do you decide?",
        a: "Age, the fault and the tank's condition. A failed thermostat on a newer unit is usually worth repairing; a leaking tank isn't. We'll show you what we found.",
      },
      {
        q: "Do you work on gas water heaters?",
        a: "Yes. Gas water heaters — and the gas lines that feed them — are part of our everyday work.",
      },
    ],
    related: ["gas-line-repair", "leak-water-line-repair", "commercial-plumbing"],
  },
  {
    slug: "gas-line-repair",
    name: "Gas Line Repair & Replacement",
    need: "Gas line repair",
    offered: true,
    audiences: ["residential", "commercial"],
    icon: "alert",
    photo: "pipeRuns",
    summary: "Leaking, corroded or damaged gas lines repaired or replaced, and new lines run to appliances.",
    selectorBlurb:
      "Gas line repairs and replacements by licensed plumbers — leaks found and fixed, old lines replaced, and every line pressure-tested before the gas goes back on.",
    intro:
      "Gas work is not a DIY job. Our licensed plumbers find and repair leaks, replace old or corroded gas piping, and run new lines for water heaters, ranges and dryers — then pressure-test everything before the gas is turned back on.",
    signs: [
      "A smell of gas near appliances or the meter",
      "A hissing sound near gas piping",
      "Corroded or damaged gas pipe",
      "A new gas appliance that needs a line",
      "A failed gas pressure test",
    ],
    includes: [
      { title: "Leak repair", body: "Leaking fittings and damaged sections found and repaired." },
      { title: "Line replacement", body: "Old, corroded or undersized gas piping replaced." },
      { title: "Appliance lines", body: "New lines and connections for water heaters, ranges, dryers and more." },
      { title: "Pressure testing", body: "Every line tested before the gas goes back on." },
    ],
    process: [
      "Make it safe and find the source of the problem",
      "Explain what needs doing and give you a clear price",
      "Repair or replace the line once you approve",
      "Pressure-test and relight appliances",
    ],
    safety:
      "If you smell gas, leave the building now — don't use light switches, phones or anything that could spark. Call your gas utility's emergency line or 911 from outside, then call us.",
    faqs: [
      {
        q: "I smell gas. Should I call you first?",
        a: "No — get everyone out and call your gas utility's emergency line or 911 from outside. Once it's safe, call us to find and repair the leak.",
      },
      {
        q: "Can you run a gas line for a new appliance?",
        a: "Yes. Tell us the appliance and where it's going when you request an estimate, and we'll plan the route and sizing.",
      },
    ],
    related: ["water-heaters", "leak-water-line-repair", "commercial-plumbing"],
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
        q: "My toilet has never flushed properly. Can you find out why?",
        a: "Yes. A toilet that has always flushed poorly often points to the drain or vent behind it rather than the toilet itself — we check both.",
      },
    ],
    related: ["bathroom-plumbing", "drain-cleaning-hydro-jetting", "water-heaters"],
  },
  {
    slug: "bathroom-plumbing",
    name: "Bathroom Plumbing",
    need: "Bathroom plumbing",
    offered: true,
    audiences: ["residential"],
    icon: "bath",
    photo: "bathroomStone",
    summary: "Bathroom drains, vents and fixtures put right — including under-slab drain work in Houston's slab-on-grade homes.",
    selectorBlurb:
      "From a toilet that's never flushed right to a full renovation, we check the drains and vents behind the fixtures and fix them properly — trenching the slab when it's needed.",
    intro:
      "Most Houston homes sit on a concrete slab, so bathroom drains run underneath it. When a previous renovation left a drain undersized or a vent disconnected, the fixtures never work properly. We find the fault, trench the slab where needed, and put the plumbing right.",
    signs: [
      "A toilet that has never flushed properly",
      "Slow drains in one bathroom only",
      "Gurgling or sewer smells after a renovation",
      "You're planning to move a toilet, shower or vanity",
    ],
    includes: [
      { title: "Drain and vent checks", body: "Drain sizes, falls and vent connections checked behind the fixtures." },
      { title: "Under-slab work", body: "The slab trenched to reroute, resize or reconnect drain lines." },
      { title: "Fixture install", body: "Showers, tubs, vanities, faucets and toilets connected and sealed." },
      { title: "Final testing", body: "Every fixture run and checked for leaks before we leave." },
    ],
    process: [
      "Find the real cause behind the fixtures",
      "Explain what we found and give you a clear price",
      "Do the drain, vent and slab work",
      "Reconnect fixtures and test everything",
    ],
    safety: "Send us photos or plans with your request — we'll flag anything that won't work before you order fixtures.",
    faqs: [
      {
        q: "Can I move my toilet to a different wall?",
        a: "Often — it depends on whether the drain under the slab can be rerouted and keep the fall it needs. We check this on the first visit.",
      },
    ],
    related: ["toilet-faucet-repairs", "sewer-line-repair", "drain-cleaning-hydro-jetting"],
  },
  {
    slug: "commercial-plumbing",
    name: "Commercial Plumbing",
    need: "Commercial plumbing",
    offered: true,
    audiences: ["commercial"],
    icon: "building",
    photo: "floorDrainCabling",
    summary: "Drain cleaning, jetting and repairs for restaurants, shops, offices and apartment complexes across Houston.",
    selectorBlurb:
      "For businesses, plumbing downtime costs trading time. We start from 5am, work around your operation and keep you updated.",
    intro:
      "When a business's plumbing fails, the cost isn't just the repair — it's the closed restroom or the kitchen that can't run. We start early, clear floor drains and grease-heavy lines, repair water and sewer lines, and keep you posted throughout.",
    signs: [
      "Recurring floor drain or kitchen line blockages",
      "Leaks affecting tenants or customers",
      "Water or sewer line problems on a property",
      "Water heaters struggling to keep up",
    ],
    includes: [
      { title: "Floor and kitchen drains", body: "Floor drains, grease-heavy kitchen lines and restroom drains cleared and jetted." },
      { title: "Water and sewer lines", body: "Lines across parking lots and common areas repaired or replaced." },
      { title: "Water heaters", body: "Commercial and multi-unit water heaters repaired and replaced." },
      { title: "Early starts", body: "From 5am, seven days a week, so work can finish before you open." },
    ],
    process: [
      "Agree access and timing that suit your business",
      "Assess the problem and give you a clear price",
      "Carry out the work with minimal disruption",
      "Explain what we did and anything to watch",
    ],
    safety: "If a leak affects customers or tenants, isolate the water to that area and keep people clear until we arrive.",
    faqs: [
      {
        q: "Can you work before we open?",
        a: "We open at 5am Monday to Saturday and 7am on Sunday, so early-morning visits are often possible. Tell us your hours when you get in touch.",
      },
    ],
    related: ["drain-cleaning-hydro-jetting", "sewer-line-repair", "water-heaters"],
  },
];

export const services = all.filter((s) => s.offered);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesFor = (a: Audience) => services.filter((s) => s.audiences.includes(a));

export const relatedServices = (s: { related: string[] }) =>
  s.related.map(getService).filter((x): x is Service => Boolean(x));

/** The estimate form's category list, in the customer's own words. */
export const serviceOptions = [...services.map((s) => s.need), "Something else"];
