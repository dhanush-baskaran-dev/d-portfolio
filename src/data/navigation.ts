import type { ChromeLabels, NavItem } from "@/types";

/**
 * The ten sections in document order. `inNav: false` keeps a section out of the
 * navbar while leaving it a scroll-spy target, so the active pill still behaves
 * correctly while the user reads past it.
 */
export const navigation = [
  { id: "home", label: "Home", href: "#home", inNav: true },
  { id: "about", label: "About", href: "#about", inNav: true },
  { id: "skills", label: "Skills", href: "#skills", inNav: true },
  { id: "experience", label: "Experience", href: "#experience", inNav: true },
  { id: "projects", label: "Projects", href: "#projects", inNav: true },
  /* `inNav: false` while the section is commented out of `app/page.tsx` — a
     nav link to an id that is not in the document scrolls nowhere and leaves
     the scroll-spy observing a missing element. Flip both together. */
  { id: "articles", label: "Articles", href: "#articles", inNav: false },
  { id: "achievements", label: "Achievements", href: "#achievements", inNav: false },
  { id: "testimonials", label: "Testimonials", href: "#testimonials", inNav: false },
  { id: "contact", label: "Contact", href: "#contact", inNav: true },
] satisfies readonly NavItem[];

/** Chrome copy, so no shell component carries a user-facing string of its own. */
export const chrome = {
  skipToContent: "Skip to content",
  primaryNav: "Primary",
  mobileNav: "Mobile",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  homeLink: "Back to top of page",
  resume: "Resume",
  backToTop: "Back to top",
  copyright: "{name} · © {year}",
  credit: "Built with Next.js, React and Tailwind CSS",
} satisfies ChromeLabels;
