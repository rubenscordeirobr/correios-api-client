import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

export default defineConfig({
    build: {
        target: "es2022",
        lib: {
            entry: [
                "src/main.ts"
            ],
            name: "correios-api-client",
            fileName: "main",
        },
        commonjsOptions: {
            ignore: [...builtinModules],
        },
        sourcemap: true,
        outDir: "dist",
        emptyOutDir: true,
        minify: false,
    },
    test: {
        globals: true,
        threads: false,
        setupFiles: "tests/setup.ts",
        logHeapUsage: true,
    },
    resolve: {
        alias: {
             
        }
    }
});

