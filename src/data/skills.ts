import type { SectionIntro, SkillCategory, SkillsLabels } from "@/types";

export const skillsIntro = {
  eyebrow: "Skills",
  heading: "What I reach for, and how often.",
  description:
    "Five categories, ordered by how much of my week each one actually occupies. The levels are honest: Expert means I have run it in production and been on the hook when it broke.",
} satisfies SectionIntro;

export const skillsLabels = {
  railLabel: "Skill categories",
  panelLabel: "Skills in the selected category",
  allLabel: "All",
  /**
   * The single level→label map. Both the meter's visible caption and its
   * accessible sentence read from here, so the two can never disagree.
   */
  proficiencyLevels: {
    1: "Learning",
    2: "Familiar",
    3: "Proficient",
    4: "Advanced",
    5: "Expert",
  },
  proficiencyFormat: "{name} — {level}",
} satisfies SkillsLabels;

/**
 * `brand` values are Simple Icons slugs, resolved to a glyph by
 * `lib/brand-icons.ts`. A slug that is not in that map fails to typecheck.
 *
 * A few entries — REST APIs, CI/CD, SQL — name a practice or a language rather
 * than a product, so they resolve to a lucide glyph instead of a vendor logo.
 *
 * Levels are deliberately spread. Everything at Expert would say nothing, and
 * the meter is only worth reading if the low numbers are honest.
 */
export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "code",
    skills: [
      { id: "fe-react", name: "React", brand: "react", proficiency: 5 },
      { id: "fe-typescript", name: "TypeScript", brand: "typescript", proficiency: 4 },
      { id: "fe-javascript", name: "JavaScript", brand: "javascript", proficiency: 5 },
      { id: "fe-nextjs", name: "Next.js", brand: "nextdotjs", proficiency: 3 },
      { id: "fe-tailwind", name: "Tailwind CSS", brand: "tailwindcss", proficiency: 4 },
      { id: "fe-redux", name: "Redux", brand: "redux", proficiency: 3 },
      { id: "fe-react-query", name: "React Query", brand: "reactquery", proficiency: 3 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    skills: [
      { id: "be-node", name: "Node.js", brand: "nodedotjs", proficiency: 5 },
      { id: "be-express", name: "Express.js", brand: "express", proficiency: 4 },
      { id: "be-rest", name: "REST APIs", brand: "rest", proficiency: 4 },
      { id: "be-auth", name: "JWT / Auth", brand: "jsonwebtokens", proficiency: 4 },
      { id: "be-effect", name: "Effect.js", brand: "effect", proficiency: 3 },
      { id: "be-websockets", name: "WebSockets", brand: "socketdotio", proficiency: 3 },
      { id: "be-graphql", name: "GraphQL", brand: "graphql", proficiency: 2 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "database",
    skills: [
      { id: "db-mongodb", name: "MongoDB", brand: "mongodb", proficiency: 4 },
      { id: "db-mongoose", name: "Mongoose", brand: "mongoose", proficiency: 4 },
      { id: "db-sql", name: "SQL", brand: "sql", proficiency: 4 },
      { id: "db-prisma", name: "Prisma", brand: "prisma", proficiency: 3 },
      { id: "db-postgres", name: "PostgreSQL", brand: "postgresql", proficiency: 3 },
      { id: "db-mysql", name: "MySQL", brand: "mysql", proficiency: 3 },
      { id: "db-redis", name: "Redis", brand: "redis", proficiency: 2 },
    ],
  },
  {
    id: "cloud",
    label: "DevOps & Cloud",
    icon: "cloud",
    skills: [
      { id: "cl-docker", name: "Docker", brand: "docker", proficiency: 3 },
      { id: "cl-vercel", name: "Vercel", brand: "vercel", proficiency: 3 },
      { id: "cl-cicd", name: "CI/CD", brand: "cicd", proficiency: 3 },
      { id: "cl-aws", name: "AWS", brand: "aws", proficiency: 2 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    skills: [
      { id: "tl-git", name: "Git", brand: "git", proficiency: 4 },
      { id: "tl-github", name: "GitHub", brand: "github", proficiency: 4 },
      { id: "tl-vscode", name: "VS Code", brand: "vscode", proficiency: 5 },
      { id: "tl-postman", name: "Postman", brand: "postman", proficiency: 4 },
      { id: "tl-npm", name: "npm / pnpm", brand: "npm", proficiency: 4 },
      { id: "tl-eslint", name: "ESLint", brand: "eslint", proficiency: 3 },
      { id: "tl-jest", name: "Jest", brand: "jest", proficiency: 3 },
      { id: "tl-figma", name: "Figma", brand: "figma", proficiency: 2 },
    ],
  },
] satisfies readonly SkillCategory[];
