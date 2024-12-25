import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: ['./vitest-setup.ts'],
		globals: true,
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/view/components"),
			"@pages": path.resolve(__dirname, "src/view/pages"),
			"@assets": path.resolve(__dirname, "src/view/assets"),
			"@hooks": path.resolve(__dirname, "src/view/hooks"),
			"@context": path.resolve(__dirname, "src/view/context"),
			"@domain": path.resolve(__dirname, "src/domain"),
			"@service": path.resolve(__dirname, "src/service"),
			"@application": path.resolve(__dirname, "src/application"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@test": path.resolve(__dirname, "src/test"),
		},
	},
});
