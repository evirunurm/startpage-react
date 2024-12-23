import { render } from "@test/test-utils";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { Bookmark } from "./bookmark";

describe("Bookmark", () => {

	it("is accessible", async () => {
		const name = "Bookmark";
		const url = "Bookmark";
		const { container } = render(<Bookmark name={name} url={url} />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("renders with correct name and url", () => {
		const name = "GitHub";
		const url = "https://github.com";
		const { getByText } = render(<Bookmark name={name} url={url} />);

		const linkElement = getByText(name);
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", url);
	});

	it("opens link in a new tab", () => {
		const name = "GitHub";
		const url = "https://github.com";
		const { getByText } = render(<Bookmark name={name} url={url} />);

		const linkElement = getByText(name);
		expect(linkElement).toHaveAttribute("target", "_blank");
	});
});