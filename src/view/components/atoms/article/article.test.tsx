import { render } from "@test/test-utils"
import { Article } from "./article";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";

describe("Article", () => {

	it("is accessible", async () => {
		const title = "Title";
		const content = "Content";
		const { container } = render(<Article title={title} >{content}</Article>);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("prints the title", () => {
		const title = "Title";
		const { getByText } = render(<Article title={title} />);

		expect(getByText(title)).toBeInTheDocument();
	});

	it("prints the title as a heading", () => {
		const { getAllByRole } = render(<Article title="Title" />);

		expect(getAllByRole('heading')).toBeDefined();
	});

	it("prints the content", () => {
		const content = "Content";
		const { getByText } = render(<Article>{content}</Article>);

		expect(getByText(content)).toBeInTheDocument();
	});

	it("renders without title", () => {
		const content = "Content";
		const { container } = render(<Article>{content}</Article>);

		expect(container.querySelector('h3')).toBeNull();
	});

	it("renders with children", () => {
		const content = "Content";
		const { getByText } = render(<Article>{content}</Article>);

		expect(getByText(content)).toBeInTheDocument();
	});
});