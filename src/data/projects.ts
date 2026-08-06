import type { Project, SectionIntro } from "@/types";

export const projectsIntro = {
  eyebrow: "Projects",
  heading: "Things I built and then had to maintain.",
  description:
    "Five that are still running. Each one is what it does and what it is built on, not a feature list.",
} satisfies SectionIntro;

export const projects = [
  {
    id: "lumen",
    title: "Lumen",
    description:
      "A semantic search platform for internal documentation — hybrid BM25 and vector retrieval with a reranking pass and citation-grounded answers.",
    technologies: [
      "Next.js",
      "Go",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Google Cloud",
    ],
    featured: true,
    preview: {
      alt: "The Lumen search interface showing ranked results with citations",
      label: "lumen",
    },
    links: [
      { label: "GitHub", href: "https://github.com/username", external: true },
      { label: "Live Demo", href: "https://github.com/username", external: true },
    ],
  },
  {
    id: "confluent-edit",
    title: "Draftline",
    description:
      "A realtime collaborative editor built on a CRDT core, with presence, comment threads, and offline reconciliation that does not lose work.",
    technologies: ["TypeScript", "React", "WebSockets", "Yjs", "Fly.io"],
    featured: false,
    preview: {
      alt: "The Draftline editor with multiple cursors and a comment thread open",
      label: "draftline",
    },
    links: [
      { label: "GitHub", href: "https://github.com/username", external: true },
      { label: "Live Demo", href: "https://github.com/username", external: true },
    ],
  },
  {
    id: "beacon",
    title: "Beacon",
    description:
      "A self-hosted observability dashboard that reads OpenTelemetry traces straight from ClickHouse — no agent, no per-seat pricing, no vendor lock.",
    technologies: ["Go", "ClickHouse", "React", "OpenTelemetry", "Docker"],
    featured: false,
    preview: {
      alt: "The Beacon dashboard showing a trace waterfall and latency histogram",
      label: "beacon",
    },
    links: [
      { label: "GitHub", href: "https://github.com/username", external: true },
      { label: "Live Demo", href: "https://github.com/username", external: true },
    ],
  },
  {
    id: "hark",
    title: "hark",
    description:
      "A developer CLI that turns an OpenAPI schema into a typed client, a mock server, and a contract test suite in one command.",
    technologies: ["TypeScript", "Node.js", "Rust", "GitHub Actions"],
    featured: false,
    preview: {
      alt: "The hark command line tool generating a typed client from a schema",
      label: "hark",
    },
    links: [
      { label: "GitHub", href: "https://github.com/username", external: true },
    ],
  },
  {
    id: "codex-assistant",
    title: "Ledger Assistant",
    description:
      "A RAG-based docs assistant for a fintech API — streams grounded answers, refuses to guess, and links the exact paragraph it used.",
    technologies: ["Next.js", "Python", "pgvector", "Temporal", "Vercel"],
    featured: false,
    preview: {
      alt: "The Ledger Assistant answering a question with linked source paragraphs",
      label: "ledger",
    },
    links: [
      { label: "GitHub", href: "https://github.com/username", external: true },
      { label: "Live Demo", href: "https://github.com/username", external: true },
    ],
  },
] satisfies readonly Project[];
