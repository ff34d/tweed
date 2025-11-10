import type { IComponent } from "./Component"
import type { IRender } from "./Render"
import type { IVNode } from "./VNode"

export interface IVdom {
   mount(component: IComponent, container: Element, props?: object): void
   update(newVNode: IVNode, oldVNode: IVNode): void
   unmount(component: IComponent): void
}

export interface IVdomConstructorProps {
   render: IRender
}
