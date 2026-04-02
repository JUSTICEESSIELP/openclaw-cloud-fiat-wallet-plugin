import type { OpenClawConfig } from "../config/config.js";
import type { TaskDeliveryState, TaskDeliveryStatus, TaskNotifyPolicy, TaskRecord, TaskRuntime, TaskScopeKind, TaskStatus, TaskTerminalOutcome } from "./task-registry.types.js";
export declare function createQueuedTaskRun(params: {
    runtime: TaskRuntime;
    sourceId?: string;
    requesterSessionKey?: string;
    ownerKey?: string;
    scopeKind?: TaskScopeKind;
    requesterOrigin?: TaskDeliveryState["requesterOrigin"];
    childSessionKey?: string;
    parentTaskId?: string;
    agentId?: string;
    runId?: string;
    label?: string;
    task: string;
    preferMetadata?: boolean;
    notifyPolicy?: TaskNotifyPolicy;
    deliveryStatus?: TaskDeliveryStatus;
}): TaskRecord;
export declare function createRunningTaskRun(params: {
    runtime: TaskRuntime;
    sourceId?: string;
    requesterSessionKey?: string;
    ownerKey?: string;
    scopeKind?: TaskScopeKind;
    requesterOrigin?: TaskDeliveryState["requesterOrigin"];
    childSessionKey?: string;
    parentTaskId?: string;
    agentId?: string;
    runId?: string;
    label?: string;
    task: string;
    notifyPolicy?: TaskNotifyPolicy;
    deliveryStatus?: TaskDeliveryStatus;
    preferMetadata?: boolean;
    startedAt?: number;
    lastEventAt?: number;
    progressSummary?: string | null;
}): TaskRecord;
export declare function startTaskRunByRunId(params: {
    runId: string;
    runtime?: TaskRuntime;
    sessionKey?: string;
    startedAt?: number;
    lastEventAt?: number;
    progressSummary?: string | null;
    eventSummary?: string | null;
}): TaskRecord[];
export declare function recordTaskRunProgressByRunId(params: {
    runId: string;
    runtime?: TaskRuntime;
    sessionKey?: string;
    lastEventAt?: number;
    progressSummary?: string | null;
    eventSummary?: string | null;
}): TaskRecord[];
export declare function completeTaskRunByRunId(params: {
    runId: string;
    runtime?: TaskRuntime;
    sessionKey?: string;
    endedAt: number;
    lastEventAt?: number;
    progressSummary?: string | null;
    terminalSummary?: string | null;
    terminalOutcome?: TaskTerminalOutcome | null;
}): TaskRecord[];
export declare function failTaskRunByRunId(params: {
    runId: string;
    runtime?: TaskRuntime;
    sessionKey?: string;
    status?: Extract<TaskStatus, "failed" | "timed_out" | "cancelled">;
    endedAt: number;
    lastEventAt?: number;
    error?: string;
    progressSummary?: string | null;
    terminalSummary?: string | null;
}): TaskRecord[];
export declare function markTaskRunLostById(params: {
    taskId: string;
    endedAt: number;
    lastEventAt?: number;
    error?: string;
    cleanupAfter?: number;
}): TaskRecord | null;
export declare function setDetachedTaskDeliveryStatusByRunId(params: {
    runId: string;
    runtime?: TaskRuntime;
    sessionKey?: string;
    deliveryStatus: TaskDeliveryStatus;
}): TaskRecord[];
export declare function cancelDetachedTaskRunById(params: {
    cfg: OpenClawConfig;
    taskId: string;
}): Promise<{
    found: boolean;
    cancelled: boolean;
    reason?: string;
    task?: TaskRecord;
}>;
