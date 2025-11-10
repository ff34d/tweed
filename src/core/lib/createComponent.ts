import { Component } from "../models"
import type { IComponentConstructorProps } from "../types"

export function createComponent<PROPS extends object = object>(
   init: IComponentConstructorProps<PROPS>
) {
   return new Component<PROPS>(init)
}
