import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/cherry_protfolio/",
	build: {
		assetsInclude: ["**/*.woff2"], // cubic字型檔
		outDir: "dist",
		assetsDir: "assets",
	},
});
