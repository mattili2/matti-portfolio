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

### Cloudflare (primary)

- **Live:** https://matti-portfolio.yxi2nlii.workers.dev  
  (OpenNext → Workers; not `*.pages.dev` — same CN + overseas reach)
- Custom domain: attach `yuxinli.com` in Cloudflare dashboard when ready

### Vercel (overseas backup — do not delete)

- https://matti-portfolio-six.vercel.app
- https://matti-portfolio-mattili2s-projects.vercel.app

Keep international pushes to Vercel if useful; Cloudflare is the dual-audience host for now.

---

## Cloudflare deploy (this repo)

Requires Cloudflare account + Wrangler auth once.

```bash
# one-time
npx wrangler login          # authorize in browser

# build + deploy (OpenNext → Workers)
npm run deploy              # = opennextjs-cloudflare build && opennextjs-cloudflare deploy

# optional: local Workers preview
npm run preview
```

Config files: `wrangler.jsonc`, `open-next.config.ts`, `public/_headers`. Worker name: `matti-portfolio`.

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
- [ ] Smoke `/zh` and `/en` from CN + overseas if possible
- [ ] Leave Vercel URL live as backup

### Later

- [ ] Custom domain on Cloudflare
- [ ] Optional R2 cache / video CDN
- [ ] ICP + mainland only if CF access is still poor in CN
