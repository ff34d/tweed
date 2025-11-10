import { Reactivity } from "../../modules"
import type { IReactivity } from "../types"

export function isSignal(target: unknown): target is IReactivity<unknown> {
   return target instanceof Reactivity
}
