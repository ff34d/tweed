import type { IVNode } from "../types"

export function isVNode(target: unknown): target is IVNode {
   return (
      target !== null &&
      typeof target === "object" &&
      "tag" in target &&
      "attrs" in target
   )
}
