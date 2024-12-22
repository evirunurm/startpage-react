import { render } from "@test/test-utils"
import { DateTime } from "./date-time";

describe("DateTime", () => {
	it("renders date and time as headings", () => {
		const { getAllByRole } = render(<DateTime />);

		expect(getAllByRole('heading').length).toBe(2);
	});
});