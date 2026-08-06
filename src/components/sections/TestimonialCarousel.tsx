"use client";

import { AnimatePresence, m, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { Media } from "@/components/ui/Media";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { testimonialLabels, testimonials } from "@/data/testimonials";
import { CAROUSEL_INTERVAL, DESKTOP_QUERY } from "@/lib/constants";
import { icons } from "@/lib/icons";
import { reducedTransition, slideVariants } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { interpolate } from "@/utils/format";

const PrevIcon = icons["chevron-left"];
const NextIcon = icons["chevron-right"];

const TOTAL = testimonials.length;
const SWIPE_THRESHOLD = 60;

export function TestimonialCarousel() {
  const reduced = useReducedMotionSafe();
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const perView = desktop ? 2 : 1;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + TOTAL) % TOTAL);
  }, []);

  useEffect(() => {
    if (paused || reduced) {
      return;
    }

    const timer = window.setInterval(() => go(1), CAROUSEL_INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, reduced, go]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      go(1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      go(-1);
    }
  };

  const visible = Array.from(
    { length: perView },
    (_, offset) => testimonials[(index + offset) % TOTAL],
  ).filter((entry) => entry !== undefined);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={testimonialLabels.carousel}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="flex flex-col gap-8"
    >
      <p aria-live="polite" className="sr-only">
        {interpolate(testimonialLabels.slidePosition, {
          current: index + 1,
          total: TOTAL,
        })}
      </p>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <m.ul
            key={index}
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial={reduced ? { opacity: 0 } : "enter"}
            animate={reduced ? { opacity: 1 } : "center"}
            exit={reduced ? { opacity: 0 } : "exit"}
            transition={reduced ? reducedTransition : undefined}
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className={cn(
              "grid gap-6",
              perView === 2 ? "lg:grid-cols-2" : "grid-cols-1",
            )}
          >
            {visible.map((entry) => (
              <li key={entry.id}>
                <GlassPanel as="figure" radius="xl" className="flex h-full flex-col gap-6 p-8">
                  <blockquote className="text-secondary">
                    <p className="line-clamp-3">{entry.quote}</p>
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3">
                    <div className="size-11 shrink-0">
                      <Media
                        src={entry.avatar.src}
                        alt={entry.avatar.alt}
                        aspect="square"
                        radius="full"
                        seed={entry.id}
                        sizes="44px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-primary">
                        {entry.name}
                      </span>
                      <span className="font-mono text-eyebrow text-tertiary">
                        {entry.role} @ {entry.company}
                      </span>
                    </div>
                  </figcaption>
                </GlassPanel>
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4">
        <IconButton
          label={testimonialLabels.previous}
          variant="outline"
          onClick={() => go(-1)}
        >
          <PrevIcon className="size-5" aria-hidden="true" />
        </IconButton>

        <IconButton
          label={testimonialLabels.next}
          variant="outline"
          onClick={() => go(1)}
        >
          <NextIcon className="size-5" aria-hidden="true" />
        </IconButton>

        <ul className="flex items-center gap-2">
          {testimonials.map((entry, dot) => (
            <li key={entry.id} className="flex">
              <IconButton
                label={interpolate(testimonialLabels.goToSlide, { index: dot + 1 })}
                variant="ghost"
                aria-current={dot === index}
                onClick={() => {
                  setDirection(dot > index ? 1 : -1);
                  setIndex(dot);
                }}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2 rounded-full transition-colors duration-standard ease-state",
                    dot === index ? "bg-accent" : "bg-strong",
                  )}
                />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
