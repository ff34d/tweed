import type { IVNode } from "./VNode"

export interface ComponentChild<T extends object = object> {
   instance: IComponent<T>
   props: T
}

export type IComponentConstructorProps<T extends object> = Pick<
   IComponent<T>,
   "displayName" | "render"
>

export interface IComponent<T extends object = object> {
   readonly displayName: string
   readonly status: ComponentStatus

   render(props: T): IVNode<T>
   setStatus(value: ComponentStatus): void

   onBeforeMount(sub: ComponentSubscriber): ComponentUnsubscribe
   onMounted(sub: ComponentSubscriber): ComponentUnsubscribe

   onBeforeUnmount(sub: ComponentSubscriber): ComponentUnsubscribe
   onUnmounted(sub: ComponentSubscriber): ComponentUnsubscribe
}

export type ComponentSubscriber = VoidFunction
export type ComponentUnsubscribe = VoidFunction

export enum ComponentStatus {
   MOUNTING,
   MOUNTED,
   UNMOUNTING,
   UNMOUNTED
}
