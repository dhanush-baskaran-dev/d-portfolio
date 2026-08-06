"use client";

import { useEffect, useState } from "react";

import { profile } from "@/data/profile";
import {
  PRELOADER_FADE_DURATION,
  PRELOADER_MAX_DURATION,
  PRELOADER_MIN_DURATION,
  REDUCED_MOTION_QUERY,
} from "@/lib/constants";
import { cn } from "@/utils/cn";

type Phase = "visible" | "leaving" | "done";

/**
 * The first-load overlay.
 *
 * Rendered in the initial HTML rather than mounted from an effect: an overlay
 * that appears *after* hydration would flash the page it is meant to cover.
 * It leaves on `window.load`, floored and capped by the timing constants, then
 * unmounts — `phase === "done"` returns `null`, so it is gone from the DOM
 * rather than left sitting invisible over the page.
 *
 * It shows once per page load because it mounts once per page load. There is no
 * "seen" flag: this is a single-page site, so scrolling and hash links never
 * remount it, and a genuine reload is a genuine first load.
 *
 * Under reduced motion it is dismissed on the first effect pass — no fade, no
 * mark animation, no rule. The `motion-safe:` variants mean those animations
 * are never emitted for those users in the first place.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setPhase("done");
      return;
    }

    const mountedAt = Date.now();
    let leaveTimer: number | undefined;
    let removeTimer: number | undefined;
    let dismissed = false;

    /* `load` and the cap both race to call this; the first one wins. */
    const dismiss = () => {
      if (dismissed) {
        return;
      }

      dismissed = true;
      const held = Date.now() - mountedAt;

      leaveTimer = window.setTimeout(
        () => {
          setPhase("leaving");
          removeTimer = window.setTimeout(
            () => setPhase("done"),
            PRELOADER_FADE_DURATION,
          );
        },
        Math.max(0, PRELOADER_MIN_DURATION - held),
      );
    };

    const capTimer = window.setTimeout(dismiss, PRELOADER_MAX_DURATION);

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => {
      window.clearTimeout(capTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      /* Decorative: the page beneath carries the real content, and holding
         focus here for a second would strand keyboard and screen reader users. */
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-100 flex items-center justify-center bg-surface",
        "transition-opacity duration-entrance ease-state",
        phase === "leaving" ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="inline-flex size-14 items-center justify-center rounded-xl border border-strong bg-raised font-mono text-lg text-primary motion-safe:animate-preloader-mark">
          {profile.monogram}
        </span>

        <span className="font-mono text-eyebrow uppercase text-tertiary motion-safe:animate-preloader-mark">
          {profile.name}
        </span>

        {/* The rule is the only thing that reads as progress. It is a fixed
            sweep, not a real completion percentage — claiming otherwise with a
            bar that stalls at 80% is the cheap version of this. */}
        <span className="h-px w-32 overflow-hidden rounded-full bg-strong">
          <span className="block h-full w-full origin-left bg-accent motion-safe:animate-preloader-line" />
        </span>
      </div>
    </div>
  );
}
