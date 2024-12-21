import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [react()],
	define: {
		"process.env": {
			VITE_REACT_APP_FACTS_DOGS_URL: process.env.VITE_REACT_APP_FACTS_DOGS_URL,
			VITE_REACT_APP_FACTS_CATS_URL: process.env.VITE_REACT_APP_FACTS_CATS_URL,
			VITE_REACT_APP_FACTS_JOKES_URL: process.env.VITE_REACT_APP_FACTS_JOKES_URL,
			VITE_REACT_APP_CRYPTO_PRICE_URL: process.env.VITE_REACT_APP_CRYPTO_PRICE_URL,
			VITE_MAX_STALE_TIME: process.env.VITE_MAX_STALE_TIME,
			VITE_MAX_CACHE_TIME: process.env.VITE_MAX_CACHE_TIME
		},
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/view/components"),
			"@pages": path.resolve(__dirname, "src/view/pages"),
			"@domain": path.resolve(__dirname, "src/domain"),
			"@service": path.resolve(__dirname, "src/service"),
			"@application": path.resolve(__dirname, "src/application"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@assets": path.resolve(__dirname, "src/view/assets"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@context": path.resolve(__dirname, "src/view/context"),
		},
	},
	build: {
		minify: 'esbuild',
		sourcemap: true,
	},
	optimizeDeps: {
		include: ["react", "react-dom"],
	},
});
