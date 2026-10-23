import type { GalleryItem } from "./types";

/**
 * The work gallery. Right now these are licensed stock photographs that show
 * the kinds of work the company does — they are labelled as such on the page
 * and carry no `caseStudy`.
 *
 * As the company photographs its own jobs, replace them. Add a `caseStudy`
 * only for a real job, written from the job record, with the customer's
 * agreement. Never invent a problem, a fix or an outcome.
 */
export const gallery: GalleryItem[] = [
  {
    photo: "plumberUnderBasin",
    category: "Residential repairs",
    title: "Basin waste and trap repair",
    caption: "Replacing and resealing the waste connection under a bathroom basin.",
    service: "leak-detection-pipe-repair",
  },
  {
    photo: "bathroomRoughIn",
    category: "Bathroom installations",
    title: "Bathroom rough-in",
    caption: "Supply and waste pipework routed through a stud wall before it is closed up.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "waterHeaterWrench",
    category: "Water heaters",
    title: "Water heater connections",
    caption: "Working on the pipe connections at the top of a hot water tank.",
    service: "water-heater-repair-installation",
  },
  {
    photo: "commercialKitchen",
    category: "Commercial",
    title: "Commercial kitchen plumbing",
    caption: "Dishwashing lines and pre-rinse fixtures in a commercial kitchen.",
    service: "faucet-fixture-installation",
  },
  {
    photo: "flushPlateInstall",
    category: "Bathroom installations",
    title: "Wall-hung toilet finish",
    caption: "Installing the flush plate for an in-wall toilet tank system.",
    service: "toilet-repair-replacement",
  },
  {
    photo: "plantRoom",
    category: "Commercial",
    title: "Plant room pipework",
    caption: "Insulated distribution pipework, valves and gauges in a plant room.",
    service: "preventive-plumbing-maintenance",
  },
  {
    photo: "bathroomStone",
    category: "Bathroom installations",
    title: "Finished stone bathroom",
    caption: "Wall-mounted faucet and rainfall shower in a stone-tiled bathroom.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "basinConnection",
    category: "Residential repairs",
    title: "Faucet supply connection",
    caption: "Tightening the supply connection beneath a bathroom basin.",
    service: "faucet-fixture-installation",
  },
];

export const galleryCategories = Array.from(new Set(gallery.map((g) => g.category)));
