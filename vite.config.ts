import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	define: {
		"process.env": {
			REACT_APP_FACTS_DOGS_URL: "https://dog-api.kinduff.com/api/facts",
			REACT_APP_FACTS_CATS_URL: "https://catfact.ninja/fact",
			REACT_APP_FACTS_JOKES_URL:
				"https://official-joke-api.appspot.com/random_joke",
			REACT_APP_CRYPTO_PRICE_URL: "https://api.coincap.io/v2/assets/",
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
});
