import { r as loadBundledPluginPublicSurfaceModuleSync } from "../facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/nvidia.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "nvidia",
		artifactBasename: "api.js"
	});
}
const buildNvidiaProvider = ((...args) => loadFacadeModule()["buildNvidiaProvider"](...args));
//#endregion
export { buildNvidiaProvider };
