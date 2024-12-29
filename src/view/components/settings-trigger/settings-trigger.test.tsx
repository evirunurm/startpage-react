import { render } from "@test/test-utils.ts";
import { axe } from "vitest-axe";
import { SettingsTrigger } from "@components/settings-trigger/settings-trigger.tsx";


describe("SettingsTrigger", () => {

	it("is accessible", async () => {
		const { container } = render(<SettingsTrigger />);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

});