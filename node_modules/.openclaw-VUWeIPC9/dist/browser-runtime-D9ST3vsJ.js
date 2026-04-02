import { n as createLazyFacadeObjectValue, r as loadBundledPluginPublicSurfaceModuleSync } from "./facade-runtime-D_UMLPAC.js";
//#region src/plugin-sdk/browser-runtime.ts
function loadFacadeModule() {
	return loadBundledPluginPublicSurfaceModuleSync({
		dirName: "browser",
		artifactBasename: "runtime-api.js"
	});
}
const DEFAULT_AI_SNAPSHOT_MAX_CHARS = loadFacadeModule()["DEFAULT_AI_SNAPSHOT_MAX_CHARS"];
const DEFAULT_BROWSER_EVALUATE_ENABLED = loadFacadeModule()["DEFAULT_BROWSER_EVALUATE_ENABLED"];
const DEFAULT_OPENCLAW_BROWSER_COLOR = loadFacadeModule()["DEFAULT_OPENCLAW_BROWSER_COLOR"];
const DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME = loadFacadeModule()["DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME"];
const DEFAULT_UPLOAD_DIR = loadFacadeModule()["DEFAULT_UPLOAD_DIR"];
const applyBrowserProxyPaths = ((...args) => loadFacadeModule()["applyBrowserProxyPaths"](...args));
const browserAct = ((...args) => loadFacadeModule()["browserAct"](...args));
const browserArmDialog = ((...args) => loadFacadeModule()["browserArmDialog"](...args));
const browserArmFileChooser = ((...args) => loadFacadeModule()["browserArmFileChooser"](...args));
const browserCloseTab = ((...args) => loadFacadeModule()["browserCloseTab"](...args));
const browserConsoleMessages = ((...args) => loadFacadeModule()["browserConsoleMessages"](...args));
const browserCreateProfile = ((...args) => loadFacadeModule()["browserCreateProfile"](...args));
const browserDeleteProfile = ((...args) => loadFacadeModule()["browserDeleteProfile"](...args));
const browserFocusTab = ((...args) => loadFacadeModule()["browserFocusTab"](...args));
const browserHandlers = createLazyFacadeObjectValue(() => loadFacadeModule()["browserHandlers"]);
const browserNavigate = ((...args) => loadFacadeModule()["browserNavigate"](...args));
const browserOpenTab = ((...args) => loadFacadeModule()["browserOpenTab"](...args));
const browserPdfSave = ((...args) => loadFacadeModule()["browserPdfSave"](...args));
const browserProfiles = ((...args) => loadFacadeModule()["browserProfiles"](...args));
const browserResetProfile = ((...args) => loadFacadeModule()["browserResetProfile"](...args));
const browserScreenshotAction = ((...args) => loadFacadeModule()["browserScreenshotAction"](...args));
const browserSnapshot = ((...args) => loadFacadeModule()["browserSnapshot"](...args));
const browserStart = ((...args) => loadFacadeModule()["browserStart"](...args));
const browserStatus = ((...args) => loadFacadeModule()["browserStatus"](...args));
const browserStop = ((...args) => loadFacadeModule()["browserStop"](...args));
const browserTabAction = ((...args) => loadFacadeModule()["browserTabAction"](...args));
const browserTabs = ((...args) => loadFacadeModule()["browserTabs"](...args));
const closeTrackedBrowserTabsForSessions = ((...args) => loadFacadeModule()["closeTrackedBrowserTabsForSessions"](...args));
const createBrowserControlContext = ((...args) => loadFacadeModule()["createBrowserControlContext"](...args));
const createBrowserPluginService = ((...args) => loadFacadeModule()["createBrowserPluginService"](...args));
const createBrowserRouteContext = ((...args) => loadFacadeModule()["createBrowserRouteContext"](...args));
const createBrowserRouteDispatcher = ((...args) => loadFacadeModule()["createBrowserRouteDispatcher"](...args));
const createBrowserRuntimeState = ((...args) => loadFacadeModule()["createBrowserRuntimeState"](...args));
const createBrowserTool = ((...args) => loadFacadeModule()["createBrowserTool"](...args));
const definePluginEntry = ((...args) => loadFacadeModule()["definePluginEntry"](...args));
const ensureBrowserControlAuth = ((...args) => loadFacadeModule()["ensureBrowserControlAuth"](...args));
const getBrowserControlState = ((...args) => loadFacadeModule()["getBrowserControlState"](...args));
const getBrowserProfileCapabilities = ((...args) => loadFacadeModule()["getBrowserProfileCapabilities"](...args));
const handleBrowserGatewayRequest = ((...args) => loadFacadeModule()["handleBrowserGatewayRequest"](...args));
const installBrowserAuthMiddleware = ((...args) => loadFacadeModule()["installBrowserAuthMiddleware"](...args));
const installBrowserCommonMiddleware = ((...args) => loadFacadeModule()["installBrowserCommonMiddleware"](...args));
const isPersistentBrowserProfileMutation = ((...args) => loadFacadeModule()["isPersistentBrowserProfileMutation"](...args));
const movePathToTrash = ((...args) => loadFacadeModule()["movePathToTrash"](...args));
const normalizeBrowserFormField = ((...args) => loadFacadeModule()["normalizeBrowserFormField"](...args));
const normalizeBrowserFormFieldValue = ((...args) => loadFacadeModule()["normalizeBrowserFormFieldValue"](...args));
const normalizeBrowserRequestPath = ((...args) => loadFacadeModule()["normalizeBrowserRequestPath"](...args));
const parseBrowserMajorVersion = ((...args) => loadFacadeModule()["parseBrowserMajorVersion"](...args));
const persistBrowserProxyFiles = ((...args) => loadFacadeModule()["persistBrowserProxyFiles"](...args));
const readBrowserVersion = ((...args) => loadFacadeModule()["readBrowserVersion"](...args));
const redactCdpUrl = ((...args) => loadFacadeModule()["redactCdpUrl"](...args));
const registerBrowserCli = ((...args) => loadFacadeModule()["registerBrowserCli"](...args));
const registerBrowserRoutes = ((...args) => loadFacadeModule()["registerBrowserRoutes"](...args));
const resolveBrowserConfig = ((...args) => loadFacadeModule()["resolveBrowserConfig"](...args));
const resolveBrowserControlAuth = ((...args) => loadFacadeModule()["resolveBrowserControlAuth"](...args));
const resolveExistingPathsWithinRoot = ((...args) => loadFacadeModule()["resolveExistingPathsWithinRoot"](...args));
const resolveGoogleChromeExecutableForPlatform = ((...args) => loadFacadeModule()["resolveGoogleChromeExecutableForPlatform"](...args));
const resolveProfile = ((...args) => loadFacadeModule()["resolveProfile"](...args));
const resolveRequestedBrowserProfile = ((...args) => loadFacadeModule()["resolveRequestedBrowserProfile"](...args));
const runBrowserProxyCommand = ((...args) => loadFacadeModule()["runBrowserProxyCommand"](...args));
const startBrowserBridgeServer = ((...args) => loadFacadeModule()["startBrowserBridgeServer"](...args));
const startBrowserControlServiceFromConfig = ((...args) => loadFacadeModule()["startBrowserControlServiceFromConfig"](...args));
const stopBrowserBridgeServer = ((...args) => loadFacadeModule()["stopBrowserBridgeServer"](...args));
const stopBrowserControlService = ((...args) => loadFacadeModule()["stopBrowserControlService"](...args));
const stopBrowserRuntime = ((...args) => loadFacadeModule()["stopBrowserRuntime"](...args));
const trackSessionBrowserTab = ((...args) => loadFacadeModule()["trackSessionBrowserTab"](...args));
const untrackSessionBrowserTab = ((...args) => loadFacadeModule()["untrackSessionBrowserTab"](...args));
//#endregion
export { resolveBrowserConfig as $, createBrowserPluginService as A, installBrowserAuthMiddleware as B, browserStart as C, browserTabs as D, browserTabAction as E, definePluginEntry as F, normalizeBrowserFormFieldValue as G, isPersistentBrowserProfileMutation as H, ensureBrowserControlAuth as I, persistBrowserProxyFiles as J, normalizeBrowserRequestPath as K, getBrowserControlState as L, createBrowserRouteDispatcher as M, createBrowserRuntimeState as N, closeTrackedBrowserTabsForSessions as O, createBrowserTool as P, registerBrowserRoutes as Q, getBrowserProfileCapabilities as R, browserSnapshot as S, browserStop as T, movePathToTrash as U, installBrowserCommonMiddleware as V, normalizeBrowserFormField as W, redactCdpUrl as X, readBrowserVersion as Y, registerBrowserCli as Z, browserOpenTab as _, DEFAULT_UPLOAD_DIR as a, runBrowserProxyCommand as at, browserResetProfile as b, browserArmDialog as c, stopBrowserBridgeServer as ct, browserConsoleMessages as d, trackSessionBrowserTab as dt, resolveBrowserControlAuth as et, browserCreateProfile as f, untrackSessionBrowserTab as ft, browserNavigate as g, browserHandlers as h, DEFAULT_OPENCLAW_BROWSER_PROFILE_NAME as i, resolveRequestedBrowserProfile as it, createBrowserRouteContext as j, createBrowserControlContext as k, browserArmFileChooser as l, stopBrowserControlService as lt, browserFocusTab as m, DEFAULT_BROWSER_EVALUATE_ENABLED as n, resolveGoogleChromeExecutableForPlatform as nt, applyBrowserProxyPaths as o, startBrowserBridgeServer as ot, browserDeleteProfile as p, parseBrowserMajorVersion as q, DEFAULT_OPENCLAW_BROWSER_COLOR as r, resolveProfile as rt, browserAct as s, startBrowserControlServiceFromConfig as st, DEFAULT_AI_SNAPSHOT_MAX_CHARS as t, resolveExistingPathsWithinRoot as tt, browserCloseTab as u, stopBrowserRuntime as ut, browserPdfSave as v, browserStatus as w, browserScreenshotAction as x, browserProfiles as y, handleBrowserGatewayRequest as z };
