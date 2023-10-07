import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

const config: any = {
    lib: {
        entry: [
            "src/index.ts"
        ],
        fileName: "index",
        name: "correios-api-client",
    },
    example: {
        entry:[
            "src/example/example.ts"
        ],
        fileName: "example",
        name: "correios-api-client-example",
    },
};

const currentConfig = process.env.LIB_NAME != null
    ? config[process.env.LIB_NAME]
    : config.lib;


export default defineConfig({
    build: {
        target: "es2022",
        lib: {
            ...currentConfig,
        },
        commonjsOptions: {
            ignore: [...builtinModules],
        },
        sourcemap: true,
        outDir: "dist",
        emptyOutDir: false,
        minify: false,
    },
    test: {
        globals: true,
        threads: false,
        setupFiles: "tests/setup.ts",
        logHeapUsage: true,
    },
    resolve: {
        alias: {}
    }
});

namespace NodeJS {
    export interface ProcessEnv {
        LIB_NAME?: string;
    }
}

