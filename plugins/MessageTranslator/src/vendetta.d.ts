declare module "@vendetta" {
    export const logger: {
        log: (...args: any[]) => void;
    };
}

declare module "@vendetta/metro" {
    export function findByProps(...props: string[]): any;
}

declare module "@vendetta/metro/common" {
    export const ReactNative: any;
}

declare module "@vendetta/metro/common/assets" {
    export function createFileUrl(name: string): string;
}

declare module "@vendetta/ui" {
    export const semanticColors: Record<string, string>;
}

declare module "@vendetta/ui/components" {
    export const Forms: {
        FormText: any;
        FormRow: any;
        FormSelect: any;
    };
    export const General: {
        Text: any;
        View: any;
    };
}

declare module "@vendetta/storage" {
    export function useProxy(obj: any): void;
}

declare module "@vendetta/plugin" {
    export const storage: Record<string, any>;
} 