import {
   ComponentStatus,
   type ComponentSubscriber,
   type ComponentUnsubscribe,
   type IComponent,
   type IComponentConstructorProps,
   type IVNode
} from "../types"

export class Component<PROPS extends object = object> implements IComponent<PROPS> {
   readonly #displayName: string
   readonly #constructorRender: IComponent<PROPS>["render"]

   #status: ComponentStatus

   #beforeMountSubscribers?: Set<ComponentSubscriber>
   #mountedSubscribers?: Set<ComponentSubscriber>

   #beforeUnmountSubscribers?: Set<ComponentSubscriber>
   #unmountedSubscribers?: Set<ComponentSubscriber>

   constructor(props: IComponentConstructorProps<PROPS>) {
      this.#status = ComponentStatus.UNMOUNTED
      this.#displayName = props.displayName
      this.#constructorRender = props.render
   }

   // ==============================
   // Getters / Setters
   // ==============================

   get displayName() {
      return this.#displayName
   }

   get status() {
      return this.#status
   }

   // ==============================
   // Methods
   // ==============================

   render(props: PROPS): IVNode<PROPS> {
      return this.#constructorRender(props)
   }

   setStatus(value: ComponentStatus): void {
      this.#status = value

      switch (value) {
         case ComponentStatus.MOUNTING: {
            this.#invokeSubscribers(this.#beforeMountSubscribers)
            break
         }
         case ComponentStatus.MOUNTED: {
            this.#invokeSubscribers(this.#mountedSubscribers)
            break
         }
         case ComponentStatus.UNMOUNTING: {
            this.#invokeSubscribers(this.#beforeUnmountSubscribers)
            break
         }
         case ComponentStatus.UNMOUNTED: {
            this.#invokeSubscribers(this.#unmountedSubscribers)
            break
         }
      }
   }

   #invokeSubscribers(list?: Set<ComponentSubscriber>): void {
      if (!list) return

      for (const sub of list) {
         try {
            sub()
         } catch (error) {
            console.error(`Error in ${this.#displayName} lifecycle:`, error)
         }
      }
   }

   onBeforeMount(sub: ComponentSubscriber): ComponentUnsubscribe {
      if (!this.#beforeMountSubscribers) this.#beforeMountSubscribers = new Set()
      this.#beforeMountSubscribers.add(sub)
      return () => this.#beforeMountSubscribers?.delete(sub)
   }

   onMounted(sub: ComponentSubscriber): ComponentUnsubscribe {
      if (!this.#mountedSubscribers) this.#mountedSubscribers = new Set()
      this.#mountedSubscribers.add(sub)
      return () => this.#mountedSubscribers?.delete(sub)
   }

   onBeforeUnmount(sub: ComponentSubscriber): ComponentUnsubscribe {
      if (!this.#beforeUnmountSubscribers) this.#beforeUnmountSubscribers = new Set()
      this.#beforeUnmountSubscribers.add(sub)
      return () => this.#beforeUnmountSubscribers?.delete(sub)
   }

   onUnmounted(sub: ComponentSubscriber): ComponentUnsubscribe {
      if (!this.#unmountedSubscribers) this.#unmountedSubscribers = new Set()
      this.#unmountedSubscribers.add(sub)
      return () => this.#unmountedSubscribers?.delete(sub)
   }
}
