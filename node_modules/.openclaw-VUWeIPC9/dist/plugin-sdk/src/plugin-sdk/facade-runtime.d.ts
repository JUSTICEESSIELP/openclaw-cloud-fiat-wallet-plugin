export declare function createLazyFacadeObjectValue<T extends object>(load: () => T): T;
export declare function createLazyFacadeArrayValue<T extends readonly unknown[]>(load: () => T): T;
export declare function loadBundledPluginPublicSurfaceModuleSync<T extends object>(params: {
    dirName: string;
    artifactBasename: string;
}): T;
