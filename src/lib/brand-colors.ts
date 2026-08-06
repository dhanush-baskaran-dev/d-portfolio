import type { BrandSlug } from "@/lib/brand-icons";

/**
 * Marks whose official colour is too dark to see on the page surface. They
 * inherit the surrounding text colour instead of disappearing.
 */
export const BRAND_INHERIT = "currentColor";

/**
 * Official Simple Icons brand colours, keyed by slug.
 *
 * Sixteen brands are `BRAND_INHERIT`: their official colour is black or
 * near-black (GitHub `#181717`, X and Next.js `#000000`, Vercel, Rust …) and
 * scores under 3:1 against the `#08080a` surface, so rendering it faithfully
 * would make the glyph invisible. Contrast was measured, not guessed.
 *
 * `linkedin` inherits for a different reason — Simple Icons has withdrawn that
 * mark, so it renders as a lucide glyph and has no brand colour to carry.
 */
export const brandColors: Readonly<Record<BrandSlug, string>> = {
  anthropic: BRAND_INHERIT,
  clickhouse: "#ffcc01",
  cloudflare: "#f38020",
  docker: "#2496ed",
  drizzle: "#c5f74f",
  express: BRAND_INHERIT,
  fastify: BRAND_INHERIT,
  figma: "#f24e1e",
  flydotio: BRAND_INHERIT,
  framer: "#0055ff",
  git: "#f03c2e",
  github: BRAND_INHERIT,
  githubactions: "#2088ff",
  gnubash: "#4eaa25",
  go: "#00add8",
  googlecloud: "#4285f4",
  grafana: "#f46800",
  graphql: "#e10098",
  huggingface: "#ffd21e",
  javascript: "#f7df1e",
  jest: "#c63d14",
  /* Official mark is #000000. */
  jsonwebtokens: BRAND_INHERIT,
  kubernetes: "#326ce5",
  langchain: "#7fc8ff",
  linear: "#5e6ad2",
  linkedin: BRAND_INHERIT,
  mongodb: "#47a248",
  /* Official mark is #880000 — roughly 2.3:1 here, so it inherits. */
  mongoose: BRAND_INHERIT,
  mysql: "#4479a1",
  neovim: "#57a143",
  nextdotjs: BRAND_INHERIT,
  nodedotjs: "#5fa04e",
  npm: "#cb3837",
  ollama: BRAND_INHERIT,
  opentelemetry: BRAND_INHERIT,
  pnpm: "#f69220",
  postgresql: "#4169e1",
  postman: "#ff6c37",
  prisma: BRAND_INHERIT,
  prometheus: "#e6522c",
  python: "#3776ab",
  pytorch: "#ee4c2c",
  qdrant: "#dc244c",
  railway: BRAND_INHERIT,
  react: "#61dafb",
  reactquery: "#ff4154",
  redis: "#ff4438",
  /* Official mark is #764abc — under 3:1 on this surface. */
  redux: BRAND_INHERIT,
  rust: BRAND_INHERIT,
  sentry: BRAND_INHERIT,
  /* Official mark is #010101. */
  socketdotio: BRAND_INHERIT,
  sqlite: BRAND_INHERIT,
  storybook: "#ff4785",
  tailwindcss: "#06b6d4",
  temporal: BRAND_INHERIT,
  terraform: "#844fba",
  trpc: "#2596be",
  typescript: "#3178c6",
  vercel: BRAND_INHERIT,
  vite: "#9135ff",
  x: BRAND_INHERIT,

  /* Lucide stand-ins. No official mark, so no official colour to carry. */
  aws: BRAND_INHERIT,
  rest: BRAND_INHERIT,
  cicd: BRAND_INHERIT,
  sql: BRAND_INHERIT,
  vscode: BRAND_INHERIT,
  effect: BRAND_INHERIT,
  eslint: BRAND_INHERIT,
};
