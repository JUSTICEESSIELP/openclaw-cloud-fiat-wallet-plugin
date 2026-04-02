import type { PluginSdkFacadeTypeMap } from "../generated/plugin-sdk-facade-type-map.generated.js";
type FacadeEntry = PluginSdkFacadeTypeMap["xai"];
type FacadeModule = FacadeEntry["module"];
export declare const normalizeXaiModelId: FacadeModule["normalizeXaiModelId"];
export {};
