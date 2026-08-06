# Build Plan — Premium Developer Portfolio (Next.js)

This file is the reference for the whole build. Companion file: `SPEC.md` (the full design
and content spec). Keep both in the repo root.

**Read `SPEC.md` in full before starting any phase.** This document tells you *what order*
to build in and *how* to work; `SPEC.md` tells you *what* each piece must be.

Build in the seven phases below, one at a time. Do not start a phase until the previous one
ends with a clean `pnpm build`. At the end of every phase, report a one-line status per item
and stop for my go-ahead before the next phase.

---

## Working rules (apply to every phase)

- Write files to disk. Never paste file contents into chat — report progress in a line or two.
- After each phase: run `pnpm tsc --noEmit`, then `pnpm build`, then `pnpm lint`. Fix
  everything. Do not report a phase done on a failing build.
- Ask before guessing if two instructions conflict. If you think a spec choice is wrong,
  build it as written and note the objection — never silently substitute.
- No `any`, no `@ts-ignore`, no non-null assertions to silence the compiler. No elided files,
  no `// ...rest of the code` comments.
- Do not `git commit` or `git push` unless I ask.

---

## The reusability contract (this is the spine of the whole build)

The single most important quality bar here is **reusable, composable components with zero
duplicated logic or copy**. Enforce all of the following, in every phase, from the first file:

1. **A `ui/` primitive layer that everything else is built from.** Sections may not hand-roll
   markup that a primitive already covers. The primitives:
   - `Container` — max width, padding, centering. The *only* place those values live.
   - `Section` — owns `id`, `scroll-mt`, vertical rhythm, and wraps `Container`. Every section
     uses it. No section re-implements spacing or width.
   - `SectionHeading` — eyebrow + heading + optional description, one consistent rhythm.
   - `Button` — variants (`primary` | `ghost` | `secondary`) and sizes via props. Every
     clickable CTA in the app is this component. No one-off button markup anywhere.
   - `Badge` / `Chip` — tech badges, category chips, proficiency pills. One component, variants.
   - `Card` — the shared surface (border, radius, raised bg, hover elevation) that Project,
     Article, Achievement, and stat cards compose *on top of* — they do not each redraw a border.
   - `GlassPanel` — the one glass recipe (navbar, hero panel, testimonials all use it).
   - `IconButton` — icon-only actions (carousel arrows, back-to-top, hamburger) with the
     `aria-label` requirement built in.
   - `Field` — labeled input/textarea with error slot, `aria-describedby`, `aria-invalid`
     wired once. Contact form composes it, never re-wires validation aria per field.
   - `Reveal` — the standard scroll-entrance wrapper (`whileInView`, `once`, `-80px` margin,
     reduced-motion aware). Every section's fade-up goes through this. No section hand-writes
     the same `whileInView` variant.
   - `Media` — deterministic gradient + mono-label placeholder when `src` is undefined, a
     `next/image` when it isn't. Every preview/cover/avatar image is this.

2. **A shared motion layer** (`lib/motion.ts`) holding the reusable variants (`fadeUp`,
   `stagger`, `scaleIn`, etc.) and the motion tokens from `SPEC.md §2`. Components import
   these — they do not redefine durations, easings, or distances inline.

3. **Shared hooks** carry all reused behavior: `useActiveSection`, `useScrolled`,
   `useMediaQuery`, `useCountUp`, `useLockBodyScroll`, `useReducedMotionSafe`. If a behavior
   appears in two places, it becomes a hook — it is never copy-pasted.

4. **`cn()` for all conditional classes.** No string concatenation for className logic.

5. **Every repeated card is a mapped component.** Projects render `<ProjectCard>` over data;
   articles render `<ArticleCard>`; etc. There is never a second copy of a card's JSX for
   "the featured one" — variation is a prop (`featured?: boolean`), not a duplicated block.

6. **Zero user-facing strings in `components/`.** All copy — names, titles, stats, labels,
   nav, SEO, resume path — comes from `data/`. Changing content never means opening a
   component. This is verified explicitly in Phase 7, but hold the line from Phase 1.

If you catch yourself about to copy a block of JSX or re-type a spacing value, stop and
extract a primitive or a prop instead. A senior reviewer should find no duplicated structure.

---

## Phase 1 — Foundation

Goal: the spine everything inherits from. No sections yet.

Build:
- Project scaffold per `SPEC.md §1` (pinned stack, `strict: true`, pnpm).
- `types/index.ts` — every data shape from `SPEC.md §6`/§10, exported.
- `data/*` — all eleven files, each typed with `satisfies` against `types/`. Seed content
  from `SPEC.md §10`.
- `globals.css` — `@theme` tokens (`SPEC.md §2`), base layer, and the global
  reduced-motion override block (`§7`).
- `lib/motion.ts`, `lib/constants.ts`, `utils/cn.ts`, `utils/format.ts`.
- All hooks listed in the reusability contract.
- The **entire `ui/` primitive layer** listed above — built and self-contained, even though
  sections don't consume them yet. Each primitive strictly typed, variants via props.
- `<AmbientBackground />` (`SPEC.md §5`).

Exit check: `pnpm build` clean. Report the file tree created and confirm each `ui/` primitive
exists with its variant props.

---

## Phase 2 — App shell

Goal: a navigable empty page whose chrome is final.

Build:
- `layout.tsx` — fonts (`§9`), full `metadata`, `<AmbientBackground/>`, Navbar, Footer.
- `Navbar` + `MobileMenu` (`§4.1`) — composed from `GlassPanel`, `Button`, `IconButton`;
  active pill via `useActiveSection`; mobile overlay with focus trap + scroll lock via
  `useLockBodyScroll`.
- `Footer` + `BackToTop` (`§4.11`).
- `page.tsx` — composes empty `<Section>` anchors for all ten sections so scroll-spy and the
  active pill work against real targets.
- SEO files: `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` (`§9`), values from `data/seo`.

Exit check: build clean; nav pill tracks the empty anchors; mobile menu traps focus and closes
on Escape.

---

## Phase 3 — Hero + About

- `Hero` + `HeroEditor` (`§4.2`) — editor panel from `GlassPanel`; float, tilt, and typing
  line all reduced-motion aware; **no typing on the `h1`**.
- `About` (`§4.3`) — stat cards compose `Card` + `useCountUp`; portrait via `Media`.

Exit check: build clean; count-up and typing respect reduced motion; hero copy paints before
any animation (LCP).

---

## Phase 4 — Skills + Experience

- `Skills` (`§4.4`) — `role="tablist"` rail with arrow-key roving tabindex; chips are the
  shared `Chip`; category switch via `layout` animation; `min-h` reserved; mobile snap row.
- `Experience` (`§4.5`) — single left rail, scroll-bound accent draw via `useScroll`; entries
  wrapped in `Reveal`; badges are shared `Badge`; single left layout at all breakpoints.

Exit check: build clean; tabs keyboard-navigable; timeline draws on scroll; no height jump on
category switch.

---

## Phase 5 — Projects + Articles

- `ProjectCard` mapped over data; `featured` is a prop, not a duplicated card. Compose `Card`,
  `Badge`, `Button`, `Media`. Hover per `§4.6` — `transform`/`opacity` only, `hover: hover`
  guarded. Action links real `<a>`, no nested anchors.
- `ArticleCard` mapped over data (`§4.7`), composing `Card` + `Media` + `Chip`.

Exit check: build clean; featured and standard projects share one component; no nested `<a>`;
hover animates only transform/opacity.

---

## Phase 6 — Achievements + Testimonials + Contact

- `Achievements` (`§4.8`) — cards compose `Card`; mapped over data.
- `Testimonials` (`§4.9`) — `GlassPanel` cards in an `AnimatePresence` carousel; autoplay
  pauses on hover/focus/reduced-motion; arrows are `IconButton`; `aria-live` on changes.
- `Contact` (`§4.10`) — form fields are all the shared `Field`; `POST /api/contact` validates
  server-side, works with empty `.env`; button idle/loading/success/error states; honeypot.

Exit check: build clean; carousel keyboard + swipe; form validates and submits with no env vars.

---

## Phase 7 — Hardening & acceptance

No new features. Audit, fix, re-verify.

Run the full `SPEC.md §12` checklist plus §7/§8/§9 compliance, and additionally verify the
reusability contract:

- `grep -rn '"' src/components/sections/ | grep -v className` → no user-facing copy in section
  files (all traces to `data/`).
- No duplicated card/button/section JSX — every repeated structure is a mapped component or a
  prop variant.
- Every CTA is `Button`; every image is `Media`; every scroll-entrance is `Reveal`; every
  glass surface is `GlassPanel`. Grep for stray one-off equivalents and fold them in.
- `grep -rn "\bany\b\|@ts-ignore\|!\." src/` → no type escapes.
- Changing `--color-accent` restyles the whole site.
- No horizontal scroll at 320/390/768/1024/1440/2560px.
- Full keyboard path; `prefers-reduced-motion` kills all transforms/loops/autoplay.
- Every `package.json` dep imported; no page over 200KB first-load JS; runs with empty `.env`.

Report pass/fail per item with a one-line note, fix every failure, rebuild until clean. Then
print setup commands and a short "how to customize" guide pointing at `src/data/`.
