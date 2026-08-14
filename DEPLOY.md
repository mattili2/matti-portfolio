# Deploy: Cloudflare (CN + overseas)

## Chosen architecture

| Role | Host | Why |
|------|------|-----|
| **Primary (CN + overseas)** | **Cloudflare Workers** via `@opennextjs/cloudflare` | One URL for both audiences; friend-validated CN access; keeps middleware + `next/image` |
| **Later / optional** | Mainland Aliyun + ICP + geo DNS | True mainland if CF still intermittent |

**Honesty:** Cloudflare is often better than pure overseas hosts in China, but **not guaranteed** — some CF IPs are still intermittent in CN. Still the right default for “one site, both regions” vs dual Aliyun.

**Do not use `output: 'export'` for this repo.** Blockers: `middleware.ts` locale redirect + `x-locale`, root `headers()`, dynamic `proj/[id]`, default `next/image`.

Locales: `/zh` and `/en` (repo `defaultLocale` = `zh`).

---

## Live URLs

### Source

- **GitHub:** https://github.com/mattili2/matti-portfolio (public, `main`)

### Cloudflare (only production host)

- **Live:** https://matti-portfolio.yxi2nlii.workers.dev  
  (OpenNext → Workers; not `*.pages.dev` — same CN + overseas reach)
- **Custom domain (Worker already attached):** https://liyuxin.work and https://www.liyuxin.work  
  Zone is on Cloudflare but **pending** until Aliyun nameservers are switched (see below).  
  (**Note:** Custom domain does **not** by itself fix China blocking of CF IPs — ICP / mainland still recommended if CN access is poor.)

Vercel project `matti-portfolio` was deleted (aliases like `*.vercel.app` are gone). Use Cloudflare only.

---

## Cloudflare deploy (this repo)

### A) Local / CLI (already used once)

Requires Cloudflare account + Wrangler auth once.

```bash
# one-time
npx wrangler login          # authorize in browser

# build + deploy (OpenNext → Workers)
npm run deploy

# optional: local Workers preview
npm run preview
```

Config files: `wrangler.jsonc`, `open-next.config.ts`, `public/_headers`. Worker name: `matti-portfolio`.

### B) Git-connected auto-deploy (Workers Builds) — one dashboard connect

Wrangler OAuth cannot finish Git linking via API (needs Workers Builds permissions + GitHub App). Connect once in the dashboard:

1. Open [Workers & Pages](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/workers-and-pages) → select **`matti-portfolio`**.
2. **Settings** → **Builds** → **Connect** → **GitHub** → authorize **Cloudflare Workers & Pages** for `mattili2/matti-portfolio`.
3. Build settings — **use the two-step scripts** (Workers Builds always runs a Deploy step after Build):
   - **Production branch:** `main`
   - **Build command:** `npm run cf:build`
   - **Deploy command:** `npm run cf:deploy`  
     Do **not** put `/` here. Do **not** set Deploy to `npx wrangler deploy` if Build already ran `npm run deploy` — that double-deploys and often marks the Git build **failed** even though the Worker is already live.
   - **Root directory:** leave **empty** (repo root). Empty ≠ `/`. Putting `/` in Deploy command is a common false-failure.
   - Worker name must stay **`matti-portfolio`** (matches `wrangler.jsonc`)
4. Save → push to `main` (or **Retry deployment**) to verify.

Direct settings link: [matti-portfolio → Settings](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/workers/services/view/matti-portfolio/production/settings)

**Why dashboard can say Failed while the site still opens:** Build command `npm run deploy` already uploaded the Worker. The extra Deploy step then runs `/` or a second `wrangler deploy` without `.open-next` and fails. The previous successful upload stays on `liyuxin.work`.

**Media:** Demo films are H.264 MP4 under the Workers 25 MiB cap, so they ship with the Worker. Whale UI demos are MP4 (not 10–22MB GIFs). If a file is ever >25 MiB again, `scripts/strip-cf-oversized-assets.mjs` removes it; set `NEXT_PUBLIC_LARGE_MEDIA_ORIGIN` to an R2 public URL. R2 is **not enabled** on this account yet — enable once at [R2 Overview](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/r2/overview).

---

## Custom domain: `liyuxin.work` (Aliyun → Cloudflare NS)

**Best path for Workers custom domains:** the zone must live on Cloudflare (full setup), then Aliyun only holds the registrar and points NS at Cloudflare. Keeping DNS at Aliyun (CNAME to `workers.dev`) is a weaker fit — apex + Worker custom domains expect the Cloudflare zone.

**Already done (API, 2026-08-14):**

- Cloudflare zone `liyuxin.work` exists (`pending`)
- Worker `matti-portfolio` custom domains: `liyuxin.work` + `www.liyuxin.work`
- Assigned NS (copy these, do not guess others):
  - `braelyn.ns.cloudflare.com`
  - `justin.ns.cloudflare.com`
- Current registrar NS (Aliyun/HiChina): `dns29.hichina.com` / `dns30.hichina.com`

### 1) Aliyun — change nameservers

If 阿里云解析 already has records (MX/email, extra hosts), copy them into Cloudflare DNS **before** switching NS.

1. Open [阿里云域名控制台](https://dc.console.aliyun.com/) → **域名列表**
2. `liyuxin.work` → **管理**
3. Left nav **DNS修改** (sometimes labeled **DNS服务器**) → **修改DNS服务器**
4. Choose non-Aliyun DNS / custom nameservers
5. Replace HiChina with:
   - `braelyn.ns.cloudflare.com`
   - `justin.ns.cloudflare.com`
6. Save. Aliyun often says it takes **24–48h**; in practice it is often minutes–a few hours.

### 2) Cloudflare — zone + Worker (already added; for dashboard reference)

1. [Add site](https://dash.cloudflare.com/) → **Add a domain** → `liyuxin.work` (Free plan is enough) → copy the 2 NS if you ever re-add the zone
2. Worker: [matti-portfolio → Settings → Domains & Routes](https://dash.cloudflare.com/006b703c9aa25f1952e83587c64da161/workers/services/view/matti-portfolio/production/settings) → **Add** `liyuxin.work` and `www.liyuxin.work`

Wrangler has **no** `domains` command; binding is dashboard/API (or `routes` with `"custom_domain": true` in `wrangler.jsonc`, already set).

### 3) Wait for

| What | Expect |
|------|--------|
| Zone status | Cloudflare Overview: `Pending` → `Active` after the registry publishes the new NS |
| HTTPS | Universal SSL / Worker cert: often 15 min–a few hours after the zone is active |
| `www` + apex | Both should serve the same Worker once DNS + SSL are up |

Until NS propagate, https://matti-portfolio.yxi2nlii.workers.dev stays the working URL.

**CN warning:** Binding `liyuxin.work` does **not** guarantee mainland access. Cloudflare anycast IPs can still be intermittent in CN; ICP + a mainland origin is the only reliable CN path.

---

## Optional later — mainland / ICP

1. ICP 备案 if you need a mainland IP.
2. Aliyun 轻量 + Docker (`npm run build:docker`, see `Dockerfile` / `deploy/Caddyfile.example`).
3. Geo DNS: CN → mainland; rest → Cloudflare.

Same codebase; no static-export rewrite.

---

## Checklist

### You today

- [x] `npx wrangler login` (already authenticated as yxi2nlii@gmail.com)
- [x] `npm run deploy` → https://matti-portfolio.yxi2nlii.workers.dev
- [x] Push to GitHub → https://github.com/mattili2/matti-portfolio
- [x] Connect Worker **Builds** → GitHub (`mattili2/matti-portfolio` ↔ Worker `matti-portfolio`)
- [x] Delete Vercel project `matti-portfolio` (aliases gone)
- [ ] Smoke `/zh` and `/en` from CN + overseas if possible
- [x] Compress demo videos + Whale GIFs to H.264 MP4 (ship with Worker; no dead Vercel origin)
- [ ] Dashboard Builds: **Build** `npm run cf:build`, **Deploy** `npm run cf:deploy`, Root empty (so Git status is green)

**On `git push` to `main`:** Cloudflare Workers Builds clones the repo, runs **Build** then **Deploy**. Watch **Deployments → Build history**. If Build is `npm run deploy` and Deploy is `/`, the site can be live while the check is red.

**Verified 2026-08-14:** Git Builds can still show **Failed** while https://liyuxin.work stays up. That is the extra Deploy step (`/` or a second `wrangler deploy`) after `npm run deploy` already published the Worker. Fix: Build = `npm run cf:build`, Deploy = `npm run cf:deploy`, Root empty. Then Retry.

### Later

- [x] Worker custom domains attached: `liyuxin.work` + `www.liyuxin.work`
- [ ] Aliyun NS → `braelyn.ns.cloudflare.com` / `justin.ns.cloudflare.com` (zone still `pending`)
- [ ] Confirm https://liyuxin.work HTTPS after NS + SSL
- [ ] Optional R2 (enable in dashboard first; not required while MP4s are under 25 MiB)
- [ ] ICP + mainland only if CF access is still poor in CN
