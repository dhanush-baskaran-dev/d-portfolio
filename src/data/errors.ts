import type { ErrorCopy } from "@/types";

export const errors = {
  boundary: {
    title: "This part didn't load",
    description:
      "Something in this panel failed. The rest of the page is unaffected.",
    retry: "Try again",
  },
  route: {
    title: "Something went wrong",
    description:
      "The page hit an error on the way in. Reloading usually clears it.",
    retry: "Reload this page",
  },
  global: {
    title: "Something went wrong",
    description: "The site failed to start. Reloading usually clears it.",
    retry: "Reload",
  },
} satisfies ErrorCopy;
