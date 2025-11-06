import type { IComponent } from "./Component"

export interface ITweed {
   mount(component: IComponent, container: Element): void
}
