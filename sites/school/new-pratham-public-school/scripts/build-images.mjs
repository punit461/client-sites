/**
 * Turns the scraped originals in source/ into web-sized files under public/
 * and writes src/data/generated/images.json describing them.
 *
 *   node scripts/build-images.mjs
 *
 * Run it again whenever the school sends new photos: drop the originals into
 * source/website-content/assets/... (or extend the lists below) and rebuild.
 *
 * Only images the school itself published are processed. The Google Maps
 * photos in source/google-maps-content/ were uploaded by members of the
 * public and are not used on the site — see README.md.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "source", "website-content");
const ASSETS = path.join(SRC, "assets");
const OUT = path.join(ROOT, "public", "images");
const DATA = path.join(ROOT, "src", "data", "generated", "images.json");

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[“”"'’‘✨]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "album";

/** Resize to fit within `max` px on the long edge; never upscale. */
async function emit(srcFile, outRel, max, quality = 80) {
  const outFile = path.join(OUT, outRel);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const image = sharp(srcFile, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const pipeline = image.resize({ width: max, height: max, fit: "inside", withoutEnlargement: true });
  const info = outRel.endsWith(".png")
    ? await pipeline.png({ compressionLevel: 9 }).toFile(outFile)
    : await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outFile);
  return {
    src: `/images/${outRel.replace(/\\/g, "/")}`,
    width: info.width,
    height: info.height,
    originalWidth: meta.width,
    originalHeight: meta.height,
  };
}

const result = { gallery: [], achievements: {}, people: {}, campus: {}, videos: {} };
let count = 0;

// ---------------------------------------------------------------- gallery
const albums = JSON.parse(fs.readFileSync(path.join(SRC, "photo-gallery-albums.json"), "utf8"));
const seen = new Set();
for (const album of albums) {
  if (!album.images.length) continue;
  let albumSlug = slug(album.title);
  while (seen.has(albumSlug)) albumSlug += "-2";
  seen.add(albumSlug);
  const images = [];
  for (const rel of album.images) {
    const file = path.join(ASSETS, rel);
    if (!fs.existsSync(file)) {
      console.warn("missing", rel);
      continue;
    }
    const base = path.basename(rel).replace(/\.[^.]*$/, "").replace(/[^a-z0-9]/gi, "");
    const full = await emit(file, path.join("gallery", `${base}.jpg`), 1600, 78);
    const thumb = await emit(file, path.join("gallery", "thumbs", `${base}.jpg`), 640, 72);
    images.push({ ...full, thumb: thumb.src, thumbWidth: thumb.width, thumbHeight: thumb.height });
    count += 2;
  }
  result.gallery.push({ title: album.title, slug: albumSlug, images });
}

// ----------------------------------------------------------- achievements
for (const f of fs.readdirSync(path.join(ASSETS, "images", "achievements"))) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const key = f.replace(/\.[^.]*$/, "");
  result.achievements[key] = await emit(path.join(ASSETS, "images", "achievements", f), path.join("achievements", `${key}.jpg`), 1200, 78);
  count += 1;
}

// ----------------------------------------------------------------- people
for (const who of ["chairman", "trustee", "principal"]) {
  result.people[who] = await emit(path.join(ASSETS, "images", `${who}.jpeg`), path.join("people", `${who}.jpg`), 800, 80);
  count += 1;
}

// ----------------------------------------------------------------- campus
result.campus.building = await emit(path.join(ASSETS, "images", "school1.jpg"), path.join("campus", "building.jpg"), 1800, 80);
count += 1;
for (let i = 1; i <= 6; i += 1) {
  const name = fs.readdirSync(path.join(ASSETS, "newpratham")).find((f) => f.startsWith(`carousal${i}.`));
  if (!name) continue;
  result.campus[`moment${i}`] = await emit(path.join(ASSETS, "newpratham", name), path.join("campus", `moment-${i}.jpg`), 1600, 78);
  count += 1;
}
result.campus.butterfly = await emit(path.join(ASSETS, "newpratham", "butterflykid1.png"), path.join("campus", "butterfly-kid.png"), 900);
count += 1;

// ----------------------------------------------------------------- videos
const videos = JSON.parse(fs.readFileSync(path.join(SRC, "video-gallery.json"), "utf8"));
for (const v of videos) {
  const thumb = path.join(ASSETS, "video-thumbnails", `${v.youtubeId}.jpg`);
  if (!fs.existsSync(thumb)) continue;
  result.videos[v.youtubeId] = await emit(thumb, path.join("videos", `${v.youtubeId}.jpg`), 640, 78);
  count += 1;
}

fs.mkdirSync(path.dirname(DATA), { recursive: true });
fs.writeFileSync(DATA, `${JSON.stringify(result, null, 2)}\n`);

const bytes = (dir) => {
  let total = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    total += e.isDirectory() ? bytes(f) : fs.statSync(f).size;
  }
  return total;
};
console.log(`wrote ${count} files, ${(bytes(OUT) / 1e6).toFixed(1)} MB under public/images, ${result.gallery.length} albums`);
