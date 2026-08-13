#!/usr/bin/env node
/**
 * Cloudflare Workers rejects static assets > 25 MiB.
 * Strip known oversized files after OpenNext build; mediaSrc() serves them
 * from Vercel (or NEXT_PUBLIC_LARGE_MEDIA_ORIGIN) instead.
 */
import fs from "fs";
import path from "path";

const assetsRoot = path.join(process.cwd(), ".open-next", "assets");
const oversized = ["videos/ignitcube.mov", "videos/traces.mov"];

for (const rel of oversized) {
  const file = path.join(assetsRoot, rel);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`stripped oversized CF asset: ${rel}`);
  }
}
