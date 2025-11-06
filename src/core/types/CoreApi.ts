import type { Component } from "./Component"

export interface ITweed {
   mount(component: Component, container: Element): void
}
