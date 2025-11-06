import type { IVNode } from "./VNode"

export interface ComponentChild<T extends object = object> {
   instance: Component<T>
   props: T
}

export interface Component<T extends object = object> {
   readonly displayName: string
   readonly status: ComponentStatus

   render(props: T): IVNode
   setStatus(value: ComponentStatus): void

   onBeforeMount(sub: ComponentSubscriber): ComponentUnsubscribe
   onMounted(sub: ComponentSubscriber): ComponentUnsubscribe

   onBeforeUpdate(sub: ComponentSubscriber): ComponentUnsubscribe
   onUpdated(sub: ComponentSubscriber): ComponentUnsubscribe

   onBeforeUnmount(sub: ComponentSubscriber): ComponentUnsubscribe
   onUnmounted(sub: ComponentSubscriber): ComponentUnsubscribe
}

export type ComponentSubscriber = VoidFunction
export type ComponentUnsubscribe = VoidFunction

export enum ComponentStatus {
   UNMOUNTED,
   MOUNTING,
   MOUNTED,
   UPDATING
}
