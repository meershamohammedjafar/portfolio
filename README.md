# Meersha Jafar, portfolio

Personal site of an interactive and computer vision engineer based in Dubai. It shows three kiosk projects (one Unreal Engine prototype, two concepts in spec), a short profile, and the ways to get in touch.

Built with Next.js 15 (App Router), React 19 and plain JavaScript. No Tailwind, no component library: one global stylesheet in `app/globals.css`. Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis). Fonts are Archivo and IBM Plex Mono, self-hosted through `next/font`.

## Run it locally

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. A production build writes the whole site as static files into `out/`:

```bash
npm run build
```

## Where things live

| Path | What it is |
| --- | --- |
| `data/projects.js` | All content: the three projects, the site identity, contact details. Edit this to change what the site says. |
| `app/` | Routes: `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, plus the root layout and global CSS. |
| `components/` | The pieces the routes are built from (see below). |
| `public/images`, `public/video` | Thumbnails, portraits, the Nissan capture videos, contact badges. |

Adding a project means adding one object to the `projects` array in `data/projects.js` and dropping its images into `public/images`. Nothing in `components/` needs to change.

## What the components do

- `FeaturedSequence` pins the home page while each project card flies in, holds and releases, driven purely by scroll position, so scrolling back runs it in reverse. Under reduced motion it renders a plain grid.
- `DetectionPortrait` runs the scan-and-lock treatment on the portraits.
- `NextChapter` and `JourneyReverse` let a visitor scroll past the end of a page to reach the next one, and past the top to go back.
- `ConnectMenu` is the header's LET'S CONNECT picker: WhatsApp, Instagram and a pre-filled Gmail compose.
- `ContactForm` opens the visitor's own mail app with the message filled in, with a Gmail fallback for machines that have no mail app.
- `SmoothScroll`, `CursorRing`, `Magnetic` and `Reveal` are the motion layer. All of it switches off when the operating system asks for reduced motion.

## Media

The Nissan Horizon videos are recordings of the prototype running in the Unreal Editor, filmed off the monitor. The other two projects use concept visuals and say so on the page.

## Deploying

The site is a static export (`output: "export"` in `next.config.mjs`), so any static host can serve the `out/` folder. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The workflow sets `NEXT_PUBLIC_BASE_PATH` from the repository name, so a repo called `portfolio` is served at `/portfolio/` and a repo called `<user>.github.io` at the root; every asset path goes through `lib/asset.js` for that reason.
