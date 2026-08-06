# Portfolio — Overview & How to Run

> Note: paths and filenames below follow the project spec. If you renamed anything
> during the build, adjust accordingly (or run the "sync docs to repo" prompt to have
> Claude Code correct them against your actual code).

## What this is

A personal developer portfolio built as a single scrolling page. Dark theme, one accent
color, a 3D hero cube, and all content driven from a data layer so you can edit text
without touching UI code.

## Tech stack

| Piece | What it is |
|---|---|
| Next.js (App Router) | The framework — pages, routing, build |
| React + TypeScript | UI, with type safety |
| Tailwind CSS | Styling (tokens live in `globals.css`) |
| Framer Motion | Scroll reveals and animations |
| Three.js + React Three Fiber | The 3D hero cube |
| lucide-react + Simple Icons | UI icons and brand/skill logos |
| Web3Forms | Contact form delivery (no backend needed) |

## Sections, in order

Hero → About → Skills → Experience → Projects → Articles → Achievements →
Testimonials → Contact → Footer.

## Folder map (the parts you'll touch)

```
src/
├── app/            layout, page, globals.css (theme tokens live here)
├── components/
│   ├── ui/         reusable primitives (Button, Card, Section, Media, ...)
│   ├── layout/     Navbar, Footer, background, back-to-top
│   └── sections/   one file per section (Hero, About, Skills, ...)
├── data/           <-- ALL your content lives here (edit these)
├── types/          the shapes your data must match
├── hooks/          reusable behavior
└── lib / utils/    helpers, motion variants
```

The rule the whole project is built on: **content lives in `src/data/`, never in
components.** To change what the site says, you edit `data/` — not the UI.

## Running it locally

You need Node.js installed (v18+). This project uses **pnpm**.

First time only — install pnpm if you don't have it:
```
npm install -g pnpm
```

Then, from the project folder:

```
pnpm install      # install dependencies (first time, or after new packages)
pnpm dev          # start the dev server
```

Open the URL it prints (usually http://localhost:3000). The page reloads as you edit.
Stop the server with Ctrl+C.

## Other commands

```
pnpm build        # production build — run this before deploying
pnpm start        # run the production build locally
pnpm lint         # check for code issues
```

## Before you deploy — checklist

1. Set your Web3Forms key so the contact form works (see doc 2).
2. Put your real domain in the SEO data so link previews and canonical URLs work.
3. Replace any remaining placeholder content in `data/` with your real details.
4. Add a real resume file where the resume link points (see doc 2).
5. Run `pnpm build` and confirm it's clean.

## Deploying

Easiest is Vercel (made by the Next.js team):
1. Push the repo to GitHub.
2. Import it at vercel.com.
3. Add your `NEXT_PUBLIC_WEB3FORMS_KEY` as an environment variable.
4. Deploy.

It also runs on any host that supports Next.js.
