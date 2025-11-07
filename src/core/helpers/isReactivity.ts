import { Reactivity } from "../../modules"
import type { IReactivity } from "../types"

export function isReactivity<T>(target: unknown): target is IReactivity<T> {
   return target instanceof Reactivity
}
