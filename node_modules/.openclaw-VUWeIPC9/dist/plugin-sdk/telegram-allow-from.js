import { r as loadBundledPluginPublicSurfaceModuleSync } from "../facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/telegram-allow-from.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "telegram",
		artifactBasename: "api.js"
	});
}
const isNumericTelegramUserId = ((...args) => loadFacadeModule()["isNumericTelegramUserId"](...args));
const normalizeTelegramAllowFromEntry = ((...args) => loadFacadeModule()["normalizeTelegramAllowFromEntry"](...args));
//#endregion
export { isNumericTelegramUserId, normalizeTelegramAllowFromEntry };
