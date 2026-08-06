"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { hero } from "@/data/profile";
import { fadeStill, fadeUp, noMotion, riseOnly, stagger } from "@/lib/motion";

export interface HeroCopyProps {
  readonly headingId: string;

  readonly socialRow: ReactNode;
}

export function HeroCopy({ headingId, socialRow }: HeroCopyProps) {
  const reduced = useReducedMotionSafe();
  const item = reduced ? fadeStill : fadeUp;
  const copyStagger = reduced ? noMotion : stagger;

  // Whichever text block is largest becomes the LCP element, so neither the
  // heading nor the description may fade — they travel only (SPEC §7).
  const text = reduced ? noMotion : riseOnly;

  return (

    <m.div
      variants={copyStagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      <m.p
        variants={item}
        className="flex items-center gap-3 font-mono text-eyebrow uppercase text-tertiary"
      >
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <span className="sr-only">{hero.availability}</span>
        {hero.eyebrow}
      </m.p>

      <m.h1 id={headingId} variants={text} className="mt-3 flex flex-col gap-2">
        <span className="text-heading-lg md:text-display-sm lg:text-display-md">
          {hero.headline}
        </span>
      
        <span className="max-w-measure text-2xl text-balance text-secondary md:text-3xl">
          {hero.headlineAccent}
        </span>
      </m.h1>

      <m.p variants={text} className="mt-5 max-w-measure text-secondary">
        {hero.description}
      </m.p>

      <m.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
        <Button
          href={hero.primaryCta.href}
          download={hero.primaryCta.download}
          variant="primary"
          size="lg"
        >
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
          {hero.secondaryCta.label}
        </Button>
      </m.div>

      <m.div variants={item} className="mt-5">
        {socialRow}
      </m.div>
    </m.div>
  );
}
