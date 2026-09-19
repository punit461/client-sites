import type { NextConfig } from "next";

/**
 * Static export with the URL prefix supplied at build time.
 *
 *   npm run build                     -> basePath "", every URL root-relative.
 *                                        This is what a client gets: upload
 *                                        out/ to any host, at a domain root.
 *   NEXT_PUBLIC_BASE_PATH=/x/y build  -> served under that sub-path. The repo
 *                                        build (tools/build.mjs) sets this so
 *                                        the project lands beside the others.
 *
 * Never hardcode basePath here — that single line is what keeps this folder
 * deliverable on its own.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Required by output: "export" — there is no server to optimise images.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
