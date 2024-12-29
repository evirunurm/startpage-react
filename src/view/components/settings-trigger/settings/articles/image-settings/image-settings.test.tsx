import { fireEvent, render } from "@test/test-utils";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { ImageSettings } from "./image-settings";

describe("ImageSettings", () => {

	it("is accessible", async () => {
		const { container } = render(<ImageSettings />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("exposes upload button after being expanded", () => {
		const { getByRole } = render(<ImageSettings />);

		const expandButton = getByRole("button", { name: "common.image" });
		fireEvent.click(expandButton);

		const uploadButton = getByRole("button", { name: "common.image-upload" });
		expect(uploadButton).toBeInTheDocument();
	});
});