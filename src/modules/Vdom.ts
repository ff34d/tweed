import {
   ComponentStatus,
   isComponentChild,
   isSignal,
   isVNode,
   type IComponent,
   type IRender,
   type IVdom,
   type IVdomConstructorProps,
   type IVNode,
   type VNodeAttrValue,
   type VNodeChild
} from "../core"

export class Vdom implements IVdom {
   #render: IRender

   constructor(props: IVdomConstructorProps) {
      this.#render = props.render
   }

   public mount(component: IComponent, container: Element, props?: object): void {
      component.setStatus(ComponentStatus.MOUNTING)

      const rootEl = this.#componentToElement(component, props)
      this.#render.mount(rootEl, container)

      component.setStatus(ComponentStatus.MOUNTED)
   }

   #componentToElement(component: IComponent, props?: object): Element {
      const vnode = component.render(props || {})
      const el = this.#vnodeToElement(vnode)

      if (component?.rootElement) return el

      component.onUpdate(() => this.update(component, props))
      component.rootElement = el

      return el
   }

   #vnodeToElement(vnode: IVNode): Element {
      const el = document.createElement(vnode.tag)
      vnode.element = el

      this.#applyAttributes(vnode, el)
      this.#applyChildren(vnode, el)

      return el
   }

   #applyAttributes(vnode: IVNode, el: Element): void {
      const attrs = vnode?.attrs
      if (!attrs) return

      for (const [key, value] of Object.entries(attrs)) {
         this.#setAttribute(key, value, el)
      }
   }

   #setAttribute(key: string, value: VNodeAttrValue, el: Element): void {
      const loweredKey = key.toLowerCase()

      if (loweredKey.startsWith("on") && typeof value === "function") {
         el.addEventListener(loweredKey.slice(2), value as EventListener)
         return
      }

      el.setAttribute(loweredKey, String(value))
   }

   #applyChildren(vnode: IVNode, el: Element): void {
      const children = vnode?.children
      if (!children) return

      for (const child of children) {
         this.#appendChild(child, el)
      }
   }

   #appendChild(child: VNodeChild, el: Element): void {
      if (typeof child === "string") {
         el.append(document.createTextNode(child))
         return
      }

      if (isVNode(child)) {
         const childElement = this.#vnodeToElement(child)
         el.append(childElement)
         return
      }

      if (isSignal(child)) {
         el.append(document.createTextNode(child.get()))
         return
      }

      if (isComponentChild(child)) {
         child.instance.setStatus(ComponentStatus.MOUNTING)

         const childEl = this.#componentToElement(child.instance, child.props)
         el.append(childEl)

         child.instance.setStatus(ComponentStatus.MOUNTED)
         return
      }
   }

   public update(component: IComponent, props?: object): void {
      const el = this.#componentToElement(component, props)

      component.rootElement?.replaceWith(el)
      component.rootElement = el

      component.setStatus(ComponentStatus.MOUNTED, { skipNotify: true })
   }

   public unmount(component: IComponent): void {
      void component
   }
}
