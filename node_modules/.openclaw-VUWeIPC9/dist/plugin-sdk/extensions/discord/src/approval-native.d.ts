import type { DiscordExecApprovalConfig, OpenClawConfig } from "openclaw/plugin-sdk/config-runtime";
import type { ExecApprovalRequest, PluginApprovalRequest } from "openclaw/plugin-sdk/infra-runtime";
export declare function extractDiscordChannelId(sessionKey?: string | null): string | null;
export declare function createDiscordNativeApprovalAdapter(configOverride?: DiscordExecApprovalConfig | null): {
    auth: {
        authorizeActorAction: ({ cfg, accountId, senderId, approvalKind, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            senderId?: string | null;
            action: "approve";
            approvalKind: "exec" | "plugin";
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
        shouldSuppressForwardingFallback: (input: {
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
        }) => boolean;
    };
    native: {
        describeDeliveryCapabilities: ({ cfg, accountId, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            enabled: boolean;
            preferredSurface: "both" | ("origin" | "approver-dm");
            supportsOriginSurface: boolean;
            supportsApproverDmSurface: boolean;
            notifyOriginWhenDmOnly: boolean;
        };
        resolveOriginTarget: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            to: string;
            threadId?: string | number | null;
        } | null | Promise<{
            to: string;
            threadId?: string | number | null;
        } | null>) | undefined;
        resolveApproverDmTargets: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            to: string;
            threadId?: string | number | null;
        }[] | Promise<{
            to: string;
            threadId?: string | number | null;
        }[]>) | undefined;
    } | undefined;
};
export declare const discordNativeApprovalAdapter: {
    auth: {
        authorizeActorAction: ({ cfg, accountId, senderId, approvalKind, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            senderId?: string | null;
            action: "approve";
            approvalKind: "exec" | "plugin";
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
        shouldSuppressForwardingFallback: (input: {
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
        }) => boolean;
    };
    native: {
        describeDeliveryCapabilities: ({ cfg, accountId, }: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            enabled: boolean;
            preferredSurface: "both" | ("origin" | "approver-dm");
            supportsOriginSurface: boolean;
            supportsApproverDmSurface: boolean;
            notifyOriginWhenDmOnly: boolean;
        };
        resolveOriginTarget: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            to: string;
            threadId?: string | number | null;
        } | null | Promise<{
            to: string;
            threadId?: string | number | null;
        } | null>) | undefined;
        resolveApproverDmTargets: ((params: {
            cfg: OpenClawConfig;
            accountId?: string | null;
            approvalKind: "exec" | "plugin";
            request: ExecApprovalRequest | PluginApprovalRequest;
        }) => {
            to: string;
            threadId?: string | number | null;
        }[] | Promise<{
            to: string;
            threadId?: string | number | null;
        }[]>) | undefined;
    } | undefined;
};
