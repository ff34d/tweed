import type { VNode } from "./VNode"

export interface IVdom {
   readonly root: VNode

   mount(vnode: VNode, container: Element): void
   update(vnode: VNode): void
   unmount(vnode: VNode): void
}

export interface IVdomConstructorProps {
   vnode: VNode
}
