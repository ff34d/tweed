import type { ComponentChild } from "./Component"
import type { TypedEventListener } from "./Web"

export interface IVNode<PROPS extends object = object> {
   readonly tag: VNodeTag
   readonly attrs?: VNodeAttrs
   readonly children?: VNodeChildren<PROPS>

   element?: VNodeElement
   parentVNode?: VNodeParentVNode
}

export type IVNodeConstructorProps<T extends object = object> = Pick<
   IVNode<T>,
   "tag" | "attrs" | "children"
>

export type VNodeTag = string
export type VNodeParentVNode = IVNode
export type VNodeElement<T extends HTMLElement = HTMLElement> = T
export type VNodeChildren<T extends object = object> = (
   | ComponentChild<T>
   | IVNode<T>
   | string
)[]

export type VNodeAttrs = Record<string, VNodeAttrValue>
export type VNodeAttrValue =
   | string
   | number
   | boolean
   | null
   | undefined
   | TypedEventListener
