import { render } from "@test/test-utils"
import { CurrentDate } from "./current-date";
import { formatDate } from "@utils/date-utils";

describe("CurrentDate", () => {
	it("prints the current date", () => {
		const { getByText } = render(<CurrentDate />);
		const formattedDate = formatDate(new Date());

		expect(getByText(formattedDate)).toBeDefined();
	});

	it("prints the date as a heading", () => {
		const { getByRole } = render(<CurrentDate />);

		expect(getByRole('heading')).toBeDefined();
	});
});