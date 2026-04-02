import type { TaskDeliveryState, TaskRecord } from "./task-registry.types.js";
export type TaskRegistryStoreSnapshot = {
    tasks: Map<string, TaskRecord>;
    deliveryStates: Map<string, TaskDeliveryState>;
};
export type TaskRegistryStore = {
    loadSnapshot: () => TaskRegistryStoreSnapshot;
    saveSnapshot: (snapshot: TaskRegistryStoreSnapshot) => void;
    upsertTaskWithDeliveryState?: (params: {
        task: TaskRecord;
        deliveryState?: TaskDeliveryState;
    }) => void;
    upsertTask?: (task: TaskRecord) => void;
    deleteTaskWithDeliveryState?: (taskId: string) => void;
    deleteTask?: (taskId: string) => void;
    upsertDeliveryState?: (state: TaskDeliveryState) => void;
    deleteDeliveryState?: (taskId: string) => void;
    close?: () => void;
};
export type TaskRegistryHookEvent = {
    kind: "restored";
    tasks: TaskRecord[];
} | {
    kind: "upserted";
    task: TaskRecord;
    previous?: TaskRecord;
} | {
    kind: "deleted";
    taskId: string;
    previous: TaskRecord;
};
export type TaskRegistryHooks = {
    onEvent?: (event: TaskRegistryHookEvent) => void;
};
export declare function getTaskRegistryStore(): TaskRegistryStore;
export declare function getTaskRegistryHooks(): TaskRegistryHooks | null;
export declare function configureTaskRegistryRuntime(params: {
    store?: TaskRegistryStore;
    hooks?: TaskRegistryHooks | null;
}): void;
export declare function resetTaskRegistryRuntimeForTests(): void;
