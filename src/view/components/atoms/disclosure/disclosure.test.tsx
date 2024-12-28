import { fireEvent, render } from "@test/test-utils";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { Disclosure } from "./disclosure";
import { Button } from "../button/button";
describe("Disclosure", () => {

	it("is accessible while empty", async () => {
		const { container } = render(<Disclosure title="Title" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("doesn't render children by default", async () => {
		const { queryByText } = render(
			<Disclosure title="Title" >
				<Button>Cant find me</Button>
			</Disclosure>
		);
		expect(queryByText("Cant find me")).toBeNull();
	});

	it("renders children when clicked on", async () => {
		const { getByRole, getByText } = render(
			<Disclosure title="Title" >
				<Button>Find me</Button>
			</Disclosure>
		);

		const expandButton = getByRole("button");
		fireEvent.click(expandButton);

		const findMeButton = getByText("Find me");
		expect(findMeButton).toBeInTheDocument();
	});

	it("expands when clicked on", async () => {
		const { getByRole, container } = render(
			<Disclosure title="Title" />
		);

		const expandButton = getByRole("button");
		fireEvent.click(expandButton);

		const disclosure = container.firstChild;
		expect(disclosure).toHaveAttribute("data-expanded", "true");
	});

	it("is accessible detracted, with focusable element inside", async () => {
		const { container } = render(
			<Disclosure title="Title" >
				<Button>Button</Button>
			</Disclosure>
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("is accessible expanded, with focusable element inside", async () => {
		const { container, getByRole } = render(
			<Disclosure title="Title" >
				<Button>Button</Button>
			</Disclosure>
		);

		const expandButton = getByRole("button");
		fireEvent.click(expandButton);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});