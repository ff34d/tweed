import type { VNode } from "./VNode"

export interface IRender {
   mount(vnode: VNode, container: Element): void
   unmount(el: Element): void
}
