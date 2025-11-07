import { type IVNode, type VNodeAttrs, type VNodeChildren, type VNodeTag } from "../types"

export function h<T extends object = object>(
   tag: VNodeTag,
   attrs?: VNodeAttrs,
   children?: VNodeChildren<T>
): IVNode<T> {
   return {
      tag,
      attrs,
      children
   }
}
