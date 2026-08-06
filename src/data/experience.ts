import type { ExperienceEntry, ExperienceLabels, SectionIntro } from "@/types";

export const experienceIntro = {
  eyebrow: "Experience",
  heading: "Two roles, one stack.",
  description:
    "Four years of building product surfaces and the services behind them, across React, Node and a relational core.",
} satisfies SectionIntro;

export const experienceLabels = {
  present: "Present",
  timeline: "Work history, most recent first",
  highlights: "Highlights",
  technologies: "Technologies",
} satisfies ExperienceLabels;

/**
 * ────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER DETAILS — REPLACE BEFORE THIS GOES PUBLIC.
 *
 * The companies, titles and years are real. Everything else is a realistic
 * stand-in written to make the section look finished, and none of it is a claim
 * you have verified:
 *
 *   • `location` on both entries is invented — set your real city and work mode.
 *   • `duration` gives years only. If you want months ("Mar 2022 — Jul 2023"),
 *     write them here; the string is rendered verbatim and never derived.
 *   • The bullets describe the *kind* of work, not specific outcomes. They read
 *     as responsibilities because that is all they can honestly be right now.
 *     Replacing even one per role with a number — users, requests, latency,
 *     bundle size, release cadence — is the single highest-value edit on this
 *     page.
 *   • `technologies` is a plausible subset. Trim anything you did not use.
 *
 * `highlights` IS the bullets array: `ExperienceItem` renders it as a
 * `list-disc` list, so adding or removing a line here changes the section with
 * no component edit. Two to four per role reads best.
 *
 * ORDER: this array renders top to bottom as most-recent-first, and the
 * alternating desktop layout puts entry 1 on the right of the rail.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const experience = [
  {
    id: "workativ",
    company: "Workativ",
    monogram: "W",
    position: "Software Engineer",
    duration: "2023 — Present",
    // TODO(dhanush): real city and work mode.
    location: "Chennai, IN · Hybrid",
    current: true,
    highlights: [
      "Build and maintain full-stack features across React, TypeScript, Node.js and Express.",
      "Design and integrate REST APIs and relational data models using SQL and Prisma.",
      "Write backend services in Effect.js, improving type-safety and error handling.",
      "Collaborate on performance and reliability improvements across the web platform.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Effect.js",
      "Prisma",
      "SQL",
    ],
  },
  {
    id: "aspire-systems",
    company: "Aspire Systems",
    monogram: "AS",
    position: "Associate Software Engineer",
    duration: "2022 — 2023 · 1.4 years",
    // TODO(dhanush): real city and work mode.
    location: "Chennai, IN · On-site",
    current: false,
    highlights: [
      "Developed responsive React frontends and reusable components for client web apps.",
      "Built and consumed Node/Express REST APIs backed by MongoDB.",
      "Fixed bugs and improved UI performance across ongoing client projects.",
    ],
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB"],
  },
] satisfies readonly ExperienceEntry[];
