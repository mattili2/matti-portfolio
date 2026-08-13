import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Minimal server bundle for Aliyun Docker (see Dockerfile). Unused by Vercel/CF.
  ...(process.env.DOCKER_BUILD === "1" ? { output: "standalone" as const } : {}),
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

// Cloudflare Workers bindings in `next dev` (no-op if not using bindings).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

