import { n as createLazyFacadeObjectValue, r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/ollama-surface.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "ollama",
		artifactBasename: "api.js"
	});
}
const buildOllamaModelDefinition = ((...args) => loadFacadeModule()["buildOllamaModelDefinition"](...args));
const buildOllamaProvider = ((...args) => loadFacadeModule()["buildOllamaProvider"](...args));
const configureOllamaNonInteractive = ((...args) => loadFacadeModule()["configureOllamaNonInteractive"](...args));
const ensureOllamaModelPulled = ((...args) => loadFacadeModule()["ensureOllamaModelPulled"](...args));
const enrichOllamaModelsWithContext = ((...args) => loadFacadeModule()["enrichOllamaModelsWithContext"](...args));
const fetchOllamaModels = ((...args) => loadFacadeModule()["fetchOllamaModels"](...args));
const OLLAMA_DEFAULT_BASE_URL = loadFacadeModule()["OLLAMA_DEFAULT_BASE_URL"];
const OLLAMA_DEFAULT_CONTEXT_WINDOW = loadFacadeModule()["OLLAMA_DEFAULT_CONTEXT_WINDOW"];
const OLLAMA_DEFAULT_COST = createLazyFacadeObjectValue(() => loadFacadeModule()["OLLAMA_DEFAULT_COST"]);
const OLLAMA_DEFAULT_MAX_TOKENS = loadFacadeModule()["OLLAMA_DEFAULT_MAX_TOKENS"];
const OLLAMA_DEFAULT_MODEL = loadFacadeModule()["OLLAMA_DEFAULT_MODEL"];
const promptAndConfigureOllama = ((...args) => loadFacadeModule()["promptAndConfigureOllama"](...args));
const queryOllamaContextWindow = ((...args) => loadFacadeModule()["queryOllamaContextWindow"](...args));
const resolveOllamaApiBase = ((...args) => loadFacadeModule()["resolveOllamaApiBase"](...args));
//#endregion
export { OLLAMA_DEFAULT_MODEL as a, configureOllamaNonInteractive as c, fetchOllamaModels as d, promptAndConfigureOllama as f, OLLAMA_DEFAULT_MAX_TOKENS as i, enrichOllamaModelsWithContext as l, resolveOllamaApiBase as m, OLLAMA_DEFAULT_CONTEXT_WINDOW as n, buildOllamaModelDefinition as o, queryOllamaContextWindow as p, OLLAMA_DEFAULT_COST as r, buildOllamaProvider as s, OLLAMA_DEFAULT_BASE_URL as t, ensureOllamaModelPulled as u };
