import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config (no R2 incremental cache). Fine for a mostly-static portfolio.
export default defineCloudflareConfig();
