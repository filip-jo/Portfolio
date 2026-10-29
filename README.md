# Portfolio

Personal portfolio for senior product design roles, in progress at filipjo.com/portfolio-1/.
It will replace the current site at filipjo.com/portfolio/ once finished (see
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

## Deploy (All-inkl via FTPS)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
mirrors `out/` to the server over encrypted FTP.

Deploys use a dedicated All-inkl FTP user whose directory is locked to the
`portfolio-1` folder (created in KAS → FTP). It can't reach the live
`/portfolio` or the root site, and the deploy deletes anything in that folder
that the build doesn't produce. Add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | the server KAS shows for the FTP user, e.g. `wXXXXXXX.kasserver.com` |
| `FTP_USERNAME` | the dedicated FTP user |
| `FTP_PASSWORD` | its password |

Never write these values into a file in this repo; it is public.

Before uploading, the workflow checks that the FTP folder is either empty or
contains `.deploy-target` (from `public/`, placed by every deploy). Otherwise it
stops, so a wrongly configured FTP user can't overwrite another site.

Links made with `next/link` get the base path prefix automatically. Plain
`src`/`href` paths to files in `public/` (images, `resume.pdf`) need it added by hand.

## Launch

To replace the current site at `/portfolio/`:

1. `next.config.ts`: set `basePath` to `"/portfolio"`.
2. `src/content/site.ts`: set `url` to `https://filipjo.com/portfolio/`.
3. `src/app/layout.tsx`: remove the `robots` noindex entry.
4. `public/.htaccess`: set `ErrorDocument 404 /portfolio/404.html`.
5. Back up the current `portfolio` folder on the server and empty it, change
   the FTP user's directory in KAS to `portfolio`, and deploy.
6. Optionally redirect `/portfolio-1/` to `/portfolio/` and remove the old folder.
