import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/xai.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "xai",
		artifactBasename: "api.js"
	});
}
const applyXaiConfig = ((...args) => loadFacadeModule()["applyXaiConfig"](...args));
const applyXaiProviderConfig = ((...args) => loadFacadeModule()["applyXaiProviderConfig"](...args));
const applyXaiModelCompat = ((...args) => loadFacadeModule()["applyXaiModelCompat"](...args));
const buildXaiCatalogModels = ((...args) => loadFacadeModule()["buildXaiCatalogModels"](...args));
const buildXaiModelDefinition = ((...args) => loadFacadeModule()["buildXaiModelDefinition"](...args));
const buildXaiProvider = ((...args) => loadFacadeModule()["buildXaiProvider"](...args));
const HTML_ENTITY_TOOL_CALL_ARGUMENTS_ENCODING = loadFacadeModule()["HTML_ENTITY_TOOL_CALL_ARGUMENTS_ENCODING"];
const isModernXaiModel = ((...args) => loadFacadeModule()["isModernXaiModel"](...args));
const normalizeXaiModelId = ((...args) => loadFacadeModule()["normalizeXaiModelId"](...args));
const resolveXaiCatalogEntry = ((...args) => loadFacadeModule()["resolveXaiCatalogEntry"](...args));
const resolveXaiForwardCompatModel = ((...args) => loadFacadeModule()["resolveXaiForwardCompatModel"](...args));
const XAI_BASE_URL = loadFacadeModule()["XAI_BASE_URL"];
const XAI_DEFAULT_CONTEXT_WINDOW = loadFacadeModule()["XAI_DEFAULT_CONTEXT_WINDOW"];
const XAI_DEFAULT_MODEL_ID = loadFacadeModule()["XAI_DEFAULT_MODEL_ID"];
const XAI_DEFAULT_MODEL_REF = loadFacadeModule()["XAI_DEFAULT_MODEL_REF"];
const XAI_DEFAULT_MAX_TOKENS = loadFacadeModule()["XAI_DEFAULT_MAX_TOKENS"];
const XAI_TOOL_SCHEMA_PROFILE = loadFacadeModule()["XAI_TOOL_SCHEMA_PROFILE"];
//#endregion
export { resolveXaiForwardCompatModel as _, XAI_DEFAULT_MODEL_ID as a, applyXaiConfig as c, buildXaiCatalogModels as d, buildXaiModelDefinition as f, resolveXaiCatalogEntry as g, normalizeXaiModelId as h, XAI_DEFAULT_MAX_TOKENS as i, applyXaiModelCompat as l, isModernXaiModel as m, XAI_BASE_URL as n, XAI_DEFAULT_MODEL_REF as o, buildXaiProvider as p, XAI_DEFAULT_CONTEXT_WINDOW as r, XAI_TOOL_SCHEMA_PROFILE as s, HTML_ENTITY_TOOL_CALL_ARGUMENTS_ENCODING as t, applyXaiProviderConfig as u };
