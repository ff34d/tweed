import type { IRender } from "../core"

export class Render implements IRender {
   mount(el: Element, container: Element): void {
      container.replaceChildren(el)
   }

   unmount(el: Element): void {
      el.remove()
   }

   update(el: Element): void {
      void el
   }
}
