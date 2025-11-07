export type Signal<T> = IReactivity<T>

export interface IReactivityConstructorProps<T> {
   initValue: T
}

export interface IReactivity<T> {
   get: ReactivityGetter<T>
   set: ReactivitySetter<T>
   subscribe: ReactivitySubscribe<T>
}

export type ReactivityGetter<T> = () => T
export type ReactivitySetter<T> = (setter: T | ReactivitySetterCallback<T>) => void
export type ReactivitySetterCallback<T> = (prev: T) => T

export type ReactivitySubscribe<T> = (
   subscriber: ReactivitySubscriber<T>
) => ReactivityUnsubscribe

export type ReactivitySubscriber<T> = (value: T) => void
export type ReactivityUnsubscribe = VoidFunction
