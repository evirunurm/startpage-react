import { render } from "@test/test-utils"
import { ReorderableBookmarks } from "./reorderable-bookmarks";
import { axe } from "vitest-axe";
import BookmarkLibraryFactory from "@application/bookmarks/bookmark-library/bookmark-library.factory";
import IBookmark from "@domain/bookmarks/IBookmark";

describe("ReorderableBookmarks", () => {
	const { getDefaultBookmarkLibrary } = BookmarkLibraryFactory();
	let bookmarks: IBookmark[];

	beforeEach(() => {
		bookmarks = getDefaultBookmarkLibrary().bookmarkFolders[0].bookmarks;
	});

	it("is accesible", async () => {
		const { container } = render(<ReorderableBookmarks
			bookmarks={bookmarks}
			onFolderReorder={() => { }}
			onDeleteBookmark={() => { }}
			onSaveBookmark={() => { }}
		/>);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});