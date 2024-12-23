import { render } from "@test/test-utils";
import { Button } from "./button";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";

describe("Button", () => {

	it("is accessible", async () => {
		const content = "Content";
		const { container } = render(<Button>{content}</Button>);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("renders with correct text", () => {
		const content = "Click Me";
		const { getByText } = render(<Button>{content}</Button>);
		expect(getByText(content)).toBeInTheDocument();
	});

	it("applies custom className", () => {
		const content = "Content";
		const className = "custom-class";
		const { container } = render(<Button className={className}>{content}</Button>);
		expect(container.firstChild).toHaveClass(className);
	});

	it("applies custom padding", () => {
		const content = "Content";
		const padding = "10px";
		const { container } = render(<Button padding={padding}>{content}</Button>);
		expect(container.firstChild).toHaveStyle(`padding: ${padding}`);
	});

	it("centers text when center prop is true", () => {
		const content = "Content";
		const { container } = render(<Button center>{content}</Button>);
		expect(container.firstChild).toHaveStyle("text-align: center");
	});
});