"use client";

import { useEffect, useState } from "react";

/**
 * True once the window has scrolled past `threshold`. Used by the navbar to
 * leave its transparent state and by back-to-top to appear.
 *
 * The listener is passive and only re-renders when the boolean flips, so a
 * scroll does not cost a render per frame.
 */
export function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const read = () => {
      setScrolled(window.scrollY > threshold);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [threshold]);

  return scrolled;
}
