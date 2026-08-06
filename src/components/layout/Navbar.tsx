"use client";

import { m } from "framer-motion";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useScrolled } from "@/hooks/useScrolled";
import { chrome, navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { NAVBAR_SCROLL_THRESHOLD } from "@/lib/constants";
import { icons } from "@/lib/icons";
import { stateTransition } from "@/lib/motion";
import { cn } from "@/utils/cn";

const MenuIcon = icons.menu;

/**
 * Module scope, so both arrays keep a stable identity across renders — the
 * scroll-spy observer is keyed on the id list and would otherwise be torn down
 * and rebuilt on every render.
 */
const SECTION_IDS = navigation.map((item) => item.id);
const NAV_ITEMS = navigation.filter((item) => item.inNav);

/**
 * Fixed header (SPEC §4.1).
 *
 * Transparent until 24px of scroll, then a glass layer fades in behind the
 * content. The glass is a separate absolutely-positioned `GlassPanel` rather
 * than a class swap on the header, so the transition animates `opacity` alone
 * and never repaints a backdrop filter mid-scroll.
 *
 * The active pill is a `layoutId`-shared element: Framer moves the single span
 * between links rather than cross-fading two of them.
 */
export function Navbar() {
  const scrolled = useScrolled(NAVBAR_SCROLL_THRESHOLD);
  const activeId = useActiveSection(SECTION_IDS);
  const reduced = useReducedMotionSafe();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16">
        <GlassPanel
          radius="none"
          edge="bottom"
          className={cn(
            "absolute inset-0 transition-opacity duration-standard ease-state",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />

        <Container className="relative flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            aria-label={chrome.homeLink}
            className="flex min-h-11 items-center gap-3 rounded-lg"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-lg border border-strong bg-raised font-mono text-sm text-primary">
              {profile.monogram}
            </span>
            <span className="hidden text-sm font-medium text-primary sm:inline">
              {profile.name}
            </span>
          </a>

          <nav
            aria-label={chrome.primaryNav}
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = item.id === activeId;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center rounded-xl px-4 text-sm",
                        "transition-colors duration-standard ease-state",
                        active
                          ? "text-primary"
                          : "text-secondary can-hover:hover:text-primary",
                      )}
                    >
                      {active ? (
                        <m.span
                          layoutId="nav-pill"
                          aria-hidden="true"
                          transition={reduced ? { duration: 0 } : stateTransition}
                          className="absolute inset-0 rounded-xl bg-accent-subtle"
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden`: the primitive already sets a
                display, and cn() joins without resolving conflicts. */}
            <span className="hidden lg:block">
              <Button href={profile.resumeHref} variant="ghost" size="sm">
                {chrome.resume}
              </Button>
            </span>

            <IconButton
              label={chrome.openMenu}
              variant="ghost"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <MenuIcon className="size-5" aria-hidden="true" />
            </IconButton>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
