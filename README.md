# Portfolio

Personal portfolio for senior product design roles, served from www.filipjo.com/portfolio/.
The domain root (www.filipjo.com) is a separate site and not part of this repo.

**Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Motion · Lucide icons · Geist font

## Develop

```bash
npm install
npm run dev     # http://localhost:3000/portfolio
npm run build   # static site in out/
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | Name, intro, about, experience, links |
| `src/content/projects.ts` | Case studies (order = sidebar order) |
| `src/app/globals.css` | Design tokens: colors, radius, sidebar width, content width |
| `src/components/AppShell.tsx` | Sidebar + content layout, mobile drawer |
| `src/components/Sidebar.tsx` | Navigation, availability status, contact |
| `src/app/template.tsx` | Page enter transition |
| `next.config.ts` | Static export, `basePath: "/portfolio"` |
| `public/.htaccess` | Apache config for `/portfolio/`: HTTPS, clean URLs, caching, 404 |

## Deploy (All-inkl via SSH)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
rsyncs `out/` to the server. Add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Example |
| --- | --- |
| `SSH_HOST` | `wXXXXXXX.kasserver.com` |
| `SSH_USER` | your All-inkl SSH user |
| `SSH_PRIVATE_KEY` | private key whose public key is in `~/.ssh/authorized_keys` on the server |
| `DEPLOY_PATH` | the `portfolio` folder inside the domain's document root, e.g. `/www/htdocs/wXXXXXXX/filipjo.com/portfolio` |

`rsync --delete` replaces everything in `DEPLOY_PATH`, so it must be the
`portfolio` folder, never the document root. Likewise, whatever deploys the root
site must exclude `/portfolio/` so it doesn't wipe this one.

Links made with `next/link` get the `/portfolio` prefix automatically. Plain
`src`/`href` paths to files in `public/` (images, `resume.pdf`) need it added by hand.
