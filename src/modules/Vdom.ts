import {
   ComponentStatus,
   isComponent,
   isComponentChild,
   isSignal,
   isVNode,
   type IComponent,
   type IRender,
   type IVdom,
   type IVdomConstructorProps,
   type IVNode
} from "../core"

export class Vdom implements IVdom {
   #render: IRender

   constructor(props: IVdomConstructorProps) {
      this.#render = props.render
   }

   // ==============================
   // Mounting
   // ==============================

   mount(component: IComponent, container: Element, props?: object): void {
      component.setStatus(ComponentStatus.MOUNTING)
      this.#render.mount(this.#createElement(component, props), container)
      component.setStatus(ComponentStatus.MOUNTED)
   }

   #createElement(target: IComponent | IVNode, props?: object): Element {
      if (isComponent(target)) {
         const r = () => this.#createElement(target.render(props || {}))

         if (!target?.rootElement) {
            target.onUpdate(() => {
               const newEl = r()
               target.rootElement?.replaceWith(newEl)
               target.rootElement = newEl
               target.setStatus(ComponentStatus.MOUNTED, { skipNotify: true })
            })
         }

         const el = r()
         target.rootElement = el
         return el
      }

      const el = document.createElement(target.tag)
      target.element = el

      this.#applyAttributes(target, el)
      this.#applyChildren(target, el)

      return el
   }

   #applyAttributes(vnode: IVNode, el: Element): void {
      const attrs = vnode?.attrs
      if (!attrs) return

      for (const [key, value] of Object.entries(attrs)) {
         const loweredKey = key.toLowerCase()

         if (loweredKey.startsWith("on") && typeof value === "function") {
            el.addEventListener(loweredKey.slice(2), value as EventListener)
            continue
         }

         el.setAttribute(loweredKey, String(value))
      }
   }

   #applyChildren(vnode: IVNode, el: Element): void {
      const children = vnode?.children
      if (!children) return

      for (const child of children) {
         if (typeof child === "string") {
            el.append(document.createTextNode(child))
            continue
         }

         if (isVNode(child)) {
            const childElement = this.#createElement(child)
            el.append(childElement)
            continue
         }

         if (isSignal(child)) {
            el.append(document.createTextNode(child.get()))
            continue
         }

         if (isComponentChild(child)) {
            child.instance.setStatus(ComponentStatus.MOUNTING)
            el.append(this.#createElement(child.instance, child.props))
            child.instance.setStatus(ComponentStatus.MOUNTED)
            continue
         }
      }
   }

   unmount(component: IComponent): void {
      void component
   }

   update(newVNode: IVNode, oldVNode: IVNode): void {
      oldVNode.element?.replaceChild(oldVNode.element, this.#createElement(newVNode))
   }
}
