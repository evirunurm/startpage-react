import { render, fireEvent } from "@test/test-utils";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { BookmarkFolder } from "./bookmark-folder";
import IBookmark from "@domain/bookmarks/IBookmark";

const mockBookmarks: IBookmark[] = [
	{ id: "1", name: "Google", url: "https://www.google.com" },
	{ id: "2", name: "GitHub", url: "https://www.github.com" }
];

describe("BookmarkFolder", () => {

	it("is accessible", async () => {
		const { container } = render(<BookmarkFolder id="1" name="Test Folder" bookmarks={mockBookmarks} onDelete={vi.fn()} onEditClick={vi.fn()} />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("renders correctly", () => {
		const { getByText } = render(<BookmarkFolder id="1" name="Test Folder" bookmarks={mockBookmarks} onDelete={vi.fn()} onEditClick={vi.fn()} />);
		expect(getByText("Test Folder")).toBeInTheDocument();
		expect(getByText("Google")).toBeInTheDocument();
		expect(getByText("GitHub")).toBeInTheDocument();
	});

	it("calls onEditClick when edit button is clicked", () => {
		const onEditClick = vi.fn();
		const { getByRole } = render(<BookmarkFolder id="1" name="Test Folder" bookmarks={mockBookmarks} onDelete={vi.fn()} onEditClick={onEditClick} />);
		fireEvent.click(getByRole("button", { name: "Edit folder" }));
		expect(onEditClick).toHaveBeenCalledWith("1");
	});

	it("calls onDelete when delete button is clicked and confirmed", () => {
		const onDelete = vi.fn();
		window.confirm = vi.fn(() => true);
		const { getByRole } = render(<BookmarkFolder id="1" name="Test Folder" bookmarks={mockBookmarks} onDelete={onDelete} onEditClick={vi.fn()} />);
		fireEvent.click(getByRole("button", { name: "Delete folder" }));
		expect(onDelete).toHaveBeenCalledWith("1");
	});

	it("does not call onDelete when delete button is clicked and not confirmed", () => {
		const onDelete = vi.fn();
		window.confirm = vi.fn(() => false);
		const { getByRole } = render(<BookmarkFolder id="1" name="Test Folder" bookmarks={mockBookmarks} onDelete={onDelete} onEditClick={vi.fn()} />);
		fireEvent.click(getByRole("button", { name: "Delete folder" }));
		expect(onDelete).not.toHaveBeenCalled();
	});
});