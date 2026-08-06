"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

import { heroCubeConfig as config } from "@/data/heroCubeConfig";
import { heroCubeContent } from "@/data/heroCubeContent";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { REVEAL_MARGIN } from "@/lib/constants";

/**
 * The box the cube lives in.
 *
 * Declared once and used by the live scene, the loading placeholder and the
 * static fallback alike, so every one of them occupies exactly the same space.
 * That is what makes the layout shift zero: whichever branch renders, and
 * whenever the chunk arrives, the hero grid never resizes. `max-w-editor`
 * matches the editor panel this replaces.
 */
const BOX = "relative mx-auto w-full max-w-editor aspect-square lg:mx-0";

/**
 * The ambient wash behind the cube.
 *
 * Three things here exist specifically to guarantee no straight edge:
 *
 * `closest-side` sizes the circle to half the box's shortest side, so the
 * falloff completes *before* any boundary. The default is `farthest-corner`,
 * which puts the circle's edge out at the corners — the gradient is then still
 * partly opaque where it meets the flat sides and gets clipped there, drawing
 * exactly the four straight edges this is meant not to have.
 *
 * The stops fade alpha on the glow's own hue via `color-mix`. The bare
 * `transparent` keyword is rgba(0,0,0,0), so interpolating to it drags the
 * midtones through black and leaves a dirty ring.
 *
 * The final stop is fully transparent at 100%, so the element's own box is
 * reached only at zero alpha and there is nothing left to clip. No blur filter:
 * blurring a box-clipped gradient is what makes a soft edge look like a
 * deliberate rectangle.
 */
function AmbientGlow() {
  const tint = (amount: number) =>
    `color-mix(in srgb, ${config.glowColor} ${amount}%, transparent)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background: `radial-gradient(circle closest-side, ${tint(100)} 0%, ${tint(38)} ${config.glowScale}%, ${tint(0)} 100%)`,
        opacity: config.glowOpacity,
      }}
    />
  );
}

/**
 * `ssr: false` because there is no WebGL context on the server, and lazy so the
 * three.js bundle is never on the first-paint path. The placeholder is the
 * fallback itself — if the chunk is slow, what shows is a finished-looking
 * cube, not a spinner.
 */
const HeroCubeScene = dynamic(
  () => import("@/components/sections/HeroCubeScene"),
  { ssr: false, loading: () => <StaticCube /> },
);

/**
 * The no-canvas representation: the cube unfolded into its six faces.
 *
 * Used for reduced motion, for `enabled: false`, when WebGL is missing, and as
 * the loading placeholder. Entirely static — no render loop, no autoplay, no
 * three.js — and built from the same content file as the live scene.
 */
function StaticCube() {
  return (
    <div className={BOX}>
      <AmbientGlow />

      <div
        role="img"
        aria-label={heroCubeContent.ariaLabel}
        className="grid h-full w-full grid-cols-2 grid-rows-3 gap-3 rounded-2xl border border-subtle bg-raised/40 p-3 sm:grid-cols-3 sm:grid-rows-2"
      >
        {heroCubeContent.faces.map((face) => (
          <span
            key={face.id}
            className="flex items-center justify-center rounded-xl border border-subtle bg-overlay/60 font-mono text-2xl"
            style={{ color: face.color ?? config.edgeColor }}
          >
            {face.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroCube() {
  const reduced = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * Both start pessimistic and are only ever turned on from an effect. The
   * server renders the static fallback, and so does the first client paint —
   * so nothing about the live scene can affect hydration.
   */
  const [webglReady, setWebglReady] = useState(false);

  /*
   * Starts `true`, unlike `webglReady`. IntersectionObserver reports
   * asynchronously, so starting `false` would mount the canvas with
   * `frameloop="never"` and paint one blank frame before the first callback.
   * The observer switches it off a moment later if the hero really is away.
   */
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!config.enabled) {
      return;
    }

    /* A context that is created only to be asked "do you exist?" is released
       immediately — leaving it open burns one of the browser's few slots. */
    const probe = document.createElement("canvas");
    const context =
      probe.getContext("webgl2") ?? probe.getContext("webgl");

    if (context === null) {
      return;
    }

    const lose = context.getExtension("WEBGL_lose_context");
    lose?.loseContext();

    setWebglReady(true);
  }, []);

  /* Pauses the render loop whenever the hero is not on screen. */
  useEffect(() => {
    const element = containerRef.current;

    if (element === null || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting === true),
      { rootMargin: REVEAL_MARGIN },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const live = config.enabled && webglReady && !reduced;

  if (!live) {
    return <StaticCube />;
  }

  return (
    <div
      ref={containerRef}
      className={BOX}
      /*
       * The one line that keeps the page scrollable on touch. `pan-y` hands
       * vertical gestures to the browser, so a swipe scrolls the page as it
       * always did, while horizontal drags still reach OrbitControls. Without
       * it the canvas swallows the gesture and the hero becomes a scroll trap.
       */
      style={{ touchAction: "pan-y" }}
    >
      <AmbientGlow />

      <Suspense fallback={<StaticCube />}>
        <HeroCubeScene active={visible} />
      </Suspense>
    </div>
  );
}
