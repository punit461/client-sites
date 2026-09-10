import type { NextConfig } from "next";

/**
 * The dashboard owns the root of the published bundle; every site sits in a
 * folder beneath it. basePath comes from the build so the same app works at a
 * domain root and under a GitHub Pages project path.
 *
 *   npm run build                              -> "/"
 *   NEXT_PUBLIC_BASE_PATH=/client-sites build   -> "/client-sites"  (tools/build.mjs)
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
