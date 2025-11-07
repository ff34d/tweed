import type {
   IReactivity,
   IReactivityConstructorProps,
   ReactivitySetterCallback,
   ReactivitySubscriber,
   ReactivityUnsubscribe,
   Signal
} from "../core"

export class Reactivity<T> implements IReactivity<T> {
   readonly #subscribers: Set<ReactivitySubscriber<T>>
   #state: T

   constructor(props: IReactivityConstructorProps<T>) {
      if (typeof props.initValue === "function") {
         throw new TypeError("Reactivity function value error")
      }

      this.#state = props.initValue
      this.#subscribers = new Set()
   }

   get(): T {
      return this.#state
   }

   set(setter: T | ReactivitySetterCallback<T>) {
      const newValue =
         typeof setter === "function"
            ? (setter as ReactivitySetterCallback<T>)(this.#state)
            : setter

      if (Object.is(this.#state, newValue)) return

      this.#state = newValue
      this.#notify()
   }

   #notify(): void {
      for (const sub of this.#subscribers) {
         try {
            sub(this.#state)
         } catch (error) {
            console.error("Reactivity subscriber error:", error)
         }
      }
   }

   subscribe(callback: ReactivitySubscriber<T>): ReactivityUnsubscribe {
      this.#subscribers.add(callback)
      return () => this.#subscribers.delete(callback)
   }
}

// ==============================
// Hooks
// ==============================

export function useSignal<T>(props: IReactivityConstructorProps<T>): Signal<T> {
   return new Reactivity<T>(props)
}
