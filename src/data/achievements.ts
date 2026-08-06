import type { Achievement, SectionIntro } from "@/types";

export const achievementsIntro = {
  eyebrow: "Recognition",
  heading: "A short list, honestly kept.",
} satisfies SectionIntro;

export const achievements = [
  {
    id: "hark-oss",
    type: "Open Source",
    title: "Maintainer, hark",
    issuer: "4.2k weekly installs · 38 contributors",
    year: "2022 — Present",
    icon: "git-branch",
    link: { label: "hark on GitHub", href: "https://github.com/username", external: true },
  },
  {
    id: "aws-sa-pro",
    type: "Certification",
    title: "Solutions Architect — Professional",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "certificate",
  },
  {
    id: "internal-award",
    type: "Award",
    title: "Engineering Impact Award",
    issuer: "Kestrel Systems",
    year: "2022",
    icon: "award",
  },
  {
    id: "reactindia-talk",
    type: "Speaking",
    title: "Streaming UIs Without the Jank",
    issuer: "React Bengaluru meetup",
    year: "2025",
    icon: "mic",
    link: { label: "Talk page", href: "#", external: false },
  },
] satisfies readonly Achievement[];
