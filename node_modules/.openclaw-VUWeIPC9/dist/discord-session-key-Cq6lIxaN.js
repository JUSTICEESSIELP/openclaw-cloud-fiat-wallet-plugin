import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/discord-session-key.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "discord",
		artifactBasename: "session-key-api.js"
	});
}
const normalizeExplicitDiscordSessionKey = ((...args) => loadFacadeModule()["normalizeExplicitDiscordSessionKey"](...args));
//#endregion
export { normalizeExplicitDiscordSessionKey as t };
