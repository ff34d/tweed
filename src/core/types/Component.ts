import type { VNode } from "./VNode"

export interface Component<T extends object = object> {
   readonly displayName: string
   render(props: T): VNode
}

export interface ComponentChild<T extends object = object> {
   instance: Component<T>
   props: T
}
