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
   rootElement?: Element

   render(props: T): IVNode<T>
   setStatus(value: ComponentStatus, config?: { skipNotify?: boolean }): void

   onBeforeMount(sub: ComponentSubscriber): ComponentUnsubscribe
   onMounted(sub: ComponentSubscriber): ComponentUnsubscribe

   onBeforeUnmount(sub: ComponentSubscriber): ComponentUnsubscribe
   onUnmounted(sub: ComponentSubscriber): ComponentUnsubscribe

   onUpdate(sub: ComponentSubscriber): ComponentUnsubscribe
}

export type ComponentSubscriber = VoidFunction
export type ComponentUnsubscribe = VoidFunction

export enum ComponentStatus {
   MOUNTING,
   MOUNTED,
   UNMOUNTING,
   UNMOUNTED,
   UPDATE
}

export type ComponentStatusHandlers = Map<
   ComponentStatus,
   () => Set<ComponentSubscriber> | undefined
>
