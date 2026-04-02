import { n as listBundledPluginMetadata } from "./bundled-plugin-metadata-Be3F1Y0W.js";
//#region src/channels/ids.ts
const CHAT_CHANNEL_ORDER = [
	"telegram",
	"whatsapp",
	"discord",
	"irc",
	"googlechat",
	"slack",
	"signal",
	"imessage",
	"line"
];
const CHANNEL_IDS = [...CHAT_CHANNEL_ORDER];
//#endregion
//#region src/channels/chat-meta.ts
const CHAT_CHANNEL_ID_SET = new Set(CHAT_CHANNEL_ORDER);
function toChatChannelMeta(params) {
	const label = params.channel.label?.trim();
	if (!label) throw new Error(`Missing label for bundled chat channel "${params.id}"`);
	return {
		id: params.id,
		label,
		selectionLabel: params.channel.selectionLabel?.trim() || label,
		docsPath: params.channel.docsPath?.trim() || `/channels/${params.id}`,
		docsLabel: params.channel.docsLabel?.trim() || void 0,
		blurb: params.channel.blurb?.trim() || "",
		...params.channel.aliases?.length ? { aliases: params.channel.aliases } : {},
		...params.channel.order !== void 0 ? { order: params.channel.order } : {},
		...params.channel.selectionDocsPrefix !== void 0 ? { selectionDocsPrefix: params.channel.selectionDocsPrefix } : {},
		...params.channel.selectionDocsOmitLabel !== void 0 ? { selectionDocsOmitLabel: params.channel.selectionDocsOmitLabel } : {},
		...params.channel.selectionExtras?.length ? { selectionExtras: params.channel.selectionExtras } : {},
		...params.channel.detailLabel?.trim() ? { detailLabel: params.channel.detailLabel.trim() } : {},
		...params.channel.systemImage?.trim() ? { systemImage: params.channel.systemImage.trim() } : {},
		...params.channel.markdownCapable !== void 0 ? { markdownCapable: params.channel.markdownCapable } : {},
		...params.channel.showConfigured !== void 0 ? { showConfigured: params.channel.showConfigured } : {},
		...params.channel.quickstartAllowFrom !== void 0 ? { quickstartAllowFrom: params.channel.quickstartAllowFrom } : {},
		...params.channel.forceAccountBinding !== void 0 ? { forceAccountBinding: params.channel.forceAccountBinding } : {},
		...params.channel.preferSessionLookupForAnnounceTarget !== void 0 ? { preferSessionLookupForAnnounceTarget: params.channel.preferSessionLookupForAnnounceTarget } : {},
		...params.channel.preferOver?.length ? { preferOver: params.channel.preferOver } : {}
	};
}
function buildChatChannelMetaById() {
	const entries = /* @__PURE__ */ new Map();
	for (const entry of listBundledPluginMetadata({
		includeChannelConfigs: true,
		includeSyntheticChannelConfigs: false
	})) {
		const channel = entry.packageManifest && "channel" in entry.packageManifest ? entry.packageManifest.channel : void 0;
		if (!channel) continue;
		const rawId = channel?.id?.trim();
		if (!rawId || !CHAT_CHANNEL_ID_SET.has(rawId)) continue;
		const id = rawId;
		entries.set(id, toChatChannelMeta({
			id,
			channel
		}));
	}
	const missingIds = CHAT_CHANNEL_ORDER.filter((id) => !entries.has(id));
	if (missingIds.length > 0) throw new Error(`Missing bundled chat channel metadata for: ${missingIds.join(", ")}`);
	return Object.freeze(Object.fromEntries(entries));
}
const CHAT_CHANNEL_META = buildChatChannelMetaById();
const CHAT_CHANNEL_ALIASES = Object.freeze(Object.fromEntries(Object.values(CHAT_CHANNEL_META).flatMap((meta) => (meta.aliases ?? []).map((alias) => [alias.trim().toLowerCase(), meta.id])).filter(([alias]) => alias.length > 0).toSorted(([left], [right]) => left.localeCompare(right))));
function normalizeChannelKey(raw) {
	return raw?.trim().toLowerCase() || void 0;
}
function listChatChannels() {
	return CHAT_CHANNEL_ORDER.map((id) => CHAT_CHANNEL_META[id]);
}
function getChatChannelMeta(id) {
	return CHAT_CHANNEL_META[id];
}
function normalizeChatChannelId(raw) {
	const normalized = normalizeChannelKey(raw);
	if (!normalized) return null;
	const resolved = CHAT_CHANNEL_ALIASES[normalized] ?? normalized;
	return CHAT_CHANNEL_ORDER.includes(resolved) ? resolved : null;
}
//#endregion
export { CHAT_CHANNEL_ORDER as a, CHANNEL_IDS as i, listChatChannels as n, normalizeChatChannelId as r, getChatChannelMeta as t };
