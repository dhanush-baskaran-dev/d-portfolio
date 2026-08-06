"use client";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useTypewriter } from "@/hooks/useTypewriter";
import { hero } from "@/data/profile";
import { DESKTOP_QUERY, HOVER_QUERY, TILT_MAX_DEGREES } from "@/lib/constants";
import { DURATION, EASE } from "@/lib/motion";
import type { CodeTokenKind } from "@/types";
import { formatLineNumber } from "@/utils/format";

const TOKEN_CLASS: Readonly<Record<CodeTokenKind, string>> = {
  plain: "text-code-property",
  keyword: "text-code-keyword",
  type: "text-code-type",
  property: "text-code-property",
  string: "text-code-string",
  number: "text-code-number",
  boolean: "text-code-boolean",
  punctuation: "text-code-punctuation",
  comment: "text-code-comment",
};

const TILT_SPRING = { stiffness: 150, damping: 18, mass: 0.6 } as const;
const FLOAT_DURATION = 6;

const { lines, fileName, ariaLabel } = hero.editor;

/**
 * Keys are the token's character offset within its line — stable, unique, and
 * derived from content rather than array position.
 */
const CODE_LINES = lines.map((line) => {
  let offset = 0;

  const spans = line.tokens.map((token) => {
    const key = `${line.id}@${offset}`;
    offset += token.text.length;
    return { key, text: token.text, kind: token.kind };
  });

  const full = line.tokens.map((token) => token.text).join("");

  return { id: line.id, typed: line.typed === true, spans, full };
});

const TYPED_LINE = CODE_LINES.find((line) => line.typed);
const TYPED_KIND = TYPED_LINE?.spans[0]?.kind ?? "comment";

export function HeroEditor() {
  const reduced = useReducedMotionSafe();
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const precisePointer = useMediaQuery(HOVER_QUERY);
  const tiltEnabled = desktop && precisePointer && !reduced;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-TILT_MAX_DEGREES, TILT_MAX_DEGREES]),
    TILT_SPRING,
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [TILT_MAX_DEGREES, -TILT_MAX_DEGREES]),
    TILT_SPRING,
  );

  const { text: typedText, typing } = useTypewriter(TYPED_LINE?.full ?? "");

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) {
      return;
    }

    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-editor lg:mx-0">
      {/* Spill is capped at the Container's own padding, so the glow never
          pushes past the viewport edge on narrow screens. */}
      <div
        aria-hidden="true"
        className="accent-orb pointer-events-none absolute -inset-6 -z-10 opacity-14 blur-3xl md:-inset-8"
      />

      <m.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{
          duration: reduced ? 0.12 : DURATION.hero,
          delay: reduced ? 0 : 0.25,
          ease: EASE.entrance,
        }}
      >
        <m.div
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: FLOAT_DURATION, ease: "easeInOut", repeat: Infinity }
          }
        >
          <m.div
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={
              tiltEnabled
                ? { rotateX, rotateY, transformPerspective: 1200 }
                : undefined
            }
          >
            <GlassPanel radius="xl" className="overflow-hidden">
              <div className="flex items-center gap-3 border-b border-glass-border px-4 py-3">
                <span className="flex gap-2" aria-hidden="true">
                  <span className="size-3 rounded-full bg-strong" />
                  <span className="size-3 rounded-full bg-strong" />
                  <span className="size-3 rounded-full bg-strong" />
                </span>
                <span className="rounded-lg border border-subtle bg-overlay px-3 py-1 font-mono text-xs text-secondary">
                  {fileName}
                </span>
              </div>

              <figure className="flex min-h-90 gap-4 px-4 py-4">
                <figcaption className="sr-only">{ariaLabel}</figcaption>

                <div
                  aria-hidden="true"
                  className="flex shrink-0 flex-col text-right font-mono text-xs leading-6 text-code-punctuation"
                >
                  {CODE_LINES.map((line, index) => (
                    <span key={line.id}>
                      {formatLineNumber(index, CODE_LINES.length)}
                    </span>
                  ))}
                </div>

                <pre
                  aria-hidden="true"
                  className="overflow-x-auto font-mono text-xs leading-6"
                >
                  <code>
                    {CODE_LINES.map((line) => (
                      <span key={line.id} className="block">
                        {line.typed ? (
                          <>
                            <span className={TOKEN_CLASS[TYPED_KIND]}>
                              {typedText}
                            </span>
                            {typing ? (
                              <span className="ml-px inline-block h-3 w-0.5 translate-y-px bg-code-comment align-middle motion-safe:animate-caret" />
                            ) : null}
                          </>
                        ) : (
                          line.spans.map((span) => (
                            <span key={span.key} className={TOKEN_CLASS[span.kind]}>
                              {span.text}
                            </span>
                          ))
                        )}
                        {line.full === "" ? " " : null}
                      </span>
                    ))}
                  </code>
                </pre>
              </figure>
            </GlassPanel>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}
