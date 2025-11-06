export interface IScheduler {
   schedule(task: QueueTask): void
}

export interface QueueTask {
   priority: QueuePriority
   type: QueueTaskType
   label?: string
   action: QueueAction
}

export type QueueAction = VoidFunction

export enum QueuePriority {
   USER_INTERACTION = 0,
   REACTIVE_HIGH = 1,
   REACTIVE_NORMAL = 2,
   RENDER = 3,
   LAZY = 4,
   SYS = 5
}

export enum QueueTaskType {
   DOM,
   USER,
   SYSTEM,
   REACTIVE
}
