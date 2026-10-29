# Portfolio

Personal portfolio for senior product design roles, served from www.filipjo.com.

**Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Motion · Lucide icons · Geist font

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
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
| `public/.htaccess` | Apache config: HTTPS, clean URLs, caching, 404 |

## Deploy (All-inkl via SSH)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
rsyncs `out/` to the server. Add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Example |
| --- | --- |
| `SSH_HOST` | `wXXXXXXX.kasserver.com` |
| `SSH_USER` | your All-inkl SSH user |
| `SSH_PRIVATE_KEY` | private key whose public key is in `~/.ssh/authorized_keys` on the server |
| `DEPLOY_PATH` | the domain's document root, e.g. `/www/htdocs/wXXXXXXX/filipjo.com` |

`rsync --delete` replaces everything in `DEPLOY_PATH`, so point it at a folder
that only holds this site.
