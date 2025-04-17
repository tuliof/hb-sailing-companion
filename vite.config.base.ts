import { resolve } from 'node:path'
import type { ManifestV3Export } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { type BuildOptions, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devManifest from './manifest.dev.json'
import manifest from './manifest.json'
import pkg from './package.json'

const isDev = process.env.__DEV__ === 'true'

export const baseManifest = {
	...manifest,
	version: pkg.version,
	...(isDev ? devManifest : ({} as ManifestV3Export)),
} as ManifestV3Export

export const baseBuildOptions: BuildOptions = {
	sourcemap: isDev,
	emptyOutDir: !isDev,
	manifest: true,
	rollupOptions: {
		input: {
			content: resolve(__dirname, 'src/pages/content/index.tsx'),
			// background: resolve(__dirname, 'src/pages/background/index.ts'),
			popup: resolve(__dirname, 'src/pages/popup/index.html'),
			options: resolve(__dirname, 'src/pages/options/index.html'),
			// newtab: resolve(__dirname, 'src/pages/newtab/index.html'),
			// devtools: resolve(__dirname, 'src/pages/devtools/index.html'),
		},
	},
}

export default defineConfig({
	plugins: [tailwindcss(), tsconfigPaths(), react()],
	publicDir: resolve(__dirname, 'public'),
})
