import { Component } from "../models"
import type { IComponent } from "../types"

export function isComponent(target: unknown): target is IComponent {
   return target instanceof Component
}
