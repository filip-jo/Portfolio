import type { NextConfig } from "next";

// The portfolio lives at filipjo.com/portfolio; the domain root is a separate
// WordPress site.
const basePath = "/portfolio";

const nextConfig: NextConfig = {
  basePath,
  // Exposed so plain asset paths (images in public/) can be prefixed; see src/lib/asset.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Static export: `next build` writes plain HTML/CSS/JS to `out/`,
  // which Apache on All-inkl serves directly (no Node runtime needed).
  output: "export",
  // Emit `/about/index.html` instead of `/about.html` so Apache resolves clean URLs.
  trailingSlash: true,
  images: {
    // The default image optimizer needs a server; serve images as-is for now.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
