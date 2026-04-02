import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fsSync from "node:fs";
import path from "node:path";
//#region extensions/matrix/src/plugin-entry.runtime.js
const { createJiti } = createRequire(import.meta.url)("jiti");
const OPENCLAW_PLUGIN_SDK_PREFIX = ["openclaw", "plugin-sdk"].join("/");
const PLUGIN_SDK_EXPORT_PREFIX = "./plugin-sdk/";
const PLUGIN_SDK_SOURCE_EXTENSIONS = [
	".ts",
	".mts",
	".js",
	".mjs",
	".cts",
	".cjs"
];
const JITI_EXTENSIONS = [
	".ts",
	".tsx",
	".mts",
	".cts",
	".mtsx",
	".ctsx",
	".js",
	".mjs",
	".cjs",
	".json"
];
function readPackageJson(packageRoot) {
	try {
		return JSON.parse(fsSync.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
	} catch {
		return null;
	}
}
function findOpenClawPackageRoot(startDir) {
	let cursor = path.resolve(startDir);
	for (let i = 0; i < 12; i += 1) {
		const pkg = readPackageJson(cursor);
		if (pkg?.name === "openclaw" && pkg.exports?.["./plugin-sdk"]) return {
			packageRoot: cursor,
			packageJson: pkg
		};
		const parent = path.dirname(cursor);
		if (parent === cursor) break;
		cursor = parent;
	}
	return null;
}
function resolveExistingFile(basePath, extensions) {
	for (const ext of extensions) {
		const candidate = `${basePath}${ext}`;
		if (fsSync.existsSync(candidate)) return candidate;
	}
	return null;
}
function buildPluginSdkAliasMap(moduleUrl) {
	const location = findOpenClawPackageRoot(path.dirname(fileURLToPath(moduleUrl)));
	if (!location) return {};
	const { packageRoot, packageJson } = location;
	const sourcePluginSdkDir = path.join(packageRoot, "src", "plugin-sdk");
	const distPluginSdkDir = path.join(packageRoot, "dist", "plugin-sdk");
	const aliasMap = {};
	const rootAlias = resolveExistingFile(path.join(sourcePluginSdkDir, "root-alias"), [".cjs"]) ?? resolveExistingFile(path.join(distPluginSdkDir, "root-alias"), [".cjs"]);
	if (rootAlias) aliasMap[OPENCLAW_PLUGIN_SDK_PREFIX] = rootAlias;
	for (const exportKey of Object.keys(packageJson.exports ?? {})) {
		if (!exportKey.startsWith(PLUGIN_SDK_EXPORT_PREFIX)) continue;
		const subpath = exportKey.slice(13);
		if (!subpath) continue;
		const resolvedPath = resolveExistingFile(path.join(sourcePluginSdkDir, subpath), PLUGIN_SDK_SOURCE_EXTENSIONS) ?? resolveExistingFile(path.join(distPluginSdkDir, subpath), [".js"]);
		if (resolvedPath) aliasMap[`${OPENCLAW_PLUGIN_SDK_PREFIX}/${subpath}`] = resolvedPath;
	}
	const extensionApi = resolveExistingFile(path.join(packageRoot, "src", "extensionAPI"), [".ts", ".js"]) ?? resolveExistingFile(path.join(packageRoot, "dist", "extensionAPI"), [".js"]);
	if (extensionApi) aliasMap["openclaw/extension-api"] = extensionApi;
	return aliasMap;
}
const mod = createJiti(import.meta.url, {
	alias: buildPluginSdkAliasMap(import.meta.url),
	interopDefault: true,
	tryNative: false,
	extensions: JITI_EXTENSIONS
})("./plugin-entry.runtime.ts");
const ensureMatrixCryptoRuntime = mod.ensureMatrixCryptoRuntime;
const handleVerifyRecoveryKey = mod.handleVerifyRecoveryKey;
const handleVerificationBootstrap = mod.handleVerificationBootstrap;
const handleVerificationStatus = mod.handleVerificationStatus;
//#endregion
export { ensureMatrixCryptoRuntime, handleVerificationBootstrap, handleVerificationStatus, handleVerifyRecoveryKey };
