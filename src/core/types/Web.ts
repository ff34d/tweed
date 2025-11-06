export type TypedEvent<
   T extends Element = Element,
   E extends keyof HTMLElementEventMap = "click"
> = HTMLElementEventMap[E] & {
   currentTarget: T
   target: EventTarget
}

export type TypedEventListener<
   T extends Element = Element,
   E extends keyof HTMLElementEventMap = "click"
> = (e: TypedEvent<T, E>) => void
