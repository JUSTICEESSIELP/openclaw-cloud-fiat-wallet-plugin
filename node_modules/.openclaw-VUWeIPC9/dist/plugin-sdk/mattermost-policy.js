import { r as loadBundledPluginPublicSurfaceModuleSync } from "../facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/mattermost-policy.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "mattermost",
		artifactBasename: "api.js"
	});
}
const isMattermostSenderAllowed = ((...args) => loadFacadeModule()["isMattermostSenderAllowed"](...args));
//#endregion
export { isMattermostSenderAllowed };
