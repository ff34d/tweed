import type { IVNode } from "./VNode"

export interface IVdom {
   readonly root: IVNode

   mount(vnode: IVNode, container: Element): void
   update(vnode: IVNode): void
   unmount(vnode: IVNode): void
}

export interface IVdomConstructorProps {
   vnode: IVNode
}
