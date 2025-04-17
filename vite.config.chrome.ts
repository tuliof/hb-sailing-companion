import { resolve } from 'node:path'
import { type ManifestV3Export, crx } from '@crxjs/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import baseConfig, { baseManifest, baseBuildOptions } from './vite.config.base'

const outDir = resolve(__dirname, 'dist_chrome')

export default mergeConfig(
	baseConfig,
	defineConfig({
		plugins: [
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
					preambleCode: false, // Add this to avoid potential injection issues
				},
			}),
		],
		build: {
			...baseBuildOptions,
			outDir,
		},
		publicDir: resolve(__dirname, 'public'),
	}),
)
