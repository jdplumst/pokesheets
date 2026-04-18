import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart({
			srcDirectory: "src",
			// spa: {
			// 	enabled: true,
			// 	maskPath: "/campaigns",
			// 	prerender: {
			// 		outputPath: "/_shell",
			// 		crawlLinks: false,
			// 	},
			// },
			// prerender: {
			// 	enabled: true,
			// 	autoStaticPathsDiscovery: false,
			// 	crawlLinks: false,
			// },
			// pages: [{ path: "/" }],
		}),
		nitro(),
		viteReact(),
	],
	resolve: { tsconfigPaths: true },
});

export default config;
