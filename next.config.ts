import type { NextConfig } from "next";

// GitHub Pages serves the site from https://jeremyhous.github.io/my-sustainable-menus/,
// so production builds live under that sub-path. `npm run dev` keeps using
// http://localhost:3000/ without it.
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Build a fully static site into `out/` (GitHub Pages can't run a Node.js server).
  output: "export",
  basePath: isProduction ? "/my-sustainable-menus" : "",
  // Emit /about/index.html instead of /about.html, which GitHub Pages serves at /about/.
  trailingSlash: true,
};

export default nextConfig;
