import type { IVNode } from "./VNode"

export interface IComponent<T extends object = object> {
   readonly displayName: string
   render(props: T): IVNode
}

export interface ComponentChild<T extends object = object> {
   instance: IComponent<T>
   props: T
}
