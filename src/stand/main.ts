import { ComponentStatus, createComponent, h, type Signal } from "../core"
import { Render, useSignal, Vdom } from "../modules"

const render = new Render()
const vdom = new Vdom({ render: render })

const counter = useSignal(0)

const Title = createComponent<{ text: Signal<number> }>({
   displayName: "Title",
   render: ({ text }) => {
      return h("h1", undefined, [text])
   }
})

const Button = createComponent<{ onclick: VoidFunction }>({
   displayName: "Button",
   render: ({ onclick }) => {
      return h("button", { onclick: onclick }, ["Click"])
   }
})

const App = createComponent({
   displayName: "App",
   render: () => {
      return h("div", undefined, [
         { instance: Title, props: { text: counter } },
         { instance: Button, props: { onclick: () => counter.set((prev) => prev + 1) } }
      ])
   }
})

counter.subscribe(() => {
   App.setStatus(ComponentStatus.UPDATE)
})

vdom.mount(App, document.querySelector('[id="root"]')!)
