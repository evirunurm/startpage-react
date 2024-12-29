import { render } from "@test/test-utils.ts";
import { axe } from "vitest-axe";
import { BookmarkLibraryContainer } from "@components/bookmark-library-container/bookmark-library-container.tsx";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType.ts";
import BookmarkLibraryFactory from "@application/bookmarks/bookmark-library/bookmark-library.factory.ts";
import IBookmarkLibrary from "@domain/bookmarks/IBookmarkLibrary.ts";

describe("BookmarkLibraryContainer", () => {
	const { getDefaultBookmarkLibrary }  = BookmarkLibraryFactory();

	it("is accessible with default maximum amount (4) of folders", async () => {
		const { container } = render(<BookmarkLibraryContainer />);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("is accessible with three folders", async () => {
		const library: IBookmarkLibrary = getDefaultBookmarkLibrary();
		library.bookmarkFolders = library.bookmarkFolders.slice(0, 3);
		localStorage.setItem(LocalStorageType.BookmarkLibrary, JSON.stringify(library));
		const { container } = render(<BookmarkLibraryContainer />);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

});