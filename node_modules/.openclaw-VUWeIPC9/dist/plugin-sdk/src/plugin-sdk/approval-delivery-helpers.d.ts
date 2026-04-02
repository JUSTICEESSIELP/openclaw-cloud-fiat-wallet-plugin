import type { ExecApprovalRequest } from "../infra/exec-approvals.js";
import type { PluginApprovalRequest } from "../infra/plugin-approvals.js";
import type { OpenClawConfig } from "./config-runtime.js";
type ApprovalKind = "exec" | "plugin";
type NativeApprovalDeliveryMode = "dm" | "channel" | "both";
type NativeApprovalRequest = ExecApprovalRequest | PluginApprovalRequest;
type NativeApprovalTarget = {
    to: string;
    threadId?: string | number | null;
};
type NativeApprovalSurface = "origin" | "approver-dm";
type ApprovalAdapterParams = {
    cfg: OpenClawConfig;
    accountId?: string | null;
    senderId?: string | null;
};
type DeliverySuppressionParams = {
    cfg: OpenClawConfig;
    target: {
        channel: string;
        accountId?: string | null;
    };
    request: {
        request: {
            turnSourceChannel?: string | null;
            turnSourceAccountId?: string | null;
        };
    };
};
export declare function createApproverRestrictedNativeApprovalAdapter(params: {
    channel: string;
    channelLabel: string;
    listAccountIds: (cfg: OpenClawConfig) => string[];
    hasApprovers: (params: ApprovalAdapterParams) => boolean;
    isExecAuthorizedSender: (params: ApprovalAdapterParams) => boolean;
    isPluginAuthorizedSender?: (params: ApprovalAdapterParams) => boolean;
    isNativeDeliveryEnabled: (params: {
        cfg: OpenClawConfig;
        accountId?: string | null;
    }) => boolean;
    resolveNativeDeliveryMode: (params: {
        cfg: OpenClawConfig;
        accountId?: string | null;
    }) => NativeApprovalDeliveryMode;
    requireMatchingTurnSourceChannel?: boolean;
    resolveSuppressionAccountId?: (params: DeliverySuppressionParams) => string | undefined;
    resolveOriginTarget?: (params: {
        cfg: OpenClawConfig;
        accountId?: string | null;
        approvalKind: ApprovalKind;
        request: NativeApprovalRequest;
    }) => NativeApprovalTarget | null | Promise<NativeApprovalTarget | null>;
    resolveApproverDmTargets?: (params: {
        cfg: OpenClawConfig;
        accountId?: string | null;
        approvalKind: ApprovalKind;
        request: NativeApprovalRequest;
    }) => NativeApprovalTarget[] | Promise<NativeApprovalTarget[]>;
    notifyOriginWhenDmOnly?: boolean;
}): {
    auth: {
        authorizeActorAction: ({ cfg, accountId, senderId, approvalKind, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            senderId?: string | null;
            action: "approve";
            approvalKind: ApprovalKind;
        }) => {
            authorized: boolean;
            reason?: undefined;
        } | {
            authorized: boolean;
            reason: string;
        };
        getActionAvailabilityState: ({ cfg, accountId, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            action: "approve";
        }) => {
            readonly kind: "enabled";
        } | {
            readonly kind: "disabled";
        };
    };
    delivery: {
        hasConfiguredDmRoute: ({ cfg }: {
            cfg: OpenClawConfig;
        }) => boolean;
        shouldSuppressForwardingFallback: (input: DeliverySuppressionParams) => boolean;
    };
    native: {
        describeDeliveryCapabilities: ({ cfg, accountId, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: ApprovalKind;
            request: NativeApprovalRequest;
        }) => {
            enabled: boolean;
            preferredSurface: "both" | NativeApprovalSurface;
            supportsOriginSurface: boolean;
            supportsApproverDmSurface: boolean;
            notifyOriginWhenDmOnly: boolean;
        };
        resolveOriginTarget: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: ApprovalKind;
            request: NativeApprovalRequest;
        }) => NativeApprovalTarget | null | Promise<NativeApprovalTarget | null>) | undefined;
        resolveApproverDmTargets: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: ApprovalKind;
            request: NativeApprovalRequest;
        }) => NativeApprovalTarget[] | Promise<NativeApprovalTarget[]>) | undefined;
    } | undefined;
};
export {};
