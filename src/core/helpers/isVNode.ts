import { VNode } from "../models"
import type { IVNode } from "../types"

export function isVNode(target: unknown): target is IVNode {
   return target instanceof VNode
}
