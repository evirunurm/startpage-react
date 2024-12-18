import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		globals: true,
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
