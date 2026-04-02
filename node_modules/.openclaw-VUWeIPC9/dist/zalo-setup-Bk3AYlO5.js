import { n as createLazyFacadeObjectValue, r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/zalo-setup.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "zalo",
		artifactBasename: "api.js"
	});
}
const evaluateZaloGroupAccess = ((...args) => loadFacadeModule()["evaluateZaloGroupAccess"](...args));
const resolveZaloRuntimeGroupPolicy = ((...args) => loadFacadeModule()["resolveZaloRuntimeGroupPolicy"](...args));
const zaloSetupAdapter = createLazyFacadeObjectValue(() => loadFacadeModule()["zaloSetupAdapter"]);
const zaloSetupWizard = createLazyFacadeObjectValue(() => loadFacadeModule()["zaloSetupWizard"]);
//#endregion
export { zaloSetupWizard as i, resolveZaloRuntimeGroupPolicy as n, zaloSetupAdapter as r, evaluateZaloGroupAccess as t };
