# Portfolio

Personal portfolio for senior product design roles, live at filipjo.com/portfolio/.
The domain root is a separate WordPress site and not part of this repo.

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
| `src/content/site.ts` | Name, about text, short bio, experience, skills, links |
| `src/content/projects.ts` | Case studies (order = overview and previous/next order) |
| `src/app/globals.css` | Design tokens: colors, type scale (display, heading, body, ui, label), radius, sidebar, content width |
| `src/components/AppShell.tsx` | Layout, mobile drawer; the sidebar fits its content and is vertically centred |
| `src/components/Sidebar.tsx` | Name, short bio and case list (case pages), contact |
| `src/app/template.tsx` | Page enter transition |
| `src/lib/ui.ts` | Shared hover/press styles for nav items and primary buttons |
| `next.config.ts` | Static export, `basePath: "/portfolio"` |
| `public/.htaccess` | Apache config for `/portfolio/`: HTTPS, clean URLs, caching, 404, redirects for retired cases |

## Deploy (All-inkl via FTPS)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
mirrors `out/` to the server over encrypted FTP.

Deploys use a dedicated All-inkl FTP user whose directory is locked to the
`portfolio` folder (KAS → FTP). It can't reach the WordPress site at the root, and the deploy deletes anything in that folder
that the build doesn't produce. Add these repository secrets
(Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | the server KAS shows for the FTP user, e.g. `wXXXXXXX.kasserver.com` |
| `FTP_USERNAME` | the dedicated FTP user |
| `FTP_PASSWORD` | its password |

Never write these values into a file in this repo; it is public.

Uploads happen in two passes: first the new hashed CSS/JS in `_next/`, then
the pages (deleting pages that are no longer built). Old files in `_next/` are
never deleted, so a page that is open during or before a deploy keeps its
styles and scripts. They are small; clear the server's `_next/` folder now and
then if it grows, right before a deploy.

Before uploading, the workflow checks that the FTP folder is either empty or
contains `.deploy-target` (from `public/`, placed by every deploy). Otherwise it
stops, so a wrongly configured FTP user can't overwrite another site.

Links made with `next/link` get the base path prefix automatically. Plain
`src`/`href` paths to files in `public/` (images, `resume.pdf`) need it added by hand.

## Launch history

The site was built at `/portfolio-1/` and launched at `/portfolio/` by switching
`basePath`, removing the noindex meta tag and pointing the FTP user at a new
`portfolio` folder. That real folder takes precedence over WordPress's virtual
`/portfolio/` page, which is left untouched in WordPress.
