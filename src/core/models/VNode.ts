import type {
   IVNode,
   IVNodeConstructorProps,
   VNodeAttrs,
   VNodeChildren,
   VNodeParentVNode,
   VNodeTag
} from "../types"

export class VNode<PROPS extends object = object> implements IVNode<PROPS> {
   readonly tag: VNodeTag
   readonly attrs?: VNodeAttrs
   readonly children?: VNodeChildren<PROPS>

   parentVNode?: VNodeParentVNode
   element?: HTMLElement

   constructor(props: IVNodeConstructorProps<PROPS>) {
      this.tag = props.tag
      this.attrs = props?.attrs
      this.children = props?.children
   }
}
