# Portfolio

Personal portfolio for senior product design roles, in progress at www.filipjo.com/portfolio-1/.
It will replace the current site at www.filipjo.com/portfolio/ once finished (see
[Launch](#launch)). The domain root is a separate site and not part of this repo.

**Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Motion · Lucide icons · Geist font

## Develop

```bash
npm install
npm run dev     # http://localhost:3000/portfolio-1
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
| `next.config.ts` | Static export, `basePath: "/portfolio-1"` |
| `public/.htaccess` | Apache config for `/portfolio-1/`: HTTPS, clean URLs, caching, 404 |

## Deploy (All-inkl via SSH)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
rsyncs `out/` to the server. Add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Example |
| --- | --- |
| `SSH_HOST` | `wXXXXXXX.kasserver.com` |
| `SSH_USER` | your All-inkl SSH user |
| `SSH_PRIVATE_KEY` | private key whose public key is in `~/.ssh/authorized_keys` on the server |
| `DEPLOY_PATH` | the `portfolio-1` folder inside the domain's document root, e.g. `/www/htdocs/wXXXXXXX/filipjo.com/portfolio-1` |

`rsync --delete` replaces everything in `DEPLOY_PATH`, so it must be the
`portfolio-1` folder, never the document root or the live `portfolio` folder.
Likewise, whatever deploys the root site must exclude these folders so it
doesn't wipe them.

Links made with `next/link` get the base path prefix automatically. Plain
`src`/`href` paths to files in `public/` (images, `resume.pdf`) need it added by hand.

## Launch

To replace the current site at `/portfolio/`:

1. `next.config.ts`: set `basePath` to `"/portfolio"`.
2. `src/content/site.ts`: set `url` to `https://www.filipjo.com/portfolio/`.
3. `src/app/layout.tsx`: remove the `robots` noindex entry.
4. `public/.htaccess`: set `ErrorDocument 404 /portfolio/404.html`.
5. Back up the current `portfolio` folder on the server, then point the
   `DEPLOY_PATH` secret at it and deploy.
6. Optionally redirect `/portfolio-1/` to `/portfolio/` and remove the old folder.
