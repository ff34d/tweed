export interface IRender {
   mount(el: Element, container: Element): void
   update(el: Element): void
   unmount(el: Element): void
}
