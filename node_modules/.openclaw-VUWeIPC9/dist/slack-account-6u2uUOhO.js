import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/slack-account.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "slack",
		artifactBasename: "api.js"
	});
}
const resolveSlackAccount = ((...args) => loadFacadeModule()["resolveSlackAccount"](...args));
//#endregion
export { resolveSlackAccount as t };
