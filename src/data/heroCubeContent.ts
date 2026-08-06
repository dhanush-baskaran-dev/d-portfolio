import type { HeroCubeContent } from "@/types";

/**
 * The six faces of the hero cube.
 *
 * Content only — nothing here describes how the cube moves or how brightly it
 * burns. Those live in `data/heroCubeConfig.ts`.
 *
 * Colours stay in the cool family the cube was tuned to, but with real chroma
 * between them — the previous ramp sat so close to white that no amount of
 * fixing the material would have made the faces look different from one
 * another. Six unrelated hues would read as a toy; six cool ones separated by
 * saturation and temperature read as one object with distinct faces.
 *
 * Keep them reasonably light. A glyph darker than roughly 45% luminance falls
 * under `bloomThreshold` and stops glowing altogether.
 *
 * Literals because a WebGL material cannot resolve a CSS custom property.
 */
export const heroCubeContent = {
  ariaLabel:
    "A slowly rotating cube, each face carrying a bracket pair from a different language",
  faces: [
    { id: "braces", symbol: "{ }", color: "#eaf2ff" },
    { id: "tag", symbol: "</>", color: "#5b9bff" },
    { id: "brackets", symbol: "[ ]", color: "#63e0d8" },
    { id: "parens", symbol: "( )", color: "#a48bff" },
    { id: "arrow", symbol: "=>", color: "#7ce8a8" },
    { id: "comment", symbol: "//", color: "#8fa6c8" },
  ],
} satisfies HeroCubeContent;
