/**
 * Three stacked layers behind the whole page (SPEC §5):
 *
 *   1. two blurred accent orbs at ≤10% opacity, drifting on 26s and 32s loops,
 *   2. a 24px dot grid dissolved toward the edges by a radial mask,
 *   3. one static SVG fractal-noise overlay at 3.5% for grain.
 *
 * Pure CSS and one inline SVG — no canvas, no particle library, no animation
 * frame loop. The drift is authored behind `motion-safe`, so under reduced
 * motion the keyframes are never emitted rather than merely being paused.
 *
 * A Server Component: nothing here needs state, effects or hydration.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="ambient-orb absolute -top-1/4 -left-1/4 opacity-10 blur-3xl motion-safe:animate-drift-a" />
        <div className="ambient-orb absolute -right-1/4 -bottom-1/3 opacity-8 blur-3xl motion-safe:animate-drift-b" />
      </div>

      <div className="dot-grid absolute inset-0 opacity-60" />

      <svg
        className="absolute inset-0 size-full opacity-4 mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <filter id="ambient-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-grain)" />
      </svg>
    </div>
  );
}
