import type { Project, ProjectCategory } from "./types";

/**
 * The project showcase: Tx-Star Plumbing's own photos, from its Google
 * Business Profile. Each entry says what the photo shows and what that kind of
 * job involves — none claims to be a specific customer's job.
 *
 * Add `caseStudy` only for a real, verified job, written from the job record
 * with the customer's agreement. Mark any stock photo added here with
 * `stock: true` so the page labels it.
 */
export const projects: Project[] = [
  {
    slug: "sewer-line-section-replacement",
    title: "Sewer line section replacement",
    category: "Sewer & water lines",
    photo: "sewerPipeRepair",
    service: "sewer-line-repair",
    summary: "Two of our plumbers in a deep trench, fitting new PVC sewer pipe to the existing line.",
    involves: [
      "Locating the damaged section with a camera inspection",
      "Excavating down to the line",
      "Cutting out the broken or root-damaged pipe",
      "Fitting new PVC and testing before backfilling",
    ],
  },
  {
    slug: "yard-cleanout-drain-clearing",
    title: "Main line clearing from the yard cleanout",
    category: "Drain cleaning",
    photo: "drainMachineYard",
    service: "drain-cleaning-hydro-jetting",
    summary: "A drain machine on the lawn, ready to clear the main line through a yard cleanout.",
    involves: [
      "Finding and opening the yard cleanout",
      "Running a cable sized to the line",
      "Flushing the line to confirm it drains freely",
      "Recommending a camera inspection if blockages keep returning",
    ],
  },
  {
    slug: "water-line-replacement",
    title: "Water line replacement",
    category: "Sewer & water lines",
    photo: "waterLineTrench",
    service: "leak-water-line-repair",
    summary: "Replacing a buried water line in a trench beside an apartment complex parking lot.",
    involves: [
      "Tracing the leak and confirming the line has failed",
      "Trenching along the line's route",
      "Laying and connecting the new line",
      "Pressure-testing before backfilling",
    ],
  },
  {
    slug: "gas-water-heater-install",
    title: "Gas water heater installation",
    category: "Water heaters",
    photo: "gasWaterHeater",
    service: "water-heaters",
    summary: "A new gas water heater on a stand and drain pan, with new supply lines and gas connection.",
    involves: [
      "Draining and removing the old heater",
      "Setting the new heater on a stand and drain pan",
      "Connecting water, gas and venting",
      "Testing the relief valve and running a full heating cycle",
    ],
  },
  {
    slug: "commercial-floor-drain",
    title: "Commercial floor drain cabling",
    category: "Commercial work",
    photo: "floorDrainCabling",
    service: "commercial-plumbing",
    summary: "Feeding a drain cable into a blocked floor drain on a tiled commercial floor.",
    involves: [
      "Scheduling around the business's opening hours",
      "Cabling or jetting the floor drain and branch line",
      "Clearing grease and debris from the trap",
      "Running water to confirm the drain flows freely",
    ],
  },
  {
    slug: "business-drain-call",
    title: "Drain call at a business",
    category: "Commercial work",
    photo: "nightDrainCall",
    service: "drain-cleaning-hydro-jetting",
    summary: "A drain machine set up at a business's back door, with our van parked outside.",
    involves: [
      "Arriving early to work before the business opens",
      "Clearing the line from the nearest cleanout",
      "Checking every fixture on the line drains",
      "Explaining the cause and how to prevent a repeat",
    ],
  },
];

export const projectCategories: ProjectCategory[] = ["Drain cleaning", "Sewer & water lines", "Water heaters", "Commercial work"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
