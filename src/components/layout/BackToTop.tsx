"use client";

import { AnimatePresence, m } from "framer-motion";

import { IconButton } from "@/components/ui/IconButton";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useScrolled } from "@/hooks/useScrolled";
import { chrome } from "@/data/navigation";
import { BACK_TO_TOP_THRESHOLD } from "@/lib/constants";
import { icons } from "@/lib/icons";
import { reducedTransition, stateTransition } from "@/lib/motion";

const ArrowUpIcon = icons["arrow-up"];

/**
 * The floating back-to-top control (SPEC §4.11).
 *
 * It is a real anchor to `#home`, not a `scrollTo` handler. That gets three
 * things for free: it is keyboard-reachable and announces as a link, the smooth
 * scroll comes from `html { scroll-behavior: smooth }` in the base layer, and
 * the reduced-motion block already overrides that to `auto` — so honouring the
 * preference needs no branch here.
 *
 * `AnimatePresence` unmounts it below the threshold rather than leaving an
 * invisible button over the page swallowing clicks. Under reduced motion the
 * entrance is opacity-only, so nothing slides.
 */
export function BackToTop() {
  const scrolled = useScrolled(BACK_TO_TOP_THRESHOLD);
  const reduced = useReducedMotionSafe();

  return (
    <AnimatePresence>
      {scrolled ? (
        <m.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={reduced ? reducedTransition : stateTransition}
          /* Below the navbar's z-50 and the preloader's z-100, above content. */
          className="fixed right-6 bottom-6 z-40 md:right-8 md:bottom-8"
        >
          <IconButton
            href="#home"
            label={chrome.backToTop}
            variant="outline"
            size="md"
          >
            <ArrowUpIcon className="size-5" aria-hidden="true" />
          </IconButton>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
