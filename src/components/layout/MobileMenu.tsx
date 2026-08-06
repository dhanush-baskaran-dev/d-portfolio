"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { icons } from "@/lib/icons";
import {
  DISTANCE,
  entranceTransition,
  reducedTransition,
  stagger,
  stateTransition,
} from "@/lib/motion";
import { chrome, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";

const CloseIcon = icons.close;

const NAV_ITEMS = navigation.filter((item) => item.inNav);

export interface MobileMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
  /** Id of the section currently in view, so the overlay marks it too. */
  readonly activeId: string | undefined;
}

/**
 * Full-screen navigation overlay (SPEC §4.1).
 *
 * Escape closes it, `useFocusTrap` confines Tab and hands focus back to the
 * hamburger on close, and `useLockBodyScroll` stops the page behind it from
 * scrolling — including the scrollbar-width compensation, so nothing shifts
 * sideways when it opens.
 */
export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const reduced = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(open, containerRef);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const itemVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: reducedTransition } }
    : {
        hidden: { opacity: 0, y: DISTANCE.sm },
        visible: { opacity: 1, y: 0, transition: entranceTransition },
      };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={chrome.mobileNav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduced ? reducedTransition : stateTransition}
          className="fixed inset-0 z-60 bg-surface lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-mono text-eyebrow uppercase text-tertiary">
              {chrome.mobileNav}
            </span>

            <IconButton label={chrome.closeMenu} variant="ghost" onClick={onClose}>
              <CloseIcon className="size-5" aria-hidden="true" />
            </IconButton>
          </div>

          <m.nav
            aria-label={chrome.mobileNav}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 px-6 pt-8"
          >
            {NAV_ITEMS.map((item) => {
              const active = item.id === activeId;

              return (
                <m.a
                  key={item.id}
                  href={item.href}
                  variants={itemVariants}
                  onClick={onClose}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-4 text-heading transition-colors duration-standard ease-state",
                    active ? "bg-accent-subtle text-accent" : "text-secondary",
                  )}
                >
                  {item.label}
                </m.a>
              );
            })}

            <m.div variants={itemVariants} className="pt-6">
              <Button
                href={profile.resumeHref}
                variant="secondary"
                size="lg"
                block
                onClick={onClose}
              >
                {chrome.resume}
              </Button>
            </m.div>
          </m.nav>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
