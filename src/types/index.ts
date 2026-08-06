/**
 * Every data shape in the site, in one place.
 *
 * Files in `src/data` are written as `satisfies <Type>` so a bad content edit is a
 * compile error while the literal types stay narrow enough to drive unions elsewhere.
 */

import type { StaticImageData } from "next/image";

import type { BrandSlug } from "@/lib/brand-icons";

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                           */
/* -------------------------------------------------------------------------- */

/** Stable domain identifier. Used as the React key for every mapped list. */
export type Id = string;

/** An external or in-page destination plus the copy that labels it. */
export interface Link {
  readonly label: string;
  readonly href: string;
  /** True for destinations that leave the site and need `target`/`rel`. */
  readonly external?: boolean;
  /** True to save the target rather than navigate to it. */
  readonly download?: boolean;
}

/**
 * Interface glyphs — arrows, chrome controls, category marks. Mapped to lucide
 * in `lib/icons.ts`, which is the only file that names a lucide symbol.
 *
 * Brand marks are *not* here. Every tech logo and social mark is a `BrandSlug`
 * rendered through `BrandIcon`, so the two icon systems never overlap.
 */
export type IconName =
  | "mail"
  | "phone"
  | "download"
  | "external"
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "chevron-left"
  | "chevron-right"
  | "menu"
  | "close"
  | "check"
  | "loader"
  | "code"
  | "server"
  | "sparkles"
  | "database"
  | "cloud"
  | "settings"
  | "terminal"
  | "wrench"
  | "award"
  | "certificate"
  | "mic"
  | "users"
  | "git-branch"
  | "layers"
  | "shield"
  | "zap"
  | "calendar"
  | "rocket"
  | "pen"
  | "alert";

/**
 * A Simple Icons slug, narrowed to the marks this site actually bundles.
 *
 * The union is the key set of the map in `lib/brand-icons.ts`, so a slug with
 * no glyph behind it is a compile error rather than a blank square.
 *
 * Re-exported so `data/` keeps importing every shape from `@/types` alone.
 */
export type { BrandSlug };

/* -------------------------------------------------------------------------- */
/* Profile, hero, about, contact                                               */
/* -------------------------------------------------------------------------- */

export interface Profile {
  readonly name: string;
  /** Monogram shown in the navbar and as the fallback avatar. */
  readonly monogram: string;
  readonly role: string;
  readonly location: string;
  readonly email: string;
  /** Display form, e.g. "+91 99000 12345". */
  readonly phone: string;
  /** Dialable form for the `tel:` href, digits and a leading plus only. */
  readonly phoneTel: string;
  readonly tagline: string;
  /** Path under `public/`. Nothing else in the app may hardcode it. */
  readonly resumeHref: string;
}

/** One coloured span inside the hero editor panel. */
export type CodeTokenKind =
  | "plain"
  | "keyword"
  | "type"
  | "property"
  | "string"
  | "number"
  | "boolean"
  | "punctuation"
  | "comment";

export interface CodeToken {
  readonly text: string;
  readonly kind: CodeTokenKind;
}

export interface CodeLine {
  readonly id: Id;
  readonly tokens: readonly CodeToken[];
  /**
   * Exactly one line in the panel sets this. It types itself out on mount and
   * renders complete under `prefers-reduced-motion: reduce`.
   */
  readonly typed?: boolean;
}

export interface HeroContent {
  readonly eyebrow: string;
  /** Screen-reader text for the live availability dot. */
  readonly availability: string;
  /** Rendered as the single `h1`. Never animated character by character. */
  readonly headline: string;
  /** The tagline, set large directly beneath the name. */
  readonly headlineAccent: string;
  /** The supporting paragraph under the tagline. Roughly three lines. */
  readonly description: string;
  readonly primaryCta: Link;
  readonly secondaryCta: Link;
  /** Names the thin social row beneath the CTAs. */
  readonly socialsLabel: string;
  readonly editor: {
    readonly fileName: string;
    readonly ariaLabel: string;
    readonly lines: readonly CodeLine[];
  };
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly portrait: {
    /** A public path, or a statically imported image. */
    readonly src?: string | StaticImageData;
    readonly alt: string;
    readonly caption: string;
  };
}

export interface FormFieldContent {
  readonly id: Id;
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
  readonly autoComplete?: string;
  readonly type?: "text" | "email";
  readonly multiline?: boolean;
  readonly required: boolean;
  readonly maxLength: number;
  /** Shown when the value is empty and the field is required. */
  readonly requiredError: string;
  /** Shown when the value fails the field's format check. */
  readonly invalidError?: string;
}

export interface ErrorMessage {
  readonly title: string;
  readonly description: string;
  readonly retry: string;
}

export interface ErrorCopy {
  /** In-section boundary: one card in place of the part that threw. */
  readonly boundary: ErrorMessage;
  /** Route-segment boundary. */
  readonly route: ErrorMessage;
  /** Shell boundary, rendered without the root layout. */
  readonly global: ErrorMessage;
}

/** Web3Forms delivery. The key is public by design and may be absent. */
export interface ContactConfig {
  readonly endpoint: string;
  readonly accessKey: string;
}

export interface ContactContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly invitation: string;
  readonly emailLabel: string;
  readonly phoneLabel: string;
  readonly socialsLabel: string;
  /** Visible heading at the top of the form card. */
  readonly formTitle: string;
  readonly fields: readonly FormFieldContent[];
  readonly honeypot: {
    readonly name: string;
    readonly label: string;
  };
  readonly submit: {
    readonly idle: string;
    readonly loading: string;
    readonly success: string;
    readonly error: string;
  };
  readonly status: {
    readonly success: string;
    readonly error: string;
    /** Shown when no Web3Forms key is set, instead of a failing submit. */
    readonly notConfigured: string;
  };
}

/* -------------------------------------------------------------------------- */
/* Navigation and chrome                                                       */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  /** Matches the `id` of the rendered `<Section>`; drives scroll-spy. */
  readonly id: Id;
  readonly label: string;
  readonly href: string;
  /** Sections excluded from the navbar are still scroll-spy targets. */
  readonly inNav: boolean;
}

/** Every non-content string the shell needs, so no chrome copy lives in a component. */
export interface ChromeLabels {
  readonly skipToContent: string;
  readonly primaryNav: string;
  readonly mobileNav: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly homeLink: string;
  readonly resume: string;
  /** Accessible name for the floating back-to-top control. */
  readonly backToTop: string;
  /** `{name}` and `{year}` are replaced at render time. */
  readonly copyright: string;
  /** Colophon, shown beside the copyright on one line. */
  readonly credit: string;
}

/* -------------------------------------------------------------------------- */
/* Section content                                                             */
/* -------------------------------------------------------------------------- */

/** Eyebrow + heading + optional description, shared by every section header. */
export interface SectionIntro {
  readonly eyebrow: string;
  readonly heading: string;
  readonly description?: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

/** Filled dots in the five-dot proficiency meter. */
export type Proficiency = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  readonly id: Id;
  readonly name: string;
  /** Simple Icons slug, rendered by `BrandIcon`. Never JSX in a component. */
  readonly brand: BrandSlug;
  readonly proficiency: Proficiency;
}

export interface SkillCategory {
  readonly id: Id;
  readonly label: string;
  readonly icon: IconName;
  readonly skills: readonly Skill[];
}

/** Copy for the proficiency meter's accessible description. */
export interface SkillsLabels {
  readonly railLabel: string;
  readonly panelLabel: string;
  /** The derived category that lists every skill at once. */
  readonly allLabel: string;
  readonly proficiencyLevels: Readonly<Record<Proficiency, string>>;
  /** `{name}` and `{level}` are replaced at render time. */
  readonly proficiencyFormat: string;
}

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

export interface ExperienceLabels {
  readonly present: string;
  readonly timeline: string;
  readonly highlights: string;
  readonly technologies: string;
}

export interface ExperienceEntry {
  readonly id: Id;
  readonly company: string;
  readonly monogram: string;
  readonly position: string;
  /** Pre-formatted, e.g. "Jan 2023 — Present". Never derived in a component. */
  readonly duration: string;
  readonly location: string;
  readonly current: boolean;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
}

/* -------------------------------------------------------------------------- */
/* Hero cube                                                                   */
/* -------------------------------------------------------------------------- */

/** One face of the hero cube. Six of these, no more and no less. */
export interface HeroCubeFace {
  readonly id: Id;
  /** The monospace bracket glyph painted on the face. */
  readonly symbol: string;
  /** Overrides the shared glyph colour. Falls back to `edgeColor`. */
  readonly color?: string;
}

export interface HeroCubeContent {
  /** Names the visual for assistive tech; the canvas itself is decorative. */
  readonly ariaLabel: string;
  readonly faces: readonly HeroCubeFace[];
}

/**
 * Every tunable of the hero cube.
 *
 * The component reads all of these and hardcodes none of them, so the feel of
 * the scene is editable here without opening a `.tsx` file.
 */
export interface HeroCubeConfig {
  /** `false` renders the static fallback and never mounts a canvas. */
  readonly enabled: boolean;

  /* -- Motion ------------------------------------------------------------ */
  /** Idle auto-spin, in radians per second. */
  readonly idleSpinSpeed: number;
  /** OrbitControls `dampingFactor`. Lower means MORE damping — see the config. */
  readonly dragDamping: number;
  /** OrbitControls `rotateSpeed`. Below 1 makes dragging slower than the cursor. */
  readonly dragRotateSpeed: number;

  /* -- Bloom ------------------------------------------------------------- */
  readonly bloomIntensity: number;
  readonly bloomRadius: number;
  /** Luminance floor. Anything dimmer than this stays matte. */
  readonly bloomThreshold: number;

  /* -- Particles --------------------------------------------------------- */
  readonly particleCountDesktop: number;
  readonly particleCountMobile: number;
  readonly particleSize: number;
  /** Distance at which an outbound particle is recycled to the start. */
  readonly particleSpread: number;
  readonly particleOpacity: number;
  /** Outward drift, in world units per second. */
  readonly particleSpeed: number;
  /** Where a particle is (re)born, as a multiple of `cubeSize`. */
  readonly particleInnerRadius: number;
  /** Colour multiplier. Above 1 the particles clear the bloom threshold. */
  readonly particleGlow: number;

  /* -- Colour and form --------------------------------------------------- */
  readonly glowColor: string;
  readonly edgeColor: string;
  readonly cubeSize: number;
  readonly edgeOpacity: number;
  /** Wireframe thickness in pixels. */
  readonly edgeWidth: number;
  /** Colour multiplier for the wireframe. This is what makes edges emissive. */
  readonly edgeGlow: number;
  /** Colour multiplier for the face glyphs. */
  readonly glyphGlow: number;
  /** The cube body. Dark and near-solid, so it reads as an object. */
  readonly faceTint: string;
  readonly faceOpacity: number;
  /** Ambient CSS glow behind the canvas — soft, round, no geometry. */
  readonly glowOpacity: number;
  /** Ambient glow falloff midpoint, as a percentage of the gradient radius. */
  readonly glowScale: number;

  /* -- Performance ------------------------------------------------------- */
  readonly cameraDistance: number;
  readonly pixelRatioMax: number;
  readonly pixelRatioMobileMax: number;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export interface Project {
  readonly id: Id;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  /** At most two, per SPEC §4.6. Rendered by the same component with a prop. */
  readonly featured: boolean;
  readonly preview: {
    readonly src?: string;
    readonly alt: string;
    readonly label: string;
  };
  readonly links: readonly Link[];
}

/* -------------------------------------------------------------------------- */
/* Articles                                                                    */
/* -------------------------------------------------------------------------- */

export interface Article {
  readonly id: Id;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  /** ISO 8601 date; formatted for display by `utils/format.ts`. */
  readonly date: string;
  readonly readingMinutes: number;
  readonly href: string;
  readonly cover: {
    readonly src?: string;
    readonly alt: string;
    readonly label: string;
  };
}

/* -------------------------------------------------------------------------- */
/* Achievements                                                                */
/* -------------------------------------------------------------------------- */

export type AchievementType =
  | "Open Source"
  | "Certification"
  | "Award"
  | "Speaking"
  | "Community";

export interface Achievement {
  readonly id: Id;
  readonly type: AchievementType;
  readonly title: string;
  readonly issuer: string;
  readonly year: string;
  readonly icon: IconName;
  readonly link?: Link;
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  readonly id: Id;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly avatar: {
    readonly src?: string;
    readonly alt: string;
  };
}

/** Control copy for the carousel, including the announced slide position. */
export interface TestimonialLabels {
  readonly previous: string;
  readonly next: string;
  readonly carousel: string;
  /** `{current}` and `{total}` are replaced at render time. */
  readonly slidePosition: string;
  /** `{index}` is replaced at render time. */
  readonly goToSlide: string;
}

/* -------------------------------------------------------------------------- */
/* Socials and stats                                                           */
/* -------------------------------------------------------------------------- */

export interface Social {
  readonly id: Id;
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  /** Simple Icons slug, rendered by `BrandIcon`. Never JSX in a component. */
  readonly brand: BrandSlug;
}

/**
 * The glyph palette for stat cards.
 *
 * A closed union rather than a colour string, so `data/` still cannot introduce
 * an ad-hoc hex value — each tone resolves to a `--color-glyph-*` token.
 */
export type GlyphTone = "sky" | "violet" | "teal" | "amber";

export interface Stat {
  readonly id: Id;
  /** Counted up from zero on first view; shown immediately under reduced motion. */
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly icon: IconName;
  /** Each stat carries its own hue, so the grid is not four grey glyphs. */
  readonly tone: GlyphTone;
}

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

export interface Seo {
  readonly siteName: string;
  readonly title: string;
  readonly titleTemplate: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly keywords: readonly string[];
  readonly twitterHandle: string;
  readonly ogImage: {
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly eyebrow: string;
  };
}
