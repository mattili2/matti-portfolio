/** Workers static assets max individual file size is 25 MiB. */
const LARGE_MEDIA_PATHS = new Set([
  "/videos/ignitcube.mov",
  "/videos/traces.mov",
]);

const FALLBACK_ORIGIN =
  process.env.NEXT_PUBLIC_LARGE_MEDIA_ORIGIN ??
  "https://matti-portfolio-six.vercel.app";

/**
 * Rewrite oversized media to an external origin when building for Cloudflare
 * (`NEXT_PUBLIC_CF_MEDIA_FALLBACK=1`). Local/Vercel keep relative `/videos/...`.
 */
export function mediaSrc(path: string): string {
  if (
    process.env.NEXT_PUBLIC_CF_MEDIA_FALLBACK === "1" &&
    LARGE_MEDIA_PATHS.has(path)
  ) {
    return `${FALLBACK_ORIGIN}${path}`;
  }
  return path;
}
