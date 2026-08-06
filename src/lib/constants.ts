/** Behavioural constants shared by more than one component. No copy lives here. */

/** Navbar leaves its transparent state above this scroll offset (SPEC §4.1). */
export const NAVBAR_SCROLL_THRESHOLD = 24;

/** Back-to-top appears above this scroll offset (SPEC §4.11). */
export const BACK_TO_TOP_THRESHOLD = 600;

/** Scroll-spy band: a section is active while it occupies the middle of the viewport. */
export const ACTIVE_SECTION_ROOT_MARGIN = "-45% 0px -50% 0px";

/** Standard scroll-entrance viewport margin (SPEC §7). */
export const REVEAL_MARGIN = "-80px";

/**
 * Timeline node fills once its entry has climbed past 60% of the viewport.
 * Written as the literal margin because `useInView` types it as one.
 */
export const TIMELINE_NODE_MARGIN = "0px 0px -40% 0px";

/** Testimonial autoplay interval (SPEC §4.9). */
export const CAROUSEL_INTERVAL = 6000;

/** Maximum hero panel tilt in degrees (SPEC §4.2). */
export const TILT_MAX_DEGREES = 4;

/** Per-character delay for the single self-typing editor line. */
export const TYPING_INTERVAL = 42;

/** Delay before the typing line starts, so it follows the load sequence. */
export const TYPING_START_DELAY = 900;

/** Success state duration on the contact submit button (SPEC §4.10). */
export const SUBMIT_SUCCESS_DURATION = 3000;

/** Minimum accepted message length. */
export const MESSAGE_MIN_LENGTH = 20;

/** Abort a contact submission rather than leave the button spinning. */
export const CONTACT_TIMEOUT = 15000;

/**
 * Preloader timing.
 *
 * The overlay leaves on `window.load`, but never before `MIN` — dismissing at
 * 80ms on a warm cache reads as a glitch rather than an entrance — and never
 * after `MAX`, so a slow image can never hold the page hostage.
 */
export const PRELOADER_MIN_DURATION = 600;
export const PRELOADER_MAX_DURATION = 1200;

/** Must match `--duration-entrance`, which drives the fade-out utility. */
export const PRELOADER_FADE_DURATION = 400;

/** Matches users who have asked for less motion. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Breakpoint above which pointer-driven affordances are allowed to run. */
export const DESKTOP_QUERY = "(min-width: 1024px)";

/** Matches devices that can hover with a precise pointer. */
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Palette for the generated OpenGraph image.
 *
 * `next/og` rasterises with Satori, which resolves neither Tailwind classes nor
 * CSS custom properties — it needs literal colours. These mirror the `@theme`
 * block in `globals.css` and are the one place in the codebase that has to be
 * kept in sync by hand: changing `--color-accent` restyles the site but not the
 * social card, so change both.
 */
export const OG_COLORS = {
  surface: "#08080a",
  raised: "#0e0e11",
  border: "rgba(255,255,255,0.12)",
  primary: "rgba(255,255,255,0.92)",
  secondary: "rgba(255,255,255,0.62)",
  tertiary: "rgba(255,255,255,0.40)",
  accent: "#5b5bd6",
  accentGlow: "rgba(91,91,214,0.28)",
} as const;
