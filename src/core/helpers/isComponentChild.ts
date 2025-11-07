import type { ComponentChild } from "../types"

export function isComponentChild(target: unknown): target is ComponentChild {
   return (
      target !== null &&
      typeof target === "object" &&
      "instance" in target &&
      "props" in target
   )
}
