# Build Spec — Premium Developer Portfolio

## 0. Role & Objective

You are a senior product designer *and* senior frontend engineer working as one. Build a
production-ready personal portfolio site that could ship today as a real product marketing
site — not a template, not a demo.

**Success condition:** a hiring manager who has seen 200 portfolios this month stops
scrolling within the first 3 seconds, and a senior engineer reading the source finds
nothing they'd flag in review.

Optimize for *restraint and craft*. If a decision is between "impressive" and "tasteful,"
choose tasteful. Every animation, gradient, and shadow must justify its existence.

---

## 1. Stack — Pinned, Non-Negotiable

> **Edit this block before running the prompt if your targets differ. Do not deviate from
> it once set, and do not add dependencies not listed here without stating why.**

| Concern | Choice |
|---|---|
| Framework | Next.js 15+, App Router, TypeScript `strict: true` |
| React | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `globals.css`, no `tailwind.config.ts`) |
| Animation | `framer-motion` ^11 (import via `motion/react` if using the `motion` package) |
| Icons | `lucide-react` only |
| Fonts | `next/font/google` — Inter (UI) + JetBrains Mono (code/labels) |
| Package manager | pnpm |

**Hard rules**
- No UI kit (no shadcn, MUI, Chakra, DaisyUI). Build the primitives yourself.
- No CSS-in-JS, no Sass, no CSS modules. Tailwind utilities + one `globals.css`.
- No `any`, no `@ts-ignore`, no non-null assertions to silence the compiler.
- Every dependency in `package.json` must be actually imported somewhere.

---

## 2. Design System — Define It Once, Obey It Everywhere

Emit a real token layer in `globals.css` under `@theme`. No ad-hoc hex values or arbitrary
`[13px]`-style utilities anywhere in components.

### Color

Dark mode is the default and the only mode required (light mode optional; if you add it,
it must be complete, not half-done).

```
Surface  base    #08080A     page background
Surface  raised  #0E0E11     cards
Surface  overlay #16161A     popovers, elevated glass
Border   subtle  rgba(255,255,255,0.06)
Border   strong  rgba(255,255,255,0.12)
Text     primary rgba(255,255,255,0.92)
Text     secondary rgba(255,255,255,0.62)
Text     tertiary  rgba(255,255,255,0.40)
Accent            #5B5BD6   (indigo — the ONE accent)
Accent   hover    #6E6EE8
Accent   subtle   rgba(91,91,214,0.12)   tinted fills
Accent   glow     rgba(91,91,214,0.28)   ambient light only
```

**One accent, used sparingly.** Accent is permitted on: primary CTA, active nav indicator,
focus rings, link hover, one metric per stat card, timeline node. Nothing else. If more
than ~5% of a viewport is accent-colored, you've overused it.

### Typography

- Display: 56/64/72px, tracking `-0.03em`, weight 600. Never bolder than 600 — heavy
  weights read cheap at large sizes.
- Section heading: 32–40px, `-0.02em`, weight 600.
- Body: 16px, line-height 1.65, `text-secondary`.
- Eyebrow/label: 12–13px, uppercase, `+0.08em` tracking, mono, `text-tertiary`.
- Max measure for prose: `65ch`.

### Space, Radius, Elevation

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Nothing off-scale.
- Section vertical rhythm: `py-24` mobile → `py-32` tablet → `py-40` desktop.
- Container: `max-w-6xl` (1152px), `px-6` mobile / `px-8` desktop, centered. Ultrawide
  never stretches past the container — the background may bleed, content may not.
- Radius: 8 (inputs, badges) / 12 (buttons) / 16 (cards) / 24 (hero panels, feature cards).
- Shadows are ambient, never harsh: `0 1px 2px rgba(0,0,0,.4), 0 8px 32px rgba(0,0,0,.24)`.
  No colored drop-shadows. No glow rings on borders.

### Glass

Glass appears in exactly three places: the scrolled navbar, the hero visual panel, and
testimonial cards. Recipe: `bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]`
plus a 1px top highlight (`inset 0 1px 0 rgba(255,255,255,.06)`). Anywhere else, use a
solid raised surface.

### Motion Tokens

- Durations: 150ms (micro), 250ms (standard), 400ms (entrance), 600ms (hero only).
- Easing: `[0.16, 1, 0.3, 1]` for entrances, `[0.4, 0, 0.2, 1]` for state changes.
- Distance: entrances translate **16–24px max**. Never 60px slides.
- Stagger: 60ms between siblings, capped at 6 items.

---

## 3. Information Architecture

Ten sections, in this order. **Nav links to seven of them** (Achievements and Testimonials
are discoverable by scroll, not linked, to keep the navbar from crowding):

| # | Section | In nav |
|---|---|---|
| 1 | Hero (`#home`) | Home |
| 2 | About (`#about`) | About |
| 3 | Skills (`#skills`) | Skills |
| 4 | Experience (`#experience`) | Experience |
| 5 | Projects (`#projects`) | Projects |
| 6 | Articles (`#articles`) | Articles |
| 7 | Achievements (`#achievements`) | — |
| 8 | Testimonials (`#testimonials`) | — |
| 9 | Contact (`#contact`) | Contact |
| 10 | Footer | — |

Nav order and labels come from `data/navigation.ts`, including the `inNav` flag — do not
hardcode the list in the navbar component.

---

## 4. Section Specifications

Where the original brief offered a menu of options, **the choice is made below.** Build
the specified thing; don't substitute.

### 4.1 Navigation

Fixed, full-width, `h-16`. Transparent at `scrollY < 24`; above that, animate to glass +
`border-b border-white/[0.06]`. Layout: monogram/name left, links center (desktop),
"Resume" ghost button right.

- **Active indicator:** a `layoutId`-shared pill behind the active link, animated by Framer
  Motion's shared layout. Active state driven by a `useActiveSection` hook using
  `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"` — *not* scroll math.
- Anchor targets need `scroll-mt-20` so the fixed header doesn't clip headings.
- Mobile: hamburger → full-screen overlay, staggered link entrance, `Escape` closes,
  focus trapped inside, background scroll locked, focus returned to the trigger on close.

### 4.2 Hero

Two columns on `lg+` (55/45), stacked on mobile with the visual **below** the copy.

Left: mono eyebrow with a live availability dot → display heading (name + one-line
positioning) → 2-sentence description at `max-w-[52ch]` → two CTAs (primary "View Projects",
secondary ghost "Contact Me") → a thin row of 4 tech wordmarks in `text-tertiary`.

Right — **build this specific thing:** a glass "editor" panel, ~`480×360`, with a macOS-style
titlebar (three dots, a filename tab in mono), a fake gutter with line numbers, and 12–16
lines of syntax-highlighted TypeScript that describe the developer as a typed object. Colors
come from tokens, not a highlighter library — the code is static JSX with spans. One line
types itself out on mount (respecting reduced motion, which renders it complete). The whole
panel floats: `y: [0, -8, 0]` over 6s, `easeInOut`, infinite. Behind it, one blurred accent
orb at ~14% opacity. Panel tilts subtly toward the cursor on `lg+` only, max 4deg,
spring-damped, disabled on touch and reduced motion.

Page-load sequence: nav fades in, then hero copy staggers up, then the panel scales from
0.96 → 1. Total under 900ms. Nothing bounces.

### 4.3 About

Two columns (`lg:grid-cols-[0.8fr_1fr]`). Left: portrait placeholder in a `rounded-3xl`
frame with a subtle accent-tinted gradient wash and a mono caption chip. Right: eyebrow,
heading, 2–3 short paragraphs (`65ch`), then a 2×2 stat grid.

Stat cards: large tabular-nums number that counts up once on first view (reduced motion →
final value immediately), mono label beneath, hairline border, accent underline that grows
from 0 → full width on hover.

### 4.4 Skills — Interactive, Not a Grid

Left rail of the eight category names (Frontend, Backend, AI, Database, Cloud, DevOps,
Languages, Tools), each with a count badge. Selecting one cross-fades the right panel to
that category's skills. Right panel: skill chips with icon, name, and a 3-dot proficiency
meter — chips enter with a 40ms stagger and `layout` animation, so switching categories
feels physical rather than a flash.

Requirements: rail is a real `role="tablist"` with arrow-key navigation and roving tabindex;
on mobile the rail becomes a horizontally scrollable chip row with snap points; the first
category is active by default; no layout height jump between categories (reserve
`min-h-[320px]`).

### 4.5 Experience

Single vertical timeline, rail at `left-0` on mobile and centered-left (`lg:left-1/2`
alternating is **forbidden** — it reads dated and breaks on ultrawide). Keep one rail on the
left at all breakpoints with content to its right.

The rail is a 1px line whose accent-colored fill height is bound to
`useScroll` + `scrollYProgress` of the section, so it "draws" as you scroll. Each node is a
ring that fills with accent when its entry crosses 60% viewport. Entries reveal with
`whileInView` (`once: true`, `margin: "-80px"`), fading up 20px.

Per entry: company (with a small monogram avatar), position, mono duration + location,
2–3 bullet description with quantified outcomes, tech badges. Current role gets an
accent-tinted "Present" badge.

### 4.6 Projects

`featured: true` projects (max 2) render as full-width cards with a 16:9 preview and
horizontal layout on `lg+`. The rest render in a `md:grid-cols-2` grid.

Card anatomy: preview media on top, then title, one-line description, tech badges, and a
footer row with GitHub + Live Demo buttons. Hover (`lg+` only, `@media (hover: hover)`):
card lifts `-4px`, border brightens to `border-strong`, preview scales to `1.03` with
`overflow-hidden`, and a soft accent radial follows the cursor at low opacity. 250ms,
GPU-only properties (`transform`, `opacity`) — never animate `top`/`box-shadow`/`width`.

Buttons must be real `<a>` elements with `target="_blank" rel="noreferrer noopener"` and
stop propagation from the card link. Never nest an `<a>` inside an `<a>`.

### 4.7 Articles

Three-up grid of cards: 16:9 cover, category chip, title (clamped to 2 lines), description
(clamped to 2), then a mono footer row of date `·` reading time. Hover raises the title to
accent and slides an arrow 4px right. Cards are keyboard-focusable with a visible ring.

### 4.8 Achievements

Four-up on desktop, two-up on tablet, stacked on mobile. Each card: icon in a tinted square,
type label (Open Source / Certification / Award / Speaking / Community), title, issuer, year,
optional link. Deliberately quiet — hairline borders, no glass, hover only brightens the
border and icon tint.

### 4.9 Testimonials

Glass carousel, one card visible on mobile, two on `lg+`. Card: quote (max 3 lines of copy),
avatar placeholder, name, role @ company. Controls: prev/next buttons plus dot indicators;
drag/swipe enabled on touch; `AnimatePresence` with direction-aware slide + fade; autoplay
every 6s that pauses on hover, on focus-within, and under reduced motion. Announce slide
changes via `aria-live="polite"`.

### 4.10 Contact

Two columns. Left: heading, a short invitation line, direct email as a large mono link, and
a vertical list of social links (GitHub, LinkedIn, X) each with icon, handle, and a hover
arrow. Plus a "Download Resume" button with a download icon.

Right: the form — Name, Email, Subject, Message, Send button.

- Client-side validation before submit; inline error text tied via `aria-describedby`,
  `aria-invalid` on the field.
- Submits to a `POST /api/contact` route handler that validates server-side and returns
  `{ ok: true }`. If `RESEND_API_KEY` is present in env it sends the mail; if absent it logs
  and still returns success. **The site must build and run with no env vars set.**
- Button has idle / loading (spinner, disabled) / success (check, 3s) / error states.
- Honeypot field for spam, visually hidden and `aria-hidden`.

### 4.11 Footer

Three zones: name + one-line tagline, the nav links, socials. Bottom bar with copyright
(year computed at runtime) and a "Back to top" button that appears past 600px scroll with a
fade + slide, and smooth-scrolls to `#home`.

---

## 5. Background

One `<AmbientBackground />`, `fixed inset-0 -z-10 pointer-events-none`, composed of:
1. Two large blurred accent/violet radial gradients at ≤10% opacity, positioned top-left and
   bottom-right, drifting on a 20s+ loop.
2. A dot grid (`radial-gradient` background-image, 24px cell) masked with a radial fade so it
   dissolves toward the edges.
3. A 3–4% opacity SVG fractal-noise overlay for grain.

Pure CSS + one static SVG. No canvas, no particle library, no `requestAnimationFrame` loop.
Drifting gradients are disabled under reduced motion.

---

## 6. Architecture & File Manifest

```
src/
├── app/
│   ├── layout.tsx            fonts, metadata, <AmbientBackground/>, Nav, Footer
│   ├── page.tsx              composes sections in order — no markup of its own
│   ├── globals.css           @theme tokens, base layer, reduced-motion block
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/contact/route.ts
├── components/
│   ├── ui/                   Button, Badge, Card, Chip, Container, Section,
│   │                         SectionHeading, Reveal, GlassPanel, IconButton, Field
│   ├── layout/               Navbar, MobileMenu, Footer, AmbientBackground, BackToTop
│   └── sections/             Hero, HeroEditor, About, Skills, Experience,
│                             Projects, Articles, Achievements, Testimonials, Contact
├── data/                     profile, navigation, skills, experience, projects,
│                             articles, achievements, testimonials, socials, stats, seo
├── types/index.ts            every data shape, exported
├── hooks/                    useActiveSection, useScrolled, useMediaQuery,
│                             useCountUp, useLockBodyScroll, useReducedMotionSafe
├── lib/                      motion.ts (shared variants), constants.ts
└── utils/                    cn.ts, format.ts
```

**Rules**

- `data/*` files are typed with `satisfies` against `types/index.ts` — so a bad edit fails at
  compile time, and inference stays narrow.
- Components read data via props or a direct data import; **zero user-facing strings live in
  `components/`.** Changing a job title, a link, a stat, or the accent color must never
  require opening a component file. Includes SEO metadata and the resume path.
- `<Section>` owns id, `scroll-mt`, vertical rhythm, and container — sections never re-implement it.
- `<Reveal>` owns the standard scroll-entrance; sections never write raw `whileInView` variants
  for the common case.
- Server Components by default. `"use client"` only on components that need state, effects, or
  motion — push the boundary as deep as possible (e.g. `Projects` stays server, `ProjectCard`
  goes client).
- Every list uses a stable domain `id` as its key. Never an array index.

---

## 7. Motion Rules

- Wrap the app in `LazyMotion` with `domAnimation` and use `m.*` instead of `motion.*` to keep
  the bundle small.
- All scroll reveals: `whileInView`, `viewport={{ once: true, margin: "-80px" }}`.
- **Reduced motion is a first-class path, not a disable switch.** Under
  `prefers-reduced-motion: reduce`: no transforms, no floating loops, no autoplay, no typing
  effect, no count-up — content renders in final state with opacity-only transitions ≤120ms.
  `globals.css` carries a global override *and* components check `useReducedMotion()` where
  JS drives the animation.
- Animate `transform` and `opacity` only. Anything animating layout properties on scroll is a bug.
- No animation on a hero element may delay LCP text paint.

---

## 8. Accessibility (must pass, not aspire to)

- Landmarks: `header`, `nav`, `main`, `section` (each `aria-labelledby` its heading), `footer`.
- One `h1` (hero). Headings descend without skipping.
- "Skip to content" link, visible on focus.
- `:focus-visible` ring on every interactive element: 2px accent, 2px offset. Never
  `outline: none` without a replacement.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI borders. `text-tertiary` is only
  for decorative labels that pass 3:1.
- Full keyboard path: tab through nav → mobile menu (trapped, Escape-closable) → skills tabs
  (arrow keys) → carousel (arrow keys) → form → back to top.
- Icon-only buttons carry `aria-label`. Decorative icons carry `aria-hidden="true"`.
- Touch targets ≥ 44×44px.

---

## 9. Performance Targets

- Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100.
- LCP < 2.0s, CLS < 0.05, TBT < 150ms.
- Every image/media box has an explicit aspect ratio so nothing shifts on load.
- Fonts via `next/font` with `display: "swap"`; only the weights actually used.
- Below-fold heavy sections (Testimonials, HeroEditor tilt logic) use `next/dynamic` with
  `ssr: false` only where it doesn't harm SEO — never for text content.
- Full `metadata` export: title template, description, canonical, OpenGraph, Twitter card,
  and an `opengraph-image.tsx` generated with `next/og`. Values sourced from `data/seo.ts`.

**Media placeholders:** no external image URLs (no Unsplash, no `via.placeholder.com`, no
`picsum`). Build a `<Media>` component that renders a deterministic gradient + mono label
placeholder when `src` is undefined, and a `next/image` when it isn't. Swapping in a real
image is then a one-line data change.

---

## 10. Content

Realistic, specific, confident. No Lorem Ipsum, no "passionate about coding," no "I love
turning coffee into code." Write like a real senior engineer's site: concrete systems,
concrete numbers, concrete companies.

Seed persona (all of it lives in `data/`, all of it swappable):

- **Name:** Ishaan Rao — *replace with your own*
- **Positioning:** Senior Full-Stack Engineer building AI-native products
- **Location:** Bengaluru, India · Remote-friendly
- **Experience:** ~7 years, 4 roles including one startup and one scale-up
- **Stats:** 7 years · 40+ projects · 30+ technologies · 25 articles
- **Projects:** 5 total, 1 featured — e.g. a semantic search platform, a realtime
  collaboration editor, a self-hosted observability dashboard, a developer CLI, an
  RAG-based docs assistant. Each with a plausible stack and a one-line outcome.
- **Articles:** 6, on topics like RSC data flow, Postgres index strategy, streaming LLM UIs.
- **Testimonials:** 4, from named engineering managers and founders at fictional companies.
- Placeholder links are `#` or `https://github.com/username` — never fake-real URLs of
  actual people or companies.

---

## 11. Explicit Anti-Patterns

Do not ship any of these:

- Neon/cyberpunk palette, glowing gradient borders, animated rainbow text, matrix rain.
- More than one accent color, or accent used as a large background fill.
- `text-shadow` glows, `box-shadow` in accent color, 3D card flips.
- Emoji as UI iconography.
- A "typing" effect on the main `h1` (kills LCP and reads gimmicky).
- Cards that scale up more than 1.03 or lift more than 6px on hover.
- Section dividers made of chevrons, waves, or diagonal cuts.
- Horizontal overflow at any width from 320px to 2560px.
- Skeleton loaders for content that's statically rendered.
- Placeholder text left in the DOM ("Lorem", "TODO", "Your text here").
- Comments like `// ...rest of the code`, or any elided/abridged file.

---

## 12. Acceptance Checklist

Before you consider the build done, verify each and report the result:

1. `pnpm build` completes with zero TypeScript errors and zero ESLint warnings.
2. `grep` for `any`, `@ts-ignore`, `!` non-null assertions → zero hits.
3. No user-facing string exists in `src/components/**` — all copy traces to `src/data/**`.
4. Changing `accent` in `globals.css` restyles the entire site correctly.
5. Renders with no horizontal scroll at 320 / 390 / 768 / 1024 / 1440 / 2560px.
6. Tab-only traversal reaches every interactive element with a visible focus ring; Escape
   closes the mobile menu and returns focus.
7. With `prefers-reduced-motion: reduce`, no element translates, loops, or autoplays.
8. Every `package.json` dependency is imported at least once.
9. `next build` output shows no page over 200KB first-load JS.
10. Site runs correctly with an empty `.env`.

---

## 13. Delivery Protocol

1. **First**, output only: the chosen accent rationale (2 lines), the complete file tree, and
   the `package.json`. Stop and let me confirm.
2. **Then** generate in this order, complete files with full paths, no elisions:
   `types` → `data` → `globals.css` + `layout.tsx` → `lib`/`utils`/`hooks` → `ui` primitives
   → `layout` components → `sections` → `page.tsx` → `api/contact` → SEO files.
3. Announce each batch's file list before writing it. If a batch would be truncated, split it
   and continue — never abridge a file.
4. **Finally**, output the acceptance checklist from §12 with a pass/fail and a one-line note
   per item, plus setup commands and a short "how to customize" guide pointing at `data/`.

If any instruction here conflicts with another, ask before guessing. If you believe a spec
choice is wrong, build it as specified and note your objection at the end — don't silently
substitute.
