import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

export default defineConfig({
    plugins: [remix(), tsconfigPaths(), sentryVitePlugin({
        org: "fiets-service",
        project: "javascript-remix"
    }), sentryVitePlugin({
        org: "fiets-service",
        project: "javascript-remix"
    })],

    ssr: {
        noExternal: ['remix-utils'],
    },

    build: {
        sourcemap: true
    }
})