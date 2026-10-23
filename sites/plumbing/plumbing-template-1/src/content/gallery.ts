import type { GalleryItem } from "./types";

/**
 * The work gallery: Blue Diamond Plumbing's own photos, from its Google
 * Business Profile. Captions describe what each photo shows — nothing more.
 *
 * Add a `caseStudy` only for a real job, written from the job record, with the
 * customer's agreement. Never invent a problem, a fix or an outcome. Mark any
 * stock photo added here with `stock: true` so the page labels it.
 */
export const gallery: GalleryItem[] = [
  {
    photo: "bathroomTub",
    category: "Bathroom remodels",
    title: "Curbless shower and freestanding tub",
    caption: "A finished bathroom with a walk-in shower, linear drain and freestanding soaking tub.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "yardExcavation",
    category: "Drains & sewer lines",
    title: "Underground line replacement",
    caption: "The crew trenching across a front yard to reach an underground line.",
    service: "sewer-line-inspection-repair",
  },
  {
    photo: "subwayShower",
    category: "Bathroom remodels",
    title: "Walk-in shower and new toilet",
    caption: "Subway-tiled shower with matte black fixtures, a linear drain and a newly fitted toilet.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "doubleVanity",
    category: "Repairs & fixtures",
    title: "Double vanity faucets",
    caption: "Matte black widespread faucets installed on a new double vanity.",
    service: "faucet-fixture-installation",
  },
  {
    photo: "pvcDrainCleanout",
    category: "Drains & sewer lines",
    title: "New drain line with cleanout",
    caption: "A section of 3-inch PVC drain with a cleanout fitting, coupled to the existing pipe.",
    service: "drain-cleaning-blockage-removal",
  },
  {
    photo: "showerPanRoughIn",
    category: "Bathroom remodels",
    title: "Shower base rough-in",
    caption: "A new mortar shower base and drain, set before the walls are closed and tiled.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "clawfootShower",
    category: "Bathroom remodels",
    title: "Clawfoot tub and glass shower",
    caption: "A primary bathroom with a clawfoot tub and a frameless glass shower enclosure.",
    service: "bathroom-plumbing-renovations",
  },
  {
    photo: "washerBoxValves",
    category: "Repairs & fixtures",
    title: "Leaking washer valves",
    caption: "Worn washing-machine supply valves dripping inside the outlet box — a slow leak that is easy to miss.",
    service: "leak-detection-pipe-repair",
  },
  {
    photo: "barSinkFaucet",
    category: "Repairs & fixtures",
    title: "Corroded bar-sink faucet",
    caption: "A worn, corroded faucet on a small stainless-steel bar sink, due for replacement.",
    service: "faucet-fixture-installation",
  },
];

export const galleryCategories = Array.from(new Set(gallery.map((g) => g.category)));
