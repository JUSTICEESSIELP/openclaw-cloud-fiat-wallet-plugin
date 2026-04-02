import { r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/discord-thread-bindings.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "discord",
		artifactBasename: "runtime-api.js"
	});
}
const autoBindSpawnedDiscordSubagent = ((...args) => loadFacadeModule()["autoBindSpawnedDiscordSubagent"](...args));
const createThreadBindingManager = ((...args) => loadFacadeModule()["createThreadBindingManager"](...args));
const getThreadBindingManager = ((...args) => loadFacadeModule()["getThreadBindingManager"](...args));
const listThreadBindingsBySessionKey = ((...args) => loadFacadeModule()["listThreadBindingsBySessionKey"](...args));
const resolveThreadBindingIdleTimeoutMs = ((...args) => loadFacadeModule()["resolveThreadBindingIdleTimeoutMs"](...args));
const resolveThreadBindingInactivityExpiresAt = ((...args) => loadFacadeModule()["resolveThreadBindingInactivityExpiresAt"](...args));
const resolveThreadBindingMaxAgeExpiresAt = ((...args) => loadFacadeModule()["resolveThreadBindingMaxAgeExpiresAt"](...args));
const resolveThreadBindingMaxAgeMs = ((...args) => loadFacadeModule()["resolveThreadBindingMaxAgeMs"](...args));
const setThreadBindingIdleTimeoutBySessionKey = ((...args) => loadFacadeModule()["setThreadBindingIdleTimeoutBySessionKey"](...args));
const setThreadBindingMaxAgeBySessionKey = ((...args) => loadFacadeModule()["setThreadBindingMaxAgeBySessionKey"](...args));
const unbindThreadBindingsBySessionKey = ((...args) => loadFacadeModule()["unbindThreadBindingsBySessionKey"](...args));
//#endregion
export { resolveThreadBindingIdleTimeoutMs as a, resolveThreadBindingMaxAgeMs as c, unbindThreadBindingsBySessionKey as d, listThreadBindingsBySessionKey as i, setThreadBindingIdleTimeoutBySessionKey as l, createThreadBindingManager as n, resolveThreadBindingInactivityExpiresAt as o, getThreadBindingManager as r, resolveThreadBindingMaxAgeExpiresAt as s, autoBindSpawnedDiscordSubagent as t, setThreadBindingMaxAgeBySessionKey as u };
