import { fireEvent, render } from "@test/test-utils"
import { BookmarkEditor } from "./bookmark-editor";
import { axe } from "vitest-axe";
import BookmarkFactory from "@application/bookmarks/bookmark/bookmark.factory";
import IBookmark from "@domain/bookmarks/IBookmark";

describe("BookmarkEditor", () => {
	const { getDefaultBookmark } = BookmarkFactory();
	let bookmark: IBookmark;

	beforeEach(() => {
		bookmark = getDefaultBookmark()
	});

	it("is accesible", async () => {
		const { container } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("should execute onSave after changing name and pressing enter", async () => {
		const onSave = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={onSave}
			onDelete={() => { }}
		/>);

		const input = getByRole("textbox", { name: "common.bookmark-name" });
		fireEvent.change(input, { target: { value: "New Name" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(onSave).toHaveBeenCalled();
	});

	it("should not execute onDelete on pressing delete button", async () => {
		const onDelete = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={onDelete}
		/>);

		const button = getByRole("button", { name: "common.delete-bookmark" });
		fireEvent.click(button);

		expect(onDelete).not.toHaveBeenCalled();
	});

	it("should show the confirmation button on clicking the delete button", async () => {
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const deleteButton = getByRole("button", { name: "common.delete-bookmark" });
		fireEvent.click(deleteButton);

		const confirmationButton = getByRole("button", { name: "common.confirm-deletion" });
		expect(confirmationButton).toBeInTheDocument();
	});

	it("should execute onDelete on pressing delete button and confirming", async () => {
		const onDelete = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={onDelete}
		/>);

		const deleteButton = getByRole("button", { name: "common.delete-bookmark" });
		fireEvent.click(deleteButton);

		const confirmationButton = getByRole("button", { name: "common.confirm-deletion" });
		fireEvent.click(confirmationButton);

		expect(onDelete).toHaveBeenCalled();
	});

	it("should not allow a name longer than 25 characters", async () => {
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const input = getByRole("textbox", { name: "common.bookmark-name" });
		fireEvent.change(input, { target: { value: "a".repeat(26) } });

		expect(input).toHaveValue("a".repeat(25));
	});

	it("should not show the url input by default", async () => {
		const { queryByLabelText } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const input = queryByLabelText("common.bookmark-url");
		expect(input).toBeNull();
	});

	it("should show url input when clicked edit url button", async () => {
		const { getByRole, queryByLabelText } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const button = getByRole("button", { name: "common.edit-url" });
		fireEvent.click(button);

		const input = queryByLabelText("common.bookmark-url");
		expect(input).toBeInTheDocument();
	});

	it("should not allow a url longer than 2048 characters", async () => {
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
		/>);

		const button = getByRole("button", { name: "common.edit-url" });
		fireEvent.click(button);
		const input = getByRole("textbox", { name: "common.bookmark-url" });
		fireEvent.change(input, { target: { value: "a".repeat(2049) } });

		expect(input).toHaveValue("a".repeat(2048));
	});

	it("should execute onInputFocus when the name field is focused", async () => {
		const onInputFocus = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
			onInputFocus={onInputFocus}
		/>);

		const input = getByRole("textbox", { name: "common.bookmark-name" });
		fireEvent.focus(input);

		expect(onInputFocus).toHaveBeenCalled();
	});

	it("should execute onInputBlur when the focus to name field is lost", async () => {
		const onInputBlur = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
			onInputBlur={onInputBlur}
		/>);

		const input = getByRole("textbox", { name: "common.bookmark-name" });
		fireEvent.focus(input);
		fireEvent.blur(input);

		expect(onInputBlur).toHaveBeenCalled();
	});

	it("should execute onInputFocus when the url field is focused", async () => {
		const onInputFocus = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
			onInputFocus={onInputFocus}
		/>);

		const button = getByRole("button", { name: "common.edit-url" });
		fireEvent.click(button);
		const input = getByRole("textbox", { name: "common.bookmark-url" });
		fireEvent.focus(input);

		expect(onInputFocus).toHaveBeenCalled();
	});

	it("should execute onInputBlur when the focus to url field is lost", async () => {
		const onInputBlur = vi.fn();
		const { getByRole } = render(<BookmarkEditor
			id={bookmark.id}
			name={bookmark.name}
			url={bookmark.url}
			onSave={() => { }}
			onDelete={() => { }}
			onInputBlur={onInputBlur}
		/>);

		const button = getByRole("button", { name: "common.edit-url" });
		fireEvent.click(button);
		const input = getByRole("textbox", { name: "common.bookmark-url" });
		fireEvent.focus(input);
		fireEvent.blur(input);

		expect(onInputBlur).toHaveBeenCalled();
	});
});