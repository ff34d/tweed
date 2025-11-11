import type { IComponent } from "./Component"
import type { IRender } from "./Render"

export interface IVdom {
   mount(component: IComponent, container: Element, props?: object): void
   update(component: IComponent, props?: object): void
   unmount(component: IComponent): void
}

export interface IVdomConstructorProps {
   render: IRender
}
