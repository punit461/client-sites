import type { NextConfig } from "next";

/**
 * Static export with the URL prefix supplied at build time.
 *
 *   npm run build                     -> basePath "", every URL root-relative.
 *                                        This is what the school gets: upload
 *                                        out/ to any host, at a domain root.
 *   NEXT_PUBLIC_BASE_PATH=/x/y build  -> served under that sub-path. The repo
 *                                        build (tools/build.mjs) sets this so
 *                                        the project lands beside the others.
 *
 * Never hardcode basePath here — that single line is what keeps this folder
 * deliverable on its own. Images are local files under public/images and are
 * prefixed through src/lib/assets.ts for the same reason.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Required by output: "export" — there is no server to optimise images.
    // scripts/build-images.mjs does that work ahead of time instead.
    unoptimized: true,
  },
};

export default nextConfig;
