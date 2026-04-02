import type { ChannelApprovalAdapter, ChannelPlugin } from "./types.js";
export declare function resolveChannelApprovalAdapter(plugin?: Pick<ChannelPlugin, "approvals"> | null): ChannelApprovalAdapter | undefined;
