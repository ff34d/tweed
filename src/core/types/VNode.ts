import type { ComponentChild } from "./Component"
import type { TypedEventListener } from "./Web"

export interface VNode<PROPS extends object = object> {
   readonly tag: VNodeTag
   readonly status: VNodeLifecycleStatus
   attrs?: VNodeAttrs
   element?: VNodeElement
   children?: VNodeChildren<PROPS>
   parentVNode?: VNodeParentVNode

   onUpdate(callback: VoidFunction): void
   onMounted(callback: VoidFunction): void
   onUnmounted(callback: VoidFunction): void
   setStatus(status: VNodeLifecycleStatus): void
}

export type VNodeTag = string
export type VNodeParentVNode = VNode
export type VNodeElement<T extends HTMLElement = HTMLElement> = T
export type VNodeChildren<T extends object = object> = (
   | ComponentChild<T>
   | VNode<T>
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

export enum VNodeLifecycleStatus {
   UNMOUNTED,
   MOUNTING,
   MOUNTED,
   UPDATE,
   UNMOUNTING
}
