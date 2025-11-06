import type { VNode } from "./VNode"

export interface IVdom {
   readonly root: VNode
}

export interface IVdomConstructorProps {
   vnode: VNode
}
