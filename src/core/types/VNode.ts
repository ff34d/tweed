import type { ComponentChild } from "./Component"
import type { TypedEventListener } from "./Web"

export interface IVNode<PROPS extends object = object> {
   readonly tag: VNodeTag
   status: VNodeLifecycle
   attrs?: VNodeAttrs
   element?: VNodeElement
   children?: VNodeChildren<PROPS>
   parentVNode?: VNodeParentVNode
}

export type VNodeTag = string
export type VNodeParentVNode = IVNode
export type VNodeElement<T extends HTMLElement = HTMLElement> = T
export type VNodeChildren<T extends object = object> = (ComponentChild<T> | string)[]

export type VNodeAttrs = Record<string, VNodeAttrValue>
export type VNodeAttrValue =
   | string
   | number
   | boolean
   | null
   | undefined
   | TypedEventListener

export enum VNodeLifecycle {
   UNMOUNTED,
   MOUNTING,
   MOUNTED,
   UPDATE,
   UNMOUNTING
}
