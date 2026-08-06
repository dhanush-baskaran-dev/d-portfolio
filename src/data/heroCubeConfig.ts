import type { HeroCubeConfig } from "@/types";

/**
 * Every knob on the hero cube.
 *
 * Tuned restrained on purpose. `bloomThreshold` sits above the luminance of the
 * face panels and the particle field, so bloom reaches only the edges, the
 * glyphs and the nearest particles — everything else stays matte. Raising
 * `bloomIntensity` much past 0.5, or dropping the threshold much below 0.6,
 * tips the whole scene into neon.
 *
 * `edgeColor` is the site accent (`--color-accent`), restated as a literal
 * because a WebGL material cannot read a CSS custom property. If the accent
 * changes in `globals.css`, change it here too.
 */
export const heroCubeConfig = {
  /* Flip to `false` to ship the static fallback and never mount a canvas. */
  enabled: true,

  /* -- Motion -------------------------------------------------------------- */
  /** Radians per second. A full turn now takes a bit over a minute. */
  idleSpinSpeed: 0.075,
  /**
   * OrbitControls' `dampingFactor`, which is the *fraction* of momentum applied
   * per frame — so MORE damping means a SMALLER number here. 0.025 carries a
   * long, weighted glide; 0.2 stops almost on release.
   *
   * Much below 0.02 the cube stops feeling heavy and starts feeling floaty:
   * momentum decays so slowly that it drifts for seconds after you let go.
   */
  dragDamping: 0.025,
  /**
   * Rotation per pixel dragged. This is the sensitivity dial — it governs how
   * far the cube turns for a given gesture, where `dragDamping` only governs
   * how it settles afterwards. Well below 1, so the cube trails the cursor
   * rather than tracking it.
   */
  dragRotateSpeed: 0.22,

  /* -- Bloom --------------------------------------------------------------- */
  bloomIntensity: 0.58,
  bloomRadius: 0.52,
  /*
   * Lowered to suit the blue edges. A saturated blue carries far less luminance
   * than a near-white line of the same intensity, so at the old 0.6 the edges
   * sat under the threshold and never bloomed at all.
   */
  bloomThreshold: 0.48,

  /* -- Particles ----------------------------------------------------------- */
  particleCountDesktop: 220,
  particleCountMobile: 90,
  particleSize: 0.026,
  /** Recycle distance. Raise for a longer, sparser trail. */
  particleSpread: 4.6,
  particleOpacity: 0.62,
  /** Slow enough to read as emission rather than an explosion. */
  particleSpeed: 0.26,
  particleInnerRadius: 0.62,
  particleGlow: 1.25,

  /* -- Colour and form ----------------------------------------------------- */
  glowColor: "#6f9bff",
  /*
   * Sky blue. It carries far more green and blue than the deep blue it
   * replaced, so it needs a much smaller `edgeGlow` — see the note there.
   */
  edgeColor: "#38bdf8",
  cubeSize: 1.9,
  edgeOpacity: 1,
  /** Line width in pixels. Needs `Line` from drei — see the note in the scene. */
  edgeWidth: 2.2,
  /*
   * Above 1 on purpose. Three accepts colour channels past 1 as HDR, and that
   * overshoot is exactly what bloom keys on — it is what puts the glow on the
   * edges and glyphs while the dark faces stay under the threshold and matte.
   */
  /*
   * Lowered from 1.7 for the sky-blue edge. The gain scales all three channels,
   * and sky blue already sits near the top of green and blue — at 1.7 both clip
   * and the line renders cyan-white. 1.25 clears `bloomThreshold` (luminance
   * ~0.54 against a 0.48 floor) while the hue survives the clamp.
   */
  edgeGlow: 1.25,
  /*
   * Barely above 1, and that is the whole point. The gain scales all three
   * channels at once, so at 2.2 every glyph's brightest channel clipped at 1
   * and the hue collapsed to white — that is why the face colours were not
   * showing. At 1.25 the colour clears the bloom threshold and still survives
   * the clamp with its chroma intact. Push this past ~1.5 and the glyphs go
   * white again, whatever colours the content file lists.
   */
  glyphGlow: 1.25,
  /* Dark blue-black. Translucent enough to read as tinted glass over the glow
     behind it, opaque enough that the cube stays an object. */
  faceTint: "#0e1020",
  faceOpacity: 0.80,
  /* Drives the soft CSS radial glow behind the canvas — no geometry, no edges. */
  glowOpacity: 0.34,
  /**
   * Position of the gradient's midpoint, as a percentage of the radius. The
   * glow always reaches zero alpha at 100%, so this only shifts where the
   * falloff sits — it can never push colour out to the element's edge.
   */
  glowScale: 42,

  /* -- Performance --------------------------------------------------------- */
  cameraDistance: 5.2,
  pixelRatioMax: 2,
  /** Phones render fewer pixels so the GPU does not cook the battery. */
  pixelRatioMobileMax: 1.5,
} satisfies HeroCubeConfig;
