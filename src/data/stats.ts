import type { Stat } from "@/types";

/**
 * The 2×2 grid in About. Values count up once on first view.
 *
 * Only `years` is confirmed. The other three are placeholders — see the TODOs.
 * A wrong number here is worse than no number, so either correct them or delete
 * the entries; the grid lays out fine with two or three.
 */
export const stats = [
  { id: "years", value: 4, suffix: "", label: "Years experience", icon: "calendar", tone: "sky" },
  // TODO(dhanush): real count of shipped projects.
  { id: "projects", value: 12, suffix: "+", label: "Projects delivered", icon: "rocket", tone: "violet" },
  // TODO(dhanush): real count, or drop this card.
  { id: "technologies", value: 25, suffix: "+", label: "Technologies used", icon: "layers", tone: "teal" },
  // TODO(dhanush): you have not published articles yet — set a real number or
  // delete this entry *and* the Articles section, which is still placeholder.
  { id: "articles", value: 0, suffix: "", label: "Articles written", icon: "pen", tone: "amber" },
] satisfies readonly Stat[];
