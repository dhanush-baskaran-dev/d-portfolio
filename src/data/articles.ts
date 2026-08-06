import type { Article, SectionIntro } from "@/types";

export const articlesIntro = {
  eyebrow: "Writing",
  heading: "Notes from things that broke.",
  description:
    "I write when I have finished debugging something and want to keep the reasoning. Twenty-five so far; these are the six worth starting with.",
} satisfies SectionIntro;

export const articles = [
  {
    id: "rsc-data-flow",
    title: "Where your data actually flows in React Server Components",
    description:
      "The mental model that finally made RSC boundaries obvious, and the four places people accidentally ship a server value to the client.",
    category: "Architecture",
    date: "2025-11-18",
    readingMinutes: 11,
    href: "#",
    cover: {
      alt: "A diagram of the server and client component boundary",
      label: "rsc",
    },
  },
  {
    id: "postgres-index-strategy",
    title: "Choosing a Postgres index without guessing",
    description:
      "B-tree, GIN, BRIN, HNSW — a decision procedure based on the shape of your query rather than folklore, with the EXPLAIN output to check it.",
    category: "Databases",
    date: "2025-09-02",
    readingMinutes: 14,
    href: "#",
    cover: {
      alt: "An EXPLAIN ANALYZE plan with an index scan highlighted",
      label: "indexes",
    },
  },
  {
    id: "streaming-llm-uis",
    title: "Streaming LLM UIs that do not feel broken",
    description:
      "Token streaming is the easy part. Handling cancellation, partial markdown, tool calls, and errors mid-stream is where the work is.",
    category: "AI",
    date: "2025-07-21",
    readingMinutes: 9,
    href: "#",
    cover: {
      alt: "A streaming response rendering progressively in a chat interface",
      label: "streaming",
    },
  },
  {
    id: "hnsw-recall",
    title: "The recall you lose when you tune HNSW for speed",
    description:
      "Measured trade-offs between ef_search, index build time, and answer quality on a 12M-document corpus, with the benchmark script.",
    category: "AI",
    date: "2025-05-14",
    readingMinutes: 12,
    href: "#",
    cover: {
      alt: "A recall versus latency curve for an HNSW index",
      label: "hnsw",
    },
  },
  {
    id: "zero-downtime-migrations",
    title: "Schema migrations with nobody watching",
    description:
      "The expand-migrate-contract pattern, written out step by step, including the two lock types that will still take your table down.",
    category: "Databases",
    date: "2025-02-27",
    readingMinutes: 10,
    href: "#",
    cover: {
      alt: "A timeline of an expand, migrate and contract deployment",
      label: "migrations",
    },
  },
  {
    id: "bundle-budget",
    title: "Treating bundle size as a budget, not a metric",
    description:
      "How we held a 120KB first-load budget across eighteen months and four feature teams, and what we gave up to do it.",
    category: "Performance",
    date: "2024-12-09",
    readingMinutes: 8,
    href: "#",
    cover: {
      alt: "A bundle analysis treemap with a budget threshold marked",
      label: "budget",
    },
  },
] satisfies readonly Article[];
