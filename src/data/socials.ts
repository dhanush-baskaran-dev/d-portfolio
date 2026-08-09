import type { Social } from "@/types";

/**
 * `brand` values are Simple Icons slugs, resolved by `BrandIcon`. LinkedIn is
 * the one mark Simple Icons has withdrawn, so it falls through to lucide — see
 * `src/lib/brand-icons.ts`.
 */
export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@username",
    href: "https://github.com/dhanush-baskaran-dev",
    brand: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/username",
    href: "https://linkedin.com/dhanush-baskaran-dev",
    brand: "linkedin",
  },
  // {
  //   id: "x",
  //   label: "X",
  //   handle: "@username",
  //   href: "https://x.com/username",
  //   brand: "x",
  // },
] satisfies readonly Social[];
