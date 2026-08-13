# Deploy: Cloudflare (CN + overseas) + Vercel backup

## Chosen architecture

| Role | Host | Why |
|------|------|-----|
| **Primary (CN + overseas)** | **Cloudflare Workers** via `@opennextjs/cloudflare` | One URL for both audiences; friend-validated CN access; keeps middleware + `next/image` |
| **Backup (overseas)** | Vercel | Already live; keep shipping as fallback |
| **Later / optional** | Mainland Aliyun + ICP + geo DNS | True mainland if CF still intermittent |

**Honesty:** Cloudflare is often better than Vercel in China, but **not guaranteed** — some CF IPs are still intermittent in CN. Still the right default for “one site, both regions” vs dual Aliyun.

**Do not use `output: 'export'` for this repo.** Blockers: `middleware.ts` locale redirect + `x-locale`, root `headers()`, dynamic `proj/[id]`, default `next/image`.

Locales: `/zh` and `/en` (repo `defaultLocale` = `zh`).

---

## Live URLs

### Source

- **GitHub:** https://github.com/mattili2/matti-portfolio (public, `main`)

### Cloudflare (primary)

- **Live:** https://matti-portfolio.yxi2nlii.workers.dev  
  (OpenNext → Workers; not `*.pages.dev` — same CN + overseas reach)
- Custom domain: attach `yuxinli.com` in Cloudflare dashboard when ready  
  (**Note:** GitHub + Cloudflare Git deploy does **not** by itself fix China blocking of CF IPs — custom domain / ICP / mainland still recommended if CN access is poor.)

### Vercel (overseas backup — do not delete)

- https://matti-portfolio-six.vercel.app
- https://matti-portfolio-mattili2s-projects.vercel.app

Keep international pushes to Vercel if useful; Cloudflare is the dual-audience host for now.

---

## Cloudflare deploy (this repo)

### A) Local / CLI (already used once)

Requires Cloudflare account + Wrangler auth once.

```bash
# one-time
npx wrangler login          # authorize in browser

# build + deploy (OpenNext → Workers; strips >25MiB videos)
npm run deploy

# optional: local Workers preview
npm run preview
```

Config files: `wrangler.jsonc`, `open-next.config.ts`, `public/_headers`. Worker name: `matti-portfolio`.

### B) Git-connected auto-deploy (Workers Builds) — one dashboard connect

Wrangler OAuth cannot finish Git linking via API (needs Workers Builds permissions + GitHub App). Connect once in the dashboard:

1. Open [Workers & Pages](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/workers-and-pages) → select **`matti-portfolio`**.
2. **Settings** → **Builds** → **Connect** → **GitHub** → authorize **Cloudflare Workers & Pages** for `mattili2/matti-portfolio`.
3. Build settings (OpenNext):
   - **Production branch:** `main`
   - **Build command:** `npm run deploy`  
     (runs `opennextjs-cloudflare build` + oversized-asset strip + deploy)  
     *Or* split if the UI wants separate fields: build = `NEXT_PUBLIC_CF_MEDIA_FALLBACK=1 npx opennextjs-cloudflare build && node scripts/strip-cf-oversized-assets.mjs`, deploy = `npx opennextjs-cloudflare deploy`
   - **Root directory:** `/` (repo root)
   - Worker name must stay **`matti-portfolio`** (matches `wrangler.jsonc`)
4. Save → push to `main` (or **Retry deployment**) to verify.

Direct settings link: [matti-portfolio → Settings](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/workers/services/view/matti-portfolio/production/settings)

**25 MiB asset limit:** `ignitcube.mov` / `traces.mov` exceed Workers’ per-file cap. On CF builds they are stripped from assets and `mediaSrc()` serves them from the Vercel origin (set `NEXT_PUBLIC_LARGE_MEDIA_ORIGIN` to override). Enable R2 later and move those videos onto Cloudflare for better CN delivery of large media.

Static assets in `public/` (~170MB) otherwise upload as Workers assets.

---

## Vercel (backup)

`git push` / `vercel --prod` as today. No change required for Cloudflare to be primary.

---

## Optional later — mainland / ICP

1. ICP 备案 if you need a mainland IP.
2. Aliyun 轻量 + Docker (`npm run build:docker`, see `Dockerfile` / `deploy/Caddyfile.example`).
3. Geo DNS: CN → mainland; rest → Cloudflare (or Vercel).

Same codebase; no static-export rewrite.

---

## Checklist

### You today

- [x] `npx wrangler login` (already authenticated as yxi2nlii@gmail.com)
- [x] `npm run deploy` → https://matti-portfolio.yxi2nlii.workers.dev
- [x] Push to GitHub → https://github.com/mattili2/matti-portfolio
- [x] Connect Worker **Builds** → GitHub (`mattili2/matti-portfolio` ↔ Worker `matti-portfolio`)
- [ ] Smoke `/zh` and `/en` from CN + overseas if possible
- [ ] Leave Vercel URL live as backup

**On next `git push` to `main`:** Cloudflare Workers Builds should clone the repo, run the configured build/deploy command (ideally `npm run deploy`), and promote a new Active Deployment on https://matti-portfolio.yxi2nlii.workers.dev. Watch **Deployments → Build history** in the dashboard (or GitHub check runs from the Cloudflare Workers & Pages app).

### Later

- [ ] Custom domain on Cloudflare (Workers → Settings → Domains & Routes → add `yuxinli.com` / `www`)
- [ ] Optional R2 cache / video CDN
- [ ] ICP + mainland only if CF access is still poor in CN
