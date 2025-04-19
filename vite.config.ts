import { resolve } from 'node:path'
import { type ManifestV3Export, crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import manifest from './manifest.json'
import pkg from './package.json'

const isDev = process.env.__DEV__ === 'true'
const browser = process.env.BROWSER || 'chrome'
const outDir = resolve(__dirname, `dist_${browser}`)

const baseManifest = {
	...manifest,
	version: pkg.version,
} as ManifestV3Export

export default defineConfig({
	plugins: [
		tailwindcss(),
		tsconfigPaths(),
		react(),
		crx({
			manifest: {
				...baseManifest,
				background: {
					service_worker: 'src/pages/background/index.ts',
					type: 'module',
				},
			} as ManifestV3Export,
			contentScripts: {
				injectCss: true,
				preambleCode: false,
			},
		}),
	],
	build: {
		sourcemap: isDev,
		emptyOutDir: !isDev,
		manifest: true,
		outDir,
		rollupOptions: {
			input: {
				content: resolve(__dirname, 'src/pages/content/index.tsx'),
				popup: resolve(__dirname, 'src/pages/popup/index.html'),
				options: resolve(__dirname, 'src/pages/options/index.html'),
			},
		},
	},
	publicDir: resolve(__dirname, 'public'),
})
