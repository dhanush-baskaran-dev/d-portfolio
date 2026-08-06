import type { Seo } from "@/types";

/**
 * Every value the metadata export, sitemap, robots file and OpenGraph image
 * read. `NEXT_PUBLIC_SITE_URL` overrides `url` at build time when it is set;
 * with an empty environment the literal below is used.
 */
export const seo = {
  siteName: "Dhanush Baskaran",
  title: "Dhanush Baskaran — Full-Stack Developer",
  titleTemplate: "%s · Dhanush Baskaran",
  description:
    "Full-stack developer building web products with the MERN stack and modern TypeScript. Around four years across React, Node, MongoDB and SQL.",
  // TODO(dhanush): real domain. Also set NEXT_PUBLIC_SITE_URL in the deploy env,
  // which overrides this at build time.
  url: "https://example.com",
  locale: "en_IN",
  keywords: [
    "full-stack developer",
    "MERN stack",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Prisma",
  ],
  // TODO(dhanush): real handle, or remove the Twitter metadata in app/layout.tsx.
  twitterHandle: "@username",
  ogImage: {
    alt: "Dhanush Baskaran — Full-Stack Developer working across the MERN stack",
    width: 1200,
    height: 630,
    eyebrow: "Full-Stack Developer",
  },
} satisfies Seo;

/** Resolved origin, with the environment taking precedence over the literal. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? seo.url;
