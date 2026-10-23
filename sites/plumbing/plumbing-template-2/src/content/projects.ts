import type { Project, ProjectCategory } from "./types";

/**
 * The project showcase. Today it is a curated gallery of licensed stock
 * photography showing the kinds of work the company does — each entry says
 * what the photo shows and what that kind of job involves, and none claims to
 * be a specific customer's job.
 *
 * Replace with the company's own photos as they come in. Add `caseStudy` only
 * for a real, verified job, written from the job record with the customer's
 * agreement.
 */
export const projects: Project[] = [
  {
    slug: "basin-waste-repair",
    title: "Basin waste and trap repair",
    category: "Residential repairs",
    photo: "plumberUnderBasin",
    service: "leaking-pipes",
    summary: "Replacing and resealing the waste connection beneath a bathroom basin.",
    involves: [
      "Isolating the supply and draining the trap",
      "Replacing perished seals or a cracked trap",
      "Re-making the connection to the waste pipe",
      "Running the basin to check every joint under load",
    ],
  },
  {
    slug: "bathroom-rough-in",
    title: "Bathroom rough-in",
    category: "Bathroom installations",
    photo: "bathroomRoughIn",
    service: "bathroom-plumbing",
    summary: "New supply and waste pipework routed through a stud wall before it's closed up.",
    involves: [
      "Setting out fixture positions against the bathroom design",
      "Routing supply lines and waste with the correct falls",
      "Insulating and securing pipework inside the wall",
      "Pressure-testing before drywall goes on",
    ],
  },
  {
    slug: "water-heater-connections",
    title: "Water heater connections",
    category: "Water heater work",
    photo: "waterHeaterWrench",
    service: "water-heaters",
    summary: "Working on the pipe connections at the top of a hot water tank.",
    involves: [
      "Isolating power or fuel and the cold supply",
      "Checking or replacing connections and valves",
      "Testing the temperature and pressure relief valve",
      "Refilling, purging air and running a full heating cycle",
    ],
  },
  {
    slug: "commercial-kitchen",
    title: "Commercial kitchen plumbing",
    category: "Commercial plumbing",
    photo: "commercialKitchen",
    service: "commercial-plumbing",
    summary: "Dishwashing lines and pre-rinse fixtures in a commercial kitchen.",
    involves: [
      "Scheduling around service so the kitchen keeps running",
      "Connecting dishwashers, sinks and pre-rinse faucets",
      "Checking grease-heavy waste lines for build-up",
      "Leaving a written record for the business's files",
    ],
  },
  {
    slug: "wall-hung-toilet",
    title: "Wall-hung toilet finish",
    category: "Bathroom installations",
    photo: "flushPlateInstall",
    service: "toilet-faucet-repairs",
    summary: "Fitting the flush plate for a wall-hung toilet with an in-wall tank.",
    involves: [
      "Checking the in-wall frame and tank before finishing",
      "Connecting the flush mechanism through the access opening",
      "Fitting the flush plate flush to the tiles",
      "Testing flush and refill repeatedly",
    ],
  },
  {
    slug: "plant-room-pipework",
    title: "Plant room pipework",
    category: "Commercial plumbing",
    photo: "plantRoom",
    service: "general-maintenance",
    summary: "Insulated distribution pipework, valves and gauges in a building's plant room.",
    involves: [
      "Checking valves operate and are labeled",
      "Reading gauges and checking pumps and joints",
      "Noting corrosion, weeping or poor support",
      "Written report with prioritized recommendations",
    ],
  },
  {
    slug: "service-main-replacement",
    title: "Service pipework",
    category: "Pipe replacement",
    photo: "serviceMain",
    service: "leaking-pipes",
    summary: "Large-bore flanged water pipework and valves on a brick wall.",
    involves: [
      "Planning a shutdown window with the building's users",
      "Isolating and draining the affected section",
      "Replacing corroded pipe and fittings",
      "Recommissioning and pressure-testing",
    ],
  },
  {
    slug: "under-sink-repair",
    title: "Under-sink supply repair",
    category: "Residential repairs",
    photo: "basinConnection",
    service: "toilet-faucet-repairs",
    summary: "Tightening and resealing the supply connection beneath a basin.",
    involves: [
      "Finding which connection is weeping",
      "Replacing worn washers or flexible connectors",
      "Fitting isolation valves where missing",
      "Checking for drips with the faucet running",
    ],
  },
  {
    slug: "copper-pipe-section",
    title: "Exposed pipe replacement",
    category: "Pipe replacement",
    photo: "ceilingPipework",
    service: "leaking-pipes",
    summary: "Steel distribution pipe with a drain valve, hung from a commercial ceiling.",
    involves: [
      "Locating the failed section and planning access",
      "Cutting out and replacing the damaged run",
      "Supporting the new pipe properly",
      "Pressure-testing the repair",
    ],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Residential repairs",
  "Bathroom installations",
  "Water heater work",
  "Pipe replacement",
  "Commercial plumbing",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
