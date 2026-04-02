import { n as createLazyFacadeObjectValue, r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/feishu-setup.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "feishu",
		artifactBasename: "api.js"
	});
}
const feishuSetupAdapter = createLazyFacadeObjectValue(() => loadFacadeModule()["feishuSetupAdapter"]);
const feishuSetupWizard = createLazyFacadeObjectValue(() => loadFacadeModule()["feishuSetupWizard"]);
//#endregion
export { feishuSetupWizard as n, feishuSetupAdapter as t };
