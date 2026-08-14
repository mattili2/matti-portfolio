/** Workers static assets max individual file size is 25 MiB. */
const LARGE_MEDIA_PATHS = new Set<string>([
  // Empty while files ship with the Worker. Set NEXT_PUBLIC_LARGE_MEDIA_ORIGIN
  // (R2/public CDN) and add paths here if anything exceeds the cap again.
]);

export function isVideoSrc(path: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(path);
}

export function isGifSrc(path: string): boolean {
  return /\.gif$/i.test(path);
}

/**
 * Rewrite oversized media to an external origin when building for Cloudflare
 * (`NEXT_PUBLIC_CF_MEDIA_FALLBACK=1`) **and** `NEXT_PUBLIC_LARGE_MEDIA_ORIGIN`
 * is set. Never fall back to a deleted host — a hanging origin makes the
 * whole page feel frozen.
 */
export function mediaSrc(path: string): string {
  const origin = process.env.NEXT_PUBLIC_LARGE_MEDIA_ORIGIN?.replace(/\/$/, "");
  if (
    origin &&
    process.env.NEXT_PUBLIC_CF_MEDIA_FALLBACK === "1" &&
    LARGE_MEDIA_PATHS.has(path)
  ) {
    return `${origin}${path}`;
  }
  return path;
}
