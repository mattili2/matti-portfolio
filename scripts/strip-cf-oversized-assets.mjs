#!/usr/bin/env node
/**
 * Cloudflare Workers rejects static assets > 25 MiB.
 * Delete any leftover oversized files after OpenNext copies `public/`.
 * Oversized paths can be served from NEXT_PUBLIC_LARGE_MEDIA_ORIGIN instead.
 */
import fs from "fs";
import path from "path";

const MAX_BYTES = 25 * 1024 * 1024;
const assetsRoot = path.join(process.cwd(), ".open-next", "assets");

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      walk(file);
      continue;
    }
    if (stat.size > MAX_BYTES) {
      const rel = path.relative(assetsRoot, file);
      fs.unlinkSync(file);
      console.log(`stripped oversized CF asset (${stat.size} bytes): ${rel}`);
    }
  }
}

walk(assetsRoot);
