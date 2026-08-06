import {
  Cloud,
  Database,
  FileCode2,
  Linkedin,
  Network,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SiAnthropic,
  SiClickhouse,
  SiCloudflare,
  SiDocker,
  SiDrizzle,
  SiEffect,
  SiEslint,
  SiExpress,
  SiFastify,
  SiFigma,
  SiFlydotio,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiHuggingface,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiKubernetes,
  SiLangchain,
  SiLinear,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiOllama,
  SiOpentelemetry,
  SiPnpm,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPrometheus,
  SiPython,
  SiPytorch,
  SiQdrant,
  SiRailway,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiRust,
  SiSentry,
  SiSocketdotio,
  SiSqlite,
  SiStorybook,
  SiTailwindcss,
  SiTemporal,
  SiTerraform,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVite,
  SiX,
} from "react-icons/si";

/**
 * The props any brand glyph must accept. Narrow on purpose: it is the common
 * ground between a Simple Icons component and a lucide one, and it is all
 * `BrandIcon` ever passes.
 */
export interface BrandGlyphProps {
  readonly className?: string;
  /** Both react-icons and lucide read this and paint the glyph with it. */
  readonly color?: string;
  readonly role?: string;
  readonly "aria-hidden"?: boolean;
  readonly "aria-label"?: string;
}

export type BrandGlyph = ComponentType<BrandGlyphProps>;

/**
 * The only place a brand glyph is named.
 *
 * Keys are Simple Icons slugs, so `data/` keeps referring to icons as strings
 * and no section component ever imports one.
 *
 * A handful of entries are lucide glyphs rather than Simple Icons marks, and
 * fall into two groups. Some brands have withdrawn their mark on trademark
 * request, so react-icons ships nothing for them — `linkedin` and `aws`. The
 * rest are not brands at all: `rest`, `cicd` and `sql` name a practice or a
 * language, and giving them a vendor logo would be a lie about the skill. Both
 * groups take `BRAND_INHERIT` in `brand-colors.ts`, since a lucide glyph has no
 * official colour to carry.
 */
export const brandIcons = {
  anthropic: SiAnthropic,
  clickhouse: SiClickhouse,
  cloudflare: SiCloudflare,
  docker: SiDocker,
  drizzle: SiDrizzle,
  effect: SiEffect,
  eslint: SiEslint,
  express: SiExpress,
  fastify: SiFastify,
  figma: SiFigma,
  flydotio: SiFlydotio,
  framer: SiFramer,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  gnubash: SiGnubash,
  go: SiGo,
  googlecloud: SiGooglecloud,
  grafana: SiGrafana,
  graphql: SiGraphql,
  huggingface: SiHuggingface,
  javascript: SiJavascript,
  jest: SiJest,
  jsonwebtokens: SiJsonwebtokens,
  kubernetes: SiKubernetes,
  langchain: SiLangchain,
  linear: SiLinear,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  mysql: SiMysql,
  neovim: SiNeovim,
  nextdotjs: SiNextdotjs,
  nodedotjs: SiNodedotjs,
  npm: SiNpm,
  ollama: SiOllama,
  opentelemetry: SiOpentelemetry,
  pnpm: SiPnpm,
  postgresql: SiPostgresql,
  postman: SiPostman,
  prisma: SiPrisma,
  prometheus: SiPrometheus,
  python: SiPython,
  pytorch: SiPytorch,
  qdrant: SiQdrant,
  railway: SiRailway,
  react: SiReact,
  reactquery: SiReactquery,
  redis: SiRedis,
  redux: SiRedux,
  rust: SiRust,
  sentry: SiSentry,
  socketdotio: SiSocketdotio,
  sqlite: SiSqlite,
  storybook: SiStorybook,
  tailwindcss: SiTailwindcss,
  temporal: SiTemporal,
  terraform: SiTerraform,
  trpc: SiTrpc,
  typescript: SiTypescript,
  vercel: SiVercel,
  vite: SiVite,
  x: SiX,

  /* Lucide stand-ins — see the note above. */
  linkedin: Linkedin,
  aws: Cloud,
  rest: Network,
  cicd: Workflow,
  sql: Database,
  vscode: FileCode2,
} as const satisfies Readonly<Record<string, BrandGlyph>>;

/** Every brand mark the site is allowed to render. */
export type BrandSlug = keyof typeof brandIcons;

export function resolveBrandGlyph(slug: BrandSlug): BrandGlyph {
  return brandIcons[slug];
}
