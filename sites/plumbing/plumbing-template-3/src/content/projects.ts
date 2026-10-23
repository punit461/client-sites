import type { Project, ProjectCategory } from "./types";

/**
 * A curated service gallery. These are licensed stock photographs showing the
 * kinds of work the company does — each entry describes what the photo shows
 * and what that kind of job involves, and none is presented as a customer's
 * job.
 *
 * Replace with the company's own photos as they come in. Add `caseStudy` only
 * for a real, verified job, written from the job record with the customer's
 * agreement — never invent the issue, the work or the outcome.
 */
export const projects: Project[] = [
  {
    slug: "basin-waste-repair",
    title: "Basin waste and trap repair",
    category: "Residential repairs",
    photo: "plumberUnderBasin",
    service: "leak-detection-pipe-repair",
    summary: "Resealing the waste connection beneath a bathroom basin.",
    involves: ["Isolating the supply and draining the trap", "Replacing worn seals or a cracked trap", "Re-making the waste connection", "Running the basin to check every joint"],
  },
  {
    slug: "bathroom-rough-in",
    title: "Bathroom rough-in",
    category: "Bathroom installations",
    photo: "roughIn",
    service: "bathroom-plumbing",
    summary: "Supply and waste pipework routed through a stud wall before it's closed up.",
    involves: ["Setting out fixture positions from the design", "Routing supply and waste lines with the right slope", "Securing and insulating pipes in the wall", "Pressure-testing before drywall goes on"],
  },
  {
    slug: "wall-hung-toilet",
    title: "Wall-hung toilet finish",
    category: "Bathroom installations",
    photo: "flushPlate",
    service: "toilet-faucet-repair",
    summary: "Fitting the flush plate for a wall-hung toilet with an in-wall tank.",
    involves: ["Checking the in-wall frame and tank", "Connecting the flush mechanism", "Fitting the flush plate level with the tiles", "Testing flush and refill"],
  },
  {
    slug: "water-heater-connections",
    title: "Water heater connections",
    category: "Water heater installations",
    photo: "waterHeater",
    service: "water-heater-services",
    summary: "Working on the pipe connections at the top of a hot water tank.",
    involves: ["Isolating power or fuel and the cold supply", "Making or renewing the connections", "Testing the relief valve", "Refilling and running a full heating cycle"],
  },
  {
    slug: "service-pipework",
    title: "Service pipework",
    category: "Pipe replacement",
    photo: "serviceMain",
    service: "pipe-installation-replacement",
    summary: "Large-bore flanged pipework and valves on a brick wall.",
    involves: ["Planning a shutdown window with the building's users", "Isolating and draining the section", "Replacing corroded pipe and fittings", "Recommissioning and pressure-testing"],
  },
  {
    slug: "ceiling-pipe-section",
    title: "Exposed pipe replacement",
    category: "Pipe replacement",
    photo: "ceilingPipe",
    service: "pipe-installation-replacement",
    summary: "Steel distribution pipe with a drain valve, hung from a commercial ceiling.",
    involves: ["Locating the failed section", "Cutting out and replacing the damaged run", "Supporting the new pipe properly", "Pressure-testing the repair"],
  },
  {
    slug: "commercial-kitchen",
    title: "Commercial kitchen plumbing",
    category: "Commercial plumbing",
    photo: "commercialKitchen",
    service: "drain-cleaning",
    summary: "Dishwashing lines and pre-rinse fixtures in a commercial kitchen.",
    involves: ["Scheduling around service hours", "Connecting dishwashers, sinks and pre-rinse faucets", "Checking grease-heavy waste lines", "A written record for the business's files"],
  },
  {
    slug: "plant-room",
    title: "Plant room check",
    category: "Commercial plumbing",
    photo: "plantRoom",
    service: "preventive-maintenance",
    summary: "Insulated pipework, valves and gauges in a building's plant room.",
    involves: ["Checking valves operate and are labeled", "Reading gauges and inspecting joints", "Noting corrosion or poor support", "Written summary, most important first"],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Residential repairs",
  "Bathroom installations",
  "Water heater installations",
  "Pipe replacement",
  "Commercial plumbing",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
