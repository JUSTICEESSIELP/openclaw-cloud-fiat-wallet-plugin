import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/matrix-runtime-surface.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "matrix",
		artifactBasename: "runtime-api.js"
	});
}
const resolveMatrixAccountStringValues = ((...args) => loadFacadeModule()["resolveMatrixAccountStringValues"](...args));
const setMatrixRuntime = ((...args) => loadFacadeModule()["setMatrixRuntime"](...args));
//#endregion
export { setMatrixRuntime as n, resolveMatrixAccountStringValues as t };
